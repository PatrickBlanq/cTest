<template>
    <div class="moduleStyle" :style="{ height: height + 'px' }">
        <div v-for="Group1, index in groupedMenu" :key="index" :class="{ 'first-item': index === 0 }" class="collapse"
            style="border: 0px solid #ccc;">
            <div class="collapse-wrapper">
                <div class="collapse-group1">
                    <div :class="['group-text', { 'selected': Group1.expanded }]" @click.stop="toggleCollapse(Group1)">
                        {{ Group1.group1 }}
                        <span :class="['arrow', { 'rotate': !Group1.expanded }]">&gt;</span>
                    </div>
                </div>
                <div>
                    <Capsule :totalExpected="Group1.totalExpected" :totalFinished="Group1.totalFinished"></Capsule>
                </div>
            </div>
            <div v-show="Group1.expanded">
                <div v-for="Group2 in Group1.children" :key="Group2.group2" class="collapse">
                    <div class="collapse-wrapper ">
                        <div class="collapse-group2">
                            <div :class="['group-text', { 'selected': Group2.expanded }]"
                                @click.stop="toggleCollapse(Group2)">
                                {{ Group2.group2 }}
                                <span :class="['arrow', { 'rotate': !Group2.expanded }]">&gt;</span>
                            </div>
                        </div>
                        <div>
                            <Capsule :totalExpected="Group2.totalExpected" :totalFinished="Group2.totalFinished">
                            </Capsule>
                        </div>
                    </div>
                    <div v-show="Group2.expanded">
                        <div v-for="Group3 in Group2.children" :key="Group3.group3" class="collapse">
                            <div class="collapse-wrapper ">
                                <div class="collapse-group3">
                                    <div :class="['group-text', { 'selected': Group3.expanded }]"
                                        @click.stop="toggleCollapse(Group3)">
                                        {{ Group3.group3 }}
                                        <span :class="['arrow', { 'rotate': !Group3.expanded }]">&gt;</span>
                                    </div>
                                </div>
                                <div>
                                    <Capsule :totalExpected="Group3.totalExpected"
                                        :totalFinished="Group3.totalFinished"></Capsule>
                                </div>
                            </div>
                            <div v-show="Group3.expanded">
                                <div v-for="item in Group3.children" :key="item.Name" class="collapse"
                                    @click.stop="toggleFontColor(item)">
                                    <div class="collapse-wrapper ">
                                        <div class="collapse-item">
                                            <div style="border: 0px solid #ccc;"
                                                :class="['group-text', { 'selected': item.selected }]"
                                                @click="logItem(item)">

                                                <div class="marquee" :title="item.Name">
                                                    &bull;&nbsp;&nbsp;{{ item.Name }}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Capsule :totalExpected="item.納品予定" :totalFinished="item.依頼棟数"></Capsule>
                                        </div>
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
import { ref } from 'vue';
import Capsule from './Capsule.vue';
import jsonData from '../assets/json/datastats.json';

const groupedMenu = ref([]);

const initializeGroupedMenu = () => {
    const groupedByGroup1 = new Map();

    for (const item of jsonData) {
        if (!groupedByGroup1.has(item.Group1)) {
            groupedByGroup1.set(item.Group1, []);
        }
        groupedByGroup1.get(item.Group1).push(item);
    }

    for (const [Group1, items] of groupedByGroup1) {
        const Group1Item = { group1: Group1, expanded: false, children: [], totalExpected: 0, totalMiddleEstimate: 0, totalFinished: 0 };

        const groupedByGroup2 = new Map();

        for (const item of items) {
            if (!groupedByGroup2.has(item.Group2)) {
                groupedByGroup2.set(item.Group2, []);
            }
            groupedByGroup2.get(item.Group2).push(item);
        }

        for (const [Group2, Group2Items] of groupedByGroup2) {
            const Group2Item = { group2: Group2, expanded: false, children: [], totalExpected: 0, totalMiddleEstimate: 0, totalFinished: 0 };

            const groupedByGroup3 = new Map();

            for (const item of Group2Items) {
                if (!groupedByGroup3.has(item.Group3)) {
                    groupedByGroup3.set(item.Group3, []);
                }
                groupedByGroup3.get(item.Group3).push(item);
            }

            for (const [Group3, Group3Items] of groupedByGroup3) {
                const Group3Item = { group3: Group3, expanded: false, children: Group3Items, totalExpected: 0, totalMiddleEstimate: 0, totalFinished: 0 };

                for (const item of Group3Items) {
                    Group3Item.totalExpected += item["納品予定"];
                    Group3Item.totalMiddleEstimate += item["中間見込"];
                    Group3Item.totalFinished += item["依頼棟数"];
                }

                Group2Item.children.push(Group3Item);
                Group2Item.totalExpected += Group3Item.totalExpected;
                Group2Item.totalMiddleEstimate += Group3Item.totalMiddleEstimate;
                Group2Item.totalFinished += Group3Item.totalFinished;
            }

            Group1Item.children.push(Group2Item);
            Group1Item.totalExpected += Group2Item.totalExpected;
            Group1Item.totalMiddleEstimate += Group2Item.totalMiddleEstimate;
            Group1Item.totalFinished += Group2Item.totalFinished;
        }

        groupedMenu.value.push(Group1Item);
    }
};

