<template>
    <div class="outbox" :style="{height:minHeight+'px'}">
        <div class="inbox" :style="{height:inminHeight+'px'}">
          <div class="leftoutbox" :style="{height:inminHeight+'px'}">
            <div class="ksfxbox">
               <div class="line"></div>
                <div class="linerighttext">污染物扩散条件设置</div>
            </div>
            <div class="inputplayoutbox">
                <div class="inputplayoutleftbox">
                  <div class="titleinputbox1">
                    <div class="titlebox">最大历时</div>
                    <div class="inputbox"><el-Input type="text" v-model="passTime" placeholder="输入最大历时"></el-Input></div>
                    <div class="dwbox">小时</div>
                  </div>
                  <div class="titleinputbox2">
                    <div class="titlebox2">发现污染点</div>
                    <div class="inputbox"> 
                      <el-input :disabled="true" placeholder="选择污染点" v-model="sourceId"></el-input>
                      </div>
                      <el-button type="success" size="min" v-on:click="selectClick">选择</el-button>
                  <!-- <div class="point">...</div> -->
                  </div>
                <!--    <div class="titleinputbox3">
                    <div class="titlebox3">固定污染点</div>
                    <div class="inputbox">
                       <select name="" id="selec">
                        <option value="图上选择">图上选择</option>
                        <option value="最低压力">最低压力</option>
                    </select>
                    </div>
                    <div class="point">...</div>
                  </div> -->
                   <div class="titleinputbox4">
                    <div class="titlebox4">污染发生时间</div>
                    <div class="inputbox">
                       <el-select v-model="value" v-on:change="chooseSelection">
                      <el-option
                        v-for="item in selections"
                        :key="item.label"
                        :value="item.index"
                        :label="item.label">
                      </el-option>
                  </el-select>
                    </div>
                    <!-- <div class="point">...</div> -->
                  </div>
                </div>
              <div class="inputplayoutrightbox">
                <div class="mntitle">模拟播放</div>
                
                <div class="playoutbox">
                  <div class="sliderPlayerClass" v-show="isDiffusion">
                  <img src="../../../static/assets/sliderPlayer/play.png" alt="" style="cursor:pointer;padding-right:20px" title="播放" v-show="isPlay" v-on:click="Play"><!--播放-->
                  <img src="../../../static/assets/sliderPlayer/pause.png" alt="" style="cursor:pointer;padding-right:20px" v-show="!isPlay" title="停止" v-on:click="Pause"><!--停止-->
                  <img src="../../../static/assets/sliderPlayer/back.png" alt="" style="cursor:pointer;padding-right:20px" title="后退" v-on:click="Back"><!--后退-->
                  <img src="../../../static/assets/sliderPlayer/next.png" alt="" style="cursor:pointer;padding-right:20px" title="前进" v-on:click="Next"><!--前进-->
                  <img src="../../../static/assets/sliderPlayer/left.png" alt="" style="cursor:pointer;padding-right:20px" title="返回当前时间" v-on:click="Left"><!--返回当前时间-->
                  <span>时间</span>
                  <span>{{sliderValue}}</span>
                </div>
                  <div class="sliderClass" v-show="isDiffusion">
                    <el-slider v-model="sliderValue" :min='0' :max="max"
                                :step="step" show-stops v-on:change="sliderChange">
                    </el-slider>
                </div>
                <div class="sliderLabelClass" v-show="isDiffusion">
                  <td>{{sliderLabelArray[0]}}</td>
                  <span :style="{width:spanWidth+'px'}"></span>
                  <td>{{sliderLabelArray[1]}}</td>
                  <span :style="{width:spanWidth+'px'}"></span>
                  <td>{{sliderLabelArray[2]}}</td>
                  <span :style="{width:spanWidth+'px'}"></span>
                  <td>{{sliderLabelArray[3]}}</td>
                  <span :style="{width:spanWidth+'px'}"></span>
                  <td>{{sliderLabelArray[4]}}</td>
                  <span :style="{width:spanWidth+'px'}"></span>
                  <td>{{sliderLabelArray[5]}}</td>
                </div>
                </div>
              </div>
            </div>
            <div class="taboutoutbox">
                  <!-- <ul class="listbox tabs">
                      <li class="li-tab" v-for="(item,index) in tabsParam" :key="item.tabsParam"
                    @click="toggleTabs(index)" :class="{active1:index===nowIndex,active2:index!==nowIndex}">
                    <div :class="{active:index===nowIndex}" class="titlefont">
                      {{item}}
                      </div>
                    </li>
                  </ul> -->
                  <div class="navList">
                      <span class="bar spanStyle" :class="{'active': nowIndex===0}" @click="toggleTabs1">01&nbsp;污染溯源分析<div class="arrow"></div></span>
                      <span class="bar spanStyle" :class="{'active': nowIndex===1}"  @click="toggleTabs2">02&nbsp;污染扩散分析<div class="arrow"></div></span>
                      <span class="spanStyle" :class="{'active': nowIndex===2}"  @click="toggleTabs3">03&nbsp;关阀处置</span>
                  </div>
                  <div class="listoutbox" :style="{height:listoutboxHeight+'px'}">
                    <!-- <div class="kedu"></div> -->
                  <wrsy-list v-show="nowIndex===0"></wrsy-list>
                  <wrks-list v-show="nowIndex===1"></wrks-list>
                  <gfcz-list v-show="nowIndex===2"></gfcz-list>
                  
                </div>
            </div>
          </div>


          <!-- 地图部分 -->
          <div class="rightoutbox" :style="{height:inminHeight+'px'}">
             <mytdt-map style="width:100%;height:100%" key="mapTemp"></mytdt-map>
             <el-button class="legendStyle" style="right:30px" v-show="minLegend" v-on:click="legendMin">图例</el-button>
             <legend-main  class="legendStyle" :isShow="!minLegend" :legendData="this.myLegendData"></legend-main>
          </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import LegendMain from "@/components/LegendMain";
