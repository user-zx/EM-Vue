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
			      			    <input type="text" class="form-control" id="phone" placeholder="请输入手机号" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" title="输入11位有效的手机号" pattern="1[0-9]{10}" required @input="loginPhone()" v-model="cellPhone">
			   			    </div>
			   			    <div  class="col-sm-3">
			   			    	<p  style="margin:0;padding-top: 8px">{{phoneText}}</p>
			   			    </div>
			  			 </div> 
			  			 <div class="form-group">
						    <label for="lastname" class="col-sm-3 control-label">验证码:</label>
						    <div class="col-sm-5">
						        <input type="text" class="form-control" id="lastname" placeholder="请输入验证码" disabled="true" @input="changeVerification">
						    </div>
						    <div class="col-sm-2">
						    	<button type="button" class="btn btn-info" @click="getVerification()">获取验证码</button>
						    </div>
		  				 </div>
		  				 <div class="form-group">
						    <label for="password" class="col-sm-3 control-label">密码:</label>
						    <div class="col-sm-5"> 
						        <input type="password" class="form-control" id="password" placeholder="请输入密码" disabled="true" @input="changePassword" v-model="password">  
						    </div>
		  				 </div>
		  				 <p class="text-center">点击下一步,则表示您接受 <router-link to="personal/forgetPassword">《慧数医美服务条款》</router-link> 和<router-link to="personal/userInstructions">《用户须知》</router-link></p>
		  				<div class="form-group">
		  					<div class="col-sm-offset-3 col-sm-6">
		  						<button type="button" class="btn btn-info btn-block" disabled="true" @click="login($event)" id="login_btn">下一步</button> 
		  					</div>
		  				</div>
		            </div>
		            <div class="form-horizontal" role="form" v-show="register_message">
		            	<div class="form-group">
						    <label class="col-sm-2 control-label" for="phone">姓名:</label>
						    <div class="col-sm-9">
			      			    <input type="text" class="form-control" id="phone" placeholder="请输入姓名" v-model="database.name">
			   			    </div>
			  			</div> 
			  			  <div class="form-group">
						    <label class="col-sm-2 control-label" for="phone">公司名称:</label>
						    <div class="col-sm-9"> 
			      			    <input type="text" class="form-control" id="companyName" placeholder="请输入公司名称" v-model="database.company">
			   			    </div>
			  			 </div> 
			  			 <div class="form-group">
			  			 	 <label class="col-sm-2 control-label" for="phone">所在地区:</label>
			  			 	 <div  id="province">    
			  			 	 </div>
			  			 </div>
			  			 <div class="form-group">
						    <div class="col-sm-offset-2 col-sm-8">
						      <div class="checkbox"> 
						        <label>
						          <input type="checkbox"  id="one" checked="true">不限地区
						        </label>
						      </div>
						    </div>
 						 </div>
 						 <div class="form-group">
						    <label class="col-sm-2 control-label" for="phone">所属行业:</label>
						    <div class="col-sm-4" v-show="industryHad">
			      			     <select class="form-control selectpicker" id="industrySelect">
										<option v-for="item in industryData">{{item}}</option> 
							     </select>  
			   			    </div>
			   			     <div class="col-sm-4" v-show="industryAdd"> 
			      			     <input type="text" name="" class="form-control" id="userTrade" v-model="userInputTrade" @input="changeInputTrade">
			   			    </div> 
			   			    <div class="col-sm-4">
			      			     <button type="button" class="btn btn-primary btn-block" @click="industryBtn">{{vocation}}</button>
			   			    </div>
			  			 </div>
			  			  <div class="form-group">
						    <label class="col-sm-2 control-label" for="phone">关键词:</label>
						    <div class="col-sm-9">
			      			   <textarea class="form-control" style="height: 178px;resize:none" placeholder="您所关注的一些关键词, 多个关键词以中文逗号隔开。" id="uploadFile" v-text="textarea"></textarea>  
			      			  
			      			    
			      			    <a  class="a-upload btn col-sm-6 panel-body-btn"> 
			      			    	 <span class="glyphicon glyphicon-folder-open panel-body-span-button"></span> 
			      			    	 <input type="file" name="fileName" @change="fileUpload" id="fileUpload" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">文件上传
			      			    </a>                                
                              
			      			   <a type="button" class="btn  col-sm-6 panel-body-btn" href="/apis/excel/downloadKeywordImportTemplate"><span class="glyphicon glyphicon-floppy-save panel-body-span-button"></span>下载文件模板</a> 
			   			    </div>
			  			 </div>
			  			 <div class="form-group">
		  					<div class="col-sm-offset-2 col-sm-9">
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
			  						<button  class="btn btn-info btn-block" @click="submit()">跳过</button> 
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
	  import "../../assets/js/iCkeck-v1.0.2/js/icheck.js";
	  import common from "../../assets/js/common.js";
	  import provincesData from "../../assets/js/area/provincesData.js";
	  import "../../assets/js/area/jquery.provincesCity.js";
	  import 'bootstrap-select';  
	  export default{
	  	data(){ 
	  		return{
	  			register_login: false, 
	  			register_message: true,  
	  			register_pay:false,
	  			phoneText:"",
	  			verification:"",  
	  			cellPhone:"",
	  			authCode:"", 
	  			password:"",
	  			userInputTrade:"",
	  			industryHad:true,  
	  			industryAdd:false, 
	  			database:{trade:"",province:"",city:"",county:"",name:"",phone:"",password:"",company:""}, 
	  			industryData:[],
	  			vocation:"没有我的行业,点击添加",
	  			uploadWord:"点击这里上传文件",
	  			isFile:false,
	  			textarea:"", 
	  			fileUrl:"../apis/excel/importKeywordList"
	  		}
	  	}, 
	  	methods:{
	  		login(el){
	  			let vm = this;
	  			if(vm.cellPhone!="" && vm.password!=""){
	  				vm.database.phone = vm.cellPhone;
	  				vm.database.password = vm.password;
	  			} 
	  			vm.register_login = false;
	  			vm.register_message = true;   
	  			$(".active_i_one>s").animate({width: "100%"}, 600,function(){
	  				$(".avtive_span_two").css({
	  					background:"#32ccca",
	  					color:"#fff"
	  				}) 
	  			});
	  		},
	  		message(){
	  			this.register_message = false;
	  			this.register_pay = true; 
	  			let vm = this;
	  			$(".active_i_two>s").animate({width: "100%"}, 600,function(){
	  				$(".avtive_span_three").css({
	  					background:"#32ccca",
	  					color:"#fff"
	  				})
	  			});   
	  		}, 
	  		provinceSelect(){
	  			console.log($("#provinceSelect").val());
	  		},
	  		submit(){ 
	  			let vm = this;
	  			console.log(vm.database);
	  			let post = common.post; 
	  			post(vm.$http,"/apis/registerUser",vm.database,(res)=>{

	  				if(res.ok){
	  					if(res.data.success){
	  						window.location.href = "/#/login"
	  					}else{
	  						vm.register_login = true;
				  			vm.register_message =false;  
				  			vm.register_pay = false;
	  					}
	  				} 
	  			},(err)=>{
	  				console.log("注册失败了");
	  				vm.register_login = true; 
		  			vm.register_message =false;  
		  			vm.register_pay = false;
	  			})
	  		}, 
	  		loginPhone(){ 
	  			let vm = this;
				var re = /^1\d{10}$/;
	  			if(re.test($("#phone").val())){
	  				vm.phoneText = ""
	  			}else{
	  				vm.phoneText = "手机号格式不正确"
	  			}
	  		},
	  		getVerification(){  
	  			let post = common.post;
	  			let vm = this;
	  			let valuePhone = $("#phone").val();
	  			if(valuePhone.length==11){   
 	  				post(vm.$http,"/apis/personal/sendRegisterUserMessage.do",valuePhone,(res)=>{
						console.log(res); 
						if(res.ok){ 
							if(res.data.success){
								vm.verification = res.data.data;
								$("#lastname").attr({
	  					         'disabled':false,
	  				            });
	  				            
							}
						}
				   },(err)=>{  
					 console.log(err);
					 $("#lastname").attr({
	  				     'disabled':true,
	  				 }); 
					return false;
				  })
				  if(vm.verification==""){
				  	   $("#lastname").attr({
	  				     'disabled':true,
	  				 }); 
				  }
				 
	  			}else{
					alert("手机号不能为空！");
				}	
	  		},
	  		changeVerification(){
	  			var vm = this;
	  			let verificationVal= $("#lastname").val();
	  			if(vm.verification == verificationVal){
	  				$("#password").attr({
	  					'disabled': false,
	  				});
	  			}else{
	  				$("#password").attr({
	  					'disabled': true,
	  				});
	  			}
	  		},
	  		changePassword(){
	  			if($("#password").val()!=""){
	  				$("#login_btn").attr({
	  					'disabled':false
	  				})
	  			}else{
	  				$("#login_btn").attr({
	  					'disabled':true
	  				})
	  			}
	  		},
	  		industryBtn(){
	  			let vm = this;
	  			if(vm.industryHad){ 
	  				vm.vocation = "已有行业";
	  				vm.industryHad = false;
	  				vm.industryAdd = true;
	  			}else if(vm.industryAdd){  
	  				vm.vocation = "没有我的行业,点击添加";
	  				vm.industryHad = true;
	  				vm.industryAdd = false;
	  			}
	  		}, 
	  		changeInputTrade(){
	  			if(this.userInputTrade!=""){
	  				this.database.trade = this.userInputTrade;
	  			}
	  		},
	  		chnageArea(el){ 
	  			console.log(el.target);  
	  		},
	  		fileUpload(){
	  			let vm = this;  
	  			console.log($("#fileUpload")[0].files[0].name);
		  		vm.textarea = $("#fileUpload")[0].files[0].name;
		  		//$("#fileUpload").parents("form").submit();
	  		}  
	  	},
	  	mounted(){
	  		let _that = this;
	  		window.GT = provincesData.GT;
	  		window.GP = provincesData.GP;
	  		window.GC = provincesData.GC;
	  		
            $("#province").ProvinceCity();

	  		$("#one").iCheck({
	  			checkboxClass: 'icheckbox_square-blue',
	  			labelHover: true, 
	  			cursor: true,
	  		});   
	  		$(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            })

            $("#provinceSelect").on("changed.bs.select",function(){
	  			 _that.database.province = $(this).val();
	  			 $("#one").iCheck("uncheck");
	  		}); 
	  		$("#citySelect").on("changed.bs.select",function(){
	  			_that.database.city = $(this).val();
	  			 $("#one").iCheck("uncheck");
	  		});  
	  		$("#countySelect").on("changed.bs.select",function(){
	  			_that.database.county = $(this).val();
	  			 $("#one").iCheck("uncheck");
	  		}); 
	  		
	  		$("#industrySelect").on("changed.bs.select",function(){
	  			
	  			if(_that.industryHad){
	  				_that.database.trade = $(this).val();
	  			}
	  		}); 

	  		$("#one").on("ifChecked",function(){  
	  			$(".selectpicker").val("").selectpicker('refresh')
	  		})
	  		let industry = common.post;
	  		
	  		industry(_that.$http,"../apis/personal/findAllTrade","",(res)=>{
	  			
	  			if(res.ok){ 
	  				if(res.data.success){
	  					let arr = [];
	  					for (var i = 0; i <res.data.data.length; i++) {
	  				     	arr.push(res.data.data[i].name);
  			      		}
  			      		_that.industryData = arr;
  			      		setTimeout(function(){ 
  			      			$("#industrySelect").selectpicker('refresh')
  			      			_that.database.trade = $("#industrySelect option:selected").val();
  			      		},100)
	  				}
	  			}  

	  		},(err)=>{
	  			console.log(err);
	  		}) 
	  		//this.initFileInput("uploading","/apis/excel/importKeywordList");
	  	},  
	  	activated(){
	  		console.log('test'); 
	  	},
	  	components:{
	  		heads
	  	}
	  }

</script>

<style scoped>   
	@import url("../../assets/js/iCkeck-v1.0.2/css/skins/square/blue.css");
	/* @import url("../../assets/js/bootstrap-fileinput/css/fileinput.css"); */
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

#province>select{margin-left:10px; width:100px} 
.kv-file-content{
	display: none !important;
}     
.fileinput-remove-button{
	display: none !important;
}
</style>
 

 