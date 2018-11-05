<template>
    <div id="myChartDiv1" class="chartClass1" :style="{width:minWidth+'px'}">  </div>
</template>
<script>
export default {
  name:"ChartMain",
   props: {
      chartData:{
          type:Object,
          default:{}
      }
  } ,
  data() {
    return {
      listData: {
        listX: [1, 2, 3, 4, 5, 6, 7],
        listXNew: [1, 2, 3, 4, 5, 6, 7],
        listY1: [4, 5, 78, 2, 45, 7, 9],
        listY2: [1, 7, 2, 3, 4, 0, 7],
        listY3: [0, 0, 0, 0, 0, 0, 0]
      },
      minWidth:0,
      minHeight:0
    };
  },
  mounted() {
    this.minWidth = document.documentElement.clientWidth*0.62
    this.minHeight = document.documentElement.clientHeight*0.25
       var that = this;
      window.onresize = function() {
        that.minWidth = document.documentElement.clientWidth*0.62;
        that.minHeight = document.documentElement.clientHeight*0.25
        };
    window.addEventListener('event_name',this.myEventListener)
    //this.drawLine();
  },

  methods: {
     click(param) {
      console.log(param);
    },
    myEventListener(event) {
      var typeTemp = event.detail.type;
      var dataTemp = event.detail.data;
      if(typeTemp=="AccuracyChartReturn"){
        this.drawLine();
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChartDiv1"));
      // 绘制图表
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          },
          alwaysShowContent: false,
          triggerOn: "click"
        },
        grid: {
          height: 100,
          width: this.minWidth*0.62,
          top: 30,
          bottom: 50
        } ,
        title: {
          textStyle: {
            //文字颜色
            color: "#6e7b8b",
            //字体风格,'normal','italic','oblique'
            fontStyle: "normal",
            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "bold",
            //字体系列
            fontFamily: "sans-serif",
            //字体大小
            fontSize: 14
          },
          left: "center"
        },
        legend: {
          data: this.chartData.legendLabel
        },

        textStyle: {
          color: "#6e7b8b"
        },
        xAxis: [
          {
            show:false,
            name: this.chartData.xAxisName,
            type: "category",
            data: this.chartData.listData.listX,
            axisPointer: {
              type: "shadow"
            },
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#e2e5e8", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            }
          },
          {
            position:'bottom',
            name: this.chartData.xAxisName,
            type: "category",
            data: this.chartData.listData.listXNew,
            axisPointer: {
              type: "shadow"
            },
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#e2e5e8", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            }
          }
        ],
        yAxis: [
          {
            name: this.chartData.yAxisName,
            type: "value",
            axisLabel: {
              formatter: "{value}"
            },
            axisTick: { show: false },
            splitLine: { show: true }, //去除网格线
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#e2e5e8", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            },
            position: "left"
          }
        ],
        series:this.chartData.series
      };

      myChart.setOption(option);
      myChart.on("click", function(params) {
        // 控制台打印数据的名称
        console.log(params);
      });
    } 
  }
}
</script>
<style scoped>
.chartClass1 {
   height: 170px; 
}
</style>


