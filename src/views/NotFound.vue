<template>
  <section class="notfund-wrap">
    <div class="notfund-main">
      <h1>404</h1>
      <p>請輸入正確網址</p>
    </div>
  </section>
</template>

<style lang="scss">
.notfund-wrap {
  padding: 150px 0;
  .notfund-main {
    width: 95%;
    margin: auto;
    text-align: center;
    font-weight: 500;
    h1 {
      font-size: 46px;
    }
    p {
      font-size: 31px;
    }
  }
}
</style>
<script>
import { useRouter } from "vue-router";
export default {
  methods: {
    redirectToHome() {
      const router = useRouter();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
  },
  mounted() {
    this.redirectToHome();
  },
};
</script>
