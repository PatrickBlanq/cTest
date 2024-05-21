<template>
    <div class="card border-box">
        <div style="flex: 11; display: flex; flex-direction: column; padding-left: 10px; padding-top: 10px;">
            <div style="flex: 1; align-items: baseline;" class="flex-row">
                <div style="color: #2FB6FF; font-weight: bolder; font-size: 1.1rem;">{{ props.title }}</div>
                <div style="color: #fff; font-weight: 100; font-size: 0.75rem; margin-left: 13px;">前年比率</div>
            </div>
            <div style="flex: 1; font-size: 1.3rem;">￥{{ budget }}</div>
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
let budget = ref(0);
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

    budget.value = props.num1 - props.num2;

    if (budget.value > 0) {
        imgSrc = imgup;
        ratioColor.value = '#39A525';
    }

    image.value.src = imgSrc;
    budget.value = Math.abs(budget.value);
    ratio.value = toPercentage(budget.value / props.num2);
    budget.value = numberWithCommas(Math.abs(budget.value));
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
    width: 96%;
    height: 96%;
    background-color: #101B38;
}

.number-overlay {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0px 5px;
    border-radius: 3px;
}
</style>
