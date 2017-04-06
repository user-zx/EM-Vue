<template>
	<div class="viewLog publicClass">
	    <expense :indexData="modelData" @upload="getArtListFun"></expense>
		<div class="search-box">
			<div class="form-horizontal clearfix" role="search">
				<div class="col-xs-2 select">
					<select v-model="searchCon.source" class="form-control selectpicker" title="线索来源">
						<option value="">不限</option>
						<option value="微博">微博</option>
						<option value="百度贴吧">百度贴吧</option>
					</select>
				</div>
				<div class="col-xs-2 select">
					<select v-model="searchCon.type" class="form-control selectpicker" title="线索类型">
						<option value="">不限</option>
						<option value="原创">原创</option>
						<option value="转发">转发</option>
						<option value="评论">评论</option>
					</select>
				</div>
				<div class="col-xs-2 select">
					<select v-model="searchCon.labelStatus" class="form-control selectpicker" title="标记状态">
						<option value="">不限</option>
						<option value="已处理">已处理</option>
						<option value="未处理">未处理</option>
					</select>
				</div>
			
             <div class="col-xs-2" id="myVueCalendar">  
				<myVueCalendar ></myVueCalendar>
			</div>
			<div class="col-xs-2">
			    
				<div class="form-group" style="position:relative;" >
				    <img src="../../assets/images/search.png" alt="" style="position:absolute;left:10px;top:10px;">
					<input id="search-k" v-model="searchCon.keywords" type="text" class="form-control" placeholder="请输入关键词">
				</div>
			</div>
			<div class="col-xs-2">
				<button type="button" class="btn btn-search" @click="multipleSearch()" style="border-radius: 0 4px 4px 0;" >搜索</button>
					<a href="javascript:void(0);" class="dropdown-toggle dropdown-modal">关键词筛选<i class="caret"></i></a>
					<div class="dropdown-menu search-menu">
						<div class="clearfix">
							<div class="navbar-form navbar-left" role="form">
								<div class="input-group">
									<input type="text" class="form-control" placeholder="输入关键词进行搜索" v-model="inputVal"/>
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
							<a v-for="(hItem,index) in filteredData" v-if="hItem.length>0" href="javascript:void(0);" @click="goAnchor('#'+index)" class="search-h">{{index}}</a>
						</div>
						<div class="h-box">
							<div v-for="(hItem,index) in filteredData" v-if="hItem.length>0" v-bind:id="index">
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
		<div class="art-content">
			<div class="notResult" v-if="notResult">
				<img src="../../assets/images/notResult.jpg" alt="暂无数据" />
			</div>
			<div class="sellClue_list_div" v-for="(artItem,index) in artList.artContent" v-if="artItem.isShow">
				<div>  
					<span v-if="artItem.salesLeads.type=='原创'" class="origin">{{artItem.salesLeads.type}}</span>
					<span v-else-if="artItem.salesLeads.type=='转发'" class="blue">{{artItem.salesLeads.type}}</span>
					<span v-else-if="artItem.salesLeads.type!=null">{{artItem.salesLeads.type}}</span>
					<h4 v-if="artItem.salesLeads.title"> <a :href="artItem.salesLeads.link" target="_blank">{{artItem.salesLeads.title}}</a> </h4>   
					<h4 v-else>	   
						<a :href="artItem.salesLeads.link" target="_blank">
							<img v-if="artItem.salesLeads.matchingResult=='匹配成功'" src="../../assets/images/sucImg.png" />
							<img v-else src="../../assets/images/unSucImg.png" />
						</a>
					</h4>
					<div class="sellClue_list_div_div"> <span><i>关键词:</i> {{artItem.salesLeads.keywords}}</span> <span><i>发布者:</i>{{artItem.salesLeads.author}}</span><span><i>发布时间:</i>{{artItem.salesLeads.publishDate}}</span><span><i>线索来源:</i>{{artItem.salesLeads.source}}</span><a :href="artItem.salesLeads.link" target="_blank" title="点击跳转到原文">原文链接</a></div>
					<p>{{artItem.salesLeads.content}}</p>
					<ul class="sellClue_list_div_ul">
						<li v-bind:class="{active:artItem.addFavoritesStatus}">
							<a href="javascript:void(0);" class="btn" v-if="artItem.addFavoritesStatus" @click="favoritesFun(index,artItem.salesLeads.id)"><img src="../../assets/images/collected.png" height="15" width="17">取消收藏</a>
							<a href="javascript:void(0);" class="btn" @click="favoritesFun(index,artItem.salesLeads.id)" v-else><img src="../../assets/images/collect.png" height="15" width="17">收藏线索</a>
						</li>
						<li>
							<a href="javascript:void(0);" class="btn" @click="ignoreFun(index,artItem.salesLeads.id)"><img src="../../assets/images/forgetClue.png" height="16" width="16">忽略线索</a>
						</li>
						<li v-bind:class="{active:artItem.labelStatus}">
							<a v-if="artItem.labelStatus" href="javascript:void(0);" class="btn handled" @click="labelFun(index,artItem.salesLeads.id)"><img src="../../assets/images/handled.png" height="17" width="14">已处理</a>
					<button  v-else  class="btn" @click="labelFun(index,artItem.salesLeads.id)"
					:disabled="!artItem.checkStatus">
					<img src="../../assets/images/handle.png" height="17" width="14" >标记处理</button>    
						</li>
					</ul>   
					<button class="btn btn-search" v-if="!artItem.checkStatus" @click="getLinkStatus(index,artItem.salesLeads.id)">联系人信息</button>
				</div> 
				<menu class="clearfix">   
						<li v-if="artItem.salesLeads.address=='默认值'">
							<img src="../../assets/images/location.png" height="25" width="22" alt="">
						</li> 
						<li v-else-if="artItem.salesLeads.address!='默认值' && artItem.salesLeads.address!=''&&artItem.salesLeads.address!=null">
							<img src="../../assets/images/location.png" height="25" width="22" alt="">
							<strong  >{{artItem.salesLeads.address}}</strong>
						</li>
						
						<li v-if="artItem.salesLeads.phone=='默认值'">
							<img src="../../assets/images/phone.png" height="22" width="18">
						</li>
						<li v-else-if="artItem.salesLeads.phone!='默认值' && artItem.salesLeads.phone!=''&&artItem.salesLeads.phone!=null">
							<img src="../../assets/images/phone.png" height="25" width="22" alt="">
							<strong  >{{artItem.salesLeads.phone}}</strong>
						</li>
							
						<li v-if="artItem.salesLeads.email=='默认值'">
							<img src="../../assets/images/email.png" height="21" width="25">
						</li>
						<li v-else-if="artItem.salesLeads.email!='默认值' && artItem.salesLeads.email!=''&&artItem.salesLeads.email!=null">
							<img src="../../assets/images/email.png" height="25" width="22" alt="">
							<strong  >{{artItem.salesLeads.email}}</strong>
						</li>
						
						<li v-if="artItem.salesLeads.ip=='默认值'">
							<img src="../../assets/images/IP.png" height="25" width="25">
						</li>
						<li v-else-if="artItem.salesLeads.ip!='默认值' && artItem.salesLeads.ip!=''&&artItem.salesLeads.ip!=null">
							<img src="../../assets/images/IP.png" height="25" width="22" alt="">
							<strong  >{{artItem.salesLeads.ip}}</strong>
						</li>

						<li v-if="artItem.salesLeads.wechat=='默认值'">
							<img src="../../assets/images/wechat.png" height="24" width="24">
						</li>
						<li v-else-if="artItem.salesLeads.wechat!='默认值' && artItem.salesLeads.wechat!=''&&artItem.salesLeads.wechat!=null">
							<img src="../../assets/images/wechat.png" height="25" width="22" alt="">
							<strong  >{{artItem.salesLeads.wechat}}</strong>
						</li>

						<li v-if="artItem.salesLeads.qq=='默认值'"> 
							<img src="../../assets/images/QQ.png" height="24" width="23">
						</li>    
						<li v-else-if="artItem.salesLeads.qq!='默认值' && artItem.salesLeads.qq!=''&&artItem.salesLeads.qq!=null">
							<img src="../../assets/images/QQ.png" height="25" width="22" alt="">
							<strong  >{{artItem.salesLeads.qq}}</strong>
						</li>
							
						<li v-if="artItem.salesLeads.otherInfoContent=='默认值'"> 
							<img src="../../assets/images/qt.png" height="22" width="22">
						</li> 
						<li v-else-if="artItem.salesLeads.otherInfoContent!='默认值' && artItem.salesLeads.otherInfoContent!='' && artItem.salesLeads.otherInfoContent!= null">
							<img src="../../assets/images/qt.png" height="25" width="22" alt="">
							<strong>{{artItem.salesLeads.otherInfoName}}</strong>
							<strong>{{artItem.salesLeads.otherInfoContent}}</strong>
						</li> 
				</menu> 
			</div> 
			<div class="pageList clearfix" v-show="!notResult" >
				<ul class="tz-pagination pull-right" >
									<li>跳转到第</li>
									<li ><input type="text" id="go-input" ></li>
									<li>页</li>
									<li><button class="btn btn-sm" @click="go">GO</button></li>
				</ul>
				<ul class="clearfix pagination pull-right" id="pagination">
					
				</ul>
			</div>
		</div>
	</div>
