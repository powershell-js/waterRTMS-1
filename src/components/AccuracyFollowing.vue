<template>
  <div class="mainDivClass1" :style="{height:minHeight+'px'}">
    <div class="leftClassBackground" :style="{height:minHeightLeft+'px'}">
      <div class="ksfxbox">
               <div class="line"></div>
                <div class="linerighttext">在线水利模型精度分析</div>
      </div>
       <div class="sliderClass" >
         <div class="divOnlyClass">
           <td style="padding-top:5px;padding-right:10px">日期</td>
           <el-date-picker
            v-model="dateValue"
            type="date"
            style="width:150px">
          </el-date-picker>
         </div>
           <div class="divOnlyClass">
            <td style="padding-top:5px;padding-right:10px">小时</td>
            <el-select v-model="hourValue" v-on:change="HourSelection" style="width:150px">
              <el-option
              v-for="item in HourSelections"
              :key="item.label"
              :value="item.index"
              :label="item.label">
            </el-option>
            </el-select>
          </div>
          <div class="divOnlyClass">
          <td style="padding-top:5px;padding-right:10px">分钟</td>
           <el-select v-model="minuteValue" v-on:change="MinuteSelection" style="width:150px">
             <el-option
            v-for="item in MinuteSelections"
            :key="item.label"
            :value="item.index"
            :label="item.label">
          </el-option>
          </el-select>
          </div>
          <el-button type="success" size="mini" v-on:click="CheckClick">查询</el-button>
        </div>
      <div class="circleStatic">
        <div class="OnlyCircleStatic">
          <circular-statistics style="width:100%" :widthObject="widthObject" key="ratio1"></circular-statistics>
        </div>
      </div>
      <div class="tableClassMy" >
          <el-tabs v-model="activeName" class="tableHeaderClass" @tab-click="handleClick">
                    <el-tab-pane label="压力监测点精度" class="tablePaneClass" name="first">
                      <el-table  style="width:100%" ref="grid" :height="myHeight+'px'" :data="pressureTableData">
                        <el-table-column   prop="Name" label="监测点" :align="'center'"> 
                          <template slot-scope="scope" >
                            <div :style="{color:scope.row.color}">{{scope.row.Name}}</div>
                          </template>
                          </el-table-column><!--:style="{color:scope.row.color}"-->
                          <el-table-column prop="MonitorValue" label="实测值"  :align="'center'"></el-table-column>
                          <el-table-column prop="CalValue" label="模拟值"  :align="'center'"></el-table-column>
                          <el-table-column prop="DelValue" label="误差"  :align="'center'"></el-table-column>
                          <el-table-column prop="Status" label="状态"  :align="'center'"></el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="流量监测点精度" class="tablePaneClass" name="second">
                       <el-table v-if="secondIsDisplay"   style="width:100%" :height="myHeight+'px'"  ref="grid" :data="demandTableData">
                          <el-table-column prop="Name" label="监测点" :align="'center'"> 
                              <template slot-scope="scope" >
                            <div :style="{color:scope.row.color}">{{scope.row.Name}}</div>
                          </template>
                          </el-table-column>
                          <el-table-column prop="MonitorValue" label="实测值"  :align="'center'"></el-table-column>
                          <el-table-column prop="CalValue" label="模拟值"  :align="'center'"></el-table-column>
                          <el-table-column prop="DelValue" label="误差"  :align="'center'"></el-table-column>
                          <el-table-column prop="Percent" label="占比"  :align="'center'"></el-table-column>
                          <el-table-column prop="Accuracy" label="精度"  :align="'center'"></el-table-column>
                          <el-table-column prop="Status" label="状态"  :align="'center'"></el-table-column>
                      </el-table>
                    </el-tab-pane>
            </el-tabs>
      </div>
      <div style="padding-right:10px;padding-left:10px" ><!--:style="{height:myHeight+'px'}"  -->
             
      </div>
      <div class="leftClass">
        <!-- <div class="chartLabelDivClass"> -->
          <div class="ksfxbox">
               <div class="line"></div>
                <div class="linerighttext">精度分析曲线</div>
          </div>
        <!-- </div> -->
        <div style="width:50%;padding-top:10px">
          <chart-main :chartData="chartData"></chart-main>
        </div>
        
      </div>
    </div>
    <div class="mainClass" :style="{minHeight:minHeight+'px'}">
        <div style="height:100%;">
            <mytdt-map style="width:100%;height:100%" key="mapTemp"></mytdt-map>
            <div class="AccuracyStatic">
              <td style="font-size: 14px;padding-top:10px;padding-left:5px">图例</td>
              <div class="legendAccuracy" >
                <div style="background:#6e7b8b;height:1px;width:100%"></div>
               <div class="oneLevelClass">
                 <img src="../../static/assets/accuracy/red.png" style="width:15px;height:15px;padding-top:2px" alt="">
                 <td style="color:#6e7b8b;font-size: 12px;">{{accuracyLevel1}}</td>
               </div>
               <div class="oneLevelClass">
                 <img src="../../static/assets/accuracy/green.png" style="width:15px;height:15px;padding-top:2px" alt="">
                 <td style="color:#6e7b8b;font-size: 12px">{{accuracyLevel2}}</td>
               </div>
               <div class="oneLevelClass">
                 <img src="../../static/assets/accuracy/blue.png" style="width:15px;height:15px;padding-top:2px" alt="">
                 <td style="color:#6e7b8b;font-size: 12px">{{accuracyLevel3}}</td>
               </div>
               <div class="oneLevelClass">
                 <img src="../../static/assets/accuracy/yellow.png" style="width:15px;height:15px;padding-top:2px" alt="">
                 <td style="color:#6e7b8b;font-size: 12px">{{accuracyLevel4}}</td>
               </div>
              </div>
              
            </div>
        </div>
    </div>
   
