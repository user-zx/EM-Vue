<template>
	<div class="set publicClass">
		<ul id="myTab" class="nav nav-tabs">
			<li class="active">
				<a href="javascript:void(0);" data-toggle="tab" data-target="#personalInfo">个人信息</a>
			</li>
			<li>
				<a href="javascript:void(0);" data-toggle="tab" data-target="#combo" @click="combo">套餐充值</a>
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
							<div class="col-md-4">
								<div class="form-group">
									<label class="col-md-6 control-label">用户姓名：</label>
									<div class="col-md-6">
										<p class="form-control-static">{{personalInfoObj.user.name}}<span class="user-type">（{{personalInfoObj.user.userStatus}}用户）</span></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-6 control-label">公司名称：</label>
									<div class="col-md-6">
										<p class="form-control-static">{{personalInfoObj.user.company}}</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-6 control-label">所属行业：</label>
									<div class="col-md-6">
										<p class="form-control-static">{{personalInfoObj.user.trade}}</p>
									</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<label class="col-md-6 control-label">密码：</label>
									<div class="col-md-6">
										<p class="form-control-static"><a href="#rePassword" class="update-password" data-toggle="modal" data-target="#rePassword">修改密码</a></p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-6 control-label">绑定手机号：</label>
									<div class="col-md-6">
										<p class="form-control-static">{{personalInfoObj.user.userAccount}}</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-6 control-label">所在地区：</label>
									<div class="col-md-6">
										<p class="form-control-static">{{personalInfoObj.user.province}}-{{personalInfoObj.user.city}}-{{personalInfoObj.user.county}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="panel-heading">
						<h4 class="panel-title">
							套餐信息
							<a href="javascript:void(0);" class="btn btn-search-o" @click="currTab2()">立即充值</a>
						</h4>
					</div>
					<div class="panel-body">
						<div class="form-horizontal">
							<div class="col-md-4">
								<div class="form-group">
									<label class="col-md-6 control-label">套餐信息：</label>
									<div class="col-md-6">
										<p class="form-control-static">{{personalInfoObj.packageInfo.packageName}}</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-6 control-label">已使用查询次数：</label>
									<div class="col-md-6">
										<p class="form-control-static">{{personalInfoObj.packageInfo.usedTimes}}次</p>
									</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<label class="col-md-6 control-label">套餐内查询次数：</label>
									<div class="col-md-6">
										<p class="form-control-static">{{personalInfoObj.packageInfo.leadsTimes}}次</p>
									</div>
								</div>
								<div class="form-group">
									<label class="col-md-6 control-label">剩余查询次数：</label>
									<div class="col-md-6">
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
							<div v-if="packageListArr=='暂无数据'" class="col-md-3 panel-body-div">
								<div >
									<h2>暂无数据</h2>
								</div>
							</div>
							<div v-else class="col-md-3 panel-body-div" v-for="packageItem in packageListArr" >
								<div class="combo-box" >
									<div class="combo-body">
										<h5 class="comboName" :title="packageItem.name"> <span>{{packageItem.name}}</span>  <span class="price">¥{{packageItem.price}}</span></h5>
										<p>内含<span class="text-em">{{packageItem.leadsTimes}}次</span>线索查看</p>
									</div>
									<a href="javascript:void(0);" :id="packageItem.id" class="btn btn-combo" @click="topUp(packageItem.id)">立即充值</a>
								</div>
							</div>
						</div> 
					</div>
				</div>
			</div>
			<div id="keyWordSet" class="tab-pane fade">
				<div class="panel panel-em">
					<div class="panel-body" >
						<div class="search-box clearfix">
							<button class="btn btn-search-o" type="button" data-toggle="modal" data-target="#addKeyWord">添加关键词</button>
							<div class="navbar-form navbar-right" role="search">
								<div class="input-group">
									<input type="text" class="form-control input-search" v-model:value="keyWordSearchCon.keyword" placeholder="输入关键词进行查询">
									<span class="input-group-btn">
										<button class="btn btn-search" @click="searchKeyWordFun()" type="button">搜索</button>
									</span>
								</div>
							</div>
						</div>
						<div class="notResult" v-if="notResult">
							<img src="../../assets/images/notResult.jpg" alt="暂无数据" />
						</div>
						<table v-if="!notResult" class="table table-hover">
							<thead>
								<tr class="active">
									<th class="text-center">关键词</th>
									<th class="text-center">创建时间</th>
									<th class="text-center">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(keyword,index) in keyWordListObj" v-show="keyword.isShow">
									<td class="text-center">{{keyword.keyword}}</td>
									<td class="text-center">{{keyword.createDate}}</td>
									<td class="text-center">
										<div class="bootstrap-switch bootstrap-switch-small">
											<input type="checkbox" v-bind:id="keyword.id" v-if="keyword.status=='启用'" checked />
											<input type="checkbox" v-bind:id="keyword.id" v-else-if="keyword.status!='启用'" />
										</div>
										<a class="del-icons" href="javascript:void(0);" @click="delKeyWordFun(index,keyword.id)"> <i class="glyphicon glyphicon-trash"></i></a>
									</td>
								</tr>
							</tbody>
						</table>
						<div v-if="!notResult" class="pageList clearfix" >
							<ul class="clearfix pagination">

							</ul>
						</div>
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
									<td class="text-center"><span class="text-em">成功</span></td>
								</tr>
							</tbody>
						</table>
						<div class="pageList clearfix" >
							<ul class="clearfix pagination">

							</ul>
						</div>
					</div>
				</div>
			</div> 
		</div>
		<add-key-word :userNumber="keyWordSearchCon.userAccount" @updateList="updateClue"></add-key-word> 
		<re-password></re-password>
		<charge-q-r :chargeQR="chargeQRId"></charge-q-r>
	</div> 
</template> 
<style scoped>
	.nav-tabs{padding-left:20px;padding-right:20px;margin-bottom:15px;box-shadow:1px 1px 1px #e8e8e8;background-color: #ffffff;}
	.nav-tabs>li{padding-left:15px;padding-right:15px;}
	.nav-tabs>li>a{border-left:0;border-right:0;border-top:0;padding-top:15px;padding-bottom:15px;font-size:16px;color:#333333;border-bottom:2px solid transparent;}
	.nav-tabs>li>a:hover{background-color: #ffffff;border-bottom-color:rgba(50,204,202,.8); }
	.nav-tabs>li.active>a:hover,
	.nav-tabs>li.active>a,
	.nav-tabs>li.active>a:focus
	{border-left:0;border-right:0;border-top:0;border-bottom: 2px solid #32ccca;}
	.panel.panel-em>.panel-heading{border-bottom:1px solid #ededed;background-color: #ffffff;width:65%;}
	.panel.panel-em{padding:20px;}
	.panel-em .panel-heading .panel-title{position: relative;color: #333333;font-size: 16px;border-left:4px solid #32ccca;padding:0px 5px;}
	.panel-em .panel-heading .panel-title .warning-tips{margin-left:15px;color:#999999;font-size:14px;}
	.panel-em .panel-heading .panel-title .warning-tips .warning-tel{color:#32ccca;font-size:18px;}
	.panel-em .panel-heading .panel-title .btn-search-o{position: absolute;right:0;bottom:0;color:#32ccca;}
	.panel-em .panel-heading .panel-title .btn-search-o:hover,
	.panel-em .panel-heading .panel-title .btn-search-o:focus{color:#FFFFFF;}
	.panel-em .panel-body .control-label{color:#999999;font-weight: 400;}
	.panel-em .panel-body .form-control-static .user-type{color:#ff9b50;}
	.panel-em .panel-body .form-control-static .update-password{color:#32ccca;margin-left: 5px;}
	.panel-body-div{margin-bottom: 15px;} 
	.panel-em .panel-body .text-em{color: #32ccca;margin: 0 3px;}
	
	.combo-box{background-color: #f2f2f2;border-radius:5px 5px 0 0;}
	.combo-box .combo-body{padding:15px 20px;}

	.comboName>span:first-child{display: block;width:175px; white-space:nowrap; word-break:keep-all; overflow:hidden; text-overflow:ellipsis;} 
	.combo-box .comboName{font-size:16px;color:#333333;position: relative;}
	.comboName>span:nth-child(2){position: absolute;top: 0;right: 0;} 
	.combo-box .comboName .price{float: right;color:#32ccca;}
	.table>thead>tr.active>th{background-color: #fafafa;}
	.del-icons{color:#a1a1a1;}
	.text-em{color:#32ccca;} 
	@import "../../assets/js/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css";
	.bootstrap-switch .bootstrap-switch-handle-off.bootstrap-switch-primary,
	.bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-primary{
		background-color: #32ccca;
	}
	.modal{z-index: 9999}
	#myTabContent .control-label{padding-right:0;}
	#myTabContent .control-label+div{padding-left:0;}

</style>
<script>
	import '../../assets/js/bootstrap-switch/js/bootstrap-switch.min';
	import rePassword from './set/repassword.vue';
	import addKeyWord from './set/addKeyWord.vue';
	import chargeQR from "./set/chargeQR.vue";

	export default {
		data(){
			return{  
				notResult:false,			
				userInfoUrl:"../apis/personal/findPersonalInfo",
				packageListUrl:"../apis/package/getPackageList",
				keyWordListUrl:"../apis/personal/findKeywordList",
				importKeywordUrl:"../apis/import/importKeywordList",
				delKeyWordUrl:"../apis/personal/deleteKeyword",
				batchAddKeyWordUrl:"../apis/personal/batchAddKeyword",
				saveKeyWordUrl:"../apis/personal/saveKeyword",
				consumeListUrl:"../apis/personal/findConsumeList",
                keyWordListObj:[],
				personalInfoObj:{
				    packageInfo:{},
					user:{}
				}, 
                consumeListObj:{},
                packageListArr:{},
				keyWordSearchCon:{
				    pageNumber:1,
					pageSize:10,
					userAccount:"",
					keyword:""
				},
				consumeListSearchCon:{
				    pageNumber:1,
					pageSize:10,  
					userAccount:""
				},
				chargeQRId:"",
			}
		},
        components:{rePassword,addKeyWord,chargeQR},
        mounted(){
			let vm =this;
			/*个人信息*/       
			let data = sessionStorage.getItem('usernumber');
			vm.$http.post("../apis/personal/findPersonalInfo","").then(function(res){
                if(res.ok) {
                    if (res.data.success) {
                        vm.personalInfoObj.packageInfo = res.data.data.packageInfo;
                        vm.personalInfoObj.user = res.data.data.user;
                        vm.keyWordSearchCon.userAccount = res.data.data.user.userAccount;
                    }
                } 
			});
			/*套餐信息*/
            vm.$http.post("../apis/package/getPackageList").then(function(res){

                if(res.ok) {
                    if (res.data.success) {
                        vm.packageListArr=res.data.data;
                    }
                }
            });
//            /*关键词列表*/ 
			
            vm.$http.post(vm.keyWordListUrl,vm.keyWordSearchCon).then(function(res){
				if(res.ok){
				    if(res.data.success){
                        let typeOf = typeof res.data.data;
                        if(typeOf!="string") {
                            $("#keyWordSet .pagination").jqPaginator({
                                totalPages: res.data.data.totalPages,
                                visiblePages: vm.keyWordSearchCon.pageSize,
                                currentPage: vm.keyWordSearchCon.pageNumber,
                                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                onPageChange: function (n) {
                                    vm.keyWordSearchCon.pageNumber = n;
                                    vm.getKeywordListFun();

                                }
                            });
                        }else{
                            alert(res.data.data);
                        }
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
            vm.$http.post(vm.consumeListUrl,vm.consumeListSearchCon).then(function(res) {
                if (res.ok) {
                    if (res.data.success) {
                        let typeOf = typeof res.data.data;
                        if(typeOf!="string") {
                            $("#expenseCalendar .pagination").jqPaginator({
                                totalPages: res.data.data.totalPages,
                                visiblePages: vm.consumeListSearchCon.pageSize,
                                currentPage: vm.consumeListSearchCon.pageNumber,
                                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                onPageChange: function (n) {
                                    vm.consumeListSearchCon.pageNumber = n;
                                    vm.getConsumeList();
                                }
                            });
                        }else{
                            alert(res.data.data);
						}
                    }
                }
            });
		},
		methods:{
			topUp(id){
				this.chargeQRId = id; 
				$('#chargeQR').modal('show')
			},
			currTab2(){
				$('#myTab li:eq(1) a').tab('show')
			},
            getKeywordListFun(){
                let vm =this;
                vm.$http.post(vm.keyWordListUrl,vm.keyWordSearchCon).then(function(res){
                    if(res.ok){
                        if(res.data.success){
                            let typeOf = typeof res.data.data;
                            if(typeOf!="string") {
                                let newArr=res.data.data.content;
                                for(var i in newArr){
                                    newArr[i].createDate=new Date(newArr[i].createDate).Format("yyyy-MM-dd hh:mm:ss");
                                    newArr[i].isShow=true;
                                }
                                vm.keyWordListObj=newArr;
                                setTimeout(function () {
                                    $(".bootstrap-switch input[type=checkbox]").bootstrapSwitch({
                                        onText:"启用",
                                        offText:"禁用",
                                        size:"small",
                                        onSwitchChange:function(event,state){
                                            let data={
                                                id:$(event.target).attr("id"),
                                                status:""
                                            };
                                            if(state==true){
                                                data.status="启用";
                                            }else{
                                                data.status="禁用";
                                            }
                                            vm.$http.post(vm.saveKeyWordUrl,data).then((res)=>{
                                                if(res.ok){
                                                    if(res.data.success){
                                                        console.log(res);
													}
												}
											});
                                        }
                                    });
                                },1000);
                            }else{
                                alert(res.data.data);
                            }
                        }
                    }
                });
			},
			getConsumeList(){
                let vm = this;
                vm.$http.post(vm.consumeListUrl,vm.consumeListSearchCon).then(function(res){
                    if(res.ok) {
                        if (res.data.success) {
                            let typeOf = typeof res.data.data;
                            if(typeOf!="string") {
								vm.consumeListObj=res.data.data;
								for(var i in vm.consumeListObj.content){
									vm.consumeListObj.content[i].consumeDate = new Date(vm.consumeListObj.content[i].consumeDate).Format("yyyy-MM-dd hh:mm:ss");
								}
                            }else{
                                alert(res.data.data);
                            }
                        }
                    }
                });
			},
			searchKeyWordFun(){
			    let vm =this;
				vm.notResult = false;
			    vm.keyWordSearchCon.pageNumber=1;
			    vm.keyWordSearchCon.pageSize=10;
			    vm.$http.post(vm.keyWordListUrl,vm.keyWordSearchCon).then((res)=>{
			        if(res.ok){
			            if(res.data.success){
                            let typeOf = typeof res.data.data;
							if(res.data.data.totalPages>0){
								if(typeOf!="string") {
									$("#keyWordSet .pagination").jqPaginator({
										totalPages: res.data.data.totalPages,
										visiblePages: vm.keyWordSearchCon.pageSize,
										currentPage: vm.keyWordSearchCon.pageNumber,
										first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
										prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
										next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
										last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
										page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
										onPageChange: function (n) {
											vm.keyWordSearchCon.pageNumber = n;
											vm.getKeywordListFun();
										}
									});
								}else{
									alert(res.data.data);
								}
							}else{
								vm.keyWordListObj="";
								this.notResult = true;
							}
						}
					}
				});
			},
			delKeyWordFun(index,id){
			    if(window.confirm('确定删除该关键词吗？')){
                    let vm = this;
                    console.log(vm.keyWordListObj[index]);
                    console.log(id);
                    vm.keyWordListObj[index].isShow=false;
                    console.log(vm.keyWordListObj[index].isShow);
                    vm.$http.post(vm.delKeyWordUrl,id).then((res)=>{
                        if(res.ok) {
                            if (res.data.success) {
                                console.log(res.data);
                                alert('关键词删除成功');
                            }
                        }
                    });
				}
				
			},
			combo(){ 
				let vm = this; 
				 vm.$http.post("../apis/package/getPackageList").then(function(res){
                if(res.ok) { 
                    if (res.data.success) {
                        vm.packageListArr=res.data.data;
                        //console.log( vm.packageListArr);
                    }
                }
            });
			},
			updateClue(){
				let vm = this; 
			  vm.$http.post(vm.keyWordListUrl,vm.keyWordSearchCon).then(function(res){
				if(res.ok){
				    if(res.data.success){
                        let typeOf = typeof res.data.data;
                        if(typeOf!="string") {
                            $("#keyWordSet .pagination").jqPaginator({
                                totalPages: res.data.data.totalPages,
                                visiblePages: vm.keyWordSearchCon.pageSize,
                                currentPage: vm.keyWordSearchCon.pageNumber,
                                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                onPageChange: function (n) {
                                    vm.keyWordSearchCon.pageNumber = n;
                                    vm.getKeywordListFun();

                                }
                            });
                        }else{
                            alert(res.data.data);
                        }
                    }
				  }
               });
			}
		}
	}
</script>
