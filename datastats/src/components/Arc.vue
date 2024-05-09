<template>
    <div>
        <canvas ref="myCanvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const myCanvas = ref(null);

onMounted(() => {
    const canvas = myCanvas.value;
    const ctx = canvas.getContext('2d');
    const x = canvas.width / 2; // 圆心 x 坐标
    const y = canvas.height / 2; // 圆心 y 坐标
    const radius = 60; // 半径
    let startAngle = 20 + 180; // 起始角度（度）
    let endAngle = 20 + 140 + 180; // 结束角度（度）

    // 将角度转换为弧度
    startAngle = startAngle * Math.PI / 180;
    endAngle = endAngle * Math.PI / 180;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#000'; // 设置线条颜色
    ctx.stroke();
});
</script>

<style scoped>

</style>
