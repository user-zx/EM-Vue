import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';
import Vuex from 'vuex';
import routerConfig from './router.config';
import vueConfig from './store.config';
import 'bootstrap';
import "vue-style-loader!css-loader!sass-loader!bootstrap/dist/css/bootstrap.min.css";
import "vue-style-loader!css-loader!sass-loader!./assets/css/style.scss";
Vue.config.debug=true;
Vue.use(vueRouter);
Vue.use(vueResource);
Vue.use(Vuex);
const router =new vueRouter(routerConfig);
const store = new Vuex.Store(vueConfig);
Vue.http.interceptors.push((request, next) => {
    request.method = 'POST';
    next((response) => {
      if(response.ok){
        if(response.data.success){
          return response;
        }else if(response.data.status=='401'){
        }
      }
    });
});
new Vue({
  router,
    store
}).$mount("#app");
