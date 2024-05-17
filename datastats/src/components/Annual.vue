<template>
    <div ref="target" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import * as echarts from 'echarts';
import jsonData from '../assets/json/annualBuilding.json';

const target = ref(null);
let myChart = null;

onMounted(async () => {
    await nextTick();

    const domWidth = target.value.clientWidth;
    const domHeight = target.value.clientHeight;

    if (domWidth > 0 && domHeight > 0) {
        myChart = echarts.init(target.value);
        renderChart(domWidth, domHeight);
    } else {
        console.error("Container dimensions are 0, cannot initialize ECharts.");
    }
});

const renderChart = (width, height) => {
    const FontColor = '#848896'; // 文字白色
    const gradientColors = [['#03E2D5', '#478EF8'], ['#F2B564', '#EA6832']]; // 每组柱状图的颜色

    const years = Object.keys(jsonData);
    const series = years.map((year, index) => ({
        name: year,
        type: 'bar',
        data: jsonData[year].map(item => item.值),
        itemStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: gradientColors[index][0] // 第一种颜色
                }, {
                    offset: 1,
                    color: gradientColors[index][1] // 第二种颜色
                }]
            }
        },
        barWidth: 20
    }));

    const quarters = jsonData[years[0]].map(item => item.季度);

    const option = {
        legend: {
            right: 20,
            top: 10,
            orient: 'vertical',
            itemWidth: 12,
            itemHeight: 12,
            icon: 'rect',

            data: years.map((year, index) => ({
                name: year,
                textStyle: {
                    color: gradientColors[index][0]
                }
            }))
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 25,
            bottom: 40,
            left: 80,
            right: 50
        },
        xAxis: {
            type: 'category',
            data: quarters,
            axisLabel: {
                show: true,
                color: FontColor,
                fontSize: 13,
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            axisLabel: {
                show: true,
                color: FontColor,
                fontSize: 13,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
                inside: false,
            },
            splitLine: {
                show: false
            }
        },
        series
    };

    myChart.setOption(option, { width, height });
};
</script>

<style scoped>
.chart-container {
    border: 0px solid #ccc;
    min-width: 550px;
    min-height: 230px;
    height: 100%;
    width: 100%;
}
</style>