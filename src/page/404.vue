<template>
    <el-result>
        <template #icon>
            <el-result icon="warning" title="404" sub-title="页面被外星人偷走了" />
        </template>
        <template #extra>
            <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
        </template>
    </el-result>
</template>

