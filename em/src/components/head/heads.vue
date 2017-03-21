<template>
    <div id="heads" class="heads navbar navbar-default">
        <div class="navbar-header">
            <a class="navbar-brand" href="/home">
              <img src="../../assets/images/logo.png" alt="logo"/>
            </a>
        </div> 
        <ul class="nav navbar-nav navbar-right" v-if="topMessage">
            <li>
              <router-link to="/home/set">
                    <img src="../../assets/images/user.png" alt="" height="22" width="22"/> {{username}}
              </router-link>
            </li>    
            <li @click="quit()" >
                    <a href="javascript:void(0);"> 
                    <img src="../../assets/images/tc.png" alt="" height="20" width="20"/> 退出登录</a>
            </li>
        </ul>
    </div> 
</template>
<style scoped> 
    .heads{position:fixed;top:0;width:100%;height:65px;padding-left:30px;padding-right:30px;border-radius: 0;border:none;background-color: #32ccca;margin-bottom:0;z-index: 8888;
        box-shadow:0 0 3px #999;}
    .heads .navbar-brand{height:auto;}     
    .heads .navbar-nav>li>a{padding-top:0;padding-bottom: 0;height:65px;line-height:65px;color:#ffffff;font-size:16px;}
    #heads .navbar-right img{margin-top:-3px;}
</style>
<script>
export default{
    name :"heads",
    data(){
        return {
            msg:'头部',
            username:"",
        };
    },
    props:["topMessage"],
    methods:{
        quit:function(){ 
            let vm = this;
            this.$http.get("../apis/logout.do").then((response)=>{
               if(response.ok){
                   if(response.status){
                       this.username = "";
                       window.location.href = "/"
                   } 
               }
            }, (response)=>{
                console.log("退出出错");
               return false;
            })
        }
    },
    mounted(){
        let vm = this;
        vm.$http.post("../apis/findUserName").then((res)=>{
            //console.log(res);
            if(res.ok){
                if(res.data.success){ 
                    vm.username = res.data.data;
                }else{
                    vm.username = "";
                }
            }
        },(err)=>{ 
            vm.username = "";
            alert(err)
        })
    },
}
</script>