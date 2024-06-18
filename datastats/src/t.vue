<template>
  <!--只有在选中的选项卡是当前选项卡时，才显示内容-->
  <div v-if="isSelected" class="tab-content">
      <slot></slot>
  </div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue';

// 定义属性
const props = defineProps({
  label: {
      type: String,
      required: true,
  },
  index: {
      type: Number,
      required: true,
  },
});

// 从父组件注入选中的选项卡和添加选项卡的方法
const selectedTab = inject('selectedTab');
const addTab = inject('addTab');

// 计算当前选项卡是否被选中
const isSelected = computed(() => selectedTab.value === props.index);

// 在组件挂载后，将当前选项卡添加到选项卡数组
onMounted(() => {
  addTab({ label: props.label, index: props.index });
});
</script>