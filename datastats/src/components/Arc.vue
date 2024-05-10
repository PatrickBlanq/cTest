<template>
    <canvas ref="myCanvas" width="120" height="120"></canvas>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const myCanvas = ref(null);

onMounted(() => {
    const canvas = myCanvas.value;
    const ctx = canvas.getContext('2d');
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = canvas.height / 3;
    let startAngle = 20 + 180;
    let endAngle = 20 + 140 + 180;

    startAngle = startAngle * Math.PI / 180;
    endAngle = endAngle * Math.PI / 180;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineWidth = 17;
    ctx.strokeStyle = '#848896';
    ctx.stroke();

    endAngle = props.data.endAngle * Math.PI / 180;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineWidth = 16;
    ctx.strokeStyle = props.data.color;
    ctx.stroke();

    // 添加数字
    ctx.font = '1.6rem Microsoft YaHei';
    ctx.fillStyle = '#fff';
    let numWidth = ctx.measureText(props.data.num).width;
    ctx.fillText(props.data.num, x - numWidth / 2, y + canvas.height / 6);
    // 添加文字
    ctx.font = '1rem  Microsoft YaHei';
    ctx.fillStyle = '#848896';
    numWidth = ctx.measureText(props.data.title).width;
    ctx.fillText(props.data.title, numWidth / 2.2, y + canvas.height / 2.5);
});

</script>

<style scoped>
canvas {
    border: 0px solid #000;
}
</style>
