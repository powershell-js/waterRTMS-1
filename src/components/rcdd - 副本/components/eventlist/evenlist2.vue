<template>
<div class="box" :style="{height:evenlistHeight+'px'}">
    <div class="inbox" v-for="(item,index) in list" :key="index"> 
            <!-- 第一部分 -->
    <div class="contentbox1" :id="'a'+index">
        <div class="titlebox">
            <div class="intitlebox intitlebox1">{{list[index].name}}</div>
             <div class="intitlebox intitlebox2"> <span>2017.12.06</span><span class="time">18:12:36</span></div>
              <div class="intitlebox intitlebox3"> 
                  <div class="event1">持续时间：<span class="tefont">1.1小时</span></div>
                   <div class="event2">事件状态：<span class="tefont">事件排查</span></div>
                   <div class="event3"><img src="../../../../assets/img/深水_日常调度_切图_68.png" alt=""> <span class="tefont">梅林水厂3#泵出现异常...</span><span>（09/11&nbsp;08:20:00）</span></div>
              </div>
            <!-- <div class="intitlebox intitlebox1"> {{this.name}}</div>
             <div class="intitlebox intitlebox2"> <span>{{this.date}}</span><span class="time">{{this.time}}</span></div>
              <div class="intitlebox intitlebox3"> 
                  <div class="event1">持续时间：<span class="tefont">{{this.continuetime}}</span></div>
                   <div class="event2">事件状态：<span class="tefont">{{this.eventcheck}}</span></div>
                   <div class="event3"><img src="../../../assets/img/深水_日常调度_切图_68.png" alt=""> <span class="tefont">{{this.juntievent}}</span><span>{{this.juntieventtime}}</span></div>
              </div> -->
        </div>
        <ul class="listbox">
            <li><img src="../../../../assets/img/深水_日常调度_切图_41.png" alt=""></li>
            <li>爆管</li>
            <li><span class="num">42531</span>m3/h</li>
           
        </ul>
   

     </div>
    </div>
</div>
</template>
<script>
export default {
  name: "EvenList2",
  data() {
    return {
      evenlistHeight:0,
      list:[{  name: "1北京中路DN500管道爆管",
      date: "2017.12.06",
      time: "18:12:36",
      continuetime: "1.1小时",
      eventcheck: "事件排查",
      juntievent: "梅林水厂3#泵出现异常...",
      juntieventtime: "（09/11&nbsp;08:20:00）"},
      {
            name: "2南院中路DN500管道爆管",
      date: "2017.12.06",
      time: "18:12:36",
      continuetime: "1.1小时",
      eventcheck: "事件排查",
      juntievent: "梅林水厂3#泵出现异常...",
      juntieventtime: "（09/11&nbsp;08:20:00）"
      },
       {
            name: "3南院中路DN500管道爆管",
      date: "2017.12.06",
      time: "18:12:36",
      continuetime: "1.1小时",
      eventcheck: "事件排查",
      juntievent: "梅林水厂3#泵出现异常...",
      juntieventtime: "（09/11&nbsp;08:20:00）"
      },
       {
            name: "4南院中路DN500管道爆管",
      date: "2017.12.06",
      time: "18:12:36",
      continuetime: "1.1小时",
      eventcheck: "事件排查",
      juntievent: "梅林水厂3#泵出现异常...",
      juntieventtime: "（09/11&nbsp;08:20:00）"
      },
       {
            name: "5南院中路DN500管道爆管",
      date: "2017.12.06",
      time: "18:12:36",
      continuetime: "1.1小时",
      eventcheck: "事件排查",
      juntievent: "梅林水厂3#泵出现异常...",
      juntieventtime: "（09/11&nbsp;08:20:00）"
      },
       {
            name: "6南院中路DN500管道爆管",
      date: "2017.12.06",
      time: "18:12:36",
      continuetime: "1.1小时",
      eventcheck: "事件排查",
      juntievent: "梅林水厂3#泵出现异常...",
      juntieventtime: "（09/11&nbsp;08:20:00）"
      }, {
            name: "7南院中路DN500管道爆管",
      date: "2017.12.06",
      time: "18:12:36",
      continuetime: "1.1小时",
      eventcheck: "事件排查",
      juntievent: "梅林水厂3#泵出现异常...",
      juntieventtime: "（09/11&nbsp;08:20:00）"
      }
      ],
     /*  name: "南院中路DN500管道爆管",
      date: "2017.12.06",
      time: "18:12:36",
      continuetime: "1.1小时",
      eventcheck: "事件排查",
      juntievent: "梅林水厂3#泵出现异常...",
      juntieventtime: "（09/11&nbsp;08:20:00）" */
    };
  },
  mounted(){
     this.evenlistHeight = document.documentElement.clientHeight -476;
    window.onresize = function() {
    that.evenlistHeight = document.documentElement.clientHeight -476;
    };
  }
};
</script>
<style lang="scss" scoped>
.box {
  min-width: 640px;
 /*  height: 491px; */
  /* height: 50.67079463vh; */
  overflow: auto;
}
.box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
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
  width: 100%;
  height: 100%;
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
  height: 114px;
  width: 100%;
  border: 1px #e4e4ec solid;
}
.contentbox1:hover {
  background-color: #f0f0f1;
}
.titlebox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  height: 114px;
  /* width: 630px; */
    width:85%;
  min-width: 460px;
  margin-left: 20px;
  border-right: 1px #e4e4ec solid;
  cursor: pointer;
}

.intitlebox {
 /*  width: 96.82%;
  min-width: 535px; */
  height: 24px;
  text-align: start;
  padding-left: 10px;
  font-family: "微软雅黑";
  line-height: 24px;
}
.intitlebox1 {
  font-size: 18px;
  font-weight: bold;
  color: #788493;
}
.intitlebox2 {
  font-size: 12px;
  color: #c4c9d0;
  margin: 2px 0 5px 0;
}
.intitlebox3 {
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
  font-size: 12px;
  color: #c4c9d0;
}
.event2 {
  margin: 0 25px 0 25px;
}
.tefont {
  font-weight: bold;
  color: #788493;
}
.listbox {
  list-style: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
          width: 15%;
          min-width: 80px;
}
.listbox > li {
  font-size: 12px;
  font-family: "微软雅黑";
  margin: 0 20px;
  color: #bcc2cb;
}
.bgimg1{
  width: 48px;
  height: 48px;
  background-image: url(../../../../assets/img/深水_日常调度_切图_53.png)
}
.bgimg2{
  width: 48px;
  height: 48px;
  background-image: url(../../../../assets/img/深水_日常调度_切图_51.png)
}
.bgimg3{
  width: 48px;
  height: 48px;
  background-image: url(../../../../assets/img/深水_日常调度_切图_41.png)
}
.num {
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  margin: 0 5px;
  color: #788493;
}
</style>



