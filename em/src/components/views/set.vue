<template>
	<div class="set">
		<ul id="myTab" class="nav nav-tabs">
			<li class="active">
				<a href="javascript:void(0);" data-toggle="tab" data-target="#personalInfo">个人信息</a>
			</li>
			<li>
				<a href="javascript:void(0);" data-toggle="tab" data-target="#combo">套餐充值</a>
			</li>
			<li>
				<a href="javascript:void(0);" data-toggle="tab" data-target="#keyWordSet">关键词设置</a>
			</li>
			<li>
				<a href="javascript:void(0);" data-toggle="tab" data-target="#expenseCalendar">消费记录</a>
			</li>
		</ul>
		<div class="tab-content" id="myTabContent">
			<div id="personalInfo" class="tab-pane fade in active">
				<div class="panel panel-em">
					<div class="panel-heading">
						<h4 class="panel-title">账号信息
							<span class="warning-tips">
								<img src="../../assets/images/warning_icons.png"/>
								若您有修改个人信息的需求，请致电客服：<span class="warning-tel">4008-823-823</span>
							</span>
						</h4>
					</div>
					<div class="panel-body">
						<div class="form-horizontal">
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-3 control-label">用户名：</label>
									<div class="col-md-9">
										<p class="form-control-static">张柏宁<span class="user-type">（正式用户）</span></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">公司名称：</label>
									<div class="col-md-9">
										<p class="form-control-static">中科点击（北京）科技有限公司</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">所属行业：</label>
									<div class="col-md-9">
										<p class="form-control-static">大数据舆情</span></p>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-3 control-label">密码：</label>
									<div class="col-md-9">
										<p class="form-control-static">*******<a href="javascript:void(0);" class="update-password">修改密码</a></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">绑定手机号：</label>
									<div class="col-md-9">
										<p class="form-control-static">136****1234</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">所在地区：</label>
									<div class="col-md-9">
										<p class="form-control-static">北京-海淀</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="panel-heading">
						<h4 class="panel-title">
							套餐信息
							<a href="javascript:void(0);" class="btn btn-search">立即充值</a>
						</h4>
					</div>
					<div class="panel-body">
						<div class="form-horizontal">
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-3 control-label">套餐信息：</label>
									<div class="col-md-9">
										<p class="form-control-static">199套餐</span></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">已使用查询次数：</label>
									<div class="col-md-9">
										<p class="form-control-static">50次</p>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-3 control-label">套餐内查询次数：</label>
									<div class="col-md-9">
										<p class="form-control-static">100次</span></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">剩余查询次数：</label>
									<div class="col-md-9">
										<p class="form-control-static">50次</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="combo" class="tab-pane fade">
				套餐充值
			</div>
			<div id="keyWordSet" class="tab-pane fade">
				关键词设置
			</div>
			<div id="expenseCalendar" class="tab-pane fade">
				消费记录
			</div>
		</div>
	</div>
</template>
<style scoped>
	.nav-tabs{padding-left:20px;padding-right:20px;margin-bottom:15px;border:1px solid #dddddd;background-color: #ffffff;}
	.nav-tabs>li{padding-left:15px;padding-right:15px;}
	.nav-tabs>li>a{border-left:0;border-right:0;border-top:0;padding-top:15px;padding-bottom:15px;font-size:16px;color:#333333;border-bottom:2px solid transparent;}
	.nav-tabs>li.active>a:hover,.nav-tabs>li.active>a{border-left:0;border-right:0;border-top:0;border-bottom: 2px solid #32ccca;}
	.nav-tabs>li>a:hover{background-color: #ffffff;border-bottom-color:rgba(50,204,202,.8); }
	.panel.panel-em>.panel-heading{border-bottom:1px solid #ededed;background-color: #ffffff;}
	.panel.panel-em{padding:20px;}
</style>
<script>
	export default {
		data(){
			return{
				mdg:'123'
			}
		}
	}
</script>
