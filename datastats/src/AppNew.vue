<script setup>
import { reactive, ref, provide, inject } from "vue";
import Collapse from "./components/CollapseNew.vue"

const group = reactive([
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


//provide("provideObj", obj)
</script>

<template>

    <Collapse :group="group"></Collapse>

</template>

<style scoped></style>