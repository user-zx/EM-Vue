<template>
	<div>
		<div id="expense" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="expenseTitle" aria-hidden="true">
			 <div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							  <h4 class="text-center">{{hintVal}}</h4>
							 <!--  <h4 class="text-center" v-else >余额不足,请充值</h4> -->
						</div> 
						  <div class="modal-footer" v-if="status">  
				                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> 
				                <button type="button" class="btn btn-primary" @click="continueToAdd">继续</button>
		                  </div>
		                  <div class="modal-footer" v-else>  
				                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> 
		                  </div>
					</div>		 	
			  </div>
		</div>
	
	</div>
	

</template>

<script>
	export default{
		data(){
			return {
				status:"",
				text:"",
				hintVal:"",
			}
		},
		methods:{
			continueToAdd(){
				
				let vm = this; 
				 // console.log(vm.indexData.index)
				vm.$http.post(vm.indexData.url,vm.indexData.index).then((result)=>{
					
				   if(result.ok){   
				   	 if(result.data.success){  
				   	 	vm.indexData.itemData.address = result.data.data.address;
				   	 	vm.indexData.itemData.phone = result.data.data.phone;
				   	 	vm.indexData.itemData.email = result.data.data.email;
				   	 	vm.indexData.itemData.ip = result.data.data.ip;
				   	 	vm.indexData.itemData.wechat = result.data.data.wechat;
				   	 	vm.indexData.itemData.qq = result.data.data.qq; 
				   	 	
				   	 	vm.$emit("upload")
				   	 	$("#expense").modal("hide"); 
				   	 }else{  
				   	 	vm.indexData.itemData.address = "";
				   	 	vm.indexData.itemData.phone = "";
				   	 	vm.indexData.itemData.email = "";
				   	 	vm.indexData.itemData.ip = "";
				   	 	vm.indexData.itemData.wechat = ""
				   	 	vm.indexData.itemData.qq = "";
				   	 	vm.text = result.data.message;
				   	 	$("#expense").modal("hide");
				   	 } 
				   }		     
				},(err)=>{
					alert(err);
					return false;
				});
			}
		}, 
		mounted(){   
			let vm =this;  
			
			/*vm.$nextTick(function(){
				vm.status=vm.$store.state.expenseModel.status;
				console.log(vm.status);
			})*/

			$("#expense").on("show.bs.modal",function() {
							
			}).on("shown.bs.modal",function(){ 
				
				vm.status = vm.$store.state.expenseModel.status;
				if(vm.status){
					vm.hintVal = "点击查看将会扣除一次查看机会,是否继续";
				}else{
					vm.hintVal = "余额不足,请充值";
				}
			}).on("hide.bs.modal",function(){

			}).on("hidden.bs.modal",function(){
 
			});   

		}, 
		beforeMount(){  
			//console.log(this.$store.state.expenseModel.status);
			/*  vm.status=vm.$store.state.expenseModel.status; 
			  console.log(vm.status);*/ 
		},
		props:["indexData"],
	} 
</script>

<style scoped>
	.modal{
		z-index: 9999;
	} 
	.modal-footer{
		text-align: center;
	}
</style>