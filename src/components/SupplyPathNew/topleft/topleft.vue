<template>
    <div class="box" :style="{height:(topHeight)+'px'}">
        <div class="conditionsetbox"> 
            <div class="line"></div>
            <div class="linerighttext">低压区条件设置</div>
        </div>
        <div class="uploadpic">
            <div class="leftuploadpic">
                <div class="select">
                    <el-select v-model="value" v-on:change="chooseSelection">
                      <el-option
                        v-for="item in selections"
                        :key="item.label"
                        :value="item.index"
                        :label="item.label">
                      </el-option>
                  </el-select>
                </div>
                
                <div class="input1">
                    <el-Input type="text" v-model="elementIdTempClick" :disabled="true" placeholder="选择节点或管道"></el-Input>
                    <el-button style="margin-left:10px" v-show="value==0" type="success" size="min" v-on:click="selectClick">选择</el-button>
                    <el-button style="margin-left:10px" v-show="value==1" type="success" size="min" v-on:click="positionClick">定位</el-button>
                </div>
                
            </div>
            <div class="rightuploadpic">
                <el-button type="success" size="min" v-on:click="FindPath">查找路径</el-button>
            </div>
        </div>
        <div class="conditionlistbox">
              <div class="line"></div>
            <div class="linerighttext">低压列表</div>
        </div>
        <div class="tableoutbox" :style="{height:(tableHeight)+'px'}">
            <div class="tableinbox" :style="{height:(tableHeight-40)+'px'}">
                <fytable :tableData="tableData"/>
            </div>
        </div>
    </div>
</template>
<script>
import WindowsEvent from '@/components/js/WindowsEvent'
import axios from 'axios'
import urlClass from '@/components/js/UrlClass'
import fytable from '@/components/SupplyPathNew/topleft/fytable'
export default {
  name: "topleft",
  components:{
      fytable
  },
  data() {
    return {
      value:0,
      minHeight: 0,
      inminHeight: 0,
      topHeight: 0,
      tableHeight:0,
      selections:[
        {index:0,value:0,label:'图上选择'},
        {index:1,value:2,label:'最低压力'}],
        elementIdTempClick:'',
        listLabelData:{},
        tableData:[],
    };
  },
  mounted() {
    window.addEventListener('event_name',this.myEventListener)
    this.minHeight = document.documentElement.clientHeight - 40;
    this.inminHeight = document.documentElement.clientHeight - 80;
    this.topHeight = document.documentElement.clientHeight - 247 - 80;
     this.tableHeight = document.documentElement.clientHeight - 247 - 80-150;
    var that = this;
    window.onresize = function() {
      that.minHeight = document.documentElement.clientHeight - 40;
      that.inminHeight = document.documentElement.clientHeight - 80;
      that.topHeight = document.documentElement.clientHeight - 247 - 80;
      that.tableHeight = document.documentElement.clientHeight - 247 - 80-150;
    };
  },
  methods:{
    myEventListener:function(event){
              var typeTemp = event.detail.type;
              var dataTemp = event.detail.data;
              if(typeTemp=="SupplyPathMapClickReturn"){
                  console.log(dataTemp)
                  this.elementIdTempClick = dataTemp.elementId;
              }
              else if(typeTemp=="FindPathReturn"){
                  this.listLabelData = Object.assign({},dataTemp);
                  var chartData = new Object();
                  var listX = new Array()
                  listX = this.listLabelData.LengthCount;
                   var listY1 = new Array()
                  listY1 = this.listLabelData.NodeElev;
                   var listY2 = new Array()
                  listY2 = this.listLabelData.NodeHGL;
                  chartData.listXNew = this.listLabelData.LengthCountNew.slice(0).reverse();
                  chartData.listX = listX.slice(0).reverse();  
                  chartData.listY1 = listY1.slice(0).reverse(); 
                  chartData.listY2 = listY2.slice(0).reverse();
                  this.listLabelData.chartData = Object.assign({},chartData);
                  this.tableData = this.listLabelData.PipeInfoData.slice(0);
                  WindowsEvent.MyDispatchEvent("SupplyPathChartDraw",chartData);
                  WindowsEvent.MyDispatchEvent("SupplyPathLabel",this.listLabelData);
              }
         },
     FindPath:function(){
             if(this.elementIdTempClick!="")
             {
                 var id = "";
                 var obj = new Object();
                 if(this.value==0)
                 {
                    obj.type = "click";
                 }
                    
                if(this.value==1)
                {
                    obj.type = "pressureLow"
                }
                    
                obj.id = this.elementIdTempClick;
                WindowsEvent.MyDispatchEvent("FindSupplyPath",obj);
             }
             else
             {
                 alert("请先选择查找的节点或管道");
             }
         },
    positionClick(){
       WindowsEvent.MyDispatchEvent("PressureLowPosition",this.elementIdTempClick);
    },
    selectClick(){
      this.elementIdTempClick = '';
      WindowsEvent.MyDispatchEvent("SupplyPathMapClick",true);
    },
    chooseSelection(){
      this.elementIdTempClick = '';
      if(this.value==1)
      {
         var self = this;
          var time = (new Date()).getHours();
          console.log(time)
          axios.get(urlClass.axiosUrl+"GetLowPressureNode/"+String(time))
          .then(function(respone){
              var node = respone.data;
              self.elementIdTempClick = node.ElementId;
          })
      }
      WindowsEvent.MyDispatchEvent("SupplyPathClear",'');
    },
      sect1(){
          this.input1=true
          this.input2=false
      },
       sect1(){
          this.input2=true
          this.input1=false
      }
  }
};
</script>
<style scoped>
.box {
  width: 872px;
  /*  background-color: aqua */
}
.conditionsetbox {
  height: 40px;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px #e4e4ec solid;
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
  color: #6e7b8b;
  font-weight: bold;
}

.uploadpic {
  /* width: 100%; */
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  border-bottom: 1px #e4e4ec solid;
  padding: 0 20px 0 20px;
}
.leftuploadpic {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.select {
  margin-right: 10px;
/*   border: 1px #e4e4ec solid */
}
#selec {
  width: 96px;
  height: 24px;
  background-color: #f0f0f1;
  border-radius: 1px;
}
option {
  width: 96px;
  height: 26px;
  border-radius: 1px;
  color: #6e7b8b;
}
.input1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
input {
  width: 236px;
  height: 26px;
  background-color: #f0f0f1;
}
input::-webkit-input-placeholder {
  color: #6e7b8b;
  font-size: 12px;
  padding-left: 10px;
  /*  text-align:center; */
}
.point{
    height: 24px;
  width: 28px;
   background-color: #f0f0f1;
   border: 1px #e4e4ec solid;
   margin-left: 10px;
   text-align: center;
   /* line-height: 24px; */
   font-size: 12px;
   font-weight: bolder
}
.czlj {
  height: 28px;
  width: 72px;
  background-color: #729a18;
  color: #fff;
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: bold;
  line-height: 26px;
  text-align: center;
  border-radius: 2px;
}
.conditionlistbox{
 height: 40px;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px #e4e4ec solid;
}
.tableoutbox{
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
    width: 100%;
   /*  background-color: #729a18 */
}
.tableinbox{
     width: -moz-calc(100% - 40px);
  width: -webkit-calc(100% - 40px);
  width: calc(100% - 40px);
/*   background-color: aqua */
}
</style>
