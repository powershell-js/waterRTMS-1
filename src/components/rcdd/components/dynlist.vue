<template>
<div class="box" :style="{height:tablistHeight+'px'}">
    <div class="inbox">
        <!-- 上面刻度线部分 -->
        <div class="kedu">
          <Rulertop/>
          </div> 
        <!-- 第一部分 -->
    <div class="contentbox1" v-show="cont1">
        <div class="titlebox">
            <div class="intitlebox"  @click="content1"><img class="img" src="../../../assets/img/深水_日常调度_切图_55.png" alt=""> 水厂水量信息（万m3）</div>
        </div>
        <ul class="listbox">
            <li>当前进水量<span class="num">{{echats1message.CtWaterInflow}}</span></li>
            <li>预测进水量<span class="num">{{echats1message.FctWaterInflow}}</span></li>
            <li>当前供水量<span class="num">{{echats1message.CtWaterSupply}}</span></li>
            <li>预测供水量<span class="num">{{echats1message.FctWaterSupply}}</span></li>
        </ul>
         <div id="tslidingImglinen"></div>
    </div>
    <!-- 1-1部分 -->
    <div class="contentbox1-1" v-show="cont11">
        <div class="titlebox1-1">
            <div class="intitlebox1-1"  @click="content11"><img class="img" src="../../../assets/img/深水_日常调度_切图_38.png" alt=""> 水厂水量信息（万m3）</div>
            <ul class="listbox1-1">
            <li>当前进水量<span class="num1-1">{{echats1message.CtWaterInflow}}</span></li>
            <li>预测进水量<span class="num1-1">{{echats1message.FctWaterInflow}}</span></li>
            <li>当前供水量<span class="num1-1">{{echats1message.CtWaterSupply}}</span></li>
            <li>预测供水量<span class="num1-1">{{echats1message.FctWaterSupply}}</span></li>
        </ul>
        </div>
        <div class="titlebox1-2">
          <!-- 指针线 -->
           <div id="slidingImglinen"></div>
            <div class="inbox-echart">
              <Echarts1/>
            </div>
        </div>
    </div>
    <!-- 第2部分 -->
    <div class="contentbox2" v-show="cont2">
         <div class="titlebox">
            <div class="intitlebox" @click="content2"><img class="img" src="../../../assets/img/深水_日常调度_切图_55.png" alt=""> 出厂压力（MPa）</div>
        </div>
        <ul class="listbox">
            <li>当前出厂压力<span class="num">{{echats2message.CtOutPressure}}</span></li>
            <li>预测出厂压力<span class="num">{{echats2message.FctOutPressure}}</span></li>
        </ul>
         <div id="tslidingImglinen2"></div>
    </div>
        <!-- 2-1部分 -->
    <div class="contentbox2-1" v-show="cont21">
        <div class="titlebox2-1">
            <div class="intitlebox2-1" @click="content21"><img class="img" src="../../../assets/img/深水_日常调度_切图_38.png" alt="">出厂压力（MPa）</div>
            <ul class="listbox2-1">
            <li>当前出厂压力<span class="num2-1">{{echats2message.CtOutPressure}}</span></li>
            <li>预测出厂压力<span class="num2-1">{{echats2message.FctOutPressure}}</span></li>
        </ul>
        </div>
        <div class="titlebox2-2">
             <!-- 指针线 -->
          <div id="slidingImglinen2"></div>
            <div class="inbox-echart">
              <Echarts2/>
            </div>
        </div>
    </div>
    <!-- 第3部分 -->
    <div class="contentbox3" v-show="cont3">
        <div class="titlebox">
            <div class="intitlebox" @click="content3"><img class="img" src="../../../assets/img/深水_日常调度_切图_55.png" alt=""> 水厂清水池水位（m）</div>
        </div>
        <ul class="listbox">
            <li>当前清水池水位<span class="num">{{echats3message.CtWaterPoolLevel}}</span></li>
            <li>预测清水池水位<span class="num">{{echats3message.FctWaterPoolLevel}}</span></li>
        </ul>
         <div id="tslidingImglinen3"></div>
    </div>
      <!-- 3-1部分 -->
    <div class="contentbox3-1" v-show="cont31">
        <div class="titlebox3-1">
            <div class="intitlebox3-1" @click="content31"><img class="img" src="../../../assets/img/深水_日常调度_切图_38.png" alt=""> 水厂清水池水位（m）</div>
            <ul class="listbox3-1">
            <li>当前出厂压力<span class="num3-1">{{echats3message.CtWaterPoolLevel}}</span></li>
            <li>预测出厂压力<span class="num3-1">{{echats3message.FctWaterPoolLevel}}</span></li>
        </ul>
        </div>
        <div class="titlebox3-2">
             <!-- 指针线 -->
         <div id="slidingImglinen3"></div>
            <div class="inbox-echart">
                 <Echarts3/>
            </div>
        </div>
    </div>
    <!-- 第4部分 -->
    <div class="contentbox4" v-show="cont4">
        <div class="titlebox">
            <div class="intitlebox" @click="content4"><img class="img" src="../../../assets/img/深水_日常调度_切图_55.png" alt=""> 水厂供水单耗（kwh/m3•MPa）</div>
        </div>
        <ul class="listbox">
            <li>当前供水单耗<span class="num">{{echats4message.CtWaterUnitConsumption}}</span></li>
            <li>当日最大单耗<span class="num">{{echats4message.BCtWaterUnitConsumption}}</span></li>
        </ul>
         <div id="tslidingImglinen4"></div>
    </div>
    <!-- 4-1部分 -->
    <div class="contentbox3-1" v-show="cont41">
        <div class="titlebox3-1">
            <div class="intitlebox3-1" @click="content41"><img class="img" src="../../../assets/img/深水_日常调度_切图_38.png" alt=""> 水厂供水单耗（kwh/m3•MPa）</div>
            <ul class="listbox3-1">
            <li>当前供水单耗<span class="num3-1">{{echats4message.CtWaterUnitConsumption}}</span></li>
            <li>当日最大单耗<span class="num3-1">{{echats4message.BCtWaterUnitConsumption}}</span></li>
        </ul>
        </div>
        <div class="titlebox3-2">
             <!-- 指针线 -->
         <div id="slidingImglinen4"></div>
            <div class="inbox-echart">
                 <Echarts4/>
            </div>
        </div>
    </div>
    <!-- 第5部分 -->
    <div class="contentbox5" v-show="cont5">
        <div class="titlebox">
            <div class="intitlebox" @click="content5"><img class="img" src="../../../assets/img/深水_日常调度_切图_55.png" alt=""> 水厂供水总效率（%）</div>
        </div>
        <ul class="listbox">
            <li>当前供水总效率<span class="num">{{echats5message.CtWaterTotalEfficiency}}%</span></li>
            <li>当日最高总效率<span class="num">{{echats5message.HighestTotalEfficiency}}%</span></li>
            <li>当日最低总效率<span class="num">{{echats5message.LowestTotalEfficiency}}%</span></li>
        </ul>
         <div id="tslidingImglinen5"></div>
    </div>
      <!-- 5-1部分 -->
    <div class="contentbox3-1" v-show="cont51">
        <div class="titlebox3-1">
            <div class="intitlebox3-1" @click="content51"><img class="img" src="../../../assets/img/深水_日常调度_切图_38.png" alt=""> 水厂供水总效率（%）</div>
            <ul class="listbox3-1">
             <li>当前供水总效率<span class="num3-1">{{echats5message.CtWaterTotalEfficiency}}%</span></li>
            <li>当日最高总效率<span class="num3-1">{{echats5message.HighestTotalEfficiency}}%</span></li>
            <li>当日最低总效率<span class="num3-1">{{echats5message.LowestTotalEfficiency}}%</span></li>
        </ul>
        </div>
        <div class="titlebox3-2">
             <!-- 指针线 -->
          <div id="slidingImglinen5"></div>
            <div class="inbox-echart">
                 <Echarts5/>
            </div>
        </div>
    </div>
    <!-- 下面刻度线部分 -->
     <div class="kedu">
        <Rulerbottom/>
       </div> 
     <!-- 第6部分 -->
    <div class="contentbox6" v-show="cont6">
        <div class="titlebox">
            <div class="intitlebox" @click="content6"><img class="img" src="../../../assets/img/深水_日常调度_切图_55.png" alt=""> 水泵状态</div>
        </div>
        <ul class="listbox">
            <li>当前总功率（KW）<span class="num">{{message.CtTotalPower}}</span></li>
            <li>当前总效率（%）<span class="num">{{message.CtTotalEfficiency}}</span></li>
             <li>供水单耗(kW•h/m3•MPa)<span class="num">{{message.WaterUnitConsumption}}</span></li>
        </ul>
         <div id="tslidingImgline6"></div>
    </div>
   <!-- 6-1部分 -->
    <div class="contentbox6-1" v-show="cont61">
        <div class="titlebox6-1">
            <div class="intitlebox6-1" @click="content61"><img class="img" src="../../../assets/img/深水_日常调度_切图_38.png" alt=""> 水泵状态</div>
            <ul class="listbox6-1">
            <li><div>当前总功率（KW)</div><div class="num6-1">{{message.CtTotalPower}}</div></li>
            <li><div>当前总效率（%）</div><div class="num6-1">{{message.CtTotalEfficiency}}</div></li>
             <li><div>供水单耗(kW•h/m3•MPa)</div><div class="num6-1">{{message.WaterUnitConsumption}}</div></li>
        </ul>
        </div>
        <div class="titlebox6-2">
            <div class="inbox-table6-2">
               <ListTable/>
            </div>
        </div>
    </div>
 <!-- 6-1部分结束 -->

    </div>
