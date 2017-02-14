<template>
    <div class="modal fade" id="addKeyWord" tabindex="-1" role="dialog" aria-labelledby="addKeyWordLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="addKeyWordLabel"></h4>
                </div>
                <div class="modal-body">
						<textarea class="form-control" placeholder="请输入您需要添加的关键词，批量添加关键词请使用中文逗号隔开">

						</textarea>
                    <div class="upload-box">
                        <a href="javascript:void(0);"><img src="../../../assets/images/set_icon.png" /><label for="upLoadFile">批量添加</label></a>
                        <input type="file" id="upLoadFile" class="hide" />
                        <a href="javascript:void(0);"><img src="../../../assets/images/set_icon1.png" />下载文件模版</a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">&nbsp;&nbsp; 取 消 &nbsp;&nbsp;</button>
                    <button type="button" class="btn btn-search">&nbsp;&nbsp; 提 交 &nbsp;&nbsp;</button>
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
</style>
<script>
    export default{
        data(){
            return{
                msg:"添加关键词"
            }
        }
    }
</script>