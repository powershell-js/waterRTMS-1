<template>
<div class="mainClass" :style="{minHeight:minHeight+'px'}">
    <div class="mainClass" :style="{minHeight:minHeight+'px'}">
            <div class="myDivClass" :style="{minHeight:minHeightLeft+'px'}">
               <diffusion-left style="padding-top:10px;width:100%"></diffusion-left>
            </div>
            <div style="height:100%;">
                <mytdt-map style="width:100%;height:100%" key="mapTemp"></mytdt-map>
                <legend-main :allIsDisplay="allIsDisplay" class="legendStyle" :isShow="this.legendIsShow" :legendData="this.myLegendData"></legend-main>
                 <my-table v-show="this.tableShow" class="tableClassMy" :tableData='this.myTableData'></my-table>
            </div>
    </div>
</div>
</template>
<script>
import legendMain from '@/components/LegendMain'
import diffusionLeft from '@/components/Diffusion/DiffusionLeft'
import MytdtMap from '@/components/mytdt/map'
import MyTable from '@/components/Table/MyTable'
export default {
    name: 'Diffusion',
    components:{
        MytdtMap,
        diffusionLeft,
        legendMain,
        MyTable
    },
    data(){
        return{
            minHeight:0,
            minHeightLeft:0,
            legendIsShow:true,
            myLegendData:{
              title:"基础管网",
              legendName:"",
              listData:[],
                type:'baseMap'
          },
          allIsDisplay:true,
          tableShow:false,
          myTableData:{
              listData:[]
              },
        }
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
      methods:{
          myEventListener(event){
              var type = event.detail.type;
              var data = event.detail.data;
              if(type=="LegendDisplay")
              {
                  this.myLegendData = data;
              }
              else if(type=="LegendLocationGet"||type=="LegendCustomerGet")
              {
                  this.myTableData =  data;   
                  this.tableShow = true;
              }
              else if(type=="DiffusionClear")
              {
                  this.myLegendData =  new Object({
                                    title:"基础管网",
                                    legendName:"",
                                    listData:[],
                                        type:'baseMap'
                                });
              }
              else if(type=="MyTableClose")
            {
                this.tableShow = false;
            }
          }
      }
    
}
</script>
<style scoped>
.legendStyle{
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 99;
}
.mainClass{
    width: 100%;
    height: 100%;
     
}
.myDivClass{
    padding-top: 10px;
    width: 25%;
    background: #ECEDEF;
    z-index: 99;
    position: absolute;
    text-align: center;
    vertical-align: middle;
}
.tableClassMy{
    width: 100%;
    position: absolute;
    bottom: 0px;
    z-index: 99;
    background-color: #fff;
}
</style>



