<template>
    <div ref="map" v-show="show" class="map" style="" @click="handleContainerClick">
        <div class="toggle-video" @click="toggleVideo"></div>
        <div class="jilin" @click="" :class="{ 'selected': selectedValue === 'jilin' }" data-type="jilin"></div>
        <div class="tokyo" :class="{ 'selected': selectedValue === 'tokyo' }" data-type="tokyo"></div>
        <div class="okinawa" :class="{ 'selected': selectedValue === 'okinawa' }" data-type="okinawa"></div>

    </div>
    <div style="width: 99%; height: 100%;">
        <div ref="video" v-show="!show" class="video">
            <div class="toggle-video" @click="toggleVideo"></div>
        </div>
    </div>
</template>

<script setup>
import { ref,inject  } from 'vue';
const imageSrc = new URL('../assets/img/down.png', import.meta.url).href;
const map = ref(null);
let show = ref(true);
let selectedValue = ref("jilin");

const trigger = inject('dateTimeDisplayTrigger');


const toggleVideo = () => {
    show.value = !show.value;
}
const handleContainerClick = (event) => {
    const type = event.target.dataset.type;

    if (type !== undefined) {
        localStorage.setItem('map', type);
        selectedValue.value = type;
        trigger.value();

    }
}

</script>

<style scoped>
.map {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../assets/img/map.png');
    position: relative;
    border: 0px solid #6FF8F4;
}

.video {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    border: 1px solid #c6FF8F4c;
}

.toggle-video {
    position: absolute;
    border: 1px solid #c6FF8F4c;
    top: calc(0.1%);
    left: calc(0.3%);
    width: 6%;
    height: 6.5%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../assets/img/video-map.png');
    z-index: 999;
}

.jilin {
    position: absolute;
    border: 1px solid #c6FF8F4c;
    top: calc(20%);
    left: calc(46%);
    width: 20%;
    height: 15%;
}

.tokyo {
    position: absolute;
    border: 1px solid #c6FF8F4c;
    top: calc(50%);
    left: calc(82%);
    width: 15%;
    height: 13%;
}

.okinawa {
    position: absolute;
    border: 1px solid #c6FF8F4c;
    top: calc(75%);
    left: calc(56%);
    width: 23%;
    height: 17.5%;
}
.selected {
    border: 1px solid  #6FF8F4;
}
</style>