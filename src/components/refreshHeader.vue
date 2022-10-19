<!-- 刷新和新增组件封装 -->
<template>
    <div class="noticeheadre">
            <el-button type="primary" size="small" @click="$emit('EmitopenShowDrawer')">新增</el-button>
            <el-tooltip effect="light" content="刷新列表" placement="top-start">
                <el-button text size="small" @click="$emit('emitrefresh')">
                    <el-icon>
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>
</template>

<script setup>
defineEmits(['EmitopenShowDrawer','emitrefresh'])
</script>

<style  scoped>

.noticeheadre {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>