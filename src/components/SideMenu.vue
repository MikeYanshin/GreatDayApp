<template>
  <transition name="slide">
    <div v-if="isMenuOpen" class="side-menu">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>

<style scoped>
/* Стили для бокового меню и анимации */
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  background-color: #333;
  color: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
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
