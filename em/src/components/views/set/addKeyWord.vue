<template>
    <div class="modal fade" id="addKeyWord" tabindex="-1" role="dialog" aria-labelledby="addKeyWordLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="addKeyWordLabel"></h4>
                </div>
                <div class="modal-body">
						<textarea class="form-control" id="keyword" style="height: 178px"   placeholder="请输入您需要添加的关键词，批量添加关键词请使用中文逗号隔开" v-model="textareaVal">
						</textarea>
                    <div class="upload-box">   
                        <a href="javascript:void(0);"  class="btn panel-body-btn a-upload" id="upload-box-a">
                              <span class="glyphicon glyphicon-folder-open panel-body-span-button"></span> 
                              <input type="file" name="fileName" id="fileName" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">文件上传
                        </a>       
                        <a href="../apis/excel/downloadKeywordImportTemplate" class="btn panel-body-btn">
                            <span class="glyphicon glyphicon-floppy-save panel-body-span-button"></span>下载文件模板
                        </a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" @click="clearValue()">&nbsp;&nbsp; 取 消 &nbsp;&nbsp;</button>
                    <button type="button" class="btn btn-search" @click="submit">&nbsp;&nbsp; 提 交 &nbsp;&nbsp;</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .modal .modal-content{border-radius: 0;}
    .modal-header{border-bottom:none;}
    .modal-body textarea{height:150px;border-radius: 5px 5px 0 0;resize: none;}
    .modal-footer{border-top:none;text-align: center;}
    .upload-box{background-color: #f2f2f2;border-radius: 0 0 5px 5px;border:1px solid #ccc;border-top:none;}
    .upload-box>a{margin-left: 0.4%;display: inline-block;width: 49%;color: #999999;padding-top: 10px;padding-bottom: 10px;text-align: center;  font-weight: 400;  background-color: #f2f2f2;  vertical-align: middle;  text-decoration:none;  }
    .upload-box>a:first-child{border-right:1px solid #ccc;}
    .upload-box>a>label{margin-bottom: 0;font-weight: 400;vertical-align: middle;}
    .upload-box>a img{margin-right: 5px;}
    .a-upload {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    display: inline-block;
}
    .a-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    
}
</style>
<script>
    import commont from "../../../assets/js/common.js"
    export default{
        data(){
            return{
                msg:"添加关键词", 
                //uploadWord:"文件上传" 
                textareaVal:"",
                fileUrl:"../apis/excel/importKeywordList",
            } 
        },  
        methods:{ 
           /* filechange(el){ 
               var content = ' <input type="file" name="fileName" @change="fileUpload($event)" id="fileName" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">';
               $(".upload-box-a").append(content);
                let vm = this; 
                vm.$nextTick(function () {
                  let fileanme = $("#fileName")[0].files[0].name;
                  console.log(fileanme);
               });  
                console.log('test');
                let fileanme = $("#fileName")[0].files[0].name;
                   
                 $.ajaxFileUpload({ 
                    url: vm.fileUrl,
                    fileElementId:"fileName",
                    secureuri: false, 
                    dataType: 'json',
                    type:"post", 
                    data: {keywordOwner:vm.userNumber},　　　　　　　　　    　　　　　　　　　  
                    success:function(data,status){
                        if(!data.success){
                            alert(data.message)
                        }else{
                           vm.textareaVal = fileanme; 
                        } 
                    },
                    error: function (data, status, e){//服务器响应失败处理函数
                        alert(e);
                    }
                 })    
                  return false;   
            },*/  
            clearValue:function(){
                let  patta = new RegExp(".(xls|xlsx)$", "i");
               
                if(patta.test(this.textareaVal)){
                   
                }else{ 
                    this.textareaVal = "";
                }  
                
            },
            submit(){
                let post = commont.post;
                let vm = this;               
                let url = '../apis/excel/importKeywordList';
                let params = "";  
                let patt = new RegExp(".(xls|xlsx)$", "i");
                if(patt.test(vm.textareaVal)){
                    params = "";
                }else{
                    params = vm.textareaVal;
                }
                 //console.log(params); 
                post(vm.$http,url,params,(res)=>{
                    console.log(res);
                },(err)=>{

                })
            }
        },
        props:['userNumber'],  
        mounted(){    
            let vm = this;  
            $(document).on("change","#fileName",function(){
                let fileanme = $("#fileName")[0].files[0].name;
                //console.log(fileanme);
                 $.ajaxFileUpload({  
                    url: vm.fileUrl,
                    fileElementId:"fileName",
                    secureuri: false, 
                    dataType: 'json',
                    type:"post",  
                    data: {keywordOwner:vm.userNumber,keywordList:vm.textareaVal},　　　　　　　　　    　　　　　　　　　  
                    success:function(data,status){
                        if(!data.success){
                            alert(data.message)
                             vm.textareaVal = "添加失败";
                        }else{
                           vm.textareaVal = fileanme; 
                        } 
                    },
                    error: function (data, status, e){//服务器响应失败处理函数
                        alert(e);
                         vm.textareaVal = "添加失败";
                    }
                 })    
                  return false;    
            })
            $("#addKeyWord").on("hidden.bs.modal",function(){
              $("#fileName").val("");
            });
           
        }
    }
</script>