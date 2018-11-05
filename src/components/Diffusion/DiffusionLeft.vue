<template>
    <div style="width:100%;top:10px;padding-left:10px;padding-right:10px;padding-bottom:10px">
        <div style="width:100%">
            <td class="titleClass">污染物扩散</td>
        </div>
         <div class="divClass">
            <td style="padding-right:10px;padding-top:5px;padding-left:14%;width:55px">分析历时</td>
            <el-input  style="width:100px;padding-right:10px" v-model="passTime"></el-input>
            <td style="padding-top:5px">小时</td>
        </div>
        <div class="divClass">
            <td style="padding-right:10px;padding-top:5px;padding-left:14%;width:55px">扩散源头</td>
            <el-input :disabled="true" style="width:100px;padding-right:10px" v-model="sourceId"></el-input>
            <el-button  v-on:click="selectClick" type="success" class="btnClass">选择</el-button>
        </div>
        <div class="divClass">
            <td style="padding-right:10px;padding-top:5px;padding-left:14%;width:85px">扩散模拟时间</td>
            <el-select v-model="value" style="width:100px" v-on:change="change">
                 <el-option
                    v-for="item in selection"
                    :key="item.label"
                    :value="item.index"
                    :label="item.label">
                </el-option>
            </el-select>
        </div>
        <div class="sliderPlayerClass" v-show="isDiffusion">
            <img src="../../../static/assets/sliderPlayer/play.png" alt="" style="cursor:pointer;padding-right:20px" :style="{width:playWidth+'px'}" title="播放" v-show="isPlay" v-on:click="Play"><!--播放-->
            <img src="../../../static/assets/sliderPlayer/pause.png" alt="" style="cursor:pointer;padding-right:20px" :style="{width:pasueWidth+'px'}" v-show="!isPlay" title="停止" v-on:click="Pause"><!--停止-->
            <img src="../../../static/assets/sliderPlayer/back.png" alt="" style="cursor:pointer;padding-right:20px" title="后退" v-on:click="Back"><!--后退-->
            <img src="../../../static/assets/sliderPlayer/next.png" alt="" style="cursor:pointer;padding-right:20px" title="前进" v-on:click="Next"><!--前进-->
            <img src="../../../static/assets/sliderPlayer/left.png" alt="" style="cursor:pointer;padding-right:20px" title="返回当前时间" v-on:click="Left"><!--返回当前时间-->
            <span>时间</span>
            <span>{{sliderValue}}</span>
        </div>
        <div class="sliderClass" v-show="isDiffusion">
            <el-slider v-model="sliderValue" :min='0' :max="max"
                        :step="step" show-stops v-on:change="sliderChange">
            </el-slider>
        </div>
        <div class="sliderLabelClass" v-show="isDiffusion">
            <td>{{sliderLabelArray[0]}}</td>
            <span :style="{width:spanWidth+'px'}"></span>
            <td>{{sliderLabelArray[1]}}</td>
            <span :style="{width:spanWidth+'px'}"></span>
            <td>{{sliderLabelArray[2]}}</td>
            <span :style="{width:spanWidth+'px'}"></span>
            <td>{{sliderLabelArray[3]}}</td>
            <span :style="{width:spanWidth+'px'}"></span>
            <td>{{sliderLabelArray[4]}}</td>
            <span :style="{width:spanWidth+'px'}"></span>
            <td>{{sliderLabelArray[5]}}</td>
        </div>
        <el-row class="btnDivClass">
            <!-- <span style="width:26%"></span> -->
            <el-button  class="btnClass" type="success" v-on:click="DiffusionAnalysis">扩散分析</el-button>
            <el-button class="btnClass" type="success" v-on:click="SourceAnalysis">源头分析</el-button>
            <el-button class="btnClass" type="success" v-show="isDiffusion" v-on:click="CloseValveAnalysis">关阀分析</el-button>
        </el-row>
    </div>
