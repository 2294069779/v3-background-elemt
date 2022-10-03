<template>
    <el-container>
        <el-header>
                <f-header></f-header>
        </el-header>
        <el-container>
            <el-aside> 
                <f-aside></f-aside>
            </el-aside>
            <el-main>
                <f-tab-list></f-tab-list>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    
</template>

<script setup>
    import FAside from './components/FAside.vue';
    import FHeader from './components/FHeader.vue';
    import FTabList from './components/FTabList.vue';

</script>