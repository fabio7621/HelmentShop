<template>
  <section class="notfund-wrap">
    <div class="notfund-main">
      <h1>404</h1>
      <p>請輸入正確網址</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function redirectToHome() {
  setTimeout(() => {
    router.push("/");
  }, 2000);
}

onMounted(() => {
  redirectToHome();
});
</script>

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
