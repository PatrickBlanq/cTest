<template>
    <div>
        <div>HorizontalBar</div>
        <div ref="target" :style="{ width: '50px', height: '50px', border: '1px solid black' }"></div>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

// 初始化
let myChart = null;
const target = ref(null);
onMounted(() => {
    myChart = echarts.init(target.value);
    renderChart();
});

// 绘制图表
const renderChart = () => {
    myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    });
};
</script>

<style scoped></style>
