<template>
    <div>
        <el-row style="padding-left:10px">
            <td>选择查询供水路径的起点</td>
        </el-row>
        <el-row :gutter="10" style="width:100%;vertical-align: middle;padding-top:10px">
            <el-col :span="7">
                <el-radio style="padding-left:10px;padding-top:5px" v-on:change="radioChange" v-model="radio" label="1">图上选择</el-radio>
            </el-col>
            <el-col :span="10">
                <el-input v-model="elementIdTempClick" :disabled="true"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="success" v-on:click="select" :disabled='(radio!="1")'>选择</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="10" style="width:100%;vertical-align: middle;padding-top:5px">
            <el-col :span="7">
                <el-radio style="padding-left:10px;padding-top:5px" v-on:change="radioChange" v-model="radio" label="2">最低压力</el-radio>
            </el-col>
            <el-col :span="10">
                <el-input v-model="elementIdTempPosition" :disabled="true"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button v-on:click="position" :disabled='(radio!="2")'>定位</el-button>
            </el-col>
        </el-row>

    <!--     <el-row :gutter="10" style="width:100%;vertical-align: middle;padding-top:5px">
            <el-col :span="7">
                <el-radio style="padding-left:0px;padding-top:5px" v-on:change="radioChange" v-model="radio" label="3">自定义</el-radio>
            </el-col>
            <el-col :span="10">
                <el-select v-model="value" placeholder="请选择" v-on:change="showProject">
                    <el-option
                    v-for="item in list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row> -->
        <el-row style="width:100%;vertical-align: middle;padding-top:10px;text-align: center">
            <el-button v-on:click="FindPath">查找路径</el-button>
        </el-row>
    </div>
</template>
<script>
import WindowsEvent from '@/components/js/WindowsEvent'
import axios from 'axios'
import urlClass from '@/components/js/UrlClass'
export default {
     data () {
      return {
        radio: '1',
        elementIdTempClick:'',
        elementIdTempPosition:'',
        list:[
            {label:'234',value:'234',index:0},
            {label:'123',value:'123',index:0}],
        showObject:{label:'',value:''},
        showIndex:0,
        value:'',
        selectBtn:true,
      };
    },
     mounted(){
            window.addEventListener('event_name',this.myEventListener)
      },
    methods:{
        radioChange:function(){
            if(this.radio!="1")
            {
                this.elementIdTempClick = '';
            }
            else if(this.radio!="2")
            {
                this.elementIdTempPosition = '';
            }
            if(this.radio=="2")
            {
                var self = this;
                var time = (new Date()).getHours();
                console.log(time)
                axios.get(urlClass.axiosUrl+"GetLowPressureNode/"+String(time))
                .then(function(respone){
                    var node = respone.data;
                    self.elementIdTempPosition = node.ElementId;
                })
            }
            WindowsEvent.MyDispatchEvent("SupplyPathClear",'');
            
        },
         showProject:function(){

         },
         myEventListener:function(event){
              var typeTemp = event.detail.type;
              var dataTemp = event.detail.data;
              if(typeTemp=="SupplyPathMapClickReturn"){
                  console.log(dataTemp)
                  this.elementIdTempClick = dataTemp.elementId;
              }
         },
         select:function(){
             this.elementIdTempClick = '';
            WindowsEvent.MyDispatchEvent("SupplyPathMapClick",true);
         },
         position:function(){
            WindowsEvent.MyDispatchEvent("PressureLowPosition",this.elementIdTempPosition);
         },
         FindPath:function(){
             if(this.elementIdTempClick!=""||this.elementIdTempPosition!="")
             {
                 var id = "";
                 var obj = new Object();
                 if(this.elementIdTempClick!="")
                 {
                    id = this.elementIdTempClick;
                    obj.type = "click";
                 }
                    
                if(this.elementIdTempPosition!="")
                {
                    id = this.elementIdTempPosition;
                    obj.type = "pressureLow"
                }
                    
                obj.id = id;
                WindowsEvent.MyDispatchEvent("FindSupplyPath",obj);
             }
             else
             {
                 alert("请先选择查找的节点或管道");
             }
         }
    }
}
</script>
<style>

</style>


