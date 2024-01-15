<template>
  <div>
    <label v-for="(task, index) in tasks" :key="index">
      <input type="radio" v-model="selectedTask" :value="task" />{{ task }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps(["tasks"]);
const emits = defineEmits(["taskSelected"]);

const selectedTask = ref<string | null>(null);

watch(selectedTask, () => {
  if (selectedTask.value !== null) {
    setTimeout(() => {
      emits("taskSelected", selectedTask.value);
      selectedTask.value = null;
    }, 500);
  }
});
</script>
