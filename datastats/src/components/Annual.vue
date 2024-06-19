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
  const FontColor = '#848896';
  const gradientColors = [['#03E2D5', '#478EF8'], ['#F2B564', '#EA6832']];

  const years = Object.keys(jsonData);
  let maxValue = 0;

  const series = years.map((year, index) => {
    maxValue = Math.max(maxValue, ...jsonData[year].map(item => item.值));

    return {
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
            color: gradientColors[index][0]
          }, {
            offset: 1,
            color: gradientColors[index][1]
          }]
        }
      },
      barWidth: jsonData[year].length > 4 ? 10 : 20
    };
  });

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
      bottom: 43,
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
      },
      offset: 10
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
      },
      min: 0,
      max: maxValue
    },
    series
  };

  if (quarters.length > 13) {
    option.dataZoom = [{
      type: 'slider',
      start: 0,
      end: 35,
      height: 18,
      bottom: 18,
      tooltip: {
        show: false
      },
      textStyle: {
        color: 'transparent' // 将文字颜色设置为透明
      }
    }];
  } else {
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