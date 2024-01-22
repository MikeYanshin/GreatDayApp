<template>
  <div class="remind">
    <button
      class="check-remind"
      :class="{ selected: isSelected }"
      @click="toggleSelection"
    ></button>
    <div class="remind-container">
      <div class="remind-container-title">{{ remind.title }}</div>
      <div v-if="remind.description" class="remind-container-description">
        {{ remind.description }}
      </div>
      <div
        v-if="remind.time"
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

const toggleSelection = () => {
  isSelected.value = !isSelected.value;
  emits("select", isSelected.value);
};

const formattedDate = computed(() => {
  if (!props.remind.time) return "";

  return `${props.remind.time.toLocaleDateString("ru-RU")}
   ${props.remind.time.toLocaleTimeString("ru-RU", {
     hour: "2-digit",
     minute: "2-digit",
   })}`;
});

const isPastTime = computed(() => props.remind.time < new Date());
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
