/**
 * 購物車狀態管理 Store
 * 管理購物車資料、總金額與載入狀態
 */
import { defineStore } from "pinia";
import axios from "axios";

const VITE_API = import.meta.env.VITE_API;
const VITE_APIPATH = import.meta.env.VITE_APIPATH;

export const useCartStore = defineStore("cartStore", {
  state: () => {
    return {
      carts: [],
      final_total: 0,
      total: 0,
      isLoading: false,
    };
  },
  actions: {
    /**
     * 取得購物車資料
     */
    getCart() {
      this.isLoading = true;
      const api = `${VITE_API}/api/${VITE_APIPATH}/cart`;
      axios
        .get(api)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.final_total = res.data.data.final_total;
          this.total = res.data.data.total;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          const message = err.response && err.response.data
            ? err.response.data.message
            : "取得購物車失敗";
          alert(`取得產品資訊失敗：${message}`);
        });
    },
    /**
     * 加入購物車
     * @param {string} id - 產品 ID
     * @param {number} qty - 數量，預設為 1
     */
    addToCart(id, qty) {
      const quantity = qty || 1;
      this.isLoading = true;
      const url = `${VITE_API}api/${VITE_APIPATH}/cart`;
      const cart = {
        product_id: id,
        qty: quantity,
      };
      axios
        .post(url, { data: cart })
        .then(() => {
          this.getCart();
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          const message = error.response && error.response.data
            ? error.response.data.message
            : "加入購物車失敗";
          alert(`加入購物車失敗：${message}`);
        });
    },
  },
});

// 同時提供 default export 以保持向後相容
export default useCartStore;
