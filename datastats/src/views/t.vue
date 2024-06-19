<template>
  <div class="weather">
    <h1>Weather in {{ city }}</h1>
    <p>{{ weatherDescription }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const renderChart = (jsonData) => {
  // ... 其他代码 ... 

  const years = Object.keys(jsonData);
  // 在 series 循环外部定义 maxValue
  let maxValue = 0; 

  const series = years.map((year, index) => {
    // 获取当前 year 的 data 中的最大值，并更新 maxValue
    maxValue = Math.max(maxValue, ...jsonData[year].map(item => item.值)); 

    return {
      name: year,
      type: 'bar',
      data: jsonData[year].map(item => item.值),
      // ... 其他 series 选项 ...
    };
  });

  // ... 其他代码 ...

  const option = {
    // ... 其他选项 ...

    yAxis: {
      // ... 其他 yAxis 选项 ...

      min: 0,
      max: maxValue, // 使用外部作用域中的 maxValue 
    },

    // ... 其他选项 ...
  };

  // ... 其他代码 ...
};
</script>