//折叠显示
const toggleCollapse = (clickedItem) => {
    if (clickedItem.group1 !== null && clickedItem.group1 !== undefined) {
        for (const Group1 of groupedMenu.value) {
            if (Group1.group1 === clickedItem.group1) {
                Group1.expanded = !Group1.expanded;
                if (Group1.expanded) {
                    console.log(Group1);
                } else {
                    for (const Group2 of Group1.children) {
                        Group2.expanded = false;
                        for (const Group3 of Group2.children) {
                            Group3.expanded = false;
                            for (const item of Group3.children) {
                                item.selected = false;
                            }
                        }
                    }
                }
            } else {
                Group1.expanded = false;
                for (const Group2 of Group1.children) {
                    Group2.expanded = false;
                    for (const Group3 of Group2.children) {
                        Group3.expanded = false;
                        for (const item of Group3.children) {
                            item.selected = false;
                        }
                    }
                }
            }
        }
    }

    if (clickedItem.group2 !== null && clickedItem.group2 !== undefined) {
        for (const Group1 of groupedMenu.value) {
            //判断选中的gourp1。
            if (Group1.expanded) {
                for (const Group2 of Group1.children) {
                    if (Group2.group2 === clickedItem.group2) {
                        Group2.expanded = !Group2.expanded;
                        if (Group2.expanded) {
                            console.log(Group2);
                        } else {
                            for (const Group3 of Group2.children) {
                                Group3.expanded = false;
                                for (const item of Group3.children) {
                                    item.selected = false;
                                }
                            }
                        }
                    } else {
                        Group2.expanded = false;
                        for (const Group3 of Group2.children) {
                            Group3.expanded = false;
                            for (const item of Group3.children) {
                                item.selected = false;
                            }
                        }
                    }
                }
            }
        }
    }
    if (clickedItem.group3 !== null && clickedItem.group3 !== undefined) {
        for (const Group1 of groupedMenu.value) {
            if (Group1.expanded) {
                for (const Group2 of Group1.children) {
                    if (Group2.expanded) {
                        for (const Group3 of Group2.children) {
                            if (Group3.group3 === clickedItem.group3) {
                                Group3.expanded = !Group3.expanded;
                                if (Group3.expanded) {
                                    console.log(Group3);
                                } else {
                                    for (const item of Group3.children) {
                                        item.selected = false;
                                    }
                                }
                            } else {
                                Group3.expanded = false;
                                for (const item of Group3.children) {
                                    item.selected = false;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

};
//name变色
const toggleFontColor = (clickedItem) => {
    for (const Group1 of groupedMenu.value) {
        for (const Group2 of Group1.children) {
            for (const Group3 of Group2.children) {
                for (const item of Group3.children) {
                    item.selected = (item === clickedItem);
                }
            }
        }
    }
};

const logItem = (item) => {
    if (item.selected == false || item.selected == undefined) {
        console.log("item 是:", item);
    }


};

initializeGroupedMenu();
//console.log(groupedMenu);
const props = defineProps({
    height: Number
});

</script>

<style scoped>
.moduleStyle {
    display: flex;
    flex-direction: column;
    color: #fff;
    flex-grow: 1;
    flex-shrink: 1;
    margin: 20px 0.2rem 1rem 1.5rem;
    overflow-y: scroll;
    overflow-x: hidden;
    font-size: 15px;
    font-weight: 400;
    border: 0px solid red;
}

.collapse {
    
    margin-top: 20px;
}

.first-item {
    margin-top: 0;
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
.group-text{
    cursor: pointer;
}
.mark1 {
    margin-bottom: 0.25rem;
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #6FF8F4;
    border-radius: 4px;
}

.mark2 {
    margin-bottom: 0.25rem;
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #F3F4F5;
    border-radius: 4px;
}

.collapse-wrapper {
    display: flex;
    flex-direction: row;
    align-items: baseline;
}


.collapse-group1 {
    margin-right: 40px;
    width: 188px;
}


.collapse-group2 {
    margin-left: 10px;
    margin-right: 30px;
    width: 188px;
}

.collapse-group3 {
    margin-left: 20px;
    margin-right: 20px;
    width: 188px;
}

.collapse-item {
    margin-left: 30px;
    margin-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    width: 188px;
}

.my-capsule {
    flex: 5;
    width: 80%;
    height: 13px;

}

.capsule1 {
    flex: 5;
    width: 80%;
    height: 13px;
    background-color: #242C44;
    border-radius: 17px;

}



::-webkit-scrollbar {
    width: 9px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #0C1530, #0C1530, rgba(1, 134, 197, 1), rgba(1, 134, 197, 0.5), #0C1530, #0C1530);
}
</style>
