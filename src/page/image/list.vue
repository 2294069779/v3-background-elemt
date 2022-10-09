<template>

    <el-container class="bg-light-50" :style="{height:(h+'px')}">
        <el-header class="image-header">
            <el-button type="primary" size="small" @click="handleAsideShowOpen">新增图片分类</el-button>
        </el-header>
        <el-container>
            <imageAside ref="showOpen"></imageAside>
            <imageMain></imageMain>

        </el-container>
    </el-container>

</template>

<script setup>
import { ref } from 'vue';
import imageAside from '~/components/ImageAside.vue'
import imageMain from '~/components/ImageMain.vue'
const winHeight = window.innerHeight || document.body.clientHeight;
const h = winHeight - 64 - 40 - 44

//调用子组件打开新增弹窗方法
const showOpen = ref(null)
const handleAsideShowOpen = () => {
    showOpen.value.handleShowDrawer()

}
</script>

<style  scoped>
.image-header {
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
}
</style>