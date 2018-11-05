<template>
    <el-date-picker style="height:28px"
      v-model="initDate"
      type="date" :picker-options="pickerOptions" v-on:change='myChange'
      >
    </el-date-picker>
</template>
<script>
export default {
  data(){
    return{
       pickerOptions:{
        disabledDate(time) {
              return time.getTime() > Date.now();
            }
      },
      initDate:'',
    }
  },
  mounted(){
    this.initDate = new Date(this.current.year,this.current.month,this.current.date);
  }
  ,
  props: {
      current:{
        type:Object,
        default:{
          year:'',
          month:'',
          date:''
        }
      }
      
  },
  methods:{
    myChange:function(event){
      this.$emit('myChange', event);
    }
  }
}
</script>
<style>

</style>


