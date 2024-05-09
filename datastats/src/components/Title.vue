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
    margin-top: 10px;
    margin-left: 17px;
    font-size: 1rem;
    font-weight: bold;
}
</style>