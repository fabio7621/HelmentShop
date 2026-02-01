<template>
  <div class="container">
    <VueLoading :active="isLoading" :z-index="1060" />
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ formatDate(item.create_at) }}</td>
            <td><span v-text="item.user ? item.user.email : ''"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in item.products" :key="product.id">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                付款狀態
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal(item)"
                >
                  檢視
                </button>
                <button
                  @click="openDelOrderModal(item)"
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <OrderModal
      :order="tempOrder"
      ref="ordermodalRef"
      @update-paid="updatePaid"
    />
    <DelModal
      @del-item="delOrder"
      ref="delboxRef"
      :item="tempOrder"
    />
    <Pagination :pages="pagination" @emit-pages="getOrder" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToastMessageStore } from "@/stores/toastMessage";
import { useFilters } from "@/composables/useFilters";
import DelModal from "@/components/DelModal.vue";
import OrderModal from "@/components/OrderModal.vue";
import Pagination from "@/components/Pagination.vue";

const VITE_API = import.meta.env.VITE_API;
const VITE_APIPATH = import.meta.env.VITE_APIPATH;

const toastStore = useToastMessageStore();
const { date: formatDate } = useFilters();
const ordermodalRef = ref(null);
const delboxRef = ref(null);

const orders = ref([]);
const tempOrder = ref({});
const pagination = ref({});
const isLoading = ref(false);

function getOrder(currentPage) {
  const page = currentPage || 1;
  const api = `${VITE_API}api/${VITE_APIPATH}/admin/orders?page=${page}`;
  isLoading.value = true;
  axios
    .get(api)
    .then((res) => {
      orders.value = res.data.orders;
      pagination.value = res.data.pagination;
      isLoading.value = false;
    })
    .catch((error) => {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "錯誤訊息";
      toastStore.pushMessage({
        style: "danger",
        title: "錯誤訊息",
        content: message,
      });
      isLoading.value = false;
    });
}

function openModal(item) {
  tempOrder.value = { ...item };
  ordermodalRef.value.openOderModal();
}

function openDelOrderModal(item) {
  tempOrder.value = { ...item };
  delboxRef.value.openModal();
}

function delOrder() {
  const url = `${VITE_API}api/${VITE_APIPATH}/admin/order/${tempOrder.value.id}`;
  axios
    .delete(url)
    .then(() => {
      delboxRef.value.hideModal();
      getOrder();
    });
}

function updatePaid(item) {
  const api = `${VITE_API}api/${VITE_APIPATH}/admin/order/${item.id}`;
  const paid = {
    is_paid: item.is_paid,
  };

  axios
    .put(api, { data: paid })
    .then((response) => {
      isLoading.value = false;
      ordermodalRef.value.closeOderModal();
      toastStore.pushMessage({
        style: "success",
        title: "更新付款狀態",
        content: response.data.message,
      });
      getOrder();
    })
    .catch((error) => {
      isLoading.value = false;
      const message = error.response && error.response.data
        ? error.response.data.message
        : "錯誤訊息";
      toastStore.pushMessage({
        style: "danger",
        title: "錯誤訊息",
        content: message,
      });
    });
}

onMounted(() => {
  getOrder();
});
</script>
