<template>
	<div class="findPassword">
		<!-- <heads :topMessage="isShow"></heads> -->
	
		<div id="heads" class="heads navbar navbar-default">
	        <div class="navbar-header">
	            <a class="navbar-brand" href="/home">
	              <img src="../../assets/images/logo.png" alt="logo"/>
	            </a>
	        </div> 
         </div> 
		<div class="findPassword_body">
				<h2>找回密码</h2> 
				<div class="form-horizontal" role="form">
				<div style="width:70%;margin:0 auto;">
					    <div class="form-group">
						    <label class="col-sm-3 control-label" for="phone">手机号:</label>
						    <div class="col-sm-7">
						    	 <input type="text" style="position: absolute;top: -9999px"/>
			      			    <input type="text" class="form-control" id="phone" placeholder="请输入手机号" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" title="输入11位有效的手机号" pattern="1[0-9]{10}" required  v-model="alterData.phone">
			   			    </div>
			  			</div>
			  			<div class="form-group">
						    <label for="lastname" class="col-sm-3 control-label">验证码:</label>
						    <div class="col-sm-4">
						    	<input type="text" style="position: absolute;top: -9999px"/>
						        <input type="text" class="form-control" id="lastname" placeholder="请输入验证码" v-model="verification"  disabled="true">
						    </div> 
						    <div class="col-sm-3">
						    	<button type="button" class="btn  verification-code" @click="getVerification">获取验证码</button>
						    </div>
		  				 </div>
		  				 <div class="form-group">
						       <label for="password" class="col-sm-3 control-label">新密码:</label>
							    <div class="col-sm-7"> 
							       <input type="password" style="position: absolute;top: -9999px"/>
							        <input type="password" class="form-control" id="password" placeholder="请输入密码" @input="changePassword"  v-model="alterData.newPass" disabled="true">  
						        </div>
						        
		  				 </div> 
		  				 <div  class="text-center">
			   			    	<p  style="margin:0;color:red;">{{pwText}}</p>
			   			    </div>
		  				 <div class="form-group">
		  					<div class="col-sm-offset-3 col-sm-7">
		  						<button type="button" class="btn btn-em btn-block"  @click="submit($event)" disabled="true" id="login_btn">提交</button> 
		  					</div>
		  				 </div> 
		  				 <div class="form-group"> 
		  					<div class="col-sm-12"> 
		  						<p class="text-center return"><router-link to="/" v-on:click.native="clear"> >>返回登录 </router-link></p>
		  					</div> 
		  				 </div>
		  				 <div class="form-group">
		  					<div class="col-sm-12">
		  						<p class="text-center text-danger">{{hint}}</p>
		  					</div> 
		  				 </div>
				</div>
			</div>
		</div>
	</div>  
