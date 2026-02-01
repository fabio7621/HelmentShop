<template>
  <div class="container">
    <div class="text-end mt-4">
      <button type="button" @click="openModal('new')" class="btn btn-primary">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <VueLoading :active="isLoading" :z-index="1060" />
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-pages="getData" />
    <ProductModal
      ref="productboxRef"
      :product="catchProduct"
      :is-new="isNew"
      @update="getData"
    />
    <DelModal
      @del-item="delProduct"
      ref="delboxRef"
      :item="catchProduct"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useToastMessageStore } from "@/stores/toastMessage";
import Pagination from "@/components/Pagination.vue";
import ProductModal from "@/components/ProductModal.vue";
import DelModal from "@/components/DelModal.vue";

const VITE_API = import.meta.env.VITE_API;
const VITE_APIPATH = import.meta.env.VITE_APIPATH;

const toastStore = useToastMessageStore();
const productboxRef = ref(null);
const delboxRef = ref(null);

const products = ref([]);
const catchProduct = reactive({
  imagesUrl: [],
});
const isNew = ref(false);
const pagination = ref({});
const isLoading = ref(false);

function getData(page) {
  const pageNum = page || 1;
  const api = `${VITE_API}/api/${VITE_APIPATH}/admin/products?page=${pageNum}`;
  isLoading.value = true;
  axios
    .get(api)
    .then((res) => {
      products.value = res.data.products;
      pagination.value = res.data.pagination;
      isLoading.value = false;
      toastStore.pushMessage({
        style: "success",
        title: "成功取得產品資訊",
        content: res.data.message,
      });
    })
    .catch((err) => {
      isLoading.value = false;
      const message = err.response && err.response.data
        ? err.response.data.message
        : "取得產品資訊失敗";
      toastStore.pushMessage({
        style: "danger",
        title: "取得產品資訊失敗",
        content: message,
      });
    });
}

function openModal(mode, item) {
  if (mode === "new") {
    catchProduct.imagesUrl = [];
    Object.assign(catchProduct, { imagesUrl: [] });
    isNew.value = true;
    productboxRef.value.openM();
  } else if (mode === "edit" && item) {
    Object.assign(catchProduct, { ...item });
    isNew.value = false;
    productboxRef.value.openM();
  }
}

function openDelModal(item) {
  Object.assign(catchProduct, { ...item });
  delboxRef.value.openModal();
}

function delProduct() {
  const api = `${VITE_API}api/${VITE_APIPATH}/admin/product/${catchProduct.id}`;
  axios
    .delete(api)
    .then(() => {
      delboxRef.value.hideModal();
      getData();
    })
    .catch((err) => {
      const message = err.response && err.response.data
        ? err.response.data.message
        : "刪除失敗";
      alert(message);
    });
}

onMounted(() => {
  getData();
});
</script>
