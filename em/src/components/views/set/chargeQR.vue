<template>
	<div class="modal fade" id="chargeQR" tabindex="-1" role="dialog" aria-labelledby="addKeyWordLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title text-center" id="addKeyWordLabel">{{chargeQR.name}}</h4>
                </div>
                <div class="modal-body text-center">
                	<h1 id="WeChat_text"> 
                		<button type="button" class="btn btn-default btn-block btn-info">微信</button>
                		<span  class="btn btn-default btn-block" @click="alipayEvent">支付宝</span>
                		<div style="display:none;" id="alipayID_DIV"></div>
                	</h1> 
					<img :src="qrsrc" height="258" width="258" >
                </div>  
                <div class="modal-footer">   
                    <button type="button" class="btn btn-default" data-dismiss="modal">&nbsp;&nbsp; 取 消 &nbsp;&nbsp;</button>
                    <!-- <button type="button" class="btn btn-search" >&nbsp;&nbsp; 提 交 &nbsp;&nbsp;</button> --> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	
	export default{
		data(){
			return {
				qrsrc:"",
				alipay:"",
				alipay_div:"",

			}
		},
		methods:{
			alipayEvent(){
				let vm = this;
				vm.$http.post(vm.alipay).then((res)=>{
					if(res.data.success){  
						$("#alipayID_DIV").html(res.data.data); 
					}else{ 
						alert(res.data.message);
						return false;
					}
				},(err)=>{

				})
			}
		},
		mounted(){ 
			let vm = this,timer = null; 
			 $('#chargeQR').on('shown.bs.modal', function () { 
			 	//console.log(vm.chargeQR);
			 	 let startTIME = new Date().getTime();
  				vm.qrsrc = "../apis/wxpay/generateQRCode?pkgId="+vm.chargeQR.id+"&userAccount="+vm.chargeQR.phone+"&outTradeNo="+startTIME+"";
  				vm.alipay = "../apis/alipay/openAlipayPage?pkgId="+vm.chargeQR.id+"&userAccount="+vm.chargeQR.phone+"";
  				timer = setInterval(function(){
  					vm.$http.post("../apis/wxpay/findRechargeInfo?outTradeNo="+startTIME).then((res)=>{
  					if(res.ok){
  						if(res.data.success){
	  							if(res.data.data.status=="成功"){
	  								alert("支付成功");
	  								clearInterval(timer);
	  								 $('#chargeQR').modal('hide');
	  							}
	  						}
	  					}
	  				},(err)=>{
	  					console.log(err);
	  				})
  				},3000)  
 			});
 			$('#chargeQR').on("hidden.bs.modal",function(){
 				clearInterval(timer);
 			})   
		},
		props:["chargeQR"]
	}
</script>

<style scoped>
	.modal-footer{
		text-align: center;
	}
	.modal-body{
		height: 280px;
		position: relative;
	} 
	#WeChat_text{
		margin-right: 310px;
	}
	.modal-body>img{
		position: absolute;
		top: 0px;
		right: 50px;
	}
	#WeChat_text>span{
		margin-top: 20px;
	}
	
</style>