<template>
  <NavbarLayout />
  <router-view v-if="checkSuccess"></router-view>
  <ToastMessages />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import ToastMessages from "@/components/ToastMessages.vue";
import NavbarLayout from "@/components/NavbarLayout.vue";
import { useToastMessageStore } from "@/stores/toastMessage";

const router = useRouter();
const toastStore = useToastMessageStore();

const checkSuccess = ref(false);

function checklogin() {
  const api = `${import.meta.env.VITE_API}api/user/check`;
  axios
    .post(api)
    .then((res) => {
      checkSuccess.value = true;
      toastStore.pushMessage({
        style: "success",
        title: "成功登入",
        content: res.data.message,
      });
    })
    .catch((err) => {
      const message = err.response && err.response.data
        ? err.response.data.message
        : "驗證失敗";
      toastStore.pushMessage({
        style: "danger",
        title: "錯誤訊息",
        content: message,
      });
      router.push("/");
    });
}

onMounted(() => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)fabio20token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  axios.defaults.headers.common.Authorization = token;
  checklogin();
});
</script>
