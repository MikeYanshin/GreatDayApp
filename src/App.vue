<template>
  <div>
    <app-header v-if="onHomePage || onRemindersPage || onSettingsPage" />
    <router-view />
    <el-button
      v-if="onHomePage"
      @click="addTaskListVisible = !addTaskListVisible"
      class="add-task-button"
      circle
      plain
    >
      <el-icon size="24" color="white">
        <Plus />
      </el-icon>
    </el-button>
    <Transition>
      <div
        v-if="addTaskListVisible"
        class="add-task-list"
        @click="addTaskListVisible = !addTaskListVisible"
      >
        <div class="add-task-buttons">
          <div class="event-button-text">
            Напоминание
            <el-button
              circle
              plain
              class="remind-button"
              @click="addTask('remind', $event)"
            >
              <el-icon size="24" color="#409EFF">
                <Bell />
              </el-icon>
            </el-button>
          </div>
          <div class="event-button-text">
            Событие
            <el-button
              circle
              plain
              dark
              class="event-button"
              @click="addTask('event', $event)"
            >
              <el-icon size="24" color="black">
                <Calendar />
              </el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import AppHeader from "../src/components/AppHeader.vue";
import { useRouter, useRoute } from "vue-router";
import { Plus, Calendar, Bell } from "@element-plus/icons-vue";
const router = useRouter();
const route = useRoute();

const onHomePage = computed(() => route.name === "home");
const onRemindersPage = computed(() => route.name === "reminders");
const onSettingsPage = computed(() => route.name === "settings");
const onProfilePage = computed(() => route.name === "profile");
const addTaskListVisible = ref(false);
const addTask = (type: string, event: Event) => {
  event.stopPropagation();
  router.push(`/create-task/${type}`);
  addTaskListVisible.value = !addTaskListVisible.value;
};
</script>
<style>
#app {
  font-family: Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

body {
  margin: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.add-task-button {
  position: fixed;
  top: 810px;
  right: 20px;
  padding: 24px !important;
  background-color: #409eff !important;
  border: none !important;
}

.add-task-list {
  width: -webkit-fill-available;
  height: 100vh;
  background: #0000009c;
  display: block;
  position: fixed;
  top: 0;
  z-index: 6;
}

.add-task-buttons {
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  gap: 8px;
  border-radius: 6px;
  position: fixed;
  top: 748px;
  right: -2px;
  text-align: end;
  z-index: 7;
}

.event-button {
  background-color: #409eff !important;
  padding: 24px !important;
  border: none !important;
  margin-left: 8px;
}

.remind-button {
  background-color: #484848 !important;
  padding: 22px !important;
  border: none !important;
  margin-left: 8px;
  margin-right: 4px;
}

.event-button-text {
  color: white;
  margin-right: 8px;
  font-size: large;
}

:deep(.el-picker-panel__content, .el-date-picker__header) {
  font-family: Helvetica, sans-serif !important;
}
</style>
