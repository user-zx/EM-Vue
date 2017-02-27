/**
* Created by zhangxin on 2017/2/21.
*/
<template>
    <div id="realNameMatching" class="realNameMatching clearfix">
        <div class="col-md-12">
            <ul id="matchingTab" class="nav nav-tabs nav-tabs-em">
                <li class="active">
                    <a href="javascript:void(0);" @click="currentTab(tab1,$event)">自助匹配</a>
                </li>
                <li>
                    <a href="javascript:void(0);" @click="currentTab(tab2,$event)">普通匹配</a>
                </li>
                <li>
                    <a href="javascript:void(0);" @click="currentTab(tab3,$event)">匹配记录</a>
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
<style lang="scss" scoped>
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
    import autoMatching from './tabContent/autoMatching.vue';
    import matching from './tabContent/matching.vue';
    import matched from './tabContent/matched.vue';
    export default{
        data(){
            return{
                msg:"实名匹配",
                tab1:"autoMatching",
                tab2:"matching",
                tab3:"matched",
                current:"autoMatching"
            }
        },
        components:{autoMatching,matching,matched},
        methods:{
            currentTab(targetName,event){
                this.current=targetName;
                let _el=event.target;
                $(_el).parent().addClass("active").siblings().removeClass("active");
            }
        }
    }
</script>