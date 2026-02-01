<template>
  <swiper
    :slidesPerView="1"
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
        <div class="index-product-pic position-relative">
          <img class="img-fluid" :src="product.imageUrl" alt="productPic" />
          <div class="index-white-box position-absolute">
            <div class="white-box-pic position-absolute">
              <img src="../assets/image/icon/search.svg" alt="search pic" />
            </div>
          </div>
        </div>
        <h4 class="index-product-title">{{ product.title }}</h4>
        <div class="index-product-price d-flex justify-content-between">
          <span>
            <del>原價：{{ product.origin_price }} </del>
          </span>
          <p>售價：{{ product.price }}</p>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

defineProps({
  ogkdata: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const modules = [Pagination];
</script>
