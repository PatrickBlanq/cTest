<template>
    <div ref="target" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import * as echarts from 'echarts';

const props = defineProps({
    jsonData: {
        type: Object,
        required: true
    }
});

watch(
    () => props.jsonData,
    (newJsonData) => {
        // 使用 nextTick 确保在 myChart 初始化后才渲染图表
        nextTick(() => {
            if (myChart) {
                renderChart(newJsonData);
            }
        });
    },
    { deep: true }
);

const target = ref(null);
let myChart = null;

onMounted(() => {
    window.addEventListener('resize', handleResize);
    myChart = echarts.init(target.value, null, {
        width: '750px',
        height: 'auto'
    });

    renderChart(props.jsonData);
});
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
function handleResize() {
    if (myChart) {
        myChart.resize({
            width: '750px',
            height: 'auto'
        });
    }
}

const renderChart = (jsonData) => {
    const FontColor = '#848896'; // 文字颜色
    const gradientColors = [['#03E2D5', '#478EF8'], ['#F2B564', '#EA6832']]; // 每组柱状图的渐变色

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
        barWidth: jsonData[year].length > 4 ? 10 : 20 // 柱宽
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
            bottom: 45,
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

    if (quarters.length > 13) {
        option.dataZoom = [{
            type: 'slider',
            start: 0,
            end: 30,
            height: 15,
            bottom: 10,
        }];
    } else {
        console.log(quarters.length);
        option.dataZoom = [{
            show: false
        }];
    }

    myChart.setOption(option, { notMerge: true });
};
</script>

<style scoped>
.chart-container {
    width: 98%;
    height: auto;
}
</style>