</template>
<style scoped>
	@import url("../../assets/style/page.css");
	
</style>
<script>
	import 'bootstrap-select';
    import "../../assets/js/jqPaginator.min.js";
    import "../../assets/js/formatData.js";
    import common from '../../assets/js/common.js';
    import expense from "../prompt/expense.vue"; 
    import myVueCalendar from "../../components/prompt/myVueCalendar.vue";
   
	export default {
		data(){
			return{
				viewLogTotalpages:0,
                notResult:false,
                saleLeadsListUrl:'../apis/salesLeads/getSaleLeadsList',
                messageList:"../apis/userSalesLeads/saveCheckUserSaleLeads",
				searchHead:{},
				artList:{
                    artContent:[],
					totalPages:''
                },
				searchCon:{  
                    pageSize:6,
                    pageNumber:1,
                    ignoreSalesleads:"否",
                    checkStatus:"是",
					labelStatus:"",
					keywords:"",
					source:"",
					type:"",
					publishStartDate:"",
					publishEndDate:""
				},
				initsearchCon:{  
                    pageSize:6,
                    pageNumber:1,
                    ignoreSalesleads:"否",
                    checkStatus:"是",
					labelStatus:"",
					keywords:"",
					source:"",
					type:"",
					publishStartDate:"",
					publishEndDate:""
				},
				modelData:{},
				startDate:"",
				endDate:"",
				 inputVal:"",
                inputArr:[],
                inputObj:"",
			} 
		},
        mounted(){
            let vm=this;
             $(document).on("click","#dataPlug-in-one .datepicker-dateRange>.day-cell",function(){ 
                vm.startDate = $(this).attr("data-date");   
                $("#dataPlug-in-one>button>span").css("display","inline-block")
            }) 
            $(document).on('click', '#dataPlug-in-one>button', function(event) {
                vm.startDate  = "";
                $(this).children('span').css("display","none");
            }); 
            $(document).on("click","#dataPlug-in-two .datepicker-dateRange>.day-cell",function(){
                vm.endDate = $(this).attr("data-date");  
                $("#dataPlug-in-two>button>span").css("display","inline-block")
            })      
            $(document).on('click', '#dataPlug-in-two>button', function(event) {
                vm.endDate  = "";   
                $(this).children('span').css("display","none");
            });   
              
             
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

           
			vm.$http.post('../apis/personal/findKeywordList',{"pageSize":10000,"pageNumber":1}).then(function(response){
				if(response.ok){
				    if(response.data.success){
				        let typeOf= typeof response.data.data;
				        if(typeOf !='string'){
                            let arr=response.data.data.content,
                                conObj={
                                    A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[]
                                };
                                let temporaryArr = [];
                               // console.log(arr);
                            for (let i in arr){
                                for (let j in conObj){
                                	temporaryArr.push(j);
                                    if(j==arr[i].keywordInitial){
                                        const obj=new Object();
                                        obj.id=arr[i].id;
                                        obj.keyword=arr[i].keyword;
                                        conObj[j].push(obj);
                                    }
                                }
                            }
                            vm.searchHead=conObj;
                             let n_arr = [];   
                               for (var i = 0; i < temporaryArr.length; i++) {
                            	  	 if (n_arr.indexOf(temporaryArr[i]) == -1) n_arr.push(temporaryArr[i]);
                            	  }
                           		vm.inputArr = n_arr;	
						}
					}
				}
			});  
            vm.getArtListFun();
        }, 
        computed:{ 
			filteredData(){ 
				let vm = this;
				let obj_arr = {};
				 var inputVal = vm.inputVal && vm.inputVal.toLowerCase(); 
				let search_Head = vm.searchHead;

				let input_Arr = vm.inputArr
				for (let j in input_Arr) { 
					var arrObj = search_Head[input_Arr[j]];
 					for (let i = 0; i < arrObj.length; i++) {
 						arrObj[i].sing = input_Arr[j];
 					} 
					//console.log(arrObj);  
					if(inputVal){  
					    arrObj = arrObj.filter(function(row) {
                        return Object.keys(row).some(function(key) {
                            return String(row[key]).toLowerCase().indexOf(inputVal) > -1
                        }) 
                     })

					}  
					
					obj_arr[input_Arr[j]] = arrObj
				} 
				return obj_arr;
			}
		},
		methods:{
			
            artListFun(){
                let vm=this;
              
                vm.$http.post(vm.saleLeadsListUrl,vm.initsearchCon).then(function (response) {
                	//console.log(response);
                    if(response.ok) {
                        if (response.data.success) {
                            let typeOf = typeof response.data.data;
                            if(typeOf!="string") {
                                let newArr = response.data.data.list;
                                for (var i in newArr) {
                                    newArr[i].salesLeads.publishDate = new Date(newArr[i].salesLeads.publishDate).Format("yyyy-MM-dd hh:mm:ss");
                                   
                                    newArr[i].isShow = true;
                                }
                                vm.artList.artContent = newArr;
                                vm.artList.totalPages = response.data.data.totalPages;
                                vm.notResult=false;
                               
                             // console.log(vm.artList.artContent);
                            }else{
                                vm.notResult=true;
                                vm.artList.artContent="";
                                vm.artList.totalPages="";
							}
                        }
                    }
                });
			},
			go(){
				let vm =this;
				
				let index=Math.round($("#go-input").val()-0);
				if(isNaN(index)||index<0.5){
				   alert("请输入数字并且不小于1");
				   return;
				}else if(index>vm.viewLogTotalpages){  

                 	alert("超过总页数");
                 }else{
				$(".pagination").jqPaginator('option',{
					currentPage:index,
				});
				vm.initsearchCon.pageNumber=index;
				vm.artListFun();
			}
			},
			getArtListFun(){
                let vm=this;
               vm.initsearchCon.labelStatus= vm.searchCon.labelStatus;
               vm.initsearchCon.keywords= vm.searchCon.keywords;
               vm.initsearchCon.source= vm.searchCon.source;
               vm.initsearchCon.type= vm.searchCon.type;
               vm.initsearchCon.publishStartDate= vm.searchCon.publishStartDate;
               vm.initsearchCon.publishEndDate= vm.searchCon.publishEndDate;
                vm.$http.post(vm.saleLeadsListUrl,vm.initsearchCon).then(function (response) {
                	//console.log(response);
                    if(response.ok){
                        if(response.data.success){
                        	 vm.viewLogTotalpages=response.data.data.totalPages;

                            let typeOf = typeof response.data.data;
                            if(typeOf!="string") {
                                $("#pagination").jqPaginator({
                                    totalPages: response.data.data.totalPages,
                                    visiblePages: vm.initsearchCon.pageSize,
                                    currentPage: vm.initsearchCon.pageNumber,
                                   
                                    prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                    next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                    
                                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                    onPageChange: function (n) {
                                        vm.initsearchCon.pageNumber = n;
                                      
                                        if(response.data.data.totalPages==0){
                                        	vm.notResult = true;
                                        }else{
                                        	vm.artListFun();
                                        }
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
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector);
                var parentEle=this.$el.querySelector(".h-box");
                parentEle.scrollTop = anchor.offsetTop
            },
            multipleSearch(){
				let vm=this; 
				 if(vm.startDate==""){
                     vm.searchCon.publishStartDate = "";
                     if(vm.startDate==""&&vm.endDate!=""){
                      alert("开始时间不能为空");
                      return;
                      }
                }else{
                     vm.searchCon.publishStartDate =new Date((vm.startDate + " 00:00:00").replace(/-/g,"/"));
                }
                if(vm.endDate==""){   
                    vm.searchCon.publishEndDate = "";
                     if(vm.startDate!=""&&vm.endDate==""){
                	  alert("结束时间不能为空");
                      return;
                      }  
                }else{ 
                    vm.searchCon.publishEndDate =new Date((vm.endDate + " 23:59:59").replace(/-/g,"/"));
                }
               
                if(vm.startDate!=""&&vm.endDate!=""&&vm.searchCon.publishEndDate<=vm.searchCon.publishStartDate){
                    vm.searchCon.publishEndDate  = "";
                    vm.searchCon.publishStartDate = "";

                    $("#dataPlug-in-one>button>span").css("display","none");
                    $("#dataPlug-in-two>button>span").css("display","none");
                    alert("开始时间不能大于结束时间!")
                    return; 
                }
                //var init=JSON.parse(JSON.stringify(vm.searchCon));
               vm.initsearchCon=vm.searchCon;

				vm.initsearchCon.pageNumber=1;
                this.$http.post(vm.saleLeadsListUrl,vm.initsearchCon).then((response)=>{
                	console.log(vm.initsearchCon);
                    if(response.ok){
                        if(response.data.success){
                            let typeOf = typeof response.data.data;
                            if(typeOf!="string") {
                            	
                                $("#pagination").jqPaginator({ 
                                    totalPages: response.data.data.totalPages,
                                    visiblePages: vm.initsearchCon.pageSize,
                                    currentPage: vm.initsearchCon.pageNumber,
                                   
                                    prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                    next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                    
                                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                    onPageChange: function (n) {
                                        vm.initsearchCon.pageNumber = n;

                                        vm.artListFun();
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
                vm.searchCon.keywords=keyword;
				this.$http.post(vm.saleLeadsListUrl,vm.searchCon).then((response)=>{
                    if(response.ok){
                        if(response.data.success){
                            let typeOf = typeof response.data.data;
                            if(typeOf!="string") {
								$("#pagination").jqPaginator({
									totalPages:  response.data.data.totalPages,
									visiblePages: vm.searchCon.pageSize,
									currentPage: vm.searchCon.pageNumber,
									prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
									next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
									page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
									onPageChange: function (n){ 
										vm.searchCon.pageNumber = n; 
										vm.$http.post(vm.saleLeadsListUrl,vm.searchCon).then((res)=>{
			                                let newArr = res.data.data.list;
			                                for(var i in newArr){
			                                    newArr[i].salesLeads.publishDate=new Date(newArr[i].salesLeads.publishDate).Format("yyyy-MM-dd hh:mm:ss");
			                                     newArr[i].isShow = true;
			                                }
			                                vm.artList.artContent=newArr;
			                                vm.artList.totalPages=res.data.data.totalPages;
			                                vm.notResult=false;
										 },(err)=>{
										 	vm.artList.artContent="";
			                                vm.artList.totalPages="";
			                                vm.notResult=true;
										 }) 
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
				if(this.artList.artContent[index].addFavoritesStatus){
				    this.$http.post("../apis/userSalesLeads/updateOrSaveUserSaleLeads",{salesLeadsId:artId,addFavorites:"否"}).then((res)=>{
				        if(res.ok){
				            if(res.data.success){
                                vm.artList.artContent[index].addFavoritesStatus=false;
                            }
						}
                    });
				}else{
                    this.$http.post("../apis/userSalesLeads/updateOrSaveUserSaleLeads",{salesLeadsId:artId,addFavorites:"是"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                vm.artList.artContent[index].addFavoritesStatus=true;
                            }
                        }
                    });
				}
			},
    		ignoreFun(index,artId){
               			this.$http.post("../apis/userSalesLeads/updateOrSaveUserSaleLeads",{salesLeadsId:artId,ignoreSalesLeads:"是"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                this.artList.artContent[index].isShow=false;
                             
                                if($(".sellClue_list_div").length==1){
                                	this.notResult = true;
                                }
                            }
                        }
                    });
			},
    		labelFun(index,artId){ 
                if(this.artList.artContent[index].labelStatus){
                    this.$http.post("../apis/userSalesLeads/updateOrSaveUserSaleLeads",{salesLeadsId:artId,labelStatus:"未处理"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                this.artList.artContent[index].labelStatus=false;
                            }
                        }
                    });
                }else{
                    this.$http.post("../apis/userSalesLeads/updateOrSaveUserSaleLeads",{salesLeadsId:artId,labelStatus:"已处理"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                this.artList.artContent[index].labelStatus=true;
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
                        vm.searchCon.checkStartDate="";
                        vm.searchCon.checkEndDate="";
                        vm.multipleSearch();
					break;
					case "今天":
                        const nowDate=vm.getDateStr(0);
					    const startDate=nowDate+" 00:00:00";
                        const endDate=nowDate+" 23:59:59";
						vm.searchCon.checkStartDate=new Date(startDate);
						vm.searchCon.checkEndDate=new Date(endDate);
						vm.multipleSearch();
					break;
                    case "昨天":
                        const yesterday=vm.getDateStr(-1);
                        const yesterdayStartDate=yesterday+" 00:00:00";
                        const yesterdayEndDate=yesterday+" 23:59:59";
                        vm.searchCon.checkStartDate=new Date(yesterdayStartDate);
                        vm.searchCon.checkEndDate=new Date(yesterdayEndDate);
                        vm.multipleSearch();
					break;
					case "近一周":
                        const tDay=vm.getDateStr(0);
                        const weekDate=vm.getDateStr(-7);
                        const weekStartDate=weekDate+" 00:00:00";
                        const weekEndDate=tDay+" 23:59:59";
                        vm.searchCon.checkStartDate=new Date(weekStartDate);
                        vm.searchCon.checkEndDate=new Date(weekEndDate);
                        vm.multipleSearch();
					break;
					case "自定义":
                        const customStartDate=$(".startDate").val()+" 00:00:00";
                        const customEndDate=$(".endDate").val()+" 23:59:59";
                        vm.searchCon.checkStartDate=new Date(customStartDate);
                        vm.searchCon.checkEndDate=new Date(customEndDate);
                        vm.multipleSearch();
					break;
				}
			},
			getLinkStatus(index,artItemId){
                let vm = this;
                vm.$http.post("../apis/userSalesLeads/checkUserCount").then((result)=>{
                    if(result.ok){   
                        if(result.data.success){
                             vm.modelData.url = vm.messageList; 
                             vm.modelData.index = artItemId;  
                             vm.modelData.itemData = vm.artList.artContent[index].salesLeads;
                             vm.$store.commit("setExpenseModelStatus",true)
                             $("#expense").modal("show"); 
                           	
                             console.log( vm.modelData.itemData );  
                        }else{
                             vm.$store.commit("setExpenseModelStatus",false) 
                             $("#expense").modal("show");  
                        }
                    }
                }, (err)=>{
                     console.log(err); 
                     vm.$store.commit("setExpenseModelStatus",false) 
                     alert(err);  
                     return false;
                })
           }
		},  
		components:{expense,myVueCalendar},
	}
</script>
