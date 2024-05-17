<template>
    <div class="fullscreen-div ">
        <div class="left">
            <div class="top">
                <div class="left1 flex-column">
                    <div class="t-l-column1 flex-row" style="align-items: baseline;">
                        <Title strTitle="纳期状况"></Title>
                        <DateSelect></DateSelect>
                    </div>
                    <div class="t-l-column2" style="box-sizing: border-box; padding-left: 1rem; padding-right: 1rem; ">
                        <Arc :data="dataArc1"></Arc>
                        <Arc :data="dataArc2"></Arc>
                        <Arc :data="dataArc3"></Arc>
                        <Arc :data="dataArc4"></Arc>
                    </div>
                    <div class="t-l-column3">
                        <div class="column-flex-row">
                            <NumCard :data="dataCard1" />
                            <NumCard :data="dataCard2" />
                            <NumCard :data="dataCard3" />
                            <NumCard :data="dataCard4" />
                            <NumCard :data="dataCard5" />
                            <NumCard :data="dataCard5" />
                            <NumCard :data="dataCard5" />
                            <NumCard :data="dataCard6" />
                        </div>

                    </div>
                    <div class="t-l-column4">

                        <Collapse style="min-height: 80%; "></Collapse>
                    </div>
                </div>
            </div>
            <div class="bottom" style="box-sizing: border-box; border: 0px solid #ccc;">


                <Title style="flex-grow: 1;  " strTitle="在库种类状况"></Title>



                <StackedHB style="height: 80%; "></StackedHB>



            </div>
        </div>
        <div class="center">
            <div class="top flex-column">
                <div class="center1">EPCOデータ掲示板</div>
                <div class="center2 flex-row">
                    <div class="t-c-2">
                        <IndicateCard :num1="budget1" :num2="budget2" title="予算壳上">

                        </IndicateCard>
                    </div>
                    <div class="t-c-2">
                        <IndicateCard :num1="actual1" :num2="actual2" title="实际壳上"></IndicateCard>
                    </div>
                    <div class="t-c-2">
                        <Members></Members>
                    </div>
                </div>
                <div class="center3">

                </div>
            </div>
            <div class="bottom">
                <TabControl>

                    <Tab label="栋数" :index="0">

                        <Annual :jsonData="jsonData1"></Annual>

                    </Tab>
                    <Tab label="壳上" :index="1">
                        <Annual :jsonData="jsonData2"></Annual>
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
import { reactive } from 'vue';
import Title from '@/components/Title.vue';
import DateSelect from '@/components/DateSelect.vue';
import Arc from '@/components/Arc.vue';
import DateTimeDisplay from '@/components/DateTimeDisplay.vue';
import NumCard from '@/components/NumCard.vue';
import Collapse from '@/components/Collapse.vue';
import StackedHB from '@/components/StackedHB.vue';
import IndicateCard from '@/components/IndicateCard.vue';
import data from '../assets/json/indicateCard.json';
import Members from '@/components/Members.vue';
import TabControl from '@/components/TabControl.vue';
import Tab from '@/components/Tab.vue';
import Annual from '@/components/Annual.vue';
// 在子组件之外计算 budget1 和 budget2 的值
import jsonData1 from '../assets/json/annualMoney.json';
import jsonData2 from '../assets/json/annualBuilding.json';

const budget1 = data[0].budget;
const budget2 = data[1].budget;
const actual1 = data[0].actual;
const actual2 = data[1].actual;
/* const menu = reactive([
    { id: 1, group1: "沖縄第2設計センター", group2: "沖縄第1G", group3: "第1・2T", name: "橋本総業（アイフル・一般）、東京セキスイ、渡辺パイプ", selected: false, color: "#488EF7", width: "60%" },
    { id: 2, group1: "g1", group2: "g1-g1", group3: "g321", name: "大和ハウス総合窓口　変更（住宅・給排水）", selected: false, color: "#F2B564", width: "40%" },
    { id: 3, group1: "g2", group2: "g1", group3: "g312", name: "g2g1n1", selected: false, color: "#F2B564", width: "40%" },
    { id: 4, group1: "g2", group2: "g2", group3: "g322", name: "g2g2n2", selected: false, color: "#F2B564", width: "40%" },
    { id: 5, group1: "g2", group2: "g2", group3: "g322", name: "gh2g2n2", selected: false, color: "#F2B564", width: "40%" }
]); */

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
    flex-shrink: 0;
    flex-direction: column;
    margin: 17px 0px 17px 17px;
    /* border: 1px solid #ccc; */
}

.left {
    flex: 43;
}

.center {
    flex: 63;
}

.right {
    flex: 43;
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
    width: 99%;
    height: 100%;
    border-width: 0px;
    border-color: #fff;
    border-style: solid;
}

.t-l-column1 {
    flex: 34
}

.t-l-column2 {
    flex: 80;
    justify-content: space-between;
}

.t-l-column3 {
    flex: 50;

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
    background-image: url('../assets/img/title.png');

}

.flex-row {
    display: flex;
    flex-direction: row;

}

.center2 {
    flex: 78;
    justify-content: space-between;
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

.center3 {
    flex: 360;
    margin-top: 7px;
    background-image: url('../assets/img/map.png');
}


.right1 {
    flex: 55;
    font-size: 1.5rem;
    font-weight: bold;
    color: #71FDF8;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/img/time.png');
}

.right2 {
    flex: 160;
    margin-top: 7px;
    background-image: url('../assets/img/module.png');
}

.right3 {
    flex: 290;
    margin-top: 7px;
    background-image: url('../assets/img/module.png');
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
    background-image: url('../assets/img/module.png');
}
</style>
