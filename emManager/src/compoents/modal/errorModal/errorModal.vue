/**
* Created by zhangxin on 2017/2/23.
*/
<template>
    <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="errorModalLabel">
                        提示
                    </h4>
                </div>
                <div class="modal-body">
                    <p class="alert alert-error">
                        {{errorMsg}}
                    </p>
                </div>
            </div>
        </div>
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
               errorMsg:"",
            }
        },
        components:{} ,
        methods:{
            resetAlert(msg){
                this.errorMsg=msg;
            }
        },
        mounted(){

        },
        computed:{

        }
    }
</script>