</template>
<script>
import WindowsEvent from '@/components/js/WindowsEvent'
import axios from 'axios'
import urlClass from '@/components/js/UrlClass'
export default {
     mounted(){
          this.spanWidth = document.documentElement.clientWidth*0.2
          this.spanWidth = this.spanWidth/5;
       var that = this;
      window.onresize = function() {
        that.spanWidth = document.documentElement.clientWidth*0.2;
        that.spanWidth = this.spanWidth/5;
        };
            this.value = (new Date()).getHours();
            window.addEventListener('event_name',this.myEventListener)
      },
    data(){
        return{
            isDiffusion:false,
            isPlay:true,
            pasueWidth:13,
            playWidth:13,
            passTime:'',
            sourceId:'',
            value:0,
            sliderValue:0,
            step:1,
            max:5,
            interval:'',
            spanWidth:0,
            sliderLabelArray:[0,1,2,3,4,5],
            diffusionData:{},
            selection:[ 
        {label:"0点",value:0,index:0},
          {label:"1点",value:1,index:1},
          {label:"2点",value:2,index:2},
          {label:"3点",value:3,index:3},
          {label:"4点",value:4,index:4},
          {label:"5点",value:5,index:5},
          {label:"6点",value:6,index:6},
          {label:"7点",value:7,index:7},
          {label:"8点",value:8,index:8},
          {label:"9点",value:9,index:9},
          {label:"10点",value:10,index:10},
          {label:"11点",value:11,index:11},
          {label:"12点",value:12,index:12},
          {label:"13点",value:13,index:13},
          {label:"14点",value:14,index:14},
          {label:"15点",value:15,index:15},
          {label:"16点",value:16,index:16},
          {label:"17点",value:17,index:17},
          {label:"18点",value:18,index:18},
          {label:"19点",value:19,index:19},
          {label:"20点",value:20,index:20},
          {label:"21点",value:21,index:21},
          {label:"22点",value:22,index:22},
          {label:"23点",value:23,index:23}]
        }
    },
    methods:{
        sliderChange(){
            WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying",this.sliderValue);
        },
        CloseValveAnalysis(){
            var arr = this.diffusionData.ListNode.slice(0);
            var unCloseValve = new Array();
            for(var i=0;i<arr.length;i++)
            {
                if(arr[i].NodeType==61)
                    unCloseValve.push(arr[i].ElementId);
            }
            var parameterTemp = new Object();
            parameterTemp = { Demand: 0, ElementId: this.sourceId, Type: 0,CanNotBeclosedValves:unCloseValve,
                              Time:this.value,TableName:"",UserId:"",IsSave:false,CloseValveList:[]}
            axios.post(
                urlClass.axiosUrl+"PipeBurstInNode",
                JSON.stringify(parameterTemp),
                {headers: {'Content-Type':'application/json;'}}
            )   
             .then(function(respone){
                 console.log(respone)//需要添加关阀搜索之后的操作
             }) 
        },
        Play(){
            this.PlayAndPauseChange();
            this.sliderValue = 0;
            this.interval = window.setInterval(this.Playing,1000);// this.interval = window.

        },
        Playing(){
            if(this.sliderValue+1<=this.passTime)
            {
                this.sliderValue = this.sliderValue+1;
                this.labelValue = this.sliderValue;
                WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying",this.sliderValue);
            }
            else
            {
                this.isPlay = true;
                this.playWidth = 13
                this.pasueWidth = 0
                window.clearInterval(this.interval);
            }
                  
        },
         Pause(){
             this.PlayAndPauseChange();
             window.clearInterval(this.interval);
        },
         Back(){
             this.isPlay = true;
             this.playWidth = 13
             this.pasueWidth = 0
             window.clearInterval(this.interval);
            if(this.sliderValue-1>=0)
            {
                this.sliderValue = this.sliderValue-1;
                this.labelValue = this.sliderValue;
                WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying",this.sliderValue);
            }
                
        },
         Next(){
             this.isPlay = true;
             this.playWidth = 13
             this.pasueWidth = 0
             window.clearInterval(this.interval);
             if(this.sliderValue+1<=this.passTime)
             {
                this.sliderValue = this.sliderValue+1;
                this.labelValue = this.sliderValue;
                WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying",this.sliderValue);
             }
                
        },
         Left(){
            this.sliderValue = Number(this.passTime);
            window.clearInterval(this.interval);
            WindowsEvent.MyDispatchEvent("DiffusionDrawPlaying",this.sliderValue);
        },
        PlayAndPauseChange(){
            this.isPlay = !this.isPlay;
            if(this.isPlay)
            {
                this.playWidth = 13
                this.pasueWidth = 0
            }
            else
            {
                 this.playWidth = 0
                this.pasueWidth = 13
            }
        },
        DiffusionAnalysis:function(){
            if(this.sourceId==""||this.passTime=="")
                alert("请检查输入参数")
            else
            {
                this.isDiffusion = true;
                this.sliderValue = Number(this.passTime);
                this.step = this.passTime/5;
                for(var i=0;i<=5;i++)
                {
                    this.sliderLabelArray[i] = i*this.step;
                }
                this.max = Number(this.passTime);
                var self = this;
                axios.get(urlClass.axiosUrl+"NodeTrace"+"/"+this.sourceId+"/"+this.value+"/"+this.passTime+"/"+"pipe")
                    .then(function(response){
                        var result = response.data;
                        var object = new Object();
                        object.min = 0;
                        object.max = self.passTime;
                        object.allData = result.ListPipe;
                        object.data = result;
                        self.diffusionData = Object.assign({},result);
                        WindowsEvent.MyDispatchEvent("DiffusionDraw",object);
                        WindowsEvent.MyDispatchEvent("DiffusionSourcePosition",self.sourceId);
                    })
            }
           
        },
        SourceAnalysis:function(){
            if(this.sourceId==""||this.passTime=="")
                alert("请检查输入参数")
            else
            {
                this.isDiffusion = true;
                this.sliderValue = Number(this.passTime);
                this.step = this.passTime/5;
                for(var i=0;i<=5;i++)
                {
                    this.sliderLabelArray[i] = i*this.step;
                }
                this.max = Number(this.passTime);
                var self = this;
                axios.get(urlClass.axiosUrl+"NodeTraceReverse"+"/"+this.sourceId+"/"+this.value+"/"+this.passTime+"/"+"pipe")
                    .then(function(response){
                        var result = response.data;
                        var object = new Object();
                        object.min = 0;
                        object.max = self.passTime;
                        object.allData = result.ListPipe;
                        object.data = result;
                        self.diffusionData = Object.assign({},result);
                        WindowsEvent.MyDispatchEvent("DiffusionDraw",object);
                        WindowsEvent.MyDispatchEvent("DiffusionSourcePosition",self.sourceId);
                    })
            }
        },
         myEventListener:function(event){
              var typeTemp = event.detail.type;
              var dataTemp = event.detail.data;
              if(typeTemp=="DiffusionMapClickReturn"){
                  this.sourceId = dataTemp;
              }
         },
        selectClick:function(){
            this.sourceId = '';
            WindowsEvent.MyDispatchEvent("DiffusionMapClick",true);
        },
        change:function(event){
            WindowsEvent.MyDispatchEvent("DiffusionClear",true);
            console.log(this.value)
        }
    }
}
</script>
<style scoped>
.sliderClass{
    margin-left: 10px;
    margin-right: 10px;
}
.btnDivClass{
    width: 100%;
    text-align: center;
    padding-top: 20px;
}
.btnClass{
    font-family: center;
    font-size: 12px;
    height: 28px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top:8px;
    padding-bottom:8px;
    border-radius: 2px;
}
.divClass{
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    text-align: center;
    padding-top: 20px;
}
.sliderPlayerClass{
    text-align: center;
    margin-left: 20%;
    margin-top: 20px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
}
.sliderLabelClass{
    margin-left: 10px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
}
.titleClass{
    font-size: 16px;
    padding-left: 100px;
    width:100%
}
</style>



