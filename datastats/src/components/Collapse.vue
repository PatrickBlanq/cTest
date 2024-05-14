<template>
    <div class="moduleStyle">
        <div v-for="Group1 in groupedMenu" :key="Group1.group1" class="collapse" @click.stop="toggleCollapse(Group1)">
            <div class="collapse-wrapper">
                <div class="collapse-group1">
                    <div :class="['group-text', { 'selected': Group1.expanded }]">
                        {{ Group1.group1 }}
                        <span :class="['arrow', { 'rotate': !Group1.expanded }]">&gt;</span>
                    </div>
                </div>
                <div>
                    <Capsule :totalExpected="Group1.totalExpected" :totalFinished="Group1.totalFinished"></Capsule>
                </div>
            </div>
            <div v-show="Group1.expanded">
                <div v-for="Group2 in Group1.children" :key="Group2.group2" class="collapse"
                    @click.stop="toggleCollapse(Group2)">
                    <div class="collapse-wrapper ">
                        <div class="collapse-group2">
                            <div :class="['group-text', { 'selected': Group2.expanded }]">
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
                        <div v-for="Group3 in Group2.children" :key="Group3.group3" class="collapse"
                            @click.stop="toggleCollapse(Group3)">
                            <div class="collapse-wrapper ">
                                <div class="collapse-group3">
                                    <div :class="['group-text', { 'selected': Group3.expanded }]">
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
                                            <div :class="['group-text', { 'selected': item.selected }]"
                                                @click="logItem(item)">

                                                <div class="marquee">
                                                    <span>&bull;&nbsp;&nbsp;{{ item.Name }}</span>
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
import jsonData from '../accsets/json/datastats.json';

/* const dataCapsule = {
    middleNum: "45%",
    rightNum: 9999,
    width2: 130,
    color: "#F2B564",
}; */
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


</script>

<style scoped>
.moduleStyle {
    color: #fff;
    padding: 0rem 1rem 0rem 1.3rem;
    height: 470px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.collapse {
    cursor: pointer;
    margin-top: 10px;
}

.group-text-wrapper {
    flex: 2;
    border: 1px solid #ccc;

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

.marquee:hover {
    display: flex;
    width: 190px;
    resize: horizontal;
    container-type: inline-size;
    align-items: baseline;

    >span {
        animation: marquee 3s linear infinite both alternate;
    }
}

@keyframes marquee {
    to {
        transform: translateX(min(100cqw - 100%, 0px));
    }
}

::-webkit-scrollbar {
    width: 9px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #0186C5, #0C1530);
}
</style>
