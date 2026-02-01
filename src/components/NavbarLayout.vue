<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">我的後台</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashbord/product" class="nav-link"
              >產品</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/dashbord/order" class="nav-link"
              >訂單</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/dashbord/coupons" class="nav-link"
              >優惠卷</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/dashbord/article" class="nav-link"
              >貼文</router-link
            >
          </li>
          <li class="nav-item">
            <a @click.prevent="handleLogout" class="nav-link">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

function handleLogout() {
  const api = `${import.meta.env.VITE_API}logout`;
  axios
    .post(api)
    .then(() => {
      router.push("/");
      document.cookie = "fabio20=; expires=; path=/";
    })
    .catch((error) => {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "登出失敗";
      alert(message);
    });
}
</script>
