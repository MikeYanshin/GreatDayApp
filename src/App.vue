<template>
  <transition name="noti-anim">
    <g-d-notify v-if="shown" />
  </transition>
  <app-header v-if="!isAuthPage" />
  <router-view />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import AppHeader from "./views/AppHeader.vue";
import { useNotifyStore } from "@/store";
import GDNotify from "@/components/GDNotify.vue";
import { storeToRefs } from "pinia";
const notiStore = useNotifyStore();
const { shown } = storeToRefs(notiStore);

const isAuthPage = computed(() => location.pathname == "/auth");
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
</style>
