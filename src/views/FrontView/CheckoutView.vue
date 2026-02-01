<template>
  <VueLoading :active="isLoading" :z-index="1060">
    <Loadingitem />
  </VueLoading>
  <section class="section-main-banner">
    <img class="d-none d-md-block w-100" src="../../assets/image/productbanner0005.png" alt="banner" />
    <img class="d-block d-md-none w-100" src="../../assets/image/phone-banner/banner-p05.png" alt="banner" />
  </section>
  <section class="section-bread">
    <div class="section-bread-main">
      <ol class="bread-list d-flex align-items-center">
        <li class="bread-list-item">
          <div class="section-bread-pic">
            <img width="20" src="../../assets/image/icon/home.svg" alt="homepic" />
          </div>
        </li>
        <li class="bread-list-item" aria-current="page">
          <a>購物車</a>
        </li>
      </ol>
    </div>
  </section>
  <section class="section-product">
    <div v-if="carts.length !== 0" class="section-product-main">
      <div class="section-product-title d-flex align-items-center">
        <div class="product-title-pic">
          <img src="../../assets/image/motohead.png" alt="title pic" />
        </div>
        <h2>購物車</h2>
      </div>
      <div class="article-box">
        <table class="section-checkout-carts">
          <thead>
            <tr>
              <th>品項</th>
              <th class="text-start pe-4">數量</th>
              <th>刪除</th>
              <th class="text-end pe-4">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carts" :key="item.product_id">
              <td class="d-flex align-items-center">
                <router-link :to="`/product/${item.product_id}`" class="d-block cart-pic">
                  <img :src="item.product.imageUrl" alt="productImg" />
                </router-link>
                <p>
                  {{ item.product.title }}<br />
                  <span style="font-size: 12px">{{ `單價${item.product.price}元/${item.product.unit}` }}</span><br />
                  <small class="text-end text-success" v-if="coupon_status">已套用折扣卷</small>
                </p>
              </td>
              <td class="align-middle p-0">
                <div class="input-group">
                  <div class="form-floating">
                    <input
                      type="number"
                      class="form-control p-0"
                      style="text-indent: 1em"
                      id="floatingInputGroup1"
                      v-model.number="item.qty"
                      @blur="updateCart(item)"
                      @input="restInput(item)"
                      min="0"
                    />
                    <label for="floatingInputGroup1"></label>
                  </div>
                  <span style="font-weight: 300; font-size: 13px" class="input-group-text">{{ item.product.unit }}</span>
                </div>
              </td>
              <td class="align-middle">
                <div @click="removeCartItem(item.id)" class="cart-del mx-auto">
                  <img src="../../assets/image/icon/delete.svg" alt="delreBtn" />
                </div>
              </td>
              <td class="align-middle text-end">
                <span>{{ formatCurrency(item.final_total) }}元</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="deleteAllCarts" type="button" class="cleanCartBtn btn ms-auto mt-2">清空購物車</button>
        <div class="checkout-total d-flex flex-row-reverse">
          <div class="checkout-total-price d-flex">
            <p class="text-end text-success" v-if="coupon_status">優惠價</p>
            <p v-else>總金額</p>
            <span>${{ formatCurrency(coupon_status ? final_total : computedTotal) }}元</span>
          </div>
        </div>
        <div class="mt-3 mb-5 d-flex justify-content-end">
          <input type="text" class="form-control w-50" v-model="coupon_code" placeholder="請輸入優惠碼" style="max-width: 300px" />
          <div class="input-group-append">
            <button class="ms-1 btn btn-outline-secondary" type="button" @click="addCouponCode">使用優惠碼</button>
          </div>
        </div>
        <div class="section-checkout-order">
          <div class="checkout-order-main">
            <VeeForm v-slot="{ errors }" @submit="createOrder" ref="formRef" class="checkout-order-box" action="">
              <div class="section-order-item">
                <label class="mb-md-3 mb-3" for="email"><span>＊</span>email </label>
                <VeeField
                  type="email"
                  name="email"
                  class="w-100 mb-md-3 mb-1 form-control"
                  id="email"
                  placeholder="email"
                  rules="email|required"
                  :class="{ 'is-invalid': errors['email'] }"
                  v-model="form.user.email"
                />
                <ErrorMessage name="email" class="invalid-feedback mb-2" />
              </div>
              <div class="section-order-item">
                <label class="mb-md-3 mb-3" for="yourname"> <span>＊</span>收件人姓名 </label>
                <VeeField
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="收件人姓名"
                  rules="required"
                  class="w-100 mb-md-3 mb-1 form-control"
                  type="text"
                  id="yourname"
                  name="姓名"
                  v-model="form.user.name"
                />
                <ErrorMessage name="姓名" class="invalid-feedback mb-2" />
              </div>
              <div class="section-order-item">
                <label class="mb-md-3 mb-3" for=""> <span>＊</span>收件人電話 </label>
                <VeeField
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="收件人電話"
                  rules="required|min:8|max:10"
                  class="w-100 mb-md-3 mb-1 form-control"
                  type="tel"
                  v-model="form.user.tel"
                  name="電話"
                />
                <ErrorMessage name="電話" class="invalid-feedback mb-2" />
              </div>
              <div class="section-order-item">
                <label class="mb-md-3 mb-3" for=""> <span>＊</span>收件人地址 </label>
                <VeeField
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入地址"
                  rules="required"
                  class="w-100 mb-md-3 mb-1 form-control"
                  type="text"
                  v-model="form.user.address"
                  name="地址"
                />
                <ErrorMessage name="地址" class="invalid-feedback mb-2" />
              </div>
              <div class="section-order-item">
                <label class="mb-md-3 mb-3" for="">留言</label>
                <textarea class="w-100 form-control" name="" id="" rows="10" v-model="form.message"></textarea>
              </div>
              <button @click="createOrder" class="checkout-pay-order-btn w-100">確認送出</button>
            </VeeForm>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="section-product-main pt-5 pb-5">
      <img class="img-fluid d-block mx-auto" src="../../assets/image/nocart.png" alt="clean cart" />
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";
import { useToastMessageStore } from "@/stores/toastMessage";
import { useFilters } from "@/composables/useFilters";
import Loadingitem from "@/components/Loadingitem.vue";

