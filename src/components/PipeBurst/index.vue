<template>
    <div class="emergency-dispatch-warp">
        <el-row type="flex" style="height:100%;border: 1px solid #D1D1DA;">
            <el-col :span="11">
                <left-info></left-info>
            </el-col>
            <el-col :span="13" style="overflow:hidden">
                <mytdt-map style="height:100%;width:100%" key="mapTemp"></mytdt-map>
                <el-button class="legendStyle" :style="{right:rightSpace+'px'}" v-show="minLegend" v-on:click="legendMin">图例</el-button>
                <legend-main  class="legendStyle" :style="{right:rightSpace+'px'}" :isShow="this.legendIsShow" :legendData="this.myLegendData"></legend-main>  
            </el-col>
        </el-row>
    </div>
</template>
<script>
import MytdtMap from "@/components/mytdt/PipeBurstMap";
import LegendMain from "@/components/LegendMain";
import LeftInfo from "@/components/PipeBurst/components/LeftWinInfo"
export default {
    name: "Diffusion",
  components: {
    MytdtMap,LegendMain,LeftInfo
  },
  mounted(){
      window.addEventListener('event_name',this.myEventListener)
      
  },
  data() {
    return {
        minLegend:false,
      cur:'bgmn',
      myLegendData: {
        title: "基础管网",
        legendName: "",
        listData: [],
        type: "baseMap",
        opType:true
      },
      legendIsShow: true,
      rightSpace: 30,
      steps: [
                {name: '停水处置',onClick:this.stepClick,key:'tscz'},
                {name: '模拟计算',onClick:this.stepClick,key:'mnjs'},
                {name: '优化调度',onClick:this.stepClick,key:'yhdd'},
            ],
            curStep: 'tscz'
    };
  },
  methods: {
      legendMin(){
          this.legendIsShow = !this.legendIsShow;
          this.minLegend = !this.minLegend;
      },
      myEventListener(event){
          var typeTemp = event.detail.type;
          var dataTemp = event.detail.data;
          if(typeTemp == "LegendDisplay") {
            this.myLegendData = dataTemp;
          }
          else if(typeTemp=="BaseMap"){
              this.myLegendData =  {
                    title: "基础管网",
                    legendName: "",
                    listData: [],
                    type: "baseMap",
                    opType:true
                }
          }
          else if(typeTemp=="legendMin")
          {
              this.legendMin();
          }
      }
  }
}
</script>
<style scoped>
.legendStyle{
    position: absolute;
    top: 30px;
    z-index: 99;
}
</style>
<style lang="less" scoped>
.emergency-dispatch-warp{
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    .emergency-tabs{
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        .emergency-tabs-item{
            flex: 1;
            width: 33.333%;
            min-width: 33.333%;
            max-width: 33.333%;
            text-align: center;
            cursor: pointer;
            line-height: 40px;
            transition: background-color .1s;
            &.active{
                background-color: #70991F;
                color: white;
            }
        }
        .emergency-tabs-content{
            width: 100%;
            height: calc(~"100% - 40px");
            // overflow-y: auto;
        }
    }
}
</style>

