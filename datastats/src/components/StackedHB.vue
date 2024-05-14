<template>
    <div id="chart-container" style="width: 700px; height: 700px;"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import data from '../accets/json/datastats.json';

onMounted(() => {
    const categories = data.categories;
    const seriesData = data.series;

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            orient: 'horizontal',
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
        },
        yAxis: {
            type: 'value'
        },
        xAxis: {
            type: 'category',
            data: categories
        },
        series: seriesData.map(item => ({
            name: item.name,
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: item.data
        }))
    };

    const myChart = echarts.init(document.getElementById('chart-container'));
    myChart.setOption(option);
});
</script>
