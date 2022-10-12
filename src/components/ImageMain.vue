<template>
    <el-main class="image-main" :loading="loading">
        <div class="top">
            <el-row :gutter="20" style="padding:0 20px">
                <el-col :span="6" v-for="(item,index) in list" :key="index" style="margin-bottom:20px;">
                    <el-card shadow="hover" :body-style="{ padding:0 }" class="relative">
                        <el-image fit="fill" :src="item.url" lazy="true" style="height:150px;width:100%"></el-image>
                        <div class="image-name">{{item.name}}</div>
                        <div class="flex justify-center items-center">
                            <el-button type="primary" text size="small">重命名</el-button>
                            <el-button type="primary" text size="small">删除</el-button>
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
</template>

<script setup>
import { ref } from 'vue';
import { getimage } from '~/api/image.js'

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
        console.log(res)
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
defineExpose({
    IdClassgetData
})

</script>

<style  scoped>
.image-main {
    position: relative;
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
.image-main .image-name{
    height: 23px;
    position: absolute;
    top: 129px;
    left:0px;
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