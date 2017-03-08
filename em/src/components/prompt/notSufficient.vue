<template>
	<div id="expense" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="expenseTitle" aria-hidden="true">
		 <div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					  <h4 class="text-center">您的套餐不足,<router-link to="/set">请充值</router-link></h4>
				</div>  
				 
				  <div class="modal-footer">   
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> 
		                <button type="button" class="btn btn-primary" @click="continueToAdd">继续</button>
                  </div>
			</div>		 	
		 </div>
	</div>
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		methods:{
			continueToAdd(){
				console.log(this.indexData);
				let vm = this;
				
				
			}
		}, 
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