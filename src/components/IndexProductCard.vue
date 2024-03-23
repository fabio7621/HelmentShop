<template>
  <swiper
    :slidesPerView="2"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    :breakpoints="{
      1200: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      1600: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }"
    class="cardSwiper"
  >
    <swiper-slide v-for="product in ogkdata" :key="product.id">
      <router-link
        class="d-block text-decoration-none"
        :to="`/product/${product.id}`"
      >
        <div class="index-product-pic">
          <img class="img-fluid" :src="product.imageUrl" alt="" />
        </div>
        <h4 class="index-product-title">{{ product.title }}</h4>
        <div class="index-product-price d-flex justify-content-between">
          <span
            ><del>原價：{{ product.origin_price }}</del></span
          >
          <p>售價：{{ product.price }}</p>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["ogkdata", "isLoading"],
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>
