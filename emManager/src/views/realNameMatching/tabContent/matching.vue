/**
* Created by zhangxin on 2017/2/24.
*/
<template>
    <div id="matching">
        <p class="text-right">
            今天<span class="text-em">889</span>条实名匹配
        </p>
        <div class="people-info">
            <div class="photo">
                <img src="./images/photo.png" alt="头像" />
            </div>
            <p class="text-center">天才小熊猫</p>
            <p class="text-center">
                <label>线索来源：</label>
                <span>新浪微博</span>
                <label>线索发布时间：</label>
                <span>2015-02-10 22:07:00</span>
            </p>
            <p class="text-center">
                <a href="javascript:void(0);" target="_blank" class="btn btn-default">原文链接</a>
                <a href="javascript:void(0);" class="btn btn-default">复制原文链接</a>
                <a href="javascript:void(0);" target="_blank" class="btn btn-default">发布者主页</a>
            </p>
            <div class="form-box">
                <div class="form-horizontal">
                    <div class="form-group">
                        <labeL class="col-md-4 control-label">真实姓名：</labeL>
                        <div class="col-md-4">
                            <input class="form-control" type="text" placeholder="请您输入真实姓名" />
                        </div>
                    </div>
                    <div class="form-group">
                        <labeL class="col-md-4 control-label nopadding">性别：</labeL>
                        <div class="col-md-4">
                            <label>
                                <input class="form-control" type="radio" name="sex" checked value="男" />
                                男
                            </label>
                            <label>
                                <input class="form-control" type="radio" name="sex" value="女" />
                                女
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <labeL class="col-md-4 control-label">手机号：</labeL>
                        <div class="col-md-4">
                            <input class="form-control" type="text" placeholder="请您输入手机号" />
                        </div>
                    </div>
                    <div class="form-group">
                        <labeL class="col-md-4 control-label">QQ：</labeL>
                        <div class="col-md-4">
                            <input class="form-control" type="text" placeholder="请您输入QQ" />
                        </div>
                    </div>
                    <div class="form-group">
                        <labeL class="col-md-4 control-label">微信：</labeL>
                        <div class="col-md-4">
                            <input class="form-control" type="text" placeholder="请您输入微信" />
                        </div>
                    </div>
                    <div class="form-group">
                        <labeL class="col-md-4 control-label">邮箱：</labeL>
                        <div class="col-md-4">
                            <input class="form-control" type="text" placeholder="请您输入邮箱" />
                        </div>
                    </div>
                    <div class="form-group">
                        <labeL class="col-md-4 control-label">地址：</labeL>
                        <div class="col-md-2">
                            <select class="form-control selectpicker city" v-model="searchCon.shengVal" id="sheng" title="省">
                                <option v-for="item in sheng">{{item}}</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select class="form-control selectpicker city" v-model="searchCon.shiVal" id="shi" title="市">
                                <option v-for="item in shi">{{item}}</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select class="form-control selectpicker city" v-model="searchCon.xianVal" id="xian" title="县／区">
                                <option v-for="item in xian">{{item}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <labeL class="col-md-4 control-label">其他信息：</labeL>
                        <div class="col-md-4">
                            <div class="input-textarea-group">
                                <input class="form-control" type="text" placeholder="请您输入标题" />
                                <textarea class="form-control textarea" placeholder="请您输入信息内容">

                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-4 col-md-offset-4 text-center">
                            <button class="btn btn-dark" type="button">无法匹配</button>
                            <button class="btn btn-em" type="button">匹配完成</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .people-info{
        .photo{
            margin:0 auto 10px;
            width:85px;
            height:85px;
            line-height: 85px;
            text-align: center;
            border-radius: 50px;
            box-shadow: 0 0 10px rgba(0,0,0,.2);
        }
        p.text-center:nth-of-type(2){
            font-size:13px;
            label{font-weight: 400;}
            span{margin-right: 10px;color:#333333;}
        }
        p.text-center:nth-of-type(3){
            margin-bottom: 25px;
            .btn{margin-right: 15px;}
        }
    }
    p.text-right{margin-top: 25px;}
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    import data from '../../../assets/data/data';
    export default{
        data(){
            return {
                searchData:data,
                sheng:data.citySearch.GP,
                shi:data.citySearch.GT[0],
                xian:data.citySearch.GC[0][0],
                searchCon:{
                    shengVal:"",
                    shiVal:"",
                    xianVal:"",
                },
            }
        },
        components:{} ,
        methods:{
            
        },
        mounted(){
            let vm=this,shiIndex,xianIndex;
            $("input[type=radio]").iCheck({
                radioClass : 'iradio_square-blue',
            });
            $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
            $("#sheng").on("changed.bs.select",function (e,clickedIndex) {
                shiIndex=clickedIndex-1;
                vm.shi=vm.searchData.citySearch.GT[shiIndex];
            }).on("hide.bs.select",function () {
                $("#shi").selectpicker("refresh").selectpicker('val', '');
                $("#xian").selectpicker("refresh").selectpicker('val', '');
            });
            $("#shi").on("changed.bs.select",function (e,clickedIndex) {
                xianIndex=clickedIndex-1;
                vm.xian=vm.searchData.citySearch.GC[shiIndex][xianIndex];
            }).on("hide.bs.select",function () {
                $("#xian").selectpicker("refresh").selectpicker('val', '');
            });
        }
    }
</script>