import Vue from 'vue' 
import App from './App.vue' 
import VueRouter from 'vue-router'
import routerConfig from "./router.config.js" 
import vueResource from "vue-resource"
import 'bootstrap/dist/js/bootstrap'

 
 
//开启debug模式  
Vue.config.debug = true;  
//调用   
Vue.use(VueRouter);
Vue.use(vueResource);  
                    
const router = new VueRouter(routerConfig); 
 
const app =  new Vue({
	
	data:{
		aa:"bb"
	},
	router,
}).$mount("#app");
   



/*const app = new Vue({
	el:"#app",
	data:{
		//aa:'bab'  
	},     
	template:"<app>",
	components:{App}
})*/