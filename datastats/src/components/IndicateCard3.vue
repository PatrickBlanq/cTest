<template>
    <div class="card border-box">
        <div style="flex: 11; display: flex; flex-direction: column; padding-left: 10px; padding-top: 10px;">
            <div style="flex: 1; align-items: baseline;" class="flex-row">
                <div style="color: #2FB6FF; font-weight: bolder; font-size: 1rem;">{{ props.title }}</div>
                <!-- <div style="color: #fff; font-weight: 100; font-size: 0.75rem; margin-left: 13px;">前年比率</div> -->
            </div>
            <div style="flex: 1; font-size: 1.3rem;">￥{{ num }}</div>
        </div>
        <div style="flex: 4; margin: 15px 0px 15px 0px; position: relative;">
            <img ref="image" :src="imageSrc" style="width: 37px; position: relative;">
            <div class="number-overlay" :style="{ color: ratioColor }">{{ ratio }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    num1: Number,
    num2: Number,
    title: String
});
const imageSrc = new URL('../assets/img/down.png', import.meta.url).href;
const image = ref(null);
let num = ref(0);
let ratio = ref(0);
let ratioColor = ref('');

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const toPercentage = (x) => {
    const roundedPercentage = Math.round(x * 100);
    return roundedPercentage + '%';
}

onMounted(() => {
    let imgSrc = new URL('../assets/img/down.png', import.meta.url).href;
    let imgup = new URL('../assets/img/up.png', import.meta.url).href;
    ratioColor.value = 'red'

    num.value = props.num1 - props.num2;

    if (num.value > 0) {
        imgSrc = imgup;
        ratioColor.value = '#39A525';
    }

    image.value.src = imgSrc;
    num.value = Math.abs(num.value);
    ratio.value = toPercentage(num.value / props.num2);
    num.value = numberWithCommas(Math.abs(num.value));
})
</script>

<style scoped>
.flex-column {
    display: flex;
    flex-direction: column;
}

.flex-row {
    display: flex;
    flex-direction: row;
}

.card {
    display: flex;
    flex-direction: row;
    width: 55%;
    height: 70%;
    background-color: #101B38;
    margin: 1rem 2rem 0rem 2rem;
}

.border-box {
    padding: 1px;
    border: 3px solid #242C44;
    border-style: ridge;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
}

.number-overlay {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0px 5px;
    border-radius: 3px;
}
</style>
