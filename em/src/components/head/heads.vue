<template>
    <div id="heads" class="heads navbar navbar-default">
        <div class="navbar-header">
            <a class="navbar-brand" href="#"><img src="../../assets/images/logo.png" alt="logo"></a>
        </div>
        <ul class="nav navbar-nav navbar-right">
            <li><a href="javascript:void(0);"><span class="glyphicon glyphicon-user"></span> admin</a></li>
            <li><a href="javascript:void(0);"><span class="glyphicon glyphicon-log-out"></span> 退出登录</a></li>
        </ul>
    </div>
</template>
<style scoped> 
    .heads{height:65px;padding-left:30px;padding-right:30px;border-radius: 0;background-color: #32ccca;margin-bottom:0;}
    .heads .navbar-brand{height:auto;}
    .heads .navbar-nav>li>a{padding-top:0;padding-bottom: 0;height:65px;line-height:65px;color:#ffffff;font-size:13px;}
</style>
<script>
export default{
    name :"heads",
    data(){
        return {
            msg:'头部'
        };
    }
}
</script>