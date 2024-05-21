<template>
    <div class="table-container" ref="container">
        <table>
            <thead>
                <tr>
                    <th>番号</th>
                    <th>邸名</th>
                    <th>納期</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody ref="tableBody">
                <tr v-for="item in displayedData" :key="item.id">
                    <td>{{ item.番号 }}</td>
                    <td>{{ item.邸名 }}</td>
                    <td>{{ item.納期 }}</td>
                    <td :class="item.状态 === '納品済' ? 'status-completed' : ''">{{ item.状态 }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import jsonData from '../assets/json/deliveryDate.json';

const container = ref(null);
const displayedData = ref([]);
let interval = null;

const calculateVisibleCount = () => {
    const containerHeight = container.value.clientHeight;
    const rowHeight = 40;
    return Math.floor(containerHeight / rowHeight);
};

const scrollData = () => {
    const visibleCount = calculateVisibleCount();
    const firstItem = jsonData.shift();
    jsonData.push(firstItem);
    displayedData.value = jsonData.slice(0, visibleCount);
};

onMounted(async () => {
    await nextTick();
    displayedData.value = jsonData.slice(0, calculateVisibleCount());
    interval = setInterval(scrollData, 1000);
    window.addEventListener('resize', handleResize);
    window.addEventListener('fullscreenchange', handleResize);
});

onUnmounted(() => {
    clearInterval(interval);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('fullscreenchange', handleResize);
});

const handleResize = () => {
    displayedData.value = jsonData.slice(0, calculateVisibleCount());
};
</script>

<style scoped>
.table-container {
    width: 100%;
    margin-top: 7px;
    overflow: hidden;
    border: 1px solid #ccc;
}

table {
    width: 100%;
    border-collapse: collapse;
    color: #fff;
}

th,
td {
    padding: 7px;
    text-align: center;
    font-size: 0.85rem;
}

th {
    color: #74A8FF;
    border-top: 3px solid #242C44;
    border-bottom: 3px solid #242C44;

}

tr:hover {
    background-color: #242C44;
}

.status-completed {
    color: #74A8FF;
}
</style>