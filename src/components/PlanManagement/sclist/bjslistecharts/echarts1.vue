<template>
    <div>
          <div id="mainl1"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Echarts1",
  data() {
    return {
      bjsechartsdata1: [],
      bjsechartstime1: [],
      bjsechartsdata2: [],
      bjstimrdata: [],
      bjsechartstype1: "",
      bjsechartstype2 :""
    };
  },
  created() {
     var _this = this;
     _this.echart1();
  },
  mounted() {
    var _this = this;
     _this.echart1();
  },

  methods: {
    echart1(){
       var WaterNum = "21312323";
    var object = { WaterNum };
    var _this = this;
    _this.$axios
      .post(
        urlClass.axiosUrYA+"GetWaterquantity",
        JSON.stringify(object)
        /*  {headers: {'Content-Type':'application/json;'}} */
      )
      .then(res => {
        var _this = this;
        var resechartsdata = res.data;
        var WaterInflow = res.data.WaterInflow;
        var WaterSupply = res.data.WaterSupply;
        var data1 = [];
        var time1 = [];
        var data2 = [];
        var type1 = [];
        for (var i = 0; i < WaterInflow.length; i++) {
          data1.push(WaterInflow[i].Data);
          time1.push(WaterInflow[i].Time);
        }
        for (var i = 0; i < WaterSupply.length; i++) {
          data2.push(WaterSupply[i].Data);
        }
        _this.bjsechartsdata1 = data1;
        _this.bjsechartstime1 = time1;
        _this.bjsechartsdata2 = data2;
       _this.drawLine();
        console.log(res); 
         Bus.$emit('echats1msg',resechartsdata)
      })
      .catch(error => {
        console.log(error);
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainl1"));
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
          data: ["供水量", "进水量"],
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
            data: this.bjsechartstime1,
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
       /*  visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte:this.bjsechartstype1-1,
              color: "#bcc2cb"
            },
             {
              gt:this.bjsechartstype1-1,
              lte:this.bjsechartstype1,
              color: "red"
            },
            {
              gt:this.bjsechartstype1,
              lte: 96,
              color: "#859dc0"
            }
          ]
        }, */
     series: [
          {
            name: "供水量",
            type: "bar",
            barWidth: 6,
            data: this.bjsechartsdata1,
            zlevel: 2,
            itemStyle: {
              emphasis: {
                color: "red"
              }
            }
          },
          {
            name: "进水量",
            type: "line",
            data: this.bjsechartsdata2,
          zlevel: 99,
            /*         symbol: 'rect',
        hoverAnimation: true,
        showAllSymbol: true,
        symbolSize: '8', */
            itemStyle: {
              // 转折点 控制
              normal: {
                borderColor: "#99b9ea"
              }
            },

            lineStyle: {
              normal: {
                width: 2,
                color: "#99b9ea"
              }
            }
           /*  areaStyle: {
              normal: {
                color: "#bcc2cb"
              }
            } */
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#mainl1 {
      width: 1260px;
      height: 134px;
      margin-left: 20px;
    /*   border: 1px red solid; */
    }
</style>


