import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/lib/bootstrap-5/js/bootstrap.bundle.min.js";
import "./assets/lib/bootstrap-5/css/bootstrap.min.css";

import "./assets/css/index.css";

createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
