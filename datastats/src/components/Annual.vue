<template>
    <div ref="target" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from 'echarts';

const props = defineProps({
    jsonData: {
        type: Object,
        required: true
    }
});

const target = ref(null);
let myChart = null;

onMounted(() => {
    window.addEventListener('resize', handleResize);
    myChart = echarts.init(target.value);

    renderChart();
});
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
function handleResize() {
    if (myChart) {
        myChart.resize();
    }
}

const renderChart = (width, height) => {
    const FontColor = '#848896'; // 文字颜色
    const gradientColors = [['#03E2D5', '#478EF8'], ['#F2B564', '#EA6832']]; // 每组柱状图的渐变色

    const years = Object.keys(props.jsonData);
    const series = years.map((year, index) => ({
        name: year,
        type: 'bar',
        data: props.jsonData[year].map(item => item.值),
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
        barWidth: props.jsonData[year].length > 4 ? 12 : 20 // 柱宽
    }));

    const quarters = props.jsonData[years[0]].map(item => item.季度);

    const option = {
        legend: {
            right: 20,
            top: 10,
            orient: 'vertical',
            itemWidth: 12,
            itemHeight: 12,
            icon: 'rect',
            itemGap: 10,
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
            bottom: 35,
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

    myChart.setOption(option);
};
</script>

<style scoped></style>
