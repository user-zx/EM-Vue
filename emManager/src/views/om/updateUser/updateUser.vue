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
                                <input type="password" class="form-control" placeholder="******" v-model="addUser.params.password" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">确认密码：</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" placeholder="******" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">用户权限：</label>
                            <div class="col-md-6">
                                <label v-for="(j,index) in newPermissionsArr">
                                   <input type="checkbox" v-if="j.type" checked :value="j.id" />
                                    <input type="checkbox" v-else  :value="j.id" />
                                    {{j.name}}
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
                permissionsArr:[],
                newPermissionsArr:[],
                activePer:"",
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
                let vm =this;
                vm.addUser.params.createDate=new Date(vm.addUser.params.createDate);
                vm.addUser.params.updateDate=new Date();
                vm.addUser.params.updateUser=sessionStorage.getItem("userAccount");
                vm.addUser.params.permissions=vm.activePer;
                console.log(vm.addUser.params.permissions);
                if(vm.addUser.params.permissions){
                    vm.post(vm.addUser.url,vm.addUser.params,function(response){
                        if(response.success){
                            $("#updateUser").modal("hide");
                            vm.$router.push({path:"/home/saveOperationUserSuccess"});
                        }else{
                            alert(response.message);
                        }
                    },function (error) {
                        console.log(error)
                    });
                }else{
                    alert("提示语")
                }
            },
            isArri(arr,str){
                for (let i in arr){
                    if(arr[i]==str){
                        return true;
                    }
                }
                return false;
            }
        },
        mounted(){
            let vm=this,arr=[];
            $("#updateUser").on("show.bs.modal",function () {
                let arrs=[],ass=[],arr3=[];
                arrs=vm.$store.state.updateOmUser.params.permissions.split('，');
                vm.permissionsArr=arrs;
                vm.addUser.params.confirmPassword="";
                vm.addUser.params.createDate=vm.$store.state.updateOmUser.params.createDate;
                vm.addUser.params.createUser=vm.$store.state.updateOmUser.params.createUser;
                vm.addUser.params.id=vm.$store.state.updateOmUser.params.id;
                vm.addUser.params.keyword=vm.$store.state.updateOmUser.params.keyword;
                vm.addUser.params.pageNumber=vm.$store.state.updateOmUser.params.pageNumber;
                vm.addUser.params.pageSize=vm.$store.state.updateOmUser.params.pageSize;
                vm.addUser.params.password="";
                vm.addUser.params.permissions=vm.$store.state.updateOmUser.params.permissions;
                vm.addUser.params.salt=vm.$store.state.updateOmUser.params.salt;
                vm.addUser.params.updateDate=vm.$store.state.updateOmUser.params.updateDate;
                vm.addUser.params.updateUser=vm.$store.state.updateOmUser.params.updateUser;
                vm.addUser.params.userAccount=vm.$store.state.updateOmUser.params.userAccount;
                vm.addUser.params.userStatus=vm.$store.state.updateOmUser.params.userStatus;
                vm.post(vm.permissions.url,"",function(response){
                    if(response.success){
                        vm.permissions.result=response.data;
                        for(let i=0;i<vm.permissions.result.length;i++){
                            if(!vm.isArri(vm.permissionsArr,vm.permissions.result[i].name)){
                                let obj={};
                                obj.type=false;
                                obj.id=vm.permissions.result[i].id;
                                obj.name=vm.permissions.result[i].name;
                                vm.newPermissionsArr.push(obj);
                            }else{
                                let obj={};
                                obj.type=true;
                                obj.id=vm.permissions.result[i].id;
                                obj.name=vm.permissions.result[i].name;
                                vm.newPermissionsArr.push(obj);
                                arr3.push(obj.id);
                            }
                        }
                        vm.activePer=arr3.toString();
                    }
                },function(error){
                    console.log(error);
                });
            }).on("shown.bs.modal",function () {
                let oldArr=vm.addUser.params.permissions.split("，");
                for(let i=0;i<oldArr.length;i++){
                    for(let j=0;j<vm.permissions.result.length;j++){
                        if(vm.permissions.result[j].name==oldArr[i]){
                            arr.push(vm.permissions.result[j].id);
                        }
                    }
                }
                $("input[type=checkbox]").iCheck({
                    checkboxClass : 'icheckbox_square-blue',
                }).on("ifChecked",function () {
                    arr.push($(this).val());
                    vm.activePer=arr.toString();
                }).on("ifUnchecked",function () {
                    arr.remove($(this).val());
                    vm.activePer=arr.toString();
                });
            }).on("hidden.bs.modal",function () {
                vm.newPermissionsArr=[];
                vm.addUser.params={};
                vm.$router.push({path:"/home/saveOperationUserSuccess"});
            });
        }
    }
</script>