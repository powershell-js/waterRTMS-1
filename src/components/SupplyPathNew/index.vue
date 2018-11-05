<template>
    <div class="outbox" :style="{height:(minHeight)+'px'}">
        <div class="inbox" :style="{height:(inminHeight)+'px'}">
         <div class="topbox" :style="{height:(topHeight)+'px'}">
           <div class="topleftbox" :style="{height:(topHeight)+'px'}">
             <topleft/>
           </div>
           <div class="toprightbox" :style="{height:(topHeight)+'px'}">
             <mytdt-map style="width:100%;height:100%" key="mapTemp"></mytdt-map>
             <el-button class="legendStyle" style="right:30px" v-show="minLegend" v-on:click="legendMin">图例</el-button>
             <legend-main  class="legendStyle" :isShow="!minLegend" :legendData="this.myLegendData"></legend-main>
           </div>
         </div>
         <div class="downbox">
           <down/>
          </div>
        </div>
    </div>
</template>
<script>
import LegendMain from "@/components/LegendMain";
import MytdtMap from "@/components/mytdt/map";
import topleft from '@/components/SupplyPathNew/topleft/topleft'
import down from '@/components/SupplyPathNew/down/down'
export default {
  name: "Index",
 components:{
   topleft,
   down,
   MytdtMap,
   LegendMain
 },
  data() {
    return {
      myLegendData: {
        title: "基础管网",
        legendName: "",
        listData: [],
        type: "baseMap",
        opType:true
      },
      minHeight: 0,
      inminHeight: 0,
      topHeight: 0,
      legendIsShow:true,
      minLegend:false,
  
    };
  },
  methods:{
    legendMin(){
          this.minLegend = !this.minLegend;
      },
       myEventListener(event){
         var typeTemp = event.detail.type;
          var dataTemp = event.detail.data;
          if(typeTemp=="BaseMap"){
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
  mounted() {
    window.addEventListener('event_name',this.myEventListener)
    this.minHeight = document.documentElement.clientHeight;
    this.inminHeight = document.documentElement.clientHeight - 40;
    this.topHeight = document.documentElement.clientHeight - 247-80;
    var that = this;
    window.onresize = function() {
      that.minHeight = document.documentElement.clientHeight;
      that.inminHeight = document.documentElement.clientHeight - 40;
      that.topHeight = document.documentElement.clientHeight - 247-80;
    };
  }
};
</script>
<style  scoped>
.outbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
   /*  background-color: aqua;*/
} 
.inbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items:flex-start;
  width: -moz-calc(100% - 40px);
  width: -webkit-calc(100% - 40px);
  width: calc(100% - 40px);
    border: 1px #e4e4ec solid;
 /*  background-color: rgb(22, 235, 93); */
}
.topbox{
   display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items:flex-start;
  width: 100%;
 /*  background-color: #201717 */
}
.topleftbox{
  width: 872px;
  min-width: 870px;
    border-right: 1px #e4e4ec solid;
 /*  background-color: chocolate; */
}
.toprightbox{
   width: -moz-calc(100% - 872px);
  width: -webkit-calc(100% - 872px);
  width: calc(100% - 872px);
    border-right: 1px #e4e4ec solid;
 /*  background-color: rgb(86, 22, 235); */
}
.downbox{
  width: 100%;
  height: 247px;
    border-top: 1px #e4e4ec solid;
 /*  background-color: yellowgreen */
}
.legendStyle {
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 99;
}
</style>

