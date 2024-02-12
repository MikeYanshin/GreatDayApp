<template>
  <div class="settings-page">
    <div class="settings-page-title">Настройки</div>
    <div class="settings">
      <label for="theme">
        <span class="label-title">Тема</span>
        <el-switch
          class="settings-item"
          v-model="lightTheme"
          id="theme"
          size="large"
          style="--el-switch-on-color: #444444; --el-switch-off-color: #d9d8d8"
          active-text="Тёмная"
          inactive-text="Светлая"
      /></label>
      <label for="">
        <span class="label-title">Стандартный временной промежуток</span>
        <el-input-number
          class="settings-item"
          label="Стандартный временной промежуток"
          v-model="num"
          :min="20"
          :max="720"
          :step="5"
          @change="handleChange"
        />
      </label>
      <label for="">
        <span class="label-title">Главная страница</span>
        <el-switch
          class="settings-item"
          v-model="defaultPage"
          size="large"
          style="--el-switch-on-color: #c7c7c7; --el-switch-off-color: #c7c7c7"
          active-text="Календарь"
          inactive-text="Напоминания"
        />
      </label>
      <label for="">
        <span class="label-title">Таймзона</span>
        <el-select
          class="settings-item"
          v-model="selectedTimezone"
          placeholder="Таймзона"
          size="large"
        >
          <el-option
            v-for="item in timezones"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </label>
      <label for="">
        <span class="label-title">Формат даты</span>
        <el-select
          v-model="selectedDateFormat"
          placeholder="Формат даты"
          size="large"
          class="settings-item"
        >
          <el-option
            v-for="item in dateFormat"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </label>
      <label for="">
        <span class="label-title">Формат времени</span>
        <el-select
          v-model="selectedTimeFormat"
          placeholder="Формат времени"
          size="large"
          class="settings-item"
        >
          <el-option
            v-for="item in timeFormat"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </label>
      <el-button size="large" type="primary">Сохранить</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const lightTheme = ref(false);
const defaultPage = ref(true);
const num = ref(20);
const timezones = ref([
  { label: "Всемирное время (UTC)", value: "UTC" },
  { label: "Всемирное время (GMT)", value: "GMT" },
  { label: "Московское время", value: "Europe/Moscow" },
  { label: "Владивостокское время", value: "Asia/Vladivostok" },
  { label: "Красноярское время", value: "Asia/Krasnoyarsk" },
  { label: "Екатеринбургское время", value: "Asia/Yekaterinburg" },
  { label: "Омское время", value: "Asia/Omsk" },
  { label: "Калининградское время", value: "Europe/Kaliningrad" },
  { label: "Самарское время", value: "Europe/Samara" },
]);
const timeFormat = ref([
  { label: "24-часовой формат", value: "24h" },
  { label: "12-часовой формат", value: "12h" },
]);
const dateFormat = ref([
  { label: "День/Месяц/Год", value: "DMY" },
  { label: "Месяц/День/Год", value: "MDY" },
  { label: "Год/Месяц/День", value: "YMD" },
]);
const selectedTimezone = ref();
const selectedTimeFormat = ref();
const selectedDateFormat = ref();
</script>
<style scoped>
.settings-page {
  position: relative;
  top: 53px;
  padding: 16px 8px;
}

.settings {
  display: flex;
  flex-direction: column;
  align-items: normal;
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

.settings-page-title {
  color: black;
  font-size: 24px;
  font-weight: 600;
}
</style>
