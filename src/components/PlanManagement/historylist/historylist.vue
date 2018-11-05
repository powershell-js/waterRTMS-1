<template>
    <div class="outbox"  :style="{height:(historyHeight-3)+'px'}">
       <div class="titlebox">
           <div class="line"></div>
           <div class="linefont">历史调度方案列表</div>
       </div>
       <div class="gdtlistbox" :style="{height:historylistHeight+'px'}">
              <div class="gdtlistboxin">
                  <div class="inbox" v-for="(item,index) in list" :key="index">
                    <!-- 第一部分 -->
                        <div class="contentbox1" :id="'a'+index">
                                <div class="gdbox">
                                        <div class="gdbox1 gdboxs">
                                            <div class="scolor">日期</div>
                                            <div class="sblod">{{list[index].data}}</div>
                                        </div>
                                         <div class="gdbox2 gdboxs">
                                             <div class="scolor">总供水量(万m3)</div>
                                             <div>{{list[index].w}}</div>
                                         </div>
                                          <div class="gdbox3 gdboxs">
                                              <div class="scolor">最低控制点压力(MPa)</div>
                                               <div>{{list[index].p}}</div>
                                          </div>
                                </div>


                        </div>
            </div>
              </div>
       </div>
    </div>
</template>
<script>
export default {
  name: "Historylist",
  data() {
    return {
      historylistHeight: 0,
     historyHeight:0,
      list: [
        { data: "2018.07.06", w: 168.2, p: 0.21 },
        { data: "2018.08.05", w: 167.9, p: 0.22 },
        { data: "2018.08.16", w: 168.6, p: 0.24 },
        { data: "2018.08.26", w: 168.7, p: 0.21 },
        { data: "2018.09.06", w: 167.6, p: 0.23 },
        { data: "2018.09.13", w: 168.3, p: 0.21 },
        { data: "2018.10.03", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 },
        { data: "2018.10.06", w: 12465, p: 45654 }
      ]
    };
  },
  mounted() {
    this.historylistHeight = document.documentElement.clientHeight - 329;
     this.historyHeight = document.documentElement.clientHeight - 286;
    var that = this;
    window.onresize = function() {
      that.historylistHeight = document.documentElement.clientHeight - 329;
      that.historyHeight = document.documentElement.clientHeight - 286;
    };
  }
};
</script>
<style lang="scss" scoped>
.outbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
/*   height: 100%; */
  width: 285px;
}
.titlebox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 41px;
  width: 285px;
  color: #6e7b8b;
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: bold;
  line-height: 41px;
  border-bottom: 1px #e4e4ec solid;
}
.line {
  height: 40px;
  width: 4px;
  background-color: #70991f;
}
.linefont {
  margin-left: 10px;
   height: 41px;
     line-height: 41px;
}
.gdtlistbox {
  width: 285px;
  /*  height: 643px; */
/*   height: 66.35706914vh; */
  overflow: auto;
  /* background-color: brown */
}
.gdtlistboxin{
  height: 100%;
}
.inbox {
  width: 100%;
 /*  height: 100%; */
}
.gdtlistbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.gdtlistbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
}

.gdtlistbox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
 /*  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2); */
  border-radius: 10px;
  background: #fff;
}
.contentbox1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 109px;
  width: 100%;
  border-bottom: 1px #e4e4ec solid;
}
.contentbox1:hover {
  background-color: #f0f0f1;
}
.gdbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  height: 109px;
  width: 285px;
  margin-left: 20px;
  cursor: pointer;
}
.gdboxs {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 245px;
}
.gdbox1 {
  margin-bottom: 5px;
}
.gdbox2 {
  margin-bottom: 5px;
}
.gdbox3 {
  margin-top: 5px;
}
.scolor {
  font-family: "微软雅黑";
  font-size: 12px;
  color: #acb3ba;
}
.sbold {
  font-family: "微软雅黑";
  font-size: 12px;
  color: #6e7b8b;
  font-weight: bold;
}
</style>


