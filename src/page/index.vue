<template>
    <div>
        <!-- //骨架屏 -->
        <!-- 面板一 -->
        <el-row :gutter="20 ">

            <template v-if="statisticsinfo.length == 0">
                <el-col :offset="0" :span="6" v-for="(index) in 4" :key="index">
                    <el-skeleton style="width: 100%;" animated loading>
                        <template #template>
                            <el-card class="border-0" shadow="hover">
                                <template #header>
                                    <div class="flex justify-between">
                                        <el-skeleton-item variant="text" style="width: 50%" />
                                        <el-skeleton-item variant="text" style="width: 30%" />
                                    </div>
                                </template>
                                <div class="text-xl font-bold text-gray-600">
                                    <el-skeleton-item variant="text" style="width: 70%" />
                                </div>
                                <el-divider />
                                <div class="flex justify-between text-sm text-gray-500">
                                    <el-skeleton-item variant="text" style="width: 60%" />
                                    <el-skeleton-item variant="text" style="width: 20%" />
                                </div>
                            </el-card>
                        </template>
                    </el-skeleton>
                </el-col>
            </template>
            <!-- <template v-else> -->
            <el-col :offset="0" :span="6" v-for="(item,index) in statisticsinfo" :key="index">
                <el-card shadow="hover" class="border-0 cursor-pointer">
                    <template #header>
                        <div class="flex justify-between">
                            <span style="font-size:13px">{{item.title}}</span>
                            <el-tag class="ml-2" type="danger">{{item.title}}</el-tag>
                        </div>
                    </template>
                    <div class="text-xl font-bold text-gray-600">
                        <!-- {{item.value}} -->
                        <countNumVue :value="item.value"></countNumVue>
                    </div>
                    <el-divider />
                    <div class="flex justify-between text-sm text-gray-500">
                        <div>{{item.subTitle}}</div>
                        <div>{{item.subValue}}</div>
                    </div>
                </el-card>
            </el-col>
            <!-- </template> -->
        </el-row>
        <!-- 面板二 -->
        <indexNav style="margin-top:20px;"></indexNav>
        <!-- chart图表 -->
        <el-row :gutter="10" style="margin-top:20px">
            <el-col :span="12">
                <indexChart></indexChart>
            </el-col>
            <el-col :span="12"></el-col>
        </el-row>
    </div>

</template>

<script setup>
import indexChart from '~/components/indexChart.vue';
import indexNav from '~/components/indexNav.vue';
import { ref } from 'vue';
import { getstatistics1 } from '~/api/statistics'
import countNumVue from '~/components/countNum.vue';

const statisticsinfo = ref([])
const getstatistics = async () => {
    const { panels } = await getstatistics1()
    statisticsinfo.value = panels
}

getstatistics()


</script>

<style lang="scss" scoped>

</style>
