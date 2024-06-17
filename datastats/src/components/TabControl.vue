<template>
    <div class="tab-control">
        <div class="tab-list">
            <div class="mark" style="margin-left: 17px; margin-right: 10px;"></div>
            <div v-for="(tab, index) in tabs" :key="index" class="tab-container">
                <div :class="['tab', { active: selectedTab === index }]" @click="selectedTab = index">
                    {{ tab.label }}
                </div>
                <div v-show="index < tabs.length - 1" class="separator" style="margin-left: 10px;"></div>
            </div>
        </div>
        <div class="tab-panels">
            <slot :selectedTab="selectedTab"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const tabs = ref([]);
const selectedTab = ref(0);

function addTab(tab) {
    tabs.value.push(tab);
}

provide('selectedTab', selectedTab);
provide('addTab', addTab);
</script>

<style scoped>
.tab-control {
    padding-top: 10px;
    border: 0px solid #ccc;
    width: 100%;
    height: 100%;
}

.tab-list {
    display: flex;
    align-items: center;
    border-bottom: 0px solid #ccc;
}

.tab-container {
    display: flex;
    align-items: center;
    margin-right: 10px;
}



.tab {
    border: 0px solid #ccc;
    cursor: pointer;
}

.tab.active {
    font-weight: bold;
    border-bottom: 2px solid #000;
    color: #6FF8F4;
}

.tab-panels {
    border: 0px solid #ccc;
    width: 100%;
    height: 90%;
    flex-grow: 1;
    padding: 0rem;
}
</style>