<template>
  <VueLoading :active="isLoading" :z-index="1060">
    <Loadingitem />
  </VueLoading>
  <IndexBanner />
  <section class="index-about">
    <div class="index-about-main row">
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="index-about-pic">
          <img
            class="w-100"
            src="../../assets/image/index_about.jpg"
            alt="Index banner"
          />
        </div>
      </div>
      <div class="col-12 col-md-6 d-flex flex-column">
        <div class="index-about-txt p-1 p-md-2 p-lg-5">
          <h3>專業FPS調整活動,找到最適合您的頭型</h3>
          <p>
            調整活動皆由總代理技師全程服務(過程約20分鐘1名),(若帽子尚未到貨已預約之顧客，也可以先行量測，待到貨後我們會調整後寄出)P.F.S.(Personal
            Fitting
            System)是一套專業分析系統，根據個人頭型量測資料，分析出最佳的安全帽內襯配置。由原廠認證的技師進行內襯施工調整，提供消費者更優的配戴體驗。
          </p>
        </div>
        <router-link
          to="/blog"
          class="text-decoration-none index-about-btn d-flex align-items-center ms-auto mt-3 mt-md-0"
        >
          <div class="index-about-btn-pic">
            <img src="../../assets/image/motohead.png" alt="" />
          </div>
          看更多
        </router-link>
      </div>
    </div>
  </section>
  <CouponSection />
  <section class="index-product">
    <div class="index-product-main">
      <IndexProductCard
        :ogkdata="ogkProducts"
        :is-loading="isLoading"
      ></IndexProductCard>
    </div>
  </section>
</template>

<script>
import IndexBanner from "@/components/IndexBanner.vue";
import IndexProductCard from "@/components/IndexProductCard.vue";
import Loadingitem from "@/components/Loadingitem.vue";
import CouponSection from "@/components/CouponSection.vue";
import { mapActions } from "pinia";
import { useToastMessageStore } from "@/stores/toastMessage";
const { VITE_API, VITE_APIPATH } = import.meta.env;

export default {
  data() {
    return {
      ogkProducts: "",
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(useToastMessageStore, ["pushMessage"]),
    getOgk() {
      this.isLoading = true;
      const api = `${VITE_API}api/${VITE_APIPATH}/products?category=ogk`;
      this.$http(api)
        .then((res) => {
          this.ogkProducts = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(`取得產品資訊失敗${err.response.data.message}`);
        });
    },
  },
  components: {
    IndexBanner,
    IndexProductCard,
    Loadingitem,
    CouponSection,
  },
  mounted() {
    this.getOgk();
    this.pushMessage({
      style: "success",
      title: "歡迎光臨",
      content: `買千送買優惠活動持續中！！`,
    });
  },
};
</script>
<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.cardSwiper .swiper-slide {
  display: flex;
  flex-direction: column;
}
.index-product-pic {
  max-height: 500px;
}
.index-product-pic img {
  width: 100%;
  object-fit: cover;
}
.swiper-button-next:after,
.swiper-button-prev:after {
  opacity: 0;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
