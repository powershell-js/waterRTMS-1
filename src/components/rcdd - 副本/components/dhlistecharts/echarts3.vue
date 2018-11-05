<template>
    <div>
          <div id="mainh3"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import axios from "axios";
import urlClass from '@/components/js/UrlClass';
export default {
  name: "Echarts3",
   data() {
    return {
      mindata: "",
      bjsechartsdataq1: [],
      bjsechartsdataq2: [],
      bjsechartstimeq1: [],
      bjstimrdata: [],
      totalmin: "",
      history: "",
      newd: ""
    };
  },
  mounted() {
    let that = this;
    that.request();
    setInterval(function() {
      var mindata = new Date().getHours() * 60 + new Date().getMinutes();
      if (mindata % 15 == 0) {
        that.request();
        console.log(mindata);
      }
    }, 60000);
    /*     setInterval(function() {
      that.request();
    },6000); */
  },

  methods: {
    request() {
      let _this = this;
      var WaterNum = "21312323";
      var object = { WaterNum };
      axios
        .post(
          urlClass.axiosUrlRC + "GetWaterPoolLevel",
          JSON.stringify(object),
           {headers: {'Content-Type':'application/json;'}}
        )
        .then(res => {
          var _this = this;
          var resechartsdataq = res.data;
           Bus.$emit('echats3msg',resechartsdataq);
          var WaterPoolLevel = res.data.WaterPoolLevel;
          var dataq1 = [];
          var dataq2 = [];
          var timeq1 = [];
          for (var i = 0; i < WaterPoolLevel.length; i++) {
            timeq1.push(WaterPoolLevel[i].Time);
          }
          var totalmin = new Date().getHours() * 60 + new Date().getMinutes();
          var history = parseInt(totalmin / 15);
          var newd = 96 - history;
          var kdata1 = [];
          var kdata2 = [];
          for (var i = 0; i <= history; i++) {
            kdata1.push(null);
          }
          for (var i = 0; i < newd; i++) {
            kdata2.push(null);
          }
          for (var i = 0; i <= history+1; i++) {
            dataq1.push(WaterPoolLevel[i].Data);
          }
          for (var i =history+1; i < 96; i++) {
            dataq2.push(WaterPoolLevel[i].Data);
          }
          var cdataq1 = dataq1.concat(kdata2);
          var cdataq2 = kdata1.concat(dataq2);
          _this.bjsechartsdataq1 = cdataq1;
          _this.bjsechartsdataq2 = cdataq2;
          _this.bjsechartstimeq1 = timeq1;
          _this.drawLine();
        })
        .catch(error => {});
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainh3"));
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
        color: "#99b9ea",
        legend: {
          right: 10,
          width: 500,
          itemWidth: 40,
          textStyle: {
            color: "#6e7b8b"
          },
          data: ["清水池水位", "清水池水位"],
          icon: "rect", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none

          itemWidth: 14, // 设置宽度

          itemHeight: 14, // 设置高度

          itemGap: 40 // 设置间距
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data:this.bjsechartstimeq1,
         
          axisLabel: {
            inside: false,
            textStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            inside: true,
            show: false,
            length: 68,
            lineStyle: {
              color: "#84a5d6"
            }
          },
          axisLine: {
            show: false
          },
          z: 10
        },
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
        series: [
          {
            /* name: '清水池水位', */
            type: "line",
            color: "#c9ced5", //折线图颜色,搭配markArea为面积图
            lineStyle: {
              //折线的颜色
              color: "#c9ced5"
            },
            smooth: false, //是否平滑处理值0-1,true相当于0.5
  
            data:this.bjsechartsdataq1,
            itemStyle: {
              normal: {
                color: "#c9ced5"
              }
            },
            areaStyle: {
              normal: {
                color: "#c9ced5"
              }
            }
          },
          {
            name: "清水池水位",
            type: "line",
            color: "#99b9ea", //折线图颜色,搭配markArea为面积图
            lineStyle: {
              //折线的颜色
              color: "#99b9ea"
            },
            smooth: false, //是否平滑处理值0-1,true相当于0.5
            data:this.bjsechartsdataq2,
           
            itemStyle: {
              normal: {
                color: "#99b9ea"
              }
            },
            areaStyle: {
              normal: {
                color: "#99b9ea"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style  scoped>
#mainh3 {
  width: 820px;
  height: 134px;
  margin-left:20px;
  /*   border: 1px red solid; */
}
</style>


