<template>
<div class="autoMatching">
	<form class="form-horizontal clearfix">  
		<div class="col-md-2">
			<select class="form-control">
				<option>匹配结果:</option>
				<option>线索来源</option>
				<option>线索来源</option>
				<option>线索来源</option>
				<option>线索来源</option>
				<option>线索来源</option>
			</select>
		</div>
		<div class="col-md-2">
			<select class="form-control ">
				<option>提交时间:</option>
				<option>线索来源</option>
				<option>线索来源</option>
				<option>线索来源</option>
				<option>线索来源</option>
				<option>线索来源</option>
			</select>
		</div> 
		<div class="col-md-3">
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
		 <div class="col-md-2">
		 	<button class="btn btn-link"><span></span>新建匹配</button>
		 </div>
	</form>
</div>
	
</template>
<script>
	import 'bootstrap-select';  
    import "../../assets/js/jqPaginator.min.js";
    import "../../assets/js/formatData.js";
	export default {
		data(){
			return{
				mdg:'123',
				searchHead:{},
			}
		},
		mounted:function(){
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
		}
	}
</script>
