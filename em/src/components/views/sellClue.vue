<template>
<div class="sellClue publicClass">
	<div class="search-box">
		<div class="form-horizontal clearfix" role="search">
			<div class="col-md-2">
				<select v-model="searchCon.source" class="form-control selectpicker" title="线索来源">
					<option value="">不限</option>
					<option value="微博">微博</option>
					<option value="百度贴吧">百度贴吧</option>
				</select>
			 </div>
			<div class="col-md-2">
				<select v-model="searchCon.type" class="form-control selectpicker" title="线索类型">
					<option value="">不限</option>
					<option value="原创">原创</option>
					<option value="转发">转发</option>
					<option value="评论">评论</option>
				</select>
			</div>
			<div class="col-md-2">
				<select v-model="searchCon.labelStatus" class="form-control selectpicker" title="标记状态">
					<option value="">不限</option>
					<option value="已处理">已处理</option>
					<option value="未处理">未处理</option>
				</select>
			</div>
			<div class="col-md-2">
				<input type="text" readonly id="publishTime" class="form-control dropdown-toggle" data-toggle="dropdown" placeholder="发布时间" />
				<div class="dropdown-menu" role="menu" aria-labelledby="publishTime">
					<div class="publish-heading search-menu">
						<div class="clearfix">
							<div class="navbar-form navbar-left">
								<div class="input-group">
									<a href="javascript:void(0);" @click="publishSearch('不限')">不限</a>
									<a href="javascript:void(0);" @click="publishSearch('今天')">今天</a>
									<a href="javascript:void(0);" @click="publishSearch('昨天')">昨天</a>
									<a href="javascript:void(0);" @click="publishSearch('近一周')">近一周</a>
								</div>
							</div>  
							<div class="navbar-right">
								<a href="javascript:void(0);" class="close-modal">×</a>
							</div>
						</div>
						<div class="clearfix date-box">
							<div class="col-md-5">
								<div class="form_datetime">
									<input type="text" class="form-control startDate" readonly placeholder="开始时间">
								</div>
							</div>
							<div class="col-md-5">
								<div class="form_datetime">
									<input type="text" class="form-control endDate" readonly placeholder="结束时间">
								</div>
							</div>
							<div class="col-md-2 text-center">
								<input class="btn btn-search" type="button" @click="publishSearch('自定义')" value="确定" />
							</div>
							<!--<div class="col-md-2">-->
							<!--<input class="btn btn-default" type="button" value="取消" />-->
							<!--</div>-->
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-2">
				<div class="form-group">
					<input  v-model="searchCon.keywords" type="text" class="form-control" placeholder="请输入关键词">
				</div>
			</div>
			<div class="col-md-2">
				<button type="button" class="btn btn-search" @click="multipleSearch()">筛选</button>
				<a href="javascript:void(0);" class="dropdown-toggle dropdown-modal">关键词筛选<i class="caret"></i></a>
				<div class="dropdown-menu search-menu">
					<div class="clearfix">
						<div class="navbar-form navbar-left" role="form">
							<div class="input-group">
								<input type="text" class="form-control" placeholder="输入关键词进行搜索" />
								<span class="input-group-btn">
										<button class="btn btn-search" type="button"><i class="glyphicon glyphicon-search"></i></button>
									</span>
							</div>
						</div>
						<div class="navbar-right">
							<a href="javascript:void(0);" class="close-modal">&times;</a>
						</div>
					</div>
					<div>
						<a v-for="(hItem,index) in searchHead" v-if="hItem.length>0" href="javascript:void(0);" @click="goAnchor('#'+index)" class="search-h">{{index}}</a>
					</div>
					<div class="h-box">
						<div v-for="(hItem,index) in searchHead" v-if="hItem.length>0" v-bind:id="index">
							<div class="lyt-box">
								<div class="lyt-item">
									<div class="lyt-lt">{{index}}</div>
									<div class="lyt-rt">
										<a href="javascript:void(0);" v-bind:id="cItem.id" @click="singleSearch(cItem.keyword)" v-for="cItem in hItem">{{cItem.keyword}}</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<new-data :hintUrl="newDataUrl"></new-data>
	
	<div class="notResult" v-if="notResult">
		<img src="../../assets/images/notResult.jpg" alt="暂无数据" />
	</div>
	<div class="sellClue_list_div" v-for="(artItem,index) in artList.artContent" v-if="!artItem.ignoreStatus">
		<span v-if="artItem.type=='原创'" class="origin">{{artItem.type}}</span> 
		<span v-else-if="artItem.type=='转发'" class="blue">{{artItem.type}}</span>
		<span v-else-if="artItem.type!=null">{{artItem.type}}</span>
		<h4>{{artItem.title}}</h4>
		<div class="sellClue_list_div_div"> <span><i>关键词:</i> {{artItem.keywords}}</span> <span><i>发布者:</i>{{artItem.author}}</span><span><i>发布时间:</i>{{artItem.publishDate}}</span><span><i>线索来源:</i>{{artItem.source}}</span></div>
		<p>{{artItem.content}}</p>
		<ul class="sellClue_list_div_ul">
			<li v-bind:class="{active:artItem.addFavoritesStatus}">
				<a href="javascript:void(0);" class="btn" v-if="artItem.addFavoritesStatus" @click="favoritesFun(index,artItem.id)"><i class="glyphicon glyphicon-heart-empty"></i>取消收藏</a>
				<a href="javascript:void(0);" class="btn" @click="favoritesFun(index,artItem.id)" v-else><i class="glyphicon glyphicon-heart-empty"></i>收藏线索</a>
			</li>
			<li>
				<a href="javascript:void(0);" class="btn" @click="ignoreFun(index,artItem.id)"><img src="../../assets/images/forgetClue.png" height="16" width="16">忽略线索</a>
			</li>
			<li v-bind:class="{active:artItem.labelStatus}">
				<a v-if="artItem.labelStatus" href="javascript:void(0);" class="btn" @click="labelFun(index,artItem.id)"><i class="glyphicon glyphicon-flag"></i>取消标记</a>
				<a v-else href="javascript:void(0);" class="btn" @click="labelFun(index,artItem.id)"><i class="glyphicon glyphicon-flag"></i>标记处理</a>
			</li>
		</ul>
		<menu class="clearfix">
			<li><img src="../../assets/images/location.png" height="25" width="22" alt=""><strong>{{artItem.address}}</strong></li>
			<li><img src="../../assets/images/phone.png" height="22" width="18"><strong>{{artItem.phone}}</strong></li>
			<li><img src="../../assets/images/email.png" height="21" width="25"><strong>{{artItem.email}}</strong></li>
			<li><img src="../../assets/images/IP.png" height="25" width="25"><strong>{{artItem.ip}}</strong></li>
			<li><img src="../../assets/images/wechat.png" height="24" width="24"><strong>{{artItem.wechat}}</strong></li>
			<li><img src="../../assets/images/QQ.png" height="24" width="23"><strong>{{artItem.qq}}</strong></li>
			<button class="btn btn-search" v-if="!artItem.checkStatus" @click="getLinkStatus(index,artItem.id)">联系人信息</button>
		</menu>
	</div>
	<div class="pageList clearfix" v-if="!notResult" >
		<ul class="clearfix pagination" id="pagination">

		</ul>
	</div>
