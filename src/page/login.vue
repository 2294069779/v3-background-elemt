<template>
    <div class='bglog'>
        <el-row class="min-h-screen ">
            <el-col :span="16" class="flex justify-center items-center flex-col">
                <div class="text-8xl text-cyan-100 mb-4">Hi,欢迎</div>
                <div class="text-text-xl text-green-200">这是一个后台管理网站</div>
            </el-col>
            <el-col :span="8" class="bg-cyan-200 bg-opacity-20 flex justify-center items-center flex-col">
                <div class="mb-6 text-2xl flex justify-center items-center font-extrabold text-blue-50 text-opacity-60">
                    <span></span>
                    <span>登录</span>
                    <span></span>
                </div>


                <el-form :model="form" ref="ruleFormRef" :rules="rules">
                    <el-form-item prop="name">
                        <el-input v-model="form.name" placeholder="请输入账号">
                            <template #prefix>
                                <i class="iconfont icon-xingmingyonghumingnicheng"></i>
                            </template>
                        </el-input>

                    </el-form-item>
                    <el-form-item prop="passward">

                        <el-input v-model="form.passward" placeholder="请输入密码" type="password" show-password>
                            <template #prefix>
                                <i class="iconfont icon-password "></i>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="w-[200px]" round type='info' text @click="subitFrom" :loading="loading">登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>

</template>
                        
<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from '~/utility/utill'
import store from '../store'

const $router = useRouter();
const loading = ref(false)
//登录功能
const form = reactive({
    name: 'admin',
    passward: 'admin'
})
const ruleFormRef = ref(null)
//表单效验规则
const rules = ({
    name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    passward: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
})
// 表单提交
const subitFrom = () => {
    ruleFormRef.value.validate(async (valud) => {
        if (valud) {
            loading.value = true
            try {
                await store.dispatch('user/login', form)
                message('成功登录')
                $router.push('/')
            } finally {
                loading.value = false
            }
        }
    })


}
// 添加键盘回车登录
function onkeyup(e){
 if (e.key == 'Enter') {
    subitFrom()
 }
}
// 页面加载完添加这个事件
onMounted(()=>{
document.addEventListener('keyup',onkeyup)
})
// 页面关闭添加这个事件
onBeforeUnmount(()=>{
    document.removeEventListener('keyup',onkeyup)
})

</script>
                        
<style  scoped>
.bglog {
    background: url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg') no-repeat;
    background-size: 100% 100%;
    min-height: 100vh;
}



::v-deep(.el-input__wrapper) {
    /* background-color: unset  ; */
    background-color: rgba(255, 255, 255, 0.01);
    border-style: none;
    /* color: aliceblue; */

}

::v-deep(.el-button) {
    background-color: rgba(255, 255, 255, 0.1);
    color: beige;

}
</style>