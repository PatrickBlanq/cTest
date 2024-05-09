<template>
    <div class="container">
        <div class="select-box" @click="toggleYearDropdown">
            {{ selectedYear }}年
            <div v-if="showYearDropdown" class="dropdown">
                <div @click="selectYear(year)" v-for="year in years" :key="year">{{ year }}</div>
            </div>
        </div>
        <div class="separator"></div> <!-- 添加分隔符 -->
        <div class="select-box" @click="toggleMonthDropdown">
            {{ selectedMonth }}月
            <div v-if="showMonthDropdown" class="dropdown">
                <div @click="selectMonth(month)" v-for="month in months" :key="month">{{ month }}</div>
            </div>
        </div>
        <div class="separator"></div> <!-- 添加分隔符 -->
        <div class="select-box" @click="toggleDayDropdown">
            {{ selectedDay }}日
            <div v-if="showDayDropdown" class="dropdown day-dropdown">
                <!-- 显示日语星期缩写的行 -->
                <div class="day-row">
                    <div v-for="day in weekDays" :key="day" class="day-cell">{{ day }}</div>
                </div>
                <!-- 日历日期 -->
                <div v-for="row in dayRows" :key="row" class="day-row">
                    <div v-for="col in 7" :key="col" class="day-cell">
                        <div
                            v-if="(row - 1) * 7 + col - firstDayOfWeek + 1 <= daysInMonth && (row - 1) * 7 + col - firstDayOfWeek + 1 > 0">
                            {{ (row - 1) * 7 + col - firstDayOfWeek + 1 }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const years = [2022, 2023, 2024];
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

const selectedYear = ref(years[0]);
const selectedMonth = ref(months[0]);
const selectedDay = ref(1);
const showYearDropdown = ref(false);
const showMonthDropdown = ref(false);
const showDayDropdown = ref(false);

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
    console.log(firstDayOfWeek);
    const numRows = Math.ceil((totalDays + firstDayOfWeek.value) / 7);
    return numRows;
});

const toggleYearDropdown = () => {
    showYearDropdown.value = !showYearDropdown.value;
    showMonthDropdown.value = false;
    showDayDropdown.value = false;
};

const toggleMonthDropdown = () => {
    showMonthDropdown.value = !showMonthDropdown.value;
    showYearDropdown.value = false;
    showDayDropdown.value = false;
};

const toggleDayDropdown = () => {
    showDayDropdown.value = !showDayDropdown.value;
    showYearDropdown.value = false;
    showMonthDropdown.value = false;
};

const selectYear = (year) => {
    selectedYear.value = year;
    showYearDropdown.value = false;
};

const selectMonth = (month) => {
    selectedMonth.value = month;
    showMonthDropdown.value = false;
};

const selectDay = (day) => {
    selectedDay.value = day;
    showDayDropdown.value = false;
};
</script>

<style scoped>
.container {
    display: flex;
    font-size: 1rem;
    font-weight: bold;
}

.select-box {
    position: relative;
    padding: 0px 10px 0px 10px;
    cursor: pointer;
}

.separator {
    width: 1px;
    background-color: #2FB6FF;

}

.dropdown {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 5px 5px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown.day-dropdown {
    width: 355px;
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
    background-color: #f1f1f1;
}
</style>
