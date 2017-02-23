import Login from "./components/personal/Login.vue"
import Home from "./components/personal/Home.vue"
import forgetPassword from "./components/personal/forgetPassword.vue"
import register from "./components/personal/register.vue"
import notPage from "./components/personal/404.vue"
import sellClue from "./components/views/sellClue.vue"
import myCollect from "./components/views/myCollect.vue"
import autoMatching from "./components/views/autoMatching.vue"
import viewLog from "./components/views/viewLog.vue"
import recycle from "./components/views/recycle.vue"
import set from "./components/views/set.vue"
export default {
    mode:"history",
    base:__dirname, 
    routes: [  
        { path: "/", component: Login },
        { path: '/home', component: Home ,children:[
        	{path:'sellClue',component:sellClue},
        	{path:'myCollect',component:myCollect},
        	{path:'autoMatching',component:autoMatching},
        	{path:'viewLog',component:viewLog},
        	{path:'recycle',component:recycle},
        	{path:'set',component:set},
        ]}, 
        { path: '/personal/forgetPassword', component: forgetPassword },
        { path: '/personal/register', component: register },
        { path: '*', component: notPage}, 
    ],
}
