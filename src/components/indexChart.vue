<template>
    <div>
        <el-card class="box-card ">
            <template #header>
                <div class="card-header text-sm flex justify-between">
                    <span>订单销量</span>
                    <div v-for="(item,index) in options" :key="index">
                        <el-check-tag :checked="current ==item.value" style=" margin-right: 1px;"
                            @click="handleCurrent(item.value)">{{item.text}}</el-check-tag>
                    </div>
                </div>
            </template>
            <div ref="el" id="indexChart" style="width:100%; height:300px"></div>
            1
        </el-card>

    </div>
</template>

<script setup>
import { onMounted, ref , onBeforeUnmount} from 'vue';
import { getstatistics3 } from '~/api/statistics.js'
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useResizeObserver } from '@vueuse/core'

echarts.use([GridComponent, BarChart, CanvasRenderer]);

const el=ref(null)
useResizeObserver(el, (entries) => {
    myChart.resize()
    })
//标题+选中
const current = ref('week')
const options = [{
    text: "近1个月",
    value: "month"
}, {
    text: "近1周",
    value: "week"
}, {
    text: "近24小时",
    value: "hour"
}]
const handleCurrent = (value) => {
    current.value = value
    getChartData()

}

// echart 图表
let myChart = null
onMounted(() => {
    let chartDom = document.getElementById('indexChart');
    myChart = echarts.init(chartDom);
    getChartData()
})
 // 销毁
 onBeforeUnmount(()=>{
    if (myChart) echarts.dispose(myChart)
})

const getChartData = () => {

    let option;
    option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    myChart.showLoading();
    getstatistics3(current.value).then(res => {
        option.xAxis.data = res.x
        option.series[0].data = res.y
        myChart.setOption(option);
    }).finally(() => {
        myChart.hideLoading();
    })


}


</script>

<style lang="scss" scoped>

</style>