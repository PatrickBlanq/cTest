<script setup>
import { reactive, ref, provide, inject } from "vue";
import Collapse from "./components/Collapse.vue"

const group = reactive([{
    first: "group1",
    list: [
        { name: "11", show: true, },
        { name: "12", show: true, }
    ],

},
{
    first: "group2",
    list: [
        { name: "21", show: true, },
        { name: "22", show: true, }
    ],


}]
)
const testOjb={
    name:"",
    obj:{}
}
/* const obj = reactive({
    group1: "group1",
    list: [
        { name: "1", Show: true, },
        { name: "2", Show: true, }
    ],
    group3: "group3",
    Show: true,

}) */

//provide("provideObj", obj)
</script>

<!-- const group = reactive([
    {
        group1: "g1",
        group2: "g2",
        name: "g1g2n2",
        show: true
    },
    {
        group1: "g1",
        group2: "g2",
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

    {
        group1: "g2",
        group2: "g2",
        name: "g2g2n2",
        show: true
    },
-->
<template>
    <div v-for="item in group" :key="item.id">
        <Collapse :="item"></Collapse>

    </div>



</template>

<style scoped></style>