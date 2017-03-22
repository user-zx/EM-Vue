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
                		<a :href="alipay" class="btn btn-default btn-block">支付宝</a>
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
			}
		},
		methods:{
			
		},
		mounted(){ 
			let vm = this; 
			 $('#chargeQR').on('shown.bs.modal', function () {
  				vm.qrsrc = "../apis/wxpay/generateQRCode?pkgId="+vm.chargeQR+"";
  				vm.alipay = "../apis/personal/alipayRecharge="+vm.chargeQR+"";
  				console.log(vm.alipay);
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
		width: 100px;  
		margin-left: 100px;
	}
	.modal-body>img{
		position: absolute;
		top: 0px;
		right: 50px;
	}
	
</style>