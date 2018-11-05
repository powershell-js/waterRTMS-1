<template>
    <div class="box">

        <div class="kedu"></div>

        <div class="contentbox1-1">
            <Echarts1 :dhJSLData="dhJSLData" :dhJSLTime="dhJSLTime"></Echarts1>
        </div>

        <div class="contentbox3-1">
            <Echarts3 :dhQSCData="dhQSCData" :dhQSCTime="dhQSCTime"></Echarts3>
        </div>

        <div class="contentbox6-1">
            <!-- <ListTable/> -->
        </div>



    </div>
</template>
<script>
import Bus from "@/bus.js";
import Rulertop from "../topruler/ruler";
import urlClass from '@/components/js/UrlClass'
import Echarts1 from "./dhlistecharts/echarts1";
import Echarts3 from "./dhlistecharts/echarts3";
export default {
  name: "dhList",
  components: {

    Echarts1,
    Echarts3,
    Rulertop
  },
  data() {
    return {
        dhJSLData:[],
        dhJSLTime:[],
        dhQSCData:[],
        dhQSCTime:[],
        dhTimer:null
    };
  },
  mounted(){

    let self = this;
    this.ajaxJSLData();
    this.dhTimer=setInterval(function(){
        self.ajaxJSLData();
    },900000)
  },
  methods: {
       ajaxJSLData(){
        var self = this;
        this.$axios.post(urlClass.axiosUrJH+"GetDispatchCurve",{"WaterNum":"asdasd","CodeId":"asdasd","CTPressure":"12"})
        .then(res => {

            var _this = this;
            var resechartsdata = res.data;
            var WaterInflow = res.data.WaterInFlowCurve; //进水量
            var ClearWaterLevel = res.data.ClearWaterLevelCurve; //清水池
            var data1 = [];
            var time1 = [];
            var data2 = [];
            var time2 = [];

            for (var i = 0; i < WaterInflow.length; i++) {
                data1.push(WaterInflow[i].Data);
                time1.push(WaterInflow[i].Time);
            }

            for (var i = 0; i < WaterInflow.length; i++) {
                data2.push(ClearWaterLevel[i].Data);
                time2.push(ClearWaterLevel[i].Time);
            }

            self.dhJSLData = data1;
            self.dhJSLTime = time1;
            self.dhQSCData = data2;
            self.dhQSCTime = time2;
        })
        .catch(error => {
            console.log(error);
        });
    },
  },
  beforeDestroy: function() {
    if(this.dhTimer){
      clearInterval(this.dhTimer)
    }
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  box-sizing: border-box;
}

.kedu {
  width: 100%;
  height: 28px;
  background-color: #fff;
  border: 1px #e4e4ec solid;
  border-top: none;
  border-bottom: none;
}

.contentbox1-1 {
  height: 154px;
  width: 100%;
  border: 1px #e4e4ec solid;
}

.contentbox3-1 {
  height: 154px;
  width: 100%;
  border: 1px #e4e4ec solid;
  border-top: none;
}

.contentbox6-1 {
  height: 224px;
  width: 100%;
  border: 1px #e4e4ec solid;
}
</style>


