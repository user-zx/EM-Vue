<template>
    <div class="modal fade" id="addMatching" tabindex="-1" role="dialog" aria-labelledby="addMatchingLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="addMatchingLabel">人工匹配需要您输入一些资料，以便我们为您查询</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label class="col-md-4 control-label">目标昵称：</label>
                            <div class="col-md-5">
                                <input class="form-control" type="text" v-model:value="data.author" placeholder="请您输入目标昵称" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">目标来源：</label>
                            <div class="col-md-5">
                                <select class="form-control selectpicker" v-model:value="data.source" title="目标来源">
                                    <option value="百度贴吧">百度贴吧</option>
                                    <option value="微博">微博</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">目标主页链接：</label>
                            <div class="col-md-5">
                                <input class="form-control" type="text" v-model:value="data.homeLink" placeholder="请您输入目标主页链接" />
                            </div>
                        </div>
                        <div class="form-group" v-if="errorMsg.length>0">
                            <div class="col-md-12">
                                <p class="alert alert-danger text-center">{{errorMsg}}</p>
                                <input type="hidden" class="errorMsg" v-model="errorMsg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">&nbsp;&nbsp; 取 消 &nbsp;&nbsp;</button>
                    <button type="button" class="btn btn-search">&nbsp;&nbsp; 提 交 &nbsp;&nbsp;</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .modal .modal-content{border-radius: 0;}
    .modal-header .modal-title{text-align: center;color:#666666;font-size:16px;}
    .modal-body textarea{height:150px;border-radius: 5px 5px 0 0;resize: none;}
    .modal-footer{border-top:none;text-align: center;}
</style>
<script>
    export default {
        data(){
            return{
                addMatchingUrl:"apis/salesLeads/getSaleLeadsSource",
                data:{
                    source:"",
                    homeLink:"",
                    author:""
                },
                errorMsg:""
            }
        },
        mounted(){
            let vm =this;
            $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
        }
    }
</script>