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

import { ArrowLeft } from "@element-plus/icons-vue";
const router = useRouter();
import { useRoute, useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import RemindItem from "@/components/RemindItem.vue";
const activeCollapse = ref(["1"]);

const route = useRoute();

const listTitle = computed(() => route.params.type);
const remindersParams = computed(() => {
  switch (route.params.type) {
    case "Все":
      return "?filters[done][$eq]=false&populate=*";
  }
  return "";
});
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
    const data = await api.getRemindsList(remindersParams.value);
    remindsList.value = data.reminds;
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
