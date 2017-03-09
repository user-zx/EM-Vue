/**
* Created by zhangxin on 2017/2/21.
*/
<template>
    <div id="studyClue" class="studyClue clearfix">
        <div class="center-content" v-if="!pageState && !studyClueListState && !reStudyClue">
            <div class="banner">
                <img src="./images/study.png" />
            </div>
            <p class="text-center">研判线索请先领取您的任务，研判时务必做到准确</p>
            <div class="btn-block-box">
                <button type="button" @click="getClueList()" class="btn btn-em-o">
                    领取任务
                </button>
            </div>
            <div class="line-bottom"></div>
            <div class="line-bottom"></div>
            <div class="line-bottom"></div>
            <div class="line-bottom"></div>
        </div>
        <div class="col-md-12" v-if="pageState">
            <div class="search-box">
                <button type="button" class="btn btn-dark-o">
                    上一条线索
                </button>
                <button type="button" class="btn btn-dark-o">
                    下一条线索
                </button>
                <a href="javascript:void(0);" class="pull-right text-dark" @click="paginator2()"><i class="glyphicon glyphicon-list"></i> 查看研判记录</a>
            </div>
            <div class="article-box">
                <div v-for="item in studyClueList.result.content" class="article-content">
                    <div class="article-item">
                        <!--<div class="article-left">-->
                            <!--<input type="checkbox" name="checkbox" v-bind:value="item.id" />-->
                        <!--</div>-->
                        <div class="article-right">
                            <a :href="item.link" target="_blank" class="title">{{item.title}}   <span class="text-yellow">[主贴]</span></a>
                            <div class="source">
                                <label>线索发布者：</label><span>{{item.author}}</span>
                                <label>线索来源：</label><span>{{item.source}}</span>
                                <label>发布时间：</label><span>{{item.publishDate}}</span>
                            </div>
                            <p class="article">
                                {{item.content}}
                            </p>
                        </div>
                        <div class="btn-box">
                            <button class="btn btn-dark-o" type="button">非线索</button>
                            <button class="btn btn-em-o" type="button">确认线索</button>
                        </div>
                    </div>
                    <div class="reply-article">
                        <h5 class="reply-title">回帖</h5>
                        <div class="reply-content">
                            <p>更加成熟的@井柏然 选择再次出发背起行囊开启青春冒险之渴望蜕变的他能否带来不一样的《花儿与少年》？</p>
                            <div class="source">
                                <label>发布者：</label><span>蓝色太阳</span>
                                <label>回帖时间：</label><span>{{item.publishDate}}</span>
                            </div>
                            <div class="btn-box">
                                <button type="button" class="btn btn-dark-o">
                                    非线索
                                </button>
                                <button type="button" class="btn btn-em-o">
                                    确认线索
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pageList clearfix">
                <div class="search-box pull-left">
                    <button type="button" class="btn btn-dark btn-dark-o">
                        提交研判结果
                    </button>
                </div>
                <ul class="clearfix pagination pull-right" id="pagination">

                </ul>
            </div>
        </div>
        <div class="col-md-12" v-if="studyClueListState">
            <div class="search-box">
                <div class="row">
                    <div class="col-md-2">
                        <select class="form-control selectpicker" title="研判结果" v-model="getStudiedList.params.judgeResult">
                            <option value="">不限</option>
                            <option value="确认线索">确认线索</option>
                            <option value="非线索">非线索</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <select class="form-control selectpicker" title="线索来源" v-model="getStudiedList.params.source">
                            <option value="">不限</option>
                            <option v-for="item in searchData.salesSource" v-bind:value="item">{{item}}</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" readonly id="regTime" placeholder="研判时间"/>
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control"  placeholder="请输入关键字进行搜索"/>
                    </div>
                    <div class="col-md-12">
                        <div class="text-center">
                            <button type="button" class="btn btn-em" @click="searchStudyClueList()">查询</button>
                            <button type="button" class="btn btn-dark" @click="goBack()">
                                返回研判
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive table-box">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th class="">标题</th>
                        <th class="">研判时间</th>
                        <th class="">线索发布者</th>
                        <th class="">研判结果</th>
                        <th class="">线索来源</th>
                        <th class="">研判人员</th>
                        <th class="">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in getStudiedList.result.content">
                        <td>
                            <p class="text-hidden">{{item.title}}</p>
                        </td>
                        <td>{{item.judgeDate}}</td>
                        <td>{{item.author}}</td>
                        <td>{{item.judgeResult}}</td>
                        <td>{{item.source}}</td>
                        <td>{{item.judger}}</td>
                        <td>
                            <a href="javascript:void (0);" @click="getSingleInfoFun(item.id)">
                                <i class="glyphicon glyphicon-pencil"></i> 重新研判
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="pageList clearfix">
                <ul class="clearfix pagination pull-right" id="pagination1">

                </ul>
            </div>
        </div>
        <div class="col-md-12" v-if="reStudyClue">
            <div class="search-box text-right">
                <a href="javascript:void(0);" class="text-dark" @click="paginator2()"><i class="glyphicon glyphicon-list"></i> 查看研判记录</a>
            </div>
            <div class="article-box">
                <div class="article-content">
                    <div class="article-item">
                        <div class="article-right">
                            <a :href="getSingleInfo.result.link" target="_blank" class="title">{{getSingleInfo.result.title}}</a>
                            <div class="source">
                                <label>线索发布者：</label><span>{{getSingleInfo.result.author}}</span>
                                <label>线索来源：</label><span>{{getSingleInfo.result.source}}</span>
                                <label>发布时间：</label><span>{{getSingleInfo.result.publishDate}}</span>
                            </div>
                            <p class="article">
                                {{getSingleInfo.result.content}}
                            </p>
                        </div>
                        <div class="btn-box">
                            <button class="btn btn-dark-o" type="button">非线索</button>
                            <button class="btn btn-em-o" type="button">确认线索</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .text-yellow{color:#e29b4b;}
    .text-hidden{max-width:370px;padding:0 15px;overflow: hidden;text-align:left;text-overflow: ellipsis;white-space: nowrap;}
    .center-content{
        width:457px;
        padding:0;
        .banner{
            padding: 0;
            img{
                margin-top: -32px;
            }
        }
    }
    .btn-dark-o{
        background-color: transparent;
        border: 1px solid #000000;
        color:#273e4c;
        &:hover,
        &:focus{
            color:#000000;
            outline: none;
         }
    }
    .text-dark{color:#333333;font-size: 12px;text-decoration: none;&:hover{color:#273e4c;}}
    .article-box{
        min-height:450px;
        .article-content{
            margin-top: 13px;
            display: block;
            width:100%;
            border:1px solid #ededed;
            .article-item{
                position: relative;
                padding:15px;
                /*display: table-row;*/
                clear:both;
                border-bottom:1px solid #ededed;
                .article-left{float:left;vertical-align: top;}
                .article-left{
                    width:30px;
                    text-align: left;
                }
                .article-right{
                    /*margin-left:30px;*/
                    width: 85%;
                    .title{
                        margin:0 0 10px;
                        font-size: 16px;
                        color:#333333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .source{
                        margin-bottom: 10px;
                        color:#bfc1c1;
                        font-size: 12px;
                        label{
                            margin-bottom: 0;
                            font-weight:400;
                        }
                        span{
                            margin-right: 15px;
                            color:#333333;
                        }
                    }
                    .article{
                        margin-bottom: 0;
                        line-height: 1.8;
                        font-size:12px;
                        color:#666666;
                    }
                }
                .btn-box{
                    position: absolute;
                    right: 15px;
                    top: 25px;
                    .btn-em-o.active{
                        color:#ffffff;
                        background-color: #32ccca;
                    }
                    .btn-dark-o.active{
                        color:#ffffff;
                        background-color: #273e4c;
                    }
                }
            }
            .reply-article{
                padding:15px;
                background-color: #f2f2f2;
                .reply-title{
                    margin-top: 0;
                    margin-bottom: 0;
                    color:#e29b4b;
                    font-size:14px;
                }
                .reply-content{
                    margin-top: 10px;
                    position:relative;
                    padding-bottom: 15px;
                    border-bottom:1px solid #e6e6e6;
                    p{
                        width:85%;
                        font-size:13px;
                        line-height: 1.8;
                    }
                    .source{
                        label{
                            font-weight: 400;
                            color:#bfc1c1;
                        }
                        span{
                            margin-right: 10px;
                            color:#333333;
                        }
                    }
                    .btn-box{
                        position: absolute;
                        right:0;
                        top:5px;
                        .btn-em-o.active{
                            color:#ffffff;
                            background-color: #32ccca;
                        }
                        .btn-dark-o.active{
                            color:#ffffff;
                            background-color: #273e4c;
                        }
                    }
                    &:last-child{
                        padding-bottom: 0;
                        border-bottom:none;
                     }
                }
            }
        }
    }
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
    import '../../assets/vendor/jqPaginator.min';
    export default{
        data(){
            return{
                reStudyClue:false,
                searchData:data,
                pageState:false,
                studyClueListState:false,
                studyClueList:{
                    url:"../apis/judge/findJudgeList",
                    params:{pageNumber:1,pageSize:10},
                    result:{}
                },
                msg:"线索研判",
                getStudiedList:{
                    url:"../apis/judge/findJudgeList",
                    params:{
                        pageNumber:1,
                        pageSize:10,
                        judgeStartDate:"",
                        judgeEndDate:"",
                        judgeResult:"",
                        source:""
                    },
                    result:{}
                },
                getSingleInfo:{
                    url:"../apis/judge/findSalesLeadsDetails",
                    result:{}
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
                vm.post(vm.studyClueList.url,vm.studyClueList.params,function (response) {
                    if(response.success){
                        let result=response.data;
                        for (let i in result.content){
                            result.content[i].publishDate=new Date(result.content[i].publishDate).Format("yyyy-MM-dd hh:mm:ss");
                        }
                        vm.studyClueList.result=result;
                        $("input[type=checkbox]").iCheck({
                            checkboxClass : 'icheckbox_square-blue',
                        });
                    }
                },function (error) {
                    console.log(error);
                });
            },
            paginator(){
                let vm =this;
                vm.post(vm.studyClueList.url,vm.studyClueList.params,function (response) {
                    if(response.success){
                        vm.studyClueList.result=response.data;
                        $("#pagination").jqPaginator({
                            totalPages:  vm.studyClueList.result.totalPages,
                            visiblePages: vm.studyClueList.params.pageSize,
                            currentPage: vm.studyClueList.params.pageNumber,
                            first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                            prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                            next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                            last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                            page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                            onPageChange: function (n){
                                vm.studyClueList.params.pageNumber = n;
                                vm.getList();
                            }
                        });
                    }
                },function (error) {
                    console.log(error);
                });
            },
            getClueList(){
                this.pageState=true;
                this.paginator();
            },
            /*研判记录*/
            getStudyClueList(){
                let vm = this;
                vm.post(vm.getStudiedList.url,vm.getStudiedList.params,(response)=>{
                    if(response.success){
                        let result=response.data;
                        for(let i in result.content){
                            result.content[i].judgeDate=new Date(result.content[i].judgeDate).Format("yyyy-MM-dd hh:mm:ss");
                        }
                        vm.getStudiedList.result=result;
                        setTimeout(()=>{
                            $(".selectpicker").selectpicker({
                                style: 'btn-default',
                                size: 4
                            });
                        },200);
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
                            vm.getStudiedList.params.judgeStartDate=start.format("YYYY-MM-DD");
                            vm.getStudiedList.params.judgeEndDate=end.format("YYYY-MM-DD");
                        });
                    }
                },(error)=>{
                    console.log(error);
                });
            },
            paginator2(){
                let vm =this;
                vm.pageState=false;
                vm.studyClueListState=true;
                vm.reStudyClue=false;
                vm.post(vm.getStudiedList.url,vm.getStudiedList.params,function (response) {
                    if(response.success){
                        if(response.data.content.length>0&&response.data) {
                            vm.getStudiedList.result = response.data;
                            $("#pagination1").jqPaginator({
                                totalPages: vm.getStudiedList.result.totalPages,
                                visiblePages: vm.getStudiedList.params.pageSize,
                                currentPage: vm.getStudiedList.params.pageNumber,
                                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                                prev: '<li class="prev"><a href="javascript:void(0);">上一页<\/a><\/li>',
                                next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
                                last: '<li class="last"><a href="javascript:void(0);">末页<\/a><\/li>',
                                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                                onPageChange: function (n) {
                                    vm.getStudiedList.params.pageNumber = n;
                                    vm.getStudyClueList();
                                }
                            });
                        }else{
                            alert("没有数据！")
                        }
                    }
                },function (error) {
                    console.log(error);
                });
            },
            searchStudyClueList(){
                let vm=this;
                vm.getStudiedList.params.pageNumber=1;
                this.paginator2();
            },
            goBack(){
                this.pageState=true;
                this.studyClueListState=false;
                this.reStudyClue=false;
            },
            /*重新研判获取信息*/
            getSingleInfoFun(id){
                let vm =this;
                vm.reStudyClue=true;
                vm.pageState=false;
                vm.studyClueListState=false;
                vm.post(vm.getSingleInfo.url+"?id="+id,null,(response)=>{
                    vm.getSingleInfo.result=response.data;
                    vm.getSingleInfo.result.publishDate=new Date(response.data.publishDate).Format('yyyy-MM-dd hh:mm:ss');
                },(error)=>{

                });
            }
        },
        mounted(){
            $(".selectpicker").selectpicker({
                style: 'btn-default',
                size: 4
            });
            $(document).on("click",".btn",function(){
                $(this).addClass("active").siblings().removeClass("active");
            });
            let vm=this;
        }
    }
</script>