</div>
</template>
<script>
import Bus from "@/bus.js";
import Rulertop from "@/components/rcdd/components/dynlistecharts/topruler/ruler";
import Rulerbottom from "@/components/rcdd/components/dynlistecharts/bottomruler/ruler";
import ListTable from '@/components/rcdd/components/dynlistecharts/listtable'
import Echarts1 from "@/components/rcdd/components/dynlistecharts/echarts1";
import Echarts2 from "@/components/rcdd/components/dynlistecharts/echarts2";
import Echarts3 from "@/components/rcdd/components/dynlistecharts/echarts3";
import Echarts4 from "@/components/rcdd/components/dynlistecharts/echarts4";
import Echarts5 from "@/components/rcdd/components/dynlistecharts/echarts5";
export default {
 name:"DynList",
  components:{
    ListTable,
     Echarts1,
    Echarts2,
    Echarts3,
     Echarts4,
    Echarts5,
     Rulertop,
    Rulerbottom
  },
  data(){
return{
    cont1:false,
    cont11:true,
    cont2:false,
    cont21:true,
    cont3:true,
    cont31:false,
    cont4:true,
    cont41:false,
    cont5:false,
    cont51:true,
    cont6:false,
    cont61:true,
     message:{},
      echats1message:{},
      echats2message:{},
       echats3message:{},
       echats4message:{},
       echats5message:{},
       tablistHeight:0
}
  },
   mounted(){
    let self = this
      self.LopTime();
    setInterval(function() {
      var mindata = new Date().getHours() * 60 + new Date().getMinutes();
      if (mindata % 15 == 0) {
        self.LopTime();
        console.log(mindata);
      }
    }, 60000); //在生命周期中调用LopTime（）方法
       Bus.$on('msg', (e) => {
         self.message = e
　　　　/* 　console.log(`传来的数据是：${e}`) */
       })

        Bus.$on('echats1msg', (e) => {
         self.echats1message = e
　　　　　/* console.log(`echats1msg传来的数据是：${e}`) */
       })
         Bus.$on('echats2msg', (e) => {
         self.echats2message = e
         　/* console.log(`echats2msg传来的数据是：${e}`) */
       })
       Bus.$on('echats3msg', (e) => {
         self.echats3message = e
         　/* console.log(`echats3msg传来的数据是：${e}`) */
       })
       Bus.$on('echats4msg', (e) => {
         self.echats4message = e
         　/* console.log(`echats3msg传来的数据是：${e}`) */
       })
        Bus.$on('echats5msg', (e) => {
         self.echats5message = e
         　/* console.log(`echats3msg传来的数据是：${e}`) */
       })
       this.tablistHeight = document.documentElement.clientHeight -374;
    window.onresize = function() {
     self.tablistHeight = document.documentElement.clientHeight -374;
    };
  },
  methods: {
     LopTime() {
      let timer = new Date();
      let hours = timer.getHours();
      let min = timer.getMinutes();
      let total = hours * 60 + min;
      let localnum = parseInt(total / 15);
      let Insetlinelocationline = 74 + localnum * parseFloat(760 / 96);
      let tInsetlinelocationline = 329 + localnum * parseFloat(760 / 96)-1;
       let tInsetlinelocationline4 = 329 + localnum * parseFloat(760 / 96)-1;
        let tInsetlinelocationline5 = 329 + localnum * parseFloat(760 / 96)-1;
        console.log(localnum);
      document.getElementById("slidingImglinen").style.left =Insetlinelocationline + "px";
      document.getElementById("tslidingImglinen").style.left =tInsetlinelocationline + "px";
    document.getElementById("slidingImglinen2").style.left =Insetlinelocationline + "px";
      document.getElementById("tslidingImglinen2").style.left =tInsetlinelocationline + "px";
       document.getElementById("slidingImglinen3").style.left =Insetlinelocationline + "px";
      document.getElementById("tslidingImglinen3").style.left =tInsetlinelocationline + "px";
       document.getElementById("slidingImglinen4").style.left =Insetlinelocationline + "px";
      document.getElementById("tslidingImglinen4").style.left =tInsetlinelocationline4 + "px";
       document.getElementById("slidingImglinen5").style.left =Insetlinelocationline + "px";
      document.getElementById("tslidingImglinen5").style.left =tInsetlinelocationline5+ "px";
    },
      content1(){
              this.cont1=false;
              this.cont11=true;
      },
      content11(){
              this.cont11=false;
              this.cont1=true;
      },
       content2(){
              this.cont2=false;
              this.cont21=true;
      },
      content21(){
              this.cont21=false;
              this.cont2=true;
      },
      content3(){
              this.cont3=false;
              this.cont31=true;
      },
      content31(){
              this.cont31=false;
              this.cont3=true;
      },
       content4(){
              this.cont4=false;
              this.cont41=true;
      },
      content41(){
              this.cont41=false;
              this.cont4=true;
      },
       content5(){
              this.cont5=false;
              this.cont51=true;
      },
      content51(){
              this.cont51=false;
              this.cont5=true;
      },
       content6(){
              this.cont6=false;
              this.cont61=true;
      },
      content61(){
              this.cont61=false;
              this.cont6=true;
      },
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 1128px;
 /*  height: 595px; */
  /* height: 61.4035vh; */
  overflow: auto;
}
.box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
}

