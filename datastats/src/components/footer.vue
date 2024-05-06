<script setup>
const props = defineProps({
    user: Number,
    url: {
        type: String,
        required: false,
        default: "test.com"
    }

})
//console.log(props);
</script>

<template>
    <h2>footer {{ props.user }}</h2>

</template>

<style scoped></style>