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
				slidesPerView: 2,
				spaceBetween: 25,
			},
			1600: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		}"
		class="cardSwiper"
	>
		<swiper-slide>
			<div class="index-product-pic">
				<img src="../assets/image/shoeiZ8usa.webp" alt="" />
			</div>
			<h4 class="index-product-title">Shoei Z8</h4>
			<div class="index-product-price d-flex justify-content-between">
				<span><del>原價：$500</del></span>
				<p>售價：$200</p>
			</div>
		</swiper-slide>
		<swiper-slide>
			<div class="index-product-pic">
				<img src="../assets/image/shoeiZ8usa.webp" alt="" />
			</div>
			<h4 class="index-product-title">Shoei Z8</h4>
			<div class="index-product-price d-flex justify-content-between">
				<span><del>原價：$500</del></span>
				<p>售價：$200</p>
			</div>
		</swiper-slide>
		<swiper-slide>
			<div class="index-product-pic">
				<img src="../assets/image/shoeiZ8usa.webp" alt="" />
			</div>
			<h4 class="index-product-title">Shoei Z8</h4>
			<div class="index-product-price d-flex justify-content-between">
				<span><del>原價：$500</del></span>
				<p>售價：$200</p>
			</div>
		</swiper-slide>
		<swiper-slide>
			<div class="index-product-pic">
				<img src="../assets/image/shoeiZ8usa.webp" alt="" />
			</div>
			<h4 class="index-product-title">Shoei Z8</h4>
			<div class="index-product-price d-flex justify-content-between">
				<span><del>原價：$500</del></span>
				<p>售價：$200</p>
			</div>
		</swiper-slide>
		<swiper-slide>
			<div class="index-product-pic">
				<img src="../assets/image/shoeiZ8usa.webp" alt="" />
			</div>
			<h4 class="index-product-title">Shoei Z8</h4>
			<div class="index-product-price d-flex justify-content-between">
				<span><del>原價：$500</del></span>
				<p>售價：$200</p>
			</div>
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
	setup() {
		return {
			modules: [Pagination],
		};
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
	background: #fff;

	/* Center slide text vertically */
	display: flex;
	justify-content: center;
	align-items: center;
}

.swiper-slide img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
