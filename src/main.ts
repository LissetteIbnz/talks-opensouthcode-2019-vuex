import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import { store } from "./store";
import { currency } from "./filters";

Vue.filter("currency", currency);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
