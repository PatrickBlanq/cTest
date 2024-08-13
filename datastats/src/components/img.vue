<template>
    <div :style="backgroundStyle"></div>
    <div class="circular" v-bind:style="{ 'background-image': 'url(' + require('../assets/img/left1.png') + ')' }">
    </div>

</template>

<script setup>
const backgroundStyle = {
    backgroundImage: 'url("../assets/img/left1.png")',
    width: '100%',
    height: '400px',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
};
</script>

<style></style>