</template>
<script>
    //import heads from "../head/heads.vue";
    import common from "../../assets/js/common.js";
	export default{
		data(){
			return {
				verification:"",
				alterData:{newPass:"",phone:""},
				status:false,
				hint:"",
				isShow:false,
				timer:"",

				pwText:"",

				timerOut:"",
			}
		}, 
		methods:{  
			submit:function(){ 
				let vm = this;
				let post = common.post;
				if(vm.status){
					post(vm.$http,"../apis/personal/retrievePassword",vm.alterData,(res)=>{
					 if(res.ok){  
					  	if(res.data.success){ 
					  		vm.hint = "修改成功"
					  		window.location.href = "/";
					  	}else{
					  		vm.hint = res.data.message;
					  	}
					  } 
					},(err)=>{ 
						vm.hint = "出错了";
					 	return false;
					})
				}else{
					vm.hint = "验证码出错";
					$("#lastname").parent("div").addClass('has-error'); 
				}
			},  
			getVerification:function(){
				let post = common.post;
				let vm = this;  
               var re = /^1\d{10}$/;
	  			if($("#phone").val()==""){
	  				alert("手机号不能为空");
	  			}
	  			if($("#phone").val()!=""&&!re.test($("#phone").val())){alert("手机格式不正确")}
				if(vm.alterData.phone.length==11){ 
					post(vm.$http,"../apis/personal/sendShortMessage",vm.alterData.phone,(res)=>{
						console.log(res);
						if(res.ok){
							if(res.data.success){

                             $("#lastname").attr({
	  					         'disabled':false,
	  				            });

								 clearInterval(vm.timer);
								  $(".verification-code").attr({
	  					         'disabled':true,
	  				            });
								let t=60;
                                vm.timer=setInterval(()=>{
                                    t--;
                                    $(".verification-code").text(t+"秒后重试");
								},1000);
                                vm.timerOut = setTimeout(()=>{
									clearInterval(vm.timer);
                                    $(".verification-code").text("获取验证码").removeAttr("disable");
                                    $(".verification-code").attr({
	  					         	'disabled':false,
	  				            	});
								},60000);
                                localStorage.setItem("Interval",vm.timer);
                                localStorage.setItem("Timeout",vm.timerOut);
								vm.status = true;
								$("#lastname").on("input",function(){
									if($(this).val()==res.data.data){
										vm.status = true;
										$("#lastname").parent("div").removeClass('has-error')
										$("#password").attr({
	  					                  'disabled': false,
	   			                       	});
									}else{
										vm.status = false;
										$("#lastname").parent("div").addClass('has-error');
										$("#password").attr({
	  					                  'disabled':true,
	   			                       	});
									} 
								})
							}else{
								vm.status = false;
								vm.hint = res.data.message;
								$("#lastname").parent("div").addClass('has-error'); 
							}
						}
					},(err)=>{
						alert("出错了");
						 $("#lastname").attr({
	  				     'disabled':true,
	  				 }); 
						return false;
					})
				}else{ 
					$("#lastname").parent("div").addClass('has-error'); 
				}
			},

		  		changePassword(){
	  			var pat=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
	  			if($("#password").val()!=""&&pat.test($("#password").val())){
	  				this.pwText="";
	  				$("#login_btn").attr({
	  					'disabled':false,
	  				})
	  			}else{
	  				$("#login_btn").attr({
	  					'disabled':true,
	  				});
	  				this.pwText="密码应为6-16位，字母与数字组合";
	  			}
	  		},

			clear(){ 
				let vm = this;
				clearInterval(vm.timer);
				clearTimeout(vm.timerOut);
				$(".verification-code").text("获取验证码");
			},
		},

		mounted:function(){
			let vm = this;
			vm.verification = "";
			vm.alterData.phone = "";
			vm.alterData.newPass = "";
			var Interval = localStorage.getItem("Interval");
			var Timeout = localStorage.getItem("Timeout");
			clearInterval(Interval);
			clearTimeout(Timeout); 
		},
		components:{
			/*heads*/
		}
	}
}
</script>

<style scoped>
	.findPassword{
		width: 100%;
		height: 100%; 
		background-color: #f2f2f2;
	}  
	.findPassword label{font-weight:normal;padding-right:0;}
	.findPassword .verification-code{padding:6px 13px;background-color:
		#ffffff;border:1px solid #32ccca;color:#32ccca;
	}
	.findPassword .verification-code:active:focus,.findPassword .verification-code:focus{outline:none;}

    .return a{color:#333333;}

	.findPassword_body{
		width: 700px;
		height: 390px; 
		margin: 120px auto;
		border: 1px solid #e5e5e5;
		padding-top: 110px;
		position: relative;
	}
	.findPassword_body>div{
		background-color: #FFF;
		padding-top: 50px;
	}
	.findPassword_body>h2{
		position: absolute;
		top: 20px; 
		left: 45px;
	} 
	.heads{position:fixed;top:0;width:100%;height:65px;padding-left:30px;padding-right:30px;border-radius: 0;border:none;background-color: #32ccca;margin-bottom:0;z-index: 8888;
        box-shadow:0 0 3px #999;}
    .heads .navbar-brand{height:auto;}  
</style>  