const VITE_API = import.meta.env.VITE_API;
const VITE_APIPATH = import.meta.env.VITE_APIPATH;

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const toastStore = useToastMessageStore();
const { currency: formatCurrency } = useFilters();

const formRef = ref(null);
const isLoading = ref(false);
const coupon_code = ref("");
const coupon_status = ref(false);

const form = reactive({
  user: {
    name: "",
    email: "",
    tel: "",
    address: "",
  },
  message: "",
});

const carts = computed(() => cartStore.carts);
const final_total = computed(() => cartStore.final_total);
const total = computed(() => cartStore.total);

const computedTotal = computed(() => {
  return carts.value.reduce((sum, item) => sum + item.final_total, 0);
});

function restInput(item) {
  if (item.qty <= 0) {
    item.qty = 1;
  }
  item.final_total = item.product.price * item.qty;
}

function removeCartItem(id) {
  const api = `${VITE_API}api/${VITE_APIPATH}/cart/${id}`;
  axios
    .delete(api)
    .then(() => {
      cartStore.getCart();
    })
    .catch((error) => {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "刪除失敗";
      alert(message);
    });
}

function createOrder() {
  const api = `${VITE_API}api/${VITE_APIPATH}/order`;
  const order = form;
  axios
    .post(api, { data: order })
    .then((response) => {
      cartStore.getCart();
      if (formRef.value) {
        formRef.value.resetForm();
      }
      router.push(`/myorder/${response.data.orderId}`);
    })
    .catch((error) => {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "建立訂單失敗";
      alert(message);
    });
}

function updateCart(item) {
  const api = `${VITE_API}api/${VITE_APIPATH}/cart/${item.id}`;
  const cart = {
    product_id: item.product_id,
    qty: item.qty,
  };
  axios
    .put(api, { data: cart })
    .then(() => {
      cartStore.getCart();
    })
    .catch((error) => {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "更新購物車失敗";
      alert(message);
    });
}

function addCouponCode() {
  const api = `${VITE_API}api/${VITE_APIPATH}/coupon`;
  const coupon = {
    code: coupon_code.value,
  };
  isLoading.value = true;
  axios
    .post(api, { data: coupon })
    .then((response) => {
      toastStore.pushMessage({
        style: "success",
        title: "加入優惠券",
        content: response.data.message,
      });
      cartStore.getCart();
      isLoading.value = false;
      coupon_status.value = true;
    })
    .catch((error) => {
      isLoading.value = false;
      const message = error.response && error.response.data
        ? error.response.data.message
        : "加入優惠券失敗";
      toastStore.pushMessage({
        style: "danger",
        title: "加入優惠券",
        content: message,
      });
    });
}

function deleteAllCarts() {
  isLoading.value = true;
  const api = `${VITE_API}api/${VITE_APIPATH}/carts`;
  axios
    .delete(api)
    .then(() => {
      cartStore.getCart();
      isLoading.value = false;
    })
    .catch((error) => {
      isLoading.value = false;
      const message = error.response && error.response.data
        ? error.response.data.message
        : "清除購物車失敗";
      alert(message);
    });
}

onMounted(() => {
  cartStore.getCart();
  const couponId = route.params.couponid;
  if (couponId) {
    coupon_code.value = couponId;
  }
});
</script>

<style scoped>
.form-floating > .form-control:focus,
.form-floating > .form-control:not(:placeholder-shown),
.form-floating > .form-control-plaintext:focus,
.form-floating > .form-control-plaintext:not(:placeholder-shown) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.cleanCartBtn {
  font-size: 16px;
  font-weight: 600;
  outline: 1px dashed rgb(190, 45, 45) !important;
}
.cleanCartBtn:hover {
  color: #fff;
  background-color: rgb(190, 45, 45);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
