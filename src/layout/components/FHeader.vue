<template>
    <div class="f-header">
        <span class="login">
            <i class="iconfont icon-makalong mr-2 text-2xl"></i>
            后台管理系统
        </span>

        <i class="iconfont icon-shutiao iconhear"></i>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <i class="iconfont icon-kafei iconhear ml-3 " @click="headlereload"></i>
        </el-tooltip>


        <div class="dropdown">
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <i class="iconfont icon-zhenzhunaicha iconhear" @click="toggle"></i>
            </el-tooltip>

            <el-dropdown class="el-dropdown-link" @command="ondropdown">
                <span class="flex justify-center items-center">
                    <el-avatar :size="30" :src="$store.state.user.userinfo.avatar" class="mr-3 w " />
                    {{$store.state.user.userinfo.username}}
                    <i class="iconfont icon-biaodanzujian-xialakuang mx-5 "></i>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="editpsw">修改密码</el-dropdown-item>
                        <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <!-- // 修改密码抽屉 -->
    <el-drawer v-model="showdrawer" title="修改密码" :with-header="false">
        <el-form :model="updatepa" ref="rulepassword" :rules="rules" label-width="">
            <el-form-item prop="oldpassword" label="旧密码" >
                <el-input v-model="updatepa.oldpassword" placeholder="请输入旧密码" type="password" >
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input v-model="updatepa.password" placeholder="请输入新密码" type="password" show-password>
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="新密码">
                <el-input v-model="updatepa.repassword" placeholder="请输入新密码" type="password" show-password>
                </el-input>
            </el-form-item>
           
            <el-form-item>
                <el-button  type='info' text :loading="loading" @click="updatepwd">修改</el-button>
                <el-button  type='info' text >取消</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script setup>
import { dialogmessage, message } from '~/utility/utill.js'
import { loginOut,updatepassword } from '~/api/manager.js'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


import { useFullscreen } from '@vueuse/core'
import { reactive, ref } from 'vue';

const { toggle } = useFullscreen()
const router = useRouter()
const store = useStore()
const loading = ref(false)

// 控制抽屉逻辑
const showdrawer = ref(false)
//修改密码
const updatepa = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
})
// 修改密码验证表单
const rules = ({
    oldpassword: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
    repassword: [{ required: true, message: '确定密码不能为空', trigger: 'blur' }]
    
})
 // 点击修改密码
 const rulepassword=ref(null)
 const updatepwd=()=>{
    rulepassword.value.validate(async (valud) => {
        if (valud) {
            loading.value = true
            try {
                await updatepassword(updatepa)
                message('修改成功，请重新登录')
                store.dispatch('user/loginOut')
            } finally {
                loading.value = false
            }
            return false
        }
    })
 }
//点击下来
const ondropdown = (e) => {
   
    switch (e) {
        case "loginOut":
            handleloginOut()
            break;
        case 'editpsw':
            showdrawer.value = true
            break;
    }
}
// 刷新按钮
const headlereload = () => location.reload()
// 点击退出
const handleloginOut = () => {
    dialogmessage('是否退出登录').then(async () => {
        await loginOut()
        store.dispatch('user/loginOut')
        router.push('/login')
        message('退出成功')


    }).catch(() => {
        console.log('取消');
    })


}


</script>
<style>
.f-header {
    @apply flex bg-cool-gray-300 fixed top-0 left-0 right-0 text-light-50 items-center;
    height: 64px;
}

.f-header .login {
    width: 250px;
    @apply flex items-center justify-center text-xl;
}

.f-header .dropdown {
    @apply flex items-center justify-center ml-auto
}

.f-header .iconfont {
    cursor: pointer;
    /* height: 64px;
    width: 40px; */
}

.f-header .iconhear:hover {
    @apply bg-cool-gray-200;
    height: 64px;
}

.f-header .el-dropdown-link {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>