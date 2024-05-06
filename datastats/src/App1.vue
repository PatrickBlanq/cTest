<script setup>
import Header from "./components/header.vue"
import Footer from "./components/footer.vue"
import { reactive, ref, provide } from "vue";
//以对象传递
const propsWeb = reactive({
    user: 10,
    url: "djalk.com"
})
const add = () => {
    propsWeb.user++;
    //console.log(propsWeb.user);
}

//子传父
const web = reactive({
    name: "uu",
    url: "uu.com"
})

//子传父，对象和方法
const emitsGetweb = (data) => {
    web.url = data.url
}
const user = ref(0)
const emitsUserAdd = (data) => {
    console.log(data);
    user.value += data
}
const userAdd = () => {
    user.value++
}
//跨组件传值，第一个参数是提供者的名称或者说是注入者的key，其后是要传递的数据
provide("provideWeb", web)
provide("provideUser", user)
//传递函数
provide("provideFuncUserAdd", userAdd)

</script>

<template>
    <!-- 父传子数组传递 -->
    <!--Header是 自闭和标签形式 -->
    <Header propsName="uu" propsUrl="baidu.com" @getWeb="emitsGetweb" @userAdd="emitsUserAdd" />
    <!-- 子组件上的自定义事件是getWeb，父组件定义接受方法是emitsGetweb -->

    app.vue
    <Footer :="propsWeb" />
    <button @click="add">添加用户</button>
    <br>
    {{ web.url }}--{{ user }}
</template>

<style scoped></style>