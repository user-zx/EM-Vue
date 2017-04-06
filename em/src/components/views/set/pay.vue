<template>
	<div>
		<div id="pay" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="expenseTitle" aria-hidden="true">
			 <div class="modal-dialog">
					<div class="modal-content">
		            <div class="panel panel-default form-horizontal" role="form" style="border:none;">
		            	 <div class="panel-body form-horizontal">
    						<p class="text-center">为了给您提供优质的服务，还请您缴纳一定的注册费用，以便我们为您提供更优质的服务!</p>
							<div class="register_pay_div form-group">
								<div class="col-sm-5">
									<ul class="tab-box">
										<li class="active">
											<a href="javascript:void(0);">微信</a>
										</li>
										<li>
											<span  class="btn btn-default btn-block" @click="alipayEvent">支付宝</span>
                							<div style="display:none;" id="alipayID_DIV"></div>
										</li>
									</ul>
								</div>
								<span class="col-sm-6">
									<img :src="qrsrc" height="221" width="269">
									<p class="text-center">使用微信（支付宝）扫一扫支付</p>
								</span>
							</div>
						    <div class="form-group">
			  					<div class="col-md-4 col-md-offset-4">
			  						<button  class="btn btn-info btn-block tg" @click="close">暂不开户</button> 
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
#pay{padding-top:80px;}
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
</style>
<script>
	export default{
		name:"pay",
		data(){
			return {
	  			alipayID:"",
	  			qrsrc:"",
	  			alipay:"",
	  			personalInfoObj:{
				    packageInfo:{},
					user:{}
				}, 
			}
		},
		methods:{
      alipayEvent(){
	  			let vm = this;
				vm.$http.post(vm.alipay).then((res)=>{
					if(res.data.success){ 
					    $("#alipayID_DIV").html(res.data.data) 
					}else{
						alert(res.data.message);
						return false;
					}
				},(err)=>{

				})
	  		},
	  		close(){
			$("#pay").modal('hide');
		},
		},
		mounted(){
			let vm =this;
			let timer = null;
			 $("#pay").on("show.bs.modal",function(){
				 	vm.$http.post("../apis/personal/findPersonalInfo","").then(function(res){
	                if(res.ok) {
	                    if (res.data.success) {
	                        vm.personalInfoObj.packageInfo = res.data.data.packageInfo;
	                        vm.personalInfoObj.user = res.data.data.user; 
	                          //console.log(vm.personalInfoObj)    
	                    }
	                } 
			 });  
            vm.$http.post("../apis/interface/getOpenAccountPackage","").then((res)=>{
            	if(res.ok){
            		if(res.data.success){  
            			 let startTIME = new Date().getTime();
            			vm.alipayID = res.data.data.id; 
            			vm.qrsrc = "../apis/wxpay/generateQRCode?pkgId="+vm.alipayID+"&userAccount="+vm.personalInfoObj.user.phone+"&outTradeNo="+startTIME+""; 
            			
            			vm.alipay = "../apis/alipay/openAlipayPage?pkgId="+vm.alipayID+"&userAccount="+vm.personalInfoObj.user.phone+"";
            			timer = setInterval(function(){
		  					vm.$http.post("../apis/wxpay/findRechargeInfo?outTradeNo="+startTIME).then((res)=>{
		  					if(res.ok){
		  						if(res.data.success){
			  							if(res.data.status=="成功"){
			  								alert("支付成功");
			  								clearInterval(timer);
			  							}
			  						}
			  					}
			  				},(err)=>{
			  					console.log(err);
			  				})
		  				},3000)  
            		}else{
            			alert("暂时无法开户,请稍后再试");
            		}
            	}
            },(err)=>{
            	alert("暂时无法开户,请稍后再试");
            })
		})
			 
			 $("#pay").on("hidden.bs.modal",function(){
			 	clearInterval(timer);
			 })

                
		$(".tab-box").on("click","a",function () {
				$(this).parent().addClass("active").siblings().removeClass("active");
            })
	}
  }
	</script>	