<template>
    <div class="container" ref="container">
        <div class="select-box" :class="{ 'selected': selectedValue === 'year' }" @click="toggleYearDropdown"
            tabindex="0" @blur="closeDropdown">
            {{ selectedYear }} 年
            <div v-if="showYearDropdown" class="dropdown">
                <div @click="selectYear(year)" v-for="year in years" :key="year" class="day-cell">{{ year }}</div>
            </div>
        </div>
        <div class="separator"></div>
        <div class="select-box month-select" :class="{ 'selected': selectedValue === 'month' }"
            @click="toggleMonthDropdown" tabindex="0" @blur="closeDropdown">
            {{ selectedMonth }} 月
            <div v-if="showMonthDropdown" class="dropdown">
                <div @click="selectMonth(month)" v-for="month in months" :key="month" class="day-cell">{{
                    month }}</div>
            </div>
        </div>
        <div class="separator"></div>
        <div class="select-box" :class="{ 'selected': selectedValue === 'day' }" @click="toggleDayDropdown" tabindex="0"
            @blur="closeDropdown">
            {{ selectedDay }} 日
            <div v-if="showDayDropdown" class="dropdown day-dropdown">
                <!-- 显示日语星期缩写的行 -->
                <div class="day-row">
                    <div v-for="day in weekDays" :key="day" class="day-cell">{{ day }}</div>
                </div>
                <!-- 日历日期 -->
                <div v-for="row in dayRows" :key="row" class="day-row">
                    <div v-for="col in 7" :key="col" class="day-cell">
                        <div v-if="(row - 1) * 7 + col - firstDayOfWeek + 1 <= daysInMonth && (row - 1) * 7 + col - firstDayOfWeek + 1 > 0"
                            @click="selectDay((row - 1) * 7 + col - firstDayOfWeek + 1)">
                            {{ (row - 1) * 7 + col - firstDayOfWeek + 1 }}
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

const selectedYear = ref(years[0]);
const selectedMonth = ref(months[0]);
const selectedDay = ref(1);
const showYearDropdown = ref(false);
const showMonthDropdown = ref(false);
const showDayDropdown = ref(false);
const selectedValue = ref(null);
const container = ref(null);
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1);
const daysInMonth = computed(() => {
    return new Date(selectedYear.value, selectedMonth.value, 0).getDate();
});

const firstDayOfWeek = computed(() => {
    return new Date(selectedYear.value, selectedMonth.value - 1, 1).getDay() + 1;
});

const dayRows = computed(() => {
    const totalDays = daysInMonth.value;
    const numRows = Math.ceil((totalDays + firstDayOfWeek.value) / 7);
    return numRows;
});

const toggleYearDropdown = () => {
    showYearDropdown.value = !showYearDropdown.value;
    showMonthDropdown.value = false;
    selectedValue.value = 'year';
};

const toggleMonthDropdown = () => {
    showMonthDropdown.value = !showMonthDropdown.value;
    showYearDropdown.value = false;
    selectedValue.value = 'month';
};

const toggleDayDropdown = () => {
    showDayDropdown.value = !showDayDropdown.value;
    showYearDropdown.value = false;
    selectedValue.value = 'day';
};

const selectYear = (year) => {
    selectedYear.value = year;
    showYearDropdown.value = false;
    selectedValue.value = 'year';
    const formattedDay = `${selectedYear.value}`;
    console.log(formattedDay);
};

const selectMonth = (month) => {
    selectedMonth.value = month;
    showMonthDropdown.value = false;
    selectedValue.value = 'month';
    const formattedDay = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`;
    console.log(formattedDay);
};

const selectDay = (day) => {
    selectedDay.value = day;
    showDayDropdown.value = false;
    selectedValue.value = 'day';
    const formattedDay = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    console.log(formattedDay);
};
onMounted(() => {
    container.value = document.querySelector('.container');
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

const handleClickOutside = (event) => {
    if (container.value && !container.value.contains(event.target)) {
        if (!document.querySelector('.selected')) {
            selectedValue.value = null;
        }
        showYearDropdown.value = false;
        showMonthDropdown.value = false;
        showDayDropdown.value = false;
    }
};

const closeDropdown = () => {
    if (!document.querySelector('.selected')) {
        selectedValue.value = null;
    }
};
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
    margin: 0px 5px 0px 5px;
    position: relative;
    cursor: pointer;
}



.dropdown {
    position: absolute;
    width: 100%;
    top: calc(100% + 5px);
    left: 0;
    background-color: rgba(0, 0, 0, 0.75);
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 5px 5px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.select-box.month-select {
    width: 37px;
}

.dropdown.day-dropdown {
    width: 315px;
}

.day-row {
    display: flex;
}

.day-cell {
    flex: 1;
    padding: 8px 12px;
    cursor: pointer;
}

.day-cell:hover {
    background-color: #2FB6FF;
}

.selected {
    color: green;
}
</style>
