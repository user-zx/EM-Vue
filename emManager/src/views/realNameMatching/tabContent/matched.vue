/**
* Created by zhangxin on 2017/2/24.
*/
<template>
    <div id="matched">
        <div class="search-box">
            <div class="row">
                <div class="col-md-2">
                    <select class="form-control selectpicker" title="匹配结果" v-model="matchingRecordList.params.matchingResult">
                        <option value="">不限</option>
                        <option v-for="item in searchData.matchResult" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <select class="form-control selectpicker" title="线索来源" v-model="matchingRecordList.params.source">
                        <option value="">不限</option>
                        <option v-for="item in searchData.salesSource" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <select class="form-control selectpicker" title="匹配来源" v-model="matchingRecordList.params.matchingSource">
                        <option value="">不限</option>
                        <option v-for="item in searchData.matchSource" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" readonly id="matchTime" placeholder="匹配时间" />
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control"  placeholder="请输入关键字进行搜索" v-model="matchingRecordList.params.keywords"/>
                </div>
                <div class="col-md-4">
                    <button type="button" class="btn btn-em" @click="search()">查询</button>
                </div>
            </div>
        </div>
        <div class="table-responsive table-box">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="">昵称</th>
                        <th class="">真实姓名</th>
                        <th class="">匹配时间</th>
                        <th class="">匹配结果</th>
                        <th class="">线索来源</th>
                        <th class="">匹配来源</th>
                        <th class="">匹配人员</th>
                        <th class="">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in matchingRecordList.result.content">
                        <td>{{item.author}}</td>
                        <td>{{item.realname}}</td>
                        <td>{{item.matchingDate}}</td>
                        <td>{{item.matchingResult}}</td>
                        <td>{{item.source}}</td>
                        <td>{{item.matchingSource}}</td>
                        <td>{{item.matchingUser}}</td>
                        <td>
                            <a href="javascript:void(0);" :id="item.id" data-target="autoMatching" class="currentParentTab">
                                <i class="glyphicon glyphicon-pencil"></i>
                                重新匹配
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
</template>
<style scoped>
</style>
<script>
    import data from '../../../assets/data/data.js';
    import moment from 'moment';
    export default{
        data(){
            return{
                matchingRecordList:{
                    url:"../../apis/matching/findMatchingRecordList",
                    params:{
                        pageNumber:1,
                        pageSize:10,
                        matchingResult:"",
                        source:"",
                        matchingSource:"",
                        keywords:"",
                        matchingStartDate:"",
                        matchingEndDate:""
                    },
                    result:{}
                },
                msg:"用户管理",
                searchData:data,
                searchCon:{
                }
            }
        },
        components:{},
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
                vm.post(vm.matchingRecordList.url,vm.matchingRecordList.params,function (response) {
                    if(response.success){
                        let obj=response.data;
                        for(let i in obj.content){
                            if(obj.content[i].matchingDate){
                                obj.content[i].matchingDate=new Date(obj.content[i].matchingDate).Format("yyyy-MM-dd hh:mm:ss");
                            }
                        }
                        vm.matchingRecordList.result=obj;
                    }
                },function (error) {
                    console.log(error);
                });
            },
            pagintor(){
                let vm =this;
                vm.post(vm.matchingRecordList.url,vm.matchingRecordList.params,function (response) {
                    if(response.success){
                        if(response.data.content.length>0&&response.data){
                            vm.matchingRecordList.result=response.data;
                            $("#pagination").jqPaginator({
                                totalPages:  vm.matchingRecordList.result.totalPages,
                                visiblePages: vm.matchingRecordList.params.pageSize,
                                currentPage: vm.matchingRecordList.params.pageNumber,
                                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                onPageChange: function (n){
                                    vm.matchingRecordList.params.pageNumber = n;
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
                this.pagintor();
            }
        },
        mounted(){
            $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
            $("input[type=checkbox]").iCheck({
                checkboxClass : 'icheckbox_square-blue',
            });
            let vm=this;
            $("#matchTime").daterangepicker({
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
                vm.matchingRecordList.params.matchingStartDate=start.format("YYYY-MM-DD");
                vm.matchingRecordList.params.matchingEndDate=end.format("YYYY-MM-DD");
            });
            vm.pagintor();
        }
    }
</script>