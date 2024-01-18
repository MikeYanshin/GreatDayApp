<template>
  <div class="side-menu" @click="closeMenuOutside">
    <div class="side-menu-content" ref="menuRef">
      <div class="side-menu-header">Great Day</div>
      <br />
      <div @click="router.push('/')" v-if="!onHomePage" class="base-page">
        <el-icon><Calendar /></el-icon>
        Календарь
      </div>
      <div
        @click="router.push('reminders')"
        v-if="!onRemindersPage"
        class="base-page"
      >
        <el-icon><Bell /></el-icon>
        Напоминания
      </div>
      <div
        v-if="!onSettingsPage"
        @click="router.push('settings')"
        class="base-page"
      >
        <el-icon><Tools /></el-icon>
        Настройки
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useSideMenuStore } from "@/store";
import { computed, ref, watch } from "vue";
import { Tools, Calendar, Bell } from "@element-plus/icons-vue";

const sideMenuStore = useSideMenuStore();
const router = useRouter();
const route = useRoute();
const onHomePage = computed(() => route.name === "home");
const onRemindersPage = computed(() => route.name === "reminders");
const onSettingsPage = computed(() => route.name === "settings");
const menuRef = ref<HTMLDivElement | null>(null);

const closeMenuOutside = (event: MouseEvent) => {
  if (!menuRef.value?.contains(event.target)) {
    sideMenuStore.closeSideMenu();
  }
};

watch(route, () => {
  sideMenuStore.toggleSideMenu();
});
</script>

<style scoped>
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: -webkit-fill-available;
  z-index: 5;
}

.side-menu-content {
  width: 250px;
  background-color: #ececec;
  color: #fff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  display: block;
  height: 100%;
}

.base-page {
  margin-top: 14px;
  color: #434242;
  font-size: 22px;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-left: 16px;
}

.side-menu-header {
  font-family: Helvetica, sans-serif;
  font-weight: 100;
  font-size: 50px;
  background: linear-gradient(
    0deg,
    rgba(51, 126, 204, 1) 0%,
    rgba(64, 158, 255, 1) 55%,
    rgba(198, 226, 255, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>
