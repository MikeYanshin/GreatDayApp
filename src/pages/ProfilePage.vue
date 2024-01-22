<template>
  <div>
    <header>
      <el-icon size="small" class="icon" color="white" @click="router.back()">
        <ArrowLeftBold />
      </el-icon>
      <div class="edit" @click="isEdit = !isEdit">
        {{ isEdit ? "Сохранить" : "Редактировать" }}
      </div>
    </header>
    <div class="profile">
      <div class="avatar">
        <el-avatar :size="250" :src="avatarUrl" />
      </div>
      <div v-if="!isEdit">
        <h2>{{ profileData.firstName }} {{ profileData.lastName }}</h2>
        <h3>{{ profileData.email }}</h3>
        <div class="actions">
          <el-button class="action-logout" type="danger">Выйти</el-button>
        </div>
      </div>
      <div v-else>
        <label>
          Имя
          <el-input
            v-model="profileData.firstName"
            placeholder="Имя"
          ></el-input>
        </label>
        <label>
          Фамилия
          <el-input
            v-model="profileData.lastName"
            placeholder="Фамилия"
          ></el-input>
        </label>
        <label>
          E-mail
          <el-input v-model="profileData.email" placeholder="E-mail"></el-input>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
const isEdit = ref(false);
const profileData = ref({
  firstName: "Михаил",
  lastName: "Яньшин",
  email: "lvolo1999@gmail.com",
});
const avatarUrl =
  "https://sun9-78.userapi.com/impg/MDj4mLTin9zgOfzcJh9LONR4_p9ccMXLxRQYDg/JOr_8iVovCs.jpg?size=2000x1333&quality=95&sign=912fbf32e2f1b30d5972d9129dde4cba&type=album";

const router = useRouter();
</script>
<style scoped>
.profile {
  position: relative;
  top: 53px;
  padding: 16px 8px;
  background: #efefef;
  height: calc(100vh - 87px);
  display: flex;
  flex-direction: column;
}

.edit {
  cursor: pointer;
}

.avatar {
  width: 100%;
}

.actions {
  flex-grow: 1;
}

.action-logout {
  width: 100%;
}

.icon {
  height: 24px;
  width: 24px;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #409eff;
  color: white;
  position: fixed;
  top: 0;
  width: -webkit-fill-available;
  z-index: 3;
  align-items: center;
  height: 53px;
}

label {
  display: flex;
  gap: 8px;
  margin: 10px 0;
  justify-content: space-between;
  align-items: center;

  .el-input {
    width: 300px;
  }
}
</style>
