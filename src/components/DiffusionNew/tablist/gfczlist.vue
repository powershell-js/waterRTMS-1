<template>
    <div class="outbox" :style="{height:listoutboxHeight+'px'}">
         <div class="wrsybox"> 
           <div class="leftbox"> 
                <div class="line"></div>
                <div class="linerighttext">关阀模拟分析结果</div>
           </div>
           <div class="rightbox">
              <el-radio-group v-model="radio" class="radioGroupClass" style="margin-right:30px">
                <el-radio class="radioClass" style="margin-right:20px" v-model="radio" :label="1" >停水范围最小</el-radio>
                <el-radio class="radioClass" v-model="radio" :label="2" >停水关阀最少</el-radio>
              </el-radio-group>
              <el-button style="margin-right:20px" type="success" size="min" v-on:click="CloseValveSelect">关阀搜索</el-button>
           </div>
        </div>
            <div class="showlistoutbox">
                <div class="showlistinbox">
                   <!--  <div class="showlistbox1">
                          <div class="showlist1">爆管泄水量</div>
                          <div class="showlist1">(m³/h)</div>
                           <div class="showlist2">{{labelData.burstPipeLeakDemand}}</div>
                    </div> -->
                    <div class="showlistbox2">
                          <div class="showlist21">管网最大压降</div>
                          <div class="showlist21">(MPa)</div>
                           <div class="showlist22">{{labelData.allMaxPressureLow}}</div>
                    </div>
                     <div class="showlistbox3">
                          <div class="showlist31">水厂最大压降</div>
                          <div class="showlist31">(MPa)</div>
                           <div class="showlist32">{{labelData.sourceMaxPressureLow}}</div>
                    </div>
                     <div class="showlistbox4">
                          <div class="showlist41">水厂最大增加水量</div>
                          <div class="showlist41">(m³/h)</div>
                           <div class="showlist42">{{labelData.sourceMaxAddDemand}}</div>
                    </div>
                     <div class="showlistbox5">
                          <div class="showlist51">受影响用户数量</div>
                          <div class="showlist51">(个)</div>
                           <div class="showlist52">{{labelData.influenceUserCount}}</div>
                    </div>
                </div>
            </div> 
            <div class="tablistoutbox">
                <ul class="listbox tabs">
                      <li class="li-tab" v-for="(item,index) in tabsParam" :key="item.tabsParam"
                    @click="toggleTabs(index)" :class="{active:index===nowIndex}">
                      {{item}} 
                  </li>
                      </ul>

                      <div class="gfcztableoutbox" :style="{height:(listoutboxHeight+5-200)+'px'}">
                                
                                <div class="gfcztableinbox" :style="{height:(listoutboxHeight+5-220)+'px'}">
                                            <gfcz-table1 :tableData="closeValveList" v-show="nowIndex===0"></gfcz-table1>
                                            <gfcz-table2 :tableData="userList" v-show="nowIndex===1"></gfcz-table2>
                                </div>
                       </div>
            </div>
    </div>
