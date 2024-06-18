<template>
    <div class="fullscreen-div ">
        <div class="left">
            <div class="top">
                <div class="left1 flex-column">
                    <div class="t-l-column1 flex-row" style="align-items: baseline;">
                        <Title strTitle="纳期状况"></Title>
                        <DateSelect style="margin-left: 2rem;"></DateSelect>
                    </div>
                    <div class="t-l-column2" style="flex: 2; ">
                        <Arc :data="dataArc1"></Arc>
                        <Arc :data="dataArc2"></Arc>
                        <Arc :data="dataArc3"></Arc>
                        <Arc :data="dataArc4"></Arc>
                    </div>
                    <div class="t-l-column3 flex-row" style="  ">
                        <NumCard :data="dataCard1" />
                        <NumCard :data="dataCard2" />
                        <NumCard :data="dataCard3" />
                        <NumCard :data="dataCard4" />
                        <NumCard :data="dataCard5" />
                        <NumCard :data="dataCard5" />
                        <NumCard :data="dataCard5" />
                        <NumCard :data="dataCard6" />
                    </div>
                    <div class="t-l-column4" style="height: 100%; box-sizing: border-box;" ref="collapseDiv">
                        <Collapse :height="collapseHeight"></Collapse>
                    </div>
                </div>
            </div>
            <div class="bottom" style="display: flex; box-sizing: border-box;">
                <Title style="flex-grow: 1;  " strTitle="在库种类状况"></Title>
                <StackedHB></StackedHB>
            </div>
        </div>
        <div class="center">
            <div class="top flex-column">
                <div class="center1">EPCOデータ掲示板</div>
                <div class="center2 flex-row">
                    <div class="t-c-2">
                        <IndicateCard :num1="budget1" :num2="budget2" title="予算壳上"> </IndicateCard>
                    </div>
                    <div class="t-c-2">
                        <IndicateCard :num1="actual1" :num2="actual2" title="实际壳上"></IndicateCard>
                    </div>
                    <div class="t-c-2">
                        <Members></Members>
                    </div>
                </div>
                <div class="center3">
                    <Map></Map>
                </div>
            </div>
            <div class="bottom">

                    <TabControl style="width: 100%; height: 100%; border: 0px solid #ccc;">
                        <Tab label="栋数" :index="0">
                            <Annual :jsonData="jsonData1" style="width: 100%; height: 100%;"></Annual>
                        </Tab>
                        <Tab label="壳上" :index="1">
                            <Annual :jsonData="jsonData2" style="width: 100%; height: 100%;"></Annual>
                        </Tab>
                    </TabControl>


            </div>
        </div>
        <div class="right">
            <div class="top flex-column">
                <div class="right1">
                    <DateTimeDisplay />
                </div>
                <div class="right2">
                    <Title strTitle="出勤人数"></Title>
                    <Attendance></Attendance>
                </div>
                <div class="right3">
                    <div style="flex: 1;">
                        <Title strTitle="是正状况"></Title>
                    </div>
                    <div style="flex: 8; display: flex; flex-direction: column; height: 100%; border: 0px solid #ccc;">
                        <div
                            style="flex: 2;display: flex; height: 100%;  flex-direction: row;  border: 0px solid #ccc;">
                            <IndicateCardBuilding :num1="building1" :num2="building2" title="栋数前年比率">
                            </IndicateCardBuilding>
                            <IndicateCardMoney :num1="money1" :num2="money2" title="壳上前年比率"> </IndicateCardMoney>
                        </div>
                        <div style="flex: 3; height: 90%;   border: 0px solid #ccc;" ref="checkBackTableDiv">
                            <CheckBackTable v-if="checkBackTableHeight" :height="checkBackTableHeight"></CheckBackTable>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div style="flex: 1;">
                    <Title strTitle="纳期动态"></Title>
                </div>
                <div style="flex: 1;"></div>
                <div style="flex: 19; box-sizing: border-box;  height: 100%; border: 0px solid #ccc;"
                    ref="deliveryTableDiv">
                    <DeliveryTable v-if="deliveryTableHeight" :height="deliveryTableHeight"></DeliveryTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue';
import Title from '@/components/Title.vue';
import DateSelect from '@/components/DateSelect.vue';
import Arc from '@/components/Arc.vue';
import DateTimeDisplay from '@/components/DateTimeDisplay.vue';
import NumCard from '@/components/NumCard.vue';
import Collapse from '@/components/Collapse.vue';
import StackedHB from '@/components/StackedHB.vue';
import IndicateCard from '@/components/IndicateCard.vue';

import dataIndicate from '../assets/json/indicateCard.json';
import dataIndicate2 from '../assets/json/indicateCard2.json';
import Members from '@/components/Members.vue';
import Map from '@/components/Map.vue'
import TabControl from '@/components/TabControl.vue';
import Tab from '@/components/Tab.vue';
import Annual from '@/components/Annual.vue';
import jsonData1 from '../assets/json/annualMoney.json';
import jsonData2 from '../assets/json/annualBuilding.json';

import Attendance from '@/components/Attendance.vue'
import IndicateCardMoney from '@/components/IndicateCardMoney.vue';
import IndicateCardBuilding from '@/components/IndicateCardBuilding.vue';
import DeliveryTable from '@/components/DeliveryTable.vue';
import CheckBackTable from '@/components/CheckBackTable.vue';
const budget1 = dataIndicate[0].budget;
const budget2 = dataIndicate[1].budget;
const actual1 = dataIndicate[0].actual;
const actual2 = dataIndicate[1].actual;

