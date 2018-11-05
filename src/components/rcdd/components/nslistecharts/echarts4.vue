<template>
    <div>
          <div id="mainns4"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import axios from "axios";
import urlClass from '@/components/js/UrlClass';
export default {
  name: "Echarts4",
  data() {
    return {
      mindata: "",
       bjsechartsdatadh1: [],
      bjsechartstimedh1: [],
      bjstimrdata: [],
      totalmin:"",
      history: "",
      newd: ""
    };
  },
  mounted() {
    let that = this;
    that.request();
   /*  setInterval(function() {
      var mindata = new Date().getHours() * 60 + new Date().getMinutes();
      if (mindata % 15 == 0) {
        that.request();
        console.log(mindata);
      }
    }, 60000); */
        setInterval(function() {
      that.request();
    },60000);
  },

  methods: {
    // 请求
    request() {
      let _this = this;
      var WaterNum = "南山水厂";
      var object = { WaterNum };
      axios
        .post(
          urlClass.axiosUrlRC + "GetWaterUnitConsumption",
          JSON.stringify(object),
           {headers: {'Content-Type':'application/json;'}}
        )
        .then(res => {
          var _this = this;
               var resechartsdatadh = res.data;
        Bus.$emit("echats4msg", resechartsdatadh);
        var WaterUnitConsumption = res.data.WaterUnitConsumption;
        var datadh1 = [];
        var timedh1 = [];
        for (var i = 0; i < WaterUnitConsumption.length; i++) {
          datadh1.push(WaterUnitConsumption[i].Data);
          timedh1.push(WaterUnitConsumption[i].Time);
        }
          var totalmin=new Date().getHours() * 60 + new Date().getMinutes();
          var history = parseInt(totalmin / 15);
          var newd = 96 - history;
             _this.bjsechartsdatadh1 = datadh1;
        _this.bjsechartstimedh1 = timedh1;
          _this.history = history;
          _this.newd = newd;
          _this.drawLine();
        })
        .catch(error => {});
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainns4"));
      // 绘制图表
      myChart.setOption({
        grid: {
          height: 84,
          width: 760,
          bottom: 10,
          top: 35,
          right: 1,
          left: 51
        },
        color: ["#859dc0", "#bcc2cb"],
        legend: {
          right: 10,
          width: 500,
          itemWidth: 40,
          textStyle: {
            color: "#6e7b8b"
          },
          data: ["供水单耗"],
          icon: "rect", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none

          itemWidth: 14, // 设置宽度

          itemHeight: 14, // 设置高度

          itemGap: 40 // 设置间距
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            data: this.bjsechartstimedh1,
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          }
        ],
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: "#dfdfdf",
              width: 1,
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: this.history-1,
              color: "#bcc2cb"
            },
            {
              gt: this.history-1,
              lte: this.history,
              color: "red"
            },
            {
              gt: this.history,
              lte: 96,
              color: "#859dc0"
            }
          ]
        },
        series: [
          {
            name: "供水单耗",
            type: "bar",
            barWidth: 6,
            data: this.bjsechartsdatadh1,
            zlevel: 99,
            itemStyle: {
              emphasis: {
                color: "red"
              }
            }
          },
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#mainns4 {
  width: 820px;
  height: 134px;
  margin-left: 20px;
  /*   border: 1px red solid; */
}
</style>