.box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
 /*  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2); */
  border-radius: 10px;
  background: #fff;
}
.inbox {
  /*  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center; */
  /*   margin: 0 20px; */
  width: 100%;
  height: 100%;
}

.kedu {
  width: 100%;
  height: 28px;
  background-color: #fff;
  border: 1px #e4e4ec solid;
  border-top: none;
  border-bottom: none;
}
.contentbox1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 40px;
  width: 100%;
  border: 1px #e4e4ec solid;
  position: relative;
}
.titlebox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 40px;
  width: 254px;
  border: 1px #e4e4ec solid;
  border-top: none;
  border-bottom: none;
  cursor: pointer;
}

.intitlebox {
  width: 224px;
  height: 24px;
  text-align: start;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  opacity: 0.8;
  line-height: 24px;
  /* background-color: #fff; */
  border: 1px #e4e4ec solid;
  color: #788493;
  background-color: #ededef;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ededef));
  background: -moz-linear-gradient(top, #fff, #ededef);
}
.img {
  margin-right: 5px;
}
/* .intitlebox::before{
    background-image: url('~/assets/img/深水_日常调度_切图_55.png')
} */
.listbox {
  list-style: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.listbox > li {
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 0 20px;
  color: #bcc2cb;
}
.num {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  margin: 0 10px;
  color: #788493;
}
.contentbox1-1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  height: 154px;
  width: 100%;
  border: 1px #e4e4ec solid;
}
.titlebox1-1 {
  display: -webkit-box;
  display: -ms-flexbox;
  /*  display: flex; */
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 154px;
  width: 254px;
  border: 1px #e4e4ec solid;
  border-top: none;
  border-bottom: none;
  cursor: pointer;
}
.titlebox1-2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 154px;
  width: 75%;
  position: relative;
  /*   background-color: aqua; */
}
.inbox-echart {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  height: 134px;
  /*  width: 95%;
  background-color: #bcc2cb; */
}
.intitlebox1-1 {
  width: 224px;
  height: 24px;
  text-align: start;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  opacity: 0.8;
  line-height: 24px;
  /* background-color: #fff; */
  border: 1px #e4e4ec solid;
  margin-top: 10px;
  margin-left: 10px;
  color: #788493;
  background-color: #ededef;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ededef));
  background: -moz-linear-gradient(top, #fff, #ededef);
}

.listbox1-1 {
  list-style: none;
  width: 224px;
  /* display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start; */
  margin-top: 10px;
  margin-left: 10px;
}
.listbox1-1 > li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 5px 0;
  color: #bcc2cb;
}

