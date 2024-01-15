<template>
  <div class="side-menu">
    <button @click="sideMenuStore.toggleSideMenu()">закрыть</button>
    <div @click="goToBasePage" class="base-page">{{ basePage }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useSideMenuStore } from "@/store";
import { computed } from "vue";

const sideMenuStore = useSideMenuStore();
const router = useRouter();
const route = useRoute();
const onHomePage = computed(() => route.name === "home");
const onRemindersPage = computed(() => route.name === "reminders");
const basePage = computed(() =>
  onHomePage.value ? "Напоминания" : "Календарь"
);
const goToBasePage = () => {
  if (onHomePage.value) router.push("reminders");
  if (onRemindersPage.value) router.push("/");
  sideMenuStore.toggleSideMenu();
};
</script>

<style scoped>
/* Стили для бокового меню и анимации */
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100px;
  background-color: #f9f9f9;
  color: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 5;
}

.base-page {
  margin-top: 8px;
  color: black;
}
</style>
