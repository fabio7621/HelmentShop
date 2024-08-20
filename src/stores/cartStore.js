import { defineStore } from "pinia";

import axios from "axios";

export default defineStore("cartStore", {
  state: () => {
    return {
      carts: [],
      final_total: 0,
      total: 0,
      isLoading: false,
    };
  },
  actions: {
    getCart() {
      this.isLoading = true;
      const api = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_APIPATH}/cart`;
      axios
        .get(api)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.final_total = res.data.data.final_total;
          this.total = res.data.data.total;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(`取得產品資訊失敗${err.response.data.message}`);
        });
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_APIPATH}/cart`;
      const cart = {
        product_id: id,
        qty: qty,
      };
      axios
        .post(url, { data: cart })
        .then((response) => {
          this.getCart();
          this.isLoading = false;
        })
        .catch((error) => {
          alert(`加入購物車失敗${error.response.data.message}`);
          this.isLoading = false;
        });
    },
  },
});
