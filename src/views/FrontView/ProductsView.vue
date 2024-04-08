<template>
  <VueLoading :active="isLoading" :z-index="1060">
    <Loadingitem></Loadingitem>
  </VueLoading>
  <section class="section-main-banner">
    <img
      class="d-none d-md-block w-100"
      src="../../assets/image/productbanner0001.png"
      alt="banner"
    />
    <img
      class="d-block d-md-none w-100"
      src="../../assets/image/phone-banner/banner-p03.png"
      alt="banner"
    />
  </section>
  <section class="section-bread">
    <div class="section-bread-main">
      <ol class="bread-list d-flex align-items-center">
        <li class="bread-list-item">
          <div class="section-bread-pic">
            <img width="20" src="../../assets/image/icon/home.svg" alt="home" />
          </div>
        </li>
        <li class="bread-list-item" aria-current="page">
          <a>產品資訊</a>
        </li>
      </ol>
    </div>
  </section>
  <section class="section-product">
    <div class="section-product-main">
      <div class="section-product-title d-flex align-items-center">
        <div class="product-title-pic">
          <img src="../../assets/image/motohead.png" alt="titlePic" />
        </div>
        <h2>產品資訊</h2>
      </div>
      <div class="section-product-nav">
        <li
          style="list-style-type: none"
          v-for="item in categories"
          :key="item"
        >
          <RouterLink :to="`/products?category=${item}`">
            {{ item }}
          </RouterLink>
        </li>
      </div>
      <div class="product-box row">
        <div
          class="col-12 col-md-6 col-lg-4 mb-3 mb-md-4 p-2 p-md-4"
          v-for="(item, key) in products"
          :key="`${key + 12}`"
        >
          <div class="product-item">
            <router-link
              :to="`/product/${item.id}`"
              class="d-block position-relative index-product-pic"
            >
              <img :src="item.imageUrl" alt="Product Image" />
              <div class="index-white-box position-absolute">
               <div class="white-box-pic position-absolute">
                <img src="../../assets/image/icon/search.svg" alt="">
               </div>
          </div>
            </router-link>
            <h4 class="index-product-title">{{ item.title }}</h4>
            <div class="index-product-price">
              <span
                ><del>原價：{{ item.origin_price }}</del></span
              >
              <p>售價：{{ item.price }}</p>
            </div>
            <div class="product-btns d-flex justify-content-around">
              <router-link
                :to="`/product/${item.id}`"
                class="d-block w-50 h-100"
              >
                <i class="bi bi-search"></i>
              </router-link>
              <button
                style="background-color: none; border: none"
                @click="addToCart(item.id)"
                class="d-block w-50 h-100"
                href=""
              >
                <i class="bi bi-cart"></i>
              </button>
            </div>
          </div>
        </div>
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
              @click.prevent="getData(pagination.current_page - 1)"
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
              @click.prevent="getData(item)"
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
              @click.prevent="getData(pagination.current_page + 1)"
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
import { mapActions,mapState } from "pinia";
import cartStore from "@/stores/cartStore";
import Pagination from "@/components/Pagination.vue";
import Loadingitem from "@/components/Loadingitem.vue";
export default {
  data() {
    return {
      products: [],
      pagination: {},
      categories: ["shoei", "ogk", "arai"],
    };
  },
  methods: {
    ...mapActions(cartStore, ["addToCart"]),
    getData(page = 1) {
      this.isLoading = true;
      const { category = "" } = this.$route.query;
      const api = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_APIPATH
      }/products?category=${category}&page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(`取得產品資訊失敗${err.response.data.message}`);
          this.isLoading = false;
        });
    },
  },
  computed:{
    ...mapState(cartStore,["isLoading"]),
  },
  watch: {
    "$route.query": {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },
  components: {
    Pagination,
    Loadingitem,
  },
  mounted() {
    this.getData();
  },
};
</script>
<style scoped></style>
