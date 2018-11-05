<template>
    <div class="topbox1">
                        <div class="diaodudjs">调度倒计时</div>
                    <div id="clock">
                        <p class="time">{{date | formatDate }}</p>
                    </div>
                        
                    </div>
</template>
<script>
export default {
    name:"newtime",
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
    this.timer = setInterval(function() {
      _this.date = new Date(); //修改数据date
      /* alert(_this.date) */
    }, 1000);
  },
  //实例销毁之前调用。主要解绑一些使用addEventListener监听的事件等
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer); //在Vue实例销毁前，清除我们的定时器
    }
  },
  filters: {
    formatDate: function(value) {
      //在月份、日期、小时等小于10前面补0
      var padDate = function(value) {
        return value < 10 ? "0" + value : value;
      };
      var date = new Date(value);
      var hours = padDate(date.getHours());
      var minutes = padDate(date.getMinutes());
      var seconds = padDate(date.getSeconds());
      return hours + ":" + minutes + ":" + seconds;
    }
  },
}
</script>
<style lang="scss" scoped>
.topbox1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
 /*  background-color: chartreuse; */
}
.diaodudjs {
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
 /*  margin-top: 6px; */
  font-family: "微软雅黑";
}
p {
  margin: 0;
  padding: 0;
}
#clock {
  font-family: "Share Tech Mono", monospace;
  color: #ffffff;
  color: #daf6ff;
  font-weight: bold;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 1);
  margin-right: 10px;
}
#clock .time {
  letter-spacing: 0.05em;
  font-size: 12px;
  padding: 5px 0;
}
#clock .date {
  letter-spacing: 0.1em;
  font-size: 24px;
}
#clock .text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}
</style>


