<template>
	<p id="newData" @click="clicknewdata()" v-show="newSell">有<span>{{newSell}}</span>条新线索,点击刷新</p>
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
                dataLength:"",
                newdata:"",
                newSell:0,
			}
		},
		props:["hintUrl"],
		mounted(){ 
			let vm = this;
			let timer = null;
			let post = common.post;

			
			post(vm.$http,vm.hintUrl,"",(res)=>{
					vm.newdata = res.data.data; 
				},(err)=>{ 
					console.log(err);
					return false;
				})
			timer = setInterval(autoplay,1000*60*5);  
			function autoplay(){  
				post(vm.$http,vm.hintUrl,"",(res)=>{
					console.log(res);  
					vm.dataLength = res.data.data;
					 if(vm.dataLength > vm.newdata){
					 	vm.newSell = vm.dataLength - vm.newdata;
					 	vm.newdata = vm.dataLength;
					 }else{
					 	vm.newSell = 0;
					 }
				},(err)=>{ 
					console.log(err);
					return false;
				})
			}
		},
		methods:{
			clicknewdata(){
				window.location.reload();
			}
		}

	}
</script>