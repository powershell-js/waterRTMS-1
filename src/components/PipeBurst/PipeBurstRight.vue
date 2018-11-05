<template>
    <div style="width:100%" >
        <div style="width:100%">
            <td class="rightTitleClass">分析结果</td>
        </div>
         <div class="divClass">
            <td style="padding-right:10px;padding-top:5px;padding-left:5px">需关闭阀门数：</td>
            <td style="padding-top:5px">{{closeValveInfo.length}}</td>
            <td style="padding-top:5px;padding-left:10px">个</td>
        </div>
        <div class="divClass">
            <td style="padding-right:10px;padding-top:5px;padding-left:5px">停水用户数量：</td>
            <td style="padding-top:5px">{{effectUserInfo.length}}</td>
            <td style="padding-top:5px;padding-left:10px">个</td>
        </div>
        <div class="divClass">
            <td style="padding-right:10px;padding-top:5px;padding-left:5px">停水管道长度：</td>
            <td style="padding-top:5px">{{stopWaterInfo[0]}}</td>
            <td style="padding-top:5px;padding-left:10px">米</td>
        </div>
        <div class="divClass">
            <td style="padding-right:10px;padding-top:5px;padding-left:5px">停水管道容积：</td>
            <td style="padding-top:5px">{{stopWaterInfo[1]}}</td>
            <td style="padding-top:5px;padding-left:10px">立方米</td>
        </div>
        <div class="divClass">
            <td style="padding-right:5px;padding-top:5px;padding-left:5px">停水用户水量：</td>
            <td style="padding-top:5px">{{stopWaterInfo[2]}}</td>
            <td style="padding-top:5px;padding-left:10px">立方米/小时</td>
        </div>
        <div class="divClass">
            <span style="width:40%"></span>
            <el-button  class="btnClass" type="success" >导出Excel</el-button>
        </div>
        <div class="divClass" >
          <div>
            <el-tabs style="padding-right:5px;padding-top:5px;padding-left:5px" type="card" v-model="tabSelect">
            <el-tab-pane label="关闭的阀门" name="first" style="overflow-y:scroll" :style="{height:listHeight+'px'}">
                <li style="list-Style:none;width:100%;" :key="item.ElemenId" v-for="item in closeValveInfo" v-bind="closeValveInfo">
                <close-valve-infor-renderer style="height:'10px';width:100%" :closeValveInfo="item"></close-valve-infor-renderer>
                </li>
            </el-tab-pane>
            <el-tab-pane label="影响的用户" name="second" style="overflow-y:scroll" :style="{height:listHeight+'px'}">
                <li style="list-Style:none;width:100%;" :key="item.ElemenId" v-for="item in effectUserInfo" v-bind="effectUserInfo">
                <effect-user-info-renderer style="height:'10px';width:100%" :effectUserInfo="item"></effect-user-info-renderer>                
                </li>
            </el-tab-pane>
            </el-tabs>
          </div>
            
        </div>
    </div>
</template>
<script>
import WindowsEvent from "@/components/js/WindowsEvent";
import axios from "axios";
import urlClass from "@/components/js/UrlClass";
import CloseValveInforRenderer from "@/components/PipeBurst/renderer/CloseValveInfoRenderer";
import EffectUserInfoRenderer from "@/components/PipeBurst/renderer/EffectUserInfoRenderer";
export default {
  components: {
    CloseValveInforRenderer,
    EffectUserInfoRenderer
  },
  props: {
    /**
     * 关阀统计信息
     */
    stopWaterInfo: { type: Array, default: () => [0, 0, 0] },
    closeValveInfo: {
      type: Array,
      default: () => [{ ElemenId: 0, Id: 1, Diameter: 50, Addr: "111", X: 0, Y: 0 }]
    },
    effectUserInfo: {
      type: Array,
      default: () => [{ ElemenId: 0, UserNum: "123", UserName: "你好", Addr: "" }]
    }
  },
  mounted() {
    this.value = new Date().getHours();
    window.addEventListener("event_name", this.myEventListener);

    this.listHeight = document.documentElement.clientHeight - 330;
    var that = this;
    window.onresize = function() {
      that.listHeight = document.documentElement.clientHeight - 330;
    };
  },
  data() {
    return {
      listHeight: 0,
      tabSelect: "first",
      radio: 1,
      passTime: "",
      sourceId: "",
      value: 0
    };
  },
  methods: {

  }
};
</script>
<style scoped>
.btnClass {
  font-family: center;
  font-size: 12px;
  height: 28px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 2px;
}
.divClass {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  text-align: center;
  padding-top: 10px;
}
.rightTitleClass {
  font-size: 16px;
  padding-left: 100px;
  width: 100%;
}
.radioClass {
  padding-right: 10px;
  padding-top: 5px;
  padding-left: 14%;
  width: 55px;
}
.radioGroupClass {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  text-align: center;
}
</style>



