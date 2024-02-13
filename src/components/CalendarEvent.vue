<template>
  <div
    class="event"
    :style="{
      height: eventHeight(dur) + 'px',
      backgroundColor: data.color || '#cccccc',
    }"
  >
    <div style="display: flex; flex-direction: column">
      <div class="event_name">{{ data.name }}</div>
      <div class="event_time">{{ time }}</div>
    </div>
    <!--    <div class="duration">{{ formattedDuration }}</div>-->
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const time = computed(() => {
  const startDate = new Date(props.data.startDate);
  const endDate = new Date(props.data.endDate);

  return `${startDate.toTimeString().slice(0, 5)} – ${endDate
    .toTimeString()
    .slice(0, 5)}`;
});

const dur = computed(() => {
  const start = new Date(props.data.startDate);
  const end = new Date(props.data.endDate);

  // Разница в миллисекундах
  const difference = end.getTime() - start.getTime();

  // Преобразуем разницу в минуты и округляем до целого числа
  return Math.round(difference / (1000 * 60));
});

const formattedDuration = computed(() => {
  const hours = Math.floor(dur.value / 60);
  const minutes = dur.value % 60;

  if (hours === 0) {
    return `${minutes}мин`;
  } else if (minutes === 0) {
    return `${hours}ч`;
  } else {
    return `${hours}ч ${minutes}мин`;
  }
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
  border: 1px solid rgba(173, 153, 139, 0.5);
}

.duration {
  position: absolute;
  right: 5px;
  color: white;
  font-size: 14px;
}

.event_name,
.event_time {
  color: white;
  text-align: left;
  padding-top: 4px;
}

.event_name {
  font-weight: bold;
}

.event_time {
  font-size: 14px;
}
</style>
