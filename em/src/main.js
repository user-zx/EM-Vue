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
const router = new VueRouter(routerConfig);
const store = new Vuex.Store(storeConfig) 
const app =  new Vue({	
	data:{
		aa:"bb"
	},
	store,
	router,
	mounted(){
		//console.log($(".publicClass"));
		//console.log($(window).height());
	}
}).$mount("#app");
   



/*const app = new Vue({
	el:"#app",
	data:{
		//aa:'bab'  
	},     
	template:"<app>",
	components:{App}
})*/