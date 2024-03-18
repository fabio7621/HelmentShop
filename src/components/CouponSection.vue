<template>
	<section class="index-coupon">
		<div class="index-coupon-main">
			<h3>優惠卷宝くじ</h3>
			<button @click="generateRandomNumber" class="btn mx-auto">
				試試手氣吧～
			</button>
			<div class="ticket-box row" v-if="randomNumber !== null">
				<div class="col-12 col-md-6 mx-auto" v-if="randomNumber === 0">
					<router-link to="/checkout/DFW444" class="ticket-item d-block">
						<img
							class="w-100"
							src="../../src/assets/image/ticker01.png"
							alt=""
						/>
					</router-link>
				</div>
				<router-link
					to="/checkout/74497"
					class="d-block col-12 col-md-6 mx-auto"
					v-else
				>
					<div class="ticket-item">
						<img
							class="w-100"
							src="../../src/assets/image/ticket02.png"
							alt=""
						/>
					</div>
				</router-link>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			randomNumber: null,
		};
	},
	methods: {
		generateRandomNumber() {
			this.randomNumber = Math.floor(Math.random() * 2);
		},
	},
};
</script>
