<template>
    <div>
          <div id="main"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
export default {
  name: "Echarts1",
  data() {
    return {

    };
  },
 props:['bjsJSLData','bjsJSLTime'],
  mounted() {

  },
 watch:{
     bjsJSLData(){
         this.drawLine();
     }
 },
  methods: {
    drawLine() {
      let self = this;
      let myChart = this.$echarts.init(document.getElementById("main"));

      myChart.setOption({
        grid: {
          bottom: 10,
          top: 35,
          right: 1,
          left: 51
        },
        color: ["#859dc0", "#bcc2cb"],
        title:{
            text:"水厂进水量24小时曲线",
            textStyle:{
                fontSize: 12,
                color: '#6e7b8b',
                fontWeight: 'bold'
            }

        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            type:'category',
            data:self.bjsJSLTime,
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
            name: "进水量",
            type: "bar",
            data: self.bjsJSLData,
            itemStyle: {
                normal: {
                    color: '#859dc0'
                }
            },

          }
        ]
      });
    }
  }
};
</script>
<style  scoped>
#main {
    width: 100%;
    height: 156px;
}
.line{
    border-top:1px solid #d1d1da;
    width: 100%;
    height: 0;
}
</style>


