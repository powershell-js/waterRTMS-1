<template>
   <div class="djsjdtoutbox">
       <div class="djsjdtbox2">
          <div class="djsjdtbox2-1" :class="jtnum==true?'iscolorshow':''">{{showdjstime}}</div>
       </div>
       <div class="djsjdtbox2xj">
         <newtime/>
       </div>
       <div id="djsjdtbox3">
         <progress class="djsjdtbox3-1" id="myProgress" value="0" max=secondtime style="background-color: #abe931;"></progress>
       </div>
    </div>
</template>
<script>
import Bus from "@/bus.js";
import newtime from "@/components/rcdd/components/indextable/newtime";
export default {
  name: "IndextableDaojishijdt",
  components: {
    newtime
  },
  data() {
    return {
      date: "",
      time2: "",
      showdjstime:"",
      secondtime:"",
  jtnum:false
    };
  },
watch: {
    showdjstime:{
      handler: function (val, oldVal) { 
         if(this.showdjstime<"00:00:30"&&this.showdjstime>"00:00:00"){
        this.jtnum=true
        console.log("showdjstime"+this.showdjstime)
      }else{
         this.jtnum=false
      }
      },
      deep: true
    },
   
   
  },
  mounted: function() {
    let _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    Bus.$on("toptabledjs", e => {
      _this.secondtime= e.Minutes * 60;
      _this.time2 = e.Minutes * 60; /* 　console.log(`传来的数据是：${e}`) */
      /*  alert(_this.secondtime) */
    });

    this.djs = setInterval(function() {
      let jdtdata= _this.secondtime;
      let djsdata =_this.time2--;
      console.log(djsdata)
      var hh = parseInt((djsdata / 60 / 60) % 24, 10); //计算剩余的小时数
      var mm = parseInt((djsdata / 60) % 60, 10); //计算剩余的分钟数
      var ss = parseInt(djsdata % 60, 10); //计算剩余的秒数
      hh = checkTime(hh);
      mm = checkTime(mm);
      ss = checkTime(ss);
       _this.showdjstime= hh + ":" + mm + ":" + ss;
     var myProgress = document.getElementById("myProgress");
            var value = myProgress.value;
            value += 1
            if (value == jdtdata) {
                value = 0
            }
      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
    }, 1000);
  },
  //实例销毁之前调用。主要解绑一些使用addEventListener监听的事件等
  beforeDestroy: function() {
    if (this.djs) {
      clearInterval(this.djs); //在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>
<style lang="scss" scoped>
.djsjdtoutbox {
  width: 100%;
}
.djsjdtbox2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20px;
    line-height: 20px;
}
.djsjdtbox2-1 {
  color: #abe931;
  font-size: 20px;
  font-family: "微软雅黑";
  font-weight: bold;
  margin-left: 10px;
}

#djsjdtbox3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  /* border:1px  #7389ab solid; */
  width: 100%;
}
.djsjdtbox3-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  /*   border:1px #abe931 solid; */
  width: 100%;
}
progress {
  margin-top: 6px;
  height: 2px;
  background-color: #abe931 !important;
}
progress::-webkit-progress-bar {
  background-color: #d7d7d7;
}
progress::-webkit-progress-value {
  background-color: #abe931 !important;
}
progress {
  color: #abe931 !important; /*兼容IE10的已完成进度背景*/
  border: none;
  background: #d7d7d7; /*这个属性也可当作Chrome的已完成进度背景，只不过被下面的::progress-bar覆盖了*/
}

progress::-webkit-progress-bar {
  background: #d7d7d7;
}

progress::-webkit-progress-value,
progress::-moz-progress-bar {
  background-color: #abe931 !important;
}
.iscolorshow{
  color: red
}
</style>


