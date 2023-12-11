<template>
  <button
    :class="[
      'custom-button',
      `size-${size}`,
      type === 'primary' ? 'primary' : 'secondary',
    ]"
    :style="{ padding: `${padding}px`, color: textColor }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";

const props = defineProps({
  size: {
    type: Number as PropType<32 | 38 | 42>,
    default: 38,
  },
  type: {
    type: String as PropType<"primary" | "secondary">,
    default: "primary",
  },
  textColor: {
    type: String,
  },
});

const padding = computed(() => {
  switch (props.size) {
    case 32:
      return 8;
    case 38:
      return 10;
    case 42:
      return 12;
    default:
      return 8;
  }
});
</script>

<style scoped>
.custom-button {
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  outline: none;
  width: 100%;
}

.size-24 {
  height: 24px;
}

.size-28 {
  height: 28px;
}

.size-32 {
  height: 32px;
}

.primary {
  border-radius: 30px;
  background-color: aliceblue;
  border-radius: 8px;
}

.secondary {
  background-color: #2ecc71;
  color: #ffffff;
}
</style>
