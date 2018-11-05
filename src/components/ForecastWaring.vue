<template>
    <div class="mainDivClass">
        <div style="width:50%;height:100%;padding-top:5px;padding-left:5px;padding-bottom:5px" :style="{height:mapHeight+'px'}">
            <div class="head1Class">
                <div class="title1Class">
                    <td style="padding-top:11px;padding-left:10px">管网预测变化预警</td>
                    <div class="title2Class">
                        <el-checkbox v-model="pressureChange">压力变化</el-checkbox>
                        <el-checkbox v-model="strengthChange">流速变化</el-checkbox>
                        <el-checkbox v-model="directionChange">流向变化</el-checkbox>
                    </div>
                </div>
                <div class="title3Class">
                    <div class="timeMyClass">
                        <td>模拟时间:{{modelTime}}</td>
                        <td>预测时间:{{forecastTime}}</td>
                    </div>
                    <td style="padding-top:30px">压力变化阈值(m)</td>
                    <div class="silderMyClass">
                        <div class="silderLabelMyClass">
                            <td>1</td>
                            <span :style="{width:timeLabelSpace+'px'}"></span>
                            <td>2</td>
                            <span :style="{width:timeLabelSpace+'px'}"></span>
                            <td>3</td>
                            <span :style="{width:timeLabelSpace+'px'}"></span>
                            <td>4</td>
                            <span :style="{width:timeLabelSpace+'px'}"></span>
                            <td>5</td>
                            <span :style="{width:timeLabelSpace+'px'}"></span>
                            <td>6</td>
                            <span :style="{width:timeLabelSpace+'px'}"></span>
                            <td>7</td>
                            <span :style="{width:timeLabelSpace+'px'}"></span>
                            <td>8</td>
                            <span :style="{width:timeLabelSpace+'px'}"></span>
                            <td>9</td>
                            <span :style="{width:timeLabelSpace+'px'}"></span>
                            <td>10</td>
                        </div>
                        <div>
                            <el-slider style="width:270px" v-model="sliderValue" :min='sliderMin' :max="sliderMax"
                                :step="step" show-stops>
                            </el-slider>
                        </div>
                    </div>
                     <div class="sliderPlayerClass1">
                            <img src="../../static/assets/sliderPlayer/back.png" alt="" style="cursor:pointer;padding-right:20px;width:13px;height:16px" title="后退" v-on:click="Back"><!--后退-->
                            <img src="../../static/assets/sliderPlayer/next.png" alt="" style="cursor:pointer;padding-right:20px;width:13px;height:16px" title="前进" v-on:click="Next"><!--前进-->
                    </div>
                </div>
            </div>
            <div class="TimeSliderPlayer" :style="{top:TimeSliderTop+'px'}">
                    <img src="../../static/assets/sliderPlayer/play.png" alt="" style="cursor:pointer;padding-right:20px;width:13px;height:16px;padding-top:20px"  title="播放" v-show="isPlay" v-on:click="Play">
                    <img src="../../static/assets/sliderPlayer/pause.png" alt="" style="cursor:pointer;padding-right:20px;width:13px;height:16px;padding-top:20px"  v-show="!isPlay" title="停止" v-on:click="Pause">
                    <div class="sliderPlayeringClass">
                        <td>{{sliderValueTime}}点</td>
                        <el-slider style="width:270px" v-model="sliderValueTime" :min='TimeMin' :max="TimeMax"
                                    :step="stepTime" show-stops v-on:change="sliderChange1">
                        </el-slider>
                    </div>
                    <img src="../../static/assets/sliderPlayer/back.png" alt="" style="cursor:pointer;padding-right:20px;width:13px;height:16px;padding-top:20px" title="后退" v-on:click="BackTime">
                    <img src="../../static/assets/sliderPlayer/next.png" alt="" style="cursor:pointer;width:13px;height:16px;padding-top:20px" title="前进" v-on:click="NextTime">
            </div> 
            <mytdt-map style="width:100%;height:100%;" key="mapTemp"></mytdt-map>
            
        </div>
        <div style="width:50%;height:100%;padding-top:5px;padding-left:5px;padding-bottom:5px;padding-right:5px" :style="{height:mapHeight1+'px',width:mapWidth+'px'}">
            <div class="head2Class">
                <div class="title1Class">
                    <td style="padding-top:10px;padding-left:10px">管网预测变化预警</td>
                </div>
                <div class="title3Class">
                    <div class="timeMyClass">
                        <td>模拟时间:{{modelTime}}</td>
                        <td>预测时间:{{forecastTime}}</td>
                    </div>
                </div>
            </div>
            <!-- <mytdt-map1 style="width:100%;height:100%" key="mapTemp1"></mytdt-map1> -->
        </div>
        
    </div>
