<template>
    <div>
        <el-drawer v-model="showdrawer" :title="title" :size="size" :destroy-on-close="destroyOnClose">
            <div class="fromDrawer">
                <div class="body ">
                    <slot></slot>
                </div>
                <div class="actions">
                    <el-button type='primary' @click="sumbit" :loading="loading">{{confirmText}}</el-button>
                    <el-button type='info' @click="closeShowDrawer">取消</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showdrawer = ref(false)
const openShowDrawer = () => showdrawer.value = true
const closeShowDrawer = () =>  showdrawer.value = false

const prop = defineProps({
    title:String,
    size:{
        type:String,
        default:'45%'
    },
    destroyOnClose:{
        type:Boolean,
        default:false
    },
    confirmText:{
        type:String,
        default:'提交'
    }
})
// 提交自定义事件
const emit=defineEmits(['sumbit'])
const sumbit=()=>emit('sumbit') 

//开启加载
const loading = ref(false)
const showloading=()=> loading.value=true
const hideloading=()=> loading.value=false


defineExpose({
    openShowDrawer, closeShowDrawer,showloading,hideloading
})
</script>

<style scoped>
.fromDrawer {
    width: 100%;
    height: 100%;
    @apply flex flex-col;

}

.fromDrawer .body {
    @apply flex-1;
    overflow-y: auto;


}

.fromDrawer .actions {
    height: 50px;
    @apply mt-auto;
}
</style>