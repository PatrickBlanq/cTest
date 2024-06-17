<template>
    <div class="title">
        <span class="mark"></span>
        {{ strTitle }}
    </div>
</template>

<script setup>

const props = defineProps(["strTitle"])
</script>

<style scoped>
.title {
    box-sizing: border-box;
    padding-top: 13px;
    padding-left: 17px;
    font-size: 1rem;
    font-weight: bold;
}
</style>