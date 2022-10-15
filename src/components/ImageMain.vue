<template>
    <el-main class="image-main" :loading="loading">
        <div class="top">
            <el-row :gutter="20" style="padding:0 20px">
                <el-col :span="6" v-for="(item,index) in list" :key="index" style="margin-bottom:20px;">
                    <el-card shadow="hover" :body-style="{ padding:0 }" class="relative">
                        <el-image fit="fill" :src="item.url" style="height:150px;width:100%"
                            :preview-src-list="[item.url]" :initial-index="0"></el-image>
                        <div class="image-name">{{item.name}}</div>
                        <div class="flex justify-center items-center">
                            <el-button type="primary" text size="small" @click="modifyImageName(item)">重命名</el-button>

                            <el-popconfirm title="确定删除该图片嘛?" confirm-button-text="确定" cancel-button-text="取消"
                                @confirm="delectImage(item)">
                                <template #reference>
                                    <el-button type="primary" text size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-card>
                </el-col>

            </el-row>
        </div>
        <div class="bottom">
            <el-pagination :page-size="limit" :current-page="currentPage" layout="prev,pager,next" :total="total"
                @current-change="getData" />
        </div>
    </el-main>

    <el-drawer v-model="tableImage" title="上传图片">
        <updateImage :data="{image_class_id:imageClassId}" @successimg="handlesuccessimg" ></updateImage>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { getimage, postImageName, delectImageName } from '~/api/image.js'
import { dilogElMessageBox, message } from '~/utility/utill.js'

import updateImage from '~/components/updateImage.vue'

const loading = ref(false)
// 分页功能
const limit = ref(10)  //几页
const currentPage = ref(1) // 当前选中
const total = ref(0)   // 总条数
const imageClassId = ref(0)  // 图片分类Id
const list = ref([])
//获取图片
const getData = (p = null) => {
    if (p) {
        currentPage.value = p
    }
    loading.value = true
    getimage(imageClassId.value, currentPage.value).then((res) => {
        total.value = res.totalCount
        list.value = res.list

    }).finally(() => {
        loading.value = false
    })
}
// 根据id获取图片
const IdClassgetData = (id) => {
    imageClassId.value = id
    currentPage.value = 1
    getData()
}

// 图片重命名
const modifyImageName = (item) => {
    dilogElMessageBox('重命名', item.name).then((res) => {
        loading.value = true
        postImageName(item.id, res.value).then(() => {
            getData()
            message('重命名成功')
        }).finally(() => {
            loading.value = false
        })

    })
}
// 删除图片
const delectImage = (item) => {
    loading.value = true
    delectImageName(item.id).then(() => {
        getData()
        message('删除成功')
    }).finally(() => {
        loading.value = false
    })
}

// 上传图片
const tableImage = ref(false)
const updateTableImage = ()=>{
    tableImage.value=true
}
// 图片上传成功
const handlesuccessimg=()=> {
    getData(1) 
    tableImage.value=false
}
defineExpose({
    IdClassgetData,
    updateTableImage
})

</script>

<style  scoped>
.image-main {
    position: relative;
}

::v-deep(.el-image-viewer__img) {
    width: 70%;
    height: 80%;
}

.image-main .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-main .bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
}

.image-main .image-name {
    height: 23px;
    position: absolute;
    top: 129px;
    left: 0px;
    right: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 8px;
    color: beige;
    background-color: #2b3745;
    opacity: 0.5;
    line-height: 23px;
    padding-left: 4px;


}
</style>