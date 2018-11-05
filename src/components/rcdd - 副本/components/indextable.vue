<template>
    <div class="outbox">
        <div class="inbox">
            <!--左侧部分  -->
            <div class="tableleft">
                <div class="topbox">
                    <div class="topbox1">
                        <div class="diaodudjs">调度倒计时</div>
                    <div id="clock">
                        <p class="time">{{date | formatDate }}</p>
                    </div>
                        
                    </div>
                   <div class="topbox2">
                      <IndextableDaojishijdt/>
                   </div>
                    <!-- <div class="topbox2">
                        <div>00:25:33</div>
                    </div>
                    <div id="topbox3"><div class="topbox3-1"></div></div> -->
                </div>
                <div class="downbox">
                    <div class="downbox1">
                        <div class="dangqiangsl">当前总供水量（万m3）</div>
                        <div class="downbox1-bfb"><img src="../../../assets/img/深水_日常调度_切图01_23.png" alt=""> 10%</div>
                    </div>
                    <div class="downbox2">
                        <div>25361</div>
                    </div>
                </div>
            </div>
            <!-- 右侧部分 -->
            <div class="tableright">
              <TopTable/>
            </div>
        </div>
    </div>
</template>
<script>
import TopTable from '@/components/rcdd/components/toptable'
import IndextableDaojishijdt from '@/components/rcdd/components/indextable/daojishijdt'
export default {
  name: "Indextable",
  components:{
    TopTable,
    IndextableDaojishijdt
  },
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
};
</script>
<style lang="scss" scoped>
.outbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 206px;
  /*  background-color: #921e1e; */
  background: url(../../../assets/img/深水_日常调度_背景_17.png) 100% 100%;
  overflow: hidden;
}
.inbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: -moz-calc(100% - 40px);
  width: -webkit-calc(100% - 40px);
  width: calc(100% - 40px);
  height: 166px;
  /*  background-color: #1e2092; */
}
.tableleft {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  min-width: 218px;
  height: 166px;
  /*  background-color: #1e9279  */
}
.topbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 83px;
/*   background-color: #101927;
  opacity: 0.6; */
  background-color: rgba(16,25,39,0.6)
  /* background-color: brown; */
}
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
}
.diaodudjs {
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 6px;
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
.topbox2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.downbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 73px;
  background-color: rgba(16,25,39,0.6)
 /*  background-color: #101927;
  opacity: 0.6; */
  /* background-color: rgb(52, 107, 209); */
}
.downbox1 {
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
.dangqiangsl{
  color: #fff;
  font-family:"微软雅黑";
  font-size: 12px;
  margin-left: 10px;
  margin-top: 10px;
}
.downbox1-bfb{
   color: #00ccff;
  font-family:"微软雅黑";
  font-size: 12px;
  margin-right: 10px;
  margin-top: 10px;
}
.downbox2 {
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
.downbox2>div{
   color: #00ccff;
  font-size: 30px;
    font-family: "微软雅黑";
    font-weight: bold;
    margin-left: 10px;
}
.tableright {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: -moz-calc(70% - 20px);
  width: -webkit-calc(70% - 20px);
  width: calc(80% - 20px);
  height: 166px;
/*   background-color: #37465d;
  opacity: 0.6; */
  background-color: rgba(55,70,93,0.6)
  /* overflow: auto; */
  /*  background-color: #69921e   */
}
</style>


