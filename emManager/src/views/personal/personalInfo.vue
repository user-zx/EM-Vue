/**
* Created by zhangxin on 2017/2/28.
*/
<template>
    <div class="people-info">
        <div class="photo">
            <img src="../realNameMatching/tabContent/images/photo.png" alt="头像" />
        </div>
        <p class="text-center">{{userName}}</p>
        <div class="form-box">
            <div class="form-horizontal">
                <div class="form-group">
                    <labeL class="col-md-4 control-label">原密码：</labeL>
                    <div class="col-md-4">
                        <input class="form-control" type="password" v-model="params.oldPassword" placeholder="请您输入原密码" />
                    </div>
                </div>
                <div class="form-group">
                    <labeL class="col-md-4 control-label">新密码：</labeL>
                    <div class="col-md-4">
                        <input class="form-control" type="password" v-model="params.newPassword" placeholder="请您输入新密码" />
                    </div>
                </div>
                <div class="form-group">
                    <labeL class="col-md-4 control-label">确认密码：</labeL>
                    <div class="col-md-4">
                        <input class="form-control" type="password" v-model="doublePassword" placeholder="请您确认密码" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-4 col-md-offset-4 text-center">
                        <button class="btn btn-em" type="button" @click="update()">提交</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .people-info{
        .photo{
            margin:0 auto 10px;
            width:85px;
            height:85px;
            line-height: 85px;
            text-align: center;
            border-radius: 50px;
            box-shadow: 0 0 10px rgba(0,0,0,.2);
        }
        p.text-center:nth-of-type(2){
            margin-bottom: 25px;
        }
    }
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
                userName:sessionStorage.getItem("userAccount"),
                updateUrl:"../apis/admin/modifyPassword",
                params:{
                    oldPassword:"",
                    newPassword:""
                },
                doublePassword:""
            }
        },
        components:{} ,
        methods:{
            update(){
                let vm= this;
                vm.$http.post(vm.updateUrl,vm.params).then((response)=>{
                    if(response.ok){
                        if(response.data.success){
                            console.log(response.data);
                            vm.successAlert("密码修改成功！");
                        }else{
                            vm.errorAlert(response.data.message);
                        }
                    }
                }).then((error)=>{
                   console.log(error);
                });
            },
            errorAlert(errorContent){
                $("#errorAlert").find(".content").text(errorContent).parent().show();
                setTimeout(function () {
                    $("#errorAlert").hide();
                },2000);
            },
            successAlert(successContent){
                $("#successAlert").find(".content").text(successContent).parent().show();
                setTimeout(function () {
                    $("#successAlert").hide();
                },2000);
            }
        },
        mounted(){

        }
    }
</script>