<template>
    <div class="booster">
        <div class="set-wrapper clearfix">
            <div style="float:left;" class="boomSet-title fontEd">爆管参数设置</div>
            <div style="float:right">
                <div class="boomWater">
                    <span class="spanStyle">爆管泄水量</span><el-input class="water_input" v-model="parameter.Demand" v-on:change='inputChange'></el-input><span>m³/h</span>
                </div>
                <div class="boomNum">
                    <el-input placeholder="输入爆管点编号" class="element_input" v-model="parameter.ElementId" :disabled="true"></el-input>
                    <el-button class="boom-btn" v-on:click="selectClick">选择爆管点</el-button>
                </div>
            </div>
        </div>

        <div class="navList">
            <span class="bar spanStyle" :class="{'active': cur==='bgmn'}" @click="GkmnClick">01&nbsp;爆管工况模拟<div class="arrow"></div></span>
            <span class="bar spanStyle" :class="{'active': cur==='gfcz'}"  @click="GfczClick">02&nbsp;关阀处置<div class="arrow"></div></span>
            <span class="spanStyle" :class="{'active': cur==='yjdd'}"  @click="YjddClick">03&nbsp;应急调度</span>
        </div>
        <BoosterSimulation v-show="cur==='bgmn'" :listData="listItems" :parameter="parameter" ></BoosterSimulation>
        <HandleClose v-show="cur==='gfcz'" :parameter="parameter" :selectType="selectType"></HandleClose>
        <UrgentDispatcher v-show="cur==='yjdd'" ></UrgentDispatcher>
    </div>
</template>
<script>
import WindowsEvent from "@/components/js/WindowsEvent";
import PanelTitle from "./panelTitle.vue";
import BoosterSimulation from "./BoosterSimulation.vue";
import HandleClose from "./HandleClose.vue";
import UrgentDispatcher from "./UrgentDispatcher.vue";
export default {
  name: "Diffusion",
  components: {
    PanelTitle,
    BoosterSimulation,
    HandleClose,
    UrgentDispatcher
  },
  props: {},
  data() {
    return {
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
      radio: 1,
      value: 0,
      selectType: "",
      loading: false,
      cur: "bgmn",
      myLegendData: {
        title: "基础管网",
        legendName: "",
        listData: [],
        type: "baseMap"
      },
      legendIsShow: true,
      rightSpace: 50,
      steps: [
        { name: "停水处置", onClick: this.stepClick, key: "tscz" },
        { name: "模拟计算", onClick: this.stepClick, key: "mnjs" },
        { name: "优化调度", onClick: this.stepClick, key: "yhdd" }
      ],
      curStep: "tscz",
      listItems: [
        {
          name: "爆管泄水量",
          unit:'(m3/h)',
          value: '--',
          factory: null
        },
        {
          name: "管网最大压降",
          unit:'(MPa)',
          value: '--',
          factory: null
        },
        {
          name: "水厂最大压降",
          unit:'(MPa)',
          value: '--',
          factory: "大涌北水厂"
        },
        {
          name: "水厂最大增加水量",
          unit:'(m3/h)',
          value: '--',
          factory: "大涌北水厂"
        },
        {
          name: "受影响用户数量",
          unit:'(户)',
          value: '--',
          factory: null
        },
        {
          name: "受影响范围",
          unit:'(km2)',
          value: '--',
          factory: null
        }
      ]
    };
  },
  mounted() {
    this.value = new Date().getHours();
    window.addEventListener("event_name", this.myEventListener);
  },
  methods: {
     inputChange:function(){
      this.listItems[0].value = this.parameter.Demand;
    },    
    myEventListener: function(event) {
      var typeTemp = event.detail.type;
      if (typeTemp == "PipeBurstMapClickReturn") {
        var dataTemp = event.detail.data.ElementID;
        var dataType = event.detail.data.ElementTypeId;
        this.parameter.ElementId = dataTemp;
        this.selectType = dataType;
      } else if (typeTemp == "SetCloseValveState") {
        var dataTemp = event.detail.data.ElementID;

        if (this.parameter.CanNotBeclosedValves.indexOf(dataTemp) >= 0)
          this.parameter.CanNotBeclosedValves.splice(
            this.parameter.CanNotBeclosedValves.indexOf(dataTemp),
            1
          );
        else this.parameter.CanNotBeclosedValves.push(dataTemp);
      }else if(typeTemp == "PipeBurstLoadingBegin"){
          this.LoadingOpen(event.detail.data);
      }
      else if (typeTemp == "PipeBurstLoadingEnd") {
        this.LoadingClose();
      }
      else if(typeTemp == "PipeBurstDraw"){
         var DownHeadMax = event.detail.data.DownHeadMax;
        DownHeadMax = DownHeadMax/100;
        this.listItems[1].value = DownHeadMax;
        this.listItems[2].value = DownHeadMax-0.01;
        this.listItems[3].value = 300.23;
        this.listItems[4].value = event.detail.data.UserLength;
        this.listItems[5].value = 102;
      }
    },
    selectClick: function() {
      this.clearSelectInfo();
      this.clearMap();
      WindowsEvent.MyDispatchEvent("PipeBurstMapClick", true);
    },
    clearMap: function(event) {
      WindowsEvent.MyDispatchEvent("PipeBurstClear", true);
    },
    clearSelectInfo: function() {
      //this.parameter.Demand = 0;
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
    },
    GkmnClick(){
        this.cur = "bgmn";
        WindowsEvent.MyDispatchEvent("PipeBurst_BGMN", "");
    },
    GfczClick(){
        this.cur = "gfcz";
        WindowsEvent.MyDispatchEvent("PipeBurst_GFCZ", "");
    },
    YjddClick(){
        this.cur = "yjdd";
        WindowsEvent.MyDispatchEvent("PipeBurst_YJDD", "");
    }
  }
};
</script>
<style scoped>
.spanStyle {
  display: inline-block;
  color: #737b80;
  font-size: 12px;
}
.legendStyle {
  position: absolute;
  top: 50px;
  z-index: 99;
}
</style>
<style lang="less" scoped>
.booster * {
  box-sizing: border-box;
}
.fontEd {
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
}
.spanStyle {
  display: inline-block;
  color: #737b80;
  font-size: 12px;
}
.booster {
  border: 1px solid #d1d1da;
  height: 100%;
  box-sizing: border-box;
  .set-wrapper {
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
    .boomWater {
      display: inline-block;
      padding-right: 40px;
      .water_input {
        margin: 0 10px;
        width: 50px;
        .el-input__inner {
          background-color: #f0f0f1;
        }
      }
    }
    .boomNum {
      display: inline-block;
      .el-input {
        width: 80px;
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
      }
    }
  }
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
}
</style>
<style lang="less">
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}

.boomNum .el-input__inner,
.water_input .el-input__inner {
  background-color: #f0f0f1;
  border: none;
  border-radius: 0;
}

.booster {
  .navList {
    .bar {
      position: relative;
      .arrow {
        position: absolute;
        width: 16px;
        height: 28px;
        background: url("../../../../static/assets/nav_off.png") right center no-repeat;
        background-size: 16px 28px;
        right: -14px;
        top: 0;
        z-index: 2;
      }

      &.active {
        .arrow {
          background: url("../../../../static/assets/nav_on.png") right center no-repeat;
          background-size: 16px 28px;
        }
      }
    }
  }
}
</style>

