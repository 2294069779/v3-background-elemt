<template>
    <el-container>
        <el-header>
                <f-header></f-header>
        </el-header>
        <el-container>
            <el-aside class="aside" :width="$store.state.user.asideWidth" > 
                <f-aside >
                   
                </f-aside>
            </el-aside>
            <el-main>
                <f-tab-list></f-tab-list>
                <router-view v-slot="{Component}">
                    <transition name="fade" mode="out-in">
                    <keep-alive>  <component :is="Component" :max="5"></component>  </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
    
</template>

<script setup>
    import FAside from './components/FAside.vue';
    import FHeader from './components/FHeader.vue';
    import FTabList from './components/FTabList.vue';
//   /* -webkit-transform: scale(1);
//     transform: scale(1);
//     -webkit-transform: translateY(-1200px) scale(0.7);
//     transform: translateY(-1200px) scale(0.7);
//     opacity: 0.7; */
</script>

<style >
::v-deep(.aside){
    transition: all 0.2s;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>