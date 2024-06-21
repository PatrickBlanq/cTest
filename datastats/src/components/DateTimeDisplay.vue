<template>
    <div class="datetime-display">
        <img :src="iconUrl" alt="" style="height: 30px;" />&nbsp;
        <span> {{ weatherDescription }}&nbsp;
            {{ tempMin }}°C &nbsp;
            {{ formattedDateTime }}</span>
    </div>
</template>

<script setup>
import { ref, onMounted,inject  } from 'vue';

const formattedDateTime = ref('');
let city = ref('jilin');
const weatherDescription = ref('');
const iconUrl = ref('');
const tempMin = ref('');
const tempMax = ref('');

function updateDateTime() {
    let now = new Date();
    city.value = localStorage.getItem('map');
    if (city.value != 'jilin') {
        // 日本提前一小时
        now = new Date(now.getTime() + 3600 * 1000);
    }
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const weekdayJP = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'][now.getDay()];
    formattedDateTime.value = `${year}年${month}月${day}日 ${hour}:${minute}:${second} ${weekdayJP}`;
    formattedDateTime.value = `${hour}:${minute}:${second} ${weekdayJP}`;
}
async function fetchWeather() {
    city.value = localStorage.getItem('map');
    if(!city.value){
        city.value="jilin"
    }
    //中文
    let requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=fa5f86877980b30bde6e69bcde28506b&lang=zh_cn`
    //日语
    if (city.value != "jilin") { requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=fa5f86877980b30bde6e69bcde28506b&lang=ja` }
    //console.log(requestUrl);
    const response = await fetch(requestUrl)
    const data = await response.json();
    weatherDescription.value = data.weather[0].description;
    iconUrl.value = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    tempMin.value = (data.main.temp - 273.15).toFixed(1);
    tempMax.value = data.main.temp_max;

}

onMounted(async () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    await fetchWeather();
    setInterval(fetchWeather, 60 * 1000);

});

const injectDateTimeDisplay = inject('triggerDateTimeDisplay');

injectDateTimeDisplay.value = () => {
    fetchWeather();
}; 
</script>

<style scoped>
.datetime-display {
    display: flex;
    font-size: 1.3rem;
    color: #71FDF8;
}
</style>