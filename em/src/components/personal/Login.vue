<template>
	<div class="login">
		<div class="login_div">
			<img src="../../assets/images/login-logo.png" alt="">
			<img class="pull-right" src="../../assets/images/login-tel.png" alt="">
		</div>
		<div class="login_input">
			<img src="../../assets/images/loginWord.png"  alt="">
			<label>
				<img src="../../assets/images/login_user.png"  alt="">
				<input type="text" name="" class="form-control" v-model="item.account" placeholder="手机号" @input="changeVal" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" title="输入11位有效的手机号" pattern="1[0-9]{10}" required>
			</label> 
			<label>
				<img src="../../assets/images/login_password.png"  alt="">
				<input type="password" name="" class="form-control" v-model="item.password" placeholder="密码" @input="changeVal">
			</label>
			<label>
				<p  class="showError" v-show="hint"></p>
			</label>
			<p class="clear login_p_one">
				 <label>
					 <input type="checkbox"  id="remember" >记住密码
				 </label>        
				<router-link to="/personal/forgetPassword">忘记密码</router-link>
			</p> 
			<button type="button" class="btn btn-info" @click="generateKey()" >立即登录</button>      
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
				},
				hint:false,
                rememberMe:false
	  		}
	  	},
	  	mounted: function () {
	  		let vm = this;
	        this.$nextTick(function () {
	         // 代码保证 this.$el 在 document 中
	         //console.log(this.$el);
	        }); 
	           
	  		$("#remember").iCheck({
                checkboxClass : 'icheckbox_square-blue',
            }).on("ifChecked",function () {
                vm.rememberMe=true;

            }).on("ifUnchecked",function () {
                vm.rememberMe=false;
            });
 
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
					if(account.length==11 && password!=""){
						vm.hint = false;
						vm.login();
						return false;
					}else if(account=="" || password==""){
						console.log($(".showError")[0])
						vm.hint = true;
                         $(".showError").html("手机号或密码不能为空!");
                        
					}else{
						vm.hint = true;
						vm.item.account = "";
						vm.item.password = "";   
						$(".showError").html("手机号或密码出错!");
						
					}
                });
            },
	  		login() {
				let vm  = this;
				let publicKeyExponent= vm.item.publicKeyExponent;
				let publicKeyModulus= vm.item.publicKeyModulus;
				if(publicKeyExponent==""&&publicKeyModulus==""){
				    location.href='/login';
				    return;
				}
                RSAUtils.setMaxDigits(200);
                let key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
                let encrypedPwd = RSAUtils.encryptedString(key,vm.item.password);
                vm.item.password=encrypedPwd;
                let params=new Object();
                params.account=vm.item.account;
                params.password=vm.item.password;
                params.rememberMe = vm.rememberMe;
                vm.$http.post(vm.apiUrl, params).then(function(result){
                	//console.log(result);
                    if(result.ok){  
                        if(result.data.success){
							vm.hint = false;             
                           // sessionStorage.setItem("username", result.data.data);
                            //sessionStorage.setItem("usernumber",vm.item.account);
                            vm.$router.push({path:"/home/sellClue"}); 
						}else{ 
							vm.hint = true;  
							vm.item.account = "";
						    vm.item.password = "";   
							$(".showError").html(result.data.message);
						}
					}
                });
			},
			
			changeVal(){
				if(this.hint){
					this.hint  = false;
				}
			}
	  	}
	  }
</script>  
     
  
<style scoped>
	.login{  
		width: 100%;  
		height: 100%;
		padding-top:20px;     
		background: url("../../assets/images/login.jpg");
		-webkit-background-size: 100% 100%;
		     -o-background-size: 100% 100%;
		        background-size: 100% 100%;
		position: relative;
	}
	.login_div{width:70%;margin:0 auto;}

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
		margin-bottom:1px;
	}
	  .login_input>label>input{
	  	padding-left: 30px;
	  	border:none;

	  }
	   .login_input label:first-of-type input{
          border-radius:4px 4px 0 0;

	  }
	   .login_input label:nth-of-type(2) input{
          border-radius:0 0 4px 4px ;
	  }

	.login_input>label>img{
		position: absolute;
		left: 7px;
		top: 5px;
		width: 17px; 

	}
	.login_input>img{
		width: 320px;
		height:48px;
		margin: 20px 0;
	}
	.login_input p{margin:0;}

	.login_p_one{
		margin-top: 10px;
		font: 12px "Microsoft Yahei";
	} 
	.login_p_one>label{
		cursor: pointer;
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
		padding:10px 12px;
	}
	.login_p_two_a{
		color: #ee7306;
		text-decoration: none;
	}   
	.showError{
		color:red;
		text-align: center; 
		line-height: 30px;
		margin-bottom: 0;
	}
</style>