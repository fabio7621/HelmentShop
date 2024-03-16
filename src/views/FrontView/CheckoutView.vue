<template>
	<section class="section-main-banner">
		<img
			class="d-none d-md-block w-100"
			src="../../assets/image/productbanner0005.png"
			alt=""
		/>
		<img
			class="d-block d-md-none w-100"
			src="../../assets/image/phone-banner/banner-p05.png"
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
					<a>購物車</a>
				</li>
			</ol>
		</div>
		<section class="section-product">
			<div class="section-product-main">
				<div class="section-product-title d-flex align-items-center">
					<div class="product-title-pic">
						<img src="../../assets/image/motohead.png" alt="" />
					</div>
					<h2>購物車</h2>
				</div>
				<div class="article-box">
					<table class="section-checkout-carts">
						<thead>
							<tr>
								<th>商品名稱</th>
								<th class="text-start pe-4">數量</th>
								<th>刪除</th>
								<th class="text-end pe-4">小計</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in carts" :key="item.product_id">
								<td class="d-flex align-items-center">
									<router-link
										:to="`/product/${item.product_id}`"
										class="d-block cart-pic"
									>
										<img :src="item.product.imageUrl" />
									</router-link>
									<p>{{ item.product.title }}</p>
								</td>

								<td class="align-middle p-0">
									<div class="input-group mb-3">
										<div class="form-floating">
											<input
												type="number"
												class="form-control"
												id="floatingInputGroup1"
												v-model.number="item.qty"
											/>
											<label for="floatingInputGroup1"></label>
										</div>
										<span
											style="font-weight: 300; font-size: 13px"
											class="input-group-text"
											>{{ item.product.unit }}</span
										>
									</div>
								</td>
								<td class="align-middle">
									<div
										@click="removeCartItem(item.id)"
										class="cart-del mx-auto"
									>
										<img src="../../assets/image/icon/delete.svg" alt="" />
									</div>
								</td>
								<td class="align-middle text-end">
									<span>{{ item.final_total }}</span>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="checkout-total d-flex flex-row-reverse">
						<div class="checkout-total-price d-flex">
							<p>總金額</p>
							<span>${{ final_total }}</span>
						</div>
					</div>
					<div class="section-checkout-order">
						<div class="checkout-order-main">
							<form
								@submit="createOrder"
								ref="form"
								class="checkout-order-box"
								action=""
							>
								<div class="section-order-item">
									<label class="mb-md-3 mb-3" for="email"
										><span>＊</span>email
									</label>
									<input
										type="email"
										class="w-100 mb-md-5 mb-3 form-control"
										id="email"
										placeholder="email"
										v-model="form.user.email"
									/>
								</div>
								<div class="section-order-item">
									<label class="mb-md-3 mb-3" for="yourname">
										<span>＊</span>收件人姓名
									</label>
									<input
										placeholder="收件人姓名"
										class="w-100 mb-md-5 mb-3 form-control"
										type="text"
										id="yourname"
										v-model="form.user.name"
									/>
								</div>
								<div class="section-order-item">
									<label class="mb-md-3 mb-3" for="">
										<span>＊</span>收件人電話
									</label>
									<input
										placeholder="收件人電話"
										class="w-100 mb-md-5 mb-3 form-control"
										type="tel"
										v-model="form.user.tel"
									/>
								</div>
								<div class="section-order-item">
									<label class="mb-md-3 mb-3" for="">
										<span>＊</span>收件人地址
									</label>
									<input
										placeholder="收件人地址"
										class="w-100 mb-md-5 mb-3 form-control"
										type="text"
										v-model="form.user.address"
									/>
								</div>
								<div class="section-order-item">
									<label class="mb-md-3 mb-3" for=""><span>＊</span>留言</label>
									<textarea
										class="w-100 form-control"
										name=""
										id=""
										rows="10"
										v-model="form.message"
									></textarea>
								</div>
							</form>

							<button
								@click="createOrder()"
								class="checkout-pay-order-btn w-100"
							>
								確認送出
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
import { mapActions, mapState } from "pinia";
import cartStore from "@/stores/cartStore";

export default {
	data() {
		return {
			form: {
				user: {
					name: "",
					email: "",
					tel: "",
					address: "",
				},
				message: "",
			},
		};
	},
	computed: {
		...mapState(cartStore, ["carts", "final_total", "total"]),
	},
	methods: {
		...mapActions(cartStore, ["getCart"]),
		removeCartItem(id) {
			const api = `${import.meta.env.VITE_API}api/${
				import.meta.env.VITE_APIPATH
			}/cart/${id}`;
			this.$http
				.delete(api)
				.then((response) => {
					this.getCart();
				})
				.catch((error) => {
					console.log(error.response.data.message);
				});
		},
		createOrder() {
			const api = `${import.meta.env.VITE_API}api/${
				import.meta.env.VITE_APIPATH
			}/order`;
			const order = this.form;
			this.$http
				.post(api, { data: order })
				.then((response) => {
					this.getCart();
					this.$refs.form.resetForm();
				})
				.catch((error) => {
					console.log(error.response.data.message);
				});
		},
	},
	mounted() {
		this.getCart();
		console.log(this.carts);
	},
};
</script>

<style></style>
