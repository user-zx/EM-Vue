<template>
    <div id="heads" class="heads navbar navbar-default">
        <div class="navbar-header">
            <a class="navbar-brand" href="#"><img src="../../assets/images/logo.png" alt="logo"></a>
        </div> 
        <ul class="nav navbar-nav navbar-right" v-if="topMessage">
            <li><a href="javascript:void(0);"><span class="glyphicon glyphicon-user"></span> {{username}}</a></li>
            <li @click="quit()" ><a href="javascript:void(0);"><span class="glyphicon glyphicon-log-out"></span> 退出登录</a></li>
        </ul>
    </div>
</template>
<style scoped> 
    .heads{position:fixed;top:0;width:100%;height:65px;padding-left:30px;padding-right:30px;border-radius: 0;border:none;background-color: #32ccca;margin-bottom:0;z-index: 999}
    .heads .navbar-brand{height:auto;}
    .heads .navbar-nav>li>a{padding-top:0;padding-bottom: 0;height:65px;line-height:65px;color:#ffffff;font-size:13px;}
</style>
<script>
export default{
    name :"heads",
    data(){
        return {
            msg:'头部',
            username:sessionStorage.getItem("username"),
        };
    },
    props:["topMessage"],
    methods:{
        quit:function(){ 
            let vm = this;
            this.$http.get("/apis/logout.do").then((response)=>{
               if(response.ok){
                   if(response.status){
                       sessionStorage.clear();
                       window.location.href = "/#/login"
                   } 
               }
            }, (response)=>{
                console.log("退出出错");
               return false;
            })
        }
    },
    mounted(){
        //console.log(this.topMessage);
    },
}
</script>