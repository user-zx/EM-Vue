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
import personalInfo from './views/personal/personalInfo.vue';
import success from './views/userManage/addUser/success.vue';
import addPackageSuccess from './views/packgeManage/addPackage/success.vue';
import saveOperationUserSuccess from './views/om/addUser/success.vue';
import getMatching from './views/realNameMatching/getMatching.vue';
import matchingTab from './views/realNameMatching/tab.vue';
import notFound from './compoents/errorPage/404.vue';
import welcomeTo from './views/welcome/welcome.vue';
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
                    path:'welcome',
                    component:welcomeTo
                },
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
                    component:realNameMatching,
                    children:[
                        {
                            path:'getMatching',
                            component:getMatching
                        },
                        {
                            path:'matchingTab',
                            component:matchingTab
                        }
                    ]
                },
                {
                    path:'om',
                    component:om
                },
                {
                    path:'personalInfo',
                    component:personalInfo

                },
                {
                    path:'success',
                    component:success
                },
                {
                    path:'addPackageSuccess',
                    component:addPackageSuccess
                },
                {
                    path:"saveOperationUserSuccess",
                    component:saveOperationUserSuccess
                }
            ]
        },
        {
            path:"/logout",
            component:logout
        },
        {
            path:"*",
            component:notFound
        }
    ]
}