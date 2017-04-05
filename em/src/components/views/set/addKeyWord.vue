<template>
    <div class="modal fade" id="addKeyWord" tabindex="-1" role="dialog" aria-labelledby="addKeyWordLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="addKeyWordLabel"></h4>
                </div>
                <div class="modal-body">
						<textarea class="form-control" id="keyword" name="keyword" style="height: 178px"   placeholder="请输入您需要添加的关键词，批量添加关键词请使用中文逗号隔开" v-model="textareaVal" >
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
    .modal-dialog{margin-top:140px;}
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
     height: 42px;
}
    .a-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
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
                textareaVal:"",
                fileUrl:"../apis/excel/importKeywordList",
                arr:'',
            } 
        },  
        methods:{ 
            clearValue:function(){
                let vm = this;
               //console.log(vm.arr.join());
              /* console.log(vm.arr);
                if(vm.arr!=undefined){
                    vm.$http.post("../apis/excel/batchDeleteKeyword?keywordIdList="+vm.arr.join()).then((res)=>{
                          //console.log(res);
                    },(err)=>{
                          //console.log(err);
                    })
                }*/
                let  patta = new RegExp(".(xls|xlsx)$", "i");
                if(patta.test(this.textareaVal)){
                }else{ 
                    this.textareaVal = "";
                }  
            },
            submit(){
               let vm = this;
               var patt = new RegExp(".(xls|xlsx)$", "i");
               //var patc=new RegExp(/^[\u4e00-\u9fa5a-zA-Z]/);//检测汉字
                if(vm.textareaVal==""){
                  alert("关键词不能为空");
                }else if(patt.test(vm.textareaVal)){
                  vm.ajaxFileUpload();
                  
                  }else{
                   let post = commont.post;
                   let param = {};
                   param.keywordOwner = vm.userNumber;
                   param.keywordList = vm.textareaVal;
                   post(vm.$http,"../apis/excel/batchAddKeyword",param,(res)=>{
                      
                        if(res.ok){
                            if(res.data.success){
                              if(patt.test(param.keywordList)){
                                     vm.textareaVal = param.keywordList;
                                   $('#addKeyWord').on('hidden.bs.modal', function () {
                                     vm.textareaVal = "";
                                  })
                                    vm.$emit("updateList","");
                                    $('#addKeyWord').modal('hide');
                                   return false;
                              }else if(res.data.data=="添加的关键词已经存在"){
                                    vm.textareaVal="";
                                    alert("该关键词已存在");
                                }else{
                                if(patt.test(param.keywordList)){
                                     vm.$emit("updateList","");
                                   alert("添加文件成功");
                                     vm.textareaVal = param.keywordList;
                                      $('#addKeyWord').modal('hide');
                                   $('#addKeyWord').on('hidden.bs.modal', function () {
                                     vm.textareaVal = "";
                                  })
                                }else{ 
                                    alert("添加关键词成功");
                                    vm.textareaVal = "";
                                    vm.$emit("updateList",param.keywordList);
                                    vm.$emit("gofirst"); 
                                    $('#addKeyWord').modal('hide');
                                }  
                              }
                            }else{
                                alert("添加关键词失败");
                                vm.textareaVal = "";
                            }
                        }   
                    },(err)=>{ 
                        $('#addKeyWord').modal('hide');
                        vm.textareaVal = "";
                   })
                 }


          },
          ajaxFileUpload(){
               let vm = this;
               //let fileanme = $("#fileName")[0].files[0].name;
               $.ajaxFileUpload({   
                  url: vm.fileUrl,
                  fileElementId:"fileName",
                  secureuri: false, 
                  dataType: 'JSON', 
                  type:"post",    
                  data: {keywordOwner:vm.userNumber,keywordList:vm.textareaVal},
                  success:function(data,status){
                       if(data=="关键词用户不能为空"){
                        alert(data)
                        return false;
                      }
                    let json_data = JSON.parse(data);
                    if(json_data.success){
                      if(json_data.data.message == "关键词添加成功"){
                           alert("关键词添加成功");
                          $('#addKeyWord').modal('hide')  
                          $('#addKeyWord').on('hidden.bs.modal', function () {
                           vm.$emit("updateList","");
                         })
                      }else{  
                          alert(json_data.data.message)
                          vm.textareaVal = ""; 
                          return false;
                      }  
                    }else{
                      vm.textareaVal = "";
                      alert("添加失败");
                       return false;
                    }
                  },
                  error: function (data, status, e){//服务器响应失败处理函数
                      alert(e);
                       vm.textareaVal = "添加失败";
                        $('#addKeyWord').modal('hide')
                         return false;
                  }
               })     
              let file = $("#fileName");
              file.after(file.clone().val(""));
              file.remove(); 
          },
        },
        props:['userNumber'],  
        mounted(){    
                let vm = this;  
                $("#upload-box-a").on("change",function(){
                    let fileanme = $("#fileName")[0].files[0].name;
                     vm.textareaVal = fileanme;
                }) 
               
                 
            $("#addKeyWord").on("hidden.bs.modal",function(){
               vm.textareaVal = "";
               let file = $("#fileName");
                file.after(file.clone().val(""));
                file.remove(); 
            });
           
        }
    }
</script>