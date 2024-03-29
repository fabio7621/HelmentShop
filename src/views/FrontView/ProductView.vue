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
					<a>{{ product.title }}</a>
				</li>
			</ol>
		</div>
	</section>
	<section class="section-product">
		<div class="section-product-main">
			<div class="article-box row">
				<div class="col-12 col-md-6">
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
						<swiper-slide
							v-if="!product.imagesUrl || product.imagesUrl.length === 0"
						>
							<img :src="product.imageUrl" alt="Product Image" />
						</swiper-slide>
						<swiper-slide
							v-else
							v-for="(url, index) in product.imagesUrl"
							:key="index"
						>
							<img :src="url" alt="Product Image" />
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
						<swiper-slide
							v-if="!product.imagesUrl || product.imagesUrl.length === 0"
						>
							<img :src="product.imageUrl" alt="Product Image" />
						</swiper-slide>
						<swiper-slide
							v-else
							v-for="(url, index) in product.imagesUrl"
							:key="index"
						>
							<img :src="url" alt="Product Image" />
						</swiper-slide>
					</swiper>
				</div>
				<!-- 加入尋價車 -->
				<div class="col-12 col-md-6 d-flex flex-column">
					<div class="pro-inner-txt">
						<h3>{{ product.title }}</h3>
						<div class="pro-inner-price d-flex">
							<span
								><del>{{ product.origin_price }}</del></span
							>
							<p>{{ product.price }}</p>
						</div>
						<div class="pro-inner-content">
							<p>
								{{ product.description }}
							</p>
						</div>
					</div>
					<div class="input-group flex-nowrap">
						<input
							type="number"
							v-model.number="product.qty"
							class="form-control"
							aria-label="Userqty"
							aria-describedby="addon-wrapping"
							min="1"
							max="10"
						/>
						<span class="input-group-text" id="addon-wrapping">
							{{ product.unit }}
						</span>
					</div>
					<div class="pro-inner-btn">
						<button
							@click.prevent="addToCart(product.id, product.qty)"
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
			<router-link to="/products" class="backBtn">回到上一頁</router-link>
		</div>
	</section>
</template>

<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { mapActions, mapState } from "pinia";
import cartStore from "@/stores/cartStore";

export default {
	data() {
		return {
			product: {},
			id: "",
			qty: 1,
		};
	},
	methods: {
		getProduct() {
			const api = `${import.meta.env.VITE_API}api/${
				import.meta.env.VITE_APIPATH
			}/product/${this.id}`;
			this.$http.get(api).then((response) => {
				this.product = response.data.product;
			});
		},
		...mapActions(cartStore, ["addToCart"]),
		// addToCart(qty = 1) {
		//   const url = `${import.meta.env.VITE_API}api/${
		//     import.meta.env.VITE_APIPATH
		//   }/cart`;
		//   const cart = {
		//     product_id: this.product.id,
		//     qty: this.qty,
		//   };
		//   this.$http
		//     .post(url, { data: cart })
		//     .then((response) => {
		//       console.log("ok");
		//       this.qty = 1;
		//     })
		//     .catch((error) => {
		//       console.log("false");
		//     });
		// },
	},
	components: {
		Swiper,
		SwiperSlide,
	},
	setup() {
		const thumbsSwiper = ref(null);

		const setThumbsSwiper = (swiper) => {
			thumbsSwiper.value = swiper;
		};

		return {
			thumbsSwiper,
			setThumbsSwiper,
			modules: [FreeMode, Navigation, Thumbs],
		};
	},
	created() {
		this.id = this.$route.params.productId;
		this.getProduct();
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
