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
                                    <option v-for="item in source" v-bind:value="item">{{item}}</option>
                                </select>
                            </div>
                           
                        </div>
						<div class="form-group">
                            <label class="col-md-4 control-label">文章标题：</label>
                            <div class="col-md-5">
                                <input class="form-control" type="text" v-model:value="data.title" placeholder="请您输入目标主页标题" />
                            </div>
                           
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">原文地址：</label>
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
                    <button type="button" class="btn btn-search" @click="addMatchFun()">&nbsp;&nbsp; 提 交 &nbsp;&nbsp;</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .modal .modal-content{border-radius: 0;}
    .modal{z-index: 9999} 
    .modal-header .modal-title{text-align: center;color:#666666;font-size:16px;}
    .modal-body textarea{height:150px;border-radius: 5px 5px 0 0;resize: none;}
    .modal-footer{border-top:none;text-align: center;}
    #addMatching label{font-weight:normal;}
    #addMatching  .modal-footer{padding-top:0;}
    #addMatching   .modal-dialog{margin-top:110px;}
</style>
<script>
    export default {
        data(){
            return{
                sourceType:"../apis/salesLeads/getSaleLeadsSource",
                addMatchingUrl:"../apis/salesLeads/saveSaleLeads",
                data:{
                    source:"",
                    homeLink:"",
                    author:"",
                    title:""
                },
                errorMsg:"",
                source:["微博","百度贴吧"]
            }
        },
        mounted(){
            let vm =this;
          /*  vm.$http.post(vm.sourceType).then((result)=>{
                if(result.ok){
                    if (result.data.success){
                        vm.source=result.data.data;
                         setTimeout(function () {
                            $(".selectpicker").selectpicker("refresh")
                        },200);
                    }
                }
            });*/  
            $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
            $("#addMatching").on("hide.bs.modal",function () {
                vm.data.source="";
                vm.data.homeLink="";
                vm.data.author="";
                vm.data.title = "";
            }).on("hidden.bs.modal",function () {
                $(".selectpicker").selectpicker("refresh");
            });
        },
        methods:{
            addMatchFun(){
                let vm=this;  
                if(vm.data.author==""||vm.data.title==""||vm.data.homeLink==""||vm.data.source==""){alert("昵称、标题或链接不能为空")}else{
                    console.log(vm.data);
                vm.$http.post("../apis/salesLeads/checkDomainNameSource",{url:vm.data.homeLink,source:vm.data.source}).then((res)=>{
                    console.log(res);
                    if(res.ok){
                        if(res.data.data){
                             vm.$http.post(vm.addMatchingUrl,vm.data).then((result)=>{
                              if(result.ok){
                                if (result.data.success){
                                    vm.$emit("increment")
                                    $("#addMatching").modal("hide");
                                 }   
                              }   
                          });
                        }else{
                            alert("目标来源与原文地址不匹配");
                             vm.data.source="";
                             vm.data.homeLink="";
                             vm.data.author="";
                            return false;
                        }  
                    }
                },(err)=>{
                    console.log(err);
                })
                  
               
            }
           } 
        },  
       
    }
</script>