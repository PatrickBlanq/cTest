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
                    <Capsule :data="dataCapsule"></Capsule>
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
                            <Capsule :data="dataCapsule"></Capsule>
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
                                    <Capsule :data="dataCapsule"></Capsule>
                                </div>
                            </div>
                            <div v-show="Group3.expanded">
                                <div v-for="item in Group3.children" :key="item.name" class="collapse"
                                    @click.stop="toggleFontColor(item)">
                                    <div class="collapse-wrapper ">
                                        <div class="collapse-item">
                                            <div :class="['group-text', { 'selected': item.selected }]"
                                                @click="logItemId(item.id)">

                                                <div class="marquee"><span>&bull;&nbsp;&nbsp;{{ item.name }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Capsule :data="dataCapsule"></Capsule>
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

const props = defineProps({
    menu: {
        type: Array,
        required: true
    }
});
const dataCapsule = {
    middleNum: "45%",
    rightNum: 9999,
    width2: 130,
    color: "#F2B564",
};
const groupedMenu = ref([]);

const initializeGroupedMenu = () => {
    const groupedByGroup1 = new Map();
    for (const item of props.menu) {
        if (!groupedByGroup1.has(item.group1)) {
            groupedByGroup1.set(item.group1, []);
        }
        groupedByGroup1.get(item.group1).push(item);
    }

    for (const [Group1, items] of groupedByGroup1) {
        const Group1Item = { group1: Group1, expanded: false, children: [] };
        const groupedByGroup2 = new Map();
        for (const item of items) {
            if (!groupedByGroup2.has(item.group2)) {
                groupedByGroup2.set(item.group2, []);
            }
            groupedByGroup2.get(item.group2).push(item);
        }
        for (const [Group2, Group2Items] of groupedByGroup2) {
            const Group2Item = { group2: Group2, expanded: false, children: [] };
            const groupedByGroup3 = new Map();
            for (const item of Group2Items) {
                if (!groupedByGroup3.has(item.group3)) {
                    groupedByGroup3.set(item.group3, []);
                }
                groupedByGroup3.get(item.group3).push(item);
            }
            for (const [Group3, Group3Items] of groupedByGroup3) {
                const Group3Item = { group3: Group3, expanded: false, children: Group3Items };
                Group2Item.children.push(Group3Item);
            }
            Group1Item.children.push(Group2Item);
        }
        groupedMenu.value.push(Group1Item);
    }
};

const toggleCollapse = (item) => {
    item.expanded = !item.expanded;
};

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

const logItemId = (itemId) => {

    console.log("item id:", itemId);
};

initializeGroupedMenu();
console.log(groupedMenu);


</script>

<style scoped>
.moduleStyle {
    color: #FCFCFC;
    padding: 0rem 1rem 0rem 1.3rem;
    overflow-y: auto;
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
        animation: marquee 5s linear infinite both alternate;
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
    background: linear-gradient(to bottom, #0186C5, #8f94fb);
}
</style>
