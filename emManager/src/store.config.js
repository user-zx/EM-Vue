/**
 * Created by zhangxin on 2017/3/1.
 */
export default {
    state:{
        count:0,
        userManager:{
            userId:""
        }
    },
    mutations:{
        addUser(state,params){
            state.count++;
        },
        updateUser(state,params){
            state.userManager.userId=params;
        },
        userInfo(state,params){
            state.userManager.userId=params;
        }
    }
}
