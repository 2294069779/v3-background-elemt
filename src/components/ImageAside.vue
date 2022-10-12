<template>
    <el-aside class="image-aside" width="220px" v-loading="loading">
        <div class="top">
            <imageAsideList :active="activeId == item.id" v-for="(item,index) in imageClassList" :key="index"
                @edit="handleEdit(item)" @ondelectImageClass="delectImageClass(item)" @click="handleclassId(item.id)">
                {{item.name}}
            </imageAsideList>
        </div>
        <div class="bottom flex justify-center items-center">
            <el-pagination :page-size="limit" :current-page="currentPage" layout="prev, next" :total="total"
                @current-change="getData" />
        </div>
    </el-aside>

    <!-- // 新增弹窗 -->
    <FromDrawer :title="title" ref="showDraweref" @sumbit="handleAsideDrawer">
        <el-form :model="form" ref="formref" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
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
import { getimageClass, PostimageClass, PostimageClassid, delectimageClassid } from '~/api/imageClass.js'
import { reactive, ref, computed } from 'vue';
import { message } from '~/utility/utill.js'

const loading = ref(false)
const imageClassList = ref([])
const activeId = ref(0)

// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
// 获取图片列表
const getData = (p = null) => {
    if (p) {
        currentPage.value = p
    }
    loading.value = true
    getimageClass(currentPage.value).then(res => {
        total.value = res.totalCount
        imageClassList.value = res.list
        let id = imageClassList.value[0].id
        if (id) {
            handleclassId(id)
        }
        

    }).finally(() => {
        loading.value = false
    })
}
getData()

// 新增图库-1

const showDraweref = ref(null)

// 表单数据
const form = reactive({
    name: '1',
    order: 50
})

const formref = ref(null)
// 表单验证
const rules = {
    name: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ]

}

// 点击id
const formId = ref(0)
const title = computed(() =>
    formId.value ? '修改' : '新增'
)

// 弹窗实例,点击新增
const handleShowDrawer = () => {
    formId.value = 0
    form.name = '1'
    form.order = 50
    showDraweref.value.openShowDrawer()
}

// 提交表单触发 新增和修改
const handleAsideDrawer = () => {
    formref.value.validate((value) => {
        if (!value) return
        const fun = formId.value ? PostimageClassid(formId.value, form) : PostimageClass(form)
        showDraweref.value.showloading()
        fun.then(() => {
            message(title.value + '成功')
            formId.value ? getData(currentPage.value) : getData(1)
            showDraweref.value.closeShowDrawer()

        }).finally(() => {
            showDraweref.value.hideloading()

        })
    })
}

// 点击修改按钮
const handleEdit = (item) => {
    formId.value = item.id
    form.name = item.name
    form.order = item.order
    showDraweref.value.openShowDrawer()

}
// 点击删除按钮
const delectImageClass = (item) => {
    loading.value = true
    delectimageClassid(item.id).then(() => {
        message('删除成功')
        getData()
    }).finally(() => {
        loading.value = false
    })
}

// 切换选择
const emit=defineEmits(['changeClassId'])
const handleclassId = (id) => {
    activeId.value = id
    emit('changeClassId',id)
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