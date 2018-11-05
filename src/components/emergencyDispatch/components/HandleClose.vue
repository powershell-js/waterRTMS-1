<template>
    <div class="handleClose">
        <div class="moni clearfix">
            <div style="float:left;height:40px;line-height:40px;" class="fontEd">爆管事件应急处置</div>
            <el-button type="success" class="mnfx" v-on:click="CloseValveCal" >模拟分析</el-button>
            <el-button type="success" class="mnfx" v-on:click="CloseValveAnalysis" style="margin-right:15px;">关阀搜索</el-button>
            <el-radio-group v-model="radio" class="radioGroupClass" style="margin-right:30px">
                <el-radio class="radioClass" style="margin-right:20px" v-model="radio" :label="1" >停水范围最小</el-radio>
                <el-radio class="radioClass" v-model="radio" :label="2" >停水关阀最少</el-radio>
            </el-radio-group>
        </div>
        <div class="detail-info">
            <div class="info-list">
                <div class="closeSearch" :class="{'active':cur==='gfss'}" @click="cur = 'gfss'">关阀搜索</div>
                <div class="mockAnalyze" :class="{'active':cur==='mnfx'}" @click="cur = 'mnfx'">模拟分析</div>
            </div>
            <div class="info-content">
                <closeSearchList v-show="cur === 'gfss'" :closeValveInfo="closeValveInfo" :effectUserInfo="effectUserInfo" ></closeSearchList>
                <mockAnalyzeList v-show="cur === 'mnfx'" :effectUserInfo="mockEffectUserInfo"></mockAnalyzeList>
            </div>
        </div>
    </div>
</template>
<script>
import closeSearchList from "./closeSearchList.vue";
import mockAnalyzeList from "./mockAnalyzeList.vue";
import WindowsEvent from "@/components/js/WindowsEvent";
import mainClass from "@/components/js/MainClass";
import axios from "axios";
import urlClass from "@/components/js/UrlClass";
export default {
  components: { closeSearchList, mockAnalyzeList },
  props: {
    listData: { type: Array, default: () => [] },
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
    },
    selectType: ""
  },
  data() {
    return {
      cur: "gfss",
      radio: 1,
      stopWaterInfo: [0, 0, 0],
      closeValveInfo: [],
      effectUserInfo: [],
      mockEffectUserInfo:[],
    };
  },
  mounted() {
    window.addEventListener("event_name", this.myEventListener);
  },
  methods: {
    CloseValveAnalysis: function() {
      if (this.parameter.ElementId == "") alert("请检查输入参数");
      else {
        WindowsEvent.MyDispatchEvent("PipeBurstLoadingBegin", "正在分析关阀");
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
            .then(this.CloseValveAnalysisReturn)
            .catch(function (error) {
                WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            });
        } else {
          axios
            .post(
              urlClass.axiosUrl + "PipeBurstInPipe",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.CloseValveAnalysisReturn)
            .catch(function (error) {
                WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            });
        }
      }
    },
    CloseValveCal: function() {
      if (this.parameter.CloseValveList.length == 0) alert("未关闭任何阀门");
      else {
         WindowsEvent.MyDispatchEvent("PipeBurstLoadingBegin", "正在计算");
        this.parameter.IsSave = true;
        if(this.parameter.IsSave&&this.parameter.TableName=="")
          {
            this.parameter.TableName = mainClass.GetRanLetterString(4);
          }
        axios
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

      console.log(result.ListValve);

      WindowsEvent.MyDispatchEvent("PipeBurstCloseValveDraw", object);
      WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
      //this.$emit("showRightWin", object);
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
      object.DownHeadMax = result.DownHeadMax;
      object.minP = result.MinPressure;
      object.maxP = result.MaxPressure;
      object.NodePressure = result.NodePressure;
      object.TableName = this.parameter.TableName;
      var userArray = result.EffectUser.slice(0);
      this.mockEffectUserInfo = userArray.slice(0);
      object.UserLength = userArray.length;
      WindowsEvent.MyDispatchEvent("PipeBurstDraw", object);

      // WindowsEvent.MyDispatchEvent("PipeBurstCloseValveCalDraw", object);
    }
  }
};
</script>
<style lang="less" scoped>
.radioClass {
  padding-right: 10px;
  padding-top: 5px;
  width: 55px;
}
.radioGroupClass {
    float: right;
    margin-top: 10px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
    text-align: center;
}
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.fontEd {
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
}
.handleClose {
  height: calc(~"100% - 70px");
}
.moni {
  height: 40px;
  padding: 0 20px;
  .mnfx {
    float: right;
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    height: 26px;
    margin-top: 7px;
  }
}
.detail-info {
  border-top: 1px solid #d1d1da;
  height: calc(~"100% - 40px");
  .info-list {
    box-sizing: border-box;
    padding: 20px;
    width: 122px;
    float: left;
    border-right: 1px solid #d1d1da;
    height: 100%;
    > div {
      box-sizing: border-box;
      width: 100%;
      height: 25px;
      border: 1px solid #d1d1da;
      line-height: 25px;
      text-align: center;
      font-size: 12px;
      color: #6e7b8b;
      cursor: pointer;
      &.active {
        background: #c2e086;
      }
    }
    .closeSearch {
      margin-bottom: 20px;
    }
  }
  .info-content {
    box-sizing: border-box;
    height: 100%;
    padding-left: 122px;
  }
}
</style>
