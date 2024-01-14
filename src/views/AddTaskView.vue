<template>
  <div class="add-task-page">
    <div class="task-actions">
      <button @click="router.back()">Отменить</button>
      <div>Добавить {{ pageHeader }}</div>
      <button
        @click="
          () => {
            console.log(taskData);
          }
        "
      >
        Сохранить
      </button>
    </div>
    <GDInput
      v-model="taskData.title"
      placeholder="Введите название"
      accentColor="black"
    />
    <!-- <div class="all-day" v-if="taskTypeEvent">
      <input type="checkbox" id="allDay" name="allDay" />
      <label for="allDay">Весь день</label>
    </div> -->
    <input
      class="date-picker"
      type="datetime-local"
      id="startTime"
      name="startTime"
      @change="submitChange('startTime', $event)"
    />
    <input
      class="date-picker"
      v-if="taskTypeEvent"
      type="datetime-local"
      id="endTime"
      name="endTime"
      @change="submitChange('endTime', $event)"
    />
    <GDInput
      v-model="taskData.description"
      placeholder="Добавить описание"
      accentColor="black"
    />
    <GDInput
      v-if="taskTypeEvent"
      v-model="taskData.color"
      placeholder="Изменить цвет"
      accentColor="black"
    />
    <!-- Тэги -->
    <GDTagsInput v-model="taskData.tags" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import GDInput from "@/components/GDInput.vue";
import GDButton from "@/components/GDButton.vue";
import GDTagsInput from "@/components/GDTagsInput.vue";
const router = useRouter();
const route = useRoute();

const taskData = ref({
  title: "",
  startTime: "",
  endTime: "",
  description: "",
  color: "",
  tags: [],
});

// onMounted(() => {});

const taskType = computed(() => route.params.type);
const taskTypeEvent = computed(() => taskType.value === "event");
const taskTypeRemind = computed(() => taskType.value === "remind");
const submitChange = (type, event) => {
  taskData.value[type] = new Date(event.target.value);
  console.log(taskData.value);
};
const pageHeader = computed(() =>
  taskTypeEvent.value ? "событие" : "напоминание"
);
</script>

<style>
.add-task-page {
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.task-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.date-picker {
  margin-bottom: 24px;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  padding: 4px 8px;
  border: none;
  outline: none;
  background-color: #5d5c5c2b;
  height: 28px;
  /* color: white; */
  /* --placeholder-color: white; */
  width: -webkit-fill-available;
  border-radius: 8px;
}
</style>
