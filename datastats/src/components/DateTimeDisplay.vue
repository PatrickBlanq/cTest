<template>
    <div class="datetime-display">
        {{ formattedDateTime }}
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const formattedDateTime = ref('');

function updateDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const weekdayJP = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'][now.getDay()];
    //const weekdaysJP = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    formattedDateTime.value = `${year}年${month}月${day}日 ${hour}:${minute}:${second} ${weekdayJP}`;
}

onMounted(() => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
</script>

<style scoped>
.datetime-display {
    font-size: 1.3rem;
    color: #71FDF8;
}
</style>