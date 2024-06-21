<template>
    <div ref="target" class="chart-container" style="box-sizing: border-box; "></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted,watch,nextTick } from 'vue';
import * as echarts from 'echarts';

const target = ref(null);
let myChart = null;

const props = defineProps({
  jsonData: {
    type: Object,
    required: true
  }
});

watch(
  () => props.jsonData,
  (newJsonData) => {
    nextTick(() => {
      if (myChart) {
        renderChart(newJsonData.series);
      }
    });
  },
  { deep: true }
);

onMounted(() => {
    window.addEventListener('resize', handleResize);
    myChart = echarts.init(target.value);
    renderChart(props.jsonData.series);
});
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
function handleResize() {
    if (myChart) {
        myChart.resize();
    }
}
const renderChart = (seriesData) => {
    const colors = ['#488EF8', '#F88582', '#71FCF8', '#F2B564'];//bar的颜色
    const yAxisColor = '#098192'; // 指定 Y 轴的绿色
    const FontColor = '#fff'; // 文字白色
    const option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            orient: 'horizontal',
            bottom: '4%', 
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 20,
            data: seriesData.map((item, index) => ({
                name: item.name,
                textStyle: {
                    color: colors[index]
                },
                icon: 'rect',
            }))
        },
        grid: {
            left: -100,
            right: 50,
            bottom: 37,
            top: 10,
            containLabel: true,

        },

        xAxis: {
            type: 'value',
            show: true,
            axisTick: {
                show: false
            },
            axisLine: {

                show: false,
                lineStyle: {
                    color: FontColor
                }
            },
            axisLabel: {
                show: true,
            },
            splitLine: {
                show: false
            }
        },

        yAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: yAxisColor,
                    width: 2.5

                }
            },
            axisLabel: {
                fontSize: 13,
                margin: 145,
                left: 200,
                color: FontColor,
                align: 'left',
                formatter: function (value) {
                    //  Y 轴标签的处理，超过阈值时进行截断并添加省略号
                    const maxLength = 10;
                    return value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
                }
            },
            axisTick: {
                show: false,
                inside: false,
            },
            data: seriesData[0].data.map(item => item.Name)
        },
        series: seriesData.map((item, index) => ({
            name: item.name,
            type: 'bar',
            stack: 'total',
            label: {
                show: true,
                color: FontColor
            },

            emphasis: {
                focus: 'series'
            },
            itemStyle: {
                color: colors[index]
            },
            data: item.data.map(dataItem => dataItem.value)
        }))
    };
    myChart.setOption(option);
};
</script>
