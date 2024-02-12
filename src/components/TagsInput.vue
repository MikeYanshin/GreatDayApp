<template>
  <div class="gd-tags">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      class="mx-1"
      closable
      size="large"
      :disable-transitions="false"
      @close="handleClose(tag)"
      effect="plain"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag ml-1" @click="showInput">
      + Добавить тэг
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, defineEmits } from "vue";
import { ElInput } from "element-plus";

const inputValue = ref("");
const dynamicTags = ref([]);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
interface Emits {
  (event: "update:modelValue", params: string[]): void;
}
const emits = defineEmits<Emits>();
const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    // Проверяем, нет ли уже такого элемента в массиве
    if (!dynamicTags.value.includes(inputValue.value)) {
      dynamicTags.value.push(inputValue.value);
    }
  }
  emits("update:modelValue", dynamicTags.value);
  inputVisible.value = false;
  inputValue.value = "";
};
</script>

<style scoped>
.gd-tags {
  display: flex;
  width: 100%;
  flex-flow: wrap;
  gap: 8px;
}
</style>
