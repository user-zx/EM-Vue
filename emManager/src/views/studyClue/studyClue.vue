/**
* Created by zhangxin on 2017/2/21.
*/
<template>
    <div id="studyClue" class="studyClue clearfix">
        <div class="center-content" v-if="!pageState">
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
            </div>
            <div class="article-box">
                <div v-for="item in studyClueList.result.content" class="article-content">
                    <div class="article-item">
                        <div class="article-left">
                            <input type="checkbox" name="checkbox" v-bind:value="item.id" />
                        </div>
                        <div class="article-right">
                            <a :href="item.link" target="_blank" class="title">{{item.title}}</a>
                            <div class="source">
                                <label>线索发布者：</label><span>{{item.author}}</span>
                                <label>线索来源：</label><span>{{item.source}}</span>
                                <label>发布时间：</label><span>{{item.publishDate}}</span>
                            </div>
                            <p class="article">
                                {{item.content}}
                            </p>
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
    </div>
</template>
<style lang="scss" scoped>
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
    .article-box{
        min-height:450px;
        .article-content{
            margin-top: 13px;
            display: block;
            width:100%;
            border:1px solid #ededed;
            .article-item{
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
                    margin-left:30px;
                    .title{
                        margin:0 0 10px;
                        font-size: 16px;
                        color:#333333;
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
                pageState:false,
                studyClueList:{
                    url:"../apis/judge/findJudgeList",
                    params:{pageNumber:1,pageSize:10},
                    result:{}
                },
                msg:"线索研判"
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
        }
    }
</script>