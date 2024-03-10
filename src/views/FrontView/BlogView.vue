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
					<a>Blog</a>
				</li>
			</ol>
		</div>
	</section>
	<section class="section-product">
		<div class="section-product-main">
			<div class="section-product-title d-flex align-items-center">
				<div class="product-title-pic">
					<img src="./src/assets/image/motohead.png" alt="" />
				</div>
				<h2>Blog</h2>
			</div>
			<div class="section-product-nav">
				<a href="#">最新消息</a>
				<a href="#">MotoGp</a>
			</div>
			<div class="article-box row">
				<div class="col-12 col-md-6 p-3">
					<div class="article-item">
						<a class="article-item-pic d-block">
							<img
								class="w-100"
								src="../../assets/image/490105-kofu.webp"
								alt=""
							/>
						</a>
						<div class="article-content">
							<h3>文章標題</h3>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-6 p-3">
					<div class="article-item">
						<a class="article-item-pic d-block">
							<img
								class="w-100"
								src="../../assets/image/490105-kofu.webp"
								alt=""
							/>
						</a>
						<div class="article-content">
							<h3>文章標題</h3>
						</div>
					</div>
				</div>
			</div>
			<nav aria-label="Page d-flex navigation example pt-3">
				<ul class="pagination justify-content-center">
					<li class="page-item">
						<a class="page-link" href="#" aria-label="Previous">
							<span aria-hidden="true"
								><i class="bi bi-caret-left-fill"></i
							></span>
						</a>
					</li>
					<li class="page-item"><a class="page-link" href="#">1</a></li>
					<li class="page-item"><a class="page-link" href="#">2</a></li>
					<li class="page-item active">
						<a class="page-link" href="#">3</a>
					</li>
					<li class="page-item">
						<a class="page-link" href="#" aria-label="Next">
							<span aria-hidden="true"
								><i class="bi bi-caret-right-fill"></i
							></span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</section>
</template>

<script>
export default {};
</script>

<style></style>
