<template>
    <div class="table-container" ref="container">
        <table>
            <thead>
                <tr>
                    <th>发生年月</th>
                    <th>取印先</th>
                    <th>管理番号</th>
                    <th>所属</th>
                </tr>
            </thead>
            <tbody ref="tableBody">
                <tr v-for="item in jsonData" :key="item.id">
                    <td>{{ item.发生年月 }}</td>
                    <td>{{ item.取印先 }}</td>
                    <td>{{ item.管理番号 }}</td>
                    <td>{{ item.所属 }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import jsonData from '../assets/json/checkBack.json';


</script>

<style scoped>
.table-container {
    width: 100%;
    margin-top: 7px;
    overflow-x: hidden;
    overflow-y: auto;
    border: 0px solid #ccc;
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