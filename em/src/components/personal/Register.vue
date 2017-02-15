<template>
	<div id="register">
	     <heads></heads>
		<div class="register_centre container">
			<div class="panel">
				<div class="panel-heading" id="register_centre_heading">
					<div>
						<span>1</span>
					    <i><s></s></i>
					    <span>2</span>
					    <i><s></s></i>
					    <span>3</span>
					</div>
				 </div>
				<div class="panel-body">
					<div class="form-horizontal" role="form" v-show="register_login">
						<div class="form-group">
						    <label class="col-sm-3 control-label" for="phone">手机号:</label>
						    <div class="col-sm-8">
			      			    <input type="text" class="form-control" id="phone" placeholder="请输入手机号">
			   			    </div>
			  			 </div> 
			  			 <div class="form-group">
						    <label for="lastname" class="col-sm-3 control-label">验证码:</label>
						    <div class="col-sm-5">
						        <input type="text" class="form-control" id="lastname" placeholder="请输入姓">
						    </div>
						    <div class="col-sm-2">
						    	<button type="button" class="btn btn-info">获取验证码</button>
						    </div>
		  				 </div>
		  				 <div class="form-group">
						    <label for="password" class="col-sm-3 control-label">密码:</label>
						    <div class="col-sm-8"> 
						        <input type="password" class="form-control" id="password" placeholder="请输入密码">
						    </div>
		  				 </div>
		  				 <p class="text-center">点击下一步,则表示您接受 <router-link to="personal/forgetPassword">《慧数医美服务条款》</router-link> 和<router-link to="personal/userInstructions">《用户须知》</router-link></p>
		  				<div class="form-group">
		  					<div class="col-sm-offset-3 col-sm-8">
		  						<button type="button" class="btn btn-info btn-block" @click="login($event)">下一步</button> 
		  					</div>
		  				</div>
		            </div>
		            <div class="form-horizontal" role="form" v-show="register_message">
		            	<div class="form-group">
						    <label class="col-sm-3 control-label" for="phone">姓名:</label>
						    <div class="col-sm-8">
			      			    <input type="text" class="form-control" id="phone" placeholder="请输入姓名">
			   			    </div>
			  			 </div>
			  			 <div class="form-group">
						    <label class="col-sm-3 control-label" for="phone">手机号:</label>
						    <div class="col-sm-8">
			      			    <input type="text" class="form-control" id="phone" placeholder="请输入手机号">
			   			    </div>
			  			 </div>
			  			 <div class="form-group">
			  			 	 <label class="col-sm-3 control-label" for="phone">所在地区:</label>
			  			 	 <div class="col-sm-8">
			  			 	 	 <div class="col-md-4">
									<select class="form-control selectpicker">
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
									</select>
								 </div>
								 <div class="col-md-4">
									<select class="form-control selectpicker">
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
									</select>
								 </div>
								 <div class="col-md-4">
									<select class="form-control selectpicker">
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
										<option>线来源</option>
									</select>
								 </div>
			  			 	 </div>
			  			 </div>
			  			 <div class="form-group">
							    <div class="col-sm-offset-3 col-sm-8">
							      <div class="checkbox">
							        <label>
							          <input type="checkbox">请记住我
							        </label>
							      </div>
							    </div>
 						 </div>
		            </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	  import heads from "../head/heads.vue";
	  import 'bootstrap-select'; 
	  import "../../assets/js/iCkeck-v1.0.2/js/icheck.js";
	  export default{
	  	data(){
	  		return{
	  			register_login:true,
	  			register_message:false,
	  		}
	  	},
	  	methods:{
	  		login(el){
	  			this.register_login = false;
	  			this.register_message = true;
	  		}
	  	},
	  	mounted(){

	  	},
	  	components:{
	  		heads
	  	}
	  }


</script>

<style scoped> 
	@import url("../../assets/js/iCkeck-v1.0.2/css/skins/square/blue.css");
	#register{
		width: 100%;
		height: 100%;
		background-color: #f2f2f2;
	}
	.register_centre{
		width: 730px; 
		padding: 20px;
		padding-top: 100px;
	}
	#register_centre_heading{
		background-color: #f1f1f1;
	}
	#register_centre_heading{
		border-bottom: 1px solid #e5e5e5;
	}
	.panel{ 
		border: 1px solid #e5e5e5;
	}
	.panel-body{
		padding: 50px 15px; 
	} 
	#register_centre_heading{
		font-size: 0;
		padding: 30px 30px 30px 90px;
	}
	#register_centre_heading>div>span{
		display: inline-block;
		width: 32px;
		height: 32px;
		-webkit-border-radius: 16px;
		        border-radius: 16px;
		background-color: #ffffff;
		color: #000;
		text-align: center;
		line-height: 32px;
		font-size: 12px;
	}
	#register_centre_heading>div>i{
		display: inline-block;
		width: 200px;
		height: 8px; 
		background-color: #FFF;
		position: relative;
	}
	#register_centre_heading>div>i>s{
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		background-color: #32ccca;
	}
	
</style>
 

 