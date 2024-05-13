<template>
    <div>
        <div v-for="(group1, group1Name) in groupedData" :key="group1Name">
            <div class="collapsible" @click="toggleContent(group1Name)">{{ group1Name }}</div>
            <div class="content" :id="group1Name">
                <div v-for="(group2, group2Name) in group1" :key="group2Name">
                    <div class="collapsible" @click="toggleContent(group2Name)">{{ group2Name }}</div>
                    <div class="content" :id="group2Name">
                        <div v-for="(group3, group3Name) in group2" :key="group3Name">
                            <div class="collapsible" @click="toggleContent(group3Name)">{{ group3Name }}</div>
                            <div class="content" :id="group3Name">
                                <div v-for="item in group3" :key="item.ID">
                                    <div @click="logId(item)">{{ item.Name }}{{ item.中間見込
                                        }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';

import jsonData from '../accsets/json/datastats.json';

const groupedData = ref({});
const groups = {};
const groupData = () => {

    jsonData.forEach(item => {
        groups[item.Group1] = groups[item.Group1] || {};
        groups[item.Group1][item.Group2] = groups[item.Group1][item.Group2] || {};
        groups[item.Group1][item.Group2][item.Group3] = groups[item.Group1][item.Group2][item.Group3] || [];
        groups[item.Group1][item.Group2][item.Group3].push(item);
    });
    return groups;
};
const calculate = () => { }
const toggleContent = id => {
    const content = document.getElementById(id);
    content.style.display = (content.style.display === "block") ? "none" : "block";
};

onMounted(() => {
    groupedData.value = groupData();
});
const logId = (itemId) => {

    console.log("item id:", itemId);
};
console.log(groups);
</script>

<style>
.collapsible {
    background-color: #777;
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
}

.content {
    padding: 0 18px;
    display: none;
    overflow: hidden;
    background-color: #f1f1f1;
}
</style>
