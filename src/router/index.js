/**
 * Vue Router 設定
 * 使用 Hash 模式，路徑與元件對應
 */
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes: [
    // ========== 前台 (FrontView 佈局) ==========
    {
      path: "/",
      component: () => import("../views/FrontView.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/FrontView/HomeView.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("../views/FrontView/AboutView.vue"),
        },
        {
          path: "product/:productId",
          name: "product",
          component: () => import("../views/FrontView/ProductView.vue"),
        },
        {
          path: "products",
          name: "products",
          component: () => import("../views/FrontView/ProductsView.vue"),
        },
        {
          path: "checkout",
          name: "checkout",
          component: () => import("../views/FrontView/CheckoutView.vue"),
        },
        {
          path: "checkout/:couponid",
          name: "coupon",
          component: () => import("../views/FrontView/CheckoutView.vue"),
        },
        {
          path: "myorder/:orderId",
          name: "userorder",
          component: () => import("../views/FrontView/OrderView.vue"),
        },
        {
          path: "blog",
          name: "blog",
          component: () => import("../views/FrontView/BlogView.vue"),
        },
        {
          path: "blog/:blogid",
          name: "bloginner",
          component: () => import("../views/FrontView/BloginnerView.vue"),
        },
      ],
    },
    // ========== 登入頁 ==========
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginhereView.vue"),
    },
    // ========== 後台 (AdminDashboard 佈局) ==========
    {
      path: "/dashboard",
      component: () => import("../views/DashboardView/AdminDashboard.vue"),
      redirect: "/dashboard/product",
      children: [
        {
          path: "product",
          component: () => import("../views/DashboardView/AdminProduct.vue"),
        },
        {
          path: "order",
          component: () => import("../views/DashboardView/AdminOrder.vue"),
        },
        {
          path: "coupons",
          component: () => import("../views/DashboardView/CouponsView.vue"),
        },
        {
          path: "article",
          component: () => import("../views/DashboardView/AdminArticle.vue"),
        },
      ],
    },
    // ========== 404 必須放最後 ==========
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
