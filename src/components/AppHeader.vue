<template>
  <header>
    <el-icon class="icon" size="small" color="white" @click="toggleSideMenu">
      <Expand />
    </el-icon>
    <span>{{ currentDay.month }}</span>
    <span>{{ currentDay.day }} {{ currentDay.date }}</span>
    <el-avatar :src="avatarUrl" @click="router.push('profile')" :size="28"
      >М</el-avatar
    >
  </header>

  <transition name="slide">
    <side-menu v-if="isMenuOpen" />
  </transition>
</template>

<script lang="ts" setup>
import { Expand } from "@element-plus/icons-vue";
import SideMenu from "@/components/SideMenu.vue";
import { computed } from "vue";
const router = useRouter();
const route = useRoute();

import { useSideMenuStore } from "@/store";
import { useRoute, useRouter } from "vue-router";

const sideMenuStore = useSideMenuStore();
const avatarUrl =
  "https://sun9-78.userapi.com/impg/MDj4mLTin9zgOfzcJh9LONR4_p9ccMXLxRQYDg/JOr_8iVovCs.jpg?size=2000x1333&quality=95&sign=912fbf32e2f1b30d5972d9129dde4cba&type=album";

const isMenuOpen = computed(() => {
  return sideMenuStore.isOpen;
});

const onProfilePage = computed(() => route.name === "profile");
const currentDay = computed(() => {
  const date = new Date();
  const day = date.toLocaleDateString("ru-RU", { weekday: "long" });
  const month = date.toLocaleDateString("ru-RU", { month: "long" });
  return {
    day: day[0].toUpperCase() + day.substring(1),
    month: month[0].toUpperCase() + month.substring(1),
    date: date.getDate(),
  };
});

// Функция для открытия/закрытия бокового меню
const toggleSideMenu = () => {
  sideMenuStore.openSideMenu();
};
</script>

<style scoped>
.icon {
  height: 24px;
  width: 24px;
}
header {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #409eff;
  color: white;
  position: fixed;
  top: 0;
  width: -webkit-fill-available;
  z-index: 3;
  align-items: center;
  height: 53px;
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
