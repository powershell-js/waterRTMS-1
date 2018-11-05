<template>
    <div id="myChartDiv" style="height:170px">  </div><!--:style="{width:minWidth+'px'}"  class="chartClass"-->
</template>
<script>
export default {
  props: {},
  data() {
    return {
      listData: {
        listXNew: [],
        listX: [],
        listY1: [],
        listY2: [],
        listY3: []
      },
      minWidth:0
    };
  },
  mounted() {
    //document.documentElement.clientHeight   获取屏幕高度
     this.minWidth = document.documentElement.clientWidth*0.8
       var that = this;
      window.onresize = function() {
        that.minWidth = document.documentElement.clientWidth*0.8;
        };
    window.addEventListener("event_name", this.myEventListener);
    this.drawLine();
  },

  methods: {
    click(param) {
      console.log(param);
    },
    myEventListener(event) {
      var typeTemp = event.detail.type;
      var dataTemp = event.detail.data;
      if (typeTemp == "SupplyPathChartDraw") {
        this.listData = dataTemp;
        console.log(this.listData)
        this.drawLine();
      }
    },
    drawLine() {
      var self = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChartDiv"));
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
          top: 30,
          bottom: 10
        },
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
          data: ["高程", "水头"]
        },

        textStyle: {
          color: "#6e7b8b"
        },
        xAxis: [
          {
            show: false,
            name: "距离(m)",
            type: "category",
            data: this.listData.listX,
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
            position: 'bottom',
            name: "距离(m)",
            type: "category",
            data: this.listData.listXNew,
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

        ],
        yAxis: [
          {
            name: "高程(m)",
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
        series: [
          {
            type: "line",
            name: "水头",
            data: this.listData.listY2,
            itemStyle: {
              normal: {
                color: "#46759f",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: "#46759f"
              }
            }
          },
          {
            type: "line",
            name: "高程",
            data: this.listData.listY1,
            itemStyle: {
              normal: {
                color: "#8d6d30",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: "#8d6d30"
              }
            }
          }
        ]
      };
      
      myChart.setOption(option);
      myChart.on("click", function(params) {
        // 控制台打印数据的名称
        //console.log(params);
        //console.log(self.listData.listY1[params.dataIndex])
        //console.log(self.listData.listY2[params.dataIndex])
      });
    }
  }
};
</script>
<style scoped>
.chartClass {
  height: 170px;
}
#myChartDiv{
  width: calc(100%-40px)
}
</style>


