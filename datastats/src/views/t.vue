<template>
  <div class="weather">
    <h1>Weather in {{ city }}</h1>
    <p>{{ weatherDescription }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 使用 ref 创建响应式数据
const city = ref('jilin');
const weatherDescription = ref('');

// 在 onMounted 钩子中调用 API
onMounted(async () => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=fa5f86877980b30bde6e69bcde28506b`)
  const data = await response.json();
  weatherDescription.value = data.weather[0].description;
});
</script>