<template>
  <div class="container">
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openCouponModal(true)"
      >
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ formatDate(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelCouponModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal
      :coupon="tempCoupon"
      :is-new="isNew"
      ref="couponModalRef"
      @update-coupon="updateCoupon"
    />
    <DelModal :item="tempCoupon" ref="delModalRef" @del-item="delCoupon" />
    <Pagination :pages="pagination" @emit-pages="getCoupons" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useToastMessageStore } from "@/stores/toastMessage";
import { useFilters } from "@/composables/useFilters";
import Pagination from "@/components/Pagination.vue";
import CouponModal from "@/components/CouponModal.vue";
import DelModal from "@/components/DelModal.vue";

const VITE_API = import.meta.env.VITE_API;
const VITE_APIPATH = import.meta.env.VITE_APIPATH;

const toastStore = useToastMessageStore();
const { date: formatDate } = useFilters();
const couponModalRef = ref(null);
const delModalRef = ref(null);

const coupons = ref([]);
const tempCoupon = ref({
  title: "",
  is_enabled: 0,
  percent: 100,
  code: "",
});
const isLoading = ref(false);
const isNew = ref(false);
const pagination = ref({});

function openCouponModal(newMode, item) {
  isNew.value = newMode;
  if (isNew.value) {
    tempCoupon.value = {
      due_date: new Date().getTime() / 1000,
    };
  } else if (item) {
    tempCoupon.value = { ...item };
  }
  couponModalRef.value.openModal();
}

function openDelCouponModal(item) {
  tempCoupon.value = { ...item };
  delModalRef.value.openModal();
}

function getCoupons(page) {
  const pageNum = page || 1;
  const api = `${VITE_API}api/${VITE_APIPATH}/admin/coupons?page=${pageNum}`;
  axios
    .get(api)
    .then((res) => {
      coupons.value = res.data.coupons;
      pagination.value = res.data.pagination;
    })
    .catch((error) => {
      isLoading.value = false;
      const message = error.response && error.response.data
        ? error.response.data.message
        : "取得優惠券失敗";
      toastStore.pushMessage({
        style: "danger",
        title: "取得優惠券",
        content: message,
      });
    });
}

function updateCoupon(updatedCoupon) {
  let api = `${VITE_API}api/${VITE_APIPATH}/admin/coupon`;
  let httpMethod = "post";
  let data = updatedCoupon;

  if (!isNew.value) {
    api = `${VITE_API}api/${VITE_APIPATH}/admin/coupon/${tempCoupon.value.id}`;
    httpMethod = "put";
    data = tempCoupon.value;
  }

  axios[httpMethod](api, { data })
    .then((response) => {
      isLoading.value = false;
      toastStore.pushMessage({
        style: "success",
        title: "優惠券",
        content: response.data.message,
      });
      getCoupons();
      couponModalRef.value.hideModal();
    })
    .catch((error) => {
      isLoading.value = false;
      const message = error.response && error.response.data
        ? error.response.data.message
        : "操作失敗";
      toastStore.pushMessage({
        style: "danger",
        title: "優惠券",
        content: message,
      });
    });
}

function delCoupon() {
  const api = `${VITE_API}/api/${VITE_APIPATH}/admin/coupon/${tempCoupon.value.id}`;
  axios
    .delete(api)
    .then((response) => {
      isLoading.value = false;
      toastStore.pushMessage({
        style: "success",
        title: "刪除優惠券",
        content: response.data.message,
      });
      delModalRef.value.hideModal();
      getCoupons();
    })
    .catch((error) => {
      isLoading.value = false;
      const message = error.response && error.response.data
        ? error.response.data.message
        : "刪除失敗";
      toastStore.pushMessage({
        style: "danger",
        title: "刪除優惠券",
        content: message,
      });
    });
}

onMounted(() => {
  getCoupons();
});
</script>
