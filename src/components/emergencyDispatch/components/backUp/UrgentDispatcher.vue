<template>
    <div class="urgent-wrapper">
        <div class="moni clearfix">
            <div style="float:left;height:40px;line-height:40px;" class="fontEd">停水后应急调度方案</div>
            <el-button type="success" class="mnfx" @click="ajaxControlData">应急调度</el-button>
        </div>
        <div class="outer">
            <h4>调度方案列表</h4>
            <reduction-scheme :url="url_param"></reduction-scheme>
        </div>
         <div class="affectd_users">
                <div class="table-wrapper-out">
                    <h4>官网压力控制点列表</h4>
                    <div class="table-wrapper">
                        <el-table :data="ListData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="100%">
                            <el-table-column prop="id" label="编号"></el-table-column>
                            <el-table-column prop="PressureName" label="压力点名称"></el-table-column>
                            <el-table-column prop="CtPressure" label="当前压力（MPa）"></el-table-column>
                            <el-table-column prop="CroPressure" label="控制压力（Mpa）"></el-table-column>
                            <el-table-column prop="DhPressure" label="调度后压力（Mpa）"></el-table-column>
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
import axios from "axios"
import ReductionScheme from "./ReductionScheme.vue";
import urlClass from '@/components/js/UrlClass'
export default {
  components: { ReductionScheme },
  data() {

    return {
        url_param:urlClass.axiosUrl2+"EmergencyDispatchCALC",
        ListData:[],
        page_total:0,
        currentPage:1,
        pageSize:12,
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

    };
  },
  methods:{

    ajaxControlData(){
        let self = this;
        axios.post(urlClass.axiosUrl2+"EmergencyPressurePoint")
        .then(function(ret){
            let d = ret.data;
            let pointList = d.PressurePointList;
            if(!pointList) return;
            self.ListData = pointList;
            self.page_total = pointList.length;

        })
    },
    handleCurrentChange(val) {
        this.currentPage =val;
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
.urgent-wrapper {
  height: calc(~"100% - 70px");
}
h4 {
  margin: 0 0 20px;
  padding: 0;
  font-size: 12px;
  color: #6e7b8b;
  line-height: 1;
  padding-bottom: 15px;
  border-bottom: 1px solid #d1d1da;
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
.outer {
  padding: 20px;
}

.affectd_users {
  height: calc(~"100% - 460px");
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