</template>
<script>
import GfczTable1 from '@/components/DiffusionNew/tablist/gfcztable/table1'
import GfczTable2 from '@/components/DiffusionNew/tablist/gfcztable/table2'
import WindowsEvent from '@/components/js/WindowsEvent'
export default {
  name: "GfczList",
  components:{
      GfczTable1,
       GfczTable2
  },
  data() {
    return {
      labelData:{
        burstPipeLeakDemand:'--',
        allMaxPressureLow:'--',
        sourceMaxPressureLow:'--',
        sourceMaxAddDemand:'--',
        influenceUserCount:'--'
      },
      listoutboxHeight: 0,
        tabsParam: [
        "关阀列表",
        "停水用户列表",
      ],
      nowIndex: 0,
      isShow: false,
      closeValveList:[],
      userList:[],
      radio:1,
    };
  },
   methods: {
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
    },
    CloseValveSelect(){
      WindowsEvent.MyDispatchEvent("CloseValveAnalysis",this.radio);
    },
     myEventListener:function(event){
              var typeTemp = event.detail.type;
              var dataTemp = event.detail.data;
              if(typeTemp=="CloseValveAnalysisReturn"){
                  this.closeValveList = dataTemp.ListValve;
                  this.userList = dataTemp.ListUser;
                  this.influenceUserCount = this.userList;
              }
         },
   },
  mounted() {
    window.addEventListener('event_name',this.myEventListener)
    this.listoutboxHeight = document.documentElement.clientHeight - 344;
    var that = this;
    window.onresize = function() {
      that.listoutboxHeight = document.documentElement.clientHeight - 344;
    };
  }
};
</script>
<style scoped>
.radioClass {
  padding-right: 10px;
  padding-top: 5px;
  width: 55px;
}
.radioGroupClass {
  padding-right: 10px;
  float: right;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
    text-align: center;
}
.outbox {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;

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
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #e4e4ec solid;
}
.leftbox {
  height: 40px;
  /*  width: 100%; */
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
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
.rightbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

}
.syfxtext {
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
.syfwtext {
  height: 54px;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  font-family: "微软雅黑";
  font-size: 12px;
  color: #788493;
  font-weight: bold;
  margin-left: 20px;
}
.showlistoutbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 124px;
  width: 100%;
/*   background-color: #729a18; */
}
.showlistinbox {
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 124px;
 width: 85%;
 /*  background-color: #5454d3; */
}
.showlistbox1{
   display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  text-align: center;
  /* align-items: flex-start;   */
 
}
.showlist1{
    font-family: "微软雅黑";
  font-size: 12px;
  color: #788493;

}
.showlist2{
    font-family: "微软雅黑";
  font-size: 36px;
  color: #70991f;
  font-weight:lighter; 
}
.showlistbox2{
   display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  /* align-items: flex-start;   */
   text-align: center;
 
}
.showlist21{
    font-family: "微软雅黑";
  font-size: 12px;
  color: #788493;

}
.showlist22{
    font-family: "微软雅黑";
  font-size: 36px;
  color: #788493;
  font-weight:lighter; 
}
.showlistbox3{
   display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  /* align-items: flex-start;   */
   text-align: center;
 
}
.showlist31{
    font-family: "微软雅黑";
  font-size: 12px;
  color: #788493;

}
.showlist32{
    font-family: "微软雅黑";
  font-size: 36px;
  color: #e9af3b;
  font-weight:lighter; 
}


.showlistbox4{
   display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  /* align-items: flex-start;  */ 
   text-align: center;
 
}
.showlist41{
    font-family: "微软雅黑";
  font-size: 12px;
  color: #788493;

}
.showlist42{
    font-family: "微软雅黑";
  font-size: 36px;
  color: #d56459;
  font-weight:lighter; 
}
.showlistbox5{
   display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  /* align-items: flex-start; */  
   text-align: center;
 
}
.showlist51{
    font-family: "微软雅黑";
  font-size: 12px;
  color: #788493;

}
.showlist52{
    font-family: "微软雅黑";
  font-size: 36px;
  color: #6e7b8b;
  font-weight:lighter; 
}
.tablistoutbox{
    height: 30px;
width: 100%;

}
.listbox {
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items:flex-start;
  width: 100%;
  height: 30px;
  color: #788493;
  margin: 0 20px;
   border-bottom: 1px #e4e4ec solid;
}
.listbox > li {
  width: 80px;
  height: 30px;
  text-align: start;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
    color: #6e7b8b;
    text-align: center;
  cursor: pointer;
 /*  background-image: url("~@/assets/img/nav_off.png") */;
  background-repeat: no-repeat;
  background-position: 268px 1px
}
.active {
  width: 80px;
  height: 30px;
  text-align: center;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  color: #70991f;
  
    border-bottom: 2px #70991f solid;
}
.gfcztableoutbox{
     display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items:flex-end;
    width: 100%;
    /* background-color: #e9af3b */
}
.gfcztableinbox{
    width: 100%;
   /*  background-color: #e93bcc; */
   
}
</style>

