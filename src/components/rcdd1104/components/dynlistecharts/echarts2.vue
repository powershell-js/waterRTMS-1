<template>
    <div>
          <div id="mainn2"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import axios from "axios";
import urlClass from '@/components/js/UrlClass';
export default {
  name: "Echarts2",
   data() {
    return {
      mindata: "",
       bjsechartsdatap1: [],
      bjsechartstimep1: [],
      bjstimrdata: [],
      totalmin:"",
      history: "",
      newd: ""
    };
  },
  mounted() {
    let that = this;
    that.request();
    /* setInterval(function() {
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
      var WaterNum = "大涌南水厂";
      var object = { WaterNum };
      axios
        .post(
          urlClass.axiosUrlRC + "GetOutPressure",
          JSON.stringify(object),
           {headers: {'Content-Type':'application/json;'}}
        )
        .then(res => {
          var _this = this;
               var resechartsdatap = res.data;
        Bus.$emit("echats2msg", resechartsdatap);
        var OutPressure = res.data.OutPressure;
        var datap1 = [];
        var timep1 = [];
        for (var i = 0; i < OutPressure.length; i++) {
          datap1.push(OutPressure[i].Data);
          timep1.push(OutPressure[i].Time);
        }
          var totalmin=new Date().getHours() * 60 + new Date().getMinutes();
          var history = parseInt(totalmin / 15);
          var newd = 96 - history;
             _this.bjsechartsdatap1 = datap1;
        _this.bjsechartstimep1 = timep1;
          _this.history = history;
          _this.newd = newd;
          _this.drawLine();
        })
        .catch(error => {});
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainn2"));
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
          data: ["出厂压力"],
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
            data: this.bjsechartstimep1,
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
              lte: this.history,
              color: "#bcc2cb"
            },
            {
              gt: this.history,
              lte: this.history + 1,
              color: "red"
            },
            {
              gt: this.history + 1,
              lte: 96,
              color: "#859dc0"
            }
          ]
        },
        series: [
          {
            name: "出厂压力",
            type: "bar",
            barWidth: 6,
            data: this.bjsechartsdatap1,
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
<style  scoped>
#mainn2 {
  width: 820px;
  height: 134px;
  margin-left: 20px;

  /*   border: 1px red solid; */
}
</style>


