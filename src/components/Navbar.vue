<template>
  <header class="top-nav w-100 sticky-top">
    <nav class="navbar navbar-expand-md">
      <div class="container-fluid">
        <h1>
          <a class="navbar-brand logopic d-block d-md-none" href="./index.html">
            <img src="../assets/image/logo.png" alt="brandLogo" />
          </a>
        </h1>
        <div class="topCartItem d-flex align-items-center">
          <router-link
            to="/checkout"
            class="nav-cartItem d-flex d-md-none align-items-center text-decoration-none text-dark"
          >
            <i class="bi bi-cart-fill"></i>
            <span>({{ this.carts?.length }})</span>
          </router-link>
        </div>
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
                  <router-link
                    to="/products"
                    class="drop-item dropdown-item"
                    href="#"
                    >全部製品</router-link
                  >
                </li>
                <li v-for="item in categories" :key="item">
                  <router-link
                    :to="`/products?category=${item}`"
                    class="drop-item dropdown-item"
                    >{{ item }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item top-navbar-item">
              <router-link
                to="/"
                class="nav-link top-navbar-logo d-md-block d-none position-relative"
              >
                <img src="../assets/image/logo.png" alt="logo pic" />
              </router-link>
            </li>
            <li class="nav-item top-navbar-item d-flex flex-column text-center">
              <router-link to="/blog" class="nav-link top-navbar-txt"
                >部落格<br /><span>ブログ</span></router-link
              >
            </li>
            <li class="nav-item top-navbar-item d-flex flex-column text-center">
              <router-link
                class="nav-link top-navbar-txt position-relative"
                to="/checkout"
                >購物車<br />
                <span style="color: red">カート({{ this.carts?.length }})</span>
              </router-link>
            </li>
            <li class="nav-item top-navbar-item d-flex flex-column text-center">
              <router-link class="nav-link top-navbar-txt" to="/login"
                >登入<br />
                <span>ログイン </span></router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapState } from "pinia";
import cartStore from "@/stores/cartStore";

export default {
  data() {
    return {
      categories: ["shoei", "ogk", "arai"],
    };
  },
  methods: {
    ...mapActions(cartStore, ["getCart"]),
  },
  computed: {
    ...mapState(cartStore, ["carts"]),
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style></style>
