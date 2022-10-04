<template>
    <div class="f-header">
        <span class="login">
            <i class="iconfont icon-makalong mr-2 text-2xl"></i>
            后台管理系统
        </span>


        <el-tooltip effect="dark" content="折叠菜单" placement="bottom">
            <i class="iconfont icon-shutiao iconhear" @click="store.commit('user/setasideWidth')"></i>
        </el-tooltip>
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

    <FromDrawer ref="refFromDrawer" title="修改密码" destroyOnClose @sumbit="updatepwd">
        <el-form :model="updatepa" ref="rulepassword" :rules="rules" label-width="">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input v-model="updatepa.oldpassword" placeholder="请输入旧密码" type="password">
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
        </el-form>
    </FromDrawer>
</template>
<script setup>

import FromDrawer from '~/components/FromDrawer.vue';
import { useFullscreen } from '@vueuse/core'
import { useRepassword, useLogout } from './useManger'
import { useStore } from 'vuex';

const store = useStore()
const { toggle } = useFullscreen()
const {
    refFromDrawer,
    updatepa,
    rules,
    rulepassword,
    updatepwd,
    // openrefFromDrawer
} = useRepassword()
const { handleloginOut
    , headlereload
} = useLogout()

//点击下拉
const ondropdown = (e) => {
    switch (e) {
        case "loginOut":
            handleloginOut()
            break;
        case 'editpsw':
            refFromDrawer.value.openShowDrawer()
            // openrefFromDrawer()
            break;
    }
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