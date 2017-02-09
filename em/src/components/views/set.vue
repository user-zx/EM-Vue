<template>
	<div class="set">
		<ul id="myTab" class="nav nav-tabs">
			<li class="active">
				<a href="javascript:void(0);" data-toggle="tab" data-target="#personalInfo">个人信息</a>
			</li>
			<li>
				<a href="javascript:void(0);" data-toggle="tab" data-target="#combo">套餐充值</a>
			</li>
			<li>
				<a href="javascript:void(0);" data-toggle="tab" data-target="#keyWordSet">关键词设置</a>
			</li>
			<li>
				<a href="javascript:void(0);" data-toggle="tab" data-target="#expenseCalendar">消费记录</a>
			</li>
		</ul>
		<div class="tab-content" id="myTabContent">
			<div id="personalInfo" class="tab-pane fade in active">
				个人信息
			</div>
			<div id="combo" class="tab-pane fade">
				套餐充值
			</div>
			<div id="keyWordSet" class="tab-pane fade">
				关键词设置
			</div>
			<div id="expenseCalendar" class="tab-pane fade">
				消费记录
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				mdg:'123'
			}
		}
	}
</script>
