<template>
	<div class="viewLog">
		<div class="search-box">
			<form class="form-horizontal clearfix" role="search">
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
		<div class="art-content">
			<div class="sellClue_list_div" v-for="(artItem,index) in artList.artContent" v-if="!artItem.ignoreStatus">
				<span>{{artItem.salesLeads.type}}</span>
				<h4>{{artItem.salesLeads.title}}</h4>
				<div class="sellClue_list_div_div"> <span><i>关键词:</i> {{artItem.salesLeads.keywords}}</span> <span><i>发布者:</i>{{artItem.salesLeads.author}}</span><span><i>发布时间:</i>{{artItem.salesLeads.publishDate}}</span><span><i>线索来源:</i>{{artItem.salesLeads.source}}</span></div>
				<p>{{artItem.salesLeads.content}}</p>
				<ul class="sellClue_list_div_ul">
					<li v-bind:class="{active:artItem.addFavoritesStatus}">
						<a href="javascript:void(0);" class="btn" v-if="artItem.addFavoritesStatus" @click="favoritesFun(index)"><i class="glyphicon glyphicon-heart-empty"></i>取消收藏</a>
						<a href="javascript:void(0);" class="btn" @click="favoritesFun(index)" v-else><i class="glyphicon glyphicon-heart-empty"></i>收藏线索</a>
					</li>
					<li>
						<a href="javascript:void(0);" class="btn" @click="ignoreFun(index)"><img src="../../assets/images/forgetClue.png" height="16" width="16">忽略线索</a>
					</li>
					<li v-bind:class="{active:artItem.labelStatus}">
						<a v-if="artItem.labelStatus" href="javascript:void(0);" class="btn" @click="labelFun(index)"><i class="glyphicon glyphicon-flag"></i>取消标记</a>
						<a v-else href="javascript:void(0);" class="btn" @click="labelFun(index)"><i class="glyphicon glyphicon-flag"></i>标记处理</a>
					</li>
				</ul>
				<menu class="clearfix">
					<li><img src="../../assets/images/location.png" height="25" width="22" alt=""><strong>{{artItem.salesLeads.address}}</strong></li>
					<li><img src="../../assets/images/phone.png" height="22" width="18"><strong>{{artItem.salesLeads.phone}}</strong></li>
					<li><img src="../../assets/images/email.png" height="21" width="25"><strong>{{artItem.salesLeads.email}}</strong></li>
					<li><img src="../../assets/images/IP.png" height="25" width="25"><strong>{{artItem.salesLeads.ip}}</strong></li>
					<li><img src="../../assets/images/wechat.png" height="24" width="24"><strong>{{artItem.salesLeads.wechat}}</strong></li>
					<li><img src="../../assets/images/QQ.png" height="24" width="23"><strong>{{artItem.salesLeads.qq}}</strong></li>
					<button class="btn btn-search" v-if="!artItem.checkStatus">联系人信息</button>
				</menu>
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
	export default {
		data(){
			return{
				searchHead:{},
				artList:{
                    artContent:[],
					totalPages:''
                },
			}
		},
        mounted(){
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
			vm.$http.post('/apis/salesLeads/getSaleLeadsList',{"pageSize":1000,"pageNumber":1,"checkStatus":"是"}).then(function (response) {
				if(response.ok){
				    if(response.data.success){
						let newArr=response.data.data.list;
						for(var i in newArr){
							newArr[i].salesLeads.publishDate=new Date(newArr[i].salesLeads.publishDate).Format("yyyy-MM-dd hh:mm:ss");
						}
						vm.artList.artContent=newArr;
						vm.artList.totalPages=response.data.data.totalPages;
                    }
				}
            });
        },
		methods:{
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector);
                var parentEle=this.$el.querySelector(".h-box");
                parentEle.scrollTop = anchor.offsetTop
            },
            favoritesFun(index){
				if(this.artList.artContent[index].addFavoritesStatus){
                    this.artList.artContent[index].addFavoritesStatus=false;
				}else{
                    this.artList.artContent[index].addFavoritesStatus=true;
				}
			},
    		ignoreFun(index){
                if(this.artList.artContent[index].ignoreStatus){
                    this.artList.artContent[index].ignoreStatus=false;
                }else{
                    this.artList.artContent[index].ignoreStatus=true;
                }
			},
    		labelFun(index){
                if(this.artList.artContent[index].labelStatus){
                    this.artList.artContent[index].labelStatus=false;
                }else{
                    this.artList.artContent[index].labelStatus=true;
                }
			}
		}
	}
</script>
