<template>
    <div class="searchoutbox">
        <div class="leftbox">
               <div class="leftinbox1">
                     <div class="inleftbox">
                      <div class="leftin1">
                        <div class="wfont"> 日供水量</div>
                        <div> <input type="text" placeholder="输入日供水量" v-model="message1" v-bind:disabled="checked"></div>
                        <div class="wdw">万m3</div>
                     </div>
                    <div class="leftin2">
                      <div class="pfont">控制点最小压力</div>
                      <input type="text" name="" id="" v-model="message2" placeholder="输入控制点最小压力" v-bind:disabled="checked">
                      <div class="pdw">MPa</div>
                    </div>
                </div>
                <div class="inrightbox">
                     <div class="leftin3" @click="getInfo">查询</div>
                </div>
               </div>
               <div class="leftinbox2" >
                 <!--   <el-radio v-model="radio" label="1" class="check1">考虑当前运行状态</el-radio> -->
                   <!-- <el-radio v-model="radio" label="2" class="check2">选择状态2</el-radio> -->
                <el-checkbox v-model="checked" class="check1">考虑当前运行状态</el-checkbox>
               </div>
          </div>
            <ul class="rightbox tabs">
            <li class="rightboxin1 rightboxin" v-for="(item,index) in tabsParam" :key="item.tabsParam"
                 @click="toggleTabs(index)"
                  :class="{active:index===nowIndex}">{{item}}
               </li>
            </ul>
    </div>
</template>
<script>
/* import {mapActions} from "vuex"; */
export default {
  name: "Search",
  data() {
    return {
      checked: false,
      message1:"",
      message2:"",
      tabsParam: [
        "历年高峰供水调度方案",
        "历年节假日供水调度方案",
        "历年水厂停产减产调度方案",
        "历年极端气候调度方案",
        "历年爆管事故调度方案"
      ],
      nowIndex: 0,
      isShow: false
    };
  },
  methods: {
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
      console.log(this.nowIndex)
    },
  
  getInfo(){
   /*  alert(this.message1)
    alert(this.message2)
     alert(this.nowIndex) */
     var that=this;
    /*  that.ec1(that.ec2(that.ec3(that.ec4(that.ec5(that.ec6()))))); */
     this.$store.dispatch("list1")
            this.$store.dispatch("list2")
              this.$store.dispatch("list3")
     
  },
  ec1(){
    alert("1")
  },
  ec2(){
    alert("2")
  },
  ec3(){
    alert("3")
  },
   ec4(){
    alert("4")
  },
   ec5(){
    alert("5")
  },
    ec6(){
    alert("6")
  }
  }
};
</script>
<style lang="scss" scoped>
.searchoutbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 166px;
}
.leftbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  min-width: 1230px;
  width: -moz-calc(100% - 287px);
  width: -webkit-calc(100% -287px);
  width: calc(100% - 287px);
  border-right: 1px #e4e4ec solid;
  /*   background-color: aqua */
}
.leftinbox1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  /*   background-color: aqua */
}
.leftinbox2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 40px;
  /*   background-color: aqua */
}
.check1 {
  margin: -10px 60px 0px 90px;
}
.check2 {
  margin: -10px 0px 0px 0px;
}
.inleftbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 80%;
  min-width: 1040px;
  margin: 0 20px;
  /*  background-color: aqua */
}
.leftin1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.leftin2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 40px;
}
.inrightbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
  cursor: pointer;
  /*   background-color: aqua */
}

.wfont {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
  margin-right: 20px;
  width: 60px;
  height: 21px;
  line-height: 21px;
}
.wdw {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
  margin-left: 20px;
  width: 37px;
  height: 21px;
  line-height: 21px;
}
input {
  /*  width: 432px; */
  width: 22.5vw;
  min-width: 120px;
  height: 34px;
  background-color: #f0f0f1;
}
.pfont {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
  margin-right: 20px;
  width: 98px;
  height: 21px;
  line-height: 21px;
}
.pdw {
  font-family: "微软雅黑";
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
  margin: 0 20px;
  width: 37px;
  height: 21px;
  line-height: 21px;
}
input::-webkit-input-placeholder {
  padding-left: 5px;
  color: #acb3ba;
}
input:-moz-placeholder {
  margin-left: 5px;
  color: #acb3ba;
}
input::-moz-placeholder {
  margin-left: 5px;
  color: #acb3ba;
}
input:-ms-input-placeholder {
  margin-left: 5px;
  color: #acb3ba;
}
.leftin3 {
  width: 132px;
  height: 48px;
  background-color: #70991f;
  border-radius: 5px;
  font-family: "微软雅黑";
  font-size: 18px;
  color: #e2ebd2;
  text-align: center;
  line-height: 48px;
}
.rightbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 287px;
  min-width: 158px;
}
.rightboxin {
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: bold;
  color: #6e7b8b;
  height: 34px;
  line-height: 30px;
  text-align: center;
  width: 100%;
  border-bottom: 1px #e4e4ec solid;
  cursor: pointer;
}

.inrightboxin5 {
  color: #6e7b8b;
  line-height: 28px;
  text-align: center;
  height: 28px;
  width: 100%;
  cursor: pointer;
}
.active {
  color: #fff;
  background-color: #70991f;
  /*   border-bottom: 2px #548ff6 solid; */
}
</style>