</template>
<script>
import MytdtMap from "@/components/mytdt/map";
import MytdtMap1 from "@/components/mytdt/map1";
import axios from 'axios';
import urlClass from '@/components/js/UrlClass'
import WindowEvent from "@/components/js/WindowsEvent";
export default {
  name: "ForecastWaring",
  components: {
    MytdtMap,
    MytdtMap1
  },
  mounted() {
    this.TimeSliderTop = document.documentElement.clientHeight - 120;
    this.mapHeight = document.documentElement.clientHeight - 118 - 5 - 5;
    this.mapHeight1 = document.documentElement.clientHeight - 118 - 5 - 5;
    this.mapWidth = document.documentElement.clientWidth * 0.5 - 5;
    this.timeLabelSpace = 22;
    var self = this;
    window.onresize = function() {
      self.mapHeight = document.documentElement.clientHeight - 118 - 5 - 5;
      self.mapWidth = document.documentElement.clientWidth * 0.5 - 5;
      self.mapHeight1 = document.documentElement.clientHeight - 118 - 5 - 5;
    };
  },
  data() {
    return {
        interval:0,
        TimeSliderTop:0,
      TimeMax:100,
      TimeMin:0,
      sliderValueTime:0,
      stepTime:1,
      isPlay:true,
      sliderMin: 1,
      sliderMax: 10,
      timeLabelSpace: 0,
      modelTime: "2018-10-25 14:15:00",
      forecastTime: "2018-10-25 14:30:00",
      mapWidth: 0,
      mapHeight: 0,
      mapHeight1: 0,
      sliderValue: 10,
      step: 1,
      pressureChange: true,
      strengthChange: true,
      directionChange: true
    };
  },
  methods: {
      sliderChange1(){
          this.GetDrawPointData();
      },
      Play(){
            this.isPlay = !this.isPlay;
            this.interval = window.setInterval(this.Playing,2000);// this.interval = window.
        },
        Playing(){
             if(this.sliderValueTime+1<=this.TimeMax)
            {
                this.sliderValueTime = this.sliderValueTime+1;
                this.GetDrawPointData();
            }
            else
            {
                this.isPlay = true;
                window.clearInterval(this.interval);
            }
        },
        GetDrawPointData(){
             var parameterTemp = {Min:this.sliderValueTime,Max:this.sliderValueTime+1}
                  axios.post(
                    urlClass.axiosUrl+"GetPoint",
                    JSON.stringify(parameterTemp),
                    {headers: {'Content-Type':'application/json;'}}
                )   
                .then(function(respone){
                    WindowEvent.MyDispatchEvent(
                        "DrawForecastWaringNode",
                        respone.data
                        );
                })
        },
        Pause(){
            this.isPlay = !this.isPlay;
            window.clearInterval(this.interval);
        },
    Back() {
      if (this.sliderValue - 1 >= 0) {
        this.sliderValue = this.sliderValue - 1;
      }
    },
    Next() {
      if (this.sliderValue + 1 <= this.sliderMax) {
        this.sliderValue = this.sliderValue + 1;
      }
    },
      BackTime() {
          this.isPlay = true;
          window.clearInterval(this.interval);
      if (this.sliderValueTime - 1 >= 0) {
        this.sliderValueTime = this.sliderValueTime - 1;
        this.GetDrawPointData();
      }
    },
    NextTime() {
        this.isPlay = true;
        window.clearInterval(this.interval);
      if (this.sliderValueTime + 1 <= this.TimeMax) {
        this.sliderValueTime = this.sliderValueTime + 1;
        this.GetDrawPointData();
      }
    }
  }
};
</script>
<style scoped>
.sliderPlayeringClass{
    padding-right: 20px;
}
.TimeSliderPlayer {
  width: 50%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  position: absolute;
  padding-bottom:50px; 
  top: 100px;
  z-index: 99;

}
.sliderPlayerClass1 {
  padding-top: 30px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.timeMyClass {
  padding-left: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.title3Class {
  padding-right: 10px;
  height: 77px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  border: 1px #d9d9d9 solid;
}
.titleMyClass {
}
.silderMyClass {
  padding-right: 10px;
  padding-top: 10px;
}
.silderLabelMyClass {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.title2Class {
  padding-top: 11px;
  padding-right: 10px;
  height: 39px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.title1Class {
  height: 39px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  border: 1px #d9d9d9 solid;
  padding-right: 5px;
}
.head1Class {
  height: 118px;
}
.head2Class {
  height: 118px;
}
.mainDivClass {
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.mapDiv {
  border-color: blue;
}
</style>


