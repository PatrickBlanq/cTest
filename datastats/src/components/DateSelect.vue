<template>
    <div class="container" ref="container" @click="handleContainerClick">
        <div class="select-box" :class="{ 'selected': selectedValue === 'year' }" data-type="year">
            {{ selectedYear }} 年
            <div v-show="showDropdown === 'year'" class="dropdown">
                <div v-for="year in years" :key="year" class="cell-flex hover" :data-value="year" data-type="year"
                    :class="selectedValue === 'year' ? 'hover-selected' : 'hover-not-selected'">
                    {{ year }}
                </div>
            </div>
        </div>

        <div class="separator"></div>

        <div class="select-box month-container" :class="{ 'selected': selectedValue === 'month' }" data-type="month">
            {{ selectedMonth }} 月
            <div v-show="showDropdown === 'month'" class="dropdown">
                <div v-for="month in months" :key="month" class="cell-flex hover" :data-value="month" data-type="month"
                :class="selectedValue === 'month' ? 'hover-selected' : 'hover-not-selected'">
                    {{ month }}</div>
            </div>
        </div>

        <div class="separator"></div>

        <div class="select-box day-container" :class="{ 'selected': selectedValue === 'day' }" data-type="day">
            {{ selectedDay }} 日
            <div v-show="showDropdown === 'day'" class="dropdown day-dropdown">
                <div class="day-row" style="margin-bottom: 15px;">
                    <div v-for="day in weekDays" :key="day" class="cell-flex">{{ day }}</div>
                </div>
                <div v-for="row in dayRows" :key="row" class="day-row">
                    <div v-for="col in 7" :key="col" class="cell-flex">
                        <div class="cell-flex hover" v-if="getday(row, col) <= daysInMonth && getday(row, col) > 0"
                            :data-value="getday(row, col)" data-type="day"
                            :class="selectedValue === 'day' ? 'hover-selected' : 'hover-not-selected'">
                            {{ getday(row, col) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, computed, onMounted, onUnmounted } from 'vue';

const years = [2022, 2023, 2024];
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
const selectedYear = ref(new Date().getFullYear());
const selectedMonth = ref(new Date().getMonth() + 1);
const selectedDay = ref(new Date().getDate());
const selectedValue = ref("day");
const showDropdown = ref(null); // 用于跟踪当前显示的下拉框类型
const container = ref(null);
const daysInMonth = computed(() => new Date(selectedYear.value, selectedMonth.value, 0).getDate());
const firstDayOfWeek = computed(() => new Date(selectedYear.value, selectedMonth.value - 1, 1).getDay() + 1);
const dayRows = computed(() => Math.ceil((daysInMonth.value + firstDayOfWeek.value) / 7));
const getday = (row, col) => {
    return (row - 1) * 7 + col - firstDayOfWeek.value + 1
}
const handleContainerClick = (event) => {
    const type = event.target.dataset.type;
    const value = event.target.dataset.value;

    if (value !== undefined) {
        if (type === 'year') {
            selectedYear.value = parseInt(value, 10);
        } else if (type === 'month') {
            selectedMonth.value = parseInt(value, 10);
        } else if (type === 'day') {
            selectedDay.value = parseInt(value, 10);
        }
        selectedValue.value = type;
        showDropdown.value = null; // 关闭下拉框
        const formattedDay = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-${String(selectedDay.value).padStart(2, '0')}`;
        console.log(formattedDay);
        console.log(type);
    } else if (type) {
        showDropdown.value = showDropdown.value === type ? null : type;
        //selectedValue.value = type;
    } else {
        closeDropdown();
    }
};

const handleClickOutside = (event) => {
    if (!container.value.contains(event.target)) {
        closeDropdown();
    }
};

const closeDropdown = () => {
    showDropdown.value = null;
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>


<style scoped>
.container {
    display: flex;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 20px;
}

.select-box {
    width: 62px;
    margin: 0px 5px 0px 5px;
    position: relative;
    cursor: pointer;
    text-align: center;
}



.dropdown {
    position: absolute;
    width: 100%;
    top: calc(100% + 5px);
    left: 0;
    padding: 1px;
    background-color: rgba(0, 0, 0, 0.75);
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 3px 3px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.month-container {
    width: 47px;

}

.day-container {
    margin-left: -0px;
}

.day-dropdown {

    width: 315px;
}

.day-row {
    display: flex;

}

.cell-flex {
    flex: 1;
    cursor: pointer;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.hover {

    padding: 7px 0px 7px 0px;

}

.hover-selected:hover {
    border: 1px solid white;
}

.hover-not-selected:hover {
    border: 1px solid hsl(177,100%,70%);
}

.selected {
    color: #6FF8F4;
}
</style>
