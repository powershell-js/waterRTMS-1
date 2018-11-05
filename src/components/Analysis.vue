<template>
<div class="mainClass" :style="{minHeight:minHeight+'px'}">
    <div class="mainClass" :style="{minHeight:minHeight+'px'}">
            <div class="myDivClass" :style="{minHeight:minHeightLeft+'px'}">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="供水路径" name="first">
                    <supply-path-page></supply-path-page>
                    </el-tab-pane>
                   <!--  <el-tab-pane label="自定义" name="second">自定义</el-tab-pane> -->
                </el-tabs>
            </div>
            <div style="height:100%;">
                <mytdt-map style="width:100%;height:100%" key="mapTemp"></mytdt-map>
            </div>
    </div>
    <div class="chartClass" v-show="chartShow">
        <supply-path-chart  style="width:100%" :labelData="listLabelData"></supply-path-chart>
    </div>
</div>

        
</template>
<script>
import MytdtMap from '@/components/mytdt/map'
import supplyPathPage from '@/components/SupplyPath/SupplyPathPage'
import supplyPathChart from '@/components/SupplyPath/SupplyPathChart'
import windowsEvent from '@/components/js/WindowsEvent'
export default {
    name: 'Analysis',
    components:{
        MytdtMap,
        supplyPathPage,
        supplyPathChart
    },
    mounted(){
            window.addEventListener('event_name',this.myEventListener)
             this.minHeight = document.documentElement.clientHeight
             this.minHeightLeft = document.documentElement.clientHeight-10;
              var that = this;
            window.onresize = function() {
            that.minHeight = document.documentElement.clientHeight;
            that.minHeightLeft = document.documentElement.clientHeight-10;
        };
      },
     data() {
      return {
        activeName: 'first',
        listLabelData:{
            AllLength: 0,
            HeadLoss: 0,
            SourceName:'',
            StartHead:0,
            EndHead:0,
            chartData:{
                listX:[1,2,3,4,5,6,7,8,8],
                listY1:[1,2,3,4,5,6,7,8,8],
                listY2:[2,2,3,20,5,6,7,8,8]
            }
        },
        chartShow:false,
        minHeight:0,
        minHeightLeft:0
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
      ,
      myEventListener(event){
              var typeTemp = event.detail.type;
              var dataTemp = event.detail.data;
              if(typeTemp=="FindPathReturn"){
                  this.listLabelData = Object.assign({},dataTemp);
                  var chartData = new Object();
                  var listX = new Array()
                  listX = this.listLabelData.LengthCount;
                   var listY1 = new Array()
                  listY1 = this.listLabelData.NodeElev;
                   var listY2 = new Array()
                  listY2 = this.listLabelData.NodeHGL;
                  chartData.listX = listX.slice(0).reverse();  
                  chartData.listY1 = listY1.slice(0).reverse(); 
                  chartData.listY2 = listY2.slice(0).reverse();
                  console.log(chartData)
                  this.listLabelData.chartData = Object.assign({},chartData);
                  windowsEvent.MyDispatchEvent("SupplyPathChartDraw",chartData);
                  this.chartShow = true;
              }
              else if(typeTemp=="SupplyPathClear"){
                  this.chartShow = false;
              }
      }
    }
    
}
</script>

<style>
.myDivClass{
    padding-top: 10px;
    width: 25%;
    background: #ECEDEF;
    z-index: 99;
    position: absolute;
    text-align: center;
    vertical-align: middle;
}
.chartClass{
    background: #ECEDEF;
    height: 25%;
    width: 100%;
    z-index: 99;
    bottom: 0px;
    position: absolute;
}
.mainClass{
    width: 100%;
    height: 100%;
}
</style>

