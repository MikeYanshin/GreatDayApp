<template>
  <div class="reminders-list-view">
    <div class="reminders-list-header">
      <el-button :icon="ArrowLeft" plain text @click="router.back()"
        >Назад</el-button
      >
    </div>
    <div class="reminders-list-title">{{ listTitle }}</div>
    <div class="reminders-list">
      <RemindItem
        v-for="item in reminders"
        :remind="item"
        v-bind:key="item.id"
        @select="handleSelection(item)"
      />
      <!--      <el-radio-->
      <!--        class="remind"-->
      <!--        v-for="rem in reminders"-->
      <!--        :label="rem.label"-->
      <!--        v-bind:key="rem.id"-->
      <!--        v-model="radio"-->
      <!--        @change="changeRadio(rem)"-->
      <!--      ></el-radio>-->
    </div>
  </div>
</template>
<script setup lang="ts">
type IRemind = {
  id: string;
  title: string;
  description?: string;
  time?: Date;
};

import { ArrowLeft } from "@element-plus/icons-vue";
const router = useRouter();
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import RemindItem from "@/components/RemindItem.vue";

const route = useRoute();
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

const listTitle = computed(() => route.params.type);
const handleSelection = (e: IRemind) => {
  setTimeout(() => {
    reminders.value = reminders.value.filter((task) => task !== e);
  }, 750);
};
</script>
<style scoped>
.reminders-list-view {
  //padding: 0 16px;
}

.reminders-list-title {
  font-size: 24px;
  color: black;
  font-weight: bold;
  text-align: left;
  margin-bottom: 24px;
  padding-left: 16px;
}

.reminders-list-header {
  display: flex;
  margin-bottom: 8px;
}

.reminders-list {
  display: flex;
  flex-direction: column;
  padding-left: 16px;
}

.remind {
  font-size: large;
}
</style>
