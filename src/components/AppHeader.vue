<template>
  <header>
    <el-icon size="small" color="white" @click="toggleSideMenu">
      <Expand />
    </el-icon>
    <span>{{ currentDay }}</span>
    <span>М. Яньшин</span>
  </header>

  <transition name="slide">
    <side-menu v-if="isMenuOpen" />
  </transition>
</template>

<script lang="ts" setup>
import { Expand, Plus } from "@element-plus/icons-vue";
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
  return date.getDate() + " " + day[0].toUpperCase() + day.substring(1);
});

// Функция для открытия/закрытия бокового меню
const toggleSideMenu = () => {
  sideMenuStore.openSideMenu();
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #4285f4;
  color: white;
  position: fixed;
  top: 0;
  width: -webkit-fill-available;
  z-index: 3;
  align-items: center;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

.expand-button {
  color: white;
}
</style>
