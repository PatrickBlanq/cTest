<template>
    <canvas ref="canvasRef" width="300" height="13"></canvas>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const canvasRef = ref(null);
let data = reactive({});

const props = defineProps({
    totalExpected: {
        type: Number,
        default: 0,
    },
    totalFinished: {
        type: Number,
        default: 0,
    },
});
onMounted(() => {
    const width = 250
    if (props.totalExpected == null || props.totalFinished == null || props.totalExpected == 0 || props.totalFinished == 0) {
        data = {
            width2: 200,
            color: '#242C44',
            middleNum: '0%',
            rightNum: '0'
        };
    } else {
        if (props.totalFinished / props.totalExpected < 1) {
            data = {
                width2: width * props.totalFinished / props.totalExpected,
                //黄色
                color: '#F2B564',
                middleNum: ((props.totalFinished / props.totalExpected) * 100).toFixed(2).replace(/\.\d*$/, '') + "%",
                rightNum: props.totalFinished
            };
        } else {
            data = {
                width2: width,
                //蓝色
                color: '#488EF7',
                middleNum: ((props.totalFinished / props.totalExpected) * 100).toFixed(2).replace(/\.\d*$/, '') + "%",
                rightNum: props.totalFinished
            };
        }

    }

    drawCapsule();
});

const drawCapsule = () => {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');
    const x = 0; // 矩形左上角 x 坐标
    const y = 0; // 矩形左上角 y 坐标
    const width = canvas.width - 50; // 矩形宽度
    const height = 13; // 矩形高度
    const borderRadius = height / 2; // 圆角半径

    // 开始绘制路径
    ctx.beginPath();

    // 绘制左侧圆形
    ctx.arc(x + borderRadius, y + borderRadius, borderRadius, Math.PI * 0.5, Math.PI * 1.5);

    // 绘制矩形的右上角
    ctx.lineTo(x + width - borderRadius, y);
    ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);

    // 绘制矩形的右下角
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.arcTo(x + width, y + height, x + width - borderRadius, y + height, borderRadius);

    // 绘制右侧圆形
    ctx.lineTo(x + borderRadius, y + height);
    ctx.arc(x + borderRadius, y + height - borderRadius, borderRadius, Math.PI * 0, Math.PI * 0.5);

    // 完成路径绘制
    ctx.closePath();

    // 填充矩形
    ctx.fillStyle = '#242C44';
    ctx.fill();

    // 绘制路径2
    ctx.beginPath();

    // 绘制左侧圆形
    ctx.arc(x + borderRadius, y + borderRadius, borderRadius, Math.PI * 0.5, Math.PI * 1.5);

    // 绘制矩形的右上角
    ctx.lineTo(x + data.width2 - borderRadius, y);
    ctx.arcTo(x + data.width2, y, x + data.width2, y + borderRadius, borderRadius);

    // 绘制矩形的右下角
    ctx.lineTo(x + data.width2, y + height - borderRadius);
    ctx.arcTo(x + data.width2, y + height, x + data.width2 - borderRadius, y + height, borderRadius);

    // 绘制右侧圆形
    ctx.lineTo(x + borderRadius, y + height);
    ctx.arc(x + borderRadius, y + height - borderRadius, borderRadius, Math.PI * 0, Math.PI * 0.5);

    // 完成路径绘制
    ctx.closePath();

    // 填充矩形
    ctx.fillStyle = data.color;
    ctx.fill();
    // 添加中间数字
    ctx.font = '0.8rem Microsoft YaHei';
    ctx.fillStyle = '#fff';
    ctx.fillText(data.middleNum, width / 2 - 8, height - 1);

    // 添加右边数字
    ctx.font = '0.8rem Microsoft YaHei';
    ctx.fillStyle = '#fff';
    ctx.fillText(data.rightNum, width + 18, height - 2);
};
</script>
