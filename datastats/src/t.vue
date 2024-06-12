<template>
    <div>
      <h1>父组件</h1>
      <p>窗体宽度: {{ windowWidth }}</p>
      <ChildComponent @refresh="refreshPage" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ChildComponent from './ChildComponent.vue';
  
  const windowWidth = ref(window.innerWidth);
  
  const refreshPage = () => {
    console.log('刷新页面');
    windowWidth.value = window.innerWidth; // 更新窗体宽度
  };
  
  </script>
  