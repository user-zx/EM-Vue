<template>
	<div id="register">
	     <div id="heads" class="heads navbar navbar-default">
        <div class="navbar-header">
            <a class="navbar-brand" href="/home">
              <img src="../../assets/images/logo.png" alt="logo"/>
            </a>
        </div> 
      
       </div> 
		<div class="register_centre container">
			<div class="panel">
				<div class="panel-heading" id="register_centre_heading">
					<div class="register_centre_div">
						<span class="avtive_span_one">1
                            <span class="active_span_text">登录凭证</span>
						</span>
					    <i class="active_i_one"><s></s></i>
					    <span class="avtive_span_two">2
					        <span class="active_span_text">信息填写</span>
					    </span>
					    <i class="active_i_two"><s></s></i>
					    <span class="avtive_span_three">3
                            <span class="active_span_text">开户费支付</span>
					    </span>
					</div>
				 </div>
				<div class="panel-body">
					<div class="form-horizontal" role="form" v-show="register_login">
						<div class="form-group">
						    <label class="col-sm-3 control-label" for="phone">手机号:</label>
						    <div class="col-sm-5">
			      			    <input type="text" class="form-control" id="phone" placeholder="请输入手机号" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" title="输入11位有效的手机号" pattern="1[0-9]{10}" required @input="loginPhone()" v-model="cellPhone" @blur="remember">
			   			    </div>
			   			    <div  class="col-sm-3">
			   			    	<p  style="margin:0;padding-top: 8px">{{phoneText}}</p>
			   			    </div>
			  			 </div> 
			  			 <div class="form-group">
						    <label for="lastname" class="col-sm-3 control-label">验证码:</label>
						    <div class="col-sm-3">
						        <input type="text" class="form-control" id="lastname" placeholder="请输入验证码" disabled="true" @input="changeVerification" v-model="testCode"@blur="remember">
						    </div>
						    <div class="col-sm-1">
						    	<button type="button" class="btn btn-info" id="getYzm" @click="getVerification()">获取验证码</button>
						    </div>
		  				 </div>
		  				 <div class="form-group">
						    <label for="password" class="col-sm-3 control-label">密码:</label>
						    <div class="col-sm-5"> 
						        <input type="password" class="form-control" id="password" placeholder="请输入密码" disabled="true" @input="changePassword" v-model="password" @blur="remember">  
						    </div>
		  				 </div>
		  				 <p class="text-center" id="TY">点击下一步,则表示您接受<router-link to="/personal/userInstructions"> 《用户须知》</router-link></p>
		  				<div class="form-group"> 
		  					<div class="col-sm-offset-3 col-sm-5">
		  						<button type="button" class="btn btn-info btn-block" disabled="true" @click="login($event)" id="login_btn">下一步</button> 
		  					</div>
		  				</div>
		            </div>
		            <div class="form-horizontal" role="form" v-show="register_message" id="zc-2">
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
						          <input type="checkbox" id="one">不限地区
						        </label>
						      </div>
						    </div>
 						 </div>
 						 <div class="form-group">
						    <label class="col-sm-2 control-label" for="phone">所属行业:</label>
						    <div class="col-sm-5" v-show="industryHad">
			      			     <select class="form-control selectpicker" title="选择所属行业" id="industrySelect" >
									<option v-for="item in industryData">{{item}}</option>
							     </select>  
			   			    </div>  
			   			     <div class="col-sm-4" v-show="industryAdd"> 
			      			     <input type="text" name="" class="form-control" id="userTrade" v-model="userInputTrade" @input="changeInputTrade">
			   			    </div> 
			   			    <div class="col-sm-4" id="hy-btn">
			      			     <button  type="button" class="btn btn-info btn-block" @click="industryBtn">{{vocation}}</button>
			   			    </div>
			  			 </div>
			  			  <div class="form-group">
						    <label class="col-sm-2 control-label" for="phone">关键词:</label>
						    <div class="col-sm-9">
			      			   <textarea class="form-control" style="height: 178px;resize:none;" placeholder="您所关注的一些关键词, 多个关键词以中文逗号隔开。" id="uploadFile" v-model="database.keywordList"></textarea>  
			      			   
			      			    <a  class="a-upload btn col-sm-6 panel-body-btn"> 
			      			    	 <span class="glyphicon glyphicon-folder-open panel-body-span-button"></span> 
			      			    	 <input type="file" name="fileName"  id="fileName" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">文件上传
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
		            <div class="panel panel-default form-horizontal" role="form" v-show="register_pay" style="border:none;">
		            	 <div class="panel-body form-horizontal">
    						<p class="text-center">若您想让我们为您提供优质的服务，还请您缴纳一定的注册费用，以便我们为您提供更优质的服务!</p>
							<div class="register_pay_div form-group">
								<div class="col-sm-5">
									<ul class="tab-box">
										<li class="active">
											<a href="javascript:void(0);">微信</a>
										</li>
										<li>
											<a href="javascript:void(0);">支付宝</a>
										</li>
									</ul>
								</div>
								<span class="col-sm-6">
									<img src="../../assets/images/payQR.png" height="221" width="269">
									<p class="text-center">使用微信（支付宝）扫一扫支付</p>
								</span>
							</div>
						    <div class="form-group">
			  					<div class="col-md-4 col-md-offset-4">
			  						<button  class="btn btn-info btn-block tg" @click="submit()">跳过</button> 
			  					</div> 
		  				    </div>
                         </div>
		            </div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>


	.tab-box{
		width:100%;
		list-style: none;
	}
	.tab-box>li>a{
		display: block;
		padding:10px 15px;
		border:1px solid #e1e1e1;
		color:#32ccca;
		background-color: #f2f2f2;
		text-align: center;
		text-decoration: none;
		border-radius:4px;
		margin-bottom: 10px;
	}
	.tab-box>li>a:hover,
	.tab-box>li>a:focus,
	.tab-box>li>a:active,
	.tab-box>li.active>a{
		color:#ffffff;
		background-color: #32ccca;
	}

	
	#zc-2 .control-label{padding-right:0;}
	 .btn-info{background-color:#32ccca;border-color:#32ccca;}
	 .btn-info:hover{background-color:#32ccca;}
	 .btn-info:focus{background-color:#32ccca;}
    #zc-2  .checkbox label{padding:0;}
    #zc-2 textarea{font-size:12px;border-radius:4px 4px 0 0;}
    #zc-2 .a-upload{border-radius:0 0 0 4px;border-top:none;border-right:none;}
    #zc-2 .a-upload+a{border-radius:0 0 4px 0;border-top:none;}
   
    #TY{margin-left:-45px;}
     #TY a{color:#32ccca;}
   
   .btn-default:hover{background-color:#ffffff;}
   .btn-default:focus{background-color:#ffffff;}
   .btn-default.active, .btn-default:active, .open>.dropdown-toggle.btn-default{background-color:#ffffff;}
   label{font-weight:500;}
    .heads{position:fixed;top:0;width:100%;height:65px;padding-left:30px;padding-right:30px;border-radius: 0;border:none;background-color: #32ccca;margin-bottom:0;z-index: 8888;
        box-shadow:0 0 3px #999;}
    .heads .navbar-brand{height:auto;}
</style>
<script>	
    	
	  
	  import "../../assets/js/iCkeck-v1.0.2/js/icheck.js";
	  import common from "../../assets/js/common.js";
	  import provincesData from "../../assets/js/area/provincesData.js";
	  import "../../assets/js/area/jquery.provincesCity.js";
	  import 'bootstrap-select'; 
	  import "../../assets/js/ajaxfileupload.js";   
	  export default{
	  	data(){ 
	  		return{
	  			register_login:  true,
	  			register_message: false,
	  			register_pay: false,    
	  			phoneText:"",
	  			verification:"",  
	  			cellPhone:"",
	  			testCode:"",
	  			authCode:"", 
	  			password:"",
	  			userInputTrade:"",
	  			industryHad:true,  
	  			industryAdd:false, 
	  			database:{trade:"",province:"",city:"",county:"",name:"",phone:"",password:"",company:"",keywordList:""}, 
	  			industryData:[],
	  			vocation:"创建新行业",
	  			uploadWord:"点击这里上传文件",
	  			isFile:false, 
	  			fileUrl:"../apis/excel/importKeywordList",
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
	  		remember(){
	  			let vm = this;
	  			
	  			sessionStorage.setItem("phone",vm.cellPhone);
	  			sessionStorage.setItem("testCode",vm.testCode);
	  			sessionStorage.setItem("password",vm.password);
	  		},
	  		message(){
	  			this.register_message = false;
	  			this.register_pay = true; 
	  			let vm = this;
	  			
                let patt = new RegExp(".(xls|xlsx)$", "i");

                if(patt.test(vm.database.keywordList)){
                    vm.database.keywordList = "";
                }
                console.log(vm.database); 
                let post = common.post;
                post(vm.$http,"/apis/registerUser",vm.database,(res)=>{
                	console.log(res);
					if(res.ok){
					    if(res.data.success){
                            $(".active_i_two>s").animate({width: "100%"}, 600,function(){
                                $(".avtive_span_three").css({
                                    background:"#32ccca",
                                    color:"#fff"
                                })
                            });
						}
					}
            	},(err)=>{
                    console.log("注册失败了");
					/*window.location.href = "/"
					vm.register_login = true;
					 vm.register_message =false;
					 vm.register_pay = false;*/
                })
	  		}, 
	  		provinceSelect(){
	  			console.log($("#provinceSelect").val());
	  		},
	  		submit(){ 
	  			let vm = this;
	  			var patt = new RegExp(".(xls|xlsx)$", "i"); 
	  			
	  			if(patt.test(vm.database.keywordList)){
	  				vm.database.keywordList = "";
	  			}
	  			vm.$router.push({path:"/"});
	  			
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
						if(res.ok){ 
							if(res.data.success){
								vm.verification = res.data.data;
								$("#lastname").attr({
	  					         'disabled':false,
	  				            });
	  				            $("#getYzm").attr({
	  					         'disabled':true,
	  				            });
	  				            clearInterval(timer);
								let t=60,timer=null;
                                timer=setInterval(()=>{
                                    t--;
                                    $("#getYzm").text(t+"秒后重试");
								},1000);
                                setTimeout(()=>{
									clearInterval(timer);
                                    $("#getYzm").text("获取验证码").removeAttr("disable");
                                    $("#getYzm").attr({
	  					         'disabled':false,
	  				            });
								},60000)
							}else{
							    alert(res.data.message)
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
	  				vm.vocation = "创建新行业";
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
	  		
	  	},
	  	mounted(){
	  		let _that = this;
	  		window.GT = provincesData.GT;
	  		window.GP = provincesData.GP;
	  		window.GC = provincesData.GC;
          if(sessionStorage.getItem("phone")){
          	
	  		let cellPhone=sessionStorage.getItem("phone");
	  		let  testCode=sessionStorage.getItem("testCode");
	  		let  password=sessionStorage.getItem("password");
            _that.cellPhone=cellPhone;
            _that.testCode=testCode;
            _that.password=password;
            $("#lastname").attr({'disabled':false,});
         	$("#password").attr({'disabled':false,});
          }
         


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
	  		$(".btn-default").hover(function(){
	  			$(this).css("backgroundColor","white")
	  		})

	  		$(document).on("change","#fileName",function(){
	  			   if($("#fileName")[0].files[0]){
	  			   	 let fileanme = $("#fileName")[0].files[0].name;
	  			   	 console.log(fileanme);
	  			 $.ajaxFileUpload({ 
		  		 	url: _that.fileUrl,
		  		 	fileElementId:"fileName",
		  		 	secureuri: false,   
		  		 	dataType: 'JSON',   
		  		 	type:"post",          
		  		 	data: {keywordOwner:_that.database.phone,keywordList:_that.database.keywordList},　　　　　　　　　 	　　　　　　　　　  
		  		 	success:function(data,status){ 
		  		 		  if(data=="批量添加关键词保存失败，请联系管理员解决"){
                            alert(data)
                            return fasle;
                        }
		  		 		 let json_data = JSON.parse(data);
		  		 	
                      if(json_data.success){  
                        if(json_data.data == "添加的关键词已经存在"){
                             _that.database.keywordList = "";
                            alert(json_data.data)
                        }else{
                             _that.database.keywordList = fileanme;
                             alert(json_data.data)
                        }
                      }else{
                        _that.database.keywordList = "";
                        alert("添加失败");
                      }
		  		 	},
		  		 	error: function (data, status, e){//服务器响应失败处理函数
                        console.log(e); 
                    }
		  		 })
	  			   }else{
                alert("添加失败")
                return false;    
              }
	  			
	  		});
			$(".tab-box").on("click","a",function () {
				$(this).parent().addClass("active").siblings().removeClass("active");
            })
	  	},  
	  	activated(){
	  		console.log('test'); 
	  	},
	  	components:{
	  		//heads 
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
	#zc-2 {
		padding: 50px 98px; 
	} 
	#register_centre_heading{
		font-size: 0;
		padding: 30px 30px 40px 90px;
	}
	#register_centre_heading>div>span{
		display: inline-block;
		width: 40px;
		height: 40px;
		-webkit-border-radius: 50%;
		        border-radius: 50%;
		background-color: #ffffff;
		color: #000;
		text-align: center;
		line-height: 40px;
		font-size: 18px;
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
.register_centre_div>span{position:relative;}
.register_centre_div .active_span_text{color:#333333;width:57px;font-size:14px; position:absolute;bottom:-34px;left:-6px;}
.register_centre_div .active_span_text:last-of-type{width:72px;bottom:-34px;left:-15px;}
#province>select{margin-left:10px; width:100px} 
.kv-file-content{
	display: none !important;
}     
.fileinput-remove-button{
	display: none !important;
}
#login_btn{background-color:#32ccca;
   border-color:#32ccca;
}
#getYzm{background-color:white;border-color:#32ccca;color:#32ccca;
          padding:5px 6px;
}


</style>
 

 