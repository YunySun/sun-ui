import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { Popover } from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";
import "../src/components/lib/theme-chalk/index.css";
import { Popover, Overlay, Popup, Picker } from "./components/sun-ui";
import './assets/css/global.css'
// import { Picker } from "vant";
// import "vant/lib/index.css";

Vue.use(Popover).use(Overlay).use(Popup).use(Picker);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
