<template>
    <div>
        <!-- //骨架屏 -->
        <el-row :gutter="30">
        <template v-if="statisticsinfo.panels.length == 0">       
            <el-col :offset="0" :span="6" v-for="(item,index) in statisticsinfo.panels" :key="index">
                <el-skeleton style="width: 240px" v-if="item.length==0">
                    <template #template>
                        <el-card class="border-0" shadow="hover">
                            <template #header>
                                <div class="flex justify-between">
                                    <el-skeleton-item variant="text" style="width: 30%" />
                                    <el-skeleton-item variant="text" style="width: 30%" />
                                </div>
                            </template>
                            <div class="text-xl font-bold text-gray-600">
                                <el-skeleton-item variant="text" style="width: 30%" />
                            </div>
                            <el-divider />
                            <div class="flex justify-between text-sm text-gray-500">
                                <el-skeleton-item variant="text" style="width: 30%" />
                                <el-skeleton-item variant="text" style="width: 30%" />
                            </div>
                        </el-card>
                    </template>
                </el-skeleton>
            </el-col>
        </template>
                <template >
                    <el-col :offset="0" :span="6" v-for="(item,index) in statisticsinfo.panels" :key="index">
                    <el-card class="border-0" shadow="hover">
                        <template #header>
                            <div class="flex justify-between">
                                <span style="font-size:13px">{{item.title}}</span>
                                <el-tag class="ml-2" type="danger">{{item.title}}</el-tag>
                            </div>
                        </template>
                        <div class="text-xl font-bold text-gray-600">
                            {{item.value}}
                        </div>
                        <el-divider />
                        <div class="flex justify-between text-sm text-gray-500">
                            <div>{{item.subTitle}}</div>
                            <div>{{item.subValue}}</div>
                        </div>
                    </el-card>
                </el-col>
                </template>
            
           
        </el-row>



</div>

</template>

<script setup>
import { ref } from 'vue';
import { getstatistics1 } from '~/api/statistics'

const statisticsinfo = ref([])
const getstatistics = async () => {
    const res = await getstatistics1()
    statisticsinfo.value = res
}

getstatistics()


</script>

<style lang="scss" scoped>

</style>
