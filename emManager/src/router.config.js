/**
 * Created by zhangxin on 2017/2/20.
 */
import Login from './views/login/login.vue';
import Home from './views/home/home.vue';
import userManage from './views/userManage/userManage.vue';
import packageManage from './views/packgeManage/packageManage.vue';
import studyClue from './views/studyClue/studyClue.vue';
import realNameMatching from './views/realNameMatching/realNameMatching.vue';
import om from './views/om/om.vue';
import logout from './views/logout/logout.vue';
export default {
    mode: 'history',
    base: __dirname,
    routes:[
        {path:"",component:Login},
        {path:"/login",component:Login},
        {
            path:"/home",
            component:Home,
            children:[
                {
                    path:'userManage',
                    component:userManage
                },
                {
                    path:'packageManage',
                    component:packageManage
                },
                {
                    path:'studyClue',
                    component:studyClue
                },
                {
                    path:'realNameMatching',
                    component:realNameMatching
                },
                {
                    path:'om',
                    component:om
                }
            ]
        },
        {
            path:"/logout",
            component:logout
        }
    ]
}