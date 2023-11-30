<template>
  <div class="calendar-container">
    <!-- Основной контент с разметкой по часам -->
    <main>
      <div class="timeline">
        <div class="hour-label" v-for="hour in hours" :key="hour">
          {{ hour }}
        </div>
      </div>

      <!-- Контент событий в течение дня -->
      <div class="events">
        <!-- Здесь можно добавить компоненты для отображения событий в течение дня -->
        <!-- Например, можно использовать v-for для перебора событий -->
        <div
          v-for="event in events"
          :key="event.id"
          class="event"
          :style="eventStyle(event)"
        >
          {{ event.title }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
type Event = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
};

import { ref, reactive, computed } from "vue";

const hours = ref(
  Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`)
);
const events = reactive([
  { id: 1, title: "Событие 1", startTime: "10:00", endTime: "11:00" },
  { id: 2, title: "Событие 2", startTime: "12:00", endTime: "13:00" },
  /* ... */
]);

// Вычисляемое свойство для стиля событий
const eventStyle = (event: Event) => {
  const startHour = parseInt(event.startTime.split(":")[0]);
  const endHour = parseInt(event.endTime.split(":")[0]);
  const height = (endHour - startHour) * 60; // Высота события в минутах
  const top = startHour * 60; // Верхняя позиция события в минутах

  return {
    height: `${height}px`,
    top: `${top}px`,
  };
};
</script>

<style scoped>
main {
  display: flex;
  margin-top: 60px; /* Учитываем высоту хэдера */
}

.timeline {
  flex: 0 0 80px; /* Фиксированная ширина разметки по часам */
  border-right: 1px solid #ccc; /* Граница между разметкой и событиями */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hour-label {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ccc; /* Граница между часами */
  text-align: center;
}

.events {
  flex: 1; /* Занимает оставшееся пространство */
  overflow-y: auto; /* Включаем скролл, если событий больше, чем помещается на экране */
  position: relative; /* Необходимо для позиционирования событий */
}

.event {
  position: absolute;
  left: 80px; /* Учитываем ширину разметки по часам */
  width: calc(100% - 80px); /* Учитываем ширину разметки по часам */
  padding: 8px;
  border-bottom: 1px solid #ccc; /* Граница между событиями */
}
</style>
