<template>

    <div v-if="modelValue">
        <el-image :src="modelValue" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>
    </div>
    <div class="choose-image-btn" @click="open">
        <el-icon class="choose-icon">
            <Plus />
        </el-icon>
    </div>

    <!-- 弹出层 -->
    <el-dialog v-model="dialogChoooseImage" title="选择图片" width="80%" top="5vh">
        <div >
            <list openChooseImag @chooseList="chooseCheck"  style="height: 65vh;"></list>
        </div>

        <template #footer>
            <span class="dialog-footer"  >
                <el-button @click="close" >取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import list from '~/page/image/list.vue'
// 弹窗
const dialogChoooseImage = ref(false)
// 打开弹窗fun
const open = () => dialogChoooseImage.value = true
const close = ()=> dialogChoooseImage.value =false
defineProps({
    modelValue:[String,Array]
    
})

const emit=defineEmits(['update:modelValue'])
// 获取图片复选框数据
let urls=[]
const chooseCheck=(checkList)=>{
    urls=checkList.map(o=>o.url)
}

// 提交确定
const submit = () => {
emit('update:modelValue',urls[0])
close()
}
</script>

<style scoped>
.choose-image-btn {
    width: 100px;
    height: 100px;
    border: 1px solid #dcdfe6;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
}

.choose-image-btn:hover {
    background-color: #DDDDDD;
}

.choose-image-btn .choose-icon {
    font-size: 25px;
    color: aquamarine;
}

</style>