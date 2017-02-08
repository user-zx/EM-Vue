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
					<a href="javascript:void(0);" class="dropdown-toggle">关键词筛选<i class="caret"></i></a>
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
	</div>
</template>
<style scoped>
	.search-menu>div{padding-left:20px;padding-right:20px;}
	.search-menu>div>a{padding-left:0;padding-right:0;}
	.search-menu>div>.navbar-form{padding-left:0;padding-right:0;}
	.search-h{display:inline-block;padding:0;margin-right:5px;margin-bottom:5px;width: 22px;height:22px;line-height:22px;text-align: center;color:#32ccca;border-radius:11px;font-size:14px;background-color: #e6f8f6;cursor: pointer;}
	.search-h:hover,.search-h:focus,.search-h.active{background-color:#def2fd;color:#2aabd2;}
	.h-box{max-height: 260px;overflow-x:hidden;overflow-y: auto;}
	.h-box>div{padding-top:15px;padding-bottom: 15px;border-bottom: 1px solid #e9e9e9;}
	.h-box>div:last-child{border:none;}
	.lyt-box{display: table;width: 100%;}
	.lyt-box .lyt-item{display: table-row;}
	.lyt-box .lyt-item .lyt-lt{display: table-cell;width: 32px;padding-right: 10px;text-align: center;vertical-align: top;color:#666666;}
	.lyt-box .lyt-item .lyt-rt{display: table-cell;vertical-align: top;}
	.lyt-box .lyt-item .lyt-rt a{display:inline-block;margin-right:10px;margin-bottom:5px;color:#666666;font-size:12px;}
	.lyt-box .lyt-item .lyt-rt a:hover,.lyt-box .lyt-item .lyt-rt a:focus{color:#2aabd2;}
</style>
<script>
	import 'bootstrap-select';
	export default {
		data(){
			return{
				msg:'123',
				searchHead:{}
			}
		},
        mounted(){
		    $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
		    let _element=$(".search-menu");
		    $(".dropdown-toggle").on("click",function () {
				if($(this).parent().hasClass("open")){
					$(this).parent().removeClass("open");
				}else {
                    $(this).parent().addClass("open");
                }
            });
            $(document).on('click', function(){
                _element.parent().removeClass("open");
            }).on('click', '.search-menu,.dropdown-toggle', function(event){
                event.stopPropagation();
            });
		    $(".close-modal").on("click",function(){
		        $(this).parents(".search-menu").parent().removeClass("open");
			});
		    let vm=this;
			vm.$http.post('/apis/personal/findKeywordList',{"pageSize":10000,"pageNumber":1,"userAccount":"13612345678"}).then(function(response){
				if(response.ok){
				    //vm.searchHead=response.data.data;
					const arr=response.data.data.content,
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
        },
		methods:{
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector);
                var parentEle=this.$el.querySelector(".h-box");
                parentEle.scrollTop = anchor.offsetTop
            }
		}
	}
</script>
