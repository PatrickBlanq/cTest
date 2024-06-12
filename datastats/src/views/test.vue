<template>
    <div ref="collapseDiv" style="height: 100%; width: 100px;">
      <ChildComponent :height="childHeight" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import ChildComponent from './ChildComponent.vue';
  
  const parentDiv = ref(null);
  let childHeight = ref(0);
  let observer;
  
  onMounted(() => {
    observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        childHeight.value = entry.target.offsetHeight;
      }
    });
  
    observer.observe(parentDiv.value);
  });
  
  onUnmounted(() => {
    observer.unobserve(parentDiv.value);
  });
  
  </script>