import MytdtMap from "@/components/mytdt/mapEmergencyDispatch";
import WrsyList from "@/components/DiffusionNew/tablist/wrsylist";
import WrksList from "@/components/DiffusionNew/tablist/wrkslist";
import GfczList from "@/components/DiffusionNew/tablist/gfczlist";
import WindowsEvent from "@/components/js/WindowsEvent";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Index",
  components: {
    WrsyList,
    WrksList,
    GfczList,
    MytdtMap,
    LegendMain
  },
  data() {
    return {
      minLegend: false,
      minHeight: 0,
      inminHeight: 0,
      listoutboxHeight: 0,
      tabsParam: ["污染溯源分析", "污染扩散分析", "关阀处置"],
      nowIndex: 0,
      isShow: false,
      value: 0,
      selections: [],
      legendIsShow: true,
      myLegendData: {
        title: "基础管网",
        legendName: "",
        listData: [],
        type: "baseMap",
        opType: true
      },
      sourceId: "",
      passTime: "",
      isDiffusion: true,
      sliderLabelArray: [0, 1, 2, 3, 4, 5],
      step: 1,
      sliderValue: 0,
      max: 5,
      isPlay: true,
      spanWidth: 0,
      diffusionData: {},
      interval: "",
      parameter: {
        Demand: 0,
        ElementId: 0,
        Type: 0,
        CanNotBeclosedValves: [],
        Time: 0,
        TableName: "",
        UserId: "",
        IsSave: false,
        CloseValveList: [],
        loading: ""
      }
    };
  },
  methods: {
    legendMin() {
      this.minLegend = !this.minLegend;
    },
    CloseValveAnalysis: function() {
      if (this.sourceId == "" || this.passTime == "") alert("请检查输入参数");
      else {
        WindowsEvent.MyDispatchEvent("PipeBurstLoadingBegin", "正在分析关阀");
        //this.parameter.Type = this.radio - 1;
        console.log('关阀参数')
        console.log(this.parameter.CanNotBeclosedValves)
        var self = this;
        console.log(this.parameter);

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
      console.log("爆管结果");
      WindowsEvent.MyDispatchEvent("PipeBurstCloseValveDraw", object);
      WindowsEvent.MyDispatchEvent("CloseValveAnalysisReturn", object);
      //this.$emit("showRightWin", object);
    },
    DiffusionAnalysis: function() {
      if (this.sourceId == "" || this.passTime == "") alert("请检查输入参数");
      else {
        this.isDiffusion = true;
        this.sliderValue = Number(this.passTime);
        this.step = this.passTime / 5;
        for (var i = 0; i <= 5; i++) {
          this.sliderLabelArray[i] = (i * this.step).toFixed(2);
        }
        this.max = Number(this.passTime);
        var self = this;
        axios
          .get(
            urlClass.axiosUrl +
              "NodeTrace" +
              "/" +
              this.sourceId +
              "/" +
              this.value +
              "/" +
              this.passTime +
              "/" +
              "pipe"
          )
          .then(function(response) {
            var result = response.data;
            console.log(result);
            var object = new Object();
            object.min = 0;
            object.max = self.passTime;
            object.allData = result.ListPipe;
            object.data = result;
            self.diffusionData = Object.assign({}, result);
            var CanNotBeclosedValves = self.diffusionData.ListValve;
            var arrayTemp = new Array();
            for (var i = 0; i < CanNotBeclosedValves.length; i++) {
              arrayTemp.push(CanNotBeclosedValves[i].ElementId);
            }
            self.parameter.CanNotBeclosedValves = arrayTemp;
            WindowsEvent.MyDispatchEvent("DiffusionReturn", result.ListUser);
            WindowsEvent.MyDispatchEvent("DiffusionDraw", object);
            WindowsEvent.MyDispatchEvent(
              "DiffusionSourcePosition",
              self.sourceId
            );
          });
      }
    },
    SourceAnalysis: function() {
      if (this.sourceId == "" || this.passTime == "") alert("请检查输入参数");
      else {
        this.isDiffusion = true;
        this.sliderValue = Number(this.passTime);
        this.step = this.passTime / 5;
        for (var i = 0; i <= 5; i++) {
          this.sliderLabelArray[i] = (i * this.step).toFixed(2);
        }
        this.max = Number(this.passTime);
        var self = this;
        axios
          .get(
            urlClass.axiosUrl +
              "NodeTraceReverse" +
              "/" +
              this.sourceId +
              "/" +
              this.value +
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
            for (var i = 0; i < CanNotBeclosedValves.length; i++) {
              arrayTemp.push(CanNotBeclosedValves[i].ElementId);
            }
            self.parameter.CanNotBeclosedValves = arrayTemp;
            WindowsEvent.MyDispatchEvent(
              "DiffusionSourceReturn",
              result.ListUser
            );
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
      } else if (typeTemp == "Diffusion") {
        this.DiffusionAnalysis();
      } else if (typeTemp == "DiffusionSource") {
        this.SourceAnalysis();
      } else if (typeTemp == "LegendDisplay") {
        this.myLegendData = dataTemp;
      } else if (typeTemp == "DiffusionClear") {
        this.myLegendData = new Object({
          title: "基础管网",
          legendName: "",
          listData: [],
          type: "baseMap",
          opType: true
        });
      } else if (typeTemp == "CloseValveAnalysis") {
        this.parameter.Type = dataTemp - 1;
        console.log("关阀搜索类型");
        console.log(this.parameter.Type);
        this.parameter.Time = this.value;
        this.parameter.ElementId = this.sourceId;
        this.CloseValveAnalysis();
      } else if (typeTemp == "PipeBurstLoadingBegin") {
        this.LoadingOpen(event.detail.data);
      } else if (typeTemp == "PipeBurstLoadingEnd") {
        this.LoadingClose();
      } else if (typeTemp == "legendMin") {
        this.legendMin();
      } else if (typeTemp == "SetCloseValveState") {
        var dataTemp = event.detail.data.ElementID;

        if (this.parameter.CanNotBeclosedValves.indexOf(dataTemp) >= 0)
          this.parameter.CanNotBeclosedValves.splice(
            this.parameter.CanNotBeclosedValves.indexOf(dataTemp),
            1
          );
        else this.parameter.CanNotBeclosedValves.push(dataTemp);
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
    PlayAndPauseChange() {
      this.isPlay = !this.isPlay;
    },
    Play() {
      this.PlayAndPauseChange();
      this.sliderValue = 0;
      this.interval = window.setInterval(this.Playing, 1000); // this.interval = window.
    },
    Playing() {
      if (this.sliderValue + 1 <= this.passTime) {
        this.sliderValue = this.sliderValue + 1;
        this.labelValue = this.sliderValue;
        WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying", this.sliderValue);
      } else {
        this.isPlay = true;
        window.clearInterval(this.interval);
      }
    },
    Pause() {
      this.PlayAndPauseChange();
      window.clearInterval(this.interval);
    },
    Back() {
      this.isPlay = true;
      window.clearInterval(this.interval);
      if (this.sliderValue - 1 >= 0) {
        this.sliderValue = this.sliderValue - 1;
        this.labelValue = this.sliderValue;
        WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying", this.sliderValue);
      }
    },
    Next() {
      this.isPlay = true;
      window.clearInterval(this.interval);
      if (this.sliderValue + 1 <= this.passTime) {
        this.sliderValue = this.sliderValue + 1;
        this.labelValue = this.sliderValue;
        WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying", this.sliderValue);
      }
    },
    Left() {
      this.sliderValue = Number(this.passTime);
      window.clearInterval(this.interval);
      WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying", this.sliderValue);
    },
    sliderChange() {
      WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying", this.sliderValue);
    },
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
    },
    toggleTabs1(){
      this.nowIndex = 0;
    },
    toggleTabs2(){
       this.nowIndex = 1;
    },
    toggleTabs3(){
       this.nowIndex = 2;
    },
    chooseSelection() {
      WindowsEvent.MyDispatchEvent("DiffusionClear", true);
    },
    selectClick() {
      this.sourceId = "";
      WindowsEvent.MyDispatchEvent("DiffusionClear", true);
      WindowsEvent.MyDispatchEvent("DiffusionMapClick", true);
    }
  },
  mounted() {
    window.addEventListener("event_name", this.myEventListener);
    for (var i = 0; i < 24; i++) {
      this.selections.push({ index: i, value: i, label: i + "点" });
    }
    this.value = new Date().getHours();
    this.minHeight = document.documentElement.clientHeight;
    this.inminHeight = document.documentElement.clientHeight - 80;
    this.listoutboxHeight = document.documentElement.clientHeight - 344;
    this.spanWidth = document.documentElement.clientWidth * 0.2;
    this.spanWidth = this.spanWidth / 5 + 5;
    var that = this;
    window.onresize = function() {
      that.minHeight = document.documentElement.clientHeight - 40;
      that.inminHeight = document.documentElement.clientHeight - 80;
      that.listoutboxHeight = document.documentElement.clientHeight - 344;
      that.spanWidth = document.documentElement.clientWidth * 0.2;
      that.spanWidth = this.spanWidth / 5 + 5;
    };
  }
};
</script>
<style lang="less" scoped>
.navList {
    border-top: 1px solid #d1d1da;
    border-bottom: 1px solid #d1d1da;
    height: 30px;
    display: flex;
    justify-content: center;
    span {
      display: block;
      height: 28px;
      line-height: 28px;
      text-align: center;
      width: 33.333%;
      background-color: #fff;
      cursor: pointer;
      &.active {
        background-color: #c2e086;
      }
    }
}
.bar {
      position: relative;
      .arrow {
        position: absolute;
        width: 16px;
        height: 28px;
        background: url("../../../static/assets/nav_off.png") right center no-repeat;
        background-size: 16px 28px;
        right: -14px;
        top: 0;
        z-index: 2;
      }

      &.active {
        .arrow {
          background: url("../../../static/assets/nav_on.png") right center no-repeat;
          background-size: 16px 28px;
        }
      }
    }
</style>

<style scoped>
.spanStyle {
  display: inline-block;
  color: #737b80;
  font-size: 12px;
}
.sliderLabelClass {
  margin-left: 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.sliderClass {
  margin-left: 20px;
  margin-right: 20px;
}
.sliderPlayerClass {
  text-align: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}
.outbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;

  /*   background-color: aqua; */
}
.inbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: -moz-calc(100% - 40px);
  width: -webkit-calc(100% - 40px);
  width: calc(100% - 40px);
  border: 1px #e4e4ec solid;
  /*   background-color: rgb(22, 235, 93); */
}
.leftoutbox {
  width: 45vw;
  min-width: 870px;
  /*   background-color: aquamarine; */
}
.rightoutbox {
  width: 55vw;
  background-color: rgb(217, 236, 230);
}
.ksfxbox {
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
.inputplayoutbox {
  height: 194px;
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
.inputplayoutleftbox {
  height: 177px;
  width: 380px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  border-right: 1px #e4e4ec solid;
  padding: 10px 0;
}
.titleinputbox1 {
  width: 380px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
}
.titlebox {
  color: #788493;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-right: 45px;
}
.dwbox {
  color: #788493;
  font-family: "微软雅黑";
  font-size: 12px;
}
.inputbox {
  margin-right: 12px;
}
input {
  width: 172px;
  height: 26px;
  background-color: #f0f0f1;
}
input::-webkit-input-placeholder {
  color: #6e7b8b;
  font-size: 12px;
  padding-left: 10px;
  /*  text-align:center; */
}
.titleinputbox2 {
  width: 380px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
}
.titlebox2 {
  color: #788493;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-right: 34px;
}
.point {
  height: 24px;
  width: 28px;
  background-color: #f0f0f1;
  border: 1px #e4e4ec solid;
  text-align: center;
  /* line-height: 24px; */
  font-size: 12px;
  font-weight: bolder;
}
.titleinputbox3 {
  width: 380px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
}
.titlebox3 {
  color: #788493;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-right: 34px;
}
.select {
  margin-right: 10px;
  border: 1px #e4e4ec solid;
}
#selec {
  width: 172px;
  height: 24px;
  background-color: #f0f0f1;
  border-radius: 1px;
}
option {
  width: 172px;
  height: 26px;
  border-radius: 1px;
  color: #6e7b8b;
}
.titleinputbox4 {
  width: 380px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
}
.titlebox4 {
  color: #788493;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-right: 20px;
}

.inputplayoutrightbox {
  height: 194px;
  width: -moz-calc(100% - 380px);
  width: -webkit-calc(100% - 380px);
  width: calc(100% - 380px);
}
.mntitle {
  height: 40px;
  width: -moz-calc(100% - 380px);
  width: -webkit-calc(100% - 380px);
  width: calc(100% - 380px);
  color: #788493;
  font-family: "微软雅黑";
  font-size: 14px;
  margin-left: 20px;
  line-height: 40px;
  font-weight: bold;
}
.playoutbox {
  /* height: 154px; */
  width: 100%;
  padding-top: 30px;
}
.taboutoutbox {
  height: 30px;
  width: 100%;
  border-bottom: 1px #e4e4ec solid;
}
.listbox {
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  color: #788493;
  background-color: #f5f5f6;
  border-bottom: 1px #e4e4ec solid;
}
.listbox > li {
  width: 282px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  cursor: pointer;
  /*  background-image: url("~@/assets/img/nav_off.png") */
  background-repeat: no-repeat;
  background-position: 268px 1px;
}
.titlefont {
  color: #6e7b8b;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  cursor: pointer;
} 
.active {
  width: 270px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  /* color: #fff; */
  background-color: #c2e086;
  background-image: url("~@/../static/assets/img/nav_off.png");
  background-repeat: no-repeat;
  background-position: 0px 0px;
}
.active1 {
  width: 282px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  color: #fff;
  background-image: url("~@/../static/assets/img/nav_on.png");
  background-repeat: no-repeat;
  background-position: 268px 1px;

  /*   border-bottom: 2px #548ff6 solid; */
}
.active2 {
  width: 282px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  color: #fff;
  background-image: url("~@/../static/assets/img/nav_off.png");
  background-repeat: no-repeat;
  background-position: 268px 1px;

  /*   border-bottom: 2px #548ff6 solid; */
}
.listoutbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 100%;
  /* border: 1px #e4e4ec solid; */
}
.legendStyle {
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 99;
}
</style>

