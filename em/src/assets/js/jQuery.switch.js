/**
 * Created by zhangxin on 2017/2/13.
 */
;(function ($) {
    $.fn.extend({
        "jQuerySwitch":function (options) {
            var defaults={
                state:true,
                disable:false,
                readonly:false,
                onColor:"info",
                offColor: 'success',
                onText: 'ON',
                offText: 'OFF',
                labelText: '&nbsp',
                handleWidth: 'auto',
                labelWidth: 'auto',
                baseClass: 'bootstrap-switch',
                wrapperClass: 'wrapper',
                // onInit: function onInit() {},
                // onSwitchChange: function onSwitchChange() {}
            };
            var options=$.extend(defaults,options);
            return this.each(function () {
                var o=options;
                var _this=$(this);
                var _wrapper=_this.parent();
                var funObj=new Object();
                funObj.leftTag=function (value,style) {
                    var tag="<span class='switch-left switch-"+style+"'>"+value+"</span>";
                    return tag;
                };
                funObj.rightTag=function (value,style) {
                    var tag="<span class='switch-right switch-"+style+"'>"+value+"</span>";
                    return tag;
                };
                funObj.labelTag=function (value) {
                    var tag="<label for=''>"+value+"</label>";
                    return tag;
                };
                funObj.onSwitchChange=function () {

                };
                if(_this.attr("checked")){
                    o.state=true;
                }else{
                    o.state=false;
                }
                if(o.onColor){
                    o.onColor=o.onColor;
                }
                if(o.offColor){
                    o.offColor=o.offColor;
                }
                _wrapper.addClass("has-switch");
                _this.wrap("<div></div>").parent().append(funObj.leftTag(o.onText,o.onColor)).append(funObj.labelTag(o.labelText)).append(funObj.rightTag(o.offText,o.offColor));
                if(o.state){
                    _this.parent().addClass("switch-on switch-animate");
                }else{
                    _this.parent().addClass("switch-off switch-animate");
                }
                _this.parent().on("click",function () {
                    $el=$(this).find("input[type=checkbox]");
                    if($el.is(":checked")){
                        $(this).removeClass("switch-on switch-animate").addClass("switch-off switch-animate");
                        $el.removeAttr("checked");
                    }else{
                        $(this).removeClass("switch-off switch-animate").addClass("switch-on switch-animate");
                        $el.attr("checked","true");
                    }
                });
            });
        }
    });
})(jQuery);