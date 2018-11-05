<template>
    <div class="outbox">
        <div class="inboxleft">
            <div class="cont1">
                 <div class="tyfont">总供水量(万m3/日)</div>
                   <div class="tynum1">168.8</div>
            </div>
            <div class="cont1">
                 <div class="tyfont">总能耗(KW)</div>
                 <div class="tynum2">13221</div>
         </div>
        <div class="cont1">
            <div class="tyfont">总供水效率(%)</div>
                 <div class="tynum3">76%</div>
        </div>
            <div class="cont1">
                <div class="tyfont">平均供水单耗（kwh/km3MPa）</div>
                 <div class="tynum4">425</div>
            </div>
        </div>
        <div class="inboxright">
          <div class="tabletopoutbox">
            <div class="tabletopinbox">压力控制点压力</div>
          </div>
            <Table/>
        </div>
    </div>
</template>
<script>
import Table from '@/components/PlanManagement/fytable/table'
export default {
  name: "Fytable",
  components:{
      Table
  }
};
</script>
<style lang="scss" scoped>
.outbox {
  width: 100%;
  height: 382px;
}
.inboxleft {
  width: 202px;
  height: 382px;
  border-right: 1px #e4e4ec solid;
  border-left: 1px #e4e4ec solid;
}
.inboxright {
  width: -moz-calc(100% - 202px);
  width: -webkit-calc(100% -202px);
  width: calc(100% - 202px);
  height: 382px;
  border-right: 1px #e4e4ec solid;
 /*  background-color: #70991f */
}
.tabletopoutbox{
width: 100%;
height: 40px;
/* background-color: #e9af3b */
}
.tabletopinbox{
   width: -moz-calc(100% - 40px);
  width: -webkit-calc(100% - 40px);
  width: calc(100% - 40px);
height: 40px;
/* background-color: #3b55e9; */
margin-left: 20px;
color: #acb3ba;
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: bold;
  line-height: 40px;
   border-bottom: 1px #e4e4ec solid;
}
.cont1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  height: 95.5px;
  width: 100%;
  border-bottom: 1px #e4e4ec solid;
}
.tyfont {
  color: #acb3ba;
  font-family: "微软雅黑";
  font-size: 12px;
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
}
.tynum1 {
  color: #70991f;
  font-family: "微软雅黑";
  font-size: 36px;
  margin-left: 10px;
}
.tynum2 {
  color: #e9af3b;
  font-family: "微软雅黑";
  font-size: 36px;
  margin-left: 10px;
}
.tynum3 {
  color: #6e7b8b;
  font-family: "微软雅黑";
  font-size: 36px;
  margin-left: 10px;
}
.tynum4 {
  color: #d56459;
  font-family: "微软雅黑";
  font-size: 36px;
  margin-left: 10px;
}


</style>


