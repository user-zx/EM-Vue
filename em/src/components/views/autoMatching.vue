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
              
                 <div class="col-md-2 col-xs-2" id="myVueCalendar">  
                    <myVueCalendar ></myVueCalendar>
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
							<a v-for="(hItem,index) in searchHead" v-if="hItem.length>0" href="javascript:void(0);" class="search-h">{{index}}</a>
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
			<div class="sellClue_list_div" v-for="(artItem,index) in artList.artContent" v-if="artItem.isShow">
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
                    <div class="sellClue_list_div_div"> <span><i>发布者:</i>{{artItem.salesLeads.author}}</span><span v-if="artItem.salesLeads.matchingResult=='匹配成功'"><i >匹配时间:</i>{artItem.salesLeads.matchingDate}</span><span v-else><i >提交时间:</i>{{artItem.salesLeads.matchingDate}}</span><span><i>线索来源:</i>{{artItem.salesLeads.source}}</span></div>
                    <p>{{artItem.salesLeads.content}}</p>
                   
                    <ul v-if="artItem.salesLeads.matchingResult=='匹配成功'" class="sellClue_list_div_ul"> 
                        <li v-bind:class="{active:artItem.addFavoritesStatus}">
                            <a href="javascript:void(0);" class="btn" v-if="artItem.addFavoritesStatus" @click="favoritesFun(index,artItem.salesLeads.id)"><img src="../../assets/images/collected.png" height="15" width="17">取消收藏</a>
                            <a href="javascript:void(0);" class="btn" @click="favoritesFun(index,artItem.salesLeads.id)" v-else><img src="../../assets/images/collect.png" height="15" width="17">收藏线索</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" class="btn" @click="ignoreFun(index,artItem.salesLeads.id)"><img src="../../assets/images/forgetClue.png" height="16" width="16">忽略线索</a>
                        </li>
                        <li v-bind:class="{active:artItem.labelStatus}">
                            <a v-if="artItem.labelStatus" href="javascript:void(0);" class="btn" @click="labelFun(index,artItem.salesLeads.id)"><img src="../../assets/images/handled.png" height="17" width="14">已处理</a>
                        <button  v-else  class="btn" @click="labelFun(index,artItem.salesLeads.id)"
                        :disabled="artItem.checkStatus">
                        <img src="../../assets/images/handle.png" height="17" width="14" >标记处理</button>    
                        </li>
                    </ul>
                    
                    <button class="btn btn-search" v-if="!artItem.checkStatus" @click="getLinkStatus(index,artItem.salesLeads.id)">联系人信息</button>
                </div> 
				<menu class="clearfix" v-if="artItem.salesLeads.matchingResult=='匹配成功'">
					<li v-show="artItem.salesLeads.address"><img src="../../assets/images/location.png" height="25" width="22" alt=""><strong>{{artItem.salesLeads.address}}</strong></li>
					<li v-show="artItem.salesLeads.phone"><img src="../../assets/images/phone.png" height="22" width="18"><strong>{{artItem.salesLeads.phone}}</strong></li>
					<li v-show="artItem.salesLeads.email"><img src="../../assets/images/email.png" height="21" width="25"><strong>{{artItem.salesLeads.email}}</strong></li>
					<li v-show="artItem.salesLeads.ip"><img src="../../assets/images/IP.png" height="25" width="25"><strong>{{artItem.salesLeads.ip}}</strong></li>
					<li v-show="artItem.salesLeads.wechat"><img src="../../assets/images/wechat.png" height="24" width="24"><strong>{{artItem.salesLeads.wechat}}</strong></li>
					<li v-show="artItem.salesLeads.qq"><img src="../../assets/images/QQ.png" height="24" width="23"><strong>{{artItem.salesLeads.qq}}</strong></li>
                     <li v-show="artItem.salesLeads.otherInfoContent"> 
                        <img src="../../assets/images/qt.png" height="22" width="22">
                        <strong>{{artItem.salesLeads.otherInfoName}} : </strong>
                        <strong>{{artItem.salesLeads.otherInfoContent}}</strong>
                     </li>  
				</menu> 
			</div>
			<div class="pageList clearfix" v-show="!notResult" >
            <ul class="pull-right tz-pagination" >
                                <li>跳转到第</li>
                                <li ><input type="text" id="go-input" style="width:33px;background:#ddd;outline:none;border:1px solid #ddd;text-align:center;"></li>
                                <li>页</li>
                                <li><button class="btn btn-sm" @click="go">GO</button></li>
                            </ul>
				<ul :class="{clearfix:page.clearfix, pagination:page.pagination}" class="pull-right" id="pagination">
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
    import myVueCalendar from "../../components/prompt/myVueCalendar.vue";
   
    export default { 
        data(){   
            return{
                matchingTotalpages:0,
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
                    pageSize:6,
                    pageNumber:1,
					matchingResult:"",
					matchingStartDate:"",
					matchingEndDate:"",
                    labelStatus:"",
                    keywords:"",
                },
                initsearchCon:{
                    pageSize:6,
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
        components:{addMatching,expense,myVueCalendar},
        mounted(){
            let vm=this;
              $(document).on("click","#dataPlug-in-one .datepicker-dateRange>.day-cell",function(){ 
                vm.startDate = $(this).attr("data-date");   
                $("#dataPlug-in-one>button>span").css("display","inline-block")
            }) 
            $(document).on('click', '#dataPlug-in-one>button>span', function(event) {
                vm.startDate  = "";
                $(this).css("display","none");
            }); 
            $(document).on("click","#dataPlug-in-two .datepicker-dateRange>.day-cell",function(){
                vm.endDate = $(this).attr("data-date");  
                $("#dataPlug-in-two>button>span").css("display","inline-block")
            })      
            $(document).on('click', '#dataPlug-in-two>button>span', function(event) {
                vm.endDate  = "";   
                $(this).css("display","none");
            });  
            $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
            let _element=$(".search-menu");
           


            vm.$http.post('../apis/personal/findKeywordList',{"pageSize":10000,"pageNumber":1}).then(function(response){
                if(response.ok){  
                    if(response.data.success){
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
            artListFun(){
                let vm = this;
                vm.$http.post(vm.saleLeadsListUrl,vm.initsearchCon).then(function (response) {
                    if(response.ok) {
                        if (response.data.success) {
                            let typeOf = typeof response.data.data;
                            if(typeOf!="string") { 
                                let newArr = response.data.data.list;
                                for (var i in newArr) {
                                    newArr[i].salesLeads.createDate = new Date(newArr[i].salesLeads.createDate).Format("yyyy-MM-dd hh:mm:ss");
                                    newArr[i].isShow = true;
                                }
                                vm.artList.artContent = newArr;
                                vm.artList.totalPages = response.data.data.totalPages;
                                vm.notResult=false;
                                //console.log(vm.artList.artContent);
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
                vm.$http.post(vm.saleLeadsListUrl,vm.initsearchCon).then( (response)=>{
                    if(response.ok){
                        if(response.data.success){
                            vm.matchingTotalpages=response.data.data.totalPages;
                            //console.log(response.data.data);
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
             go(){
                let vm =this;
                
                let index=Math.round($("#go-input").val()-0);
                if(isNaN(index)||index<0.5){
                   alert("请输入数字并且不小于1");
                   return;
                }else if(index>vm.matchingTotalpages){  

                    alert("超过总页数");
                 }else{
                $(".pagination").jqPaginator('option',{
                    currentPage:index,
                });
                vm.initsearchCon.pageNumber=index;
                vm.artListFun();
            }
            },
             goAnchor(selector) {
               let vm = this;
                setTimeout(function(){
                let val = selector;
                vm.inputVal = val;
                },100) 
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
               
                if(vm.startDate!=""&&vm.endDate!=""&&vm.searchCon.checkEndDate<=vm.searchCon.checkStartDate){
                    vm.searchCon.checkEndDate  = "";
                    vm.searchCon.checkStartDate = "";
                    $("#dataPlug-in-one>input").val("")
                    $("#dataPlug-in-two>input").val("")
                    $("#dataPlug-in-one>button>span").css("display","none");
                    $("#dataPlug-in-two>button>span").css("display","none");
                    alert("开始时间不能大于结束时间!")
                    return false; 
                }
                 vm.initsearchCon=vm.searchCon;


                vm.initsearchCon.pageNumber=1;
                    this.$http.post(vm.saleLeadsListUrl,vm.initsearchCon).then((response)=>{
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
                vm.initsearchCon.keywords=keyword;
                this.$http.post(vm.saleLeadsListUrl,vm.initsearchCon).then((response)=>{
                    if(response.ok){
                        if(response.data.success){
                            let typeOf = typeof response.data.data;
                            if(typeOf!="string") {
                                $("#pagination").jqPaginator({
                                    totalPages:  response.data.data.totalPages,
                                    visiblePages: vm.initsearchCon.pageSize,
                                    currentPage: vm.initsearchCon.pageNumber,
                                   
                                    prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                    next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                  
                                    page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                    onPageChange: function (n){
                                        vm.initsearchCon.pageNumber = n;
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

              
                 this.$http.post("../apis/userSalesLeads/updateOrSaveUserSaleLeads",{salesLeadsId:artId,ignoreSalesLeads:"是"}).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
                                
                                 this.getArtListFun();
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
