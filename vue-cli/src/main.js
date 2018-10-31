import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import Vuelidate from "vuelidate";

import 'element-ui/lib/theme-chalk/index.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router";

Vue.use(Vuelidate);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
