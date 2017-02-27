/**
 * Created by zhangxin on 2017/2/22.
 * 公用方法
 */
export default {
    post:function(urls, params, successFun, errorFun){
        this.$http.post(urls, params).then((response) => {
            if (response.ok) {
                successFun(response.data);
            } else {
                errorFun(response);
            }
        });
    }
}