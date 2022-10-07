<template>
    <div>
    <el-row :gutter="12">
     <el-col :span="3" v-for="(item,index) in iconNavs" :key="index">
        <el-card class="box-card cursor-pointer " shadow="hover" @click="$router.push(item.path)">
            <div class="flex flex-col justify-center items-center">   
            <el-icon :class="item.color"><component :class="item.color" :is="item.icon"></component></el-icon>
            <div :class="item.color " class="text-sm" >{{item.title}}</div>
        </div>  
        </el-card>
    </el-col>
  </el-row>
    </div>
</template>

<script setup>
const iconNavs = [
        {
            icon:"user",
            color:"text-light-blue-500",
            title:"用户",
            path:"/user/list"
        },
        {
            icon:"shopping-cart",
            color:"text-violet-500",
            title:"商品",
            path:"/goods/list"
        },
        {
            icon:"tickets",
            color:"text-fuchsia-500",
            title:"订单",
            path:"/order/list"
        },
        {
            icon:"chat-dot-square",
            color:"text-teal-500",
            title:"评价",
            path:"/comment/list"
        },
        {
            icon:"picture",
            color:"text-rose-500",
            title:"图库",
            path:"/image/list"
        },
        {
            icon:"bell",
            color:"text-green-500",
            title:"公告",
            path:"/notice/list"
        },
        {
            icon:"set-up",
            color:"text-grey-500",
            title:"配置",
            path:"/setting/base"
        },
        {
            icon:"files",
            color:"text-yellow-500",
            title:"优惠券",
            path:"/coupon/list"
        }
    ]

</script>

<style lang="scss" scoped>

</style>