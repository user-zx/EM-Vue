/**
* Created by zhangxin on 2017/2/21.
*/
<template>
    <div id="userManage" class="userManage clearfix">
        <div class="col-md-12">
            <div class="search-box">
                <div class="row">
                    <div class="col-md-2">
                        <select class="form-control selectpicker" title="用户行业" v-model="userList.params.trade">
                            <option value="">不限</option>
                            <option v-for="item in userTrade.result" v-bind:value="item.name">{{item.name}}</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <select class="form-control selectpicker" title="用户状态" v-model="userList.params.userStatus">
                            <option value="">不限</option>
                            <option v-for="item in searchData.userStates" v-bind:value="item">{{item}}</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <select class="form-control selectpicker" title="套餐状态" v-model="userList.params.packageId">
                            <option value="">不限</option>
                            <option v-for="item in packageList.result" v-bind:value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-3">
                            <select class="form-control selectpicker city" v-model="searchCon.shengVal" id="sheng" title="省">
                                <option v-for="item in sheng">{{item}}</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <select class="form-control selectpicker city" v-model="searchCon.shiVal" id="shi" title="市">
                                <option v-for="item in shi">{{item}}</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <select class="form-control selectpicker city" v-model="searchCon.xianVal" id="xian" title="县／区">
                                <option v-for="item in xian">{{item}}</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="checkbox">
                                <input type="checkbox" class="ibx" />
                                不限地区
                            </label>
                        </div>
                    </div>
                    <div class="col-md-4 close-time">
                        <input type="text" class="form-control" readonly id="regTime" placeholder="注册时间"/>
                        <span class="close" @click="clearTime()">&times;</span>
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control"  placeholder="请输入关键字进行搜索" v-model="userList.params.keyword"/>
                    </div>
                    <div class="col-md-4">
                        <div class="col-md-6 text-left">
                            <button type="button" class="btn btn-em" @click="search()">查询</button>
                        </div>
                        <div class="col-md-6 text-right">
                            <button type="button" @click="showModal(modal.addUser)" class="btn btn-dark">
                                <i class="glyphicon glyphicon-plus"></i>
                                添加用户
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive table-box">
                 <p class="text-center noData">亲，抱歉，暂时没查询到相关数据。</p>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="">用户名</th>
                            <th class="">姓名</th>
                            <th class="">所在地区</th>
                            <th class="">公司名称</th>
                            <th class="">用户状态</th>
                            <th class="">所属行业</th>
                            <th class="">套餐状态</th>
                            <th class="">套餐余量</th>
                            <th class="">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in userList.result.content">
                            <td>{{item.userAccount}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.province}}-{{item.city}}-{{item.county}}</td>
                            <td>{{item.company}}</td>
                            <td>{{item.userStatus}}</td>
                            <td>{{item.trade}}</td>
                            <td v-if="item.packageName">{{item.packageName}}</td>
                            <td v-else>---</td>
                            <td v-if="item.restTimes">{{item.restTimes}}</td>
                            <td v-else>0</td>
                            <td>
                                <a href="javascript:void(0);" :id="item.id" @click="showModal(modal.userInfo,item.id)">
                                    <i class="glyphicon glyphicon-th-list"></i>
                                </a>
                                <a href="javascript:void(0);" :id="item.id" @click="showModal(modal.updateUser,item.id)">
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
       .noData{
            margin-top: 100px;
            display: none;
       }
        .close-time{
            position: relative;
            .close{
                display: none;
                position: absolute;
                right: 20px;
                top: 50%;
                float: none;
                margin-top: -3px;
            }
            &:hover{
                .close{
                    display: inline-block;
                }
             }
        }
