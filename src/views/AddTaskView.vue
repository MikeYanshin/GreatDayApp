<template>
  <div class="add-task-page">
    <div class="task-actions">
      <el-button text bg @click="router.back()">Отменить</el-button>
      <div>Добавить {{ pageHeader }}</div>
      <el-button
        text
        bg
        type="primary"
        @click="
          () => {
            console.log(taskData);
          }
        "
      >
        Сохранить
      </el-button>
    </div>
    <label>
      <span class="label-title">Название</span>
      <el-input
        v-model="taskData.title"
        placeholder="Введите название"
      ></el-input>
    </label>
    <label class="">
      <span class="label-title">Начало</span>
      <el-config-provider :locale="ru">
        <el-date-picker
          style="width: -webkit-fill-available !important"
          class="date-picker"
          v-model="taskData.startTime"
          type="datetime"
          placeholder="Дата начала"
        />
      </el-config-provider>
    </label>
    <label v-if="taskTypeEvent" class="">
      <span class="label-title">Конец</span>
      <el-config-provider :locale="ru">
        <el-date-picker
          style="width: -webkit-fill-available !important"
          class="date-picker"
          v-model="taskData.endTime"
          type="datetime"
          placeholder="Дата конец"
        />
      </el-config-provider>
    </label>
    <label>
      <span class="label-title">Описание</span>
      <el-input
        v-model="taskData.description"
        :rows="2"
        type="textarea"
        placeholder="Добавить описание"
      />
    </label>
    <label class="inline" v-if="taskTypeEvent">
      <span class="label-title">Выбрать цвет</span>
      <el-config-provider :locale="ru">
        <el-color-picker size="small" v-model="taskData.color" />
      </el-config-provider>
    </label>
    <label>
      <span class="label-title">Связанные напоминания</span>
      <el-select
        multiple
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        placeholder="Выбрать напоминания"
        v-model="taskData.eventReminds"
      >
        <el-option
          v-for="remind in reminders"
          :key="remind.id"
          :label="remind.title"
          :value="remind.id"
        />
      </el-select>
    </label>
    <label>
      <span v-if="taskData.tags.length" class="label-title">Тэги</span>
      <TagsInput v-model="taskData.tags" />
    </label>
  </div>
</template>

<script lang="ts" setup>
import ru from "element-plus/dist/locale/ru.min";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import TagsInput from "@/components/TagsInput.vue";
const router = useRouter();
const route = useRoute();

const taskData = ref({
  title: "",
  startTime: "",
  endTime: "",
  description: "",
  color: "#ccc",
  tags: [],
  remindDifficult: null,
  allDayLong: false,
  eventReminds: [],
});

const reminders = ref([
  {
    id: "1",
    title: "Доделать диаграмму",
  },
  {
    id: "2",
    title: "Вставить картинки",
    description: "Диаграммы",
    time: new Date("2024-01-22T10:00:00"),
  },
  {
    id: "3",
    title: "Дополнить источники",
  },
  {
    id: "4",
    title: "Поправить описание разделов",
    description: "4 раздел",
    time: new Date("2024-01-22T09:00:00"),
  },
  {
    id: "5",
    title: "Отправить правки",
    description: "на почту руководителю",
    time: new Date("2024-01-18T18:00:00"),
  },
]);

const taskType = computed(() => route.params.type);
const taskTypeEvent = computed(() => taskType.value === "event");
const taskTypeRemind = computed(() => taskType.value === "remind");
const submitChange = (type, event) => {
  taskData.value[type] = new Date(event.target.value);
};
const pageHeader = computed(() =>
  taskTypeEvent.value ? "событие" : "напоминание"
);
</script>

<style scoped>
.add-task-page {
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

.date-picker {
  margin-bottom: 24px;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  padding: 4px 8px;
  border: none;
  outline: none;
  background-color: #5d5c5c2b;
  height: 28px;
  border-radius: 8px;
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
</style>
