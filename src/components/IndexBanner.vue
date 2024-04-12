<template>
  <section class="index-banner">
    <swiper :pagination="true" :modules="modules" class="mySwiper">
      <swiper-slide>
        <img
          class="d-none d-md-block"
          src="../assets/image/indexbanner.png"
          alt="banner"
        />
        <img
          class="d-block d-md-none"
          src="../assets/image/phone-banner/banner-p01.png"
          alt="banner"
        />
        <router-link to="/products" type="button" class="bike-btn btn"
          >立即選購</router-link
        >
      </swiper-slide>
      <swiper-slide>
        <img
          class="d-none d-md-block"
          src="../assets/image/indexbanner002.png"
          alt="banner"
        />
        <img
          class="d-block d-md-none"
          src="../assets/image/phone-banner/banner-p02.png"
          alt="banner"
        />
        <router-link to="/products" type="button" class="bike-btn btn"
          >立即選購</router-link
        >
      </swiper-slide>
    </swiper>
  </section>
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
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>
<style lang="scss">
.swiper-pagination-bullet {
  width: 24px;
  height: 10px;
  display: inline-block;
  border-radius: 10px;
  background: #f99806;
  opacity: 1;
  transition: 0.5s;
}
.swiper-pagination-bullet-active {
  opacity: var(--swiper-pagination-bullet-opacity, 1);
  background: #ffff;
  width: 10px;
}
</style>
