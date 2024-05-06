<script setup>
import { inject } from "vue";
//参数是刚才注入的key
const web = inject("provideWeb")
console.log(web);
const provideFuncUserAdd = inject("provideFuncUserAdd")
//在子组件中，把父组件定义的模板片段插入到子组件的特定位置
//1父组件定义代码片段；2子组件将此片段插入特定位置
</script>

<template>
    <h6>nav.vue</h6>
    <button @click=provideFuncUserAdd>navUserAdd</button>
</template>

<style scoped></style>