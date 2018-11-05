<template>
    <div>
          <div id="mainl4"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Echarts4",
  data() {
    return {
      bjsechartsdatadh1: [],
      bjsechartstimedh1: [],
    };
  },
  created() {
    var _this = this;
    _this.echart4()
  },
  mounted() {
    var _this = this;
    _this.echart4()
  },
  methods: {
    echart4(){
       var WaterNum = "21312323";
    var object = { WaterNum };
    var _this = this;
    _this.$axios
      .post(
        urlClass.axiosUrYA+"GetWaterUnitConsumption",
        JSON.stringify(object)
        /*  {headers: {'Content-Type':'application/json;'}} */
      )
      .then(res => {
        var _this = this;
        var resechartsdatadh = res.data;
        Bus.$emit("echats4msg", resechartsdatadh);
        var WaterUnitConsumption = res.data.WaterUnitConsumption;
        var datadh1 = [];
        var timedh1 = [];
        var typedh1 = [];
        for (var i = 0; i < WaterUnitConsumption.length; i++) {
          datadh1.push(WaterUnitConsumption[i].Data);
          timedh1.push(WaterUnitConsumption[i].Time);
        }    
        _this.bjsechartsdatadh1 = datadh1;
        _this.bjsechartstimedh1 = timedh1;
         _this.drawLine()
      })
      .catch(error => {
        console.log(error);
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainl4"));
      // 绘制图表
      myChart.setOption({
        grid: {
          height: 84,
        
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
            /*  data:[ '00:00', '00:15', '00:30',
              '00:45','01:00', '01:15','01:30', '01:45', '02:00','02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30',
              '04:45','05:00','05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45',
              '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45','12:00'], */
            data: this.bjsechartstimedh1,
            /*  data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30',
          '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'
        ], */
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
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#mainl4 {
  width: 1260px;
  height: 134px;
  margin-left: 20px;
  /*   border: 1px red solid; */
}
</style>


