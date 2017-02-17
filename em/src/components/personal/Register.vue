<template>
	<div id="register">
	     <heads></heads>
		<div class="register_centre container">
			<div class="panel">
				<div class="panel-heading" id="register_centre_heading">
					<div class="register_centre_div">
						<span class="avtive_span_one">1</span>
					    <i class="active_i_one"><s></s></i>
					    <span class="avtive_span_two">2</span>
					    <i class="active_i_two"><s></s></i>
					    <span class="avtive_span_three">3</span>
					</div>
				 </div>
				<div class="panel-body">
					<div class="form-horizontal" role="form" v-show="register_login">
						<div class="form-group">
						    <label class="col-sm-3 control-label" for="phone">手机号:</label>
						    <div class="col-sm-5">
			      			    <input type="text" class="form-control" id="phone" placeholder="请输入手机号" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" title="输入11位有效的手机号" pattern="1[0-9]{10}" required @input="loginPhone()">
			   			    </div>
			   			    <div  class="col-sm-3">
			   			    	<p  style="margin:0;padding-top: 8px">{{phoneText}}</p>
			   			    </div>
			   			    
			  			 </div> 
			  			 <div class="form-group">
						    <label for="lastname" class="col-sm-3 control-label">验证码:</label>
						    <div class="col-sm-5">
						        <input type="text" class="form-control" id="lastname" placeholder="请输入验证码" disabled="true">
						    </div>
						    <div class="col-sm-2">
						    	<button type="button" class="btn btn-info" @click="getVerification()">获取验证码</button>
						    </div>
		  				 </div>
		  				 <div class="form-group">
						    <label for="password" class="col-sm-3 control-label">密码:</label>
						    <div class="col-sm-5"> 
						        <input type="password" class="form-control" id="password" placeholder="请输入密码" disabled="true">
						    </div>
		  				 </div>
		  				 <p class="text-center">点击下一步,则表示您接受 <router-link to="personal/forgetPassword">《慧数医美服务条款》</router-link> 和<router-link to="personal/userInstructions">《用户须知》</router-link></p>
		  				<div class="form-group">
		  					<div class="col-sm-offset-3 col-sm-6">
		  						<button type="button" class="btn btn-info btn-block" disabled="true" @click="login($event)">下一步</button> 
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
							          <input type="checkbox" name="quux[1]" id="one">请记住我
							        </label>
							      </div>
							    </div>
 						 </div>
 						 <div class="form-group">
						    <label class="col-sm-3 control-label" for="phone">所属行业:</label>
						    <div class="col-sm-8">
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
			  			  <div class="form-group">
						    <label class="col-sm-3 control-label" for="phone">关键词:</label>
						    <div class="col-sm-8">
			      			   <textarea class="form-control" rows="6" placeholder="您所关注的一些关键词, 多个关键词以中文逗号隔开。" id="uploadFile"></textarea>
			      			  <!--  <button type="file" class="btn col-sm-6 panel-body-btn"><span class="glyphicon glyphicon-duplicate panel-body-span-button"></span>批量添加</button> --> 
			      			  <!--  <span>
			      			  		<span class="glyphicon glyphicon-duplicate panel-body-span-button"></span>
			      			      <input type="file" name="" class="btn col-sm-6 panel-body-btn">
			      			  </span> -->
			      			   <a href="javascript:;" class="a-upload btn col-sm-6 panel-body-btn">
			      			      <span class="glyphicon glyphicon-duplicate panel-body-span-button"></span>
                                  <input type="file" name="" id="uploading" multiple="multiple" @change="handleFile()">点击这里上传文件
                               </a>
			      			   <button type="button" class="btn  col-sm-6 panel-body-btn"><span class="glyphicon glyphicon-floppy-save panel-body-span-button"></span>下载文件模板</button>
			   			    </div>
			  			 </div>
			  			 <div class="form-group">
		  					<div class="col-sm-offset-3 col-sm-8">
		  						<button type="button" class="btn btn-info btn-block" @click="message()">提交并继续</button> 
		  					</div>
		  				 </div>
		            </div>  
		            <div class="panel panel-default form-horizontal" role="form" v-show="register_pay">
		            	 <div class="panel-body form-horizontal">
    						<p class="text-center">若您想让我们为您提供优质的服务，还请您缴纳一定的注册费用，以便我们为您提供更优质的服务!</p>
							<div class="register_pay_div form-group">
								<div class="col-sm-5">
									<label>
										<input type="checkbox" name="">
										支付宝
								    </label>
									<label>
										<input type="checkbox" name="">
										微信
									</label>
								</div>
								<span class="col-sm-6">
									<img src="../../assets/images/payQR.png" height="221" width="269">
									<p class="text-center">使用微信（支付宝）扫一扫支付</p>
								</span>
							</div>
						    <div class="form-group">
			  					<div class="col-md-4 col-md-offset-4">
			  						<router-link to="/login" class="btn btn-info btn-block" @click="submit()">跳过</router-link> 
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
	  import common from "../../assets/js/common.js";
	  export default{
	  	data(){
	  		return{
	  			register_login:true,
	  			register_message:false,
	  			register_pay:false,
	  			phoneText:""
	  		}
	  	}, 
	  	methods:{
	  		login(el){
	  			this.register_login = false;
	  			this.register_message = true;   
	  			$(".active_i_one>s").animate({width: "100%"}, 600,function(){
	  				$(".avtive_span_two").css({
	  					background:"#32ccca",
	  					color:"#fff"
	  				})
	  			})
	  		},
	  		message(){
	  			this.register_message = false;
	  			this.register_pay = true; 
	  			$(".active_i_two>s").animate({width: "100%"}, 600,function(){
	  				$(".avtive_span_three").css({
	  					background:"#32ccca",
	  					color:"#fff"
	  				})
	  			})
	  		},
	  		submit(){
	  			console.log('test');
	  		},
	  		handleFile(){
	  			let filename = $("#uploading")[0].files;
	  			let temp = "";
	  			for (var i = 0; i < filename.length; i++) {
	  				console.log(filename[i].name);
	  				temp += filename[i].name+" ; ";
	  			} 
              $("#uploadFile").val(temp);
	  		},
	  		loginPhone(){ 
	  			let vm = this;
	  			if($("#phone").val().length>11){
	  				vm.phoneText = "输入的个数大于11位"
	  			}else if($("#phone").val().length<11){
	  				vm.phoneText = "输入的个数小于11位"
	  			}else{
	  				vm.phoneText = "输入个数正确"
	  			}
	  		},
	  		getVerification(){  
	  			let post = common.post;
	  			let vm = this;
	  			let valuePhone = $("#phone").val();
	  			if(valuePhone.length==11){   
	  				 
 	  				post(vm.$http,"/apis/personal/sendRegistUserMessage.do",valuePhone,(res)=>{
						console.log(res); 
				   },(err)=>{ 
					console.log(err);
					return false;
				  })
					
	  			}
	  		} 
	  	},
	  	mounted(){
	  		$("#one").iCheck({
	  			checkboxClass: 'icheckbox_square-blue',
	  			  labelHover: true, 
	  			   cursor: true
	  		});
	  		$(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            }); 
	  	},
	  	components:{
	  		heads
	  	}
	  }

</script>

<style scoped>  
	@import url("../../assets/js/iCkeck-v1.0.2/css/skins/square/blue.css");
	/* @import url("../../assets/js/iCkeck-v1.0.2/css/skins/all.css"); */
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
	.panel-body-span-button{
		margin-right: 10px;
	}
	.panel-body-btn{
		 background-color: #f2f2f2;
		 border: 1px solid #dadada;
		 color: #999999;
		 outline: none;
	}
	.a-upload {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
}

.a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.a-upload:hover {
    text-decoration: none
}
 
#register_centre_heading>.register_centre_div>.avtive_span_one{
	background-color: #32ccca;
	color: #fff;
}
/* #register_centre_heading>.register_centre_div>.avtive_i{
	
} */
</style>
 

 