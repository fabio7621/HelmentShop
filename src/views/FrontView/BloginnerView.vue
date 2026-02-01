<template>
  <section class="section-main-banner">
    <img
      class="d-none d-md-block w-100"
      src="../../assets/image/productbanner0003.png"
      alt="banner"
    />
    <img
      class="d-block d-md-none w-100"
      src="../../assets/image/phone-banner/banner-p04.png"
      alt="banner"
    />
  </section>
  <section class="section-bread">
    <div class="section-bread-main">
      <ol class="bread-list d-flex align-items-center">
        <li class="bread-list-item">
          <div class="section-bread-pic">
            <img
              width="20"
              src="../../assets/image/icon/home.svg"
              alt="home Pic"
            />
          </div>
        </li>
        <li class="bread-list-item" aria-current="page">
          <a>Blog</a>
        </li>
        <li class="bread-list-item" aria-current="page">
          <span>/</span>
        </li>
        <li class="bread-list-item" aria-current="page">
          <a>內文標題</a>
        </li>
      </ol>
    </div>
  </section>
  <section class="section-product">
    <div class="section-product-main">
      <div class="section-product-title d-flex align-items-center">
        <div class="product-title-pic">
          <img src="../../assets/image/motohead.png" alt="title Pic" />
        </div>
        <h2>Blog</h2>
      </div>
      <div class="article-box row">
        <div class="col-12">
          <div class="article-item">
            <a class="article-item-pic d-block">
              <img :src="article.imageUrl" class="w-100" alt="articlePic" />
            </a>
            <div class="article-content">
              <h3>{{ article.title }}</h3>
              <p class="mb-0">
                {{ article.author }}&nbsp;<span>{{ formatDate(article.create_at) }}</span>
              </p>
              <div v-html="article.content"></div>
            </div>
          </div>
        </div>
      </div>
      <router-link to="/blog" class="backBtn">回到上一頁</router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useFilters } from "@/composables/useFilters";

const VITE_API = import.meta.env.VITE_API;
const VITE_APIPATH = import.meta.env.VITE_APIPATH;

const route = useRoute();
const { date: formatDate } = useFilters();

const article = ref({});

const blogId = computed(() => route.params.blogid);

function getArticle() {
  const api = `${VITE_API}api/${VITE_APIPATH}/article/${blogId.value}`;
  axios
    .get(api)
    .then((response) => {
      article.value = response.data.article;
    })
    .catch((error) => {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "取得文章資訊失敗";
      alert(message);
    });
}

onMounted(() => {
  getArticle();
});
</script>
