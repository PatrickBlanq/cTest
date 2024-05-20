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

const data = ref([
    { id: 1, 番号: 'SRG1-095910', 邸名: '18412788', 納期: '2024/03/03, 14:00', 状态: '検図待' },
    { id: 2, 番号: 'SRG1-095910', 邸名: '18405222', 納期: '2024/03/03, 14:00', 状态: '納品済' },
    { id: 3, 番号: 'SRG1-095910', 邸名: '18314171', 納期: '2024/03/03, 12:00', 状态: '納品待' },
    { id: 4, 番号: 'SRG2-109908', 邸名: '18407341', 納期: '2024/03/03, 14:00', 状态: '検図待' },
    { id: 5, 番号: 'SRG1-095813', 邸名: '18410048', 納期: '2024/03/03, 14:00', 状态: '作図中' },
    { id: 6, 番号: 'SRG1-095910', 邸名: '18407878', 納期: '2024/03/03, 14:00', 状态: '検図待' },
    { id: 7, 番号: 'SRG1-095813', 邸名: '18410048', 納期: '2024/03/03, 14:00', 状态: '作図中' },
    { id: 8, 番号: 'SRG3-123456', 邸名: '18413333', 納期: '2024/03/04, 10:00', 状态: '納品待' },
    { id: 9, 番号: 'SRG2-098765', 邸名: '18406666', 納期: '2024/03/04, 12:00', 状态: '検図待' },
    { id: 10, 番号: 'SRG1-111111', 邸名: '18399999', 納期: '2024/03/05, 14:00', 状态: '作図中' },
    { id: 11, 番号: 'SRG4-456789', 邸名: '18411111', 納期: '2024/03/06, 09:00', 状态: '納品済' },
    { id: 12, 番号: 'SRG5-543210', 邸名: '18402222', 納期: '2024/03/07, 11:00', 状态: '検図待' },
    { id: 13, 番号: 'SRG3-987654', 邸名: '18398888', 納期: '2024/03/08, 13:00', 状态: '作図中' },
    { id: 14, 番号: 'SRG2-876543', 邸名: '18414444', 納期: '2024/03/09, 15:00', 状态: '納品待' },
    { id: 15, 番号: 'SRG6-789012', 邸名: '18403333', 納期: '2024/03/10, 10:30', 状态: '納品済' },
    { id: 16, 番号: 'SRG1-321098', 邸名: '18397777', 納期: '2024/03/11, 12:30', 状态: '検図待' },
    { id: 17, 番号: 'SRG4-098765', 邸名: '18415555', 納期: '2024/03/12, 14:30', 状态: '作図中' }
]);
const container = ref(null);
const displayedData = ref([]);
let interval = null;

const calculateVisibleCount = () => {
    const containerHeight = container.value.clientHeight;
    //console.log(containerHeight);
    const rowHeight = 40;
    return Math.floor(containerHeight / rowHeight);
};

const scrollData = () => {
    const visibleCount = calculateVisibleCount();
    const firstItem = data.value.shift();
    data.value.push(firstItem);
    displayedData.value = data.value.slice(0, visibleCount);
};

onMounted(async () => {
    await nextTick();
    displayedData.value = data.value.slice(0, calculateVisibleCount());
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

    displayedData.value = data.value.slice(0, calculateVisibleCount());
};
</script>

<style scoped>
.table-container {
    width: 100%;
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

.status-completed {
    color: #74A8FF;
}
</style>