<template>
  <header>
    <button @click="toggleSideMenu">Открыть меню</button>
    <span>{{ currentDay }}</span>
    <span>М. Яньшин</span>
  </header>

  <transition name="slide">
    <side-menu v-if="isMenuOpen" />
  </transition>
</template>

<script lang="ts" setup>
import SideMenu from "@/components/SideMenu.vue";
import { computed } from "vue";

import { useSideMenuStore } from "@/store";

const sideMenuStore = useSideMenuStore();

const isMenuOpen = computed(() => {
  return sideMenuStore.isOpen;
});

const currentDay = computed(() => {
  const date = new Date();
  const day = date.toLocaleDateString("ru-RU", { weekday: "long" });
  return day[0].toUpperCase() + day.substring(1);
});

// Функция для открытия/закрытия бокового меню
const toggleSideMenu = () => {
  sideMenuStore.toggleSideMenu();
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
