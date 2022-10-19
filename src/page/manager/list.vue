Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@2294069779 
2294069779
/
v3-background-elemt
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
v3-background-elemt/src/page/manager/list.vue
@2294069779
2294069779 完成管理员模块
Latest commit ed631a0 2 days ago
 History
 1 contributor
259 lines (233 sloc)  8.28 KB

<template>
    <el-card shadow="never" class="border-0">
        <!-- 搜索 -->

        <el-form :model="searchForm" label-width="80px" size="small">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="关键字">
                        <el-input v-model="searchForm.keyword" placeholder="管理员昵称" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="8">
                    <div class="flex item-center justify-end">
                        <el-button type="primary" @click="getData">搜索</el-button>
                        <el-button @click="resetSearchForm">重置</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
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
                    <el-switch :model-value="scope.row.status" :disabled="scope.row.super == 1"
                        :loading="scope.row.statusloading" :active-value="1" :inactive-value="0"
                        @change="changeStatus($event,scope.row)" />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <small v-if="scope.row.super == 1">
                        暂无操作
                    </small>
                    <div v-else>
                        <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                        <el-popconfirm title="是否确定删除" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelaect(scope.row.id)">
                            <template #reference>
                                <el-button size="small" text type="primary">删除 </el-button>
                            </template>
                        </el-popconfirm>
                    </div>

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
            <el-form ref="fromNoticeRef" :model="fromManager" status-icon label-width="80px" :inline="false">
                <el-form-item label="用户名">
                    <el-input v-model="fromManager.username" placeholder="用户名" />
                </el-form-item>
                <el-form-item label="密 码">
                    <el-input v-model="fromManager.password" placeholder="密 码" />
                </el-form-item>
                <el-form-item label="头 像">
                    <chooseImage v-model="fromManager.avatar"></chooseImage>
                </el-form-item>
                <el-form-item label="所属角色">
                    <el-select v-model="fromManager.role_id" placeholder="选择所属角色">
                        <el-option v-for="item in roleidList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="fromManager.status" :active-value="1" :inactive-value="0" />
                </el-form-item>


            </el-form>
        </FromDrawer>
    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue';
import FromDrawer from '~/components/FromDrawer.vue'
import { getManagerList, updateManagerStatus, createManager, updateManager, delectManager } from '~/api/manager.js'
import { message } from "~/utility/utill.js"
import { computed } from '@vue/reactivity';
import chooseImage from '~/components/chooseImage.vue'
// 数据
const tableData = ref(null)
const loading = ref(false)
// 分页数据
const total = ref(0)
const currentpage = ref(1)
const limit = ref(10)
// 
// 所属角色列表
const roleidList = ref(null)
// 搜索
const searchForm = reactive({
    keyword: ''
})
// 重置表单
const resetSearchForm = () => {
    searchForm.keyword = ''
    getData()
}
// 改变状态
const changeStatus = (status, row) => {
    console.log(status)
    row.statusloading = true
    updateManagerStatus(row.id, status).then(() => {
        message('修改成功')
        console.log(row.super);
        row.status = status
    }).finally(() => {
        row.statusloading = false
    })
}
// 获取数据
const getData = (p = null) => {
    loading.value = true
    if (typeof p == 'number') {
        currentpage.value = p
    }
    
    getManagerList(currentpage.value, searchForm.keyword).then((res) => {
        total.value = res.totalCount
        tableData.value = res.list.map((a) => {
            a.statusloading = false
            return a
        })
        roleidList.value = res.roles
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
const fromManager = reactive({
    username: '',
    password: '',
    role_id: null,
    status: 1,
    avatar: ''
})
// // 提交公共
const handlecreateNotice = () => {
    fromNoticeRef.value.validate((valid) => {
        if (!valid) return
        const fun = editId.value ? updateManager(editId.value, fromManager) : createManager(fromManager)
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
function resetFrom(row = false) {
    if (fromNoticeRef.value) fromNoticeRef.value.clearValidate()
    for (const key in fromManager ) {
        fromManager[key] = row[key]
    }
    fromDrawer.value.openShowDrawer()
}
// // 打开新增
const handleopenShowDrawer = () => {
    editId.value = 0
    resetFrom({
        username: '',
        password: '',
        role_id: null,
        status: 1,
        avatar: ''
    })
}
// 删除
const handleDelaect = (id) => {
    fromDrawer.value.showloading()
    delectManager(id).then(() => {
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
