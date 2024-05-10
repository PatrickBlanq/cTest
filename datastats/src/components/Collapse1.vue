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

const obj = defineProps({
    first: String,
    list: {
        type: Array, // 指定类型为数组

    },
    show: Boolean,
    default: true
});
console.log(obj);
const collapseClick = (obj) => {

    for (let i = 0; i < obj.list.length; i++) {
        const item = obj.list[i];
        item.show = !item.show
    }

}
let group1Set = new Set()
const getGrou1 = () => {
    for (let i = 0; i < obj.group.length; i++) {
        const element = obj.group[i];
        if (!group1Set.has(element.group1))
            group1Set.add(element.group1)
    }
}
/* getGrou1() */
//console.log(group1Set);
</script>

<template>

    <div class="collapse" @click="collapseClick(obj)">
        {{ obj.first }}
        <div v-for="(item, index) in obj.list" :key="index">
            <div class="collapse-item" v-show="item.show">
                {{ item.name }}
            </div>
        </div>

    </div>
</template>

<style scoped></style>