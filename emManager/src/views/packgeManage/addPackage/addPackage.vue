/**
* Created by zhangxin on 2017/2/24.
*/
<template>
    <div class="modal fade" id="addPackage" tabindex="-1" role="dialog" aria-labelledby="addPackageLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="addPackageLabel">新建套餐</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label class="control-label col-md-3">套餐名称：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="请输入套餐名称" v-model="addPackage.params.name" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">套餐价格：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="请输入套餐价格" v-model="addPackage.params.price" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">查看线索次数：</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="请输入线索查看次数" v-model="addPackage.params.leadsTimes" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3">套餐状态：</label>
                            <div class="col-md-6">
                                <label class="checkbox-inline">
                                    <input type="radio" name="packageStatus" value="上架" v-model="addPackage.params.status" />
                                    上架
                                </label>
                                <label class="checkbox-inline">
                                    <input type="radio" name="packageStatus" value="下架" v-model="addPackage.params.status" />
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
     import '../../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     import "vue-style-loader!css-loader!sass-loader!../../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    export default{
        data(){
            return {
                msg:"添加套餐",
                addPackage:{
                    url:"../apis/package/savePackage",
                    params:{
                        id:"",
                        name:"",
                        price:"",
                        leadsTimes:"",
                        status:"上架",
                        createDate:"",
                        createUser:"",
                        updateDate:"",
                        updateUser:""
                    }
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
                let vm = this;
                if(vm.addPackage.params.name.length<10&&vm.addPackage.params.price.length<10&&vm.addPackage.params.leadsTimes.length<10){                
                    vm.addPackage.params.createDate=new Date();
                    vm.post(vm.addPackage.url,vm.addPackage.params,function (response) {
                        if(response.success){
                            $("#addPackage").modal("hide");
                            vm.$router.push({path:"/home/addPackageSuccess"});
                        }else{
                            alert(response.message);
                        }
                    },function (error) {
                        console.log(error);
                    });
                }else{
                    alert("长度不能超过十位哟！")
                }
              
            }
        },
        mounted(){
            let vm = this;
            $("#addPackage").on("show.bs.modal",function () {
                $("input[type=radio]").iCheck({
                    radioClass : 'iradio_square-blue'
                }).on("ifChecked",function () {
                    vm.addPackage.params.status=$(this).val();
                });
            }).on("hidden.bs.modal",function () {
                let params={
                    id:"",
                    name:"",
                    price:"",
                    leadsTimes:"",
                    status:"上架",
                    createDate:"",
                    createUser:"",
                    updateDate:"",
                    updateUser:""
                };
                vm.addPackage.params=params;
                $("input[type=radio]").iCheck("destroy");
            });
        }
    }
</script>