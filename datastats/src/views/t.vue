<template>
  <div class="card" v-loading="loading">
    <!-- 你的界面内容 -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const loading = ref(false);

// 请求配置
const request = axios.create({
  baseURL: '你的 API 基础路径',
  timeout: 5000, // 设置超时时间为 5000 毫秒（5 秒）
});

// 请求拦截器
request.interceptors.request.use(config => {
  loading.value = true;
  return config;
}, error => {
  loading.value = false;
  return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use(response => {
  loading.value = false;
  return response;
}, error => {
  loading.value = false;
  if (error.code === 'ECONNABORTED') {
    // 处理超时错误
    alert('请求超时，请稍后再试');
  }
  return Promise.reject(error);
});

// 示例 API 请求函数
async function fetchData() {
  try {
    const response = await request.get('/你的接口路径');
    console.log(response.data);
  } catch (error) {
    console.error('请求出错:', error);
  }
}

// 组件挂载时调用 API 请求
onMounted(() => {
  fetchData();
});
</script>
