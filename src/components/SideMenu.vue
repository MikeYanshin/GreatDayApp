<template>
  <div class="side-menu">
    <button @click="sideMenuStore.toggleSideMenu()">закрыть</button>
  </div>
</template>

<script setup lang="ts">
import { useSideMenuStore } from "@/store";

const sideMenuStore = useSideMenuStore();
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
</style>
