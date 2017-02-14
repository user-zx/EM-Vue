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
                                <input class="form-control" type="password" v-model:value="data.oldPassword" placeholder="请您输入原密码" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">新密码：</label>
                            <div class="col-md-5">
                                <input class="form-control" type="password" v-model:value="data.newPassword" placeholder="请您输入新密码" />
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">&nbsp;&nbsp; 取 消 &nbsp;&nbsp;</button>
                    <button type="button" class="btn btn-search" @click="submit">&nbsp;&nbsp; 提 交 &nbsp;&nbsp;</button>
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
            submit(){
                if(this._isNull(this.data.oldPassword)){
                    this._alert("请输入旧密码");
                    return;
                }else if(this._isNull(this.data.newPassword)){
                    this._alert("请输入新密码");
                    return;
                }else if(this._isNull(this.rePwd)){
                    this._alert("请输入确认密码");
                    return;
                }else if(this.data.newPassword!=this.rePwd){
                    this._alert("两次密码输入不一致");
                    return;
                }else{
                    let params={oldPassword:this.data.oldPassword,newPassword:this.data.newPassword};
                    this.$http.post(this.rePasswordUrl,params).then((res)=>{
                        console.log(res);
                    }).then((err)=>{
                        console.log(err);
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
        }
    }
</script>