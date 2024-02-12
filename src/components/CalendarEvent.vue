<template>
  <div class="event" :style="{ height: eventHeight(dur) + 'px' }">
    <!-- <div
      v-if="hasPin"
      class="event_pin"
      :style="{ 'background-color': color }"
    ></div> -->
    <div class="event_time">{{ time }}</div>
    <div class="event_name">{{ data.name }}</div>
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
  console.log(props.data, "props.data");
  const start = new Date(props.data.startDate);
  const end = new Date(props.data.startDate);
  // Получаем часы и минуты из времени события
  const hours = start.getHours();
  const minutes = end.getMinutes();

  // // Добавляем ведущий ноль, если часы или минуты меньше 10
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  //
  // // Возвращаем строку в формате "hh:mm"
  return `${formattedHours}:${formattedMinutes}`;
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
}

.duration {
  position: absolute;
  right: 5px;
  color: #fff;
}
</style>
