<script setup>
import Nav from "./nav.vue"
import { inject } from "vue";
const props = defineProps(["propsName", "propsUrl"])
//console.log(props)
//defineEmits的参数是一个数组，数组内的元素，是将触发自定义事件的名称
const emits = defineEmits(["getWeb", "userAdd"])
emits("getWeb", { name: "wohaorende", url: "wohaorende.com" })
const add = () => {
    emits("userAdd", 10)

}
//可以注入响应式数据
const user = inject("provideUser")
console.log(user);
</script>

<template>
    <Nav />
    <h2>header</h2>
    <button @click="add">UserAdd</button>
</template>

<style scoped></style>