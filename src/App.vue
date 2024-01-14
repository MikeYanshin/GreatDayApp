<template>
  <div>
    <transition name="noti-anim">
      <g-d-notify v-if="shown" />
    </transition>
    <app-header v-if="onHomePage" />
    <router-view />
    <button
      v-if="onHomePage"
      class="add-task-button"
      @click="addTaskListVisable = !addTaskListVisable"
    >
      Добавить
    </button>
    <div
      v-if="addTaskListVisable"
      class="add-task-list"
      @click="addTaskListVisable = !addTaskListVisable"
    >
      <div class="list">
        <span @click="addTask('event', $event)">Событие</span>
        <span @click="addTask('remind', $event)">Напоминание</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import AppHeader from "../src/components/AppHeader.vue";
import { useNotifyStore } from "@/store";
import GDNotify from "@/components/GDNotify.vue";
import { storeToRefs } from "pinia";
const notiStore = useNotifyStore();
const { shown } = storeToRefs(notiStore);
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const onHomePage = computed(() => route.name === "home");
const addTaskListVisable = ref(false);
const addTask = (type: string, event: Event) => {
  event.stopPropagation();
  router.push(`/create-tast/${type}`);
  addTaskListVisable.value = !addTaskListVisable.value;
};
</script>
<style>
#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
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

.noti-anim-enter-active,
.noti-anim-leave-active {
  transition: transform 0.5s;
}
.noti-anim-enter,
.noti-anim-leave-to {
  transform: translateY(-100%);
}

.add-task-button {
  position: fixed;
  top: 850px;
  right: 16px;
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

.list {
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  gap: 4px;
  border-radius: 6px;
  background-color: antiquewhite;
  width: fit-content;
  position: fixed;
  top: 810px;
  right: 16px;
  text-align: end;
  z-index: 7;
}
</style>
