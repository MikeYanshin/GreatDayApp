<template>
  <div class="add-task-page">
    <!-- Название -->
    <!-- Весь день свитч -->
    <!-- Начало -->
    <!-- Конец -->
    <!-- Описание -->
    <!-- Напоминания -->
    <!-- Тэги -->
    <!-- Цвет -->
    <div>Привет</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

onMounted(() => {
  console.log(route, "route");
  console.log(router, "router");
});
</script>

<style>
.add-task-page {
  display: flex;
  flex-direction: column;
}
</style>
