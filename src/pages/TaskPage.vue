<template>
  <div class="task-page">
    <div class="task-actions">
      <el-button text bg @click="router.back()">Назад</el-button>
      <div>{{ pageHeader }}</div>
      <el-button text type="danger" @click="deleteTask">Удалить</el-button>
    </div>
    <div class="task-data-block">
      <div class="task-data-block-icon">
        <div
          class="task-data-block-color"
          :style="{ backgroundColor: taskData.color || '#CCC' }"
        ></div>
      </div>
      <div class="task-data-block-content">
        <div class="task-name">{{ taskData.name }}</div>
        <div>{{ date.capitalizeFullDate }}</div>
        <div>{{ date.eventDuration }}</div>
      </div>
    </div>
    <div class="task-data-block" v-if="taskData.description">
      <div class="task-data-block-icon">
        <el-icon><Tickets /></el-icon>
      </div>
      <div class="task-data-block-content">{{ taskData.description }}</div>
    </div>
    <div class="task-data-block">
      <div class="task-data-block-icon">
        <el-icon><Bell /></el-icon>
      </div>
      <div class="task-data-block-content">Без напоминаний</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Tickets, Bell } from "@element-plus/icons-vue";

import { api } from "@/js/api/api";
import { showNotify } from "@/js/helpers/useNotify";

const router = useRouter();
const route = useRoute();

const taskType = computed(() => route.params.type);
const taskTypeEvent = computed(() => taskType.value === "event");
const taskTypeRemind = computed(() => taskType.value === "remind");
const pageHeader = computed(() =>
  taskTypeEvent.value ? "Событие" : "Напоминание"
);
const taskData = ref({});

const getTask = () => {
  taskTypeEvent.value ? getEvent() : getRemind();
};

const getEvent = async () => {
  taskData.value = await api.getEventById(route.params.id as string);
};

const getRemind = async () => {
  taskData.value = await api.getRemindById(route.params.id as string);
};

onBeforeMount(() => {
  getTask();
});

const date = computed(() => {
  let capitalizeFullDate = "";
  let eventDuration = "";
  let remindDate = "";
  const startDate = new Date(taskData.value.startDate);
  const endDate = new Date(taskData.value.endDate);

  if (taskData.value.date) {
    remindDate = startDate.toLocaleDateString("ru-RU", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  } else {
    console.log(taskData.value.startDate);

    const fullDate = startDate.toLocaleDateString("ru-RU", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    capitalizeFullDate = fullDate.charAt(0).toUpperCase() + fullDate.slice(1);
    eventDuration = `${startDate.toTimeString().slice(0, 5)} – ${endDate
      .toTimeString()
      .slice(0, 5)}`;
  }

  return {
    capitalizeFullDate,
    eventDuration,
    remindDate,
  };
});

const deleteTask = async () => {
  try {
    taskTypeEvent.value
      ? await api.deleteEventById(route.params.id as string)
      : await api.deleteRemindById(route.params.id as string);

    showNotify({
      type: "success",
      duration: 1500,
      message: `${pageHeader.value} удалено.`,
    });
    router.back();
  } catch {
    showNotify({
      type: "error",
      duration: 1500,
      message: `Произошла ошибка`,
    });
  }
};
</script>

<style scoped>
.task-page {
  display: flex;
  flex-direction: column;
  padding: 8px;
  color: black;
}

.task-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  align-items: baseline;
  padding-bottom: 14px;
  border-bottom: 1px solid #c9c9c9;
}

label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  color: black;
  margin-bottom: 16px;
  font-size: larger;
}

.inline {
  flex-direction: row;
  align-items: baseline;
  gap: 24px;
}

.task-data-block {
  display: flex;
  margin: 12px 0;
}

.task-data-block-icon {
  width: 60px;
  padding: 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-data-block-content {
  width: 100%;
  text-align: left;
  padding: 4px 12px;
}

.task-data-block-color {
  height: 30px;
  width: 30px;
  border-radius: 8px;
}

.task-name {
  font-size: 20px;
}
</style>
