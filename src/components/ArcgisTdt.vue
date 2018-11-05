<template>
<div class="mainClass">
        <el-row class="myDivClassRow">
                <label class="labelmy" key="type">运行状态分析</label>
                <base-select :selections="list" :initLabel="list[0].label" key="typeSelection" class="list" :selectValue="showObject" :nowIndex="showIndex" v-on:change="showProject"></base-select>
                <label class="labelmyTime" v-show="timeDisplay" key="time">模拟结果时间</label>
                <base-select1 :selections="listTime" :initLabel="nowHour" v-show="timeDisplay" key="timeSelection" class="listTime" :selectValue="showObjectTime"  v-on:change="showProjectTime"></base-select1>
                <el-button class="TimeCompare" v-on:click="TimeCompareClick" v-show="timeCompareDisplay" key="time1">时间对比</el-button>
                <label class="startLabelmyTime" v-show="ValveUpdateDisplay"  key="Starttime">起始时间</label>
                <my-date-pick v-on:myChange='myStartTimeChange' class="startDate" v-show="ValveUpdateDisplay" :current='this.startSelectDate'></my-date-pick>
                <!-- <date-pick class="startDate" :moment="startDate" v-show="ValveUpdateDisplay" v-on:picked="pickedMyStart" :selectDate="startSelectDate"></date-pick> -->
                <label class="endLabelmyTime"  key="Endtime" v-show="ValveUpdateDisplay">结束时间</label>
                <my-date-pick v-on:myChange='myEndTimeChange' class="endDate" v-show="ValveUpdateDisplay" :current='this.endSelectDate'></my-date-pick>
               <!--  <date-pick  class="endDate" :moment="endDate" v-show="ValveUpdateDisplay" v-on:picked="pickedMyEnd" :selectDate="endSelectDate"></date-pick> -->
                <!-- <my-btn class="legendShowClass" v-on:clickMy="isMapClick" :myBtnLabel='myCheckLabel'></my-btn>
                <my-btn class="legendShowClass" v-on:clickMy="legendShow" :mySelect='mySelect' :myBtnLabel='myBtnLabel'></my-btn> -->

                <el-button type="success" class="legendShowClass" v-on:click="isMapClick">查询</el-button>
                <el-button type="success" class="legendShowClass1" v-on:click="legendShow">图例</el-button>
        </el-row>
        <el-row style="height:100%;padding-top:40px">
            <mytdt-map style="width:100%;height:100%" key="mapTemp"></mytdt-map>
            <legend-main :allIsDisplay="allIsDisplay" class="legendStyle" :isShow="this.legendIsShow" :legendData="this.myLegendData"></legend-main>
            <my-table v-show="this.tableShow" class="tableClass" :tableData='this.myTableData'></my-table>
           <!--  <customer-table v-show="this.customerTableShow" class="tableClass" :tableData='this.customerTableData'></customer-table> -->
        </el-row>
</div>
        

</template>

