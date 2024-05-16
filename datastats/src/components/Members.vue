<template>
    <div class="card">
        <div style="flex: 1; display: flex; flex-direction: column; padding-left: 10px; padding-top: 10px;">
            <div style="flex: 1; align-items: baseline;" class="flex-row">
                <div style="color: #2FB6FF; font-weight: bolder; font-size: 1.1rem;">在&nbsp;&nbsp;籍</div>
            </div>
            <div style="flex: 1; font-size: 1.3rem; ">{{ sum }}人</div>
        </div>
        <div style="flex: 2; margin: 15px 0px 15px 0px; position: relative; padding-right: 15px;" class="member">
            <div style="display: flex; flex-direction: row;">
                <div style="flex: 1; text-align: right; "><span class="mark-small" style="margin-right:15px ;"></span>正式
                </div>
                <div style="flex: 1; text-align: right; ">{{ members[0] }} &nbsp;&nbsp;人</div>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div style="flex: 1; text-align: right; "><span class="mark-small" style="margin-right:15px ;"></span>派遣
                </div>
                <div style="flex: 1; text-align: right; ">{{ members[1] }} &nbsp;&nbsp;人</div>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div style="flex: 1; text-align: right; "><span class="mark-small" style="margin-right:15px ;"></span>在宅
                </div>
                <div style="flex: 1; text-align: right; ">{{ members[2] }} &nbsp;&nbsp;人</div>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div style="flex: 1; text-align: right; "><span class="mark-small" style="margin-right:15px ;"></span>予定
                </div>
                <div style="flex: 1; text-align: right; ">{{ members[3] }} &nbsp;&nbsp;人</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const members = [155, 16, 8, 10];
const sum = members.reduce((total, current) => total + current, 0);
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

.member {
    font-weight: 100;
    font-size: 0.75rem;
}
</style>
