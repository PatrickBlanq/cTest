<template>
    <div class="fullscreen-div ">
        <div class="left">
            <div class="top">
                <div class="left1 flex-column">
                    <div class="t-l-column1 flex-row" style="align-items: baseline;">
                        <Title strTitle="纳期状况" @click="requestUrl"></Title>
                        <DateSelect style="margin-left: 2rem;"></DateSelect>
                    </div>
                    <div class="t-l-column2" style="flex: 2; ">
                        <div v-for="itemArc, index in dataArc.data">
                            <Arc :data="itemArc"></Arc>
                        </div>
                    </div>
                    <div class="t-l-column3 flex-row" style="">
                        <div v-for="itemCard, index in dataCard.data">
                            <NumCard :data="itemCard" />
                        </div>
                    </div>
                    <div class="t-l-column4" style="height: 100%; box-sizing: border-box;" ref="collapseDiv">
                        <Collapse :height="collapseHeight" :jsonData="dataGroup"></Collapse>
                    </div>
                </div>
            </div>
            <div class="bottom" style="display: flex; box-sizing: border-box;">
                <Title style="flex-grow: 1;  " strTitle="在库种类状况"></Title>
                <CategoryBarChart :jsonData="dataCategoryBar" v-if="selectedValue === 'bar'" data-type="bar">
                </CategoryBarChart>
                <CategoryPieChart :jsonData="dataCategoryPie" v-if="selectedValue === 'pie'" data-type="pie">
                </CategoryPieChart>
            </div>
        </div>
        <div class="center">
            <div class="top flex-column">
                <div class="center1">EPCOデータ掲示板</div>
                <div class="center2 flex-row">
                    <div class="t-c-2">
                        <IndicateBudget :num1="budget1" :num2="budget2" title="予算壳上"> </IndicateBudget>
                    </div>
                    <div class="t-c-2">
                        <IndicateBudget :num1="actual1" :num2="actual2" title="实际壳上"></IndicateBudget>
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
                        <Annual :jsonData="dataBM" style="width: 98%; height: 100%;"></Annual>
                    </Tab>
                    <Tab label="壳上" :index="1">
                        <Annual :jsonData="dataBM" style="width: 98%; height: 100%;"></Annual>
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
                            <IndicateCorrectBuilding :num1="building1" :num2="building2" title="栋数前年比率">
                            </IndicateCorrectBuilding>
                            <IndicateCardMoney :num1="money1" :num2="money2" title="壳上前年比率"> </IndicateCardMoney>
                        </div>
                        <div style="flex: 3; height: 90%;   border: 0px solid #ccc;" ref="correctTableDiv">
                            <CorrectTable v-if="correctTableHeight" :height="correctTableHeight"></CorrectTable>
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

import CategoryBarChart from '@/components/CategoryBarChart.vue';
import CategoryPieChart from '@/components/CategoryPieChart.vue'

import IndicateBudget from '@/components/IndicateBudget.vue';
import Members from '@/components/Members.vue';
import Map from '@/components/Map.vue'
import TabControl from '@/components/TabControl.vue';
import Tab from '@/components/Tab.vue';
import Annual from '@/components/Annual.vue';

import Attendance from '@/components/Attendance.vue'
import IndicateCardMoney from '@/components/IndicateCorrectMoney.vue';
import IndicateCorrectBuilding from '@/components/IndicateCorrectBuilding.vue';
import DeliveryTable from '@/components/DeliveryTable.vue';
import CorrectTable from '@/components/CorrectTable.vue';

//**********Json:Annual
import jsonYear from '../assets/json/bm-year.json';
import jsonYear1 from '../assets/json/bm-year1.json';
import jsonMonth from '../assets/json/bm-month.json';
import jsonMonth1 from '../assets/json/bm-month1.json';
import jsonDay from '../assets/json/bm-day.json';
import jsonDay1 from '../assets/json/bm-day1.json';
//**********Json:Category
import jsonPie from '../assets/json/categoryPie.json';
import jsonPie1 from '../assets/json/categoryPie1.json';
import jsonBar from '../assets/json/categoryBar.json';
import jsonBar1 from '../assets/json/categoryBar1.json';

