<template>
	<div class="login">
		<div class="login_div">
			
		</div>
		<div class="login_input">
			<img src="../../assets/images/loginWord.png"  alt="">
			<label>
				<img src="../../assets/images/login_user.png"  alt="">
				<input type="text" name="" class="form-control" v-model="item.account">
			</label>
			<label>
				<img src="../../assets/images/login_password.png"  alt="">
				<input type="password" name="" class="form-control" v-model="item.password">
			</label>
			 
			<p class="clear login_p_one">
				<label> 
					<input type="checkbox" name="">
					<b>记住密码</b>
				</label>     
				<router-link to="/personal/forgetPassword" >忘记密码</router-link>
				<router-link to="/home" >首页</router-link>
			</p> 
			<button type="button" class="btn btn-info" @click="generateKey()">立即登录</button>      
			<p>还没有慧数医美?<router-link to="/personal/register" class="login_p_two_a">立即注册</router-link></p>
		</div> 
		
	</div>
</template>
  
<script>
		import "../../assets/js/security.js";
	    export default{
	  	data(){
	  		return { 
	  			//写本组件的数据 
	  			apiUrl:"/apis/login.do",
	  			item:{
                    account:"",
					password:"",
                    publicKeyExponent:"",
                    publicKeyModulus:"",
				}
	  		}
	  	},
	  	mounted: function () {
	        this.$nextTick(function () {
	         // 代码保证 this.$el 在 document 中
	         //console.log(this.$el);
	        })
       },      
	  	methods:{
	  		//写ajax请求
            generateKey() {
				let url='apis/generateKey.do';
				let params='';
				let vm=this;
                vm.$http.post(url, params).then(function (result) {
					vm.item.publicKeyExponent=result.data.data.publicKeyExponent;
					vm.item.publicKeyModulus=result.data.data.publicKeyModulus;
					let account = vm.item.account;
					let password = vm.item.password;
					if(account && password){
						vm.login();
						return false;
					}else{
						console.log('用户名或密码不能为空!');
						return false;
					}
                });
            },
	  		login() {
				let vm  = this;
				let publicKeyExponent= vm.item.publicKeyExponent;
				let publicKeyModulus= vm.item.publicKeyModulus;
				if(publicKeyExponent==""&&publicKeyModulus==""){
				    location.href='/#/login';
				    return;
				}
                RSAUtils.setMaxDigits(200);
                let key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
                let encrypedPwd = RSAUtils.encryptedString(key,vm.item.password);
                vm.item.password=encrypedPwd;
                let params=new Object();
                params.account=vm.item.account;
                params.password=vm.item.password;
                vm.$http.post(vm.apiUrl, params).then(function(result){
                    if(result.ok){
                        if(result.data.data=="success"){
                            sessionStorage.setItem("username", vm.item.account);
                            location.href = "/#/home";
						}
					}
                });
			}
	  	}
	  }
</script>  

  
<style scoped>
	.login{  
		width: 100%;  
		height: 100%;     
		background: url("../../assets/images/login.jpg");
		-webkit-background-size: 100% 100%;
		     -o-background-size: 100% 100%;
		        background-size: 100% 100%;
		position: relative;
	}
	.login_input{
		width: 320px;
		height: 285px;  
		position: absolute; 
		left: 50%; 
		top: 50%; 
		margin-left: -160px;	
		margin-top: -142.5px;
	} 
	.login_input>label{
		width: 100%;
		position: relative;
		margin-bottom: 0;
	}
	  .login_input>label>input{
	  	padding-left: 30px;
	  }
	.login_input>label>img{
		position: absolute;
		left: 7px;
		top: 5px;
		width: 17px; 
	}
	.login_input>img{
		width: 320px;
		margin: 20px 0;
	}
	.login_p_one{
		margin-top: 10px;
		font: 12px "Microsoft Yahei";
	} 
	
	.login_p_one>label>b{
		color: #FFF;
		font-weight: 500;
	}  
	.login_p_one>a{
		float: right;
		color: #FFF; 
		line-height: 25px;
		text-decoration: none;
	}
	.login_input>button{
		display: block;
		width: 100%;
		margin-bottom: 10px;
	}
	.login_p_two_a{
		color: #ee7306;
		text-decoration: none;
	}   
</style>