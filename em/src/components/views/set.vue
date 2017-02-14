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
										<p class="form-control-static">{{personalInfoObj.user.name}}<span class="user-type">（{{personalInfoObj.user.userStatus}}用户）</span></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">公司名称：</label>
									<div class="col-md-9">
										<p class="form-control-static">{{personalInfoObj.user.company}}</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">所属行业：</label>
									<div class="col-md-9">
										<p class="form-control-static">{{personalInfoObj.user.trade}}</p>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-3 control-label">密码：</label>
									<div class="col-md-9">
										<p class="form-control-static">*******<a href="#rePassword" class="update-password" data-toggle="modal" data-target="#rePassword">修改密码</a></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">绑定手机号：</label>
									<div class="col-md-9">
										<p class="form-control-static">{{personalInfoObj.user.userAccount}}</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">所在地区：</label>
									<div class="col-md-9">
										<p class="form-control-static">{{personalInfoObj.user.county}}</p>
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
										<p class="form-control-static">{{personalInfoObj.packageInfo.packageName}}</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">已使用查询次数：</label>
									<div class="col-md-9">
										<p class="form-control-static">{{personalInfoObj.packageInfo.usedTimes}}次</p>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="col-md-3 control-label">套餐内查询次数：</label>
									<div class="col-md-9">
										<p class="form-control-static">{{personalInfoObj.packageInfo.leadsTimes}}次</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label">剩余查询次数：</label>
									<div class="col-md-9">
										<p class="form-control-static">{{personalInfoObj.packageInfo.restTimes}}次</p>
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
							<div class="col-md-3" v-for="packageItem in packageListArr">
								<div class="combo-box">
									<div class="combo-body">
										<h5 class="comboName">{{packageItem.name}} <span class="price">¥{{packageItem.price}}</span></h5>
										<p>内含<span class="text-em">{{packageItem.leadsTimes}}次</span>线索查看</p>
									</div>
									<a href="javascript:void(0);" v-bind:id="packageItem.id" class="btn btn-combo">立即充值</a>
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
								<tr v-for="keyword in keyWordListObj.content">
									<td class="text-center">{{keyword.keyword}}</td>
									<td class="text-center">{{keyword.createDate}}</td>
									<td class="text-center">
										<div class="switch">
											<input type="checkbox" v-if="keyword.status=='启用'" checked />
											<input type="checkbox" v-else-if="keyword.status!='启用'" />
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
									<th class="text-center">消费类型</th>
									<th class="text-center">消费金额</th>
									<th class="text-center">消费状态</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="consumeItem in consumeListObj.content">
									<td>{{consumeItem.consumeDate}}</td>
									<td class="text-center">{{consumeItem.type}}</td>
									<td class="text-center">¥{{consumeItem.amount}}</td>
									<td class="text-center"><span class="text-em">{{consumeItem.status}}</span></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<add-key-word></add-key-word>
		<re-password></re-password>
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
	@import "../../assets/style/jquery-switch.css";
</style>
<script>
	import '../../assets/js/jQuery.switch';
	import rePassword from './set/repassword.vue';
	import addKeyWord from './set/addKeyWord.vue';
	export default {
		data(){
			return{
				userInfoUrl:"/apis/personal/findPersonalInfo",
				packageListUrl:"/apis/package/getPackageList",
				keyWordListUrl:"/apis/personal/findKeywordList",
				importKeywordUrl:"/apis/import/importKeywordList",
				delKeyWordUrl:"/apis/personal/deleteKeyword",
				batchAddKeyWordUrl:"/apis/personal/batchAddKeyword",
				saveKeyWordUrl:"/apis/personal/saveKeyword",
				consumeListUrl:"/apis/personal/findConsumeList",
                keyWordListObj:{},
				personalInfoObj:{
				    packageInfo:{},
					user:{}
				},
                consumeListObj:{},
                packageListArr:{},
			}
		},
        components:{rePassword,addKeyWord},
        mounted(){
			var vm =this;
			/*查询用户信息*/
			vm.$http.post("/apis/personal/findPersonalInfo","13612345678").then(function(res){
                if(res.ok) {
                    if (res.data.success) {
                        vm.personalInfoObj.packageInfo = res.data.data.packageInfo;
                        vm.personalInfoObj.user = res.data.data.user;
                    }
                }
			});
			/*套餐信息*/
            vm.$http.post("/apis/package/getPackageList").then(function(res){
                if(res.ok) {
                    if (res.data.success) {
                        console.log(res.data.data);
                        vm.packageListArr=res.data.data;
                    }
                }
            });
//            /*修改密码*/
//            vm.$http.post("/apis/modifyPassword",{oldPassword:"a123456",newPassword:"a123456"}).then(function(res){
//                console.log(res);
//            });
//            /*关键词列表*/
            vm.$http.post("/apis/personal/findKeywordList",{pageNumber:1,pageSize:10,userAccount:"13612345678"}).then(function(res){
				if(res.ok){
				    if(res.data.success){
                        vm.keyWordListObj=res.data.data;
                        for(var i in vm.keyWordListObj.content){
                            vm.keyWordListObj.content[i].createDate=new Date(vm.keyWordListObj.content[i].createDate).Format("yyyy-MM-dd hh:mm:ss");
                        }
                        setTimeout(function () {
                            $(".switch input[type=checkbox]").jQuerySwitch({
                                onText:"启用",
								offText:"禁用"
							});
                        },1000);
                    }
				}
            });
            /**批量添加关键词   import/importKeywordList
			 * fileName：       文件名称
			 * keywordOwner：       关键词拥有者*/
            /**删除关键词
			 *personal/deleteKeyword
			 * Id
			 * */
            /**
			 * 批量关键词添加
			 * personal/batchAddKeyword
			 * keyword
			 * */
            /*
            * 更新关键词
            * personal/saveKeyword
            * id
            * keyword
            * status
            * userAccount
            * createDate
            * createUser
            * */
            /*消费记录 personal/findConsumeList  {pageNumber:1,pageSize:100}*/
            vm.$http.post("/apis/personal/findConsumeList",{pageNumber:1,pageSize:10,userAccount:"13284191177"}).then(function(res){
                if(res.ok) {
                    if (res.data.success) {
                        vm.consumeListObj=res.data.data;
                        for(var i in vm.consumeListObj.content){
                        	vm.consumeListObj.content[i].consumeDate=new Date(vm.consumeListObj.content[i].consumeDate).Format("yyyy-MM-dd hh:mm:ss");
						}
                    }
                }
            });
		}
	}
</script>
