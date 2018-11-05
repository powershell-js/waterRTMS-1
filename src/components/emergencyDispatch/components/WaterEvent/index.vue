<template>
    <div class="water-event-warp">
        <div class="set-wrapper1 clearfix1">
            <div style="float:left;" class="boomSet-title fontEd">污染分析参数设置</div>
            <div style="float:right">
                <div class="boomNum1">
                    <td class="fontEd1">扩散时间</td>
                    <el-input  style="padding-right:10px;width:80px" v-model="passTime" placeholder="输入小时数"></el-input>
                    <td class="fontEd1">小时</td>
                    <el-input :disabled="true" v-model="sourceId" style="width:100px" placeholder="输入污染点编号"></el-input>
                    <el-button style="margin-top:5px;margin-left:10px" size="min" v-on:click="selectClick" >选择污染点</el-button>
                </div>
            </div>
        </div>
        <div class="water-event-head">
            <h3>管网当前水质状态</h3>
        </div>
        <el-row>
            <el-col :span="12">
                <div class="factory">
                    <h3 class="water-event-sub-head">水厂出厂水质指标列表</h3>
                    <div class="table">
                        <el-table
                            :data="factoryData"
                            style="width: 100%">
                            <el-table-column
                                prop="No"
                                label="编号">
                            </el-table-column>
                            <el-table-column
                                prop="WaterworksName"
                                label="水厂名称">
                            </el-table-column>
                            <el-table-column
                                label="出厂余氯(ppm)">
                                <template slot-scope="scope">
                                    <div :style="{'background-color': scope.row.ChlorineColorNo}" :class="{'error':scope.row.ChlorineColorNo}">{{ scope.row.Chlorine.toFixed(2) }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="出厂浊度(NTU)">
                                <template slot-scope="scope">
                                    <div :style="{'background-color': scope.row.TurbidityColorNo}" :class="{'error':scope.row.TurbidityColorNo}">{{ scope.row.Turbidity.toFixed(2) }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="PH">
                                <template slot-scope="scope">
                                    <div>{{ scope.row.PH.toFixed(2) }}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="factory">
                    <h3 class="water-event-sub-head">水质监测点水质指标列表</h3>
                    <div class="table">
                        <el-table
                            :data="WaterQualityPointTargetData"
                            style="width: 100%">
                            <el-table-column
                                prop="No"
                                label="编号">
                            </el-table-column>
                            <el-table-column
                                prop="WaterQualityPoint"
                                label="水质点">
                            </el-table-column>
                            <el-table-column
                                label="出厂余氯(ppm)">
                                <template slot-scope="scope">
                                    <div :style="{'background-color': scope.row.ChlorineColorNo}" :class="{'error':scope.row.ChlorineColorNo}">{{ scope.row.Chlorine.toFixed(2) }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="出厂浊度(NTU)">
                                <template slot-scope="scope">
                                    <div :style="{'background-color': scope.row.TurbidityColorNo}" :class="{'error':scope.row.TurbidityColorNo}">{{ scope.row.Turbidity.toFixed(2) }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="PH">
                                <template slot-scope="scope">
                                    <div>{{ scope.row.PH.toFixed(2) }}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="water-point">
            <el-row type="flex">
                <el-col :span="4" class="point-block">
                    <span class="point-sub-name">水质指标变化最大水质监测点</span>
                    <div class="point-name">水质监测点01</div>
                </el-col>
                <el-col :span="3" class="block">
                    <number-block :data="{name:'余氯(ppm)',value:MaxWaterQualityPoint.Chlorine,unit:'0.70',color:'#70991F'}"></number-block>
                </el-col>
                <el-col :span="3" class="block">
                    <number-block :data="{name:'浊度(NTU)',value:MaxWaterQualityPoint.Turbidity,unit:'0.85',color:'#E9AF3B'}"></number-block>
                </el-col>
                <el-col :span="3" class="block">
                    <number-block :data="{name:'PH值',value:MaxWaterQualityPoint.PH,unit:'7.0',color:'#D56459'}"></number-block>
                </el-col>
            </el-row>
        </div>
        <step :steps="steps"></step>
        <div class="water-event-head">
            <el-row>
                <el-col :span="12"><h3>{{headList[stepKey].name}}</h3></el-col>
                <el-col :span="12" style="text-align:right">
                    <el-button type="success" v-for="btn in headList[stepKey].btns" :key="btn.name" @click="btn.onClick">{{btn.name}}</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="steps-warp">
            <trace-source v-show="stepKey=='syfx'" :source-data="SourceData"></trace-source>
            <mock-analyze-list v-show="stepKey=='ksfx'" ></mock-analyze-list>
            <emergency-setting v-show="stepKey=='yjcz'" 
                :diffusion-data="emergencyDiffusionData"
                :selected-tab="emergencyTab" :closeSearchListData="closeSearchListData" ref="emergency"></emergency-setting>
        </div>
    </div>
</template>
<script>
import bus from '@/components/js/bus'
import mainClass from '@/components/js/MainClass'
import WindowsEvent from "@/components/js/WindowsEvent";
import TraceSource from "./TraceSource.vue";
import step from "../../../step.vue";
import NumberBlock from "./numberBlock";
import MockAnalyzeList from "./mockAnalyzeList.vue";
import EmergencySetting from "./emergencySetting.vue";
import urlClass from "@/components/js/UrlClass";
export default {
  components: {
    TraceSource,
    step,
    NumberBlock,
    MockAnalyzeList,
    EmergencySetting
  },
  mounted() {
    window.addEventListener("event_name", this.myEventListener);
  },
  data() {
    return {
      steps: [
        { name: "污染溯源分析", onClick: this.stepClick, key: "syfx" },
        { name: "污染扩散分析", onClick: this.stepClick, key: "ksfx" },
        { name: "应急处置", onClick: this.stepClick, key: "yjcz" }
      ],
      stepKey: "syfx",
      headList: {
        syfx: {
          name: "污染物溯源范围分析",
          btns: [{ name: "溯源分析", onClick: this.TraceabilityAnalysisClick }]
        },
        ksfx: {
          name: "污染物扩散范围分析",
          btns: [{ name: "扩散分析", onClick: this.DiffusionAnalysisClick }]
        },
        yjcz: {
          name: "管网水质应急调度方案",
          btns: [
            { name: "关阀搜索", onClick: this.FetchEmergencyValveOffData },
            { name: "模拟分析", onClick: this.FetchWaterStopUserData },
            { name: "应急调度", onClick: this.FetchEmergencyData }
          ]
        }
      },
      factoryData: [],
      WaterQualityPointTargetData: [],
      MaxWaterQualityPoint: {},
      SourceData: {
        ChlorineSpatialCurveData: [],
        PHSpatialCurveData: [],
        SewageQualityTarget: {},
        TurbiditySpatialCurveData: [],
        WaterQualityTarget: {}
      },
      diffusionData: {},
      DiffusionData: [],
      emergencyDiffusionData: [],
      emergencyTab: "gfss",
      sourceId: "",
      passTime: "",
      isDiffusion: false,
      max: 0,
      parameter: {
        Demand: 0,
        ElementId: 0,
        Type: 0,
        CanNotBeclosedValves: [],
        Time: 0,
        TableName: "",
        UserId: "",
        IsSave: false,
        CloseValveList: []
      },
      loading:'',
      selectType:0,
      stopWaterInfo:[],
      closeValveInfo:[],
      effectUserInfo:[],
      closeSearchListData:{},
      mockEffectUserInfo:[]
    };
  },
  methods: {
    /**
     * 关阀计算绘图
     */
    CloseValveCalReturn: function(response) {
      var result = response.data;
      var object = new Object();
      object.min = result.MinFlow;
      object.max = result.MaxFlow;
      object.allData = result.PipeFlow;
      object.DownHeadMax = result.DownHeadMax;
      object.minP = result.MinPressure;
      object.maxP = result.MaxPressure;
      object.NodePressure = result.NodePressure;
      object.TableName = this.parameter.TableName;
      var userArray = result.EffectUser.slice(0);
      bus.$emit("mockDataChange", userArray)
      WindowsEvent.MyDispatchEvent("PipeBurstDraw", object);
      WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
    },
    CloseValveCal: function() {
      if (this.parameter.CloseValveList.length == 0) alert("未关闭任何阀门");
      else {
        this.parameter.IsSave = true;
        if(this.parameter.IsSave&&this.parameter.TableName=="")
          {
            this.parameter.TableName = mainClass.GetRanLetterString(4);
          }
        WindowsEvent.MyDispatchEvent("PipeBurstLoadingBegin", "正在计算");
        this.$axios
          .post(
            urlClass.axiosUrl + "CloseModel",
            JSON.stringify(this.parameter),
            {
              headers: { "Content-Type": "application/json;" }
            }
          )
          .then(this.CloseValveCalReturn)
          .catch(function (error) {
                WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            });
      }
    },
      /**
     * 关阀搜索绘图
     */
    CloseValveAnalysisReturn: function(response) {
      var result = response.data;
      var object = new Object();
      object.ListPipe = result.ListPipe;
      object.ListValve = result.ListValve;
      object.ListUser = result.ListUser;
      object.TitleArr = result.TitleArr;
      object.CloseValvesList = result.CloseValvesList;
      object.TitleArr = result.TitleArr;
      object.ClosedCheckValvesData = result.ClosedCheckValvesData;
      object.OpenValvesList = result.OpenValvesList;
      object.ListReleasedPipes = result.ListReleasedPipes;

      this.parameter.CloseValveList = result.FoundValves;

      this.stopWaterInfo = result.TitleArr;
      this.closeValveInfo = result.ListValve;
      this.effectUserInfo = result.ListUser;
      this.closeSearchListData.closeValveInfo = result.ListValve;
      this.closeSearchListData.effectUserInfo = result.ListUser;
      bus.$emit("DataChange", this.closeSearchListData)
      console.log("爆管结果")
      console.log(this.closeSearchListData)
      WindowsEvent.MyDispatchEvent("PipeBurstCloseValveDraw", object);
      //this.$emit("showRightWin", object);
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
    CloseValveAnalysis: function() {
      if (this.sourceId == ""||this.passTime=="") alert("请检查输入参数");
      else {
        WindowsEvent.MyDispatchEvent("PipeBurstLoadingBegin", "正在分析关阀");
        //this.parameter.Type = this.radio - 1;
        var self = this;
        console.log("爆管参数")
        console.log(this.parameter)
        if (this.selectType == "0") {
          this.$axios
            .post(
              urlClass.axiosUrl + "PipeBurstInNode",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.CloseValveAnalysisReturn)
            .catch(function(error) {
              WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            });
        } else {
          this.$axios
            .post(
              urlClass.axiosUrl + "PipeBurstInPipe",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.CloseValveAnalysisReturn)
            .catch(function(error) {
              WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            });
        }
      }
    },
    SourceAnalysis: function() {
      if (this.sourceId == "" || this.passTime == "") alert("请检查输入参数");
      else {
        this.parameter.ElementId = this.sourceId;
        this.isDiffusion = true;
        this.max = Number(this.passTime);
        var nowHour = new Date().getHours();
        var self = this;
        this.$axios
          .get(
            urlClass.axiosUrl +
              "NodeTraceReverse" +
              "/" +
              this.sourceId +
              "/" +
              nowHour +
              "/" +
              this.passTime +
              "/" +
              "pipe"
          )
          .then(function(response) {
            var result = response.data;
            var object = new Object();
            object.min = 0;
            object.max = self.passTime;
            object.allData = result.ListPipe;
            object.data = result;
            self.diffusionData = Object.assign({}, result);
             var CanNotBeclosedValves = self.diffusionData.ListValve;
            var arrayTemp = new Array();
            for(var i = 0;i<CanNotBeclosedValves.length;i++)
            {
                arrayTemp.push(CanNotBeclosedValves[i].ElementId);
            }
            self.parameter.CanNotBeclosedValves = arrayTemp;
            WindowsEvent.MyDispatchEvent("DiffusionDraw", object);
            WindowsEvent.MyDispatchEvent(
              "DiffusionSourcePosition",
              self.sourceId
            );
          });
      }
    },
    DiffusionAnalysis: function() {
      if (this.sourceId == "" || this.passTime == "") alert("请检查输入参数");
      else {
        this.isDiffusion = true;
        this.max = Number(this.passTime);
        var self = this;
        var nowHour = new Date().getHours();
        this.$axios
          .get(
            urlClass.axiosUrl +
              "NodeTrace" +
              "/" +
              this.sourceId +
              "/" +
              nowHour +
              "/" +
              this.passTime +
              "/" +
              "pipe"
          )
          .then(function(response) {
            var result = response.data;
            var object = new Object();
            object.min = 0;
            object.max = self.passTime;
            object.allData = result.ListPipe;
            object.data = result;
            self.diffusionData = Object.assign({}, result);
            
            var CanNotBeclosedValves = self.diffusionData.ListValve;
            var arrayTemp = new Array();
            for(var i = 0;i<CanNotBeclosedValves.length;i++)
            {
                arrayTemp.push(CanNotBeclosedValves[i].ElementId);
            }
            self.parameter.CanNotBeclosedValves = arrayTemp;
            self.DiffusionData = self.diffusionData.ListUser.slice(0);
            bus.$emit("mockDataChange", self.DiffusionData)
            WindowsEvent.MyDispatchEvent("DiffusionDraw", object);
            WindowsEvent.MyDispatchEvent(
              "DiffusionSourcePosition",
              self.sourceId
            );
          });
      }
    },
    myEventListener: function(event) {
      var typeTemp = event.detail.type;
      var dataTemp = event.detail.data;
      if (typeTemp == "DiffusionMapClickReturn") {
        this.sourceId = dataTemp;
      }
      else if(typeTemp == "PipeBurstLoadingBegin"){
          this.LoadingOpen(event.detail.data);
      }
      else if (typeTemp == "PipeBurstLoadingEnd") {
        this.LoadingClose();
      }
      else if (typeTemp == "SetCloseValveState") {
        var dataTemp = event.detail.data.ElementID;

        if (this.parameter.CanNotBeclosedValves.indexOf(dataTemp) >= 0)
          this.parameter.CanNotBeclosedValves.splice(
            this.parameter.CanNotBeclosedValves.indexOf(dataTemp),
            1
          );
        else this.parameter.CanNotBeclosedValves.push(dataTemp);
      }
    },
    selectClick: function() {
      this.sourceId = "";
      WindowsEvent.MyDispatchEvent("DiffusionMapClick", true);
    },
    stepClick(key) {
      this.stepKey = key;
    },
    fetchWaterQualityTargetData() {
      let self = this;
      this.$axios
        .post(
          urlClass.axiosUrl2+"GetWaterQualityTargetData"
        )
        .then(R => {
          self.factoryData = R.data.WaterQualityTargetList;
        });
    },
    fetchWaterQualityPointTargetData() {
      let self = this;
      this.$axios
        .post(
          urlClass.axiosUrl2+"GetWaterQualityPointTargetData"
        )
        .then(R => {
          self.WaterQualityPointTargetData = R.data.WaterQualityPointTargetList;
        });
    },
    fetchMaxWaterQualityPoint() {
      let self = this;
      this.$axios
        .post(urlClass.axiosUrl2+"GetMaxWaterQualityPoint")
        .then(R => {
          self.MaxWaterQualityPoint = R.data;
        });
    },
    TraceabilityAnalysisClick() {
      let self = this;
      this.$axios
        .post(urlClass.axiosUrl2+"TraceabilityAnalysis", {
          WaterworksNo: this.MaxWaterQualityPoint.No
        })
        .then(R => {
          self.SourceData = R.data;
        });
      this.SourceAnalysis();
    },
    DiffusionAnalysisClick() {
      let self = this;
      /*  this.$axios.post('http://112.64.170.158:8186/Service1.svc/DiffusionAnalysis').then(R=>{
                self.DiffusionData = R.data.DiffusionAnalysisDataList
            }) */
      this.parameter.ElementId = this.sourceId;
      this.DiffusionAnalysis();
    },
    FetchEmergencyValveOffData() {
      this.emergencyTab = "gfss";
      //this.$refs.emergency.closeSearch();
      this.CloseValveAnalysis();
    },
    FetchWaterStopUserData() {
      this.emergencyTab = "mnfx";
      let self = this;
    /*   this.$axios
        .post("http://112.64.170.158:8186/Service1.svc/GetWaterStopUserData")
        .then(R => {
          self.emergencyDiffusionData = R.data.UsersAffectedList;
        }); */
        this.CloseValveCal();
    },
    FetchEmergencyData() {
      this.emergencyTab = "yjdd";
    }
  },
  created() {
    this.fetchWaterQualityTargetData();
    this.fetchWaterQualityPointTargetData();
    this.fetchMaxWaterQualityPoint();
  }
};
</script>
<style scoped>
.boomNum1 {
      display: -webkit-box;
      display: -webkit-flex;
      flex-direction: row;
 }
</style>

<style lang="less" scoped>
.clearfix1 {
  zoom: 1;
}
.fontEd {
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
}
.fontEd1 {
  font-size: 12px;
  font-weight: bold;
  color: #6e7b8b;
  padding-right: 10px;
}
 
.water-event-warp {
  .set-wrapper1 {
    border-bottom: none;
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    padding-right: 20px;
    .boomSet-title {
      border-left: 4px solid #70991f;
      height: 100%;
      padding-left: 15px;
      display: inline-block;
    }
    /* .boomWater {
      display: inline-block;
      padding-right: 40px;
      .water_input {
        margin: 0 10px;
        width: 115px;
        .el-input__inner {
          background-color: #f0f0f1;
        }
      }
    } */
   
      //flex-wrap: nowrap;

      /* .el-input {
        width: 235px;
        .el-input__inner {
          background-color: #f0f0f1;
        }
      }
      .boom-btn {
        width: 98px;
        border: 1px solid #d1d1da;
        background: linear-gradient(#fff, #ededef);
        height: 28px;
        margin-left: 10px;
      } */
  }
  .water-event-head {
    line-height: 40px;
    border: 1px solid #e4e4ec;
    border-left: 3px solid #70991f;
    padding: 0 10px;
    color: #6e7b8b;
    font-weight: bold;
  }
  .factory {
    padding: 10px;
    border-right: 1px solid #e4e4ec;
    .water-event-sub-head {
      color: #6e7b8b;
    }
    .table {
      padding: 10px;
      .cell {
        div {
          padding-left: 8px;
          &.error {
            color: white;
            border-radius: 5px;
          }
        }
      }
    }
  }
  .water-point {
    // padding: 10px;
    border-top: 1px solid #e4e4ec;
    border-bottom: 1px solid #e4e4ec;
    .point-block {
      border-right: 1px solid #d1d1da;
      padding: 10px;
      .point-sub-name {
        color: #acb3ba;
      }
      .point-name {
        font-size: 16px;
        font-weight: bold;
        color: #6e7b8b;
        line-height: 40px;
      }
    }
    .block {
      padding: 10px 0;
      text-align: center;
      .number-block-warp {
        width: 100%;
        border-right: 1px solid #e4e4ec;
      }
    }
  }
  .steps-warp {
    height: 419px;
  }
}
</style>
