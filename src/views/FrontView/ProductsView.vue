<template>
	<h1>This is About page.</h1>
	<router-link to="/">Home</router-link> |
	<router-link to="/about">About</router-link>
	<div>
		<swiper
			:slides-per-view="1"
			:space-between="50"
			:modules="modules"
			navigation
			:pagination="{ clickable: true }"
		>
			<swiper-slide>
				<img
					src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80"
					alt=""
				/>
			</swiper-slide>
			<swiper-slide>
				<img
					src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80"
					alt=""
				/>
			</swiper-slide>
			<swiper-slide>
				<img
					src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
					alt=""
				/>
			</swiper-slide>
		</swiper>
	</div>
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
<style scoped>
.swiper {
	width: 600px;
	height: 400px;
}
.swiper-slide img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
