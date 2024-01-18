<template>
  <div class="tags-input">
    <div v-for="(tag, index) in savedTags" :key="index" class="custom-tag">
      <span class="custom-tag-text">
        {{ tag }}
        <button
          type="button"
          class="custom-remove-button"
          @click="removeTag(index)"
        >
          <svg
            class="custom-remove-icon"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              stroke-linecap="round"
              stroke-width="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      </span>
    </div>
    <div class="custom-input-container">
      <input
        id="tags"
        class="custom-input"
        :class="{ 'custom-input-hidden': tagInputDisabled() }"
        :value="currentTag"
        :disabled="tagInputDisabled()"
        @input="processTags($event.target.value)"
        @keydown.tab.prevent="processTagsOnKeyUpEvent($event.target.value)"
        @keydown.space.prevent="processTagsOnKeyUpEvent($event.target.value)"
        @keydown.enter.prevent="processTagsOnKeyUpEvent($event.target.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";

interface Emits {
  (event: "update:modelValue", params: string[]): void;
}
const currentTag = ref("");
const savedTags = ref([]);

const emits = defineEmits<Emits>();

const sanitizeTag = (value) => {
  return value.replace(/<[^>]*>?/gm, "").trim();
};

const parsedTag = (tag) => {
  return tag.replace(",", "").replace(" ", "");
};

const addIfUnique = (array, value) => {
  return [...new Set(array).add(value)];
};

const processTags = (value) => {
  if (savedTags.value.length < 5) {
    currentTag.value = sanitizeTag(value);

    if (value.length > 0 && value.indexOf(",") > -1) {
      revertTag();

      let tags = value.split(",");

      tags.forEach((tag) => {
        if (tag.length > 0) {
          savedTags.value = addIfUnique(savedTags.value, parsedTag(tag));
        }
      });
    }
  } else {
    revertTag();
  }
};

const processTagsOnKeyUpEvent = (value) => {
  if (savedTags.value.length < 5) {
    currentTag.value = sanitizeTag(value);

    if (value.length > 0) {
      if (value.indexOf(",") > -1) {
        revertTag();

        let tags = value.split(",");

        tags.forEach((tag) => {
          if (tag.length > 0) {
            savedTags.value = addIfUnique(savedTags.value, parsedTag(tag));
          }
        });
      } else if (/\s/g.test(value)) {
        revertTag();

        let tags = value.split(" ");

        tags.forEach((tag) => {
          if (tag.length > 0) {
            savedTags.value = addIfUnique(savedTags.value, parsedTag(tag));
          }
        });
      } else {
        revertTag();
        savedTags.value = addIfUnique(savedTags.value, value);
      }
    }
  } else {
    revertTag();
  }
};

const tagInputDisabled = () => {
  return savedTags.value.length >= 5;
};

const removeTag = (index) => {
  savedTags.value.splice(index, 1);
};

const revertTag = () => {
  currentTag.value = "";
};

watch(savedTags, (value) => {
  emits("update:modelValue", savedTags.value);
});
</script>

<style scoped>
.tags-input {
  display: flex;
  align-items: baseline;
  width: -webkit-fill-available;
  overflow: hidden;
  border-radius: 8px;
  padding: 0 4px;
  height: 36px;
  background-color: #5d5c5c2b;
  font-size: 13px;
}

.custom-tag {
  flex-grow: 0;
  text-align: center;
  margin: 4px 4px 0 0;
}

.custom-tag-text {
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 600;
  background-color: aliceblue;
  color: black;
  cursor: pointer;
}

.custom-remove-button {
  flex-shrink: 0;
  margin-left: 8px;
  display: inline-flex;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.custom-remove-icon {
  height: 8px;
  width: 8px;
}

.custom-input-container {
  flex-grow: 1;
  text-align: center;
}

.custom-input {
  width: 100%;
  border-radius: 8px;
  padding: 4px 8px;
  border: 0px;
  outline: none;
  font-size: 13px;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  height: 28px;
  background-color: #5d5c5c00;
  color: black;
  --placeholder-color: black;
}

.custom-input-hidden {
  opacity: 0;
}
</style>
