/**
* Created by zhangxin on 2017/2/21.
*/
<template>
    <div id="realNameMatching" class="realNameMatching clearfix">
        <router-view></router-view>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
    export default{
        data(){
            return{
                msg:"匹配领取",
            }
        },
        components:{},
        methods:{
            currentTab(targetName,event){
                this.current= targetName;
                let _el=event.target;
                $(_el).parent().addClass("active").siblings().removeClass("active");
            }
        },
        mounted(){
            let vm = this;
        }
    }
</script>