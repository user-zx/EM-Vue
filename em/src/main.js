import Vue from 'vue';
import App from './App.vue'; 
import VueRouter from 'vue-router';
import routerConfig from "./router.config.js";
import vueResource from "vue-resource";
import 'bootstrap';  
import "vue-style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css";
import "vue-style-loader!css-loader!./assets/style/main.css"; 
import Vuex from "vuex";
import storeConfig from "./store.config.js";
import "babel-polyfill";  
              
   
Vue.config.debug = true;   
//调用   
Vue.use(VueRouter);
Vue.use(vueResource); 
Vue.use(Vuex);
Vue.http.interceptors.push((request, next) => {
   
    request.method = 'POST';
    next((response) => {
      //console.log(response); 
      if(response.ok){
        if(response.data.success){
          return response;
        }else if(response.data.status=='401'){
            console.log(response.data.status);
            window.location.href="/"; 
        }
      }else{
        console.log("请求错误，请重试！")
      }
    });
});

const router = new VueRouter(routerConfig);
const store = new Vuex.Store(storeConfig);
 
const app =  new Vue({	
	store,
	router,
}).$mount("#app");
   

