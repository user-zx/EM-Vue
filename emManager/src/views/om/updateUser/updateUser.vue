/**
* Created by zhangxin on 2017/3/1.
*/
<template>
    <div class="modal fade" id="updateUser" tabindex="-1" role="dialog" aria-labelledby="updateUserLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="updateUserLabel">修改用户</h4>
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
                                <input type="password" class="form-control" placeholder="请再次输入密码" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">用户权限：</label>
                            <div class="col-md-6">
                                <label>
                                    <input type="checkbox" name="userStatus" value="用户管理"/>
                                    用户管理
                                </label>
                                <label>
                                    <input type="checkbox" name="userStatus" value="套餐管理"/>
                                    套餐管理
                                </label>
                                <label>
                                    <input type="checkbox" name="userStatus" value="线索研判"/>
                                    线索研判
                                </label>
                                <label>
                                    <input type="checkbox" name="userStatus" value="实名匹配"/>
                                    实名匹配
                                </label>
                                <label>
                                    <input type="checkbox" name="userStatus" value="运维账户管理"/>
                                    运维账户管理
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
    import data from '../../../assets/data/data';
    export default{
        data(){
            return{
                "msg":"修改用户",
                getUser:{
                    url:"../apis/user/findUserById",
                },
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
                let vm =this;
                vm.addUser.params.updateDate=new Date();
                vm.addUser.params.updateUser=sessionStorage.getItem("userAccount");
                vm.post(vm.addUser.url,vm.addUser.params,function(response){
                    if(response.success){
                        $("#updateUser").modal("hide");
                        vm.$router.push({path:"/home/success"});
                    }else{
                        alert(response.message);
                    }
                },function (error) {
                    console.log(error)
                });
            }
        },
        mounted(){
            let vm=this;
            $("#updateUser").on("show.bs.modal",function () {
                vm.post(vm.getUser.url,vm.$store.state.userManager.userId, function (response) {
                    if (response.success) {
                        vm.addUser.params = response.data;
                    }
                }, function (error) {
                    console.log(error);
                });
            }).on("shown.bs.modal",function () {
                $("input[type=checkbox]").iCheck({
                    checkboxClass : 'icheckbox_square-blue',
                }).on("ifChecked",function () {
                    arr.push($(this).val());
                    vm.addUser.params.permissions=arr.toString().replace(/,/g,"，");
                }).on("ifUnchecked",function () {
                    arr.remove($(this).val());
                    vm.addUser.params.permissions=arr.toString().replace(/,/g,"，");
                });
            }).on("hidden.bs.modal",function () {
                vm.addUser.params={};
            });
        }
    }
</script>