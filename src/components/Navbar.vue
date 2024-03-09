<template>
	<header class="top-nav w-100 sticky-top">
		<nav class="navbar navbar-expand-md">
			<div class="container-fluid">
				<h1>
					<a class="navbar-brand logopic d-block d-md-none" href="./index.html">
						<img src="../assets/image/logo.png" alt="" />
					</a>
				</h1>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<div class="hb-btn-container">
						<input id="menu-toggle" type="checkbox" />
						<label class="menu-button-container" for="menu-toggle">
							<div class="menu-button"></div>
						</label>
					</div>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav flex-wrap mx-auto">
						<li class="nav-item top-navbar-item" style="border-top: none">
							<router-link
								class="nav-link top-navbar-txt d-flex flex-column text-center"
								to="/about"
								>關於我<br /><span>私について</span>
							</router-link>
						</li>
						<li class="nav-item dropdown">
							<a
								class="nav-link top-navbar-item d-flex flex-column text-center dropdown-toggle"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								產品介紹<br />
								<span>製品紹介</span>
							</a>
							<ul class="dropdown-menu">
								<li>
									<a class="drop-item dropdown-item" href="#">全部製品</a>
								</li>
								<li>
									<a class="drop-item dropdown-item" href="#">Shoei</a>
								</li>
								<li>
									<a class="drop-item dropdown-item" href="#">Arai</a>
								</li>
								<li>
									<a class="drop-item dropdown-item" href="#">OGK</a>
								</li>
							</ul>
						</li>
						<li class="nav-item top-navbar-item">
							<router-link
								to="/"
								class="nav-link top-navbar-logo d-md-block d-none position-relative"
							>
								<img src="../assets/image/logo.png" alt="" />
							</router-link>
						</li>
						<li class="nav-item top-navbar-item d-flex flex-column text-center">
							<a class="nav-link top-navbar-txt" href="./shopcart.html"
								>部落格<br /><span>ブログ</span></a
							>
						</li>
						<li class="nav-item top-navbar-item d-flex flex-column text-center">
							<router-link
								class="nav-link top-navbar-txt position-relative"
								to="/checkout"
								>購物車<br />
								<span style="color: red">カート(20)</span>
							</router-link>
						</li>
						<li class="nav-item top-navbar-item d-flex flex-column text-center">
							<a class="nav-link top-navbar-txt" href="./shopcart.html"
								>登入<br />
								<span>ログイン </span></a
							>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
export default {};
</script>

<style></style>
