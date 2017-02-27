/**
* Created by zhangxin on 2017/2/21.
*/
<template>
    <div id="navigation" class="navigation">
        <div class="container">
            <div class="menu">
                <div class="lyt-box">
                    <div class="lyt-item">
                        <div class="lyt-cell">
                            <a href="javascript:void(0);" class="yellow">
                                <img src="./images/mainMenu1.png" alt="用户管理" />
                                <span>用户管理</span>
                            </a>
                        </div>
                        <div class="lyt-cell">
                            <a href="javascript:void(0);" class="green">
                                <img src="./images/mainMenu2.png" alt="套餐管理" />
                                <span>套餐管理</span>
                            </a>
                        </div>
                        <div class="lyt-cell">
                            <a href="javascript:void(0);" class="blue">
                                <img src="./images/mainMenu3.png" alt="线索研判" />
                                <span>线索研判</span>
                            </a>
                        </div>
                        <div class="lyt-cell">
                            <router-link to="/realNameMatching" class="red">
                                <img src="./images/mainMenu4.png" alt="实名匹配" />
                                <span>实名匹配</span>
                            </router-link>
                        </div>
                        <div class="lyt-cell">
                            <a href="javascript:void(0);" class="darkblue">
                                <img src="./images/mainMenu5.png" alt="运维管理" />
                                <span>运维管理</span>
                            </a>
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
                    line-height: 70px;
                    margin: 0 15px 20px;
                    text-decoration:none;
                    position:relative;
                    span{
                        display: block;
                        line-height: 0;
                    }
                    &:before{
                        content: '';
                        position:absolute;
                        left: 50%;
                        bottom: -2px;
                        margin-left:-7px;
                        display:none;
                        width:15px;
                        height:15px;
                        border: 1px solid #ccc;
                        border-width: 1px 0 0 1px;
                        background-color:#ffffff;
                        -webkit-transform: rotate(225deg) translate(-50%, 0);
                        transform: rotate(225deg) translate(-50%, 0);
                        z-index:4;
                     }
                }
                .yellow{
                    text-align:center;background-color: #e29b4b;color:#ffffff;
                    &:hover:before{
                         display: block;
                         background-color: #e29b4b;
                         border-color:#e29b4b;
                    }
                }
                .green{
                    text-align:center;background-color: #2cc1e5;color:#ffffff;
                    &:hover:before{
                         display: block;
                         background-color: #2cc1e5;
                         border-color:#2cc1e5;
                    }
                }
                .blue{
                    text-align:center;background-color: #32ccca;color:#ffffff;
                    &:hover:before{
                         display: block;
                         background-color: #32ccca;
                         border-color:#32ccca;
                    }
                }
                .red{
                    text-align:center;background-color: #f56f73;color:#ffffff;
                    &:hover:before{
                         display: block;
                         background-color: #f56f73;
                         border-color:#f56f73;
                    }
                }
                .darkblue{
                    text-align:center;background-color: #70bffc;color:#ffffff;
                    &:hover:before{
                         display: block;
                         background-color: #70bffc;
                         border-color:#70bffc;
                    }
                }
            }
        }
    }

</style>
<script>
    export default{
        name:"mainMenu",
        data(){
            return{
                msg:"菜单"
            }
        }
    }
</script>