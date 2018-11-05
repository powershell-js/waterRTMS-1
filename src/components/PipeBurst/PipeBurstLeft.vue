<template>
    <div style="width:100%" >
        <div style="width:100%">
            <td class="leftTitleClass">爆管分析</td>
        </div>
         <div class="divClass">
            <td style="padding-right:10px;padding-top:5px;padding-left:14%;width:55px">爆管水量</td>
            <el-input  style="width:100px;padding-right:10px" v-model="parameter.Demand"></el-input>
            <td style="padding-top:5px">立方米/H</td>
        </div>
        <div class="divClass">
            <td style="padding-right:10px;padding-top:5px;padding-left:14%;width:55px">爆管位置</td>
            <el-input :disabled="true" style="width:100px;padding-right:10px" v-model="parameter.ElementId"></el-input>
            <el-button  v-on:click="selectClick" type="success" class="btnClass">选择</el-button>
        </div>
        <div class="divClass">
            <span style="width:40%"></span>
            <el-button  class="btnClass" type="success" v-on:click="PipeBurstAnalysis">爆管模拟</el-button>
        </div>
        
        <div class="divClass">
            <el-radio-group v-model="radio" class="radioGroupClass">
                <el-radio style="margin-right:-25px" class="radioClass" v-model="radio" :label="1" >停水范围最小</el-radio>
                <el-radio class="radioClass" v-model="radio" :label="2" >停水关阀最少</el-radio>
            </el-radio-group>
        </div>
        <div class="divClass">
            <span style="width:30%"></span>
            <el-button  class="btnClass" type="success" v-on:click="CloseValveAnalysis">关阀分析</el-button>
            <el-button  class="btnClass" type="success" v-on:click="CloseValveCal">关阀模拟</el-button>
        </div>
    </div>
</template>
<script>
import WindowsEvent from "@/components/js/WindowsEvent";
import axios from "axios";
import urlClass from "@/components/js/UrlClass";
export default {
  props: {
    parameter: {
      type: Object,
      default: {
        Demand: 0,
        ElementId: 0,
        Type: 0,
        CanNotBeclosedValves: [],
        Time: 0,
        TableName: "",
        UserId: "",
        IsSave: false,
        CloseValveList: []
      }
    }
  },
  mounted() {
    this.value = new Date().getHours();
    window.addEventListener("event_name", this.myEventListener);
  },
  data() {
    return {
      radio: 1,
      value: 0,
      selectType: "",
      loading: false
    };
  },
  methods: {
    PipeBurstAnalysis: function() {
      if (this.parameter.ElementId == "") alert("请检查输入参数");
      else {
        /* this.parameter.ElementId = this.initData.locate;
        this.parameter.Time = 0;
        this.parameter.Demand = 100; */
        this.LoadingOpen("正在工况分析");
        var self = this;
        if (this.parameter.Type == "0") {
          axios
            .post(
              urlClass.axiosUrl + "WorkingConditionSimulationNode",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.GetLegendCustomerDataReturn);
        } else {
          axios
            .post(
              urlClass.axiosUrl + "WorkingConditionSimulationPipe",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.GetLegendCustomerDataReturn);
        }
      }
      //this.$emit("change", "");
    },
    GetLegendCustomerDataReturn: function(response) {
      var result = response.data;
      var object = new Object();
      object.min = result.MinFlow;
      object.max = result.MaxFlow;
      object.allData = result.PipeFlow;

      object.minP = result.MinPressure;
      object.maxP = result.MaxPressure;
      object.NodePressure = result.NodePressure;

      WindowsEvent.MyDispatchEvent("PipeBurstDraw", object);
    },
    CloseValveAnalysis: function() {
      if (this.parameter.ElementId == "") alert("请检查输入参数");
      else {
        this.LoadingOpen("正在分析关阀");
        this.parameter.Type = this.radio - 1;
        var self = this;
        if (this.selectType == "0") {
          axios
            .post(
              urlClass.axiosUrl + "PipeBurstInNode",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.CloseValveAnalysisReturn);
        } else {
          axios
            .post(
              urlClass.axiosUrl + "PipeBurstInPipe",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.CloseValveAnalysisReturn);
        }
      }
      //this.$emit("change", "");
    },
    CloseValveCal: function() {
      if (this.parameter.CloseValveList.length == 0) alert("未关闭任何阀门");
      else {
        axios
          .post(
            urlClass.axiosUrl + "CloseModel",
            JSON.stringify(this.parameter),
            {
              headers: { "Content-Type": "application/json;" }
            }
          )
          .then(this.CloseValveCalReturn);
      }
      //this.$emit("change", "");
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

      WindowsEvent.MyDispatchEvent("PipeBurstCloseValveDraw", object);
      this.$emit("showRightWin", object);
    },
    /**
     * 关阀计算绘图
     */
    CloseValveCalReturn: function(response) {
      var result = response.data;
      var object = new Object();
      object.min = result.MinFlow;
      object.max = result.MaxFlow;
      object.allData = result.PipeFlow;

      object.minP = result.MinPressure;
      object.maxP = result.MaxPressure;
      object.NodePressure = result.NodePressure;

      WindowsEvent.MyDispatchEvent("PipeBurstDraw", object);

      // WindowsEvent.MyDispatchEvent("PipeBurstCloseValveCalDraw", object);
    },
    hideRightWin: function() {
      this.$emit("hideRightWin", "");
    },
    myEventListener: function(event) {
      console.log(event);
      var typeTemp = event.detail.type;
      if (typeTemp == "PipeBurstMapClickReturn") {
        var dataTemp = event.detail.data.ElementID;
        var dataType = event.detail.data.ElementTypeId;
        this.parameter.ElementId = dataTemp;
        this.selectType = dataType;
      } else if (typeTemp == "SetCloseValveState") {
        var dataTemp = event.detail.data.ElementID;

        if (this.parameter.CanNotBeclosedValves.indexOf() >= 0)
          this.parameter.CanNotBeclosedValves.splice(
            this.parameter.CanNotBeclosedValves.indexOf(),
            1
          );
        else this.parameter.CanNotBeclosedValves.push(dataTemp);
      }
      else if(typeTemp == "PipeBurstLoadingEnd"){
        this.LoadingClose();
      }
    },
    selectClick: function() {
      this.clearSelectInfo();
      this.clearMap();
      this.hideRightWin();
      WindowsEvent.MyDispatchEvent("PipeBurstMapClick", true);
    },
    clearMap: function(event) {
      WindowsEvent.MyDispatchEvent("PipeBurstClear", true);
    },
    clearSelectInfo: function() {
      this.parameter.Demand = 0;
      this.parameter.ElementId = 0;
      this.parameter.CanNotBeclosedValves = [];
      this.parameter.CloseValveList = [];
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
    }
  }
};
</script>
<style scoped>
.btnClass {
  font-family: center;
  font-size: 12px;
  height: 28px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 2px;
}
.divClass {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  text-align: center;
  padding-top: 20px;
}
.leftTitleClass {
  font-size: 16px;
  padding-left: 100px;
  width: 100%;
}
.radioClass {
  padding-right: 10px;
  padding-top: 5px;
  padding-left: 14%;
  width: 55px;
}
.radioGroupClass {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  text-align: center;
}
</style>



