/**
* Created by zhangxin on 2017/2/21.
*/
<template>
    <div id="navigation" class="navigation">
        <div class="container">
            <div class="menu">
                <div class="lyt-box">
                    <div class="lyt-item">
                        <div class="lyt-cell" v-for="item in permissions">
                            <router-link to="/home/userManage" class="yellow" v-if="item=='用户管理'">
                                <img src="./images/mainMenu1.png" alt="用户管理" />
                                <span>用户管理</span>
                            </router-link>
                            <router-link to="/home/packageManage" class="green" v-if="item=='套餐管理'">
                                <img src="./images/mainMenu2.png" alt="套餐管理" />
                                <span>套餐管理</span>
                            </router-link>
                            <router-link to="/home/studyClue" class="blue" v-if="item=='线索研判'">
                                <img src="./images/mainMenu3.png" alt="线索研判" />
                                <span>线索研判</span>
                            </router-link>
                            <router-link to="/home/realNameMatching/getMatching" class="red" v-if="item=='实名匹配'">
                                <img src="./images/mainMenu4.png" alt="实名匹配" />
                                <span>实名匹配</span>
                            </router-link>
                            <router-link to="/home/om" class="darkblue" v-if="item=='运维账户管理'">
                                <img src="./images/mainMenu5.png" alt="运维管理" />
                                <span>运维管理</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .lyt-box{
        width: 100%;
        display: table;
        .lyt-item{
            display: table-row;
            .lyt-cell{
                display: table-cell;
                vertical-align: middle;
                a{
                    display: block;
                    height:118px;
                    line-height: 75px;
                    margin: 0 15px 20px;
                    text-decoration:none;                  
                    z-index:555;
                    position:relative;
                    span{
                        display: block;
                        line-height: 0;
                    }
                    &:before{
                        content: '';
                        position:absolute;
                        left: 50%;
                        bottom: -6px;
                        margin-left:-10px;
                        display:none;
                        width:15px;
                        height:15px;
                        overflow:hidden;  
                        border-width: 1px 0 0 1px;
                        background-color:#ffffff;
                       -webkit-transform:rotate(45deg);  
                        -mz-transform:rotate(45deg);  
                        transform:rotate(45deg);                     
                     }
                }
               
                
                .yellow{
                    text-align:center;background-color: #e29b4b;color:#ffffff;
                    -webkit-box-shadow:0 0 10px rgba(207,115,11,.8);  
                    -moz-box-shadow:0 0 10px rgba(207,115,11,.8);  
                    box-shadow:0 0 10px rgba(207,115,11,.8);  
                    &:hover:before,&.router-link-active:before{
                         display: block;
                         background-color: #e29b4b;
                         border-color:#e29b4b;
                         -webkit-box-shadow:1px 1px 2px rgba(207,115,11,.8);  
                         -moz-box-shadow:1px 1px 2px rgba(207,115,11,.8);  
                         box-shadow:1px 1px 2px rgba(207,115,11,.8);
                    }

                }
                .green{
                    text-align:center;background-color: #2cc1e5;color:#ffffff;
                    -webkit-box-shadow:0 0 10px rgba(44,193,229,.8);  
                    -moz-box-shadow:0 0 10px rgba(44,193,229,.8);  
                    box-shadow:0 0 10px rgba(44,193,229,.8);   
                    &:hover:before,&.router-link-active:before{
                         display: block;
                         background-color: #2cc1e5;
                         border-color:#2cc1e5;
                         -webkit-box-shadow:1px 1px 2px rgba(44,193,229,.8);  
                         -moz-box-shadow:1px 1px 2px rgba(44,193,229,.8);  
                         box-shadow:1px 1px 2px rgba(44,193,229,.8);
                    }
                }
                .blue{
                    text-align:center;background-color: #32ccca;color:#ffffff;
                     -webkit-box-shadow:0 0 10px rgba(50,204,202,.8);  
                    -moz-box-shadow:0 0 10px rgba(50,204,202,.8);  
                    box-shadow:0 0 10px rgba(50,204,202,.8);   
                    &:hover:before,&.router-link-active:before{
                         display: block;
                         background-color: #32ccca;
                         border-color:#32ccca;
                          -webkit-box-shadow:1px 1px 2px rgba(50,204,202,.8);  
                         -moz-box-shadow:1px 1px 2px rgba(50,204,202,.8);  
                         box-shadow:1px 1px 2px rgba(50,204,202,.8);

                    }
                }
                .red{
                    text-align:center;background-color: #f56f73;color:#ffffff;
                     -webkit-box-shadow:0 0 10px rgba(245,111,115,.8);  
                    -moz-box-shadow:0 0 10px rgba(245,111,115,.8);  
                    box-shadow:0 0 10px rgba(245,111,115,.8);   
                    &:hover:before,&.router-link-active:before{
                         display: block;
                         background-color: #f56f73;
                         border-color:#f56f73;
                          -webkit-box-shadow:1px 1px 2px rgba(245,111,115,.8);  
                         -moz-box-shadow:1px 1px 2px rgba(245,111,115,.8);  
                         box-shadow:1px 1px 2px rgba(245,111,115,.8);
                    }
                }
                .darkblue{
                    text-align:center;background-color: #70bffc;color:#ffffff;
                     -webkit-box-shadow:0 0 20px rgba(112,191,252,.8);  
                    -moz-box-shadow:0 0 10px rgba(112,191,252,.8);  
                    box-shadow:0 0 10px rgba(112,191,252,.8);   
                    &:hover:before,&.router-link-active:before{
                         display: block;
                         background-color: #70bffc;
                         border-color:#70bffc;
                          -webkit-box-shadow:1px 1px 2px rgba(112,191,252,.8);  
                         -moz-box-shadow:1px 1px 2px rgba(112,191,252,.8);  
                         box-shadow:1px 1px 2px rgba(112,191,252,.8);
                    }
                }
            }
        }
    }

</style>
<script>
    import welcome from '../../views/welcome/welcome.vue';
    export default{
        name:"mainMenu",
        data(){
            return{
                msg:"菜单",
                permissions:this.$store.state.userInfo.permissions
            }
        },
        components:{welcome},
        methods:{

        },
        mounted(){
            let vm =this;
            setTimeout(()=>{
                vm.permissions=vm.$store.state.userInfo.permissions;
            },300);
        }
    }
</script>