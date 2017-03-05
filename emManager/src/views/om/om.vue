/**
* Created by zhangxin on 2017/2/21.
*/
<template>
    <div id="om" class="om">
        <div class="col-md-12">
            <div class="search-box">
                <div class="row">
                    <div class="col-md-2">
                        <select class="form-control selectpicker" title="用户权限" v-model="userList.params.permissions">
                            <option value="">不限</option>
                            <option v-for="item in searchData.userPermission" :value="item">{{item}}</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <select class="form-control selectpicker" title="用户状态" v-model="userList.params.userStatus">
                            <option value="">不限</option>
                            <option value="正常">正常</option>
                            <option value="冻结">冻结</option>
                        </select>
                    </div>
                    <div class="col-md-5">
                        <input type="text" class="form-control" v-model="userList.params.keyword" placeholder="请输入关键字进行搜索"/>
                    </div>
                    <div class="col-md-3">
                        <div class="col-md-6 text-left">
                            <button type="button" class="btn btn-em" @click="search()">查询</button>
                        </div>
                        <div class="col-md-6 text-right">
                            <button type="button" data-toggle="modal" data-target="#addUser" @click="showModal(modal.addUser)" class="btn btn-dark">
                                <i class="glyphicon glyphicon-plus"></i>
                                添加用户
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive table-box">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th class="">用户名</th>
                        <th class="">用户权限</th>
                        <th class="">创建时间</th>
                        <th class="">用户状态</th>
                        <th class="">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in userList.result.content">
                        <td>{{item.userAccount}}</td>
                        <td>{{item.permissions}}</td>
                        <td>{{item.createDate}}</td>
                        <td>{{item.userStatus}}</td>
                        <td>
                            <a href="#updateUser" title="编辑" data-toggle="modal" data-target="#updateUser" @click="showModal(modal.updateUser,item.userAccount)">
                                <i class="glyphicon glyphicon-pencil"></i>
                            </a>
                            <a href="javascript:void(0);" v-if="item.userStatus=='冻结'" title="解除冻结" @click="thawFun(item.userAccount)">
                                <img src="./images/jiedong.png" alt="解除冻结" />
                            </a>
                            <a href="javascript:void(0);" v-else title="冻结" @click="freezeFun(item.userAccount)">
                                <img src="./images/dongjie.png" alt="冻结">
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
    import "vue-style-loader!css-loader!sass-loader!bootstrap-select/sass/bootstrap-select.scss";
    import 'bootstrap-select';
    import moment from 'moment';
    import 'bootstrap-daterangepicker';
    import 'vue-style-loader!css-loader!sass-loader!bootstrap-daterangepicker/daterangepicker.scss';
    import '../../assets/vendor/jqPaginator.min';
    import addUser from './addUser/addUser.vue';
    import updateUser from './updateUser/updateUser.vue';
    export default{
        data(){
            return{
                userList:{
                    url:"../apis/operation/findOperationUserList",
                    params:{
                        pageNumber:1,
                        pageSize:10,
                        userStatus:"",
                        keyword:"",
                        permissions:""
                    },
                    result:{}
                },
                freeze:{
                    url:"../apis/operation/freezeUser",
                    params:{
                        userAccount:"",
                        userStatus:""
                    }
                },
                searchData:data,
                modal:{
                    addUser:"addUser",
                    updateUser:"updateUser",
                    userInfo:"userInfo",
                    current:"",
                }
            }
        },
        components:{addUser,updateUser},
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
                vm.post(vm.userList.url,vm.userList.params,function (response) {
                    if(response.success){
                        let result=response.data;
                        for (let i in result.content){
                            result.content[i].createDate=new Date(result.content[i].createDate).Format("yyyy-MM-dd hh:mm:ss");
                        }
                        vm.userList.result=result;
                    }
                },function (error) {
                    console.log(error);
                });
            },
            paginator(){
                let vm=this;
                vm.post(vm.userList.url,vm.userList.params,function (response) {
                    if(response.success){
                        vm.userList.result=response.data;
                        if(response.data.content.length>0&&response.data){
                            $("#pagination").jqPaginator({
                                totalPages:  vm.userList.result.totalPages,
                                visiblePages: vm.userList.params.pageSize,
                                currentPage: vm.userList.params.pageNumber,
                                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                onPageChange: function (n){
                                    vm.userList.params.pageNumber = n;
                                    vm.getList();
                                }
                            });
                        }else{
                            alert("没有数据！");
                        }
                    }
                },function (error) {
                    console.log(error);
                });
            },
            search(){
                this.paginator();
            },
            showModal(modalName,params){
                let vm =this;
                vm.$store.commit(modalName,params);
                this.modal.current=modalName;
            },
            /*冻结*/
            freezeFun(id){
                let vm=this;
                vm.freeze.params.userAccount=id;
                vm.freeze.params.userStatus="冻结";
                vm.post(vm.freeze.url,vm.freeze.params,function (response) {
                    console.log(response);
                },function (error) {
                    console.log(error);
                });
            },
            /*解冻*/
            thawFun(id){
                let vm =this;
                vm.freeze.params.userAccount=id;
                vm.freeze.params.userStatus="冻结";
                vm.post(vm.freeze.url,vm.freeze.params,function (response) {
                    console.log(response);
                },function (error) {
                    console.log(error);
                });
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
            vm.paginator();
        }
    }
</script>