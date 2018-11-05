<template>
    <div class="simulation_wrapper">
        <div class="moni clearfix">
            <div style="float:left;height:40px;line-height:40px;" class="fontEd">爆管时管网运行状态模拟结果</div>
            <el-button type="success" class="mnfx" v-on:click="PipeBurstAnalysis" >模拟分析</el-button>
        </div>
        <sysInfo :sysData="listData"></sysInfo>

        <div class="affectd_users">
            <div class="table-wrapper-out">
                 <h4>受停水影响用户列表</h4>
                <div class="table-wrapper">
                    <el-table :data="info" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="100%">
                        <el-table-column prop="UserNum" label="编号"></el-table-column>
                        <el-table-column prop="UserName" label="用户名称"></el-table-column>
                        <el-table-column prop="Demand" label="用水量（m³）"></el-table-column>
                        <el-table-column prop="Pressure" label="压力降（m）"></el-table-column>
                        <el-table-column prop="Addr" label="地址"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="pagination-wrapper">
                <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{page_total}}&nbsp;条</span>
                <el-pagination
                    layout="prev, pager, next"
                    :total="page_total"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sysInfo from "./sysInfo.vue";
import WindowsEvent from "@/components/js/WindowsEvent";
import axios from "axios";
import urlClass from "@/components/js/UrlClass";
import mainClass from "@/components/js/MainClass"
export default {
  components: { sysInfo },
  props: {
    listData: { type: Array, default: [] },
    parameter: {
      type: Object,
      default: {
        Demand: 0,
        ElementId: 0,
        Type: 0,
        CanNotBeclosedValves: [],
        Time: 0,
        TableName: "",
        UserId: "",
        IsSave: true,
        CloseValveList: []
      }
    }
  },
  data() {
    let affDate = () => {
      let arr = [];
      for (let i = 0; i < 100; i++) {
        arr.push({
          rowNo: "SZJZK0554",
          userName: "李先生",
          waterFlow: "16524",
          pressDown: "0.32",
          address: "南园中路1330号16栋1402"
        });
      }
      return arr;
    };
    return {
      page_total: 0,
      currentPage: 1, //默认显示第一页
      pageSize: 20, //默认每页显示10条
      headerStyle() {
        return {
          height: "40px",
          "line-height": "40px",
          "background-color": "#f0f0f1",
          color: "#778392"
        };
      },
      rowStyle() {
        return {
          height: "40px",
          "line-height": "40px",
          color: "#6e7b8b"
        };
      },
      affectedDate: affDate(),
      drawData:null,//保存工况分析图上数据
      info:affDate(),
    };
  },
  mounted () {
      window.addEventListener("event_name", this.myEventListener);
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val; 
      this.info = this.affectedDate.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );     
    },
    myEventListener: function(event) {
      var typeTemp = event.detail.type;
      
      if(typeTemp == "PipeBurst_BGMN") {
          if(this.drawData != null){
              WindowsEvent.MyDispatchEvent("PipeBurstClear", "");
              WindowsEvent.MyDispatchEvent("PipeBurstDraw", this.drawData);
          }
          
      }
    },
    PipeBurstAnalysis: function() {
      this.parameter.IsSave = true;
      console.log("this.parameter点击")
      console.log(this.parameter)
      if (this.parameter.Demand <= 0)
      {
          alert("泄水量应大于0!");
      }
      else if(this.parameter.ElementId == ""||this.parameter.ElementId == "0"){
          alert("未选择爆管位置!");
      } 
      else {
        /* this.parameter.ElementId = this.initData.locate;
        this.parameter.Time = 0;
        this.parameter.Demand = 100; */
        WindowsEvent.MyDispatchEvent("PipeBurstLoadingBegin", "爆管工况分析中");
        var self = this;
        if (this.parameter.Type == "0") {
          
          if(this.parameter.IsSave&&this.parameter.TableName=="")
          {
            this.parameter.TableName = mainClass.GetRanLetterString(4);
            console.log(this.parameter.TableName);
          }
          axios
            .post(
              urlClass.axiosUrl + "WorkingConditionSimulationNode",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.GetLegendCustomerDataReturn)
            .catch(function (error) {
              console.log(error)
                WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            });
        } else {
           if(this.parameter.IsSave&&this.parameter.TableName=="")
          {
            this.parameter.TableName = mainClass.GetRanLetterString(4);
          }
          axios
            .post(
              urlClass.axiosUrl + "WorkingConditionSimulationPipe",
              JSON.stringify(this.parameter),
              {
                headers: { "Content-Type": "application/json;" }
              }
            )
            .then(this.GetLegendCustomerDataReturn)
            .catch(function (error) {
              console.log(error)
                WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            });
        }
      }
      //this.$emit("change", "");
    },
    GetLegendCustomerDataReturn: function(response) {
      var result = response.data;
      console.log("工况模拟")
      console.log(result);
      var object = new Object();
      object.min = result.MinFlow;
      object.max = result.MaxFlow;
      object.allData = result.PipeFlow;
      object.DownHeadMax = result.DownHeadMax;
      object.minP = result.MinPressure;
      object.maxP = result.MaxPressure;
      object.NodePressure = result.NodePressure;
      object.TableName = this.parameter.TableName;
      
      var userArray = result.EffectUser.slice(0);
      this.affectedDate = userArray.slice(0);
      object.UserLength = userArray.length;
      this.drawData = object;
       this.info = userArray.slice(0, this.pageSize);
       this.page_total = userArray.length;
      WindowsEvent.MyDispatchEvent("PipeBurstDraw", object);
    }
  }
};
</script>
<style lang="less" scoped>
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.fontEd {
  font-size: 14px;
  font-weight: bold;
  color: #6e7b8b;
}
.simulation_wrapper {
  height: calc(~"100% - 70px");
}
.moni {
  height: 40px;
  padding: 0 20px;
  border-bottom: 1px solid #d1d1da;
  box-sizing: border-box;
  .mnfx {
    float: right;
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    height: 26px;
    margin-top: 7px;
  }
}

.affectd_users {
  height: calc(~"100% - 193px");
  .table-wrapper-out {
    padding: 0 20px;
    box-sizing: border-box;
    height: calc(~"100% - 40px");
  }

  h4 {
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #6e7b8b;
    line-height: 1;
    padding-bottom: 15px;
    border-bottom: 1px solid #d1d1da;
  }
  .table-wrapper {
    margin-top: 20px;
    height: calc(~"100% - 48px");
  }
}
</style>

<style lang="less">
.affectd_users {
  .pagination-wrapper {
    height: 40px;
    border-top: 1px solid #d1d1da;
    box-sizing: border-box;
    padding: 0 20px;
    .el-pagination {
      padding-top: 6px;
      box-sizing: border-box;
      display: inline-block;
      float: right;
    }
  }
}
</style>