.num1-1 {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  /*  margin: 0 10px; */
  color: #788493;
  margin-left: 20px;
}

.contentbox2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 40px;
  width: 100%;
  border: 1px #e4e4ec solid;
   position: relative;
}
.contentbox2-1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  height: 154px;
  width: 100%;
  border: 1px #e4e4ec solid;
  border-top: none;
}
.titlebox2-1 {
  display: -webkit-box;
  display: -ms-flexbox;
  /*  display: flex; */
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 154px;
  width: 254px;
  border: 1px #e4e4ec solid;
  cursor: pointer;
  border-top: none;
  border-bottom: none;
}
.titlebox2-2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 154px;
    position: relative;
  /*  width: 100%; */
  /*   background-color: aqua; */
}
.inbox-echart {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  height: 134px;
  /*  width: 95%;
  background-color: #bcc2cb; */
}

.intitlebox2-1 {
  width: 224px;
  height: 24px;
  text-align: start;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  opacity: 0.8;
  line-height: 24px;
  /*  background-color: #fff; */
  border: 1px #e4e4ec solid;
  margin-top: 10px;
  color: #788493;
      margin-left: 10px;
  background-color: #ededef;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ededef));
  background: -moz-linear-gradient(top, #fff, #ededef);
}

.listbox2-1 {
  list-style: none;
  width: 224px;
      margin-left: 10px;
  /* display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start; */
  margin-top: 10px;
}
.listbox2-1 > li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 5px 0;
  color: #bcc2cb;
}

