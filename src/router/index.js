import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
	history: createWebHashHistory(),
	linkActiveClass: "active",
	routes: [
		{
			path: "/",
			component: () => import("../views/FrontView.vue"),
			children: [
				{
					path: "/",
					name: "home",
					component: () => import("../views/FrontView/HomeView.vue"),
				},
				{
					path: "/about",
					name: "about",
					component: () => import("../views/FrontView/AboutView.vue"),
				},
				{
					path: "/product:id",
					name: "product",
					component: () => import("../views/FrontView/ProductView.vue"),
				},
				{
					path: "/products",
					name: "products",
					component: () => import("../views/FrontView/ProductsView.vue"),
				},
				{
					path: "/checkout",
					name: "checkout",
					component: () => import("../views/FrontView/CheckoutView.vue"),
				},
				{
					path: "/blog/:blogid",
					name: "bloginner",
					component: () => import("../views/FrontView/BloginnerView.vue"),
				},
				{
					path: "/blog",
					name: "blog",
					component: () => import("../views/FrontView/BlogView.vue"),
				},
				{
					path: "product/:productId",
					component: () => import("../views/FrontView/ProductView.vue"),
				},
			],
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/loginView.vue"),
		},
		{
			path: "/dashbord",
			name: "dashbord",
			component: () => import("../views/DashBordView/AdminDashBord.vue"),
			children: [
				{
					path: "product",
					component: () => import("../views/DashBordView/AdminProduct.vue"),
				},
				{
					path: "order",
					component: () => import("../views/DashBordView/AdminOder.vue"),
				},
				{
					path: "coupons",
					component: () => import("../views/DashBordView/CouponsView.vue"),
				},
				{
					path: "article",
					component: () => import("../views/DashBordView/AdminArticle.vue"),
				},
			],
		},
	],
});

export default router;
