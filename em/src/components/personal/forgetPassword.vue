<template>
	<div class="findPassword">
		<heads :topMessage="isShow"></heads>
		<div class="findPassword_body">
				<h2>找回密码</h2>
				<div class="form-horizontal" role="form">
					    <div class="form-group">
						    <label class="col-sm-3 control-label" for="phone">手机号:</label>
						    <div class="col-sm-7">
			      			    <input type="text" class="form-control" id="phone" placeholder="请输入手机号" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" title="输入11位有效的手机号" pattern="1[0-9]{10}" required  v-model="alterData.phone">
			   			    </div>
			  			</div>
			  			<div class="form-group">
						    <label for="lastname" class="col-sm-3 control-label">验证码:</label>
						    <div class="col-sm-5">
						        <input type="text" class="form-control" id="lastname" placeholder="请输入验证码" v-model="verification" @input="detection">
						    </div> 
						    <div class="col-sm-2">
						    	<button type="button" class="btn btn-info" @click="getVerification()">获取验证码</button>
						    </div>
		  				 </div>
		  				 <div class="form-group">
						       <label for="password" class="col-sm-3 control-label">密码:</label>
							    <div class="col-sm-7"> 
							        <input type="password" class="form-control" id="password" placeholder="请输入密码"   v-model="alterData.newPass">  
						        </div>
		  				 </div>
		  				 <div class="form-group">
		  					<div class="col-sm-offset-3 col-sm-7">
		  						<button type="button" class="btn btn-info btn-block"  @click="submit($event)" id="login_btn">提交</button> 
		  					</div>
		  				 </div> 
		  				 <div class="form-group"> 
		  					<div class="col-sm-12"> 
		  						<p class="text-center"><router-link to="/"> >>返回登录 </router-link></p>
		  					</div> 
		  				 </div>
		  				 <div class="form-group">
		  					<div class="col-sm-12">
		  						<p class="text-center">{{hint}}</p>
		  					</div> 
		  				 </div>
				</div>
		</div>
	</div>  
</template>
<script>
    import heads from "../head/heads.vue";
    import common from "../../assets/js/common.js";
	export default{
		data(){
			return {
				verification:"",
				alterData:{newPass:"",phone:""},
				status:false,
				hint:"",
				isShow:false,
			}
		}, 
		methods:{  
			submit:function(){ 
				let vm = this;
				let post = common.post;
				console.log(vm.status);
				if(vm.status){
					post(vm.$http,"/apis/personal/retrievePassword",vm.alterData,(res)=>{
					 if(res.ok){  
					  	if(res.data.success){ 
					  		window.location.href = "#/login";
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
				if(vm.alterData.phone.length==11){
					post(vm.$http,"/apis/personal/sendRegisterUserMessage.do",vm.alterData.phone,(res)=>{
						if(res.ok){
							if(res.data.success){
								vm.status = true;
								$("#lastname").on("input",function(){
									if($(this).val()==res.data.data){
										vm.status = true;
										$("#lastname").parent("div").removeClass('has-error')
									}else{
										vm.status = false;
										$("#lastname").parent("div").addClass('has-error');
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
						return false;
					})
				}else{ 
					$("#lastname").parent("div").addClass('has-error'); 
				}
			},
			detection(){
				if ($("#lastname").val().length==0) {   
					$("#lastname").parent("div").removeClass('has-error')
				}
			} 
		},
		components:{
			heads
		}
	}
</script>

<style scoped>
	.findPassword{
		width: 100%;
		height: 100%; 
		background-color: #f2f2f2;
	}  
	.findPassword_body{
		width: 750px;
		height: 390px; 
		margin: 50px auto;
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
</style>  