</div>
</template>
<script>
import axios from "axios";
import urlClass from "@/components/js/UrlClass";
import CircularStatistics from "@/components/AccuracyMain/CircularStatistics";
import MytdtMap from "@/components/mytdt/map";
import ChartMain from "@/components/AccuracyMain/ChartMain";
import WindowEvent from "@/components/js/WindowsEvent";
export default {
  components: {
    MytdtMap,
    ChartMain,
    CircularStatistics
  },
  mounted() {
    for (var i = 0; i < 24; i++) {
      var temp = { index: i, label: String(i) + "点", value: i };
      this.HourSelections.push(temp);
    }
    for (var i = 0; i < 4; i++) {
      var temp = { index: i, label: String(i * 15) + "分", value: i * 15 };
      this.MinuteSelections.push(temp);
    }
    var date = new Date();
    window.addEventListener("event_name", this.myEventListener);
    this.widthObject.widthSpan = (document.documentElement.clientWidth * 0.5-80*6)/7;
     WindowEvent.MyDispatchEvent(
            "AccuracyFollowingInit",
            this.widthObject.widthSpan
          );
    this.minHeight = document.documentElement.clientHeight-20;
    this.minHeightLeft = document.documentElement.clientHeight-20;
    this.myHeight = document.documentElement.clientHeight-27-115-170-101-10-30-59;
    this.GetAccuracyRatioData(date);
    this.GetPressureTableData(date);
    var startDate = date;
    startDate.setMonth(startDate.getMonth() - 1); //获取一个月之前的日期
    this.GetAccuracyChartData(startDate, date);

    var that = this;
    window.onresize = function() {
      that.minHeight = document.documentElement.clientHeight-20;
      that.minHeightLeft = document.documentElement.clientHeight - 20;
      that.myHeight = document.documentElement.clientHeight-27-115-170-101-10-30;
      that.widthObject.widthSpan = (document.documentElement.clientWidth * 0.5-80*6)/7;
       WindowEvent.MyDispatchEvent(
            "AccuracyFollowingInit",
            that.widthObject.widthSpan
          );
    };
  },
  data() {
    return {
      widthObject:{widthSpan:45},
      legendIsDisplay:true,
      accuracyLevel1:'压力误差>2m',
      accuracyLevel2:'压力误差1~2m',
      accuracyLevel3:'压力误差<1m',
      accuracyLevel4:'未上传',
      mapIsLoad: false,
      secondIsDisplay: false,
      dateValue: new Date(),
      hourValue: new Date().getHours(),
      minuteValue: parseInt(new Date().getMinutes() / 15) * 15,
      HourSelections: [],
      MinuteSelections: [],
      pressureTableData: [],
      demandTableData: [],
      circleData: { ratio: [0.666, 0.555, 0.444, 0.333, 0.222, 0.111] },
      min: 0,
      max: 30,
      step: 1,
      minHeightLeft:0,
      myHeight: 0,
      sliderValue: 0,
      activeName: "first",
      minHeight: 0,
      chartShow: true,
      chartData: {
        listData: {
          listX: [1, 2, 3, 4, 5, 6, 7] ,//x轴数据
          listXNew: [1, 2, 3, 4, 5, 6, 7] //x轴数据
        },
        legendLabel: ["模型精度", "压力精度", "流量精度"], //图例的标签
        xAxisName: "时间(天)", //x轴标签
        yAxisName: "精度(%)", //y轴标签
        series: [
          {
            //曲线数据
            type: "line", //曲线类型
            name: "模型精度", //曲线名称  跟图例一致
            data: [1, 7, 2, 3, 4, 0, 7], //单条曲线的数据源
            itemStyle: {
              //曲线样式
              normal: {
                color: "#1f9950",
                width: 2
              }
            },
            areaStyle: {
              //背景填充样式
              normal: {
                color: "#46759f"
              }
            }
          },
          {
            type: "line",
            name: "压力精度",
            data: [4, 5, 78, 2, 45, 7, 9],
            itemStyle: {
              normal: {
                color: "#5d77e6",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: "#5d77e6"
              }
            }
          },
          {
            type: "line",
            name: "流量精度",
            data: [4, 5, 30, 2, 60, 7, 9],
            itemStyle: {
              normal: {
                color: "#d448ab",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: "#d448ab"
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      var date = this.dateValue;
      date.setHours(this.hourValue);
      date.setMinutes(this.minuteValue);
      date.setSeconds(0);
      if (this.activeName == "second") {
        this.secondIsDisplay = true;
        this.GetDemandTableData(date);
        this.accuracyLevel1 = '流量误差>10%';
        this.accuracyLevel2 = '流量误差5%~10%';
        this.accuracyLevel3 = '流量误差<5%';
        this.accuracyLevel4 = '未上传';
      } else
      {
        this.GetPressureTableData(date);
        this.accuracyLevel1 = '压力误差>2m';
        this.accuracyLevel2 = '压力误差1~2m';
        this.accuracyLevel3 = '压力误差<1m';
        this.accuracyLevel4 = '未上传';
      } 
    },
    CheckClick() {
      var date = this.dateValue;
      date.setHours(this.hourValue);
      date.setMinutes(this.minuteValue);
      date.setSeconds(0);
      this.GetAccuracyRatioData(date);
      if (this.activeName == "first") {
        this.GetPressureTableData(date);
      }
      else if (this.activeName == "second"){
        this.GetDemandTableData(date);
      } 
    },
    HourSelection() {},
    MinuteSelection() {},
    myEventListener(event) {
      var type = event.detail.type;
      var data = event.detail.data;
      if (type == "LoadMap") {
        WindowEvent.MyDispatchEvent(
          "DrawAccuracyMonitor",
          this.pressureTableData
        );
      }
    },
    GetPressureTableData(date) {
      //var date = new Date();
      var parameterTemp = {
        StartYear: date.getFullYear(),
        StartMonth: date.getMonth() + 1,
        StartDay: date.getDate(),
        StartHour: date.getHours(),
        StartMinute: parseInt(date.getMinutes()/15*15)
      };
      var self = this;
      axios
        .post(
          urlClass.axiosUrl + "GetPressureMonitorHistory",
          JSON.stringify(parameterTemp),
          { headers: { "Content-Type": "application/json;" } }
        )
        .then(function(respone) {
          self.pressureTableData = respone.data.slice(0);
          for (var i = 0; i < self.pressureTableData.length; i++) {
            var colorTemp = "";
            var objTemp = self.pressureTableData[i];
            if (objTemp.Level == "-1") colorTemp = "#ffff00";
            else if (objTemp.Level == "1") {
              colorTemp = "#0000ff";
            } else if (objTemp.Level == "2") {
              colorTemp = "#00ff00";
            } else if (objTemp.Level == "3") {
              colorTemp = "#ff0000";
            }
            self.pressureTableData[i].color = colorTemp;
          }
          WindowEvent.MyDispatchEvent(
            "DrawAccuracyMonitor",
            self.pressureTableData
          );
        });
    },
    GetDemandTableData(date) {
      //var date = new Date();
      var parameterTemp = {
        StartYear: date.getFullYear(),
        StartMonth: date.getMonth() + 1,
        StartDay: date.getDate(),
        StartHour: date.getHours(),
        StartMinute: parseInt(date.getMinutes()/15*15),
        AllDemand: 10000
      };
      var self = this;
      axios
        .post(
          urlClass.axiosUrl + "GetFlowMonitorHistory",
          JSON.stringify(parameterTemp),
          { headers: { "Content-Type": "application/json;" } }
        )
        .then(function(respone) {
          self.demandTableData = respone.data.slice(0);
          for (var i = 0; i < self.demandTableData.length; i++) {
            var colorTemp = "";
            var objTemp = self.demandTableData[i];
            if (objTemp.Level == "-1") colorTemp = "#ffff00";
            else if (objTemp.Level == "1") {
              colorTemp = "#0000ff";
            } else if (objTemp.Level == "2") {
              colorTemp = "#00ff00";
            } else if (objTemp.Level == "3") {
              colorTemp = "#ff0000";
            }
            self.demandTableData[i].color = colorTemp;
          }
          WindowEvent.MyDispatchEvent(
            "DrawAccuracyMonitor",
            self.demandTableData
          );
        });
    },
    GetAccuracyChartData(startDate, endDate) {
      //var date = new Date();
      var parameterTemp = {
        StartYear: startDate.getFullYear(),
        StartMonth: startDate.getMonth() + 1,
        StartDay: startDate.getDate(),
        StartHour: startDate.getHours(),
        StartMinute: parseInt(startDate.getMinutes()/15*15),
        EndYear: endDate.getFullYear(),
        EndMonth: endDate.getMonth() + 1,
        EndDay: endDate.getDate(),
        EndHour: endDate.getHours(),
        EndMinute: parseInt(endDate.getMinutes()/15*15)
      };
      var self = this;
      axios
        .post(
          urlClass.axiosUrl + "GetHistoryAccuracyData",
          JSON.stringify(parameterTemp),
          { headers: { "Content-Type": "application/json;" } }
        )
        .then(function(respone) {
          var object = respone.data;
          var listXData = object.Times.slice(0);
          var listXNewData = object.TimesNew.slice(0);
          var listYData1 = object.Accuracys.slice(0);
          var listYData2 = object.AccuracyPressures.slice(0);
          var listYData3 = object.AccuracyDemands.slice(0);
          self.chartData.listData.listX = listXData.slice(0);
          self.chartData.listData.listXNew = listXNewData.slice(0);
          self.chartData.series[0].data = listYData1.slice(0);
          self.chartData.series[1].data = listYData2.slice(0);
          self.chartData.series[2].data = listYData3.slice(0);
          WindowEvent.MyDispatchEvent("AccuracyChartReturn", "");
        });
    },
    GetAccuracyRatioData(date) {
      //var date = new Date();
      var parameterTemp = {
        StartYear: date.getFullYear(),
        StartMonth: date.getMonth() + 1,
        StartDay: date.getDate(),
        StartHour: date.getHours(),
        StartMinute: parseInt(date.getMinutes()/15*15)
      };
      var self = this;
      console.log(parameterTemp)
      axios
        .post(
          urlClass.axiosUrl + "GetFillData",
          JSON.stringify(parameterTemp),
          { headers: { "Content-Type": "application/json;" } }
        )
        .then(function(respone) {
          var returnDate = respone.data;
          var arrayTemp = new Array();
          arrayTemp.push(returnDate.AllArrcracy);
          arrayTemp.push(returnDate.PressureMaxArruracy);
          arrayTemp.push(returnDate.PressureMiddleArruracy);
          arrayTemp.push(returnDate.PressureMinArruracy);
          arrayTemp.push(returnDate.DemandMaxArruracy);
          arrayTemp.push(returnDate.DemandMinArruracy);
          WindowEvent.MyDispatchEvent("AccuracyFollowingReturn", arrayTemp);
        });
    }
  }
};
</script>
<style scoped>
.ksfxbox{
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
  border-top: 1px #e4e4ec solid;
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
.legendAccuracy{
  height: 128px;
  padding-top:10px;
  padding-left:10px;
  padding-right:10px;
  padding-bottom:10px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.oneLevelClass{
   display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.AccuracyStatic{
  background: #ffffff;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 99;
  height: 180px;
}
.divOnlyClass {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.tableHeaderClass {
  margin-right: 10px;
  font-size: 12px;
}

.tablePaneClass {
  margin-right: 10px;
  font-size: 12px;
}
.sliderClass {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 27px;
}
.chartLabelDivClass {
  width: 100%;
  margin-left: 10px;
  margin-bottom: 0px;
}
.tableClassMy {
  width: 100%;
  padding-left: 10px;
  padding-right: 100px;
}
.OnlyCircleStatic {
  width: 100%;
  text-align: center;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.leftClass {
  width: 100%;
  background: #ffffff;
}
.staticLabelClass {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.circleStatic {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  /* margin-left: 45px;
  margin-right: 45px; */
  height: 115px;
}
.leftClassBackground {
  width: 50%;
  background: #ffffff;
}
.mainDivClass1 {
  border: 1px #d1d1da solid;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /* justify-content: flex-start; */
}
.mainClass {
  width: 50%;
  height: 100%;
}
/* .chartClass{
    height: 25%;
    width: 100%;
    z-index: 99;
    bottom: 0px;
    position: absolute;
} */
</style>


