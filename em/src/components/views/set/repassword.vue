<template>
    <div class="modal fade" id="rePassword" tabindex="-1" role="dialog" aria-labelledby="addKeyWordLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="addKeyWordLabel">定期修改登录密码，有助于保障账户安全</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group" v-if="errorMsg.length>0">
                            <div class="col-md-12">
                                <p class="alert alert-danger text-center">{{errorMsg}}</p>
                                <input type="hidden" class="errorMsg" v-model="errorMsg" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">原密码：</label>
                            <div class="col-md-5">
                                <input class="form-control" type="password" v-model="data.oldPassword" placeholder="请您输入原密码" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">新密码：</label>
                            <div class="col-md-5"> 
                                <input class="form-control" type="password" v-model="data.newPassword" placeholder="请您输入新密码" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">确认密码：</label>
                            <div class="col-md-5">
                                <input class="form-control" type="password" v-model:value="rePwd" placeholder="请您输入确认密码" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" @click="cancel">&nbsp;&nbsp; 取 消 &nbsp;&nbsp;</button>
                    <button type="button" class="btn btn-search" @click="submit">&nbsp;&nbsp; 提 交 &nbsp;&nbsp;</button>
                </div>
            </div>
        </div>
    </div>
</template> 
<style scoped>
    #rePassword .modal-dialog{margin-top:140px;}
    #rePassword label{font-weight:normal;padding-right:0;}
    .modal .modal-content{border-radius: 0;}
    .modal-header .modal-title{text-align: center;color:#666666;font-size:16px;}
    .modal-body textarea{height:150px;border-radius: 5px 5px 0 0;resize: none;}
    .modal-footer{border-top:none;text-align: center;padding-top:0;}
</style>
<script>
    export default{
        name:"rePassword",
        data(){
            return{
                msg:"修改密码",
                rePasswordUrl:"/apis/modifyPassword",
                data:{
                    oldPassword:"",
                    newPassword:""
                },
                rePwd:"",
                errorMsg:""
            }
        },
        methods:{
            cancel(){
                this.data.oldPassword = "";
                this.data.newPassword = "";
                this.rePwd = "";
            },
            submit(){
                let vm=this;
                let patrn=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
                if(this._isNull(vm.data.oldPassword)){
                    vm._alert("请输入旧密码");
                    return;
                }else if(vm._isNull(vm.data.newPassword)){
                    vm._alert("请输入新密码");
                    return;
                }else if(vm._isNull(vm.rePwd)){
                    vm._alert("请输入确认密码");
                    return;
                }else if(vm.data.newPassword!=vm.rePwd){
                    vm._alert("两次密码输入不一致");
                    return;
                }else if(vm.data.newPassword.length<6||vm.data.newPassword.length>16||vm.rePwd.length<6||vm.rePwd.length>16){
                     vm._alert("密码长度有误");
                     return; 
                }else if(!patrn.exec(vm.data.newPassword)){
                      vm._alert("密码需要是字母和数字组合");
                  
                   return;
                }
                else{
                    vm.$http.post(vm.rePasswordUrl,vm.data).then((res)=>{
                        if(res.ok){
                            if(res.data.success){
								alert("密码修改成功");
								vm.data.oldPassword = "";
								vm.data.newPassword ="";
								vm.rePwd = "";
                                $("#rePassword").modal("hide");
                            }else{
                                vm._alert(res.data.message);
                            }
                        }
                    });
                }
            },
            _alert(errorMsg){
                let vm=this;
                this.errorMsg=errorMsg;
                setTimeout(function () {
                    vm.errorMsg="";
                },2000);
            },
            _isNull(ele){
                if(ele==null||ele==""||ele==undefined){
                    return true;
                }else{
                    return false;
                }
            }
        },
        mounted(){
            let vm=this;
            $("#rePassword").on(".hidden.bs.modal",function () {
                vm.data.oldPassword="";
                vm.data.newPassword="";
                vm.rePwd="";
                vm.errorMsg="";
            });
        }
    }
</script>