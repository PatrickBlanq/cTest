<template>
    <div ref="target" class="chart-container"></div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import jsonData from '../assets/json/attendance.json';

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

const renderChart = () => {
    const seriesData = jsonData.array1.map(item => ({
        name: item.状态,
        value: item.人数,

    }));

    const colors = ['#488EF8', '#F88582', '#71FCF8', '#F2B564'];//bar的颜色

    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'right',
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
        title: [{
            text: jsonData.array2[0].人数.toString(),
            left: 'center',
            top: '19%',
            textStyle: {
                color: 'white',
                fontSize: 20,
            },
        }, {
            text: jsonData.array2[0].状态.toString() + "人数",
            left: 'center',
            top: '36%',
            textStyle: {
                color: 'white',
                fontSize: 14,
                fontWeight: 'normal',
            },
        }],
        series: [
            {
                name: '状态',
                type: 'pie',
                padAngle: 5,
                itemStyle: {
                    borderRadius: 2
                },
                radius: ['45%', '60%'],
                center: ['50%', '35%'],
                position: "outside",
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    fontSize: 14,
                    formatter: function (data) {
                        return data.name + "" + data.percent.toFixed(0) + "%";
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
