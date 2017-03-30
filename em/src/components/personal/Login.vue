<template>
	<div class="login">
	    <div class="login_div_parent">
		<div class="login_div">
			<img src="../../assets/images/login-logo.png"  alt="">
			<!-- <img class="pull-right" src="../../assets/images/login-tel.png" style="margin-top:8px;" alt=""> -->
			<div class="pull-right login_tel" >咨询电话：18611924575</div>
		</div>
		</div>
		<div class="login_input">
		    
			<img src="../../assets/images/loginWord.png" style="margin:0 0 15px 15px;" alt="">
			
			<label>
				<img src="../../assets/images/login_user.png"  alst="">
				 <input type="text" style="position: absolute;top: -9999px;display:none"/>
				<input type="text" name="" class="form-control" v-model="item.account" placeholder="输入手机号" @input="changeVal" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" title="输入11位有效的手机号" pattern="1[0-9]{10}" required>
			</label> 
			<label>
				<img src="../../assets/images/login_password.png"  alt="">
				 <input type="password" style="position: absolute;top: -9999px;display:none"/>
				<input type="password" name="" class="form-control" v-model="item.password" placeholder="密码" @input="changeVal">
			</label>
			<label>
				<p  class="showError" v-show="hint"></p>
			</label>
			<p class="clear login_p_one">
				 <label>
					 <input type="checkbox"  id="remember">记住密码
				 </label>        
				<router-link to="/personal/forgetPassword">忘记密码</router-link>
			</p> 
			<button type="button" class="btn  btn-em" @click="generateKey()" >立即登录</button>      
			<p>还没有慧数医美?<a href="/personal/register" class="login_p_two_a" @click="clearstorage">立即注册</a></p>
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
                rememberMe:"",
               
                params:{},
	  		}
	  	},
	  	mounted: function () {
	  		
             let vm = this;
             vm.rememberMe = vm.getCookie("rememberMe");

	        this.$nextTick(function () {
	         // 代码保证 this.$el 在 document 中
	        }); 
	      	
	        if(vm.rememberMe){
	        	$("#remember").iCheck("check")
	        	vm.item.account = vm.getCookie("username");
	        	vm.item.password = vm.getCookie("password");
	        }else{ 
	        	$("#remember").iCheck("uncheck");
	        	vm.item.account = "";
	        	vm.item.password = "";
	        }  
	       //console.log(document.cookie);
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
				let url='/apis/generateKey.do';
				let vm=this;

                vm.$http.post(url, '').then(function (result) {
                	
					vm.item.publicKeyExponent=result.data.data.publicKeyExponent;
					vm.item.publicKeyModulus=result.data.data.publicKeyModulus;
					let account = vm.item.account;
					let password = vm.item.password;
					if(account.length==11 && password!=""){
						vm.hint = false;
						vm.login();
						return false;
					}else if(account=="" || password==""){
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
            clearstorage(){
            	sessionStorage.clear();
            },
	  		login() {
				let vm  = this;
				let publicKeyExponent= vm.item.publicKeyExponent;
				let publicKeyModulus= vm.item.publicKeyModulus;
				if(publicKeyExponent==""&&publicKeyModulus==""){
				    location.href='/login';
				    return false;
				}
                RSAUtils.setMaxDigits(200);
                let key = new RSAUtils.getKeyPair(publicKeyExponent, "", publicKeyModulus);
                let encrypedPwd = RSAUtils.encryptedString(key,vm.item.password);
               // vm.item.password=encrypedPwd;
                
                vm.params.account=vm.item.account;
                vm.params.password = encrypedPwd; 
                vm.params.rememberMe = vm.rememberMe;
                //console.log( vm.params);    
                vm.$http.post(vm.apiUrl,  vm.params).then(function(result){

                    if(result.ok){  
                        if(result.data.success){
							if(vm.rememberMe){  
								vm.hint = false;   
								vm.checkCookie(vm.params.account,vm.item.password,vm.rememberMe);
							}else{
								vm.cleanCookie("username","password","rememberMe")
							} 
							localStorage.setItem("usernumber", vm.params.account);
							vm.$router.push({path:"/home/sellClue"});
						}else{ 
							vm.hint = true;  
							vm.item.account = "";
						    vm.item.password = "";   
						    vm.rememberMe = false;
							$(".showError").html(result.data.message);
						}
					}
                });
			},
			changeVal(){
				if(this.hint){
					this.hint  = false;
				}
			},
			getCookie(c_name) {			//根据分隔符每个变量的值
        	if (document.cookie.length > 0) {
          	 let c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
              let  c_end = document.cookie.indexOf("^", c_start);
                if (c_end == -1)
                    c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
		            }
		        }
		        return "";
		    }, 
		    setCookie(c_name, n_value, p_name, p_value,r_name,r_value,expiredays) { //设置cookie
		        var exdate = new Date();
		        exdate.setDate(exdate.getDate() + expiredays);
		        document.cookie = c_name + "=" + escape(n_value) + "^" + p_name + "=" + escape(p_value) + "^" +  r_name + "=" + escape(r_value) +((expiredays == null) ? "" : "^;expires=" + exdate.toGMTString());
		        console.log(document.cookie)
   		 	},
   		    checkCookie(name,password,remember){      //检测cookie是否存在，如果存在则直接读取，否则创建新的cookie

			    //alert(document.cookie)
			   
			     let vm = this;
			     let user_name = vm.getCookie('username');
			     let pass_word = vm.getCookie('password');
			 	


			     if (user_name != null && user_name != "" && pass_word != null && pass_word != "") {
			        console.log('cookie已经存在');
			     }else {
			           vm.setCookie("username", name,"password",password,"rememberMe",remember,7);
			     }
			    // alert(document.cookie)
			 },
			cleanCookie (c_name, p_name,r_name) {     //使cookie过期
			     document.cookie = c_name + "=" + ";" + p_name + "=" + ";" + r_name + "=" + ";expires=Thu, 01-Jan-70 00:00:01 GMT";
			 }
	  	 } 
	  }
</script>  
     
  
<style scoped>
	.login{  
		width: 100%;  
		height: 100%;
		padding-top:15px;     
		background: url("../../assets/images/login.png") center center;
		-webkit-background-size: 100% 100%;
		     -o-background-size: 100% 100%;
		        background-size: 100% 100%;
		position: relative;
	}
	.login_div{width:70%;margin:0 auto;
      
	}
    .login_div_parent{
	border-bottom:1px solid rgba(242,242,242,0.1);
    padding-bottom:15px;
    }
    .login_tel{font-size:20px;color:#ffffff;line-height:36px;font-weight:200;font-family:"微软雅黑";}
	.login_input{
		width: 380px;
		height: 390px;  
		position: absolute; 
		left: 50%; 
		top: 46%; 
		margin-left: -190px;	
		margin-top: -195px;
	} 
	.login_input label{
		font-weight:normal;
	}
	.login_input>label{
		width: 100%;
		position: relative;
		margin-bottom:1px;
	}
	  .login_input>label>input{
	  	padding-left:55px;
	  	border:none;

	  }
	   .login_input>label:first-of-type input{
          border-radius:4px 4px 4px 4px;
          height:50px;
         background:rgba(242,242,242,0.85);
	  }
	   .login_input>label:nth-of-type(2) input{
          border-radius:4px 4px 4px 4px ;
           height:50px;
           margin-top:10px;
           background:rgba(242,242,242,0.85);
	  }

	.login_input>label>img{
		position: absolute;
		left:25px;
		top: 16px;
		width: 17px; 

	}
	 .login_input label:nth-of-type(2) img{
	 	top:23px;	

	 }

	.login_input p:last-child{margin:0;
       color:#ffffff;
       text-align:center;
	}

	.login_p_one{
		
		font: 12px "Microsoft Yahei";
		color:#ffffff;
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
		margin-bottom: 15px;
		padding:10px 12px;
		height:50px;
		font-size:20px;
		font-weight:700;
	}
	.login_p_two_a{
		color: #32ccca;
		text-decoration: none;
		border-bottom:1px solid #32ccca;
	}   
	.showError{
		color:red;
		text-align: center; 
		line-height: 30px;
		margin-bottom: 0;
	}
</style>