<template>
    <div class="info-container">
        <div class="info-number">{{ data.num }}</div>
        <div class="info-title">{{ data.title }}</div>
    </div>
</template>

<script setup>

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.info-container {
    margin-left: 0rem;
    text-align: center;
    border: 2px solid #242C44;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
}

.info-number {
    width: 3rem;
    font-size: 0.8rem;
    font-weight: 600;
}

.info-title {
    width: 3rem;
    text-align: center;
    font-size: 0.9rem;
    color: #848896;
}
</style>