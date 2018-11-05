<template>
    <div>
          <div id="mainynl3"></div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import urlClass from "@/components/js/UrlClass";
export default {
  name: "Echarts3",
   data() {
    return {
      bjsechartsdataq1: [],
      bjsechartsdataq2: [],
      bjsechartstimeq1: [],
    }
  },
    created() {
   var _this = this;
  _this.echart3()
  },
  mounted() {
    var _this = this;
  _this.echart3()
  },
 
  methods: {
    echart3(){
       var WaterNum = "21312323";
    var object = { WaterNum };
    var _this = this;
    _this.$axios
      .post(
        urlClass.axiosUrYA+"GetWaterPoolLevel",
        JSON.stringify(object)
        /*  {headers: {'Content-Type':'application/json;'}} */
      )
      .then(res => {
        var _this = this;
        var resechartsdataq= res.data;
        Bus.$emit('echats3msg',resechartsdataq);
        var WaterPoolLevel = res.data.WaterPoolLevel;
        var dataq1 = [];
         var dataq2 = [];
        var timeq1 = [];
        var typeq1 = [];
        for (var i = 0; i < WaterPoolLevel.length; i++) {
          timeq1.push(WaterPoolLevel[i].Time);
        }
        for (var i = 0; i < WaterPoolLevel.length; i++) {
          typeq1.push(WaterPoolLevel[i].Type);
        }
        var typeqf1=[];
        for(var i=0;i<typeq1.length;i++){
          if(typeq1[i]==0){
            typeqf1.push(typeq1[i])
          }
        }
        var typeqf1length=typeqf1.length;
        var typeqf2length=96-typeqf1.length;
       var kdata1=[];
       var kdata2=[];
        for(var i=0; i<typeqf1length; i++){
         kdata1.push(null)
        }
         for(var i=0; i<typeqf2length; i++){
         kdata2.push(null)
        }
        for (var i = 0; i <= typeqf1length; i++) {
          dataq1.push(WaterPoolLevel[i].Data);
        }
         for (var i = typeqf1length; i <96; i++) {
          dataq2.push(WaterPoolLevel[i].Data);
        }
        var cdataq1=dataq1.concat(kdata2)
        var cdataq2=kdata1.concat(dataq2)
        _this.bjsechartsdataq1 = cdataq1;
          _this.bjsechartsdataq2 = cdataq2;
        _this.bjsechartstimeq1 = timeq1;
        _this.bjsechartstypeq1 = typeqf1length;
       _this.drawLine()
      })
      .catch(error => {
        console.log(error);
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("mainynl3"));
      // 绘制图表
      myChart.setOption({
        grid: {
          height: 84,
         
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
            color: "#99b9ea", //折线图颜色,搭配markArea为面积图
            lineStyle: {
              //折线的颜色
              color: "#99b9ea"
            },
            smooth: false, //是否平滑处理值0-1,true相当于0.5
  
            data:this.bjsechartsdataq1,
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
<style lang="scss" scoped>
#mainynl3 {
  width: 1260px;
  height: 134px;
  margin-left: 20px;
  /*   border: 1px red solid; */
}
</style>


