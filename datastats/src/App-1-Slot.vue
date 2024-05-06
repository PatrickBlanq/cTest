<script setup>
import Header from "./components/header1.vue"
import Footer from "./components/footer1.vue"
import { reactive, ref, provide } from "vue";

//作用域插槽：子组件像父组件传递数据
</script>

<template>
    <h3>AppSlot.vue</h3>
    <Header>
        <!-- 将这个片段，使用匿名插槽slot，插入到子组件header里 -->
        <a href="baidu.com">百度</a>
    </Header>
    <Footer>
        <!-- 具名插槽的使用 -->
        <!--  <template v-slot:url> -->
        <!--         <template #url="data">
            {{ data.title }} - {{ data.user }} -->
        <!-- 作用域插槽 -->
        <!-- toRef是把对象的某个属性转换称响应式数据，torRefs是把对象所有属性转换 -->
        <template #url="{ title, user }">
            {{ title }} - {{ user }}
            <a href="#gfs">guge</a>
        </template>
    </Footer>
</template>

<style scoped></style>