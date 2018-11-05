<template>
    <el-button class="btnClass" type="success" id="myButton"  @click="clickMy">{{this.myBtnLabel}}</el-button><!-- @mouseenter="Mouseover" @mouseleave="leave" -->
</template>
<script>
export default {
     props: {
         mySelect:true,
         myBtnLabel:''
  },
  data () {
    return {
        mySelectNo:this.mySelect
    }
  },
  created(){
  },
    mounted(){
       var btnMy = document.getElementById('myButton');
         if(this.mySelectNo)
        {
           btnMy.type = 'success';
        }
    },
     methods: {
        /*   Mouseover:function(event){

              event.target.style.background='#83b224';
              event.target.style.color = '#fff'
              this.$emit('Mouseover', event)
          },
          leave:function(event){
              if(!this.mySelectNo)
              {
                   event.target.style.background='#fff';
                  event.target.style.color = '#000000'
              }
              else
              {
                event.target.style.background = '#70991f'
                event.target.style.color = '#fff'
              }
              this.$emit('leave', event)
                
          }, */
          clickMy:function(event){
                this.mySelectNo = !this.mySelectNo;
                if(this.mySelectNo)
                {
                    event.target.type = 'success'
                    console.log(true)
                }
                else
                {
                   event.target.type = ''
                   console.log(false)
                }  
                this.$emit('clickMy', event)
          }
     }

}
</script>
<style>
/* @import url("//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css"); */
.btnClass{
    font-family: center;
    font-size: 12px;
    height: 28px;
    padding-left: 10px;
    padding-top:8px;
    padding-bottom:8px;
    border-radius: 2px;
}
</style>