.num2-1 {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  /*  margin: 0 10px; */

  margin-left: 20px;
  color: #788493;
}

.contentbox3 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 40px;
  /*  width: 100%; */
  border: 1px #e4e4ec solid;
  border-top: none;
   position: relative;
}
.contentbox3-1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  height: 154px;
  width: 100%;
  border: 1px #e4e4ec solid;
  border-top: none;
}
.titlebox3-1 {
  display: -webkit-box;
  display: -ms-flexbox;
  /*  display: flex; */
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 154px;
  width: 254px;
  border: 1px #e4e4ec solid;
  cursor: pointer;
  border-top: none;
  border-bottom: none;
}
.titlebox3-2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 154px;
    position: relative;
  /*  width: 100%; */
  /*   background-color: aqua; */
}
.inbox-echart {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  height: 134px;
  /*  width: 95%;
  background-color: #bcc2cb; */
}

.intitlebox3-1 {
  width: 224px;
  height: 24px;
  text-align: start;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  opacity: 0.8;
  line-height: 24px;
  background-color: #ededef;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ededef));
  background: -moz-linear-gradient(top, #fff, #ededef);
  border: 1px #e4e4ec solid;
  margin-top: 10px;
  color: #788493;
  margin-left: 10px;
}

.listbox3-1 {
  list-style: none;
  width: 224px;
  margin-left: 10px;
  /* display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start; */
  margin-top: 10px;
}
.listbox3-1 > li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 5px 0;
  color: #bcc2cb;
}

.num3-1 {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  /*  margin: 0 10px; */
  color: #788493;
  margin-left: 20px;
}

