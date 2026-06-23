<template>
  <div class="container">
    <VueLoading :active="isLoading" :z-index="1060" />
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的頁面
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th style="width: 200px">標題</th>
          <th style="width: 200px">作者</th>
          <th>描述</th>
          <th style="width: 100px">建立時間</th>
          <th style="width: 100px">是否公開</th>
          <th style="width: 120px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ formatDate(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="getArticle(article.id)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelArticleModal(article)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ArticleModal
      ref="articleModalRef"
      :article="tempArticle"
      :is-new="isNew"
      @update-article="updateArticle"
    />
    <DelModal :item="tempArticle" ref="delModalRef" @del-item="delArticle" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useToastMessageStore } from "@/stores/toastMessage";
import { useFilters } from "@/composables/useFilters";
import ArticleModal from "@/components/ArticleModal.vue";
import DelModal from "@/components/DelModal.vue";

const VITE_API = import.meta.env.VITE_API;
const VITE_APIPATH = import.meta.env.VITE_APIPATH;

const toastStore = useToastMessageStore();
const { date: formatDate } = useFilters();
const articleModalRef = ref(null);
const delModalRef = ref(null);

const articles = ref([]);
const isLoading = ref(false);
const isNew = ref(false);
const tempArticle = ref({});
const currentPage = ref(1);

function getArticles(page) {
  const pageNum = page || 1;
  currentPage.value = pageNum;
  const api = `${VITE_API}api/${VITE_APIPATH}/admin/articles?page=${pageNum}`;
  isLoading.value = true;
  axios
    .get(api)
    .then((response) => {
      isLoading.value = false;
      if (response.data.success) {
        articles.value = response.data.articles;
      }
    })
    .catch((error) => {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "取得文章資訊失敗";
      alert(message);
      isLoading.value = false;
      toastStore.pushMessage({
        title: "取得文章資訊失敗",
        style: "danger",
        content: message,
      });
    });
}

function getArticle(id) {
  const api = `${VITE_API}api/${VITE_APIPATH}/admin/article/${id}`;
  isLoading.value = true;
  axios
    .get(api)
    .then((response) => {
      isLoading.value = false;
      openModal(false, response.data.article);
      isNew.value = false;
    })
    .catch((error) => {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "取得文章失敗";
      alert(message);
      isLoading.value = false;
      toastStore.pushMessage({
        title: "取得文章資訊失敗",
        style: "danger",
        content: message,
      });
    });
}

function openModal(newMode, item) {
  if (newMode) {
    tempArticle.value = {
      isPublic: false,
      create_at: new Date().getTime() / 1000,
      tag: [],
    };
    isNew.value = true;
  } else if (item) {
    tempArticle.value = { ...item };
    isNew.value = false;
  }
  articleModalRef.value.openModal();
}

function updateArticle(item) {
  tempArticle.value = item;
  let api = `${VITE_API}api/${VITE_APIPATH}/admin/article`;
  let httpMethod = "post";
  let status = "新增貼文";
  isLoading.value = true;

  if (!isNew.value) {
    api = `${VITE_API}api/${VITE_APIPATH}/admin/article/${tempArticle.value.id}`;
    httpMethod = "put";
    status = "更新貼文";
  }

  axios[httpMethod](api, { data: tempArticle.value })
    .then((response) => {
      isLoading.value = false;
      toastStore.pushMessage({
        style: "success",
        title: status,
        content: response.data.message,
      });
      articleModalRef.value.hideModal();
      getArticles(currentPage.value);
    })
    .catch((error) => {
      isLoading.value = false;
      const message = error.response && error.response.data
        ? error.response.data.message
        : "操作失敗";
      toastStore.pushMessage({
        style: "danger",
        title: status,
        content: message,
      });
    });
}

function openDelArticleModal(item) {
  tempArticle.value = { ...item };
  delModalRef.value.openModal();
}

function delArticle() {
  const url = `${VITE_API}/api/${VITE_APIPATH}/admin/article/${tempArticle.value.id}`;
  isLoading.value = true;
  axios
    .delete(url)
    .then((response) => {
      isLoading.value = false;
      toastStore.pushMessage({
        style: "success",
        title: "刪除貼文",
        content: response.data.message,
      });
      delModalRef.value.hideModal();
      getArticles(currentPage.value);
    })
    .catch((error) => {
      isLoading.value = false;
      const message = error.response && error.response.data
        ? error.response.data.message
        : "刪除失敗";
      toastStore.pushMessage({
        style: "danger",
        title: "刪除貼文",
        content: message,
      });
    });
}

onMounted(() => {
  getArticles();
});
</script>
