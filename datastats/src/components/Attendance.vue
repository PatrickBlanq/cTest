<template>
    <div ref="target" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import jsonData from '../assets/json/attendance.json';

const target = ref(null);
let myChart = null;

onMounted(async () => {
    await nextTick();

    const domWidth = target.value.clientWidth;
    const domHeight = target.value.clientHeight;

    if (domWidth > 0 && domHeight > 0) {
        myChart = echarts.init(target.value);
        renderChart();
    } else {
        console.error("Container dimensions are 0, cannot initialize ECharts.");
    }
});

const renderChart = () => {

    const seriesData = jsonData.map(item => ({
        name: item.状态,
        value: item.人数,

    }));

    const colors = ['#488EF8', '#F88582', '#71FCF8', '#F2B564'];//bar的颜色

    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'horizontal',
            bottom: '1%',
            left: 'center',
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

        series: [
            {
                name: '状态',
                type: 'pie',
                padAngle: 5,
                itemStyle: {
                    borderRadius: 3
                },
                radius: ['35%', '50%'],
                center: ['50%', '40%'],
                position: "outside",
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    fontSize: 14,
                    formatter: function (data) {
                        return data.name + "" + data.percent.toFixed(0) + "%";
                    },

                    color: 'inherit'

                },
                labelLine: {

                    length: 20,
                    length2: 40

                },
                data: seriesData,

            }
        ],
        color: colors // 设置颜色顺序
    };




    myChart.setOption(option);
};
</script>

<style scoped>
.chart-container {
    border: 0px solid #ccc;
    min-width: 470px;
    min-height: 150px;
    height: 100%;
    width: 100%;
}
</style>
