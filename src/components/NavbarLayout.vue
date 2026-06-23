<template>
  <aside class="admin-sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-brand">
      <i class="bi bi-shield-fill-check brand-icon"></i>
      <span class="brand-text">HelmetShop</span>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="nav-link"
      >
        <i :class="['bi', item.icon]"></i>
        <span class="nav-text">{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <button class="logout-btn" @click="handleLogout">
        <i class="bi bi-box-arrow-right"></i>
        <span class="nav-text">登出</span>
      </button>
    </div>

    <button class="collapse-toggle" @click="isCollapsed = !isCollapsed">
      <i :class="['bi', isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left']"></i>
    </button>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const isCollapsed = ref(false);

const navItems = [
  { to: "/dashboard/product", label: "產品管理", icon: "bi-box-seam" },
  { to: "/dashboard/order", label: "訂單管理", icon: "bi-receipt" },
  { to: "/dashboard/coupons", label: "優惠券", icon: "bi-ticket-perforated" },
  { to: "/dashboard/article", label: "文章貼文", icon: "bi-file-earmark-text" },
];

function handleLogout() {
  const api = `${import.meta.env.VITE_API}logout`;
  axios
    .post(api)
    .then(() => {
      document.cookie = "fabio20token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      router.push("/");
    })
    .catch((error) => {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "登出失敗";
      alert(message);
    });
}
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1f2e 0%, #242b3d 100%);
  color: #e4e6eb;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.08);
  transition: width 0.3s ease;
  z-index: 1000;
}

.admin-sidebar.collapsed {
  width: 72px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 16px;
}

.brand-icon {
  font-size: 1.75rem;
  color: #4f8cff;
  flex-shrink: 0;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
}

.admin-sidebar.collapsed .brand-text,
.admin-sidebar.collapsed .nav-text {
  opacity: 0;
  width: 0;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 12px;
}

.sidebar-nav .nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  color: #a0a4b1;
  text-decoration: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-nav .nav-link i {
  font-size: 1.2rem;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.sidebar-nav .nav-link:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  transform: translateX(2px);
}

.sidebar-nav .nav-link.active {
  background: linear-gradient(135deg, #4f8cff 0%, #3b6fe0 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(79, 140, 255, 0.3);
}

.sidebar-footer {
  padding: 16px 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 16px;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #a0a4b1;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
}

.logout-btn i {
  font-size: 1.2rem;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
}

.collapse-toggle {
  position: absolute;
  top: 28px;
  right: -14px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #4f8cff;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.collapse-toggle:hover {
  transform: scale(1.1);
}

.nav-text {
  transition: opacity 0.2s ease;
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 72px;
  }
  .admin-sidebar .brand-text,
  .admin-sidebar .nav-text {
    opacity: 0;
    width: 0;
  }
  .collapse-toggle {
    display: none;
  }
}
</style>
