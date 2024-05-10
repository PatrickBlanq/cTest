<template>
    <div class="moduleStyle">
        <div v-for="group1 in groupedMenu" :key="group1.group1" class="collapse" @click.stop="toggleCollapse(group1)">
            <div class="collapse-wrapper">
                <div :class="['group-text', { 'selected': group1.expanded }]">
                    {{ group1.group1 }}
                    <span :class="['arrow', { 'rotate': !group1.expanded }]">&gt;</span>
                </div>
                <div class="capsule"></div>
            </div>
            <div v-show="group1.expanded">
                <div v-for="group2 in group1.children" :key="group2.group2" class="collapse"
                    @click.stop="toggleCollapse(group2)">
                    <div class="collapse-wrapper">
                        <div :class="['group-text', { 'selected': group2.expanded }]">
                            {{ group2.group2 }}
                            <span :class="['arrow', { 'rotate': !group2.expanded }]">&gt;</span>
                        </div>
                        <div class="capsule"></div>
                    </div>
                    <div v-show="group2.expanded">
                        <div v-for="group3 in group2.children" :key="group3.group3" class="collapse"
                            @click.stop="toggleCollapse(group3)">
                            <div class="collapse-wrapper">
                                <div :class="['group-text', { 'selected': group3.expanded }]">
                                    {{ group3.group3 }}
                                    <span :class="['arrow', { 'rotate': !group3.expanded }]">&gt;</span>
                                </div>
                                <div class="capsule"></div>
                            </div>
                            <div v-show="group3.expanded">
                                <div v-for="item in group3.children" :key="item.name" class="collapse"
                                    @click.stop="toggleFontColor(item)">
                                    <div class="item-wrapper">
                                        <div :class="{ 'selected': item.selected }" @click="logItemId(item.id)">
                                            <span :class="{ 'mark1': item.selected, 'mark2': !item.selected }"
                                                style="margin-right: 0.5rem;"></span>{{ item.name }}
                                        </div>
                                        <div class="capsule"></div>
                                    </div>
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
import { ref, defineProps } from 'vue';

const props = defineProps({
    menu: {
        type: Array,
        required: true
    }
});

const groupedMenu = ref([]);

const initializeGroupedMenu = () => {
    const groupedByGroup1 = new Map();
    for (const item of props.menu) {
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

const logItemId = (itemId) => {
    console.log("item id:", itemId);
};

initializeGroupedMenu();
</script>

<style scoped>
.collapse {
    cursor: pointer;
    margin-top: 1px;
}

.group-text {
    padding-right: 10px;
}

.arrow {
    display: inline-block;
    transition: transform 0.3s;
}

.rotate {
    transform: rotate(-90deg);
}

.selected {
    color: #6FF8F4;
}

.mark1 {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #6FF8F4;
    border-radius: 4px;
}

.mark2 {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #F3F4F5;
    border-radius: 4px;
}

.capsule {
    width: 5rem;
    height: 10px;
    background-color: #488EF7;
    border-radius: 4px;
    margin-left: 20px;
}

.moduleStyle {
    color: #F3F4F5;
    height: 23.9rem;
    overflow-y: auto;
    overflow-x: hidden;
}

::-webkit-scrollbar {
    width: 9px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #0186C5, #8f94fb);
}
</style>