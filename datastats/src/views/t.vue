<template>
  <div>
    <h1>父组件</h1>
    <!-- 引入子组件，并在需要的位置使用 -->
    <ChildComponent />
  </div>
</template>

<script>
// 引入子组件
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent // 注册子组件
  }
};
</script>

<style scoped>
/* 父组件的样式 */
</style>