import jsonArc from '../assets/json/arc.json';
import jsonCard from '../assets/json/numCard.json';
import indicateBudget from '../assets/json/indicateBudget.json';
import indicateCorrect from '../assets/json/indicateCorrect.json';
import jsonGroup from '../assets/json/group.json';
import jsonGroup1 from '../assets/json/group1.json';
import axios from 'axios'
import { useStore } from 'vuex'
const store = useStore()
console.log(store.state.data);
store.commit('setData', 'Updated Test Data');
const budget1 = indicateBudget.data[0].budget;
const actual1 = indicateBudget.data[0].actual;
const budget2 = indicateBudget.data[1].budget;
const actual2 = indicateBudget.data[1].actual;

const building1 = indicateCorrect.data[0].building;
const building2 = indicateCorrect.data[1].building;
const money1 = indicateCorrect.data[0].money;
const money2 = indicateCorrect.data[1].money;

let dataBM = ref(jsonDay);
let selectedValue = ref("bar");
let dataCategoryBar = ref(jsonBar)
let dataCategoryPie = ref(jsonPie)
let dataArc = ref(jsonArc)
let dataCard = ref(jsonCard)
let dataGroup = ref(jsonGroup)
//处理容器高度
const collapseDiv = ref(null);
const deliveryTableDiv = ref(null);
const correctTableDiv = ref(null);
let collapseHeight = ref(0);
let deliveryTableHeight = ref(0);
let correctTableHeight = ref(0);
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

    correctTableHeight.value = localStorage.getItem('correctHeight') * ratioHeight;
    localStorage.setItem('correctHeight', correctTableHeight.value);

};
const requestUrl=()=>{
    const storedData = localStorage.getItem('myCustomKey');  
    const parsedData = JSON.parse(storedData);  
    console.log(parsedData.members.data);
    
}
onMounted(() => {
    oldWidth.value = window.innerWidth;
    oldHeight.value = window.innerHeight;
    localStorage.setItem('oldWidth', oldWidth.value);
    localStorage.setItem('oldHeight', oldHeight.value);

    localStorage.setItem('deliveryHeight', deliveryTableDiv.value.clientHeight);
    deliveryTableHeight.value = deliveryTableDiv.value.clientHeight

    localStorage.setItem('correctHeight', correctTableDiv.value.clientHeight);
    correctTableHeight.value = correctTableDiv.value.clientHeight

    window.addEventListener('resize', updateSize);
    provideDateSelect();

});

onUnmounted(() => {
    window.removeEventListener('resize', updateSize);
});

//*************provide************ */
const triggerDateTimeDisplay = ref(null);
let dataToggle = ref(true);
let toggleGroup = ref(true);
const toggleTab = (dataType) => {
    switch (dataType) {
        case 'year':

            if (dataToggle) {
                dataBM.value = jsonYear1
            } else {
                dataBM.value = jsonYear
            }
            break;
        case 'month':

            if (dataToggle) {
                dataBM.value = jsonMonth1
            } else {
                dataBM.value = jsonMonth
            }
            break;
        case 'day':

            if (dataToggle) {
                dataBM.value = jsonDay1
            } else {
                dataBM.value = jsonDay
            }
            break;
        default:
            console.log('未知的日期类型');
    }
}
const provideDateSelect = () => {
    let dataType = localStorage.getItem('date').split(',')[1]
    toggleTab(dataType);
    let groupType = "group"
    if (localStorage.getItem("item")) {
        groupType = "item"

    }
    toggleGroup = !toggleGroup;
    if (toggleGroup) {
        dataGroup.value = jsonGroup
    } else {
        dataGroup.value = jsonGroup1
    }

    provideGroupSelect(groupType)

};

const provideGroupSelect = (groupType) => {
    dataToggle = !dataToggle;
    if (groupType == "item") {
        selectedValue.value = "pie";

        if (dataToggle) {
            dataCategoryPie.value = jsonPie

        } else {
            dataCategoryPie.value = jsonPie1

        }

    } else {
        selectedValue.value = "bar";
        if (dataToggle) {
            dataCategoryBar.value = jsonBar
        } else {
            dataCategoryBar.value = jsonBar1
        }
    }
    let dataType = localStorage.getItem('date').split(',')[1]
    toggleTab(dataType);
}

provide('triggerDateTimeDisplay', triggerDateTimeDisplay);
provide('provideDateSelect', provideDateSelect);
provide('provideGroupSelect', provideGroupSelect);
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
    width: 100%;
}

.left1,
.right2,
.right3,
.bottom {
    border: 3px solid transparent;
    border-radius: 7px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #0C1530, #0C1530),
        linear-gradient(to right,
            rgba(255, 255, 255, 0.15) 0%,
            #488EF7 17%,
            #488EF7 73%,
            rgba(255, 255, 255, 0.1) 100%);
}
</style>
