<template>
  <div @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <div v-show="selected">
      tttttttt悬停显示的内容
    </div>
    常规显示的内容
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const selected = ref(false);

    const handleMouseOver = () => {
      selected.value = true;
    };

    const handleMouseLeave = () => {
      selected.value = false;
    };

    return {
      selected,
      handleMouseOver,
      handleMouseLeave
    };
  }
};
</script>