const building1 = dataIndicate2[0].building;
const building2 = dataIndicate2[1].building;
const money1 = dataIndicate2[0].money;
const money2 = dataIndicate2[1].money;

const dataArc1 = {
    num: 2654,
    title: '预算栋数',
    endAngle: 340,
    color: "#488EF7",
};
const dataArc2 = {
    num: 2510,
    title: '依赖栋数',
    endAngle: 290,
    color: "#F2B564",
};
const dataArc3 = {
    num: 1200,
    title: '纳品栋数',
    endAngle: 250,
    color: "#F2B564",
};
const dataArc4 = {
    num: "45%",
    title: '予算比率',
    endAngle: 270,
    color: "#F2B564",
};

const dataCard1 = {
    num: 680,
    title: '依赖前'
};

const dataCard2 = {
    num: 460,
    title: '今日的受信'
};
const dataCard3 = {
    num: 120,
    title: '保留'
};
const dataCard4 = {
    num: 67,
    title: '依赖中'
};
const dataCard5 = {
    num: 87,
    title: '戻り残'
};
const dataCard6 = {
    num: 24,
    title: '返却'
};
const dataCard7 = {
    num: 456,
    title: '依赖中'
};


const collapseDiv = ref(null);
const deliveryTableDiv = ref(null);
const checkBackTableDiv = ref(null);
let collapseHeight = ref(0);
let deliveryTableHeight = ref(0);
let checkBackTableHeight = ref(0);
let oldWidth = ref(0);
let oldHeight = ref(0);

const updateSize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    const ratioWidth = newWidth >= oldWidth.value ? newWidth / oldWidth.value : -oldWidth.value / newWidth;
    const ratioHeight = newHeight >= oldHeight.value ? newHeight / oldHeight.value : newHeight / oldHeight.value;
    localStorage.setItem('ratioWidth', ratioWidth);
    localStorage.setItem('ratioHeight', ratioHeight);

    oldWidth.value = newWidth;
    oldHeight.value = newHeight;
    localStorage.setItem('oldWidth', oldWidth.value);
    localStorage.setItem('oldHeight', oldHeight.value);

    deliveryTableHeight.value = localStorage.getItem('deliveryHeight') * ratioHeight;
    localStorage.setItem('deliveryHeight', deliveryTableHeight.value);

    checkBackTableHeight.value = localStorage.getItem('checkBackHeight') * ratioHeight;
    localStorage.setItem('checkBackHeight', checkBackTableHeight.value);

};


onMounted(() => {
    oldWidth.value = window.innerWidth;
    oldHeight.value = window.innerHeight;
    localStorage.setItem('oldWidth', oldWidth.value);
    localStorage.setItem('oldHeight', oldHeight.value);

    localStorage.setItem('deliveryHeight', deliveryTableDiv.value.clientHeight);
    deliveryTableHeight.value = deliveryTableDiv.value.clientHeight

    localStorage.setItem('checkBackHeight', checkBackTableDiv.value.clientHeight);
    checkBackTableHeight.value = checkBackTableDiv.value.clientHeight



    window.addEventListener('resize', updateSize);

});

onUnmounted(() => {
    window.removeEventListener('resize', updateSize);
});


const dateTimeDisplayTrigger = ref(null);
provide('dateTimeDisplayTrigger', dateTimeDisplayTrigger);

</script>

<style scoped>
.fullscreen-div {
    width: 100vw;
    height: 100vh;
    background-color: #04091F;
    display: flex;
    color: #fff;
}

.flex-row {
    display: flex;
    flex-direction: row;

}

.left,
.center,
.right {
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    padding: 17px 0px 17px 17px;
    border: 0px solid #ccc;
}

.left {
    flex: 42;
}

.center {
    flex: 63;
}

.right {
    flex: 42;
    margin-right: 20px;
}

.left1 {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../assets/img/left1.png');
}

.t-l-column1,
.t-l-column2,
.t-l-column3,
.t-l-column4 {
    display: flex;
    width: 100%;
    height: 100%;
    border-width: 0px;
    border-color: #fff;
    border-style: solid;
    border: 0px solid #ccc;
}

.t-l-column1 {
    flex: 34
}

.t-l-column2 {
    flex: 80;
    justify-content: space-around;
}

.t-l-column3 {
    flex: 50;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0.5rem 1.5rem 0rem 1.5rem;

}

.t-l-column4 {
    display: flex;
    flex-direction: column;
}

.collapse-component {
    flex-grow: 1;
    overflow: auto;

}

.column-flex-row {
    display: flex;
    flex: 1;
    flex-direction: row;
}


.t-l-column4 {
    flex: 380
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

.center1 {
    flex: 55;
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/img/title.png');

}

.center2 {
    flex: 78;
    justify-content: space-around;
}

.center3 {
    flex: 360;
    margin-top: 7px;
    width: 100%;
    height: 100%;

}

.right1,
.right2,
.right3 {
    display: flex;
    flex-direction: column;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    border: 0px solid #ccc;
}

.right1 {
    flex: 5;
    font-size: 1.5rem;
    font-weight: bold;
    color: #71FDF8;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/img/time.png');
}

.right2 {
    flex: 16;
    margin-top: 7px;
    background-image: url('../assets/img/module.png');
}

.right3 {
    flex: 29;
    margin-top: 7px;
    background-image: url('../assets/img/module.png');
}

.t-c-2 {
    flex: 1;
    margin: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../assets/img/number.png');
}

.top,
.bottom {
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    border: 0px solid #ccc;
}

.top {
    flex: 53;
}

.bottom {
    flex: 23;
    margin-top: 13px;
    background-image: url('../assets/img/module.png');
}
</style>
