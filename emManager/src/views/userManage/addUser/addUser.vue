/**
* Created by zhangxin on 2017/2/22.
*/
<template>
    <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="addUserLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="addUserLabel"></h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label class="control-label col-md-3">姓名：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="请输入姓名" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">手机：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="请输入手机" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">公司名称：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="请输入公司名称" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">所在地区：</label>
                            <div class="col-md-3">
                                <select class="form-control selectpicker" v-model="searchCon.sheng1Val" id="sheng1" title="省">
                                    <option v-for="item in sheng1">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="form-control selectpicker" v-model="searchCon.shi1Val" id="shi1" title="市">
                                    <option v-for="item in shi1">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select class="form-control selectpicker" v-model="searchCon.xian1Val" id="xian1" title="县／区">
                                    <option v-for="item in xian1">{{item}}</option>
                                </select>
                            </div>
                            <div class="col-md-offset-3 col-md-3">
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    不限地区
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">所属行业：</label>
                            <div class="col-md-6">
                                <select class="form-control selectpicker" title="请选择所属行业">
                                    <option>不限</option>
                                    <option>美容</option>
                                    <option>瘦身</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">用户状态：</label>
                            <div class="col-md-6">
                                <label>
                                    <input type="radio" checked name="userState" />
                                    试用
                                </label>
                                <label>
                                    <input type="radio" name="userState" />
                                    正式
                                </label>
                                <label>
                                    <input type="radio" name="userState" />
                                    冻结
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">套餐状态：</label>
                            <div class="col-md-9">
                                <label>
                                    <input type="radio" checked name="packageState" />
                                    未办理套餐
                                </label>
                                <label>
                                    <input type="radio" name="packageState" />
                                    199套餐
                                </label>
                                <label>
                                    <input type="radio" name="packageState" />
                                    299套餐
                                </label>
                                <label>
                                    <input type="radio" name="packageState" />
                                    399套餐
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">关键词配置：</label>
                            <div class="col-md-6">
                                <textarea class="form-control" placeholder="请输入您需要添加的关键词，批量添加关键词请使用中文逗号隔开"></textarea>
                            </div>
                            <div class="col-md-offset-3 col-md-6">
                                <div class="upload-box">
                                    <a href="javascript:void(0);"><img src="./images/set_icon.png"/>批量添加</a>
                                    <a href="javascript:void(0);"><img src="./images/set_icon1.png" />下载文件模版</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">&nbsp;&nbsp; 取 消 &nbsp;&nbsp;</button>
                    <button type="button" class="btn btn-em">&nbsp;&nbsp; 提 交 &nbsp;&nbsp;</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .modal{
        .modal-content{
            border-radius: 0;
            .modal-body{
                textarea{
                    height:150px;
                    border-radius: 5px 5px 0 0;
                    resize: none;
                }
                .upload-box{
                    background-color: #f2f2f2;
                    border-radius: 0 0 5px 5px;
                    border:1px solid #ccc;
                    border-top:none;
                    a{
                        margin-left: 0.4%;
                        display: inline-block;
                        width: 48%;
                        color: #999999;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        text-align: center;
                        font-weight: 400;
                        background-color: #f2f2f2;
                        vertical-align: middle;
                        text-decoration:none;
                        &:first-child{
                            border-right:1px solid #ccc;
                            img{
                                margin-right: 5px;
                            }
                        }
                    }
                }
                label{
                    font-weight: 400;
                }
            }
        }
        .modal-footer{
            border-top:none;
            text-align: center;
        }
    }
</style>
<script>
    import data from '../../../assets/data/data';
    export default{
        data(){
            return{
                "msg":"添加用户",
                searchData:data,
                sheng1:data.citySearch.GP,
                shi1:data.citySearch.GT[0],
                xian1:data.citySearch.GC[0][0],
                searchCon:{
                    sheng1Val:"",
                    shi1Val:"",
                    xian1Val:"",
                }
            }
        },
        mounted(){
            $("input[type=radio]").iCheck({
                radioClass : 'iradio_square-blue',
            });
            let vm=this,shiIndex1,xianIndex1;
            $("#sheng1").on("changed.bs.select",function (e,clickedIndex) {
                shiIndex1=clickedIndex-1;
                vm.shi1=vm.searchData.citySearch.GT[shiIndex1];
            }).on("hide.bs.select",function () {
                $("#shi1").selectpicker("refresh").selectpicker('val', '');
                $("#xian1").selectpicker("refresh").selectpicker('val', '');
            });
            $("#shi1").on("changed.bs.select",function (e,clickedIndex) {
                xianIndex1=clickedIndex-1;
                vm.xian1=vm.searchData.citySearch.GC[shiIndex1][xianIndex1];
            }).on("hide.bs.select",function () {
                $("#xian1").selectpicker("refresh").selectpicker('val', '');
            });
        }
    }
</script>