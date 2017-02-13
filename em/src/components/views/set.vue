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
							<button class="btn btn-search-o" type="button" data-toggle="modal" data-target="#addKeyWord">添加关键词</button>
							<div class="navbar-form navbar-right" role="search">
								<div class="input-group">
									<input type="text" class="form-control input-search" placeholder="输入关键词进行查询">
									<span class="input-group-btn">
										<button class="btn btn-search" type="button">搜索</button>
									</span>
								</div>
							</div>
						</div>
						<table class="table table-hover">
							<thead>
								<tr class="active">
									<th class="text-center">关键词</th>
									<th class="text-center">创建时间</th>
									<th class="text-center">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="text-center">美白针</td>
									<td class="text-center">2017-02-10 21:31:50</td>
									<td class="text-center">
										<div class="switch">
											<input type="checkbox" />
										</div>
										<a class="del-icons" href="javascript:void(0);"> <i class="glyphicon glyphicon-trash"></i></a>
									</td>
								</tr>
								<tr>
									<td class="text-center">美白针</td>
									<td class="text-center">2017-02-10 21:31:50</td>
									<td class="text-center">
										<div class="switch">
											<input type="checkbox" />
										</div>
										<a class="del-icons" href="javascript:void(0);"> <i class="glyphicon glyphicon-trash"></i></a>
									</td>
								</tr>
								<tr>
									<td class="text-center">美白针</td>
									<td class="text-center">2017-02-10 21:31:50</td>
									<td class="text-center">
										<div class="switch">
											<input type="checkbox" checked />
										</div>
										<a class="del-icons" href="javascript:void(0);"> <i class="glyphicon glyphicon-trash"></i></a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div id="expenseCalendar" class="tab-pane fade">
				<div class="panel panel-em">
					<div class="panel-body">
						<table class="table table-hover">
							<thead>
							<tr class="active">
								<th>时间</th>
								<th>消费类型</th>
								<th>消费金额</th>
								<th>消费状态</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>2017-02-10 21:31:50</td>
								<td>查看线索</td>
								<td>-¥1.99</td>
								<td><span class="text-em">成功</span></td>
							</tr>
							<tr>
								<td>2017-02-10 21:31:50</td>
								<td>查看线索</td>
								<td>-¥1.99</td>
								<td><span class="text-em">成功</span></td>
							</tr>
							<tr>
								<td>2017-02-10 21:31:50</td>
								<td>查看线索</td>
								<td>-¥1.99</td>
								<td><span class="text-em">成功</span></td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="addKeyWord" tabindex="-1" role="dialog" aria-labelledby="addKeyWordLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="addKeyWordLabel"></h4>
					</div>
					<div class="modal-body">
						<textarea class="form-control" placeholder="请输入您需要添加的关键词，批量添加关键词请使用中文逗号隔开">

						</textarea>
						<div class="upload-box">
							<a href="javascript:void(0);"><img src="../../assets/images/set_icon.png" /><label for="upLoadFile">批量添加</label></a>
							<input type="file" id="upLoadFile" class="hide" />
							<a href="javascript:void(0);"><img src="../../assets/images/set_icon1.png" />下载文件模版</a>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary">提交更改</button>
					</div>
				</div>
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
	.table>thead>tr.active>th{background-color: #fafafa;}
	.del-icons{color:#a1a1a1;}
	.text-em{color:#32ccca;}
	.modal .modal-content{border-radius: 0;}
	.modal-header{border-bottom:none;}
	.modal-body textarea{height:150px;border-radius: 5px 5px 0 0;resize: none;}
	.modal-footer{border-top:none;text-align: center;}
	.upload-box{background-color: #f2f2f2;border-radius: 0 0 5px 5px;border:1px solid #ccc;border-top:none;}
	.upload-box>a{margin-left: 0.4%;display: inline-block;width: 49%;color: #999999;padding-top: 10px;padding-bottom: 10px;text-align: center;  font-weight: 400;  background-color: #f2f2f2;  vertical-align: middle;  text-decoration:none;  }
	.upload-box>a:first-child{border-right:1px solid #ccc;}
	.upload-box>a>label{margin-bottom: 0;font-weight: 400;vertical-align: middle;}
	.upload-box>a img{margin-right: 5px;}
	@import "../../assets/style/jquery-switch.css";
</style>
<script>
	import '../../assets/js/jQuery.switch';
	export default {
		data(){
			return{
				mdg:'123'
			}
		},
        mounted(){
			$(".switch input[type=checkbox]").jQuerySwitch();
		}
	}
</script>
