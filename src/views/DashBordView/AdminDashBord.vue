<template>
  <div class="admin-layout">
    <NavbarLayout />
    <div class="admin-main">
      <header class="admin-header">
        <div>
          <h1 class="page-title">{{ currentPageTitle }}</h1>
          <p class="page-subtitle">歡迎回來，管理您的電商資料</p>
        </div>
        <div class="header-right">
          <div class="header-user">
            <div class="user-avatar">
              <i class="bi bi-person-fill"></i>
            </div>
            <div class="user-info">
              <div class="user-name">Administrator</div>
              <div class="user-role">後台管理員</div>
            </div>
          </div>
        </div>
      </header>

      <main class="admin-content">
        <div class="content-card" v-if="checkSuccess">
          <router-view></router-view>
        </div>
        <div class="content-loading" v-else>
          <div class="spinner"></div>
          <p>驗證登入中...</p>
        </div>
      </main>
    </div>
    <ToastMessages />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import ToastMessages from "@/components/ToastMessages.vue";
import NavbarLayout from "@/components/NavbarLayout.vue";
import { useToastMessageStore } from "@/stores/toastMessage";

const router = useRouter();
const route = useRoute();
const toastStore = useToastMessageStore();

const checkSuccess = ref(false);

const pageTitleMap = {
  "/dashbord/product": "產品管理",
  "/dashbord/order": "訂單管理",
  "/dashbord/coupons": "優惠券管理",
  "/dashbord/article": "文章管理",
};

const currentPageTitle = computed(() => pageTitleMap[route.path] || "後台儀表板");

function checklogin() {
  const api = `${import.meta.env.VITE_API}api/user/check`;
  axios
    .post(api)
    .then(() => {
      checkSuccess.value = true;
    })
    .catch((err) => {
      const message = err.response && err.response.data
        ? err.response.data.message
        : "驗證失敗，請重新登入";
      toastStore.pushMessage({
        style: "danger",
        title: "錯誤訊息",
        content: message,
      });
      router.push("/login");
    });
}

onMounted(() => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)fabio20token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  axios.defaults.headers.common.Authorization = token;
  checklogin();
});
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f4f6fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", sans-serif;
}

.admin-main {
  margin-left: 240px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.admin-header {
  background: #ffffff;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1f2e;
  margin: 0 0 4px;
}

.page-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px 8px 8px;
  background: #f4f6fa;
  border-radius: 999px;
  transition: background 0.2s ease;
}

.header-user:hover {
  background: #e9ecf3;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f8cff, #3b6fe0);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1f2e;
  line-height: 1.2;
}

.user-role {
  font-size: 0.75rem;
  color: #6b7280;
}

.admin-content {
  flex: 1;
  padding: 32px;
}

.content-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  min-height: calc(100vh - 180px);
}

.content-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #4f8cff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .admin-main {
    margin-left: 72px;
  }
  .admin-header {
    padding: 16px 20px;
  }
  .admin-content {
    padding: 20px;
  }
  .content-card {
    padding: 20px;
    border-radius: 12px;
  }
  .user-info {
    display: none;
  }
  .page-title {
    font-size: 1.25rem;
  }
}
</style>
