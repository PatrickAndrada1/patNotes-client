import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./index.css";
// import './assets/main.css'
// import VueSweetalert2 from "vue-sweetalert2";


const app = createApp(App);

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

// app.use(VueSweetalert2);
app.use(router);
app.use(pinia);

app.mount("#app");
