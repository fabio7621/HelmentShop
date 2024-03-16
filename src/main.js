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
