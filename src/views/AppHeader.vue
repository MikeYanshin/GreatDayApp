<template>
  <header>
    <button @click="toggleSideMenu">Открыть меню</button>
    <span>{{ currentDay }}</span>
    <span>М. Яньшин</span>
  </header>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const currentDay = computed(() => {
  const date = new Date();
  const day = date.toLocaleDateString("ru-RU", { weekday: "long" });
  return day[0].toUpperCase() + day.substring(1);
});

// Функция для открытия/закрытия бокового меню
const toggleSideMenu = () => {
  // Реализуйте свою логику открытия/закрытия бокового меню
};
</script>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #4285f4;
  color: white;
}
</style>
