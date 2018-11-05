<template>
    <div class="box">
        <div class="controlface">控制面板</div>
        <div class="better" v-show="false">优化调度</div>
    </div>
</template>
<script>
export default {
    name:"Control"
}
</script>
<style lang="scss" scoped>
.box{
    display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  min-width:980px;
  height: 48px;
  border: 1px #e4e4ec solid;
}
.controlface{
    font-size: 18px;
    font-family: "微软雅黑";
    font-weight: bold;
    color:#788493;
}
.better{
    width: 100px;
    height: 30px;
    background-color: #70991f;
    border-radius: 5px;
   font-size: 14px;
   text-align: center;
   line-height: 30px;
    font-family: "微软雅黑";
    color:#fff; 
    cursor: pointer;
}
</style>


