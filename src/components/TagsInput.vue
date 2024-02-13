<template>
  <div class="gd-tags">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag.id"
      class="mx-1"
      closable
      size="large"
      :disable-transitions="false"
      @close="handleClose(tag)"
      effect="plain"
    >
      {{ tag.name }}
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
import { showNotify } from "@/js/helpers/useNotify";
import { api } from "@/js/api/api";

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

const handleInputConfirm = async () => {
  if (inputValue.value) {
    // Проверяем, нет ли уже такого элемента в массиве
    if (!dynamicTags.value.includes(inputValue.value)) {
      const newTag = await tryCreateTag(inputValue.value);
      dynamicTags.value.push(newTag);
      emits("update:modelValue", dynamicTags.value);
    }
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const tryCreateTag = async (tagName: string) => {
  try {
    const data = {
      data: {
        name: tagName,
      },
    };
    return await api.createTag(data);
  } catch (e) {
    showNotify({
      type: "error",
      duration: 5500,
      message: `${e}`,
    });
  }
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
