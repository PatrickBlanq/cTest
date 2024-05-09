<template>
    <div class="fullscreen-div ">
        <div class="left">
            <div class="top">
                <div class="left1 flex-column ">
                    <div class="tlcolumn1">
                        <Title strTitle="纳期状况"></Title>
                    </div>
                    <div class="tlcolumn2"></div>
                    <div class="tlcolumn3"></div>
                </div>
            </div>
            <div class="bottom">
                <div class="left2">
                    <Title strTitle="在库种类状况"></Title>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="top flex-column">
                <div class="center1">EPCOデータ掲示板</div>
                <div class="center2 flex-row">
                    <div class="c2"></div>
                    <div class="c2"></div>
                    <div class="c2"></div>
                </div>
                <div class="center3"></div>
            </div>
            <div class="bottom">
            </div>
        </div>
        <div class="right">
            <div class="top flex-column">
                <div class="right1">{{ strDate }}</div>
                <div class="right2">
                    <Title strTitle="出勤人数"></Title>
                </div>
                <div class="right3">
                    <Title strTitle="是正情况"></Title>
                </div>
            </div>
            <div class="bottom">
                <div class="">
                    <Title strTitle="纳期动态"></Title>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Title from '@/components/Title.vue';
//const weekdaysJP = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
const weekdaysJP = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

const strDate = ref("");
function updateDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const weekdayJP = weekdaysJP[now.getDay()];
    const formattedDateTime = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
    strDate.value = `${formattedDateTime} ${weekdayJP}`;
}

onMounted(() => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
</script>

<style scoped>
.fullscreen-div {
    width: 100vw;
    height: 100vh;
    background-color: #04091F;
    display: flex;
    color: #fff;
}

.left,
.center,
.right {
    display: flex;
    flex-direction: column;
    margin: 17px 0px 17px 17px;
}

.left {
    flex: 383;
}

.left1 {
    padding: 4px 3px 4px 3px;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../accsets/img/left1.png');
}

.tlcolumn1,
.tlcolumn2,
.tlcolumn3 {
    width: 100%;
    height: 100%;
    border-width: 1px;
    border-color: #fff;
    border-style: solid;
}

.tlcolumn1 {
    flex: 34
}

.tlcolumn2 {
    flex: 100
}

.tlcolumn3 {
    flex: 380
}

.center {
    flex: 529;
}

.flex-column {
    display: flex;
    flex-direction: column;
}

.center1,
.center2,
.center3 {
    margin-top: 0px;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.right1,
.right2,
.right3 {
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.center1 {
    flex: 55;
    font-size: 2.7rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../accsets/img/title.png');

}

.flex-row {
    display: flex;
    flex-direction: row;
}

.center2 {
    flex: 78;

    justify-content: space-between;
}

.c2 {
    flex: 1;
    margin: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../accsets/img/number.png');
}

.center3 {
    flex: 360;
    margin-top: 7px;
    background-image: url('../accsets/img/map.png');
}

.right {
    flex: 352;
    margin-right: 20px;
}

.right1 {
    flex: 55;
    font-size: 1.5rem;
    font-weight: bold;
    color: #71FDF8;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../accsets/img/time.png');
}

.right2 {
    flex: 160;
    margin-top: 7px;
    background-image: url('../accsets/img/module.png');
}

.right3 {
    flex: 290;
    margin-top: 7px;
    background-image: url('../accsets/img/module.png');
}

.top,
.bottom {
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.top {
    flex: 53;
}

.bottom {
    flex: 23;
    margin-top: 13px;
    background-image: url('../accsets/img/module.png');
}
</style>
