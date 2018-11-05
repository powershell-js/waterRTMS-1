<template>
    <div class="outbox" :style="{height:minHeight+'px'}">
        <div class="inbox" :style="{height:inminHeight+'px'}">
          <!--左侧内容-->
            <div class="inleftbox" :style="{height:inminHeight+'px'}">
              <div class="boxone">
                 <Indextable/>
              </div>
              <div class="boxtwo">
                <Control/>
              </div>
             
              <div class="boxthree" :style="{height:lowminHeight+'px'}">
                <Tablist/> 
              </div>
            </div>
            <!--右侧内容-->
            <div class="inrightbox" :style="{height:inminHeight+'px'}">
              <div class="rightboxone">
                <mytdt-map style="height:100%;width:100%"></mytdt-map>
              </div>
              <div class="rightboxtwo" :style="{minHeight:rightdownlowminHeigh+'px'}">
                <EventtabList/>
              </div> 
            </div>
        </div>
    </div>
</template>
<script>
import Indextable from '@/components/Rcdd/components/indextable'
import Control from '@/components/Rcdd/components/controler'
import Tablist from '@/components/Rcdd/components/tablist'
import EventtabList from '@/components/Rcdd/components/eventtablist'
import MytdtMap from "@/components/mytdt/RcddMap";
export default {
  name: "Index",
  components:{
    Indextable,
    Control,
    Tablist,
    EventtabList,
    MytdtMap
  },
  data() {
    return {
      minHeight: 0,
      inminHeight: 0,
      lowminHeight: 0,
      rightdownlowminHeigh:0
    };
  },
  mounted() {
    this.minHeight = document.documentElement.clientHeight ;
    this.inminHeight = document.documentElement.clientHeight - 40;
    this.lowminHeight = document.documentElement.clientHeight - 374+80;
    this.rightdownlowminHeight = document.documentElement.clientHeight - 40-356;
    var that = this;
    window.onresize = function() {
      that.minHeight = document.documentElement.clientHeight ;
      that.inminHeight = document.documentElement.clientHeight - 40;
      that.lowinHeight = document.documentElement.clientHeight - 374+80;
      that.rightdownlowminHeight =document.documentElement.clientHeight - 40-356;
    };
  },
  methods: {
    
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
@import "../../sass/style.scss";
$background: #201717;
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
  /*   background-color: aqua; */
}
.inbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: -moz-calc(100% - 40px);
  width: -webkit-calc(100% - 40px);
  width: calc(100% - 40px);
 /*  background-color: rgb(22, 235, 93); */
}
.inleftbox {
 /*  width: 60%; */
 width: 1128px;
 /*  background-color: blueviolet; */
} 
.inrightbox {
  width: 40%;
 /*  background-color: rgb(15, 81, 143);*/
} 
//左侧样式
.boxone {
  width: 100%;
  height: 206px;
  /* background-color: #201717; */
}
.boxtwo {
   display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 48px;
  background-color: #fff;
}
.boxthree {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  width: 100%;
/*   background-color: #c5f35b; */
  overflow: auto;
}


//右侧侧样式
.rightboxone{
   width: 100%;
  height: 356px;
  background-color: #09a109;
}
.rightboxtwo{
 display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  width: 100%;
/*   background-color: #d35786; */
  overflow: auto;

}
</style>

