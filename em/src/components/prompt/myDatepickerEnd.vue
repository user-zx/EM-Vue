<script>

// for Vue 2.0
import myDatepicker from 'vue-datepicker'

export default {
  data () {
    return {
      startTime: {
        time: ''
      },
      endtime: {
        time: '' 
      },     
      option: {
        type: 'day',
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
         month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], 
        format: 'YYYY-MM-DD',
        placeholder: '结束时间',
        inputStyle: { 
          'display': 'inline-block',
          'padding': '8px 1px',
          'line-height': '17px',
          'font-size': '14px',
          "border":"1px solid #ccc",
          "border-left":"none",
          "border-radius":"0 4px 4px 0",
          'color': '#5d5d5d',
          'width': "83px" , 
        }, 
        color: {   
          header: '#32ccca',
          headerText: '#fff'
        },
        buttons: {
          ok: '确定',
          cancel: '取消'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
         month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],  
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], 
        format:"YYYY-MM-DD HH:mm"
      },
      limit: [{
        type: 'weekday',
        available: [1, 2, 3, 4, 5, 6, 0]
      },
      {   
        type: 'fromto',
        from: '',
        to: ''
      }] 
    }   
  },
  components: {
    'date-picker': myDatepicker
  },
  methods:{
    checkTime(){
        let vm = this;  
        // vm.$store.state.selectDate.endDate = 
     

      $(document).on("click",".button-box>span",function(){
      if($(this).text()=="取消"){
        vm.endtime.time = "";
         vm.$store.commit("changeEndDate",vm.endtime.time)
        }
     }) 
        vm.$store.commit("changeEndDate",vm.endtime.time);
        vm.$emit('endTime', vm.endtime.time);  
    },
    checkTimeEnd(){ 
      let vm = this;
          
      vm.limit[1].from =  vm.$store.state.selectDate.startDate;
    } 
  },
  mounted(){
    var myDate = new Date();   
    let nowDate = myDate.toLocaleDateString();  
    let newTime = nowDate.replace(/\//g,"-");
    this.limit[1].to = newTime;
  }, 
  props:["startDate","endDate"],
} 
</script>  
<template>   
  <div class="card" @click="checkTime()" @mousedown="checkTimeEnd"> 
    <div class="row">   
      <date-picker :date="endtime" :option="option" :limit="limit"></date-picker>
    </div> 
  </div> 
</template>