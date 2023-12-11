<template>
  <div class="custom-input-wrapper">
    <label class="label" :style="{ color: accentColor }">{{ label }}</label>
    <div :class="[inputClass]">
      <input
        v-if="type === 'primary'"
        :value="modelValue"
        @input="updateModelValue"
        :placeholder="placeholder"
        :style="{
          height: inputHeight + 'px',
          color: accentColor,
          '--placeholder-color': accentColor,
        }"
        :type="inputType"
      />
      <div
        v-if="type === 'secondary'"
        class="secondary-input"
        :style="{ height: inputHeight + 'px' }"
      >
        <input
          :value="modelValue"
          @input="updateModelValue"
          :placeholder="placeholder"
          :style="{ color: accentColor, '--placeholder-color': accentColor }"
          :type="inputType"
        />
        <div class="underline"></div>
      </div>

      <div class="input-icon" @click="$emit('icon-click')">
        <slot name="icon"></slot>
      </div>
    </div>
    <transition name="fade">
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </transition>
    <slot name="actions" v-if="$slots.actions"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from "vue";

const props = defineProps({
  label: {
    type: String,
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<"primary" | "secondary">,
    default: "primary",
  },
  inputHeight: {
    type: [Number, String],
    default: 28,
  },
  textColor: String,
  error: String,
  accentColor: String,
  inputType: {
    type: String,
    default: "text",
  },
});

interface Emits {
  (event: "update:modelValue", params: any): void;
  (event: "icon-click"): void;
}

const emits = defineEmits<Emits>();

const inputClass = `custom-input-${props.type}`;

const updateModelValue = (event: any) => {
  emits("update:modelValue", event.target.value);
};
</script>

<style scoped>
.label {
  text-align: left;
  font-size: small;
}
.custom-input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 24px;
}

.custom-input-primary,
.custom-input-secondary {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.custom-input-primary {
  border-radius: 8px;
}

.custom-input-primary input {
  width: 100%;
  padding: 4px 8px;
  border: none;
  outline: none;
  background-color: #5d5c5c2b;
}

.custom-input-secondary {
  width: 100%;
  position: relative;
}

.custom-input-secondary input {
  width: 100%;
  padding: 4px 8px;
  border: none;
  outline: none;
  background: transparent;
}

.custom-input-secondary .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #333;
}

.error-message {
  font-size: 12px;
  color: #ff2525;
  margin-top: 4px;
  position: absolute;
  bottom: -16px;
  left: 8px;
}

.input-icon {
  position: absolute;
  right: 8px;
  top: 7px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

input::placeholder {
  color: var(--placeholder-color);
}
</style>
