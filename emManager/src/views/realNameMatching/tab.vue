/**
* Created by zhangxin on 2017/3/7.
*/
<template>
    <div>
        <div class="col-md-12">
            <ul id="matchingTab" class="nav nav-tabs nav-tabs-em">
                <li>
                    <a href="javascript:void(0);" :class="tab1" @click="currentTab(tab1,$event)">自助匹配</a>
                </li>
                <li>
                    <a href="javascript:void(0);" :class="tab2" @click="currentTab(tab2,$event)">普通匹配</a>
                </li>
                <li>
                    <a href="javascript:void(0);" :class="tab3" @click="currentTab(tab3,$event)">匹配记录</a>
                </li>
            </ul>
            <div id="matchingTabContent" class="tab-content">
                <div class="tab-pane fade in active ">
                    <components :is="current" keep-alive></components>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .nav-tabs-em{
        border-bottom-color: #273e4c;
    li{
    a{
        margin-right: 0;
        border-color:#273e4c;
        border-right:0;
        border-radius: 0;
        color:#333333;
    &:last-child{
         border-right:1px solid #273e4c;
     }
    &:hover,
    &:focus{
         color:#ffffff;
         border-color:#273e4c;
         background-color: #273e4c;
     }
    }
    &.active{
    a{
        border-color:#273e4c;
        background-color: #273e4c;
        color:#ffffff;
    &:hover,
    &:focus{
         color:#ffffff;
         border-color:#273e4c;
         background-color: #273e4c;
     }
    }
    }
    }
    }
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    import autoMatching from './tabContent/autoMatching.vue';
    import matching from './tabContent/matching.vue';
    import matched from './tabContent/matched.vue';
    export default{
        data(){
            return {
                tab1:this.$store.state.matchingManager.tab1,
                tab2:this.$store.state.matchingManager.tab2,
                tab3:this.$store.state.matchingManager.tab3,
                current:this.$store.state.matchingManager.current,
            }
        },
        components:{autoMatching,matching,matched} ,
        methods:{
            currentTab(targetName,event){
                this.current= targetName;
                let _el=event.target;
                $(_el).parent().addClass("active").siblings().removeClass("active");
            }
        },
        mounted(){
            let vm = this;
            $("."+vm.$store.state.matchingManager.current).parent().addClass("active");
            $(document).on("click",".currentParentTab",function () {
                let currentTab=$(this).attr('data-target'),ele='.'+$(this).attr('data-target');
                vm.current= currentTab;
                $(ele).parent().addClass("active").siblings().removeClass("active");
            });
        }
    }
</script>