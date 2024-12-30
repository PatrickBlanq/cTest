<template>
  <div class="tab-control">
    <div class="tab-headers">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectTab(index)"         :class="{ active: selectedIndex === index }"         class="tab-header"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="tab-content">
      <slot :name="`tab-${selectedIndex}`"></slot>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'TabControl',
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const selectedIndex = ref(0);

    const selectTab = (index) => {
      selectedIndex.value = index;
    };

    return {
      selectedIndex,
      selectTab
    };
  }
};
</script>
<style scoped>
.tab-control {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.tab-headers {
  display: flex;
}

.tab-header {
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s;
}

.tab-header.active {
  border-bottom: 2px solid #007bff;
  font-weight: bold;
}

.tab-content {
  padding: 20px;
}
</style>
