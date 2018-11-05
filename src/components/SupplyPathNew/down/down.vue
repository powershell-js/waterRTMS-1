<template>
    <div class="downoutbox">
        <div class="downleftoutbox">
            <div class="dyqtjbbox">
                <div class="line"></div>
                <div class="dyqtjbtext">低压区统计表</div>
            </div>
            <div class="leftlistoutbox">
                <div class="leftlistinbox">
                    <div class="listbox listbox1">
                        <div class="font1">线路总长度(m)</div>
                        <div class="font2">{{labelData.AllLength}}</div>
                    </div>
                    <div class="listbox listbox2">
                        <div class="font1">总水头损失(m)</div>
                        <div class="font2">{{labelData.HeadLoss}}</div>
                    </div>
                    <div class="listbox listbox3">
                        <div class="font1">供水水源</div>
                        <div class="font2">{{labelData.SourceName}}</div>
                    </div>
                    <div class="listbox listbox4">
                        <div class="font1">起端水压标高(m)</div>
                        <div class="font2">{{labelData.StartHead}}</div>
                    </div>
                    <div class="listbox listbox5">
                        <div class="font1">末端水压标高(m)</div>
                        <div class="font2">{{labelData.EndHead}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="downrightoutbox">
<div class="echartstext">低压区断面图</div>
<div class="echartsoutbox">
    <!-- <echarts/> -->
    <my-chart  ></my-chart>
</div>
        </div>
    </div>
</template>
<script>
import myChart from "@/components/SupplyPath/MyChart";
import echarts from "@/components/SupplyPathNew/down/echarts";
export default {
  name: "down",
  props: {},
  components: {
    echarts,
    myChart
  },
  mounted(){
      window.addEventListener("event_name", this.myEventListener);
  },
  data() {
    return {
      labelData: {
        AllLength: 0,
        HeadLoss: 0,
        SourceName: "",
        StartHead: 0,
        EndHead: 0,
      }
    };
  },
  methods:{
       myEventListener(event) {
      var typeTemp = event.detail.type;
      var dataTemp = event.detail.data;
      if (typeTemp == "SupplyPathLabel") {
        this.labelData = dataTemp;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.downoutbox {
  width: 100%;
  height: 246px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.downleftoutbox {
  height: 246px;
  width: 241px;
  border-right: 1px #e4e4ec solid;
}
.dyqtjbbox {
  width: 100%;
  height: 40px;
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
.dyqtjbtext {
  height: 39px;
  line-height: 39px;
  margin-left: 16px;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #6e7b8b;
  font-weight: bold;
}
.line {
  height: 39px;
  width: 3px;
  background-color: #729a18;
}
.leftlistoutbox {
  /* width: 100%; */
  height: 226px;
  padding: 10px;
  /*  background-color: #729a18  */
}
.leftlistinbox {
  height: 186px;
  width: 100%;
  /*  background-color: aqua */
}
.listbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.listbox1 {
  margin-top: 10px;
}
.listbox2 {
  margin-top: 20px;
}
.listbox3 {
  margin-top: 20px;
}
.listbox4 {
  margin-top: 20px;
}
.listbox5 {
  margin-top: 20px;
}

.font1 {
  color: #acb3ba;
  font-family: "微软雅黑";
  font-size: 12px;
}
.font2 {
  color: #6e7b8b;
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: bold;
}
.downrightoutbox {
  height: 246px;
  width: -moz-calc(100% - 242px);
  width: -webkit-calc(100% - 242px);
  width: calc(100% - 242px);
  /* background-color: aqua */
}
.echartstext {
  height: 40px;
  width: -moz-calc(100% - 242px);
  width: -webkit-calc(100% - 242px);
  width: calc(100% - 242px);
  line-height: 40px;
  margin-left: 16px;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #6e7b8b;
  font-weight: bold;
}
.echartsoutbox {
  height: 206px;
  width: 100%;
  padding-top: 20px;
/*   background-color: aqua; */
}
</style>

