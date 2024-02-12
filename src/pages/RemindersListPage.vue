<template>
  <div class="reminders-list-view">
    <div class="reminders-list-header">
      <el-button :icon="ArrowLeft" plain text @click="router.back()"
        >Назад</el-button
      >
    </div>
    <div class="reminders-list-title">{{ listTitle }}</div>

    <!--    <el-collapse class="collapse padding" v-model="activeCollapse">-->
    <!--      <el-collapse-item title="Работа" name="1">-->
    <!--        <div class="reminders-list padding">-->
    <!--          <RemindItem-->
    <!--            v-for="item in reminders"-->
    <!--            :remind="item"-->
    <!--            v-bind:key="item.id"-->
    <!--            @select="handleSelection(item)"-->
    <!--          />-->
    <!--        </div>-->
    <!--      </el-collapse-item>-->
    <!--    </el-collapse>-->
    <div class="reminders-list padding">
      <RemindItem
        v-for="item in remindsList"
        :remind="item"
        v-bind:key="item.id"
        @select="handleSelection(item)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { api } from "@/js/api/api";

type IRemind = {
  id: string;
  title: string;
  description?: string;
  time?: Date;
};

import { ArrowLeft } from "@element-plus/icons-vue";
const router = useRouter();
import { useRoute, useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import RemindItem from "@/components/RemindItem.vue";
const activeCollapse = ref(["1"]);

const route = useRoute();
const reminders = ref([
  // {
  //   id: "1",
  //   title: "Доделать диаграмму",
  //   event: "Правки диплома",
  // },
  {
    id: "2",
    title: "Отредактировать документ",
    description: "Для Романа",
    // time: new Date("2024-01-22T10:00:00"),
    // event: "Правки диплома",
  },
  // {
  //   id: "3",
  //   title: "Дополнить источники",
  //   event: "Правки диплома",
  // },
  // {
  //   id: "4",
  //   title: "Поправить описание разделов",
  //   description: "4 раздел",
  //   time: new Date("2024-01-22T09:00:00"),
  // },
  // {
  //   id: "5",
  //   title: "Отправить правки",
  //   description: "на почту руководителю",
  //   time: new Date("2024-01-18T18:00:00"),
  // },
]);
const freeReminders = ref([
  // {
  //   id: "6",
  //   title: "Помыть машину",
  // },
  // {
  //   id: "7",
  //   title: "Сходить на почту",
  // },
]);

const listTitle = computed(() => route.params.type);
const handleSelection = (remind: any) => {
  const data = {
    data: {
      done: true,
    },
  };

  setTimeout(async () => {
    await api.updateRemind(remind.id, data);
    await getReminds();
  }, 750);
};

const isLoading = ref(false);
const remindsList = ref<any>(null);
const error = ref<string | null>(null);

const getReminds = async () => {
  isLoading.value = true;
  try {
    const data = await api.getRemindsList("?filters[done][$eq]=false");
    remindsList.value = data.reminds;
    console.log(remindsList.value);
  } catch (err) {
    error.value = "Error fetching data";
  } finally {
    isLoading.value = false;
  }
};

onBeforeMount(() => {
  getReminds();
});
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

  :last-child {
    border: none;
  }
}

.remind {
  font-size: large;
}

.padding {
  padding-left: 16px;
}

.collapse :deep(.el-collapse-item__header) {
  font-weight: bold;
  font-size: 16px;
  color: black;
}
</style>
