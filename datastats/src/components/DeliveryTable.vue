<template>
    <div class="table-container" ref="container" :style="{ height: (height) + 'px' }">
        <table>
            <thead>
                <tr>
                    <th>番号</th>
                    <th>邸名</th>
                    <th>納期</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody ref="tableBody" :style="{ height: (height - 47) + 'px' }">
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

const props = defineProps({
  height: Number
});

const container = ref(null);
const displayedData = ref([]);
let interval = null;

const calculateVisibleCount = () => {
    const containerHeight = container.value.clientHeight;
    //console.log(container.value.clientHeight);
    const rowHeight = 40;
    return Math.floor(containerHeight / rowHeight);
     
};

const scrollData = () => {
    const visibleCount = calculateVisibleCount();    
    const firstItem = jsonData.data.shift();
    jsonData.data.push(firstItem);
    displayedData.value = jsonData.data.slice(0, visibleCount);
};

onMounted(async () => {
    
    await nextTick();
    displayedData.value = jsonData.data.slice(0, calculateVisibleCount());
    interval = setInterval(scrollData, 1000);
    window.addEventListener('resize', handleResize);

});

onUnmounted(() => {
    clearInterval(interval);
    window.removeEventListener('resize', handleResize);

});

const handleResize = () => {
    displayedData.value = jsonData.data.slice(0, calculateVisibleCount());
};
</script>

<style scoped>
.table-container {
    box-sizing: border-box;
    margin-top: 0px;
    overflow: hidden;
    border: 0px solid red;
    padding: 0px 3px 0px 3px;
}

table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    border: 0px solid #ccc;
    color: #fff;
}

th,
td {
    padding: 7px;
    text-align: center;
    font-size: 0.85rem;
    height: 20px; /* 统一设置行高 */
}

th {
    color: #74A8FF;
    border-top: 3px solid #242C44;
    border-bottom: 3px solid #242C44;
    background-color: #0C1530;


}

tbody{
    border: 0px solid #ccc;
}
tbody tr:hover {
    background-color: #242C44;
}

.status-completed {
    color: #74A8FF;
}
</style>