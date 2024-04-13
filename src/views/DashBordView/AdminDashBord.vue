<template>
  <NavbarLayout />
  <router-view v-if="checkSuccess"></router-view>
  <ToastMessages />
</template>

<script>
import { mapActions } from "pinia";
import { useToastMessageStore } from "@/stores/toastMessage";

import ToastMessages from "@/components/ToastMessages.vue";
import NavbarLayout from "@/components/NavbarLayout.vue";

export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
    ...mapActions(useToastMessageStore, ["pushMessage"]),
    checklogin() {
      const api = `${import.meta.env.VITE_API}api/user/check`;
      this.$http
        .post(api)
        .then((res) => {
          this.checkSuccess = true;
          this.pushMessage({
            style: "success",
            title: "成功登入",
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: "錯誤訊息",
            content: error.response.data.message,
          });
          this.$router.push("/");
        });
    },
  },
  components: {
    NavbarLayout,
    ToastMessages,
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)fabio20token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common.Authorization = token;
    this.checklogin();
  },
};
</script>
