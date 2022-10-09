<template>
    <div class="aside-list" :class="{'active':active}">
        <span class="truncate ml-3"><slot></slot></span>
        <el-button class="ml-auto px-1" text type="primary"  @click="close">
            <el-icon :size="12">
                <Close />
            </el-icon>
        </el-button>
        <el-button text type="primary" @click="edit">
            <el-icon :size="12">
                <Edit />
            </el-icon>
        </el-button>
    </div>
</template>
<script setup>
defineProps({
    active:{
        type:Boolean,
        default:false
    }
})
//声明触发的事件
defineEmits(['edit','close'])
</script>
<style scoped>
.aside-list{
    border-bottom: 1px solid #f4f4f4;
    display: flex;
    align-items: center;
    padding: 1px;
    font-size: 12px;
    color: #667082;
    
}
.aside-list:hover,.active{
    background-color: #F2F9FF;
}
::v-deep(.el-button--small){
    padding: 5px 5px;
}
</style>