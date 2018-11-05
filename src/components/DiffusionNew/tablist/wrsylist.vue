<template>
    <div class="outbox" :style="{height:listoutboxHeight+'px'}">
         <div class="wrsybox"> 
           <div class="leftbox"> 
                <div class="line"></div>
                <div class="linerighttext">污染溯源分析结果</div>
           </div>
           <div class="rightbox">
               <!-- <div class="syfxtext">溯源分析</div> -->
               <el-button v-on:click="sourceDiffusion"  style="margin-right:20px;font-size:14px;" type="success" size="min">溯源分析</el-button>
           </div>
        </div>
             <div class="syfwtext">溯源范围内用户列表</div>
             <div class="listtableoutbox" :style="{height:(listoutboxHeight-95)+'px'}">
                 <tabtable :tableData="tableData"/>
             </div>
    </div>
</template>
<script>
import tabtable from '@/components/DiffusionNew/tablist/table/table'
import WindowsEvent from '@/components/js/WindowsEvent'
export default {
    name:"WrsyList",
    components:{
        tabtable
    },
     data() {
    return {
      listoutboxHeight: 0,
      tableData:[],
    };
  },
  mounted() {
    window.addEventListener('event_name',this.myEventListener)
    this.listoutboxHeight = document.documentElement.clientHeight - 344;
    var that = this;
    window.onresize = function() {
      that.listoutboxHeight = document.documentElement.clientHeight - 344;
    
    };
  },
  methods:{
      myEventListener:function(event){
              var typeTemp = event.detail.type;
              var dataTemp = event.detail.data;
              if(typeTemp=="DiffusionSourceReturn"){
                  this.tableData = dataTemp;
              }
         },
    sourceDiffusion(){
      WindowsEvent.MyDispatchEvent("DiffusionSource",'');
      
    },
  },
}
</script>
<style scoped>
.outbox{
    width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items:flex-start;

   /*  background-color: aqua */
}
.wrsybox {
  height: 40px;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:space-between;
  align-items:center;
  border-bottom: 1px #e4e4ec solid;
}
.leftbox{
 height: 40px;
 /*  width: 100%; */
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items:flex-start;
}
.line {
  height: 39px;
  width: 3px;
  background-color: #729a18;
}

.linerighttext {
  height: 39px;
  line-height: 39px;
  margin-left: 16px;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #788493;
  font-weight: bold;
}
.rightbox{
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items:center;
    width: 20%；
}
.syfxtext{
    width: 96px;
    height: 26px;
    background-color: #729a18;
    border-radius: 2px;
    line-height: 26px;
  margin-right: 16px;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px #e4e4ec solid;
}
.syfwtext{
    height: 54px;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content:flex-start;
  align-items:center;
   font-family: "微软雅黑";
  font-size: 12px;
  color: #788493;
  font-weight: bold;
 margin-left: 20px;
}
.listtableoutbox{
    width: 100%;
    border-bottom: 1px #e4e4ec solid;
   /*  background-color: #729a18 */
}
</style>