.contentbox4 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 40px;
  width: 100%;
  border: 1px #e4e4ec solid;
  position: relative;
}
.contentbox5 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 40px;
  /*  width: 100%; */
  border: 0.5px #e4e4ec solid;
  border-top: none;
  position: relative;
}
.contentbox6 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 40px;
  /*  width: 100%; */
  border: 0.5px #e4e4ec solid;
}
.contentbox6-1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  height: 224px;
  width: 100%;
  border: 1px #e4e4ec solid;
}
.titlebox6-1 {
  display: -webkit-box;
  display: -ms-flexbox;
  /*  display: flex; */
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 224px;
  width: 254px;
  border: 1px #e4e4ec solid;
  cursor: pointer;
  border-top: none;
  border-bottom: none;
}
.titlebox6-2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 224px;
  /*  width: 100%; */
  /*   background-color: aqua; */
}
.inbox-table6-2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  height: 224px;
  /*  width: 95%;
  background-color: #bcc2cb; */
}

.intitlebox6-1 {
  width: 224px;
  height: 24px;
  text-align: start;
  padding-left: 10px;
  border-radius: 2px;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  opacity: 0.8;
  line-height: 24px;
  background-color: #ededef;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ededef));
  background: -moz-linear-gradient(top, #fff, #ededef);
  border: 1px #e4e4ec solid;
  margin-top: 10px;
  color: #788493;
  margin-left: 10px;
}

.listbox6-1 {
  list-style: none;
  width: 224px;
  margin-left: 10px;
  /* display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start; */
  margin-top: 10px;
}
.listbox6-1 > li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 5px 0;
  color: #bcc2cb;
}

.num6-1 {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  /*  margin: 0 10px; */
  color: #788493;
  margin-left: 20px;
}

.keduline {
  width: 1px;
  height: 154px;
  background-color: red;
  z-index: 99;
  position:relative;
  left: 342px;
  top:0;
}
.keduline2 {
  width: 1px;
  height: 154px;
  background-color: red;
  z-index: 99;
  position: relative;
  left: 342px;
   top:0;
}
.keduline3 {
  width: 1px;
  height: 154px;
  background-color: red;
  z-index: 99;
  position: relative;
  left: 342px;
   top:0;
}
.keduline4 {
  width: 1px;
  height: 154px;
  background-color: red;
  z-index: 99;
  position: relative;
  left: 342px;
   top:0;
}
.keduline5 {
  width: 1px;
  height: 154px;
  background-color: red;
  z-index: 99;
  position: relative;
  left: 342px;
   top:0;
}
#slidingImglinen{
  width: 1px;
  height: 154px;
  background-color: red;
  position: absolute;
  left: 74px;
  z-index: 99;
}
#tslidingImglinen {
  width: 1px;
  height: 40px;
  background-color: red;
  position: absolute;
  left: 329px;
   z-index: 99;
}
#slidingImglinen2{
  width: 1px;
  height: 154px;
  background-color: red;
  position: absolute;
  left: 74px;
  z-index: 99;
}
#tslidingImglinen2 {
  width: 1px;
  height: 40px;
  background-color: red;
  position: absolute;
  left: 329px;
   z-index: 99;
}
#slidingImglinen3{
  width: 1px;
  height: 154px;
  background-color: red;
  position: absolute;
  left: 74px;
  z-index: 99;

}
#tslidingImglinen3 {
  width: 1px;
  height: 40px;
  background-color: red;
  position: absolute;
  left: 329px;
  z-index: 99;
}
#slidingImglinen4{
  width: 1px;
  height: 154px;
  background-color: red;
  position: absolute;
  left: 74px;
  z-index: 99;
   
}
#tslidingImglinen4 {
  width: 1px;
  height: 40px;
  background-color: red;
  position: absolute;
   left: 329px;
   z-index: 99;
}
#slidingImglinen5{
  width: 1px;
  height: 154px;
  background-color: red;
  position: absolute;
  left: 74px;
  z-index: 99;
}
#tslidingImglinen5 {
  width: 1px;
  height: 40px;
  background-color: red;
  position: absolute;
   left: 329px;
   z-index: 99;
}


</style>



