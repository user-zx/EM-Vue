<template>
	<div class="viewLog publicClass">

        <expense :indexData="modelData"></expense>
        
		<div class="search-box">
			<div class="form-horizontal clearfix" role="search">
				<div class="col-md-2 col-xs-2">
					<select v-model="searchCon.matchingResult" class="form-control selectpicker" title="匹配结果">
						<option value="">不限</option>
						<option value="匹配成功">匹配成功</option>
						<option value="暂未匹配">暂未匹配</option>
					</select>
				</div>
				<div class="col-md-2 col-xs-2">
					<select v-model="searchCon.labelStatus" class="form-control selectpicker" title="标记状态">
						<option value="">不限</option>
						<option value="已处理">已处理</option>
						<option value="未处理">未处理</option>
					</select>
				</div>
            <div class="col-md-1" id="sjd" > 
                 <my-datepicker-start @startTime="startTime"></my-datepicker-start>
             </div>
             <div class="col-md-1 col-xs-1">  
                <my-datepicker-end @endTime="endTime"></my-datepicker-end>
            </div>
				<div class="col-md-3 col-xs-3">  
					<div class="form-group" style="position:relative;">
                     <img src="../../assets/images/search.png" alt="" style="position:absolute;left:10px;top:10px;">
						<input id="search-k" v-model="searchCon.author" type="text" class="form-control" placeholder="请输入昵称进行搜索">
					</div>
				</div>
				<div class="col-md-1 col-xs-1">
					<button type="button" class="btn btn-search" @click="multipleSearch()"
                     style="border-radius: 0 4px 4px 0;" >搜索</button> 
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
                <div class="col-md-1">
                    <button type="button" class="btn btn-ory" data-toggle="modal" data-target="#addMatching">
                        <i class="glyphicon glyphicon-plus"></i>
                        新建线索
                    </button>
                </div>
			</div>
		</div>
		<div class="art-content">
			<div class="notResult" v-if="notResult">
				<img src="../../assets/images/notResult.jpg" alt="暂无数据" />
			</div>
			<div class="sellClue_list_div" v-for="(artItem,index) in artList.artContent" v-if="!artItem.ignoreStatus">
                <div>
                    <span v-if="artItem.salesLeads.type=='原创'" class="origin">{{artItem.salesLeads.type}}</span>
                    <span v-else-if="artItem.salesLeads.type=='转发'" class="blue">{{artItem.salesLeads.type}}</span> 
                    <span v-else-if="artItem.salesLeads.type!=null">{{artItem.salesLeads.type}}</span>
                    <h4>
                        <a :href="artItem.salesLeads.link" target="_blank">
                            {{artItem.salesLeads.title}} 
                        </a>  
                        <img v-if="artItem.salesLeads.matchingResult=='匹配成功'" src="../../assets/images/sucImg.png"/>
                        <img v-else src="../../assets/images/unSucImg.png" />
                    </h4> 
                    <div class="sellClue_list_div_div"> <span><i>关键词:</i> {{artItem.salesLeads.keywords}}</span> <span><i>发布者:</i>{{artItem.salesLeads.author}}</span><span><i>匹配时间:</i>{{artItem.salesLeads.matchingDate}}</span><span><i>线索来源:</i>{{artItem.salesLeads.source}}</span></div>
                    <p>{{artItem.salesLeads.content}}</p>
                   
                    <ul v-if="artItem.salesLeads.matchingResult=='匹配成功'" class="sellClue_list_div_ul"> 
                        <li v-bind:class="{active:artItem.addFavoritesStatus}">
                            <a href="javascript:void(0);" class="btn" v-if="artItem.addFavoritesStatus" @click="favoritesFun(index,artItem.salesLeads.id)"><i class="glyphicon glyphicon-heart-empty"></i>取消收藏</a>
                            <a href="javascript:void(0);" class="btn" @click="favoritesFun(index,artItem.salesLeads.id)" v-else><i class="glyphicon glyphicon-heart-empty"></i>收藏线索</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" class="btn" @click="ignoreFun(index,artItem.salesLeads.id)"><img src="../../assets/images/forgetClue.png" height="16" width="16">忽略线索</a>
                        </li>
                        <li v-bind:class="{active:artItem.labelStatus}">
                            <a v-if="artItem.labelStatus" href="javascript:void(0);" class="btn" @click="labelFun(index,artItem.salesLeads.id)"><i class="glyphicon glyphicon-flag"></i>取消标记</a>
                            <a v-else href="javascript:void(0);" class="btn" @click="labelFun(index,artItem.salesLeads.id)"><i class="glyphicon glyphicon-flag"></i>标记处理</a>
                        </li>
                    </ul>
                
                    <button class="btn btn-search" v-if="!artItem.checkStatus && artItem.salesLeads.matchingResult=='匹配成功'" @click="getLinkStatus(index,artItem.salesLeads.id)">联系人信息</button>
                </div>
				<menu class="clearfix" v-if="artItem.salesLeads.matchingResult=='匹配成功'">
					<li><img src="../../assets/images/location.png" height="25" width="22" alt=""><strong>{{artItem.salesLeads.address}}</strong></li>
					<li><img src="../../assets/images/phone.png" height="22" width="18"><strong>{{artItem.salesLeads.phone}}</strong></li>
					<li><img src="../../assets/images/email.png" height="21" width="25"><strong>{{artItem.salesLeads.email}}</strong></li>
					<li><img src="../../assets/images/IP.png" height="25" width="25"><strong>{{artItem.salesLeads.ip}}</strong></li>
					<li><img src="../../assets/images/wechat.png" height="24" width="24"><strong>{{artItem.salesLeads.wechat}}</strong></li>
					<li><img src="../../assets/images/QQ.png" height="24" width="23"><strong>{{artItem.salesLeads.qq}}</strong></li>
				</menu> 
			</div>
			<div class="pageList clearfix" v-show="!notResult" >
				<ul :class="{clearfix:page.clearfix, pagination:page.pagination}" id="pagination">
				</ul>
			</div>
		</div>  
        <add-matching @increment="getArtListFun"></add-matching>
	</div>
