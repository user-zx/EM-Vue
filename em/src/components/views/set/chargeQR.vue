<template>
	<div class="modal fade" id="chargeQR" tabindex="-1" role="dialog" aria-labelledby="addKeyWordLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="addKeyWordLabel"></h4>
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
				
				  var popup = window.open()
				vm.$http.post(vm.alipay,vm.chargeQR.phone).then((res)=>{
					if(res.data.success){  
					    localStorage.setItem("playApply",res.data.data);
					    //let b = localStorage.getItem("playApply")
						//console.log(b); 
						popup.location.href = 'http://localhost/src/components/pay/apply.html';
						//$("#alipayID_DIV").html(res.data.data);
					}else{ 
						alert(res.data.message);
						return false;
					}
				},(err)=>{

				})
			}
		},
		mounted(){ 
			let vm = this; 
			 $('#chargeQR').on('shown.bs.modal', function () { 
  				vm.qrsrc = "../apis/wxpay/generateQRCode?pkgId="+vm.chargeQR.id+"&userAccount="+vm.chargeQR.phone+"";
  				vm.alipay = "../apis/alipay/openAlipayPage?pkgId="+vm.chargeQR.id+"&userAccount="+vm.chargeQR.phone+"";
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