<script>
import MytdtMap from "@/components/mytdt/map";
import BaseSelect from "@/components/BaseSelect/BaseSelect";
import BaseSelect1 from "@/components/BaseSelect/BaseSelect";
import DatePick from "@/components/DatePicker/datepicker";
import MyDatePick from "@/components/DatePicker/MyDatePicker";
import axios from "axios";
import qs from "qs";
import LegendMain from "@/components/LegendMain";
import MyBtn from "@/components/Button/MyBtn";
import MyTable from "@/components/Table/MyTable";
import CustomerTable from "@/components/Table/CustomerTable";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "ArcgisTdt",
  components: {
    MytdtMap,
    BaseSelect,
    BaseSelect1,
    DatePick,
    LegendMain,
    MyBtn,
    MyTable,
    MyDatePick,
    CustomerTable
  },
  data() {
    return {
      loading: "",
      myTableData: {
        listData: [
          {
            ElementId: "2016-05-02",
            Label: "王小虎",
            Addr: "上海市普陀区金沙江路 1518 弄",
            Diameter: "上海市普陀区金沙江路 1518 弄",
            Attribute: "上海市普陀区金沙江路 1518 弄"
          }
        ],
        tableType: ""
      },
      customerTableData: {
        listData: [{}]
      },
      tableShow: false,
      customerTableShow: false,
      myBtnLabel: "图例",
      myCheckLabel: "查询",
      mapClick: false,
      mySelect: true,
      mycolor: "#0000ff",
      nowHour: "",
      myLegendData: {
        title: "基础管网",
        legendName: "",
        listData: [],
        type: "baseMap"
      },
      legendIsShow: true,
      list: [
        { label: "基础管网", value: "baseMap", index: 0 },
        { label: "管道流量", value: "Flow", index: 1 },
        { label: "管道流速", value: "Velocity", index: 2 },
        { label: "管道水力坡度", value: "Slop", index: 3 },
        { label: "水压标高", value: "HydraulicGrade", index: 4 },
        { label: "压力", value: "Pressure", index: 5 },
        { label: "水流方向", value: "Direction", index: 6},
        { label: "节点流量", value: "Demand", index: 7 },
        { label: "供水分界线", value: "SupplyArea", index: 8 },
        { label: "水龄", value: "Age", index: 9 },
        { label: "管龄", value: "PipeAge", index: 10 },
        { label: "管径分类", value: "Diameter", index: 11 },
        { label: "管材分类", value: "Material", index: 12},
        { label: "24小时压力波动", value: "PressureChange", index: 13 },
        { label: "24小时流向变化次数", value: "FlowChangeCount", index: 14 },
        { label: "阀门动态", value: "ValveUpdate", index: 15 },
        { label: "停水管道", value: "PipeStatus", index: 16 },
        
      ],
      ValveUpdateDisplay: false,
      startDate: new Date().setMonth(new Date().getMonth() - 1),
      startSelectDate: {
        year: new Date(
          new Date().setMonth(new Date().getMonth() - 1)
        ).getFullYear(),
        month: new Date(
          new Date().setMonth(new Date().getMonth() - 1)
        ).getMonth(),
        date: new Date(new Date().setMonth(new Date().getMonth() - 1)).getDate()
      },
      endDate: new Date(),
      endSelectDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate()
      },
      timeDisplay: true,
      timeCompareDisplay: false, //时间对比按钮显示
      widthData: "18px",
      showIndex: 0,
      selectAllElements: new Array(),
      showObject: { label: "基础管网", value: "baseMap" },
      showObjectTime: { label: "", value: 0 },
      listTime: [
        { label: "0点", value: 0, index: 0 },
        { label: "1点", value: 1, index: 1 },
        { label: "2点", value: 2, index: 2 },
        { label: "3点", value: 3, index: 3 },
        { label: "4点", value: 4, index: 4 },
        { label: "5点", value: 5, index: 5 },
        { label: "6点", value: 6, index: 6 },
        { label: "7点", value: 7, index: 7 },
        { label: "8点", value: 8, index: 8 },
        { label: "9点", value: 9, index: 9 },
        { label: "10点", value: 10, index: 10 },
        { label: "11点", value: 11, index: 11 },
        { label: "12点", value: 12, index: 12 },
        { label: "13点", value: 13, index: 13 },
        { label: "14点", value: 14, index: 14 },
        { label: "15点", value: 15, index: 15 },
        { label: "16点", value: 16, index: 16 },
        { label: "17点", value: 17, index: 17 },
        { label: "18点", value: 18, index: 18 },
        { label: "19点", value: 19, index: 19 },
        { label: "20点", value: 20, index: 20 },
        { label: "21点", value: 21, index: 21 },
        { label: "22点", value: 22, index: 22 },
        { label: "23点", value: 23, index: 23 }
      ],
      strA: 0,
      strB: 0,
      allIsDisplay: true,
      planTempCalculateResultLimit: {
        MinPressure: 0,
        MaxPressure: 0,
        MinFlow: 0,
        MaxFlow: 0,
        MinStrength: 0,
        MaxStrength: 0,
        levelMy: 5
      },
      time1: 0,
      time2: 0,
      tableNameMain: ""
    };
  },
  ready() {
    /* window.addEventListener('event_name',function(event){
               var typeMy = event.detail.type;
            console.log(this)
            if(typeMy=="sure")
            {
                this.methods.showMsgbox();
            }
          });  */
    alert("123456");
  },
  mounted() {
    window.addEventListener("event_name", this.myEventListener);
    //this.showMsgbox();
  },
  created() {
    var date = new Date();
    this.nowHour = this.listTime[date.getHours()].label;
    this.showObjectTime.value = this.listTime[date.getHours()].value;
    this.showObjectTime.label = this.listTime[date.getHours()].label;
  },
  methods: {
    /*  Mouseover:function(event){
              event.target.style.background='#83b224';
              event.target.style.color = '#fff'
          },
          leave:function(event){
              if(!this.mySelect)
              {
                   event.target.style.background='#fff';
                  event.target.style.color = '#000000'
              }
              else
              {
                event.target.style.background = '#70991f'
                event.target.style.color = '#fff'
              }
                
          }, */
    legendShow: function(event) {
      this.legendIsShow = !this.legendIsShow;
      /* this.mySelect = !this.mySelect;
                if(this.mySelect)
                {
                    event.target.style.color = '#fff'
                    event.target.style.background = '#70991f'
                }
                else
                {
                    event.target.background = '#fff'
                    event.target.style.color = '#000000'
                }  */
    },
    isMapClick: function(event) {
      this.mapClick = !this.mapClick;
      var myEventTemp = new CustomEvent("event_name", {
        detail: { type: "This is title!" }
      });
      myEventTemp.detail.type = "MapClick";
      myEventTemp.detail.data = this.mapClick;
      if (window.dispatchEvent) {
        window.dispatchEvent(myEventTemp);
      } else {
        window.fireEvent(myEventTemp);
      }
    },
    myTestClick: function(event) {
      var myEventTemp = new CustomEvent("event_name", {
        detail: { type: "This is title!" }
      });
      myEventTemp.detail.type = "MyTest";
      if (window.dispatchEvent) {
        window.dispatchEvent(myEventTemp);
      } else {
        window.fireEvent(myEventTemp);
      }
    },
    LoadingOpen(loadingLabel) {
      this.loading = this.$loading({
        lock: true,
        text: loadingLabel,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    LoadingClose() {
      this.loading.close();
    },
    /**
     * post方式调用后台计算的方法
     */
    myPostTest: function() {
      var a = [{ Name: "李四" }, { Name: "张三", Age: "12" }];
      axios
        .post(
          "http://121.40.242.176:8010/Service1.svc/MyPostTest",
          JSON.stringify(a),
          { headers: { "Content-Type": "application/json;" } }
        )
        .then(function(response) {
          console.log(response);
        });
    },
    myEventListener: function(event) {
      var typeMy = event.detail.type;
      var selectElement = event.detail.data;
      this.customerTableShow = false;
      if (typeMy == "sure") {
        this.showMsgbox(selectElement);
      } else if (typeMy == "ElementChangeListDelete") {
        var delId = selectElement.ElementId;
        for (var i = 0; i < this.selectAllElements.length; i++) {
          var itemTemp = this.selectAllElements[i];
          if ((itemTemp.ElementId = delId)) {
            this.selectAllElements.splice(i, 1);
            break;
          }
        }
      } else if (typeMy == "ElementChangeList") {
        //console.log(selectElement);
        if (this.tableNameMain == "")
          this.tableNameMain = this.GetRanLetterString(4);
        var planTempCalculateParameter = {
          Time: this.showObjectTime.value,
          PlanList: selectElement,
          //PlanList:[{}],
          Tf: 1,
          TableName: this.tableNameMain,
          UserID: "0"
        };
        if (selectElement.length != 0) {
          this.LoadingOpen("计算中"); //显示加载等待界面
          axios
            .post(
              urlClass.axiosUrl + "PlanTempCalculate",
              JSON.stringify(planTempCalculateParameter),
              { headers: { "Content-Type": "application/json;" } }
            )
            .then(this.PlanTempCalculateRespone);
        }
      } else if (typeMy == "drawStart") {
        this.LoadingOpen("画图中"); //显示加载等待界面
      } else if (typeMy == "drawEnd") {
        this.LoadingClose();
      } else if (typeMy == "GetCalculateResult") {
        this.planTempCalculateResultLimit = {
          MaxPressure: selectElement.MaxPressure,
          MinPressure: selectElement.MinPressure,
          MaxFlow: selectElement.MaxFlow,
          MinFlow: selectElement.MinFlow,
          MaxStrength: selectElement.MaxStrength,
          MinStrength: selectElement.MinStrength,
          levelMy: selectElement.levelMy
        };
        {
          axios
            .post(
              urlClass.axiosUrl + "PlanTempGetResultData",
              JSON.stringify(this.planTempCalculateResultLimit),
              { headers: { "Content-Type": "application/json;" } }
            )
            .then(this.PlanTempCalculateGetResult);
        }
      } else if (typeMy == "PlanTempWindowClose") {
        this.selectAllElements = new Array();
        this.tableNameMain = "";
      } else if (typeMy == "LegendDisplay") {
        this.myLegendData = selectElement;
      } else if (typeMy == "legendAllDisplay") {
      } else if (typeMy == "TimeCompare") {
        var time1Temp = event.detail.time1;
        var time2Temp = event.detail.time2;
        if (this.showObject.value != "SupplyArea") {
          var field = "Result_" + this.showObject.value + "_";
          this.GetTimeComparePipeMax(time1Temp, time2Temp, field);
        } else {
          var myEventTemp = new CustomEvent("event_name", {
            detail: { type: "This is title!" }
          });

          axios
            .get(
              urlClass.axiosUrl +
                "TimeCompareDataPipeSupplyArea" +
                "/" +
                time1Temp +
                "/" +
                time2Temp
            )
            .then(function(response) {
              /////////////////对比时间的结果//////////////////////////////////
              myEventTemp.detail.type = "TimeCompareSupplyArea";
              var timesTemp = new Object();
              timesTemp.time1 = time1Temp;
              timesTemp.time2 = time2Temp;
              myEventTemp.detail.data = timesTemp;
              if (window.dispatchEvent) {
                window.dispatchEvent(myEventTemp);
              } else {
                window.fireEvent(myEventTemp);
              }
              ///////////////////////当前时间的结果///////////////////////////////////////////
              myEventTemp.detail.type = "TimeCompareSupplyAreaO";
              myEventTemp.detail.data = response.data;
              if (window.dispatchEvent) {
                window.dispatchEvent(myEventTemp);
              } else {
                window.fireEvent(myEventTemp);
              }
            });
        }
      } else if (typeMy == "LegendLocationGet") {
        this.myTableData = selectElement;
        this.tableShow = true;
        this.customerTableShow = false;
      } else if (typeMy == "LegendCustomerGet") {
        this.myTableData = selectElement;
        this.tableShow = true;
      } else if (typeMy == "legendClose") {
        this.legendIsShow = selectElement;
      } else if (typeMy == "MyTableClose") {
        this.tableShow = selectElement;
      } else if (typeMy == "CustomerTableClose") {
        this.customerTableShow = selectElement;
      }
    },
    GetTimeComparePipeMax: function(time1, time2, field) {
      this.time1 = time1;
      this.time2 = time2;
      var urlTemp = "";
      if (
        this.showObject.value == "Flow" ||
        this.showObject.value == "Velocity" ||
        this.showObject.value == "Slop" ||
        this.showObject.value == "Age"
      ) {
        urlTemp =
          urlClass.axiosUrl +
          "TimeComparePipeMax/" +
          String(time1) +
          "/" +
          String(time2) +
          "/" +
          String(field);
      } else if (
        this.showObject.value == "Pressure" ||
        this.showObject.value == "HydraulicGrade" ||
        this.showObject.value == "Demand"
      ) {
        urlTemp =
          urlClass.axiosUrl +
          "TimeCompareNodeMax/" +
          String(time1) +
          "/" +
          String(time2) +
          "/" +
          String(field);
      }
      axios.get(urlTemp).then(this.GetTimeComparePipeMaxReturn);
    },
    GetTimeComparePipeMaxReturn: function(response) {
      this.PopUpTimeCompareMaxWindow(response.data, this.time1, this.time2);
    },
    PopUpTimeCompareMaxWindow: function(max, time1, time2) {
      this.$timeComparemaxWindow({
        title: "时间对比筛选值",
        cancel: "取消",
        content: "",
        confirm: "确定",
        max: max,
        time1: time1,
        time2: time2,
        className: "pop-custom"
      })
        .then(() => {
        })
        .catch(err => {
          console.log("error");
        });
    },
    PlanTempCalculateGetResult: function(response) {
      var dataTemp = response.data;
      var planResultLimit = {
        NodePressure: dataTemp.NodePressure,
        PipeDirection: dataTemp.PipeDirection,
        PipeStrength: dataTemp.PipeStrength,
        PipeFlow: dataTemp.PipeFlow,
        MaxPressure: this.planTempCalculateResultLimit.MaxPressure,
        MinPressure: this.planTempCalculateResultLimit.MinPressure,
        MaxFlow: this.planTempCalculateResultLimit.MaxFlow,
        MinFlow: this.planTempCalculateResultLimit.MinFlow,
        MaxStrength: this.planTempCalculateResultLimit.MaxStrength,
        MinStrength: this.planTempCalculateResultLimit.MinStrength,
        levelMy: this.planTempCalculateResultLimit.levelMy,
        TableName: this.tableNameMain
      };
      var myEventTemp = new CustomEvent("event_name", {
        detail: { type: "This is title!" }
      });
      myEventTemp.detail.type = "PlanTempCalculate";
      myEventTemp.detail.data = planResultLimit;
      if (window.dispatchEvent) {
        window.dispatchEvent(myEventTemp);
      } else {
        window.fireEvent(myEventTemp);
      }
    },
    PlanTempCalculateRespone: function(response) {
      this.LoadingClose();
      var resultIntervalData = {
        MaxPressure: response.data.MaxPressure,
        MinPressure: Number(response.data.MaxPressure) * 0.3,
        MaxFlow: response.data.MaxFlow,
        MinFlow: Number(response.data.MaxFlow) * 0.3,
        MaxStrength: response.data.MaxStrength,
        MinStrength: Number(response.data.MaxStrength) * 0.3,
        levelMy: 5
      };
      var myEventTemp = new CustomEvent("event_name", {
        detail: { type: "This is title!" }
      });
      myEventTemp.detail.type = "PlanCalTemp";
      myEventTemp.detail.data = this.tableNameMain;
      if (window.dispatchEvent) {
        window.dispatchEvent(myEventTemp);
      } else {
        window.fireEvent(myEventTemp);
      }
      this.showCalculateResultScreen(resultIntervalData);
    },
    GetRanLetterString: function(number) {
      var result = "";
      for (var i = 0; i < number; i++) {
        result += String.fromCharCode(65 + this.GetRanNum());
      }
      return result;
    },
    /**
     * 获取一个0-25的随机数
     */
    GetRanNum: function() {
      var ranNum;
      for (var i = 0; i < 4; i++) {
        ranNum = Math.ceil(Math.random() * 25);
      }
      return Number(ranNum);
    },
    CheckElement: function(allData, item) {
      var returnIndex = -1;
      for (var i = 0; i < allData.length; i++) {
        var itemTemp = allData[i];
        if (itemTemp.ElementId == item.ElementId) {
          returnIndex = i;
          break;
        }
      }
      return returnIndex;
    },
    TimeCompareClick: function(event) {
      this.$timeCompareWindow({
        title: "时间对比",
        cancel: "取消",
        content: "",
        confirm: "对比",
        initTime: this.showObjectTime.value,
        initTimeLabel: this.showObjectTime.label,
        className: "pop-custom"
      })
        .then(() => {
        })
        .catch(err => {
          console.log("error");
        });
    },
    showCalculateResultScreen: function(intervalData) {
      this.$calculateResultScreen({
        title: "显示运行变化的参数设置",
        cancel: "取消",
        content: "",
        confirm: "确定",
        className: "pop-custom",
        resultIntervalData: intervalData
      })
        .then(() => {
        })
        .catch(err => {
          console.log("error");
        });
    },
    showMsgbox: function(selectElement) {
      var indexTemp = this.CheckElement(this.selectAllElements, selectElement);
      if (indexTemp != -1) {
        this.selectAllElements.splice(indexTemp, 1);
      }
      this.selectAllElements.push(selectElement);
      this.$msgbox({
        title: "模拟方案",
        title2: this.showObjectTime.label,
        cancel: "取消",
        content: "这里是消息弹出内容",
        confirm: "计算",
        className: "pop-custom",
        listData: this.selectAllElements
      })
        .then(() => {
        })
        .catch(err => {
          console.log("error");
        });
    },
    dispatchEventMy: function(typeTemp) {
      var myEvent = new CustomEvent("event_name", {
        detail: { type: "This is title!" }
      });
      myEvent.detail.typeSelect = this.showObject.value;
      myEvent.detail.type = this.showObject.value;
      myEvent.detail.time = this.showObjectTime.value;
      myEvent.detail.startDate = this.startSelectDate;
      myEvent.detail.endDate = this.endSelectDate;
      myEvent.detail.eventType = typeTemp;
      if (window.dispatchEvent) {
        window.dispatchEvent(myEvent);
      } else {
        window.fireEvent(myEvent);
      }
    },
    showProject: function() {
      this.tableShow = false; //隐藏下面的表格
      this.allIsDisplay = true;
      if (
        this.showObject.value != "PressureChange" &&
        this.showObject.value != "FlowChangeCount" &&
        this.showObject.value != "Diameter" &&
        this.showObject.value != "Material" &&
        this.showObject.value != "PipeAge" &&
        this.showObject.value != "ValveUpdate"
      ) {
        this.timeDisplay = true;
        if (
          this.showObject.value != "baseMap" &&
          this.showObject.value != "PipeStatus"&&this.showObject.value != "Direction"
        ) {
          this.timeCompareDisplay = true;
        } else this.timeCompareDisplay = false;
      } else {
        this.timeCompareDisplay = false;
        this.timeDisplay = false;
      }

      if (this.showObject.value == "ValveUpdate")
        this.ValveUpdateDisplay = true;
      else this.ValveUpdateDisplay = false;
      this.dispatchEventMy("changeLayer");
    },
    showProjectTime: function() {
      this.tableShow = false; //隐藏下面的表格
      this.allIsDisplay = true;
      this.dispatchEventMy("updateTime");
    },
    myClick: function(event) {
      /*  axios.get('http://121.40.242.176:8010/Service1.svc/Rest/Add/'+this.strA+'/'+this.strB)
            .then(function(response){
                alert(response.data)
            }); */
      alert(5 / 2);
    },
    myStartTimeChange: function(event) {
      this.startDate = event;
      this.startSelectDate.year = event.getFullYear();
      this.startSelectDate.month = event.getMonth();
      this.startSelectDate.date = event.getDate();
      this.dispatchEventMy(this.showObject.value);
    },
    myEndTimeChange: function(event) {
      this.endDate = event;
      this.endSelectDate.year = event.getFullYear();
      this.endSelectDate.month = event.getMonth();
      this.endSelectDate.date = event.getDate();
      this.dispatchEventMy(this.showObject.value);
    },
    pickedMyStart: function(year, month, date) {
      this.dispatchEventMy(this.showObject.value);
    },
    pickedMyEnd: function(year, month, date) {
      this.dispatchEventMy(this.showObject.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainClass {
  width: 100%;
  height: 100%;
}
.MytestClass {
  width: 10px;
  height: 10px;
  background-color: #ff0000;
}
#myLeft {
  width: 100vw;
  height: 100vh;
  background-color: #eeeeee;
  /* float:left;   */
}
#myRight {
  width: 50vw;
  height: 100vh;
  background-color: #eeeeee;
  float: right;
}
.list {
  /* position: absolute; 
    top:10px;*/
  /* left: 170px; */
  z-index: 99;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 20px;
}
.labelmy {
  /* position: absolute; 
    top: 10px;*/
  /* left: 60px; */
  z-index: 99;
  font-family: "Microsoft YaHei";
  font-size: 16px;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 20px;
}
.MyElBtn {
  /* position: absolute; */
  top: 30px;
  /* left: 60px; */
  z-index: 99;
}
.listTime {
  /* position: absolute; 
    top:10px;
    /* left: 440px; */
  z-index: 99;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 20px;
}
.labelmyTime {
  /* position: absolute; 
    top: 10px;*/
  /* left: 330px; */
  z-index: 99;
  font-family: "Microsoft YaHei";
  font-size: 16px;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 30px;
}
.startLabelmyTime {
  /* position: absolute; 
    top: 20px;*/
  /* left: 380px; */
  z-index: 99;
  font-size: 16px;
  padding-top: 17px;
  padding-bottom: 17px;
}
.startDate {
  /* position: absolute; 
    top: 10px;*/
  /* width: 10px; */
  /* left: 450px; */
  width: 130px;
  z-index: 99;
  padding-top: 6px;
  padding-bottom: 6px;
}
.endLabelmyTime {
  /* position: absolute; 
    top: 20px;*/
  /* left: 570px; */

  z-index: 99;
  font-size: 16px;
  padding-top: 17px;
  padding-bottom: 17px;
}
.endDate {
  /* position: absolute; 
    top: 10px;*/
  /* width: 10px; */
  /* left: 640px; */
  width: 130px;
  z-index: 99;
  padding-top: 6px;
  padding-bottom: 6px;
}
.legendStyle {
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 99;
}
.TimeCompare {
  /* position: absolute; */
  top: 10px;
  /* left: 500px; */
  z-index: 99;
  font-family: center;
  font-size: 12px;
  /* background: #fff; */
  height: 28px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 2px;
  margin-left: 10px;
}
.legendShowClass {
  font-family: center;
  font-size: 12px;
  height: 28px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 2px;
  margin-left: 10px;
}
.legendShowClass1 {
  font-family: center;
  font-size: 12px;
  height: 28px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 2px;
}
.myDivClassRow {
  /*font-family: center;*/
  width: 100%;
  height: 40px;
  background: #ecedef;
  z-index: 99;
  position: absolute;
  /* vertical-align: middle; */
}
.tableClass {
  width: 100%;
  position: absolute;
  bottom: 0px;
  z-index: 99;
  background-color: #fff;
}
</style>
