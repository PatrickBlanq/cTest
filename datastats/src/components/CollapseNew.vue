<template>
    <div>
        <div v-for="group1 in groupedMenu" :key="group1.group1" class="collapse" @click.stop="toggleCollapse(group1)">
            <span :class="['arrow', { 'rotate': !group1.expanded }]">&gt;</span> group1: {{ group1.group1 }}
            <div v-show="group1.expanded">
                <div v-for="group2 in group1.children" :key="group2.group2" class="collapse"
                    @click.stop="toggleCollapse(group2)">
                    <span :class="['arrow', { 'rotate': !group2.expanded }]">&gt;</span> group2: {{ group2.group2 }}
                    <div v-show="group2.expanded">
                        <div v-for="group3 in group2.children" :key="group3.group3" class="collapse"
                            @click.stop="toggleCollapse(group3)">
                            <span :class="['arrow', { 'rotate': !group3.expanded }]">&gt;</span> group3: {{
                            group3.group3 }}
                            <div v-show="group3.expanded">
                                <div v-for="item in group3.children" :key="item.name" class="collapse"
                                    @click.stop="toggleFontColor(item)">
                                    <span :class="{ 'green': item.selected }">{{ item.name }}</span>
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
import { reactive, ref } from 'vue';

const menu = reactive([
    { group1: "g1", group2: "g1-g1", group3: "g321", name: "g1g1n1", selected: false },
    { group1: "g1", group2: "g1-g1", group3: "g321", name: "g1g2n2", selected: false },
    { group1: "g2", group2: "g1", group3: "g312", name: "g2g1n1", selected: false },
    { group1: "g2", group2: "g2", group3: "g322", name: "g2g2n2", selected: false }
]);

const groupedMenu = ref([]);

const initializeGroupedMenu = () => {
    const groupedByGroup1 = new Map();
    for (const item of menu) {
        if (!groupedByGroup1.has(item.group1)) {
            groupedByGroup1.set(item.group1, []);
        }
        groupedByGroup1.get(item.group1).push(item);
    }

    for (const [group1, items] of groupedByGroup1) {
        const group1Item = { group1, expanded: false, children: [] };
        const groupedByGroup2 = new Map();
        for (const item of items) {
            if (!groupedByGroup2.has(item.group2)) {
                groupedByGroup2.set(item.group2, []);
            }
            groupedByGroup2.get(item.group2).push(item);
        }
        for (const [group2, group2Items] of groupedByGroup2) {
            const group2Item = { group2, expanded: false, children: [] };
            const groupedByGroup3 = new Map();
            for (const item of group2Items) {
                if (!groupedByGroup3.has(item.group3)) {
                    groupedByGroup3.set(item.group3, []);
                }
                groupedByGroup3.get(item.group3).push(item);
            }
            for (const [group3, group3Items] of groupedByGroup3) {
                const group3Item = { group3, expanded: false, children: group3Items };
                group2Item.children.push(group3Item);
            }
            group1Item.children.push(group2Item);
        }
        groupedMenu.value.push(group1Item);
    }
};

const toggleCollapse = (item) => {
    item.expanded = !item.expanded;
};

const toggleFontColor = (clickedItem) => {
    for (const group1 of groupedMenu.value) {
        for (const group2 of group1.children) {
            for (const group3 of group2.children) {
                for (const item of group3.children) {
                    item.selected = (item === clickedItem);
                }
            }
        }
    }
};

initializeGroupedMenu();
</script>

<style scoped>
.collapse {
    cursor: pointer;
    margin-left: 10px;
}

.arrow {
    display: inline-block;
    margin-right: 5px;
    transition: transform 0.3s;
}

.rotate {
    transform: rotate(-90deg);
}

.green {
    color: green;
}
</style>
