<template>
	<div class="form-horizontal box_404">
		<img src="../../assets/images/404.png" height="344" width="365">
		<p class="text-center">对不起,您访问的页面目前没有数据</p>
		<div class="box_404_div">
			<router-link to="/login" class="btn btn-info" >返回首页</router-link>
		</div>
	</div>
</template>
<style scoped>
	.box_404>img{
		display: block;
		margin: 20px auto; 
	}
	.box_404_div{
		position: relative;
	} 
	.box_404_div>a{
		position: absolute;
		top: 10px;      
		left: 50%;
		margin-left: -41px;
	}
</style>

<script>
	
</script>