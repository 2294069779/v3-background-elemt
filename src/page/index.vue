<template>
    <div>
        <el-button @click="handleloginOut">退出登录</el-button>
    </div>
</template>

<script setup>
import { dialogmessage,message  } from '~/utility/utill.js'
import { loginOut } from '~/api/manager.js'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()

 const handleloginOut=()=>{
     dialogmessage('是否退出登录').then(async()=>{
        await loginOut()
        store.dispatch('user/loginOut')
        router.push('/login')
        message('退出成功')


     }).catch(() => {
       console.log('取消');
      })
    

    }


</script>