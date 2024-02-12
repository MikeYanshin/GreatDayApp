<template>
  <div class="remind">
    <button
      class="check-remind"
      :class="{ selected: isSelected }"
      @click="toggleSelection"
    ></button>
    <div class="remind-container">
      <div class="remind-container-title">{{ remind.name }}</div>
      <div v-if="remind.description" class="remind-container-description">
        {{ remind }}
      </div>
      <div
        v-if="remind.date"
        class="remind-container-info"
        :style="{ color: isPastTime ? 'red' : 'black' }"
      >
        {{ formattedDate }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, defineEmits } from "vue";

const props = defineProps(["remind"]);
const emits = defineEmits(["select"]);

const isSelected = ref(false);
const date = new Date(props.remind.date);

const toggleSelection = () => {
  isSelected.value = !isSelected.value;
  emits("select", isSelected.value);
};

const formattedDate = computed(() => {
  if (!props.remind.date) return "";
  return `${date.toLocaleDateString("ru-RU")}
   ${date.toLocaleTimeString("ru-RU", {
     hour: "2-digit",
     minute: "2-digit",
   })}`;
});

const isPastTime = computed(() => date < new Date());
</script>

<style scoped>
.remind {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0;
  user-select: none;
}

.check-remind {
  cursor: pointer;
  outline: none;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: white;
}

.remind-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.remind-container-title {
  color: black;
  font-size: 14px;
}

.remind-container-description {
  color: #cccccc;
  font-size: 12px;
}

.remind-container-info {
  color: #cccccc;
  font-size: 12px;
  text-align: left;
}

.selected {
  background-color: #409eff !important;
  padding: 2px;
  border: 2px solid white;
  outline: 1px solid #ccc;
}
</style>
