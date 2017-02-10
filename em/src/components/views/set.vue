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
							<a href="javascript:void(0);" class="btn btn-search-o">立即充值</a>
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
				<div class="panel panel-em">
					<div class="panel-body">
						<div class="row">
							<div class="col-md-3">
								<div class="combo-box">
									<div class="combo-body">
										<h5 class="comboName">套餐名称 <span class="price">¥199</span></h5>
										<p>内含<span class="text-em">100次</span>线索查看</p>
									</div>
									<a href="javascript:void(0);" class="btn btn-combo">立即充值</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="keyWordSet" class="tab-pane fade">
				<div class="panel panel-em">
					<div class="panel-body">
						<div class="search-box clearfix">
							<button class="btn btn-search-o" type="button">添加关键词</button>
							<div class="navbar-form navbar-right" role="search">
								<div class="input-group">
									<input type="text" class="form-control input-search" placeholder="输入关键词进行查询">
									<span class="input-group-btn">
										<button class="btn btn-search" type="button">搜索</button>
									</span>
								</div>
							</div>
						</div>
						<div class="table-reponse">
							
						</div>
					</div>
				</div>
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
	.panel-em .panel-heading .panel-title{position: relative;color: #333333;font-size: 16px;border-left:2px solid #32ccca;padding:5px 5px;}
	.panel-em .panel-heading .panel-title .warning-tips{margin-left:15px;color:#999999;font-size:14px;}
	.panel-em .panel-heading .panel-title .warning-tips .warning-tel{color:#32ccca;font-size:18px;}
	.panel-em .panel-heading .panel-title .btn-search-o{position: absolute;right: 0;bottom:0;color:#32ccca;}
	.panel-em .panel-heading .panel-title .btn-search-o:hover,
	.panel-em .panel-heading .panel-title .btn-search-o:focus{color:#FFFFFF;}
	.panel-em .panel-body .control-label{color:#999999;font-weight: 400;}
	.panel-em .panel-body .form-control-static .user-type{color:#ff9b50;}
	.panel-em .panel-body .form-control-static .update-password{color:#32ccca;margin-left: 5px;}
	.panel-em .panel-body .text-em{color: #32ccca;margin: 0 3px;}
	.combo-box{background-color: #f2f2f2;border-radius:5px 5px 0 0;}
	.combo-box .combo-body{padding:15px 20px;}
	.combo-box .comboName{font-size:18px;color:#333333;}
	.combo-box .comboName .price{float: right;color:#32ccca;}
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
