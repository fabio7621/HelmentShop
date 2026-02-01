<template>
  <section class="login-wrap">
    <form @submit.prevent="handleLogin" class="login-box">
      <div class="login-pic">
        <img
          class="w-100"
          src="../assets/image/loginpic001.jpg"
          alt="fabio20HelmentLogo"
        />
      </div>
      <div class="d-flex flex-column">
        <label for="myemail"> Email </label>
        <input
          v-model="user.username"
          placeholder="Email"
          id="myemail"
          type="email"
        />
      </div>
      <div class="d-flex flex-column">
        <label for="mypassword">密碼</label>
        <input
          placeholder="密碼"
          id="mypassword"
          type="password"
          v-model="user.password"
        />
      </div>
      <button
        @click="handleLogin"
        class="btn btn-lg btn-primary w-100 mt-3"
        type="submit"
      >
        登入
      </button>
    </form>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useToastMessageStore } from "@/stores/toastMessage";

const router = useRouter();
const toastStore = useToastMessageStore();

const user = reactive({
  username: "",
  password: "",
});

function handleLogin() {
  const api = `${import.meta.env.VITE_API}admin/signin`;
  axios
    .post(api, user)
    .then((res) => {
      const token = res.data.token;
      const expired = res.data.expired;
      document.cookie = `fabio20token=${token};expires=${new Date(expired)}; path=/`;
      router.push("/dashbord");
    })
    .catch((error) => {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "登入失敗";
      toastStore.pushMessage({
        style: "danger",
        title: "登入失敗",
        content: message,
      });
    });
}
</script>
