<template>
    <el-card  shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span>{{title}}</span>
        <el-tag type="danger" effect="light">{{tip}}</el-tag>
      </div>
    </template>
    <el-row :gutter="20">
        <el-col :span="6" :offset="0" v-for="(item,index) in btns" :key="index">
            <el-card  shadow="hover" style="border:0px;background-color:#e9ecef ;">
                <div class="flex flex-col justify-center items-center" >
                    <div class="text-xl mb-2">{{item.value}}</div>
                    <div class="text-xs text-gray-500">{{item.label}}</div>
                </div>
                
            </el-card>
        </el-col>
    </el-row>
  </el-card>
</template>

<script setup>


defineProps({
   title:String,
   tip:String,
   btns:Array
})

</script>

<style >

</style>