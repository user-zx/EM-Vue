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
        placeholder: '开始时间',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '17px',
          'font-size': '14px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F',
          'width': "95px",
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
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
        available: [1, 2, 3, 4, 5]
      },
      {   
        type: 'fromto',
        from: '',  
        to: '2017-3-10', 
      }],   
    }
  },
  components: {
    'date-picker': myDatepicker
  },
  methods:{
    checkTime(){  
      let vm = this;        
      //console.log( vm.$store.state.selectDate.endDate);
      if(vm.$store.state.selectDate.endDate==""){
        this.updateDate(); 
      }else{
        vm.limit[1].to =  vm.$store.state.selectDate.endDate; 
      }
    }, 
    checkTimeStart(){ 
       let vm = this;   
        
       vm.$store.commit("changeStartDate",vm.startTime.time);
       
       vm.$emit('startTime', vm.startTime.time);
    },
    updateDate(){
      var myDate = new Date();   
      let nowDate = myDate.toLocaleDateString();  
    
      let newTime = nowDate.replace(/\//g,"-");

     this.limit[1].to = newTime;
    },
  },
  mounted(){
    this.updateDate();
  },   
  props:["startDate","endDate"],
}
</script> 
<template>  
  <div class="card" @mousedown="checkTime()" @click="checkTimeStart">  
    <div class="row">        
      <date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
    </div> 
  </div>
</template>
<style scoped>
  
</style>