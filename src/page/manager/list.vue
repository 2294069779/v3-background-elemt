<template>
    <el-card>
        <!-- 头部 -->
        <div class="noticeheadre">
            <el-button type="primary" size="small" @click="handleopenShowDrawer">新增</el-button>
            <el-tooltip effect="light" content="刷新列表" placement="top-start">
                <el-button text size="small" @click="getData">
                    <el-icon>
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>

        <!-- 表格 -->
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column label="管理员" width="200">
                <template #default="scope">
                    <el-avatar :size="60" :src="scope.row.avatar">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                    </el-avatar>
                    <div class="ml-3">
                        <h6>{{scope.row.username}}</h6>
                        <small>ID:{{scope.row.id}}</small>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" lable="所属管理员 ">
                <template #default="scope">
                    <div>
                        {{scope.row.role.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column lable="状态" width="120">
                <template #default="scope">
                    <el-switch :model-value="scope.row.status" :active-value="1" :inactive-value="0" />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                    <el-popconfirm title="是否确定删除" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelaect(scope.row.id)">
                        <template #reference>
                            <el-button size="small" text type="primary">删除 </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->


        <div class="flex justify-center items-center mt-3">
            <el-pagination :page-size="limit" :current-page='currentpage' layout="prev,pager, next" :total="total"
                @current-change="getData" />
        </div>

        <!-- 新增公共 -->
        <FromDrawer ref="fromDrawer" :title="drawerTitle" @sumbit="handlecreateNotice">
            <el-form ref="fromNoticeRef" :model="fromNotice" status-icon :rules="rules" label-width="80px"
                :inline="false">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="fromNotice.title" placeholder="公告标题" />
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="fromNotice.content" placeholder="公告内容" type="textarea" :rows='5' />
                </el-form-item>
            </el-form>
        </FromDrawer>
    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue';
import FromDrawer from '~/components/FromDrawer.vue'
import { createNotice, updateNotice, delectNotice } from '~/api/notice.js'
import { getManagerList } from '~/api/manager.js'
import { message } from "~/utility/utill.js"
import { computed } from '@vue/reactivity';
// 数据
const tableData = ref(null)

const loading = ref(false)
// 分页数据
const total = ref(0)
const currentpage = ref(1)
const limit = ref(10)
// 获取数据
const getData = (p = null) => {
    if (typeof p == 'number') {
        currentpage.value = p
    }
    loading.value = true
    getManagerList
        (currentpage.value).then((res) => {
            total.value = res.totalCount
            tableData.value = res.list

        }).finally(() => {
            loading.value = false
        })
}
getData()


const editId = ref(0)
const drawerTitle = computed(() => editId.value ? "修改" : "新增")


// 新增公共功能
const fromDrawer = ref(null)
// // 表单实例
const fromNoticeRef = ref(null)
const fromNotice = reactive({
    title: '',
    content: ''
})
const rules = {
    title: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ]
}

// // 提交公共
const handlecreateNotice = () => {
    fromNoticeRef.value.validate((valid) => {
        if (!valid) return
        const fun = editId.value ? updateNotice(editId.value, fromNotice) : createNotice(fromNotice)
        fromDrawer.value.showloading()
        fun.then(() => {
            message(drawerTitle.value + '成功')
            getData(editId.value ? '' : 1)
        }).finally(() => {
            fromDrawer.value.hideloading()
            fromDrawer.value.closeShowDrawer()
        })
    })
}

// 重置表单
function resetFrom(row) {
    if (fromNoticeRef.value) fromNoticeRef.value.clearValidate()
    if (row) {
        fromNotice.title = row.title
        fromNotice.content = row.content
    }
    fromDrawer.value.openShowDrawer()

}
// // 打开新增
const handleopenShowDrawer = () => {
    editId.value = 0
    resetFrom({
        title: '',
        content: ''
    })
}
// 删除
const handleDelaect = (id) => {
    fromDrawer.value.showloading()
    delectNotice(id).then(() => {
        message('删除成功')
        getData()
    }).finally(() => {
        fromDrawer.value.hideloading()
    })
}
// 修改
const handleEdit = (row) => {
    editId.value = row.id
    resetFrom(row)

}
</script>

<style scoped>
.noticeheadre {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>