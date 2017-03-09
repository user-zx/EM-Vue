/**
* Created by zhangxin on 2017/2/21.
*/
<template>
    <div id="packageManage" class="packageManage clearfix">
        <div class="col-md-12">
            <div class="search-box">
                <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control" v-model="packageList.params.name" placeholder="请输入关键字进行搜索"/>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-6">
                            <button type="button" class="btn btn-em" @click="search()">查询</button>
                        </div>
                        <div class="col-md-6 text-right">
                            <button type="button" data-toggle="modal" data-target="#addPackage" @click="addPackage()" class="btn btn-dark">
                                <i class="glyphicon glyphicon-plus"></i>
                                新建套餐
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive table-box">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th class="">套餐名称</th>
                        <th class="">创建时间</th>
                        <th class="">套餐价格</th>
                        <th class="">包含线索查看次数</th>
                        <th class="">修改人</th>
                        <th class="">修改时间</th>
                        <th class="">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in packageList.result.content">
                        <td>{{item.name}}</td>
                        <td>{{item.createDate}}</td>
                        <td>¥{{item.price}}</td>
                        <td>{{item.leadsTimes}}</td>
                        <td>{{item.updateUser}}</td>
                        <td>{{item.updateDate}}</td>
                        <td>
                            <input type="checkbox" data-on="success" v-if="item.status=='上架'" :id="index" checked class="switch" />
                            <input type="checkbox" data-on="success" v-else class="switch" :id="index" />
                            <a href="#updatePackage" :id="item.id" data-toggle="modal" data-target="#updatePackage" @click="updatePge('updatePackage',item)">
                                <i class="glyphicon glyphicon-pencil"></i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="pageList clearfix">
                <ul class="clearfix pagination pull-right" id="pagination">

                </ul>
            </div>
        </div>
        <components :is="modal.current" keep-alive></components>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
    import data from '../../assets/data/data.js';
    import '../../assets/vendor/date.format';
    import "vue-style-loader!css-loader!sass-loader!bootstrap-select/sass/bootstrap-select.scss";
    import 'bootstrap-select';
    import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    import moment from 'moment';
    import 'bootstrap-daterangepicker';
    import 'vue-style-loader!css-loader!sass-loader!bootstrap-daterangepicker/daterangepicker.scss';
    import addPackage from './addPackage/addPackage.vue';
    import updatePackage from './updatePackage/updatePackage.vue';
    import '../../assets/vendor/jqPaginator.min';
    import 'bootstrap-switch';
    import "vue-style-loader!css-loader!sass-loader!bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css";
    export default{
        data(){
            return{
                packageList:{
                    url:"../apis/package/findPackageList",
                    params:{pageNumber:1,pageSize:10,name:""},
                    result:{}
                },
                updatePackage:{
                    url:"../apis/package/savePackage"
                },
                modal:{
                    addPackage:"addPackage",
                    updatePackage:"updatePackage",
                    current:"",
                }
            }
        },
        components:{addPackage,updatePackage},
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
            /*请求数据*/
            getList(){
                let vm =this;
                vm.packageList.result={};
                $(".switch").bootstrapSwitch('destroy');
                vm.post(vm.packageList.url,vm.packageList.params,function (response) {
                    if(response.success){
                        let result=response.data,obj=response.data;
                        for (let i in result.content){
                            result.content[i].createDate=new Date(result.content[i].createDate).Format("yyyy-MM-dd hh:mm:ss");
                            result.content[i].updateDate=new Date(result.content[i].updateDate).Format("yyyy-MM-dd hh:mm:ss");
                        }
                        vm.packageList.result=result;
                        setTimeout(function () {
                            $(".switch").bootstrapSwitch({
                                animate:true,
                                size:'mini',
                                onColor:'success',
                                offColor:'default',
                                onText:'上架',
                                offText:'下架',
                            }).on('switchChange.bootstrapSwitch',function (event,state) {
                                let index=$(this).attr("id"),params={};
                                if(state==true){
                                    $(this).val("上架");
                                    vm.packageList.result.content[index].status="上架";
                                }else{
                                    $(this).val("下架");
                                    vm.packageList.result.content[index].status="下架";
                                }
                                params.id=vm.packageList.result.content[index].id;
                                params.createUser=vm.packageList.result.content[index].createUser;
                                params.leadsTimes=vm.packageList.result.content[index].leadsTimes;
                                params.name=vm.packageList.result.content[index].name;
                                params.pageNumber=vm.packageList.result.content[index].pageNumber;
                                params.pageSize=vm.packageList.result.content[index].pageSize;
                                params.price=vm.packageList.result.content[index].price;
                                params.status=vm.packageList.result.content[index].status;
                                params.updateUser=vm.packageList.result.content[index].updateUser;
                                params.createDate=new Date(obj.content[index].createDate);
                                params.updateDate=new Date(obj.content[index].updateDate);
                                vm.post(vm.updatePackage.url,params,function (response) {
                                },function (error) {
                                    console.log(error);
                                })
                            })
                        },200);
                    }
                },function (error) {
                    console.log(error);
                });
            },
            /*分页*/
            pagintor(){
                let vm =this;
                vm.post(vm.packageList.url,vm.packageList.params,function (response) {
                    if(response.success){
                        if(response.data.content.length>0&&response.data) {
                            vm.packageList.result = response.data;
                            $("#pagination").jqPaginator({
                                totalPages: vm.packageList.result.totalPages,
                                visiblePages: vm.packageList.params.pageSize,
                                currentPage: vm.packageList.params.pageNumber,
                                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                onPageChange: function (n) {
                                    vm.packageList.params.pageNumber = n;
                                    vm.getList();
                                }
                            });
                        }else {
                            alert('暂无数据');
                        }
                    }
                },function (error) {
                    console.log(error);
                });
            },
            /*筛选*/
            search(){
                let vm =this;
                vm.packageList.params.pageNumber=1;
                vm.pagintor();
            },
            addPackage(){
                this.modal.current="addPackage";
            },
            updatePge(modalName,params){
                let vm =this;
                vm.$store.commit(modalName,params);
                this.modal.current=modalName;
            }
        },
        mounted(){
            $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
            let vm=this;
            $("#regTime").daterangepicker({
                maxDate : moment(), //最大时间
                showDropdowns : true,
                ranges:{
                    '今日': [moment().startOf('day'), moment()],
                    '昨日': [moment().subtract(1,'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                    '最近7日': [moment().subtract(6,'days'), moment()],
                    '最近30日': [moment().subtract(29,'days'), moment()]
                },
                opens : 'right',
                applyClass : 'btn btn-em',
                locale : {
                    separator:" 到 ",
                    format: 'YYYY-MM-DD',
                    applyLabel : '确定',
                    cancelLabel : '取消',
                    fromLabel : '起始时间',
                    toLabel : '结束时间',
                    customRangeLabel : '自定义',
                    daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
                    monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                        '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                    firstDay : 1
                }
            }, function(start, end, label) {//格式化日期显示框
                $(this).val(start.format('YYYY-MM-DD') + ' 到 ' + end.format('YYYY-MM-DD'));
            });
            vm.pagintor();

        }
    }
</script>