import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/all.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import CKEditor from "@ckeditor/ckeditor5-vue";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

import Loading from "vue-loading-overlay"; //loading

app.use(createPinia());
app.use(router);

app.mount("#app");

app.use(VueAxios, axios);
app.component("VueLoading", Loading);
app.use(CKEditor);

import { date, currency } from "@/methods/filters";
//引入另外建立的方法且在全域上用
app.config.globalProperties.$filters = {
  date,
  currency,
};
app.component("VueLoading", Loading);

import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import * as AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
/**
 * 這裡是將所有 vee-validate 的規則載入
 */
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

/**
 * 這裡是設定 vee-validate 的語系
 */
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale("zh_TW");
app.component("VueLoading", Loading);
app.component("VeeForm", Form);
app.component("VeeField", Field);
app.component("ErrorMessage", ErrorMessage);
