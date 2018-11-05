<template>
    <div style="height:100%">
        <div class="list-wraper">
            <div class="addBorder clearfix">
                <span class="list-title" :class="{'active':cur=='closeList'}" @click="tabChange">关闭阀门列表</span><!--
                --><span class="list-title" :class="{'active':cur=='userList'}" @click="tabChange">停水用户列表</span>
            </div>

        </div>
        <div class="table-wrapper">
            <div class="inner-table" v-show="cur === 'closeList'">
                <el-table :data="showCloseValveInfo" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="100%">
                    <el-table-column prop="Id" label="阀门编号"></el-table-column>
                    <el-table-column prop="Diameter" label="口径（mm）"></el-table-column>
                    <el-table-column prop="X" label="横坐标"></el-table-column>
                    <el-table-column prop="Y" label="纵坐标"></el-table-column>
                    <el-table-column prop="Addr" label="地址"></el-table-column>
                </el-table>
            </div>

            <div class="inner-table" v-show="cur === 'userList'">
                <el-table :data="showEffectUserInfo" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="100%">
                    <el-table-column prop="UserNum" label="编号"></el-table-column>
                    <el-table-column prop="UserName" label="用户名称"></el-table-column>
                    <el-table-column prop="Demand" label="用水量（m³）"></el-table-column>
                    <el-table-column prop="Pressure" label="压力降（m）"></el-table-column>
                    <el-table-column prop="Addr" label="地址"></el-table-column>
                </el-table>
            </div>

            <div class="pagination-wrapper">
                <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{tablePageInfo.pageTotal}}&nbsp;条</span>
                <el-pagination
                    layout="prev, pager, next"
                    :total="tablePageInfo.totalCount"
                    :page-size="tablePageInfo.pageSize"
                    :current-page="tablePageInfo.currentPage"
                    @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '@/components/js/bus'
export default {
  props: {
    /* closeValveInfo: {
      type: Array,
      default: () => [
        { ElemenId: 0, Id: "", Diameter: 0, Addr: "", X: "", Y: "" }
      ]
    },
    effectUserInfo:{ 
        type: Array,default: () => [{ ElemenId: 0, UserNum: "", UserName: "", Addr: "",Demand:0,PressureDown:0 }]
    }, */
    tablePageInfo:{type:Object,default: () => { 
     return {totalCount:0,pageTotal: 0,currentPage: 1, pageSize: 10}
    }},
    /* effectUserPageInfo:{
      page_total: 0,
      currentPage: 1, //默认显示第一页
      pageSize: 10//默认每页显示10条
    } */
  },
  watch: {
    /* closeValveInfo: function () {
      this.initData();
    } */
  },
  data() {
    let affDate = () => {
      let arr = [];
      for (let i = 0; i < 100; i++) {
        arr.push({
          rowNo: "SZJZK0554",
          kj: "400",
          xAxis: "499416",
          yAxis: "327526",
          address: "南园中路1330号16栋1402"
        });
      }
      return arr;
    };
    return {
      closeValveInfo: {
      type: Array,
      default: () => [
        { ElemenId: 0, Id: "", Diameter: 0, Addr: "", X: "", Y: "" }
      ]
    },
    effectUserInfo:{ 
        type: Array,default: () => [{ ElemenId: 0, UserNum: "", UserName: "", Addr: "",Demand:0,PressureDown:0 }]
    },
      cur: "closeList",
      showCloseValveInfo:[],
      showEffectUserInfo:[],
      affectedDate: affDate(),
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
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(this.showCloseValveInfo)
      console.log(this.showEffectUserInfo)
        this.tablePageInfo.currentPage = val;
        if(this.cur == "closeList"){
          this.showCloseValveInfo = this.closeValveInfo.slice((this.tablePageInfo.currentPage - 1) * this.tablePageInfo.pageSize,this.tablePageInfo.pageSize * this.tablePageInfo.currentPage)
        }
        else{
          this.showEffectUserInfo = this.effectUserInfo.slice((this.tablePageInfo.currentPage - 1) * this.tablePageInfo.pageSize,this.tablePageInfo.pageSize * this.tablePageInfo.currentPage)
        }
    },
    tabChange(){
      if(this.cur == "closeList"){
        this.cur = "userList";
        this.calPage();
      }
      else{
        this.cur = "closeList";
        this.calPage();
      }
      this.handleCurrentChange(1);
    },
    calPage(){
      if(this.cur == "userList"){
      this.tablePageInfo.pageTotal = parseInt(Number(this.effectUserInfo.length)/Number(this.tablePageInfo.pageSize)) ;
        if(Number(this.effectUserInfo.length) % Number(this.tablePageInfo.pageSize) > 0)
        this.tablePageInfo.pageTotal = this.tablePageInfo.pageTotal + 1;
        this.tablePageInfo.currentPage = 1;
        this.tablePageInfo.totalCount = this.effectUserInfo.length;
      }
      else{
        this.tablePageInfo.pageTotal = parseInt(this.closeValveInfo.length/this.tablePageInfo.pageSize);
        if(Number(this.closeValveInfo.length) % Number(this.tablePageInfo.pageSize) > 0)
        this.tablePageInfo.pageTotal = this.tablePageInfo.pageTotal + 1;
        this.tablePageInfo.currentPage = 1;
        this.tablePageInfo.totalCount = this.closeValveInfo.length;
      }
    },
    initData(){
      this.showCloseValveInfo = this.closeValveInfo.slice(0,this.tablePageInfo.pageSize);
      this.showEffectUserInfo = this.effectUserInfo.slice(0,this.tablePageInfo.pageSize);
      this.calPage();
    }
  },
  mounted () {
    let self = this;
    bus.$on("DataChange", e => {
      self.closeValveInfo = e.closeValveInfo; 
      self.effectUserInfo = e.effectUserInfo; 
      self.initData()
    })

  }
};
</script>
<style lang="less" scoped>
.list-wraper {
  box-sizing: border-box;
  padding: 15px 20px 0 20px;

  .addBorder {
    border-bottom: 1px solid #d1d1da;
    height: 30px;
  }
  .list-title {
    display: inline-block;
    cursor: pointer;
    float: left;
    color: #8b95a2;
    font-size: 12px;
    margin-right: 40px;
    padding-bottom: 12px;
    &.active {
      color: #70991f;
      border-bottom: 2px solid #70991f;
    }
  }
}
.table-wrapper {
  box-sizing: border-box;
  height: calc(~"100% - 46px");
  .inner-table {
    box-sizing: border-box;
    height: calc(~"100% - 40px");
    padding: 20px 20px 0 20px;
  }
}
</style>
<style lang="less">
.table-wrapper {
  .pagination-wrapper {
    box-sizing: border-box;
    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    border-top: 1px solid #d1d1ef;

    .el-pagination {
      padding-top: 6px;
      box-sizing: border-box;
      display: inline-block;
      float: right;
    }
  }
}
</style>
