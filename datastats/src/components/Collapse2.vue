<template>
    <div>
        <!-- 遍历 Group1 -->
        <div v-for="(group1, index1) in groupedData" :key="'group1-' + index1">
            <div @click="toggleGroup1(index1)" class="group">
                <span>{{ group1.name }}</span>
                <span v-if="group1.open">↑</span>
                <span v-else>↓</span>
            </div>
            <!-- 如果 Group1 是展开状态，则显示 Group2 -->
            <div v-if="group1.open">
                <div v-for="(group2, index2) in group1.children" :key="'group2-' + index2">
                    <div @click="toggleGroup2(index1, index2)" class="group">
                        <span>{{ group2.name }}</span>
                        <span v-if="group2.open">↑</span>
                        <span v-else>↓</span>
                    </div>
                    <!-- 如果 Group2 是展开状态，则显示 Group3 -->
                    <div v-if="group2.open">
                        <ul>
                            <li v-for="(group3, index3) in group2.children" :key="'group3-' + index3">
                                <div @click="toggleGroup3(index1, index2, index3)" class="group">
                                    <span>{{ group3.name }}</span>
                                    <span v-if="group3.open">↑</span>
                                    <span v-else>↓</span>
                                </div>
                                <!-- 如果 Group3 是展开状态，则显示累加值 -->
                                <ul v-if="group3.open">
                                    <li>
                                        納品予定: {{ sumDeliveryForecast(group3.children) }}
                                        中間見込: {{ sumMiddleForecast(group3.children) }}
                                        依頼棟数: {{ sumRequestCount(group3.children) }}
                                    </li>
                                    <li v-for="(name, index4) in group3.children" :key="'name-' + index4">{{ name }}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import jsonData from '../accsets/json/datastats.json';

const groupedData = ref([]);

const groupData = () => {
    const groups = {};
    jsonData.forEach(item => {
        const { Group1, Group2, Group3, Name, 納品予定, 中間見込, 依頼棟数 } = item;
        if (!groups[Group1]) {
            groups[Group1] = {};
        }
        if (!groups[Group1][Group2]) {
            groups[Group1][Group2] = {};
        }
        if (!groups[Group1][Group2][Group3]) {
            groups[Group1][Group2][Group3] = [];
            groups[Group1][Group2][Group3]['納品予定'] = 0;
            groups[Group1][Group2][Group3]['中間見込'] = 0;
            groups[Group1][Group2][Group3]['依頼棟数'] = 0;
        }
        groups[Group1][Group2][Group3].push(Name);
        groups[Group1][Group2][Group3]['納品予定'] += 納品予定;
        groups[Group1][Group2][Group3]['中間見込'] += 中間見込;
        groups[Group1][Group2][Group3]['依頼棟数'] += 依頼棟数;
    });

    const result = Object.keys(groups).map(group1 => ({
        name: group1,
        open: false,
        children: Object.keys(groups[group1]).map(group2 => ({
            name: group2,
            open: false,
            children: Object.keys(groups[group1][group2]).map(group3 => ({
                name: group3,
                open: false,
                children: groups[group1][group2][group3],
                納品予定: groups[group1][group2][group3]['納品予定'],
                中間見込: groups[group1][group2][group3]['中間見込'],
                依頼棟数: groups[group1][group2][group3]['依頼棟数']
            }))
        }))
    }));

    return result;
};

const toggleGroup1 = index => {
    groupedData.value[index].open = !groupedData.value[index].open;
};

const toggleGroup2 = (index1, index2) => {
    groupedData.value[index1].children[index2].open = !groupedData.value[index1].children[index2].open;
};

const toggleGroup3 = (index1, index2, index3) => {
    groupedData.value[index1].children[index2].children[index3].open = !groupedData.value[index1].children[index2].children[index3].open;
};

const sumDeliveryForecast = (data) => {
    return data.reduce((acc, cur) => acc + cur['納品予定'], 0);
};

const sumMiddleForecast = (data) => {
    return data.reduce((acc, cur) => acc + cur['中間見込'], 0);
};

const sumRequestCount = (data) => {
    return data.reduce((acc, cur) => acc + cur['依頼棟数'], 0);
};

groupedData.value = groupData();
</script>

<style>
.group {
    cursor: pointer;
    margin-bottom: 5px;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-left: 20px;
}

ul li {
    margin-bottom: 5px;
}
</style>