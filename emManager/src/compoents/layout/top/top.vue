<template>
    <div class="topBar" id="topBar">
        <nav class="navbar nav-em" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="javascript:void(0)">
                        <img src="./images/logo.png" alt="logo" />
                    </a>
                </div>
                <div class="navbar navbar-right">
                    <router-link to="home/userManage">
                        <i class="glyphicon glyphicon-user"></i>
                        <span>用户名</span>
                    </router-link>
                    <router-link to="/logout">
                        <i class="glyphicon glyphicon-log-out"></i>
                        <span>退出登录</span>
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>
<style lang="scss" scoped>
    .nav-em{
        background-color: #273e4c;
        border-radius:0;
        .navbar-right{
            padding: 15px 0;
            margin-right:0;
            a{
                text-decoration: none;
                color:#e1fafa;
                .glyphicon{
                    color:#32ccca;
                }
            }
        }
    }
</style>
<script>
    export default{
        name:'topBar',
        data(){
            return{
                msg:"顶部"
            }
        }
    }
</script>