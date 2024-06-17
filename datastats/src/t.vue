<template>
  <div class="tab-control">
      <div class="tab-list">
          <div class="mark" style="margin-left: 17px; margin-right: 10px;"></div>
          <!--遍历tabs数组，生成对应的tab，点击tab时，设置选中的tab-->
          <div v-for="(tab, index) in tabs" :key="index" class="tab-container">
              <div :class="['tab', { active: selectedTab === index }]" @click="selectedTab = index">
                  {{ tab.label }}
              </div>
              <div v-show="index < tabs.length - 1" class="separator" style="margin-left: 10px;"></div>
          </div>
      </div>
      <!--插入具体的tab内容-->
      <div class="tab-panels">
          <slot :selectedTab="selectedTab"></slot>
      </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

// 定义选项卡数组和选中的选项卡
const tabs = ref([]);
const selectedTab = ref(0);

// 添加一个选项卡到选项卡数组
function addTab(tab) {
  tabs.value.push(tab);
}

// 提供选中的选项卡和添加选项卡的方法给子组件使用
provide('selectedTab', selectedTab);
provide('addTab', addTab);
</script>