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
					<ul class="dropdown-menu search-menu">
						<li class="clearfix">
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
						</li>
						<li>
							<a v-for="(hItem,index) in searchHead" v-if="hItem.length>0" class="search-h">{{index}}</a>
						</li>
						<li>
							
						</li>
						<li class="divider"></li>
						<li><a href="javascript:void(0)">分离的链接</a></li>
						<li class="divider"></li>
						<li><a href="javascript:void(0)">另一个分离的链接</a></li>
					</ul>
				</div>
			</form>

		</div>
	</div>
</template>
<style scoped>
	.search-menu>li{padding-left:20px;padding-right:20px;}
	.search-menu>li>a{padding-left:0;padding-right:0;}
	.search-menu>li>.navbar-form{padding-left:0;padding-right:0;}
	.search-h{display:inline-block;padding:0;margin-right:5px;margin-bottom:5px;width: 22px;height:22px;line-height:22px;text-align: center;color:#32ccca;border-radius:11px;font-size:14px;background-color: #e6f8f6;cursor: pointer;}
	.search-h:hover,.search-h:focus,.search-h.active{background-color:#def2fd;color:#2aabd2;}
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
                    console.log(conObj);
                    vm.searchHead=conObj;
				}
			});
//            findKeywordList();
//            function findKeywordList(){
//                var data={
//                    "pageSize":10,
//                    "pageNumber":1,
//                    "userAccount":"13612345678"
//                };
//                $.ajax({
//                    type: "post",
//                    async: true,
//                    url: "/apis/personal/findKeywordList",
//                    data : JSON.stringify(data), //转JSON字符串
//                    dataType: 'json',
//                    contentType:'application/json;charset=UTF-8',
//                    success:function (data) {
//                        console.log(data);
//
//                    }
//                });
//            }
        },
		methods:{

		}
	}
</script>
