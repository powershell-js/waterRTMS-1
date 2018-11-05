<template>
    <div>
          <div id="main3"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
export default {
  name: "Echarts3",
   data() {
    return {

    }
  },
  props:['bjsQSCData','bjsQSCTime'],
  watch:{
    bjsQSCData(){
        this.drawLine();
    }
  },
  methods: {
    drawLine() {
     let self = this;
      let myChart = this.$echarts.init(document.getElementById("main3"));
      myChart.setOption({
        grid: {
          bottom: 10,
          top: 35,
          right: 1,
          left: 51
        },
        color: "#99b9ea",
        title:{
            text:"水厂清水池24小时水位曲线",
            textStyle:{
                fontSize: 12,
                color: '#6e7b8b',
                fontWeight: 'bold'
            }

        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type:'category',
          data:self.bjsQSCTime,

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
            name: "清水池水位",
            type: "line",
            color: "#99b9ea",
            lineStyle: {

              color: "#99b9ea"
            },
            smooth: false,
            data:self.bjsQSCData,

            itemStyle: {
              normal: {
                color: "#99b9ea"
              }
            },
            areaStyle: {
              normal: {
                color: "#99b9ea"
              }
            },
            markLine: {
                symbol:"none",
                data: [
                    {type: 'max', name: '最大值',symbol:"none",lineStyle:{color:'#da5abd'}},
                    {type: 'min', name: '最小值',symbol:"none",lineStyle:{color:'#749ed9'}}
                ]
            }
          }
        ]
      });
    },

  }
};
</script>
<style  scoped>
#main3 {
  /* width: 820px; */
  height: 134px;
  width: 100%;
  /* margin-left:20px; */
  /*   border: 1px red solid; */
}
</style>


