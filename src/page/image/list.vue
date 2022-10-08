<template>

    <el-container class="bg-light-50" :style="{height:(h+'px')}">
        <el-header class="image-header">Header</el-header>
        <el-container>
            <imageAside></imageAside>
            <imageMain></imageMain>

        </el-container>
    </el-container>

</template>

<script setup>
import imageAside from '~/components/ImageAside.vue'
import imageMain from '~/components/ImageMain.vue'
const winHeight = window.innerHeight || document.body.clientHeight;
const h = winHeight - 64 - 40 - 44
</script>

<style  scoped>
.image-header {
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
}
</style>