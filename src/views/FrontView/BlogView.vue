<template>
  <VueLoading :active="isLoading" :z-index="1060">
    <Loadingitem></Loadingitem>
  </VueLoading>
  <section class="section-main-banner">
    <img
      class="d-none d-md-block w-100"
      src="../../assets/image/productbanner0003.png"
      alt=""
    />
    <img
      class="d-block d-md-none w-100"
      src="../../assets/image/phone-banner/banner-p04.png"
      alt=""
    />
  </section>
  <section class="section-bread">
    <div class="section-bread-main">
      <ol class="bread-list d-flex align-items-center">
        <li class="bread-list-item">
          <div class="section-bread-pic">
            <img width="20" src="../../assets/image/icon/home.svg" alt="" />
          </div>
        </li>
        <li class="bread-list-item" aria-current="page">
          <a>Blog</a>
        </li>
      </ol>
    </div>
  </section>
  <section class="section-product">
    <div class="section-product-main">
      <div class="section-product-title d-flex align-items-center">
        <div class="product-title-pic">
          <img src="../../assets/image/motohead.png" alt="" />
        </div>
        <h2>Blog</h2>
      </div>
      <div class="section-product-nav">
        <a>最新消息</a>
        <!-- <a href="#">MotoGp</a> -->
      </div>
      <div class="article-box row">
        <router-link
          :to="`/blog/${item.id}`"
          v-for="item in articles"
          :key="item.create_at"
          class="col-12 col-md-6 p-3 d-block text-decoration-none"
        >
          <div class="article-item">
            <a class="article-item-pic d-block">
              <img class="w-100" :src="item.imageUrl" alt="" />
            </a>
            <div class="article-content">
              <h3>{{ item.title }}</h3>
            </div>
          </div>
        </router-link>
      </div>
      <nav aria-label="Page d-flex navigation example pt-3">
        <ul class="pagination justify-content-center">
          <li
            class="page-item"
            :class="{ disabled: pagination.current_page === 1 }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="getArticles(pagination.current_page - 1)"
            >
              <span aria-hidden="true">
                <i class="bi bi-caret-left-fill"></i>
              </span>
            </a>
          </li>
          <li
            v-for="(item, index) in pagination.total_pages"
            :key="index"
            class="page-item"
            :class="{ active: item === pagination.current_page }"
          >
            <span class="page-link" v-if="item === pagination.current_page">
              {{ item }}
            </span>
            <a
              class="page-link"
              href="#"
              v-else
              @click.prevent="getArticles(item)"
              >{{ item }}</a
            >
          </li>
          <li
            class="page-item"
            :class="{
              disabled: pagination.current_page === pagination.total_pages,
            }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="getArticles(pagination.current_page + 1)"
            >
              <span aria-hidden="true">
                <i class="bi bi-caret-right-fill"></i>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import Loadingitem from "@/components/Loadingitem.vue";
export default {
  data() {
    return {
      articles: [],
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_APIPATH
      }/articles?page=${page}`;
      console.log(api);
      this.$http
        .get(api)
        .then((response) => {
          this.articles = response.data.articles;
          this.pagination = response.data.pagination;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log("取得文章資訊失敗", error.response.data.message);
        });
    },
  },
  components: {
    Pagination,
    Loadingitem,
  },
  mounted() {
    this.getArticles();
  },
};
</script>

<style></style>
