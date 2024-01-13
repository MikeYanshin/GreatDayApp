<template>
  <div class="calendar-view">
    <div class="calendar-column">
      <div class="vertical-line"></div>
      <div class="calendar-column-grid">
        <div class="calendar-column-grid-line" v-for="n in 25" :key="`${n}`">
          <span class="calendar-column-grid-time">{{ n - 1 }}:00</span>
        </div>
      </div>
      <div class="calendar-column-events">
        <div
          class="calendar-column-events-now"
          v-if="new Date().getDay() === day.getDay()"
          :style="{ top: scrollPercent + '%' }"
        >
          <span class="circle"></span>
        </div>

        <calendar-event
          v-for="(event, index) in events"
          :key="index"
          :data="event"
          class="calendar-event"
          :style="{ top: eventScrollTop(event) + 'px' }"
        ></calendar-event>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Event = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
};

import { ref, reactive, computed, onMounted } from "vue";
import CalendarEvent from "../components/CalendarEvent.vue";
import AppHeader from "../components/AppHeader.vue";
import { diffMinutes } from "../js/helpers/diffMinutes";
import { isBefore, isAfter, isSame } from "../js/helpers/timeSorting";

const active = ref(false);
const day = new Date();
const now = new Date();
const minutes = now.getMinutes() + now.getHours() * 60;

const scrollPercent = computed(
  () => ((minutes - 0) / (60 * 24 - 0)) * (100 - 0) - 2
);

// const hours = ref(
//   Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`)
// );

const events = reactive([
  {
    id: 1,
    title: "Поездка на работу",
    startTime: new Date(2024, 0, 13, 10, 0, 0),
    dur: 60,
  },
  {
    id: 2,
    title: "Зарядка и завтрак",
    startTime: new Date(2024, 0, 13, 7, 0, 0),
    dur: 90,
  },
  {
    id: 3,
    title: "Деловая встреча",
    startTime: new Date(2024, 0, 13, 16, 0, 0),
    dur: 120,
  },
  {
    id: 4,
    title: "Мешать соседям",
    startTime: new Date(2024, 0, 13, 0, 0, 0),
    dur: 15,
  },
  // { id: 2, title: "Событие 2", startTime: "12:00", endTime: "13:00", dur: 60 },
  /* ... */
]);

// // Вычисляемое свойство для стиля событий
// const eventStyle = (event: Event) => {
//   const startHour = parseInt(event.startTime.split(":")[0]);
//   const endHour = parseInt(event.endTime.split(":")[0]);
//   const height = (endHour - startHour) * 60; // Высота события в минутах
//   const top = startHour * 60; // Верхняя позиция события в минутах

//   return {
//     height: `${height}px`,
//     top: `${top}px`,
//   };
// };

const eventScrollTop = (event) => {
  const eventTime =
    event.startTime instanceof Date
      ? event.startTime
      : new Date(event.startTime);

  // Получаем часы и минуты из времени события
  const hours = eventTime.getHours();
  const minutes = eventTime.getMinutes();

  // Вычисляем общее количество минут с полуночи
  const minutesFromMidnight = hours * 60 + minutes;

  return minutesFromMidnight - 2;
};
</script>

<style scoped>
.calendar-view {
  display: flex;
  flex-direction: column;
  position: relative;
}

.calendar-column {
  display: flex;
  width: 100%;
  padding-top: 52px;
}
.calendar-column-grid {
  width: 100%;
}

.calendar-column-grid-line {
  border-bottom: 1px solid gray;
  width: 100%;
  height: 59px;
  position: relative;
}

.calendar-column-grid-line:first-child {
  border-top: 1px solid gray;
  height: 58px;
}

.calendar-column-grid-time {
  position: absolute;
  top: -10px;
  left: 0px;
  background-color: white;
  padding: 0 4px;
}

.vertical-line {
}

.calendar-column-events-now {
  background-color: black;
  height: 1px;
  position: absolute;
  width: -webkit-fill-available;
  left: 48px;
}

.calendar-column-events {
  position: absolute;
  top: 54px;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
}

.calendar-event {
  background-color: #ccc;
  position: absolute;
  width: -webkit-fill-available;
  left: 48px;
  right: 6px;
  border-radius: 6px;
}

.circle {
  height: 7px;
  width: 7px;
  border-radius: 100%;
  display: block;
  background-color: black;
  position: absolute;
  top: -3px;
}
</style>
