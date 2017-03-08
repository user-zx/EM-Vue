/**
* Created by zhangxin on 2017/3/7.
*/
<template>
    <div>
        <div class="center-content">
            <div class="banner">
                <img src="./images/banner.png" />
            </div>
            <p class="text-center">线索匹配请先领取您的任务，匹配时务必做到准确</p>
            <div class="btn-block-box">
                <button type="button" @click="currentAutoMatching()" class="btn btn-em-o">
                    自助匹配任务领取
                </button>
            </div>
            <div class="btn-block-box">
                <button @click="currentMatching()" class="btn btn-em-o">
                    普通匹配任务领取
                </button>
            </div>
            <div class="line-bottom"></div>
            <div class="line-bottom"></div>
            <div class="line-bottom"></div>
            <div class="line-bottom"></div>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    export default{
        data(){
            return {
                
            }
        },
        components:{} ,
        methods:{
            currentAutoMatching(){
                let vm =this;
                vm.$store.commit('currentComponent',"autoMatching");
                setTimeout(()=>{
                    vm.$router.push({path:"/home/realNameMatching/matchingTab"});
                },200);
            },
            currentMatching(){
                let vm =this;
                vm.$store.commit('currentComponent',"matching");
                setTimeout(()=>{
                    vm.$router.push({path:"/home/realNameMatching/matchingTab"});
                },200);
            }
        },
        mounted(){
            
        }
    }
</script>