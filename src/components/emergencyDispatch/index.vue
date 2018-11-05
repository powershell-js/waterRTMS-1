<template>
    <div class="emergency-dispatch-warp">
        <el-row type="flex" style="height:100%;border: 1px solid #D1D1DA;">
            <el-col :span="13">
                <div class="emergency-tabs">
                    <div class="emergency-tabs-item" v-for="item in tabList" :key="item.name" @click="curTab = item.key" v-on:click="tabChange"
                    :class="{'active': curTab===item.key}">
                        <span>{{item.name}}</span>
                    </div>
                    <div v-bar class="emergency-tabs-content">
                        <div>
                            <area-press-reg v-if="curTab === 'qyty'"></area-press-reg>
                            <booster-event v-if="curTab === 'bgsj'"></booster-event>
                            <water-event v-if="curTab === 'szsj'"></water-event>
                        </div>
                    </div> 
                </div>
            </el-col>
            <el-col :span="11" style="overflow:hidden">
                <my-map style="height:100%"></my-map>
                 <el-button class="legendStyle" :style="{right:rightSpace+'px'}" v-show="minLegend" v-on:click="legendMin">图例</el-button>
                <legend-main  class="legendStyle" :style="{right:rightSpace+'px'}" :isShow="!minLegend" :legendData="this.myLegendData"></legend-main>  
            </el-col>
        </el-row>
    </div>
</template>
<script>
import ArcgisTdt from '../ArcgisTdt.vue'
import MyMap from '@/components/mytdt/mapEmergencyDispatch.vue'
import AreaPressReg from './components/AreaPressReg/index.vue'
import BoosterEvent from './components/BoosterEvent.vue'
import WaterEvent from './components/WaterEvent/index.vue'
import legendMain from '@/components/LegendMain.vue'
import WindowsEvent from "@/components/js/WindowsEvent";
export default {
    components: { ArcgisTdt, AreaPressReg, BoosterEvent, WaterEvent ,MyMap,legendMain},
    data() {
        return {
            curTab: 'qyty',
            tabList: [
                {name: '区域调压', key: 'qyty'},
                {name: '爆管事件', key: 'bgsj'},
                {name: '水质事件', key: 'szsj'}
            ],
            rightSpace: 30,
            minLegend:false,
            myLegendData:{
                 title: "基础管网",
                legendName: "",
                listData: [],
                type: "baseMap",
                opType:true
            }
        }
    },
    methods:{
        tabChange(){
            this.myLegendData =  {
                    title: "基础管网",
                    legendName: "",
                    listData: [],
                    type: "baseMap",
                    opType:true
            }
            WindowsEvent.MyDispatchEvent("TabChange", '');
        },
        legendMin(){
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
    },
    mounted(){
        window.addEventListener('event_name',this.myEventListener)
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
            box-sizing: border-box;
            border-right: 1px solid #D1D1DA; 
            background-color: #F5F5F6;
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
