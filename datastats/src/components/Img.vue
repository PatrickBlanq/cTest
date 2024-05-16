<template>
    <div>
        <img ref="image" src="" alt="Placeholder Image">
        <button @click="changeImageSrc">Change Image Source</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const image = ref(null);

const changeImageSrc = () => {
    const newSrc = new URL('../assets/img/up.png', import.meta.url).href
    image.value.src = newSrc;
};

onMounted(() => {
    // 在页面挂载完成后设置图片的 src
    const initialSrc = new URL('../assets/img/down.png', import.meta.url).href
    image.value.src = initialSrc;
});
</script>