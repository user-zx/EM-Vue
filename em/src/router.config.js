import Login from "./components/personal/Login.vue"
import Home from "./components/personal/Home.vue" 
import forgetPassword from "./components/personal/forgetPassword.vue" 
import register from "./components/personal/register.vue"
export default  {
    routes: [   
        {path:"/login",component: Login},
        {path:'/home',component:Home},
       	{path:'/personal/forgetPassword',component:forgetPassword},
       	{path:'/personal/register',component:register},
    ],
} 




