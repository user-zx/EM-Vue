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
								<a href="javascript:void(0);">&times;</a>
							</div>
						</li>
						<li>
							<a href="#">A</a>
							<a href="#">B</a>
							<a href="#">C</a>
							<a href="#">D</a>
							<a href="#">E</a>
							<a href="#">F</a>
							<a href="#">G</a>
						</li>
						<li><a href="#">Jasper Report</a></li>
						<li class="divider"></li>
						<li><a href="#">分离的链接</a></li>
						<li class="divider"></li>
						<li><a href="#">另一个分离的链接</a></li>
					</ul>
				</div>
			</form>

		</div>
	</div>
</template>
<style src=""></style>
<script>
	import 'bootstrap-select';
	export default {
		data(){
			return{
				mdg:'123'
			}
		},
        mounted(){
		    $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
		    $(".dropdown-toggle").on("click",function () {
				if($(this).parent().hasClass("open")){
					$(this).parent().removeClass("open");
				}else{
					$(this).parent().addClass("open");
				}
            });
//		    var Arr=[A,B,C,D,E,F,G];
//            var text=[
//
//                {szm:"A",con:"啊隆鼻"},
//                {szm:"A",con:"啊隆鼻"},
//                {szm:"A",con:"啊隆鼻"},
//            ];
			findKeywordList();
            function findKeywordList(){
                var data={
                    "pageSize":10,
                    "pageNumber":1,
                    "userAccount":"13612345678"
                };
                $.ajax({
                    type: "post",
                    async: true,
                    url: "http://172.168.30.21:8012/personal/findKeywordList",
                    data : JSON.stringify(data), //转JSON字符串
                    dataType: 'json',
                    contentType:'application/json;charset=UTF-8',
                    success:function (data) {
                        console.log(data);
                    }
                });
            }
        },
		methods:{

		}
	}
</script>
