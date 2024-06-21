<template>
    <div ref="target" class="chart-container"></div>
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
        
        renderChart(newJsonData);
      }
    });
  },
  { deep: true }
);

onMounted(async () => {
    window.addEventListener('resize', handleResize);
    myChart = echarts.init(target.value);
    await props.jsonData;
    renderChart(props.jsonData);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

function handleResize() {
    if (myChart) {
        myChart.resize();
    }
}

const renderChart = (jsonData) => {
    const total = jsonData.data.reduce((sum, item) => sum + item.value, 0);

    const seriesData = jsonData.data.map(item => ({
        name: item.category,
        value: item.value,
    }));

    const colors = ['#488EF8', '#F88582', '#71FCF8', '#F2B564'];

    const totalString = total.toString();
    const totalLength = totalString.length;
    const leftPosition = (totalLength > 4) ? (19.5 - totalLength * 0.88) : (20 - totalLength * 0.88);
    const maxValueLength = Math.max(...seriesData.map(item => item.value.toString().length));
    const maxCategoryLength = Math.max(...seriesData.map(item => item.name.toString().length));

    const option = {
        tooltip: {
            trigger: 'item',
            show: false,
        },
        grid: {
            left: '10%',
            right: '25%',
        },
        legend: {
            orient: 'vertical',
            left: '50%',
            top: 'middle',
            itemGap: 22,
            data: seriesData.map((item, index) => ({
                name: item.name,
                textStyle: {
                    color: colors[index],
                    fontSize: '1rem',
                },
                icon: 'circle',
            })),

            formatter: function (name) {
                const item = seriesData.find(i => i.name === name);
                const percentage = ((item.value / total) * 100).toFixed(0);
                // 计算空格数量
                const valueSpaceCount = (maxValueLength - item.value.toString().length);
                const valueRightSpaces = ' '.repeat(valueSpaceCount + 3);
                const ValueLeftSpaces = ' '.repeat(valueSpaceCount);
                const categorySpaceCount = (maxCategoryLength - item.name.toString().length) * 3;
                const categoryRightSpaces = ' '.repeat(categorySpaceCount + 3);

                return `${item.name}${categoryRightSpaces} ${ValueLeftSpaces}${item.value}${valueRightSpaces} ${percentage}%`;
            },
        },
        title: [{
            text: totalString,
            left: `${leftPosition}%`,
            top: '36%',
            textStyle: {
                color: 'white',
                fontSize: '1.6rem',
                fontWeight: 'bold',
            },
        }, {
            text: "统计",
            left: '18%',
            top: '52%',
            textStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'normal',
            },
        }],
        series: [
            {
                name: '状态',
                type: 'pie',
                padAngle: 5,
                itemStyle: {
                    borderRadius: 7
                },
                radius: ['62.5%', '70%'],
                center: ['22%', '48%'],
                position: "outside",
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    fontSize: 14,
                    formatter: function (data) {
                        return `${data.name} ${data.percent.toFixed(0)}%`;
                    },
                    color: 'inherit'
                },
                labelLine: {
                    show: false
                },
                data: seriesData,
            }
        ],
        color: colors
    };

    myChart.setOption(option);
};
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 100%;
    border: 0px solid #ccc;
    box-sizing: border-box;
    position: relative;
}
</style>
