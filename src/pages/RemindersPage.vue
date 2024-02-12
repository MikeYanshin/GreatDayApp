<template>
  <div class="reminders-page">
    <el-input v-model="search" placeholder="Поиск" class="reminders-search" />
    <div class="reminders-cards">
      <div class="card all" @click="selectCard('Все')">
        <div class="card-desc">
          <el-icon><Files /></el-icon>
          <span class="card-desc-text">Все</span>
        </div>
        <div class="card-count">{{ remindsList?.total }}</div>
      </div>
      <div class="card today">
        <div class="card-desc">
          <el-icon><Calendar /></el-icon>
          <span class="card-desc-text">Сегодня</span>
        </div>
        <div class="card-count">{{ remindsList?.todayReminds }}</div>
      </div>
      <div class="card done">
        <div class="card-desc">
          <el-icon><Select /></el-icon>
          <span class="card-desc-text">Выполнено</span>
        </div>
        <div class="card-count">{{ remindsList?.doneReminds }}</div>
      </div>
      <div class="card plans">
        <div class="card-desc">
          <el-icon><Clock /></el-icon>
          <span class="card-desc-text">В планах</span>
        </div>
        <div class="card-count">0</div>
      </div>
    </div>
    <template v-if="tagsList?.length">
      <div class="tags-title">Тэги</div>
      <div class="reminders-tags">
        <div class="tag" v-for="tag in tagsList" :key="tag">
          {{ tag.name }}
        </div>
      </div>
    </template>
    <div class="reminders-actions">
      <el-button
        plain
        text
        type="primary"
        @click="router.push(`/create-task/remind`)"
      >
        + Напоминание
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { Calendar, Clock, Files, Select } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { api } from "@/js/api/api";

const router = useRouter();
const search = ref("");

const selectCard = (type: string) => {
  router.push(`/reminders/${type}`);
};
const isLoading = ref(false);
const remindsList = ref<any>(null);
const tagsList = ref<any>(null);
const error = ref<string | null>(null);

const getReminds = async () => {
  isLoading.value = true;
  try {
    remindsList.value = await api.getRemindsList("");
    console.log(remindsList.value, "remindsList.value");
  } catch (err) {
    error.value = "Error fetching data";
  } finally {
    isLoading.value = false;
  }
};

const getTags = async () => {
  isLoading.value = true;
  try {
    tagsList.value = await api.getTagsList();
    console.log(tagsList.value, "tags");
  } catch (err) {
    error.value = "Error fetching data";
  } finally {
    isLoading.value = false;
  }
};

onBeforeMount(() => {
  getReminds();
  getTags();
});
</script>
<style scoped>
.el-icon {
  font-size: 17px;
  background-color: #c6e2ff;
  border-radius: 50%;
  padding: 10px;
}

.reminders-page {
  position: relative;
  top: 53px;
  padding: 16px 8px;
  background: #efefef;
  height: calc(100vh - 87px);
}

.reminders-search {
  margin-bottom: 24px;
}

.card {
  //width: 100%;
  height: 70px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.card-desc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-desc-text {
  font-size: 16px;
  font-weight: bold;
  color: #767676;
}

.card-count {
  color: black;
  font-size: 24px;
  font-weight: bold;
}

.reminders-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
}

.reminders-tags {
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  gap: 8px;
}

.tag {
  border-radius: 8px;
  padding: 8px;
  background-color: #f0f0f0;
  font-weight: bold;
  color: #767676;
}

.tags-title {
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  margin: 14px 0;
  color: black;
}

.reminders-actions {
  position: fixed;
  bottom: 18px;
}
</style>
