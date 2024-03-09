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
							<tr>
								<td class="d-flex align-items-center">
									<a href="#" class="d-block cart-pic">
										<img src="../../assets/image/shoeiZ8usa.webp" />
									</a>
									<p>shoei Z8</p>
								</td>

								<td class="align-middle p-0">
									<div class="input-group mb-3">
										<div class="form-floating">
											<input
												type="number"
												class="form-control"
												id="floatingInputGroup1"
											/>
											<label for="floatingInputGroup1"></label>
										</div>
										<span
											style="font-weight: 300; font-size: 13px"
											class="input-group-text"
											>頂</span
										>
									</div>
								</td>
								<td class="align-middle">
									<div class="cart-del mx-auto">
										<img src="../../assets/image/icon/delete.svg" alt="" />
									</div>
								</td>
								<td class="align-middle text-end"><span>$350</span></td>
							</tr>
						</tbody>
					</table>
					<div class="checkout-total d-flex flex-row-reverse">
						<div class="checkout-total-price d-flex">
							<p>總金額</p>
							<span>$950</span>
						</div>
					</div>
					<div class="section-checkout-order">
						<div class="checkout-order-main">
							<form class="checkout-order-box" action="">
								<div class="section-order-item">
									<label class="mb-md-3 mb-3" for="email"
										><span>＊</span>email
									</label>
									<input
										type="text"
										class="w-100 mb-md-5 mb-3 form-control"
										id="email"
										placeholder="email"
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
									/>
								</div>
								<div class="section-order-item">
									<label class="mb-md-3 mb-3" for=""><span>＊</span>留言</label>
									<textarea
										class="w-100 form-control"
										name=""
										id=""
										rows="10"
									></textarea>
								</div>
							</form>

							<button class="checkout-pay-order-btn w-100">確認結帳</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
export default {};
</script>

<style></style>
