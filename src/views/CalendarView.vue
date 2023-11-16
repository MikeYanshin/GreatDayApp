<template>
  <div>
    <!-- Хэдер с днем и иконкой для открытия бокового меню -->
    <header>
      <span>{{ currentDay }}</span>
      <button @click="toggleSideMenu">Открыть меню</button>
    </header>

    <!-- Основной контент с разметкой по часам и скроллом -->
    <main>
      <div class="timeline">
        <!-- Здесь добавлена более полная разметка по часам -->
        <div class="hour-label" v-for="hour in hours" :key="hour">
          {{ hour }}
        </div>
      </div>

      <!-- Контент событий в течение дня -->
      <div class="events">
        <!-- Здесь можно добавить компоненты для отображения событий в течение дня -->
        <!-- Например, можно использовать v-for для перебора событий -->
        <div v-for="event in events" :key="event.id" class="event">
          {{ event.title }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

// Модель данных для дня и событий
const currentDay = ref("2023-11-16");
const hours = ref(
  Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`)
);
const events = reactive([
  { id: 1, title: "Событие 1", startTime: "10:00", endTime: "11:00" },
  { id: 2, title: "Событие 2", startTime: "12:00", endTime: "13:00" },
  /* ... */
]);

// Функция для открытия/закрытия бокового меню
const toggleSideMenu = () => {
  // Реализуйте свою логику открытия/закрытия бокового меню
};

// Дополнительные действия при монтировании компонента
onMounted(() => {
  // Реализуйте свою логику, если необходимо
});
</script>

<style scoped>
/* Стили для хэдера */
header {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #4285f4; /* Цвет хэдера в примере Google Календаря */
  color: white;
}

/* Стили для основного контента */
main {
  display: flex;
}

/* Стили для разметки по часам */
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

/* Стили для событий в течение дня */
.events {
  flex: 1; /* Занимает оставшееся пространство */
  overflow-y: auto; /* Включаем скролл, если событий больше, чем помещается на экране */
}

.event {
  padding: 8px;
  border-bottom: 1px solid #ccc; /* Граница между событиями */
}

/* Дополнительные стили по необходимости */
</style>
