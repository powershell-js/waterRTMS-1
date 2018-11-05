<template>
    <div>
         <div class="outbox">
      <div class="contentinboxleft"></div>
      <div class="contentinboxright" id="contentinboxrightw"><img id="slidingImg" class="kximg" src="~/assets/img/时间刻度_07.png" /></div>
    </div>
    </div>
</template>
<script>
export default {
    name:"Line"
}
</script>
<style lang="scss" scoped>
    .outbox {
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
      height: 154px;
      width: 1128px;
      border-top: 1px #e4e4ec solid;
      border-left: 1px #e4e4ec solid;
      border-right: 1px #e4e4ec solid;
      z-index: 3;
    }

    .contentinboxleft {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      height: 154px;
      width: 254px;
      border-right: 1px #e4e4ec solid;
      border-top: none;
      border-bottom: none;
      cursor: pointer;
    }

    .contentinboxright {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      position: relative;
    }

    .kximg {
      position: absolute;
      left: 109px;
    }

</style>


