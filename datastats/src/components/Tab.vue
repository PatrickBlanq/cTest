<template>
    <div v-if="isSelected" class="tab-content">
        <slot></slot>
    </div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue';

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

const selectedTab = inject('selectedTab');
const addTab = inject('addTab');

const isSelected = computed(() => selectedTab.value === props.index);

onMounted(() => {
    addTab({ label: props.label, index: props.index });
});
</script>

<style scoped>
.tab-content {
    height: 100%;
    width: 100%;
}
</style>
