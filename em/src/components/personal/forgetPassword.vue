<template>
	<div class="findPassword">
		<heads></heads>
		<div class="findPassword_body">
				<h2>找回密码</h2>
				<div>
					<label>
						<span>手机号:</span><input type="text" name="" v-model="phone" placeholder="请输入手机号">
					</label>
					<label class="findPassword_body_label">
						<span>验证码:</span><input type="text" name="" v-model="Verification" placeholder="请输入验证码" id="verification">
						<button id="getVerification" @click="getVerification()">获取验证码</button>
					</label>
					<label>
						<span>新密码:</span><input type="password" name="" placeholder="请输入密码" >
					</label>
					<button @click="submit()" class="findPassword_body_button">提交</button>
					<label>
						<router-link to="/login" class="returnLogin"> >>返回登录</router-link>
					</label>
				</div>
		</div>
	</div>
</template>
<script>
    import heads from "../head/heads.vue";
	export default{
		data(){
			return {
				phone:"",
				Verification:"", 
			}
		},
		methods:{  
			submit:function(){
				//提交
			},
			getVerification:function(){
				//获取验证码
			}
		},
		components:{
			heads
		}
	}
</script>

<style  scoped>
	.findPassword{
		width: 100%;
		height: 100%; 
		background-color: #f2f2f2;
	}  
	.findPassword_body{
		width: 750px;
		height: 390px; 
		margin: 50px auto;
		border: 1px solid #e5e5e5;
		padding-top: 110px;
		position: relative;
	}
	.findPassword_body>div{
		background-color: #FFF;
		height: 100%;
		padding-top: 50px;
	}
	.findPassword_body>h2{
		position: absolute;
		top: 20px; 
		left: 45px;
	}   
	.findPassword_body>div>label{
		display: block;
		text-align: center;
		position: relative;
		margin-bottom: 15px;
	}
	.findPassword_body>div>label>span{
		position: absolute;
		left: 180px;
		top: 3px;	 	
	}  
	.findPassword_body>div>label>input{
		width: 270px; 
		padding: 3px;
	}
	.findPassword_body_button{
		width: 270px;
		display: block;
		margin: 0 auto;
		background-color: #32ccca;			
		border: 0;
		color: #fff;
		padding: 5px;
		margin-bottom: 10px;
	}
	.findPassword_body_label{
		position: relative;
	}
	#verification{
		width: 165px;
	} 
	#getVerification{
		width: 100px;
		background-color: #FFF;
		border: 1px solid #32ccca;
		color: #32ccca;
		font: 500 12px "Microsoft Yahei";
		padding:6px 5px;
		-webkit-border-radius: 3px;
		        border-radius: 3px;
	} 
	.returnLogin{
		color: #272727;
		font: 14px "Microsoft Yahei";
		text-decoration: none;
	}
</style>  