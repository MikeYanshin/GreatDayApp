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
    <label>
      <span class="label-title">Весь день</span>
      <el-switch
        class="add-task-item"
        v-model="allDayLong"
        size="large"
        style="--el-switch-on-color: #c7c7c7; --el-switch-off-color: #c7c7c7"
        active-text="Нет"
        inactive-text="Да"
      />
    </label>
    <label>
      <span class="label-title">Дата начала</span>
      <el-config-provider :locale="ru">
        <el-date-picker
          class="add-task-item"
          v-model="taskData.startTime"
          type="datetime"
          placeholder="Дата начала"
        />
      </el-config-provider>
    </label>
    <label v-if="taskTypeEvent">
      <span class="label-title">Дата конец</span>
      <el-config-provider :locale="ru">
        <el-date-picker
          class="add-task-item"
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
    <label class="inline">
      <span class="label-title">Выбрать цвет</span>
      <el-config-provider :locale="ru">
        <el-color-picker size="small" v-model="taskData.color" />
      </el-config-provider>
    </label>
    <label>
      <span class="label-title">Добавить тэги</span>
      <GDTags v-model="taskData.tags" />
    </label>

    <el-rate
      v-if="taskTypeRemind"
      v-model="remindDifficult"
      clearable
      :colors="['#67C23A', '#E6A23C', '#F56C6C']"
    />
  </div>
</template>

<script lang="ts" setup>
import ru from "element-plus/dist/locale/ru.min";
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import GDTags from "@/components/GDTags.vue";
const router = useRouter();
const route = useRoute();

const taskData = ref({
  title: "",
  startTime: "",
  endTime: "",
  description: "",
  color: "#ccc",
  tags: [],
});
const remindDifficult = ref(0);
const allDayLong = ref(false);

// onMounted(() => {});

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
  /* color: white; */
  /* --placeholder-color: white; */
  width: -webkit-fill-available;
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
}
</style>
