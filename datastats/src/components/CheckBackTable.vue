<template>
    <div class="table-container" ref="container" :style="{ height: (height-5) + 'px' }">
        <table>
            <thead>
                <tr>
                    <th style="width: 20%;">发生年月</th>
                    <th style="width: 20%;">取印先</th>
                    <th style="width: 20%;">管理番号</th>
                    <th style="width: 30%; padding-right: 30px;">所属</th>
                </tr>
            </thead>
            <tbody ref="tableBody" :style="{ height: (height - 50) + 'px' }">
                <tr v-for="item in jsonData.data" :key="item.id">
                    <td style="width: 20%;">{{ item.发生年月 }}</td>
                    <td style="width: 20%;">{{ item.取印先 }}</td>
                    <td style="width: 20%;">{{ item.管理番号 }}</td>
                    <td style="width: 30%;"> {{ item.所属 }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import jsonData from '../assets/json/checkBack.json';
import {  onMounted, onUnmounted } from 'vue';

const props = defineProps({
    height: Number
});


const handleResize = () => {

    /* console.log("Resized, new height:", props.height-1); */
};


onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set the height
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

</script>

<style scoped>
.table-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 0px solid #ccc;
    padding: 0px 3px 0px 3px;
}

table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    background-color: #0C1530;
    color: #fff;
}

th,
td {
    padding: 7px;
    text-align: center;
    font-size: 0.85rem;
    height: 22px; 
}

th {
    color: #74A8FF;
    border-top: 3px solid #242C44;
    border-bottom: 3px solid #242C44;
    background-color: #0C1530;
    position: sticky;
    
    top: 0;
    z-index: 1;
}

thead {
    display: table;
    width: 100%;
    table-layout: fixed;
}


tbody {
    display: block;    
    overflow-y: auto;
    border: 0px solid #ccc;
}

tbody tr:hover {
    background-color: #242C44;
}

.status-completed {
    color: #74A8FF;
}

::-webkit-scrollbar {
    width: 9px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #0C1530, #0C1530, rgba(1, 134, 197, 1), rgba(1, 134, 197, 0.5), #0C1530, #0C1530);
}
</style>
