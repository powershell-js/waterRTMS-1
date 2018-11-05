<template>
    <div class="outbox" :style="{height:minHeight+'px'}">
        <div class="inbox" :style="{height:inminHeight+'px'}">
           <div class="conbox1">
               <div class="content1"><span>调度方案查询</span></div>
           </div>
             <div class="conbox2">
                 <Search/>
             </div>
               <div class="conbox3" :style="{height:historyHeight+'px'}">
                   <div class="box3left" :style="{height:(historyHeight-6)+'px'}">
                     <Historylist/>
                   </div>
                   <div class="box3right" :style="{height:(historyHeight-6)+'px'}">
                     <div class="box3rightinbox">
                       <div class="box3rightinbox1">
                       <Fytable/>
                     </div>
                      <div class="box3rightinbox2" :style="{height:historylisttab+'px'}">
                        <Tablist/>
                      </div>
                   </div>
                     </div>
               </div>
        </div>
    </div>
</template>
<script>
import Tablist from '@/components/PlanManagement/sclist/tablist'
import Search from "@/components/PlanManagement/search/Search";
import Historylist from "@/components/PlanManagement/historylist/historylist"
import Fytable from "@/components/PlanManagement/fytable/fytable"
export default {
  name: "Index",
  components: {
    Search,
    Historylist,
    Fytable,
     Tablist,
  },
  data() {
    return {
      minHeight: 0,
      inminHeight: 0,
      historyHeight: 0,
      historylisttab:0
    };
  },
  nethods:{
    historylist(){
      
    }
  },
  mounted() {
    this.minHeight = document.documentElement.clientHeight - 40;
    this.inminHeight = document.documentElement.clientHeight - 80;
    this.historyHeight = document.documentElement.clientHeight - 286;
     this.historylisttab = document.documentElement.clientHeight - 670;
    var that = this;
    window.onresize = function() {
      that.minHeight = document.documentElement.clientHeight - 40;
      that.inminHeight = document.documentElement.clientHeight - 80;
      that.historyHeight = document.documentElement.clientHeight - 266;
        that.historylisttab = document.documentElement.clientHeight - 670;
    };
  }
};
</script>
<style lang="scss" type="text/scss" scoped>

.outbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
 min-width: 1522px;
  /*   background-color: aqua; */
}
.inbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: -moz-calc(100% - 40px);
  width: -webkit-calc(100% - 40px);
  width: calc(100% - 40px);
  border: 1px #e4e4ec solid;
  /*   background-color: rgb(22, 235, 93); */
}
.conbox1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 42px;
  width: 100%;
  /*  background-color: burlywood; */
}
.content1 {
  line-height: 42px;
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
  padding-left: 20px;
  height: 42px;
  border-left: 4px #70991f solid;
  width: 100%;
  border-bottom: 1px #e4e4ec solid;
}
.conbox2 {
  height: 166px;
  width: 100%;
  border-bottom: 1px #e4e4ec solid;
}
.conbox3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
   border-bottom: 1px #e4e4ec solid;
 /*  background-color: rgb(206, 67, 171) */;
}
.box3left {
  width: 285px;
 /*  background-color: #fff; */
   border-right: 1px #e4e4ec solid;
}
.box3right {
  width: -moz-calc(100% - 285px);
  width: -webkit-calc(100% -285px);
  width: calc(100% - 285px);
  /*   height: 683px; */
    height: 70.4850361197vh;
  overflow: auto;
/*   background-color: rgb(151, 54, 54); */
}
.box3right::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.box3right::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
}

.box3right::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
 /*  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2); */
  border-radius: 10px;
  background: #fff;
}

.box3rightinbox{
  height: 100%;

}
.box3rightinbox1{
  width: 100%;
  height: 382px;
  /* background-color: #70991f */
}
.box3rightinbox2{
  width: 100%;
  background-color: #fff;
}
</style>