</style>
<script>
    import data from '../../assets/data/data.js';
    import "vue-style-loader!css-loader!sass-loader!bootstrap-select/sass/bootstrap-select.scss";
    import 'bootstrap-select';
    import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
    import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
    import moment from 'moment';
    import 'bootstrap-daterangepicker';
    import 'vue-style-loader!css-loader!sass-loader!bootstrap-daterangepicker/daterangepicker.scss';
    import addUser from './addUser/addUser.vue';
    import updateUser from './updateUser/updateUser.vue';
    import userInfo from './userInfo/userInfo.vue';
    import '../../assets/vendor/jqPaginator.min';
    export default{
        data(){
            return{
                searchCity:true,
                userList:{
                    url:"../apis/user/findUserList",
                    params:{
                        trade:"",
                        userStatus:"",
                        packageId:"",
                        province:"",
                        city:"",
                        county:"",
                        registerStartDate:"",
                        registerEndDate:"",
                        keyword:"",
                        pageNumber:1,
                        pageSize:10
                    },
                    result:{}
                },
                packageList:{
                    url:"../apis/package/getPackageList",
                    result:{}
                },
                userTrade:{
                    url:"../apis/personal/findAllTrade",
                    result:{}
                },
                msg:"用户管理",
                searchData:data,
                sheng:data.citySearch.GP,
                shi:data.citySearch.GT[0],
                xian:data.citySearch.GC[0][0],
                searchCon:{
                    shengVal:"",
                    shiVal:"",
                    xianVal:"",
                },
                modal:{
                    addUser:"addUser",
                    updateUser:"updateUser",
                    userInfo:"userInfo",
                    current:"",
                }
            }
        },
        components:{addUser,userInfo,updateUser},
        methods:{
            clearTime(){
                $("#regTime").val("");
                this.userList.params.registerStartDate="";
                this.userList.params.registerEndDate="";
            },
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
                        vm.userList.result=response.data;
                    }
                },function (error) {
                    console.log(error);
                });
            },
            paginator(){
                let vm =this;
                vm.post(vm.userList.url,vm.userList.params,function (response) {
                    if(response.success){
                        $(".noData").hide();
                        $(".table").show();
                        if(response.data.content.length>0&&response.data){
                            vm.userList.result=response.data;
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
                           /* alert("没有数据！");*/
                           $(".noData").show();
                           $(".table").hide();
                            $("#pagination").empty();
                        }
                    }
                },function (error) {
                    console.log(error);
                });
            },
            search(){
                let vm =this;
                vm.userList.params.pageNumber=1;
                if(vm.searchCity){
                    vm.userList.params.province=vm.searchCon.shengVal;
                    vm.userList.params.city=vm.searchCon.shiVal;
                    vm.userList.params.county=vm.searchCon.xianVal;
                }else{
                    vm.userList.params.province="不限";
                    vm.userList.params.city="不限";
                    vm.userList.params.county="不限";
                }
               
                vm.paginator();
            },
            showModal(modalName,params){
                let vm =this;
                vm.modal.current=modalName;
                let ele=modalName;
                ele="#"+ele;
                vm.$store.commit(modalName,params);
                setTimeout(function () {
                    $(ele).modal("show");
                },300);
            }
        },
        mounted(){
            let vm=this,shiIndex,xianIndex;
            $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
            $(".ibx").iCheck({
                checkboxClass : 'icheckbox_square-blue',
            }).on("ifChecked",function(){
                vm.searchCon.shengVal="",
                vm.searchCon.shiVal="",
                vm.searchCon.xianVal="",
                vm.searchCity=false;
                $('.city').prop('disabled', true);
                $(".city").selectpicker('val','').selectpicker('refresh');
            }).on("ifUnchecked",function () {
                vm.searchCity=true;
                $('.city').prop('disabled', false);
                $(".city").selectpicker('val','').selectpicker('refresh');
            });
            $("#sheng").on("changed.bs.select",function (e,clickedIndex) {
                shiIndex=clickedIndex-1;
                vm.shi=vm.searchData.citySearch.GT[shiIndex];
            }).on("hide.bs.select",function () {
                $("#shi").selectpicker('val', '').selectpicker("refresh");
                $("#xian").selectpicker('val', '').selectpicker("refresh");
            });
            $("#shi").on("changed.bs.select",function (e,clickedIndex) {
                xianIndex=clickedIndex-1;
                vm.xian=vm.searchData.citySearch.GC[shiIndex][xianIndex];
            }).on("hide.bs.select",function () {
                $("#xian").selectpicker('val', '').selectpicker("refresh");
            });
            $("#regTime").daterangepicker({
                autoUpdateInput:false,
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
                this.autoUpdateInput=true;
                $(this).val(start.format('YYYY-MM-DD') + ' 到 ' + end.format('YYYY-MM-DD'));
                vm.userList.params.registerStartDate=start.format("YYYY-MM-DD");
                vm.userList.params.registerEndDate=end.format("YYYY-MM-DD");
            });
            vm.paginator();
            vm.post(vm.packageList.url,"",function (response) {
                if(response.success){
                    if(response.data.length>0){
                        vm.packageList.result=response.data;
                        setTimeout(function(){
                            $(".selectpicker").selectpicker("refresh");
                        },300);
                    }
                }
            },function (error) {
                console.log(error);
            });
            vm.post(vm.userTrade.url,"",function (response) {
                if(response.success){
                    if(response.data.length>0){
                        vm.userTrade.result=response.data;
                        setTimeout(function(){
                            $(".selectpicker").selectpicker("refresh");
                        },300);
                    }
                }
            },function (error) {
                console.log(error);
            });

        }
    }
</script>