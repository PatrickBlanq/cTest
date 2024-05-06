<script setup>
import { reactive, ref, provide, inject } from "vue";
/* const obj = inject("provideObj") */
/* const obj = reactive({
    group1: "group1",
    list: [
        { name: "1", Show: true, },
        { name: "2", Show: true, }
    ],
    group3: "group3",
    Show: true,

}) */

/* const obj = defineProps({
    group: {
        type: Array, // 指定类型为数组
        required: true // 设置为必需属性
    }
}); */
const menu = reactive([
    {
        group1: "g1",
        group2: "g1-g1",
        name: "g1g1n1",
        show: true
    },
    {
        group1: "g1",
        group2: "g1-g1",
        name: "g1g2n2",
        show: true
    },
    {
        group1: "g2",
        group2: "g1",
        name: "g2g1n1",
        show: true
    },
    {
        group1: "g2",
        group2: "g2",
        name: "g2g2n2",
        show: true
    },
])

//console.log(obj);
//点击div，关闭下面的子菜单
const collapseClick = (value) => {

    for (let index = 0; index < group2Data.length; index++) {
        const item = group2Data[index];
        console.log(value);
        if (item.father == value) {
            item.element.show = !item.element.show
        }
    }

}

//存储group1
const group1Set = new Set()
const group2Set = new Set()
//二级菜单
const group2Data = [];
//三级菜单
const Group3eData = [];
//获取第一层级的根菜单
const getGroup1Set = () => {
    for (let i = 0; i < menu.length; i++) {
        const element = menu[i];
        if (!group1Set.has(element.group1))
            group1Set.add(element.group1)
    }
}
//获取第二级菜单
const getGroup2Set = () => {
    for (let i = 0; i < menu.length; i++) {
        const element = menu[i];

        const group2Item = { father: element.group1, name: element.group2 };
        if (!group2Set.has(group2Item)) {
            group2Set.add(group2Item); 
        }
    }
}
const recurve = ()=>{
    for (const element of group2Set) {
        console.log(element.father);
    }
}

getGroup1Set()
getGroup2Set()
recurve()
/* getGrou1() */
console.log(group1Set);
//console.log(group2Set);
</script>

<template>
    <!--        <div v-for="group1 in group1Set" class="collapse" @click.stop="collapseClick(group1)">
        group1:{{ group1 }}
        <div v-for="group2 in group2Data">
            <div v-if="group1 === group2.father">
                <div @click.stop v-show="group2.element.show">g2:{{ group2.father }}</div>

            </div>
        </div>
    </div>  -->
   <div v-for="group1 of group1Set" class="collapse" @click.stop="collapseClick(group1)">
        group1:{{ group1 }}
        <div v-for="group2 of group2Set">
            <div v-if="group1 === group2.value.father">
                <div @click.stop v-show="group2.element.show">g2:{{ group2.name }}</div>

            </div>
        </div>
    </div> 
</template>

<style scoped></style>