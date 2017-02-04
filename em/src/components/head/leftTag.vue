<template>
    <div class="leftTag" id="leftTag">
        <div class="nav-box">
            <ul class="nav nav-pills nav-stacked">
                <li><a href="javascript:void(0);"><i></i>销售线索</a></li>
                <li><a href="javascript:void(0);"><i></i>我的收藏</a></li>
                <li><a href="javascript:void(0);"><i></i>自动匹配</a></li>
                <li><a href="javascript:void(0);"><i></i>查看记录</a></li>
                <li><a href="javascript:void(0);"><i></i>回收站</a></li>
            </ul>
        </div>
    </div>
</template>
<style>
    .leftTag{float: left;}
    .leftTag .nav-box{width: 135px;}
</style>
<script>
    export default {
        name:"leftTag",
        data(){
            return {
                msg:"左侧导航"
            };
        }
    }
</script>