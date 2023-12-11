<template>
  <div :class="['notify', `type-${type}`]">
    <div class="notify-container">
      <div>
        {{ header }}
      </div>
      <div v-if="description">
        {{ description }}
      </div>
    </div>
    <div @click="notiStore.closeNoti()">
      <img :src="imageSrc" class="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotifyStore } from "@/store";
import { storeToRefs } from "pinia";
const notiStore = useNotifyStore();
const { header, description, type } = storeToRefs(notiStore);
const imageSrc =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/1200px-OOjs_UI_icon_close.svg.png";
</script>

<style scoped>
.notify {
  display: flex;
  align-items: center;
  flex-direction: row;
  position: absolute;
  width: 80vw;
  left: 0;
  right: 0;
  top: 12px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  color: black;
  padding: 12px;
  justify-content: space-between;
}

.type-info {
  background: #d1e7f3;
  border: 1px solid #b9c8d2;
}

.type-warning {
  background: #f7f3d9;
  border: 1px solid #ddd8c5;
}

.type-danger {
  background: #ebc8c4;
  border: 1px solid #b6a19d;
}

.type-success {
  background: #e1f2d9;
  border: 1px solid #cad5c6;
}

.close {
  height: 30px;
  opacity: 0.5;
}
</style>
