<template>
    <div class="aside-list" :class="{'active':active}">
        <span class="truncate ml-3">
            <slot></slot>
        </span>

            <span @click.stop="()=>{}" class="nn">
            <el-popconfirm title="是否删除" confirm-button-text="确定" cancel-button-text="取消"
                @confirm="$emit('ondelectImageClass')" >
                <template #reference>
                    <el-button class="ml-auto px-1" text type="primary" @click="$emit('close')">
                        <el-icon :size="12">
                            <Close />
                        </el-icon>
                    </el-button>
                </template>
            </el-popconfirm>
       
        <el-button text type="primary" @click.stop="$emit('edit')">
            <el-icon :size="12">
                <Edit />
            </el-icon>
        </el-button>
    </span>
   




    </div>
</template>
<script setup>
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})
//声明触发的事件
// defineEmits(['edit', 'close'])
</script>
<style scoped>
.aside-list {
    border-bottom: 1px solid #f4f4f4;
    display: flex;
    align-items: center;
    justify-content : space-between;
    padding: 1px;
    font-size: 12px;
    color: #667082;
}
.aside-list .nn{
    margin-right: 1px;
}
.aside-list:hover,
.active {
    background-color: #F2F9FF;
}

::v-deep(.el-button--small) {
    padding: 5px 5px;
}
</style>