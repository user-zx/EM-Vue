/**
* Created by zhangxin on 2017/2/22.
*/
<template>
    <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="addUserLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="addUserLabel">添加用户</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label class="control-label col-md-3">用户名：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="请输入用户名" v-model="addUser.params.userAccount" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">密码：</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" placeholder="请输入密码" v-model="addUser.params.password" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">确认密码：</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control surePwd" placeholder="请再次输入密码" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">用户权限：</label>
                            <div class="col-md-6" id="qx">
                                <label v-for="item in permissions.result">
                                    <input type="checkbox" name="userStatus" v-model="permissions1" :value="item.id"/>
                                    {{item.name}}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">&nbsp;&nbsp; 取 消 &nbsp;&nbsp;</button>
                    <button type="button" class="btn btn-em" @click="addUsers()">&nbsp;&nbsp; 提 交 &nbsp;&nbsp;</button>
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
    import '../../../assets/vendor/array.remove';
    export default{
        data(){
            return{
                "msg":"添加用户",
                permissions1:[],
                addUser:{
                    url:"../apis/operation/saveOperationUser",
                    params:{
                        id:"",
                        userAccount:"",
                        password:"",
                        userStatus:"正常",
                        createDate:"",
                        createUser:"",
                        updateDate:"",
                        updateUser:"",
                        permissions:"",
                    }
                },
                permissions:{
                    url:"../apis/permission/findAllPermission",
                    result:[]
                }
            }
        },
        methods:{
            post(urls, params, successFun, errorFun){
                this.$http.post(urls, params).then((response) => {
                    if (response.ok) {
                        successFun(response.data);
                    } else {
                        errorFun(response);
                    }
                });
            },
            addUsers(){
                let vm =this,
                     surePwd=$(".surePwd").val();
                vm.addUser.params.createDate=new Date();
                vm.addUser.params.createUser=sessionStorage.getItem("userAccount");
                if(vm.addUser.params.userAccount.length<6 || vm.addUser.params.userAccount.length>16){
                      alert("用户名长度必须在6-16位之间");
                      return;
                }
                if(vm.addUser.params.password.length<6 || vm.addUser.params.password.length>16){
                      alert("密码长度必须在6-16位之间");
                      return;
                }
                if(surePwd.length<6 || surePwd.length>16){
                    alert("确认密码长度必须在6-16位之间");
                   return;
                }
                if(surePwd!==vm.addUser.params.password){
                   alert("两次输入密码不一致");
                   return;
                }
                if(vm.addUser.params.permissions.split(',')<1){
                   alert("至少选一个权限");
                   return;
                }
                vm.post(vm.addUser.url,vm.addUser.params,function(response){
                    if(response.success){
                        $("#addUser").modal("hide");
                        vm.$router.push({path:"/home/saveOperationUserSuccess"});
                    }else{
                        alert(response.message);
                    }
                },function (error) {
                    console.log(error)
                });
            }
        },
        mounted(){
            let vm=this,arr=[];
            $("#addUser").on("show.bs.modal",function () {
                vm.post(vm.permissions.url,"",function(response){
                    if(response.success){
                        vm.permissions.result=response.data;
                    }
                },function(error){
                    console.log(error);
                });
            }).on("shown.bs.modal",function () {
                $("input[type=checkbox]").iCheck({
                    checkboxClass : 'icheckbox_square-blue',
                }).on("ifChecked",function () {
                    arr.push($(this).val());
                    vm.addUser.params.permissions=arr.toString();
                }).on("ifUnchecked",function () {
                    arr.remove(arr.indexOf($(this).val()));
                    vm.addUser.params.permissions=arr.toString();
                });
            }).on("hidden.bs.modal",function () {
                let params={
                        id:"",
                        userAccount:"",
                        password:"",
                        userStatus:"正常",
                        createDate:"",
                        createUser:"",
                        updateDate:"",
                        updateUser:"",
                        permissions:""
                };
                arr=[];
                $(".surePwd").val("");
                vm.addUser.params=params;
                $("input[type='checkbox']").iCheck("destroy");
            });
        }
    }
</script>