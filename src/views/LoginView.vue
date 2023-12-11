<template>
  <form @submit.prevent="submitForm" class="login-form">
    <div class="header">Есть аккаунт?</div>
    <br />
    <GDInput
      v-model="email"
      placeholder="Email"
      :error="emailError"
      accentColor="white"
      inputType="email"
    />
    <GDInput
      v-model="password"
      placeholder="Пароль"
      accentColor="white"
      @icon-click="showPassword"
      :inputType="passwordInputType"
    >
      <template #icon>
        <img class="password-icon" :src="passwordIcon" />
      </template>
    </GDInput>

    <GDButton textColor="#3e3e3e">
      {{ isLogined ? "Войти" : "Зарегистрироваться" }}
    </GDButton>
    <div class="remember">
      <input type="checkbox" id="remember" name="remember" />
      <label for="remember">Запомнить меня</label>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import GDInput from "@/components/GDInput.vue";
import GDButton from "@/components/GDButton.vue";
import { isLogined } from "@/js/helpers/isLogined";
import { useNotifyStore } from "@/store";

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
    showNotify({
      header: "Неправильный адрес электронной почты или пароль",
      type: "danger",
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
    showNotify({
      header: "Вы зарегистрированы!",
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

const showPassword = () => {
  if (passwordInputType.value == "text") {
    passwordInputType.value = "password";
  } else {
    passwordInputType.value = "text";
  }
};

const passwordIcon = computed(() => {
  const hidePasswordImgUrl =
    "https://icons.veryicon.com/png/o/miscellaneous/hekr/action-hide-password.png";
  const showPasswordImgUrl =
    "https://cdn-icons-png.flaticon.com/512/6803/6803345.png";
  return passwordInputType.value == "text"
    ? hidePasswordImgUrl
    : showPasswordImgUrl;
});
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 24px;
  background-image: linear-gradient(
    to bottom,
    rgba(46, 142, 232, 0.5),
    rgba(106, 106, 140, 0.5)
  );
  /* url("catfront.png"); */
}

input {
  margin-bottom: 10px;
  padding: 5px;
}

.error-message {
  color: red;
  opacity: 0;
  transition: opacity 0.5s;
}

.fade-in {
  opacity: 1;
}

.header {
  color: aliceblue;
  font-weight: bold;
  margin-bottom: 24px;
  font-size: 20px;
}

.remember {
  margin-top: 24px;
  width: 100%;
  display: flex;
  color: aliceblue;
  font-size: 16px;
  gap: 4px;
}

.password-icon {
  height: 24px;
}
</style>
