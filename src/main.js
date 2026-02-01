import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CKEditor from "@ckeditor/ckeditor5-vue";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

// 建立 Vue 應用實例
const app = createApp(App);

// 載入 Loading 元件
import Loading from "vue-loading-overlay";

// 註冊插件
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);

// 註冊全域元件
app.component("VueLoading", Loading);

// 掛載應用
app.mount("#app");

// 註冊全域過濾器
import { date, currency } from "@/methods/filters";
app.config.globalProperties.$filters = {
  date,
  currency,
};

// VeeValidate 表單驗證設定
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import * as AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

// 載入所有 vee-validate 驗證規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// 設定 vee-validate 語系
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

// 設定預設語系為繁體中文
setLocale("zh_TW");

// 註冊 VeeValidate 元件
app.component("VeeForm", Form);
app.component("VeeField", Field);
app.component("ErrorMessage", ErrorMessage);
