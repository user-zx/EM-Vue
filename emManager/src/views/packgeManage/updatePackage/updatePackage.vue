/**
* Created by zhangxin on 2017/3/4.
*/
<template>
    <div class="modal fade" id="updatePackage" tabindex="-1" role="dialog" aria-labelledby="updatePackageLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="updatePackageLabel">修改套餐</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label class="control-label col-md-3">套餐名称：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="请输入套餐名称" v-model="updatePackage.params.name" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">套餐价格：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="请输入套餐价格" v-model="updatePackage.params.price" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">查看线索次数：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="请输入线索查看次数" v-model="updatePackage.params.leadsTimes" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">套餐状态：</label>
                            <div class="col-md-6">
                                <label class="checkbox-inline">
                                    <input type="radio" name="packageStatus" value="上架" v-model="updatePackage.params.status" />
                                    上架
                                </label>
                                <label class="checkbox-inline">
                                    <input type="radio" name="packageStatus" value="下架" v-model="updatePackage.params.status" />
                                    下架
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="text-center">
                        <button class="btn btn-default" type="button" data-dismiss="modal">取消</button>
                        <button class="btn btn-em" type="button" @click="addPack()">提交</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .checkbox-inline{
        padding-left:0;
    }
</style>
<script>
     /*
    * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    * import loginButton from './components/loginButton.vue';
    */
    export default{
        data(){
            return {
                updatePackage:{
                    url:"../apis/package/savePackage",
                    params:{}
                }
            }
        },
        components:{} ,
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
            addPack(){
                let vm = this,params={
                    createDate:new Date(vm.updatePackage.params.createDate),
                    createUser:vm.updatePackage.params.createUser,
                    id:vm.updatePackage.params.id,
                    leadsTimes:vm.updatePackage.params.leadsTimes,
                    name:vm.updatePackage.params.name,
                    pageNumber:vm.updatePackage.params.pageNumber,
                    pageSize:vm.updatePackage.params.pageSize,
                    price:vm.updatePackage.params.price,
                    status:vm.updatePackage.params.status,
                    updateDate:new Date(),
                    updateUser:sessionStorage.getItem("userAccount")
                };
                vm.post(vm.updatePackage.url,params,function (response) {
                    if(response.success){
                        $("#updatePackage").modal("hide");
                        vm.$router.push({path:"/home/addPackageSuccess"});
                    }else{
                        alert(response.message);
                    }
                },function (error) {
                    console.log(error);
                });
            }
        },
        mounted(){
            let vm = this;
            $("#updatePackage").on("show.bs.modal",function () {
                let dataSource=new Object();
                dataSource.createDate=vm.$store.state.packageManager.params.createDate;
                dataSource.createUser=vm.$store.state.packageManager.params.createUser;
                dataSource.id=vm.$store.state.packageManager.params.id;
                dataSource.leadsTimes=vm.$store.state.packageManager.params.leadsTimes;
                dataSource.name=vm.$store.state.packageManager.params.name;
                dataSource.pageNumber=vm.$store.state.packageManager.params.pageNumber;
                dataSource.pageSize=vm.$store.state.packageManager.params.pageSize;
                dataSource.price=vm.$store.state.packageManager.params.price;
                dataSource.status=vm.$store.state.packageManager.params.status;
                dataSource.updateDate=vm.$store.state.packageManager.params.updateDate;
                dataSource.updateUser=vm.$store.state.packageManager.params.updateUser;
                vm.updatePackage.params=dataSource;
            }).on("shown.bs.modal",function(){
                $("input[type=radio]").iCheck({
                    radioClass : 'iradio_square-blue'
                }).on("ifChecked",function () {
                    vm.updatePackage.params.status=$(this).val();
                });
            }).on("hidden.bs.modal",function () {
                let dataSource=new Object();
                vm.updatePackage.params=dataSource;
                $("input[type=radio]").iCheck("destroy");
            });
        }
    }
</script>