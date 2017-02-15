<template>
	<p id="newData" @click="newdata()">有<span>10</span>条新线索,点击刷新</p>
</template>

<style scoped>
	#newData{
		text-align: center;
		background-color: #fff6c6;
		color: #b79a02;
		padding: 5px;
		margin: 0 15px;
		cursor: pointer;
	}	 
</style>
<script>
    import common from "../../assets/js/common.js";
	export default{
		data(){
			return{
                msg:"新数据提醒",
			}
		},
		props:["hintUrl"],
		mounted(){ 
			/*console.log(this.hintUrl);
			console.log(this.params);*/

			let vm = this;
			let timer = null;
			//console.log(vm.hintUrl); 
			/*console.log(common.post);*/
			let post = common.post;
			 
			post(vm.$http,vm.hintUrl,"",(res)=>{
					console.log(res); 
				},(err)=>{ 
					/*if (!err.ok) {
						console.log(err);
						return false;
					}*/ 
					//console.log(err);
				})
			 
			timer = setInterval(autoplay,1000*60*5);
			function autoplay(){
				
			}
		},
		methods:{
			newdata(){

				window.location.reload();
			}
		}

	}
</script>