<template>
  <div>
    <h2>子组件</h2>
    <p>窗口大小改变时将调用父组件的刷新方法</p>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { emit } from 'vue'; // 这里需要显式导入

const emitEvent = () => {
  emit('refresh');
};

const handleResize = () => {
  emitEvent();
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
