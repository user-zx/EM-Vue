<template>
    <div id="login" class="login">
        <nav class="navbar" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="">
                        <img src="./images/logo.png" alt="logo" />
                    </a>
                </div>
                <div class="navbar navbar-right">
                    <img src="./images/tel.png" alt="电话：" />
                    <span>400-963-7877</span>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <img src="./images/left_silde.png" alt="宣传图" />
                </div>
                <div class="col-md-5">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <div class="input-icon">
                                <i class="glyphicon glyphicon-user"></i>
                                <input type="text" class="form-control" v-model="item.account" placeholder="输入手机号" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-icon">
                                <i class="glyphicon glyphicon-lock"></i>
                                <input type="password" class="form-control" v-model="item.password" placeholder="密码" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-control-static">
                                <label>
                                    <input type="checkbox"/>
                                    记住密码
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <!--<login-button></login-button>-->
                            <button class="btn btn-em btn-radius" @click="generateKey()">登录</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p id="errorAlert" class="alert alert-danger">
            <a href="javascript:void(0);" class="close" @click="colseAlert()">&times;</a>
            {{errorText}}
        </p>
    </div>
</template>
<style lang="scss">
    %full{height:100%}
    html,body,#app,.login{@extend %full}
</style>
<style lang="scss" scoped>
    nav.navbar{
        margin-bottom: 50px;
        .navbar-right{
            padding:15px 0;
            color:#ffffff;
            font-size:20px;
            span{
                color:#ffffff;
                font-size: 20px;
            }
        }
    }
    .login{
        background-image: url(./images/bg.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        .form-horizontal{
            padding: 60px;
            background: rgba(255,255,255,.5);
            border-radius: 10px;
            .form-control-static{
                padding-left:10px;
                font-size: 13px;
            }
            .form-group{
                .input-icon {
                    .form-control{
                        height:45px;
                        border-radius:22px;
                        font-size:16px;
                        color:#333333;
                        background-color: rgba(255,255,255,.5);
                    }
                    i{margin-top:0;
                        line-height:45px}
                }
            .btn{width:100%;}
            }
        }
    }
</style>
<script>
    import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
//    import util from "../../util/util";
    import '../../assets/vendor/security';
//    import loginButton from './components/loginButton.vue';
    import router from "vue-router";
    import errorModal from '../../compoents/modal/errorModal/errorModal.vue';
    export default{
        data(){
            return {
                errorText:"",
                loginUrl:"apis/admin/login.do",
                generateKeyUrl:'apis/generateKey.do',
                params:{
                    account:"",
                    password:"",
                    rememberMe:false
                },
                item:{
                    account:"",
                    password:"",
                    publicKeyExponent:"",
                    publicKeyModulus:"",
                }
            }
        },
        components:{},
//        created () {
//            this.asFun()
//        },
//        watch:{
//            '$router':'asFun'
//        },
        methods:{
//            asFun(){
//
//            },
            post(urls, params, successFun, errorFun){
                this.$http.post(urls, params).then((response) => {
                    if (response.ok) {
                        successFun(response.data);
                    } else {
                        errorFun(response);
                    }
                });
            },
            generateKey() {
                let vm=this;
                let params='';
                if((vm.item.account!=null||vm.item.account!=""||vm.item.account!=undefined)&&(vm.item.password!=null||vm.item.password!=""||vm.item.password!=undefined)){
                    vm.post(vm.generateKeyUrl, params,function (result) {
                        vm.item.publicKeyExponent=result.data.publicKeyExponent;
                        vm.item.publicKeyModulus=result.data.publicKeyModulus;
                        let account = vm.item.account;
                        let password = vm.item.password;
                        if(account && password){
                            vm.login();
                            return false;
                        }else{
                            vm.errorText="用户名或密码不能为空!";
                            $("#errorAlert").show();
                            return false;
                        }
                    },function (error) {
                        console.log(error);
                    });
                }
            },
            login() {
                let vm  = this;
                let publicKeyExponent= vm.item.publicKeyExponent;
                let publicKeyModulus= vm.item.publicKeyModulus;
                if(publicKeyExponent==""&&publicKeyModulus==""){
                    location.href='/';
                    return;
                }
                RSAUtils.setMaxDigits(200);
                let key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
                let encrypedPwd = RSAUtils.encryptedString(key,vm.item.password);
                vm.params.account=vm.item.account;
                vm.params.password=encrypedPwd;
                vm.post(vm.loginUrl, vm.params,function(result){
                    if(result.success){
                        vm.$router.push({path:"/home/welcome"});
                    }else{
                        vm.errorText=result.message;
                        $("#errorAlert").show();
                         return false;
                    }
                },function (error) {                 
                    console.log(error);
                });
            },
            colseAlert(){
                $("#errorAlert").hide();
            }
        },
        mounted(){
            let vm=this;
            $("input[type=checkbox]").iCheck({
                checkboxClass : 'icheckbox_square-blue',
            }).on("ifChecked",function () {
                vm.params.rememberMe=true;
            }).on("ifUnchecked",function () {
                vm.params.rememberMe=false;
            });
        }
    }
</script>