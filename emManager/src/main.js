import Vue from 'vue';
import App from './App.vue';
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';
import routerConfig from './router.config';
import 'bootstrap';
import "vue-style-loader!css-loader!sass-loader!bootstrap/dist/css/bootstrap.min.css";
import "vue-style-loader!css-loader!sass-loader!./assets/css/style.scss";
Vue.config.debug=true;
Vue.use(vueRouter);
Vue.use(vueResource);
const router =new vueRouter(routerConfig);
new Vue({
  router,
}).$mount("#app");
