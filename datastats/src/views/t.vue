<template>
  <div class="weather">
    <h1>Weather in {{ city }}</h1>
    <p>{{ weatherDescription }}</p>
  </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios'; // 假设你使用 axios 发送请求

const target = ref(null);
let myChart = null;

onMounted(async () => {
  window.addEventListener('resize', handleResize);
  myChart = echarts.init(target.value);

  try {
    // 发送请求获取 JSON 数据
    const response = await axios.get('../assets/json/categoryPie.json');
    const jsonData = response.data;

    // 遍历 JSON 数据，将 value 替换为随机数
    jsonData.forEach(item => {
      item.value = Math.floor(Math.random() * 1000); // 生成 0 到 999 之间的随机数
    });

    renderChart(jsonData); // 使用修改后的 JSON 数据渲染图表
  } catch (error) {
    console.error("获取 JSON 数据失败:", error);
  }
});

// ... 其他代码 (保持不变) ...

const renderChart = (jsonData) => { // 将 jsonData 作为参数传入
  // ... 其他代码 (保持不变) ...
};
</script>