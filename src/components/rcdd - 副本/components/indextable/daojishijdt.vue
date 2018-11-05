<template>
   <div class="djsjdtoutbox">
       <div class="djsjdtbox2">
          <div class="djsjdtbox2-1" id="timer"></div>
       </div>
       <div id="djsjdtbox3">
        <progress class="djsjdtbox3-1" id="myProgress" value="0" max="900" style="background-color: #abe931;"></progress>
       </div>
    </div>
</template>
<script>
export default {
  name:"IndextableDaojishijdt",
  data() {
    return {
      date: ""
    };
  },
  //实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el 还不可用。需要初始化处理一些数据时会比较有用
  created: function() {},
  //el挂载到实例上后调用，一般我们的第一个业务逻辑会在这里开始
  mounted: function() {
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.djs = setInterval(function() {
       var seconds = new Date().getMinutes() * 60 + new Date().getSeconds();
            var nowmin = new Date().getMinutes()
            var cycle = 15;
            var ts = ((parseInt(nowmin / 15) + 1) * 15) * 60 - seconds;
            var hh = parseInt(ts / 60 / 60 % 24, 10); //计算剩余的小时数
            var mm = parseInt(ts / 60 % 60, 10); //计算剩余的分钟数
            var ss = parseInt(ts % 60, 10); //计算剩余的秒数
            hh = checkTime(hh);
            mm = checkTime(mm);
            ss = checkTime(ss);
            document.getElementById("timer").innerHTML = hh + ":" + mm + ":" + ss;
            var myProgress = document.getElementById("myProgress");
            myProgress.value = 900 - ts;
            var value = myProgress.value;
            value = myProgress.value;
            value += 1
            if (value == 900) {
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
.djsjdtoutbox{
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
}
.djsjdtbox2-1{
  color: #abe931;
  font-size: 30px;
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
  width:100%;
}
Progress{
  margin-top: 6px;
    height: 2px;
    background-color: #abe931!important;
    
}
progress::-webkit-progress-bar
{
       background-color:#d7d7d7;
}
progress::-webkit-progress-value
{
     background-color:#abe931!important;
}
progress
{
   color:#abe931!important; /*兼容IE10的已完成进度背景*/
   border:none;
   background:#d7d7d7;/*这个属性也可当作Chrome的已完成进度背景，只不过被下面的::progress-bar覆盖了*/      
   
}

progress::-webkit-progress-bar

{
   background:#d7d7d7;
}

progress::-webkit-progress-value,
progress::-moz-progress-bar
{
   background-color:#abe931!important;
}
</style>


