<template>
<div class="sellClue">
	<div class="search-box">
		<form class="form-horizontal clearfix">
			   <div class="col-md-2">
					<select class="form-control selectpicker">
						<option>线索来源</option>
						<option>线索来源</option>
						<option>线索来源</option>
						<option>线索来源</option>
						<option>线索来源</option>
						<option>线索来源</option>
					</select>
				</div>
				<div class="col-md-2">
					<select class="form-control selectpicker">
						<option>线索类型</option>
						<option>线索类型</option>
						<option>线索类型</option>
						<option>线索类型</option>
						<option>线索类型</option>
						<option>线索类型</option>
					</select>
				</div>
				<div class="col-md-2">
					<select class="form-control selectpicker">
						<option>标记状态</option>
						<option>标记状态</option>
						<option>标记状态</option>
						<option>标记状态</option>
						<option>标记状态</option>
						<option>标记状态</option>
					</select>
				</div>
				<div class="col-md-2">
					<select class="form-control selectpicker">
						<option>发布时间</option>
						<option>发布时间</option>
						<option>发布时间</option>
						<option>发布时间</option>
						<option>发布时间</option>
						<option>发布时间</option>
					</select>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="请输入关键词">
					</div>
				</div>
				<div class="col-md-2">
					<button type="submit" class="btn btn-search">筛选</button>
					<a href="javascript:void(0);" class="dropdown-toggle dropdown-modal">关键词筛选<i class="caret"></i></a>
					<div class="dropdown-menu search-menu">
						<div class="clearfix">
							<form class="navbar-form navbar-left" role="form">
								<div class="input-group">
									<input type="text" class="form-control" placeholder="输入关键词进行搜索" />
									<span class="input-group-btn">
										<button class="btn btn-search" type="button"><i class="glyphicon glyphicon-search"></i></button>
									</span>
								</div>
							</form>
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
											<a href="javascript:void(0);" v-bind:id="cItem.id" v-for="cItem in hItem">{{cItem.keyword}}</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		</form>
	</div> 
	<new-data :hintUrl="newDataUrl" ></new-data>
	<div class="sellClue_list"> 
		<div class="sellClue_list_div" v-for="(item,index) in dataList">
			
			<span v-if="item.type=='原创'" class="origin">{{item.type}}</span>
			<span v-else-if="item.type=='转发'" class="blue">{{item.type}}</span>
			<span v-else-if="item.type!=null">{{item.type}}</span> 
			
			<h4>{{item.title}}</h4>   
		    <div class="sellClue_list_div_div"> <span><i>关键词:</i>{{item.keywords}}</span> <span><i>发布者:</i>{{item.author}}</span><span><i>发布时间:</i>{{item.time}}</span><span><i>线索来源:</i>{{item.source}}</span></div>
		    <p>{{item.content}}</p>
		    <ul class="sellClue_list_div_ul">
		        <li><a href="javascript:;" class="btn"><i class="glyphicon glyphicon-heart-empty"></i>收藏线索</a></li>
		        <li><a href="javascript:;" class="btn"><img src="../../assets/images/forgetClue.png" height="16" width="16">忽略线索</a></li>
		        <li><a href="javascript:;" class="btn"><i class="glyphicon glyphicon-flag"></i>标记处理</a></li>
		    </ul>
			
		    <menu class="clearfix">
	    	    <li><img src="../../assets/images/location.png" height="25" width="22" alt=""><strong :class="message">{{item.address}}</strong></li>
	    	    <li><img src="../../assets/images/phone.png" height="22" width="18"><strong :class="message">{{item.phone}}</strong></li>
	    	    <li><img src="../../assets/images/email.png" height="21" width="25"><strong :class="message">{{item.email}}</strong></li>
	    	    <li><img src="../../assets/images/IP.png" height="25" width="25"><strong :class="message">{{item.ip}}</strong></li>
	    	    <li><img src="../../assets/images/wechat.png" height="24" width="24"><strong :class="message">{{item.wechat}}</strong></li>
	    	    <li><img src="../../assets/images/QQ.png" height="24" width="23"><strong :class="message">{{item.qq}}</strong></li> 
		    	<button @click="contactInfo($event)" :data-id="item.id">联系人信息</button>
		    </menu> 
		</div>
		
		<!-- <div class="sellClue_list_div">
			<span>评论</span>
			<h4>最近感觉自己太胖了</h4>
		    <div class="sellClue_list_div_div"> <span><i>关键词:</i> 减肥、胖</span> <span><i>发布者:</i>蓝色的太昂</span><span><i>发布时间:</i>2016-1-1 11:11:11</span><span><i>线索来源:</i>百度贴吧</span></div>
		    <p>我和王医生见面的地方在一个商场里的咖啡休息区。这是一位在行业里口碑和声望都很不错、拥有十几年经验的医生，属于手术基本要排到3个月之后的那种。不过和其他医生不同，王医生每天接触的“病人”是一群想要变美的女性。当美图秀秀等P图软件不再能满足中国姑娘们变美需求的时候，“整形”、“美容”、“动刀”早就不是一件遥远而可怕的事情。像王医生这样小有名气的整形美容医生，也越来越多的受到消费者的追捧</p>
		    <ul class="sellClue_list_div_ul">
		        <li><i class="glyphicon glyphicon-heart-empty"></i>收藏线索</li>
		        <li><img src="../../assets/images/forgetClue.png" height="16" width="16">忽略线索</li>
		        <li><i class="glyphicon glyphicon-flag"></i>标记处理</li>
		    </ul>
		    <menu class="clearfix">
			    	    <li><img src="../../assets/images/location.png" height="25" width="22" alt=""><strong>北京市海淀区丹棱街3号</strong></li>
			    	    <li><img src="../../assets/images/phone.png" height="22" width="18"><strong>13284191177</strong></li>
			    	    <li><img src="../../assets/images/email.png" height="21" width="25"><strong>1192344027@qq.com</strong></li>
			    	    <li><img src="../../assets/images/IP.png" height="25" width="25"><strong>192.176.1.1(北京电信)</strong></li>
			    	    <li><img src="../../assets/images/wechat.png" height="24" width="24"><strong>zbngood</strong></li>
			    	    <li><img src="../../assets/images/QQ.png" height="24" width="23"><strong>9888811122</strong></li>
		    	<button>联系人信息</button>
		    </menu> 
		</div> -->
		<div class="pageList clearfix" >
			 <ul class="clearfix pagination" id="pagination">
					
		     </ul>
		    
		     <span>
		     	
		     </span>
		</div>
		

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
				sourceList:["线索来源","不限","微博","百度贴吧"],
				typeList:["线索类型","不限","原创","转发","评论"],
				stateList:["标记状态","不限","已处理","未处理"],
				timeList:["发布时间","不限","今天","昨天","自定义时间"],
				bodyDataUrl:"apis/salesLeads/getHomePageSaleLeadsList",//主体数据
				messageList:"apis/userSalesLeads/saveCheckUserSaleLeads",//信息列表
				dataList:[],
				searchHead:{},
				messageListID:"",
				message:false,
				paramsVo:{
					"pageNumber": 1,
				    "pageSize": 10
				}, 
				newDataUrl:"apis/salesLeads/getNewestSalesLeadsCount",
			}
		},
		methods:{ 
			page:function(url){
				let vm  = this;
				
			vm.$http.post(url,vm.paramsVo).then((response)=>{	
				const list = response.data.data.list;
				//console.log(list);
				for (var prop in list) { 
					const time = new Date(list[prop].publishDate).Format("yyyy-MM-dd hh:mm:ss");
					const item = {
						'type':list[prop].type,
						'title':list[prop].title,
						'keywords':list[prop].keywords,
						'author':list[prop].author,
						'time':time,
						'source':list[prop].source,
						'content':list[prop].content,
						'id':list[prop].id,
						'address':list[prop].address,
						'phone':list[prop].phone,
						'email':list[prop].email,
						'ip':list[prop].ip,
						'wechat':list[prop].wechat,
						'qq':list[prop].qq
					};
					vm.dataList.push(item);	
				}
				
				},(response)=>{
					if(!response.ok){
					   return false;
				   }
				})
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
    		       })
			}
		},   
		mounted:function(){
			//console.log(common); 
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
		        $(this).parents(".search-menu").parent().removeClass("open");
			});
		    let vm=this;
			vm.$http.post('/apis/personal/findKeywordList',{"pageSize":10000,"pageNumber":1,"userAccount":"13612345678"}).then(function(response){
				if(response.ok){
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
			});
			
			
			vm.$http.post(vm.bodyDataUrl,vm.paramsVo).then((response)=>{
				
			 $("#pagination").jqPaginator({
	            totalPages: response.data.data.totalPages,
	            visiblePages: vm.paramsVo.pageSize,
	            currentPage: vm.paramsVo.pageNumber,
	            first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
	            prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
	            next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
	            last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
	            page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
	            onPageChange: function (n) {
	            	vm.dataList = [];
	                vm.page(vm.bodyDataUrl);
	            }
	        });
			
			},(response)=>{
				console.log(response);
				if(!response.ok){
					return false;
				}
			});
			//console.log(vm.messageListID);
    		//messageList
    		
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