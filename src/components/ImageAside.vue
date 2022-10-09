<template>
    <el-aside class="image-aside" width="220px" v-loading="loading">
        <div class="top">
            <imageAsideList :active="activeId == item.id" v-for="(item,index) in imageClassList" :key="index">
                {{item.name}}</imageAsideList>
        </div>
        <div class="bottom flex justify-center items-center">
            <el-pagination :page-size="limit" :current-page="currentPage" layout="prev, next" :total="total"
                @current-change="getData" />
        </div>
    </el-aside>

    <!-- // 新增弹窗 -->
    <FromDrawer title="新增" ref="showDraweref" @submit="handleAsideDrawer">
        <el-form :model="form" ref="formref" :rules="rules" label-width="80px" :inline="false" >
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name" ></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="form.order" :min="0" :max="1000" />
            </el-form-item>
            
        </el-form>
        
    </FromDrawer>
</template>

<script setup>
import FromDrawer from './FromDrawer.vue'
import imageAsideList from './ImageAsideList.vue'
import { getimageClass } from '~/api/imageClass.js'
import { reactive, ref } from 'vue';

const loading = ref(false)
const imageClassList = ref([])
const activeId = ref(0)

// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
const getData = (p = null) => {
    if (p) {
        currentPage.value = p
    }
    loading.value = true
    getimageClass(currentPage.value).then(res => {
        total.value = res.totalCount
        imageClassList.value = res.list
        activeId.value = imageClassList.value[0].id
    }).finally(() => {
        loading.value = false
    })
}
getData()

// 新增图库-1
// 打开表单

const showDraweref= ref(null)
const handleShowDrawer = ()=>{
    showDraweref.value.openShowDrawer()
}
// 表单数据
const form=reactive({
    name:'1',
    order:50
})
// 表单验证
const formref=ref(null)
const rules={
    name: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ]

}
   
// 提交表单触发
const handleAsideDrawer =()=>{
    formref.value.validate((value)=>{
        if (!value) return
        console.log('通过')
        console.log(form.name)
    })
}

// 提供给父主键调用
defineExpose({
    handleShowDrawer
})


</script>

<style  scoped>
.image-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.image-aside .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-aside .bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
}
</style>