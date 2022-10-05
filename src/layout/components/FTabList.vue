<template>
    <!-- //Tab -->
    <div :style="{left:$store.state.user.asideWidth}" class="f-tag-list">
        <el-tabs style="min-width:100px" v-model="activeTab" type="card" class="flex-1" @tab-remove="removeTab"
            @tab-change="changeTab">
            <el-tab-pane v-for="item in TabsList" :key="item.path" :label="item.title" :name="item.path"
                :closable="item.path != '/'">
            </el-tab-pane>
        </el-tabs>

        <!-- //下拉 -->
        <div class="tag-btn">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeTabOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="closeTabAll">关闭所有</el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <div style="height:44px"></div>
</template>

<script  setup>
import {useFTabfn}  from './useFTbList'
const  {
        activeTab, TabsList, changeTab, removeTab,handleClose,initTabList
    } = useFTabfn()
// initTabList()
</script>

<style scoped>
.f-tag-list {
    @apply fixed bg-light-700 flex items-center px-2;
    top: 64px;
    right: 0;
    height: 44px;
    border: 0 !important;
    z-index: 100;
}

.tag-btn {
    @apply bg-white rounded ml-auto flex justify-center items-center px-2;
    height: 32px
}

::v-deep(.el-tabs__header) {
    @apply mb-0;
    border: 0 !important;
    margin-right: 10px;
}

::v-deep(.el-tabs__nav) {
    border: 0 !important;

}

::v-deep(.el-tabs__item) {
    border: 0 !important;
    height: 30px;
    line-height: 30px;
    @apply bg-gray-400 mx-1 rounded mt-1
}

::v-deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300;
}
</style> 51 