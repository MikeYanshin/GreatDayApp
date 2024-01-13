<template>
  <div class="event" :style="{ height: eventHeight(data.dur) + 'px' }">
    <!-- <div
      v-if="hasPin"
      class="event_pin"
      :style="{ 'background-color': color }"
    ></div> -->
    <div class="event_time">{{ time }}</div>
    <div class="event_name">{{ data.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const time = computed(() => {
  // Получаем часы и минуты из времени события
  const hours = props.data.startTime.getHours();
  const minutes = props.data.startTime.getMinutes();

  // Добавляем ведущий ноль, если часы или минуты меньше 10
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Возвращаем строку в формате "hh:mm"
  return `${formattedHours}:${formattedMinutes}`;
});

const eventHeight = (dur: number) => {
  return dur - 1;
};
</script>

<style scoped>
.event {
  display: flex;
  gap: 6px;
  padding-left: 8px;
  min-height: 20px;
}
</style>
