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
					path: "/product",
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
			],
		},
	],
});

export default router;
