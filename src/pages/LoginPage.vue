<template>
  <form class="login-form">
    <div class="side-menu-header">Great Day</div>
    <div class="header">Есть аккаунт?</div>
    <br />
    <el-input
      class="input"
      v-model="email"
      placeholder="Email"
      size="large"
      clearable
      :error="emailError"
      :prefix-icon="Avatar"
      accentColor="white"
      inputType="email"
    />
    <el-input
      class="input"
      v-model="password"
      placeholder="Пароль"
      accentColor="white"
      :prefix-icon="Key"
      show-password
      clearable
      size="large"
      :inputType="passwordInputType"
    >
    </el-input>

    <el-button
      textColor="#3e3e3e"
      class="button"
      type="primary"
      @click="submitForm"
    >
      {{ isLogined ? "Войти" : "Зарегистрироваться" }}
    </el-button>
    <div class="remember">
      <input type="checkbox" id="remember" name="remember" />
      <label for="remember">Запомнить меня</label>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { isLogined } from "@/js/helpers/isLogined";
import { useNotifyStore } from "@/store";
import { ElMessage } from "element-plus";

import { Avatar, Key } from "@element-plus/icons-vue";

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordInputType = ref("password");
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const { showNotify } = useNotifyStore();
const router = useRouter();

const submitForm = () => {
  if (!emailRegex.test(email.value)) {
    emailError.value = "Введите верный email";
  }

  if (!email.value || !password.value) {
    ElMessage({
      message: "Неправильный адрес электронной почты или пароль.",
      type: "error",
    });

    return;
  }

  const user = {
    email: email.value,
    password: password.value,
  };

  if (!isLogined) {
    // Perform registration logic here
    // Save user data to local storage or backend
    localStorage.setItem("user", JSON.stringify(user));
    ElMessage({
      message: "Вы зарегистрированы!",
      type: "success",
    });
    router.push("/");

    return;
  } else {
    // Perform login logic here
    // Validate user data from local storage or backend
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (
      savedUser &&
      savedUser.email === user.email &&
      savedUser.password === user.password
    ) {
      return router.push("/");
    }
  }

  showNotify({
    header: "Неправильный адрес электронной почты или пароль",
    type: "danger",
  });
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 24px;
  background: #efefef;
}

.input {
  margin-bottom: 10px;
}

.error-message {
  color: red;
  opacity: 0;
  transition: opacity 0.5s;
}

.fade-in {
  opacity: 1;
}

.button {
  width: 100%;
}

.header {
  color: black;
  font-weight: bold;
  margin-bottom: 24px;
  font-size: 20px;
}

.remember {
  margin-top: 24px;
  width: 100%;
  display: flex;
  color: black;
  font-size: 16px;
  gap: 4px;
}

.password-icon {
  height: 24px;
}

.side-menu-header {
  font-family: Helvetica, sans-serif;
  font-weight: 100;
  font-size: 50px;
  background: linear-gradient(
    0deg,
    rgba(51, 126, 204, 1) 0%,
    rgba(64, 158, 255, 1) 55%,
    rgba(198, 226, 255, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  position: fixed;
  top: 50px;
}
</style>
