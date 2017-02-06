<template>
    <div class="leftTag" id="leftTag">
        <ul class="nav nav-pills nav-stacked">
            <!--<li class="active"><a href="javascript:void(0);"><i class="icons icons-1"></i>销售线索</a></li>-->
            <!--<li><a href="javascript:void(0);"><i class="icons icons-2"></i>我的收藏</a></li>-->
            <!--<li><a href="javascript:void(0);"><i class="icons icons-3"></i>自动匹配</a></li>-->
            <!--<li><a href="javascript:void(0);"><i class="icons icons-4"></i>查看记录</a></li>-->
            <!--<li><a href="javascript:void(0);"><i class="icons icons-5"></i>回收站</a></li>-->
            <li v-for="(item,index) in leftTag" v-bind:class="item.liClass"><a @click="currentFun(index);" href="javascript:void(0);"><i v-bind:class="item.icons"></i>{{item.text}}</a></li>
        </ul>
    </div>
</template>
<style scoped>
    .poss{position: static;}
    .leftTag{position: fixed;left:0;top:65px;bottom: 0;padding-top:25px;width:135px;background-color: #273e4c;}
    .leftTag>ul>li.last{position: fixed;left:0;bottom: 25px;width:135px;}
    .leftTag>ul>li>a{text-align: center;color:#ffffff;border-left:2px solid transparent;}
    .leftTag>ul>li>a>.icons{display: block;width:35px;height:35px;margin:0 auto;background-image: url("../../assets/images/left_top_icon.png");background-repeat: no-repeat;}
    /*.icons-1{background-position: -1px 10px;}*/
    .icons-1{background-position: 0 -34px;}
    .icons-2{background-position: 0 -127px;}
    .icons-3{background-position: 0 -226px;}
    .icons-4{background-position: 0 -324px;}
    .icons-5{background-position: 0 -421px;}
    .icons-6{background-position: 0 -503px;}
    
    .leftTag>ul>li>a:hover,.leftTag>ul>li>a:focus,.leftTag>ul>li.active>a,.nav-pills>li.active>a, .nav-pills>li.active>a:focus, .nav-pills>li.active>a:hover{border-left-color:#32ccca;border-radius:0;background-color: #0b1c26;}
    .leftTag>ul>li>a:hover>.icons-1,.leftTag>ul>li>a:focus>.icons-1,.leftTag>ul>li.active>a>.icons-1{background-position: -42px -34px;}
    .leftTag>ul>li>a:hover>.icons-2,.leftTag>ul>li>a:focus>.icons-2,.leftTag>ul>li.active>a>.icons-2{background-position: -42px -127px;}
    .leftTag>ul>li>a:hover>.icons-3,.leftTag>ul>li>a:focus>.icons-3,.leftTag>ul>li.active>a>.icons-3{background-position: -42px -226px;}
    .leftTag>ul>li>a:hover>.icons-4,.leftTag>ul>li>a:focus>.icons-4,.leftTag>ul>li.active>a>.icons-4{background-position: -42px -324px;}
    .leftTag>ul>li>a:hover>.icons-5,.leftTag>ul>li>a:focus>.icons-5,.leftTag>ul>li.active>a>.icons-5{background-position: -42px -421px;}
    .leftTag>ul>li>a:hover>.icons-6,.leftTag>ul>li>a:focus>.icons-6,.leftTag>ul>li.active>a>.icons-6{background-position: -42px -503px;}
</style>
<script>
    export default {
        name:"leftTag",
        data(){
            return {
                msg:"左侧导航",
                leftTag:[
                    {
                        liClass:"active",
                        icons:"icons icons-1",
                        text:"销售线索"
                    },
                    {
                        liClass:"",
                        icons:"icons icons-2",
                        text:"我的收藏"
                    },
                    {
                        liClass:"",
                        icons:"icons icons-3",
                        text:"自动匹配"
                    },
                    {
                        liClass:"",
                        icons:"icons icons-4",
                        text:"查看记录"
                    },
                    {
                        liClass:"",
                        icons:"icons icons-5",
                        text:"回收站"
                    },
                    {
                        liClass:"last",
                        icons:"icons icons-6",
                        text:"设置"
                    }
                ]
            };
        },
        methods:{
            currentFun:function(index){
                $(".nav-stacked>li").eq(index).addClass("active").siblings().removeClass("active");
            }
        }
    }
</script>