</div>
	
</template>
<script>
	import 'bootstrap-select';  
    import "../../assets/js/jqPaginator.min.js";
    import "../../assets/js/formatData.js";   
    import common from "../../assets/js/common.js";
    import newData from "../head/newData.vue";

	export default {
		data(){  
			return{
                notResult:false,
				sourceList:["线索来源","不限","微博","百度贴吧"],
				typeList:["线索类型","不限","原创","转发","评论"],
				stateList:["标记状态","不限","已处理","未处理"],
				timeList:["发布时间","不限","今天","昨天","自定义时间"],
				bodyDataUrl:"../apis/salesLeads/getHomePageSaleLeadsList",//主体数据
				messageList:"../apis/userSalesLeads/saveCheckUserSaleLeads",//信息列表
				addTypeUrl:"../apis/userSalesLeads/updateOrSaveUserSaleLeads",
				dataList:[],
				messageListID:"",
				message:false,
				pageNumber:1, 
				pageSize:10,
				paramsVo:{},   
				newDataUrl:"../apis/salesLeads/getNewestSalesLeadsCount",
                searchHead:{},
                artList:{
                    artContent:[],
                    totalPages:''
                },
                searchCon:{
                    pageNumber:1,
                    pageSize:10,
                    labelStatus:"",
                    keywords:"",
                    source:"",
                    type:"",
                    checkStartDate:"",
                    checkEndDate:""
                },
                promptMessage:"",
			}
		},
		methods:{
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector);
                var parentEle=this.$el.querySelector(".h-box");
                parentEle.scrollTop = anchor.offsetTop
            },
            multipleSearch(){
                let vm=this;
                this.$http.post(vm.bodyDataUrl,vm.searchCon).then((response)=>{
                    if(response.ok){
                        if(response.data.success){
                            let typeOf = typeof response.data.data;
                            if(typeOf!="string"){
                                $("#pagination").jqPaginator({
                                    totalPages:  response.data.data.totalPages,
                                    visiblePages: vm.searchCon.pageSize,
                                    currentPage: vm.searchCon.pageNumber,
                                    first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                    prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                    next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                    last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                    onPageChange: function (n){
                                        vm.searchCon.pageNumber = n;
                                        vm.page();
                                    }
                                });
                            }else{
                                vm.artList.artContent="";
								vm.artList.totalPages="";
                                vm.notResult=true;
                            }
                        }
                    }
                });
            },
            singleSearch(keyword){
                let vm = this;
                this.$http.post(vm.bodyDataUrl,{"pageSize":10,"pageNumber":1,"labelStatus":"","keywords":keyword,"source":"","type":""}).then((response)=>{
                    if(response.ok){
                        if(response.data.success){
                            let typeOf = typeof response.data.data;
                            if(typeOf!="string"){
								$("#pagination").jqPaginator({
									totalPages:  response.data.data.totalPages,
									visiblePages: vm.searchCon.pageSize,
									currentPage: vm.searchCon.pageNumber,
									first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
									prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
									next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
									last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
									page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
									onPageChange: function (n){
										vm.searchCon.pageNumber = n;
										vm.page();
									}
								});
                            }else{
                                vm.artList.artContent="";
                                vm.artList.totalPages="";
                                vm.notResult=true;
							}
                        }
                    }
                });
            },
            favoritesFun(index,artId){
                let vm = this;  
               /*	console.log(vm.);*/ 
                if(vm.artList.artContent[index].addFavoritesStatus){
                    vm.$http.post(vm.addTypeUrl,{salesLeadsId:artId,addFavorites:"否"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                vm.artList.artContent[index].addFavoritesStatus=false;
                            }else{
                            	vm.promptMessage = ""
                            }
                        }
                    });
                }else{
                    vm.$http.post(vm.addTypeUrl,{salesLeadsId:artId,addFavorites:"是"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                vm.artList.artContent[index].addFavoritesStatus=true;
                            }
                        }
                    });
                }
            },
            ignoreFun(index,artId){
                  let vm = this;   
                  //console.log(vm.artList.artContent[index].ignoreStatus); 
                
                   if(!vm.artList.artContent[index].ignoreStatus){
                   	  vm.$http.post(vm.addTypeUrl,{salesLeadsId:artId,ignoreSalesLeads:"是"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                vm.artList.artContent[index].ignoreStatus=true;
                            }
                        }
                    });
  				} 
               /* if(this.artList.artContent[index].ignoreStatus){
                    vm.$http.post(vm.addTypeUrl,{salesLeadsId:artId,ignoreSalesLeads:"否"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                vm.artList.artContent[index].ignoreStatus=false;
                            }
                        }
                    });
                }else{       
                    vm.$http.post(vm.addTypeUrl,{salesLeadsId:artId,ignoreSalesLeads:"是"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                vm.artList.artContent[index].ignoreStatus=true;
                            }
                        }
                    });
                }*/ 
            },
            labelFun(index,artId){
                let vm = this;
                if(this.artList.artContent[index].labelStatus){
                    vm.$http.post(vm.addTypeUrl,{salesLeadsId:artId,labelStatus:"未处理"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                vm.artList.artContent[index].labelStatus=false;
                            }
                        }
                    });
                }else{
                    vm.$http.post(vm.addTypeUrl,{salesLeadsId:artId,labelStatus:"已处理"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                vm.artList.artContent[index].labelStatus=true;
                            }
                        }
                    });
                }
            },
            getDateStr(AddDayCount) {
                let dd = new Date();
                dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
                let y = dd.getFullYear();
                let m="";
                if(dd.getMonth()+1>9){
                    m= dd.getMonth()+1;//获取当前月份的日期
                }else{
                    m = "0"+(dd.getMonth()+1);//获取当前月份的日期
                }
                let d="";
                if(dd.getDate()>9){
                    d= dd.getDate();
                }else{
                    d = "0"+dd.getDate();
                }
                return y+"-"+m+"-"+d;
            },
            publishSearch(str){
                let vm = this;
                switch (str){
					case "不限":
						vm.searchCon.publishStartDate="";
                        vm.searchCon.publishEndDate="";
                        vm.multipleSearch();
						break;
                    case "今天":
                        const nowDate=vm.getDateStr(0);
                        const startDate=nowDate+" 00:00:00";
                        const endDate=nowDate+" 23:59:59";
                        vm.searchCon.publishStartDate=new Date(startDate);
                        vm.searchCon.publishEndDate=new Date(endDate);
                        vm.multipleSearch();
                        break;
                    case "昨天":
                        const yesterday=vm.getDateStr(-1);
                        const yesterdayStartDate=yesterday+" 00:00:00";
                        const yesterdayEndDate=yesterday+" 23:59:59";
                        vm.searchCon.publishStartDate=new Date(yesterdayStartDate);
                        vm.searchCon.publishStartDate=new Date(yesterdayEndDate);
                        vm.multipleSearch();
                        break;
                    case "近一周":
                        const tDay=vm.getDateStr(0);
                        const weekDate=vm.getDateStr(-7);
                        const weekStartDate=weekDate+" 00:00:00";
                        const weekEndDate=tDay+" 23:59:59";
                        vm.searchCon.publishStartDate=new Date(weekStartDate);
                        vm.searchCon.publishStartDate=new Date(weekEndDate);
                        vm.multipleSearch();
                        break;
                    case "自定义":
                        const customStartDate=$(".startDate").val()+" 00:00:00";
                        const customEndDate=$(".endDate").val()+" 23:59:59";
                        vm.searchCon.publishStartDate=new Date(customStartDate);
                        vm.searchCon.publishStartDate=new Date(customEndDate);
                        vm.multipleSearch();
                        break;
                }
            },
            getLinkStatus(index,salesLeadsId){
				let vm=this;
				vm.$http.post(vm.messageList,salesLeadsId).then((result)=>{
				   console.log(result);
				});
			},
			page:function(){
				let vm  = this;
				vm.$http.post(vm.bodyDataUrl,vm.searchCon).then((response)=>{
                    if(response.ok){
                        if(response.data.success){
                            let typeOf=typeof response.data.data;
                            if(typeOf!="string"){
                                let newArr=response.data.data.list;
                                for(var i in newArr){
                                    newArr[i].publishDate=new Date(newArr[i].publishDate).Format("yyyy-MM-dd hh:mm:ss");
                                }
                                vm.artList.artContent=newArr;
                                vm.artList.totalPages=response.data.data.totalPages;
                                vm.notResult=false;
							}else{
                                vm.artList.artContent="";
                                vm.artList.totalPages="";
                                vm.notResult=true;
							}
                        }
                    }
				},(response)=>{
					if(!response.ok){
					   return false;
				   }
				});
			},
			contactInfo:function(el){
				let vm = this;
				let dataId = el.currentTarget.getAttribute("data-id");
				vm.$http.post(vm.messageList,dataId).then((response)=>{
    			 		console.log(response);
				},(response)=>{
					if(response.data.status==500)
					console.log(response.data.message);
					return false;
			   });
			}
		},   
		mounted:function(){
			console.log('test');      
            let vm=this;
            $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
            let _element=$(".search-menu");
            $(".dropdown-modal").on("click",function () {
                if($(this).parent().hasClass("open")){
                    $(this).parent().removeClass("open");
                }else {
                    $(this).parent().addClass("open");
                }
            });
            $(document).on('click', function(){
                _element.parent().removeClass("open");
            }).on('click', '.search-menu,.dropdown-modal', function(event){
                event.stopPropagation();
            });
            $(".close-modal").on("click",function(){
                $(this).parents(".open").removeClass("open");
            });
            $(".publish-heading .navbar-left a").on("click",function () {
                $(this).addClass("active").siblings().removeClass("active");
            });
            $(".form_datetime .startDate").datetimepicker({
                language:"zh-CN",
                format: "yyyy-MM-dd",
                autoclose:true
            }).on("click",function (ev) {
                var endDate=new Date().Format("yyyy-MM-dd");
                $(".startDate").datetimepicker("setEndDate",endDate);
                $(".endDate").datetimepicker("setEndDate",endDate);
            }).on("outOfRange",function (ev) {
                $(this).val(vm.getDateStr(-1));
            });
            $(".form_datetime .endDate").datetimepicker({
                language:"zh-CN",
                format: "yyyy-MM-dd",
                autoclose:true
            }).on("click",function (ev) {
                var endDate=new Date().Format("yyyy-MM-dd");
                $(".startDate").datetimepicker("setEndDate",endDate);
                $(".endDate").datetimepicker("setEndDate",endDate);
            }).on("outOfRange",function (ev) {
                $(this).val(vm.getDateStr(0));
            });
			vm.$http.post('../apis/personal/findKeywordList',{"pageSize":10,"pageNumber":1}).then(function(response){
				if(response.ok){
				    if(response.data.success){
				        let typeOf=typeof response.data.data;
				        if(typeOf!='string'){
                            let arr=response.data.data.content,
                                conObj={
                                    A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[]
                                };
                            for (let i in arr){
                                for (let j in conObj){
                                    if(j==arr[i].keywordInitial){
                                        const obj=new Object();
                                        obj.id=arr[i].id;
                                        obj.keyword=arr[i].keyword;
                                        conObj[j].push(obj);
                                    }
                                }
                            }
                            vm.searchHead=conObj;
						}
					}
				}
			});
			vm.$http.post(vm.bodyDataUrl,vm.searchCon).then((response)=>{
                let typeOf = typeof response.data.data;
                if(typeOf!="string"){
                    $("#pagination").jqPaginator({
                        totalPages:  response.data.data.totalPages,
                        visiblePages: vm.searchCon.pageSize,
                        currentPage: vm.searchCon.pageNumber,
                        first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                        prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                        next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                        last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                        page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                        onPageChange: function (n){
                            vm.searchCon.pageNumber = n;
                            vm.page();
                        }
                    });
                }else{
                    vm.artList.artContent="";
                    vm.artList.totalPages="";
                    vm.notResult=true;
                }
			},(response)=>{
				if(!response.ok){
					return false;
				}
			});
		},

		components:{
			newData,
		}
		
	}    
</script>
<style scoped>
	@import url("../../assets/style/page.css");
	@import url("../../assets/style/pageList.css");
</style>