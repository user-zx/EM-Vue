<template>
<div class="sellClue">
	<div class="clearfix">
		<form class="form-horizontal">
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
		</form>
	</div>
	
	<div class="sellClue_list">
		<div class="sellClue_list_div" v-for="item in dataList">
			<span>{{item.type}}</span>
			<h4>{{item.title}}</h4>
		    <div class="sellClue_list_div_div"> <span><i>关键词:</i>{{item.keywords}}</span> <span><i>发布者:</i>{{item.author}}</span><span><i>发布时间:</i>2016-1-1 11:11:11</span><span><i>线索来源:</i>百度贴吧</span></div>
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
		</div>
		
		<div class="sellClue_list_div">
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
		</div>
		
	</div>
	
</div>
	
</template>
<script>    
    import "../../assets/js/jqPaginator.min.js";
    import "../../assets/js/formatData.js";
	export default {
		data(){  
			return{
				sourceList:["线索来源","不限","微博","百度贴吧"],
				typeList:["线索类型","不限","原创","转发","评论"],
				stateList:["标记状态","不限","已处理","未处理"],
				timeList:["发布时间","不限","今天","昨天","自定义时间"],
				bodyDataUrl:"apis/salesLeads/getHomePageSaleLeadsList",
				dataList:[],
			}
		},
		methods:{
			
		},  
		mounted:function(){
			const vm = this;
			const pagesize = {
				"pageNumber": 1,
				 "pageSize": 10
			}

			vm.$http.post(vm.bodyDataUrl,pagesize).then((response)=>{
				/*console.log(response);
				//const */
				const list = response.data.data.list;
				console.log(list);
				//vm.dataList = list;

				for (var prop in list) { 
					vm.dataList[prop] =  {type:list.type,title:list.title,}
					console.log(new Date(list[prop].publishDate).Format("yyyy-MM-dd hh:mm:ss"));
				}
			},(response)=>{
				
			})   	
		}
	}
</script>
<style scoped>
	@import url("../../assets/style/page.css");
</style>