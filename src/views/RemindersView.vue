<template>
  <div class="reminders-page">
    <GDInput
      v-model="search"
      placeholder="Поиск"
      accentColor="black"
      class="reminders-search"
    />
    <div class="reminders-cards">
      <div class="card all">Все</div>
      <div class="card today">Сегодня</div>
      <div class="card done">Завершено</div>
      <div class="card plans">В планах</div>
    </div>
    <div class="tags-title">Тэги</div>
    <div class="reminders-tags">
      <div class="tag" v-for="tag in tags" :key="tag">
        {{ tag }}
      </div>
    </div>
    <br />

    <GDRadioButton :tasks="tasks" @taskSelected="handleTaskSelected" />
  </div>
</template>
<script setup lang="ts">
import GDInput from "@/components/GDInput.vue";
import { ref } from "vue";
import GDRadioButton from "@/components/GDRadioButton.vue";

const search = ref("");
const tags = ["Все тэги", "#Диплом", "#Работа", "#Отпуск"];
const tasks = ref(["Задача 1", "Задача 2", "Задача 3"]);

const handleTaskSelected = (selectedTask: "string") => {
  setTimeout(() => {
    tasks.value = tasks.value.filter((task) => task !== selectedTask);
  }, 500);
};
</script>
<style>
.reminders-page {
  position: relative;
  top: 53px;
  padding: 16px 8px;
}

.card {
  width: 100%;
  height: 70px;
  background-color: #d9c8c8;
  border-radius: 8px;
}

.reminders-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
}

.reminders-tags {
  background-color: gray;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  gap: 8px;
}

.tag {
  border-radius: 8px;
  padding: 8px;
  background-color: antiquewhite;
}

.tags-title {
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  margin: 14px 0;
}
</style>
