/**
* Created by zhangxin on 2017/2/23.
*/
<template>
    <div>

    </div>
</template>
<style scoped>
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    export default{
        data(){
            return {
                
            }
        },
        components:{} ,
        methods:{
            
        },
        mounted(){
            let vm =this;
            vm.$http.post("apis/admin/logout.do").then((response)=>{
                if(response.ok) {
                    sessionStorage.clear();
                    vm.$router.push({path: '/login'});
                }else if(response.status=='404'){
                    sessionStorage.clear();
                    vm.$router.push({path: '/login'});
                }
            });
        }
    }
</script>