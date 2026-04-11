# HelmentShop 安全帽電商網站

一個以 Vue 3 打造的前後台整合式電商網站，主題為安全帽商品販售。整合 RESTful API、會員驗證、購物車、結帳、優惠券、後台管理等完整電商流程。

## 線上展示

- **前台**：<https://fabio7621.github.io/HelmentShop/>
- **後台**：<https://fabio7621.github.io/HelmentShop/#/login>

> 後台測試帳號如有需要，請透過下方聯絡資訊詢問。

## 技術棧

| 分類 | 使用技術 |
| --- | --- |
| 前端框架 | Vue 3 (Options API) |
| 建置工具 | Vite 6 |
| 狀態管理 | Pinia |
| 路由 | Vue Router 4 |
| HTTP 請求 | Axios / Vue-Axios |
| UI 樣式 | Bootstrap 5、Bootstrap Icons、SCSS |
| 表單驗證 | VeeValidate 4 |
| 輪播元件 | Swiper |
| 富文本編輯器 | CKEditor 5 |
| Loading 動畫 | vue-loading-overlay |
| 部署 | GitHub Pages (gh-pages) |

## 功能特色

### 前台

- 首頁輪播、商品分類展示
- 商品列表與搜尋、商品詳細頁
- 購物車新增 / 修改 / 刪除
- 優惠券折抵
- 結帳流程與訂單送出
- 訂單查詢
- 部落格文章列表與內頁
- 關於我們頁面
- 響應式 RWD 設計

### 後台

- 管理員登入 (Token 驗證)
- 商品管理 (新增 / 編輯 / 刪除 / 上下架)
- 訂單管理 (檢視 / 狀態更新)
- 優惠券管理
- 文章管理 (CKEditor 富文本)
- Dashboard 資料統計

## 專案結構

```
src/
├── assets/          # 圖片、SCSS 樣式
├── components/      # 共用元件 (Navbar、Footer、Modal...)
├── router/          # 路由設定
├── stores/          # Pinia Store
├── views/
│   ├── FrontView/   # 前台頁面
│   └── DashBordView/# 後台頁面
└── main.js
```

## 安裝與啟動

```bash
# 安裝套件
npm install

# 本地開發
npm run dev

# 打包建置
npm run build

# 預覽打包結果
npm run preview

# 部署至 GitHub Pages
npm run deploy
```

## API 串接

專案串接六角學院提供的 RESTful API，實作完整電商流程，包含：

- 商品 CRUD
- 購物車操作
- 訂單建立與查詢
- 優惠券驗證
- 管理員登入與 Token 驗證

---

## 聯絡資訊

- 履歷：<https://www.cakeresume.com/d6200121a>
- Email：d6200121a@gmail.com
- LINE：vida0701
- Phone：0932885689