</template>
<style scoped>
	@import url("../../assets/style/page.css");
    .sellClue_list_div>ul>li{ 
        float: left;    
        margin-right: 8px; 
    }
</style>
<script>
    import 'bootstrap-select'; 
    import "../../assets/js/jqPaginator.min.js";
    import "../../assets/js/formatData.js";
    import common from '../../assets/js/common.js';
    import addMatching from './matching/addMatching.vue';
    import expense from "../prompt/expense.vue";      
    import myDatepickerStart from "../../components/prompt/myDatepickerStart.vue";
    import myDatepickerEnd from "../../components/prompt/myDatepickerEnd.vue";
    export default { 
        data(){   
            return{
                notResult:false,
                saleLeadsListUrl:'../apis/salesLeads/getMatchingSaleLeadsList',
                searchHead:{},   
                artList:{
                    artContent:[],
                    totalPages:''
                },
                messageList:"../apis/userSalesLeads/saveCheckUserSaleLeads",
                page:{
                    clearfix:true,
                    pagination:true,
                },
                searchCon:{
                    pageSize:10,
                    pageNumber:1,
					matchingResult:"",
					matchingStartDate:"",
					matchingEndDate:"",
                    labelStatus:"",
                    keywords:"",
                },
                modelData:{},
                refresh:{},
                startDate:"",
                endDate:"",
            } 
        },    
        props:["activeClass","datePicker"], 
        components:{addMatching,expense,myDatepickerStart,myDatepickerEnd},
        mounted(){
            let vm=this;
            $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
            let _element=$(".search-menu");
           


            vm.$http.post('../apis/personal/findKeywordList',{"pageSize":10,"pageNumber":1}).then(function(response){
                if(response.ok){  
                    if(response.data.success){
                        //console.log(response);
                        let typeOf=typeof response.data.data;
                        if(typeOf!="string"){
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
                        }else{
                            console.log(response.data.data);
						}
                    }else{
                        alert(response.data.message);
					}
                }
            }); 
           
            vm.getArtListFun();
        },
        methods:{
            startTime(date){
                let vm = this; 
                vm.startDate= date;
            },       
            endTime(date){ 
                let vm = this;   
                vm.endDate = date;  
            }, 
            artListFun(){
                let vm = this;
                vm.$http.post(vm.saleLeadsListUrl,vm.searchCon).then(function (response) {
                    if(response.ok) {
                        if (response.data.success) {
                            let typeOf = typeof response.data.data;
                            //console.log(response.data.data); 
                            if(typeOf!="string") { 
                                let newArr = response.data.data.list;
                                for (var i in newArr) {
                                    newArr[i].salesLeads.createDate = new Date(newArr[i].salesLeads.createDate).Format("yyyy-MM-dd hh:mm:ss");
                                }
                                vm.artList.artContent = newArr;
                                vm.artList.totalPages = response.data.data.totalPages;
                                vm.notResult=false;
                            }else{ 
                                vm.notResult=true;
                                vm.artList.artContent="";
                                vm.artList.totalPages="";
                            }
                        }
                    }
                });
            },
            getArtListFun(){
                let vm=this;
                vm.$http.post(vm.saleLeadsListUrl,vm.searchCon).then( (response)=>{
                    if(response.ok){
                        if(response.data.success){
                            let typeOf = typeof response.data.data;
                            if(typeOf!="string") {
                                $("#pagination").jqPaginator({
                                    totalPages: response.data.data.totalPages,
                                    visiblePages: vm.searchCon.pageSize,
                                    currentPage: vm.searchCon.pageNumber,
                                    first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                    prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                    next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                    last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                    onPageChange: function (n) {
                                        vm.searchCon.pageNumber = n;
                                        vm.artListFun();
                                        
                                    }
                                });
                            }else{ 
                                vm.notResult=true;
                                vm.artList.artContent="";
                                vm.artList.totalPages="";
                            }
                        }else{
                            console.log(response.data.message);

                        }
                    }
                },(err)=>{
                    console.log(err);
                });
            },
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector);
                var parentEle=this.$el.querySelector(".h-box");
                parentEle.scrollTop = anchor.offsetTop
            },
            //筛选
            multipleSearch(){
                let vm=this;
                  if(vm.startDate==""){
                     vm.searchCon.checkStartDate = "";
                }else{
                     vm.searchCon.checkStartDate = new Date(vm.startDate + " 00:00:00");
                }
                if(vm.endDate==""){ 
                    vm.searchCon.checkEndDate = "";
                }else{ 
                    vm.searchCon.checkEndDate =new Date(vm.endDate + " 23:59:59") ;
                }
                //console.log(vm.searchCon);
                     this.$http.post(vm.saleLeadsListUrl,vm.searchCon).then((response)=>{
                    if(response.ok){
                        if(response.data.success){
                            let typeOf = typeof response.data.data;
                            if(typeOf!="string") { 
                                $("#pagination").jqPaginator({
                                    totalPages: response.data.data.totalPages,
                                    visiblePages: vm.searchCon.pageSize,
                                    currentPage: vm.searchCon.pageNumber,  
                                    first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                    prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                    next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                    last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                    onPageChange: function (n) {
                                        vm.searchCon.pageNumber = n;
                                        vm.artListFun();
                                        if($(".sellClue_list_div").length==1){
                                           vm.notResult = false;
                                        } 
                                         
                                    }, 
                                });
                            }else{
                                vm.notResult=true;
                                vm.artList.artContent="";
                                vm.artList.totalPages="";
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
                                    first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                    prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                    next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                    last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                    onPageChange: function (n){
                                        vm.searchCon.pageNumber = n;
                                        vm.artListFun();
                                    }
                                });
                            }else{
                                vm.notResult=true;
                                vm.artList.artContent="";
                                vm.artList.totalPages="";
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

               if(!this.artList.artContent[index].ignoreStatus){
                 this.$http.post("../apis/userSalesLeads/updateOrSaveUserSaleLeads",{salesLeadsId:artId,ignoreSalesLeads:"是"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                this.getArtListFun();

                            }
                        }
                    });
               }
               
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
                        vm.searchCon.matchingStartDate="";
                        vm.searchCon.matchingEndDate="";
                        vm.multipleSearch();
                        break;
                    case "今天":
                        const nowDate=vm.getDateStr(0);
                        const startDate=nowDate+" 00:00:00";
                        const endDate=nowDate+" 23:59:59";
                        vm.searchCon.matchingStartDate=new Date(startDate);
                        vm.searchCon.matchingEndDate=new Date(endDate);
                        vm.multipleSearch();
                        break;
                    case "昨天":
                        const yesterday=vm.getDateStr(-1);
                        const yesterdayStartDate=yesterday+" 00:00:00";
                        const yesterdayEndDate=yesterday+" 23:59:59";
                        vm.searchCon.matchingStartDate=new Date(yesterdayStartDate);
                        vm.searchCon.matchingEndDate=new Date(yesterdayEndDate);
                        vm.multipleSearch();
                        break;
                    case "近一周":
                        const tDay=vm.getDateStr(0);
                        const weekDate=vm.getDateStr(-7);
                        const weekStartDate=weekDate+" 00:00:00";
                        const weekEndDate=tDay+" 23:59:59";
                        vm.searchCon.matchingStartDate=new Date(weekStartDate);
                        vm.searchCon.matchingEndDate=new Date(weekEndDate);
                        vm.multipleSearch();
                        break;
                    case "自定义":
                        const customStartDate=$(".startDate").val()+" 00:00:00";
                        const customEndDate=$(".endDate").val()+" 23:59:59";
                        vm.searchCon.matchingStartDate=new Date(customStartDate);
                        vm.searchCon.matchingEndDate=new Date(customEndDate);
                        vm.multipleSearch();
                        break;
                }
            },
            getLinkStatus(index,artItemId){
                let vm = this;
              
                
                 
                vm.$http.post("../apis/userSalesLeads/checkUserCount").then((result)=>{
                    //console.log(result);
                    if(result.ok){  
                        if(result.data.success){

                            vm.modelData.url = vm.messageList;
                             vm.modelData.index = artItemId; 
                             vm.modelData.itemData = vm.artList.artContent[index].salesLeads;
                             // console.log( vm.artList.artContent[index].salesLeads); 
                             vm.$store.commit("setExpenseModelStatus",true)
                             $("#expense").modal("show");   
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
        }
    }
</script>
