<template>
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
					<a>Shoei X15</a>
				</li>
			</ol>
		</div>
	</section>
	<section class="section-product">
		<div class="section-product-main">
			<div class="article-box row">
				<div class="col-12 col-md-6">
					<!-- Swiper -->
					<!-- <swiper
						:style="{
							'--swiper-navigation-color': '#fff',
							'--swiper-pagination-color': '#fff',
						}"
						:loop="true"
						:spaceBetween="10"
						:navigation="true"
						:thumbs="{ swiper: thumbsSwiper }"
						:modules="modules"
						class="mySwiper2"
					>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
						<div class="swiper-button-prev">
							<img
								class="w-100"
								src="../../assets/image/icon/arrow_4.svg"
								alt="prev"
							/>
						</div>
						<div class="swiper-button-next">
							<img
								class="w-100"
								src="../../assets/image/icon/arrow_5.svg"
								alt="next"
							/>
						</div>
					</swiper>
					<swiper
						@swiper="setThumbsSwiper"
						:loop="true"
						:spaceBetween="10"
						:slidesPerView="4"
						:freeMode="true"
						:watchSlidesProgress="true"
						:modules="modules"
						class="mySwiper"
					>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
					</swiper> -->
					<swiper
						:style="{
							'--swiper-navigation-color': '#fff',
							'--swiper-pagination-color': '#fff',
						}"
						:loop="true"
						:spaceBetween="10"
						:navigation="{
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						}"
						:thumbs="{ swiper: thumbsSwiper }"
						:modules="modules"
						class="mySwiper2"
					>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
						<div class="swiper-button-prev">
							<img
								class="w-100"
								src="../../assets/image/icon/arrow_4.svg"
								alt="prev"
							/>
						</div>
						<div class="swiper-button-next">
							<img
								class="w-100"
								src="../../assets/image/icon/arrow_5.svg"
								alt="next"
							/>
						</div>
					</swiper>
					<swiper
						@swiper="setThumbsSwiper"
						:loop="true"
						:spaceBetween="10"
						:slidesPerView="4"
						:freeMode="true"
						:watchSlidesProgress="true"
						:modules="modules"
						class="mySwiper"
					>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
						<swiper-slide>
							<img src="../../assets/image/shoeiZ8usa.webp" />
						</swiper-slide>
					</swiper>
				</div>
				<!-- 加入尋價車 -->
				<div class="col-12 col-md-6 d-flex flex-column">
					<div class="pro-inner-txt">
						<h3>Shoei Z8</h3>
						<div class="pro-inner-price d-flex">
							<span><del>定價：400</del></span>
							<p>優惠價：350</p>
						</div>
						<div class="pro-inner-content">
							<p>
								文案待補文案待補文案待補文案待補文案待補文案待補文案待補
								文案待補文案待補文案待補文案待補文案待補文案待補文案待補
								文案待補文案待補文案待補文案待補
							</p>
						</div>
					</div>
					<div class="pro-inner-btn">
						<button
							onclick="window.location.href = '#'"
							class="d-flex justify-content-center align-items-center"
						>
							加入購物車
							<div class="pro-inner-btn-pic">
								<img src="../../assets/image/icon/button_finger.svg" alt="" />
							</div>
						</button>
					</div>
				</div>
			</div>
			<a class="backBtn">回到上一頁</a>
		</div>
	</section>
</template>

<script>
import { ref } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	setup() {
		// const thumbsSwiper = ref(null);

		return {
			// thumbsSwiper,
			modules: [FreeMode, Navigation, Thumbs],
		};
	},
};
</script>

<style lang="scss" scoped>
.swiper {
	width: 100%;
	height: 100%;
}

.swiper-slide {
	text-align: center;
	font-size: 18px;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 33px;
	overflow: hidden;
}

.swiper-slide img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.swiper {
	width: 100%;
	height: 300px;
	margin-left: auto;
	margin-right: auto;
}

.swiper-slide {
	background-size: cover;
	background-position: center;
}

.mySwiper2 {
	height: 80%;
	width: 100%;
}

.mySwiper {
	height: 20%;
	box-sizing: border-box;
	padding: 10px 0;
}

.mySwiper .swiper-slide {
	width: 25%;
	height: 100%;
	opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
	opacity: 1;
}

.swiper-slide img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.swiper-button-next:after,
.swiper-rtl .swiper-button-prev:after {
	content: none !important;
}
.swiper-button-prev:after,
.swiper-rtl .swiper-button-next:after {
	content: none !important;
}
.swiper-button-next img,
.swiper-button-prev img {
	vertical-align: top !important;
}
.swiper-button-next,
.swiper-button-prev {
	width: 40px;
}
.swiper-button-next {
	right: 0;
}
.swiper-button-prev {
	left: 0;
}
@media (max-width: 992px) {
	/* product-swiper-setting */
	.swiper-button-next,
	.swiper-button-prev {
		width: 29px;
	}
	.swiper-slide {
		border-radius: 11px;
	}
}
</style>
