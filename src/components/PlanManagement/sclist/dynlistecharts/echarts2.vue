<template>
    <div>
          <div id="mainynl2"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Echarts2",
  data() {
    return {
      bjsechartsdatap1: [],
      bjsechartstimep1: []
    };
  },
  created() {
    var _this = this;
    _this.echart2();
  },
  mounted() {
    var _this = this;
    _this.echart2();
  },
  methods: {
    echart2() {
      var WaterNum = "21312323";
      var object = { WaterNum };
      var _this = this;
      _this.$axios
        .post(
          urlClass.axiosUrYA+"GetOutPressure",
          JSON.stringify(object)
          /*  {headers: {'Content-Type':'application/json;'}} */
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
          _this.bjsechartsdatap1 = datap1;
          _this.bjsechartstimep1 = timep1;
          _this.drawLine()
        })
        .catch(error => {
          console.log(error);
        });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainynl2"));
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
            /*  data:[ '00:00', '00:15', '00:30',
              '00:45','01:00', '01:15','01:30', '01:45', '02:00','02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30',
              '04:45','05:00','05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45',
              '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45','12:00'], */
            data: this.bjsechartstimep1,
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
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#mainynl2 {
  width: 1260px;
  height: 134px;
  margin-left: 20px;
  /*   border: 1px red solid; */
}
</style>


