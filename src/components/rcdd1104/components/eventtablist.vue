<template>
    <div class="box">
       <ul class="listbox tabs">
           <li class="li-tab" v-for="(item,index) in tabsParam" :key="item.tabsParam"
                 @click="toggleTabs(index)"
                  :class="{active:index===nowIndex}">{{item}}
               </li>
       </ul>
       <div class="list">
           <!-- <div class="kedu"></div> -->
            <even-list1 v-show="nowIndex===0"></even-list1>
        <even-list2 v-show="nowIndex===1"></even-list2>
        <even-list3 v-show="nowIndex===2"></even-list3>
        
       </div>
    </div>
</template>
<script>
import EvenList1 from "@/components/rcdd/components/eventlist/evenlist1";
import EvenList2 from "@/components/rcdd/components/eventlist/evenlist2";
import EvenList3 from "@/components/rcdd/components/eventlist/evenlist3";
export default {
  name: "EventtabList",
  data() {
    return {
      tabsParam: [
        "报警列表",
        "热线信息",
        "工程作业信息",
       
      ],
      nowIndex: 0,
      isShow: false
    };
  },
  methods: {
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
    }
  },
  components: {
    EvenList1,
    EvenList2,
    EvenList3
  }
};
</script>
<style lang="scss" scoped>
.box {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  /*   margin: 0 20px; */
  width: 100%;
  
}
.listbox {
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
/*   min-width: 1128px; */
  height: 40px;
  color: #788493;
   background-color: #f5f5f6;
}
.listbox > li {
  width: 255px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px #e4e4ec solid;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  cursor: pointer;
}
.active {
  color: #fff;
  background-color: #70991f;
  /*   border-bottom: 2px #548ff6 solid; */
}
.list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction:column;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
/* border: 1px #e4e4ec solid; */
}
/* .kedu{
    width: 100%;
    height:28px;
    background-color: #fff;
    border: 1px #e4e4ec solid;
} */
</style>



