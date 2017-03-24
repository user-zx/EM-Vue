<template>

    <div class="wrapper">
        <div class="leftTag" id="leftTag">
            <ul class="nav nav-pills nav-stacked">
                <li v-for="(item,index) in leftTag" v-bind:class="item.liClass" @click="aClick(item,index)">
                    <router-link :to="item.module" >
                        <i v-bind:class="item.icons" ></i>
                        {{item.text}}
                    </router-link>  
                </li>
            </ul>
        </div>
        
        <div class="wrapper-content"> 
           <!--  <component :is="activeComponent"></component> -->
          <router-view ></router-view>
        </div>
        <foots></foots>
    </div>
</template> 
<style scoped>        
    .wrapper{margin-left:135px;padding-top: 65px;position: relative;min-height: 100%;padding-bottom: 44px;} 
    .wrapper .wrapper-content{width: 100%;padding:20px 15px;height: 100%;}
    .poss{position: static;}
    .leftTag{position: fixed;left:0;top:65px;bottom: 0;padding-top:25px;width:135px;background-color: #273e4c;}
    .leftTag>ul>li.last{width:135px;margin-top:40px;}
    .leftTag>ul>li>a{text-align: center;color:#eeffff;border-left:3px solid transparent;}
    .leftTag>ul>li>a>.icons{display: block;width:35px;height:35px;margin:0 auto;background-image: url("../../assets/images/left_top_icon.png");background-repeat: no-repeat;}
    .icons-1{background-position: 3px 8px;}
    .icons-2{background-position: 3px -55px;}
    .icons-3{background-position: 3px -127px;}
    .icons-4{background-position: 3px -195px;}
    .icons-5{background-position: 3px -263px;}
    .icons-6{background-position: 3px -330px;}
       
    /* .leftTag>ul>li>a:hover,.leftTag>ul>li>a:focus,.leftTag>ul>li.active>a,.nav-pills>li.active>a, .nav-pills>li.active>a:focus, .nav-pills>li.active> a:hover{border-left-color:#32ccca;border-radius:0;background-color: #0b1c26;} */
    .leftTag>ul>li.active>a,.nav>li>a:focus, .nav>li>a:hover{
        background-color: #192d39;
        border-left: 3px solid #32ccca;
    }  
     .nav>li>a.router-link-active{
        background-color: #192d39;
        border-left: 3px solid #32ccca;
     } 
    .leftTag>ul>li>a:hover>.icons-1,.leftTag>ul>li>a:focus>.icons-1,.leftTag>ul>li.active>a>.icons-1{background-position: -42px 8px;}
    .leftTag>ul>li>a:hover>.icons-2,.leftTag>ul>li>a:focus>.icons-2,.leftTag>ul>li.active>a>.icons-2{background-position: -42px -55px;}
    .leftTag>ul>li>a:hover>.icons-3,.leftTag>ul>li>a:focus>.icons-3,.leftTag>ul>li.active>a>.icons-3{background-position: -42px -127px;}
    .leftTag>ul>li>a:hover>.icons-4,.leftTag>ul>li>a:focus>.icons-4,.leftTag>ul>li.active>a>.icons-4{background-position: -42px -195px;}
    .leftTag>ul>li>a:hover>.icons-5,.leftTag>ul>li>a:focus>.icons-5,.leftTag>ul>li.active>a>.icons-5{background-position: -42px -263px;}
    .leftTag>ul>li>a:hover>.icons-6,.leftTag>ul>li>a:focus>.icons-6,.leftTag>ul>li.active>a>.icons-6{background-position: -42px -330px;}
</style>
<script>
   
    import foots from "../head/foots.vue";
    export default {
        name:"leftTag",
        data(){
            return {
                leftTag:[
                    {
                        liClass:"", 
                        icons:"icons icons-1",
                        text:"销售线索",
                        module:"sellClue",
                    },
                    {
                        liClass:"",
                        icons:"icons icons-2",
                        text:"线索收藏",
                        module:"myCollect"
                    },
                    {
                        liClass:"",
                        icons:"icons icons-3",
                        text:"添加线索", 
                        module:"autoMatching"
                    },
                    {
                        liClass:"",
                        icons:"icons icons-4",
                        text:"查看记录",
                        module:"viewLog"
                    },
                    {
                        liClass:"",
                        icons:"icons icons-5",
                        text:"忽略线索",
                        module:"recycle" 
                    },
                    { 
                        liClass:"last",
                        icons:"icons icons-6",
                        text:"设置", 
                        module:"set"
                    }
                ],
            }; 
        },
        components: {
            foots,
        },
        methods:{ 
            
            aClick:function(item,index){
               $("#leftTag li").eq(index).addClass('active').siblings('li').removeClass('active');
               
            } 
        },

    }
</script>