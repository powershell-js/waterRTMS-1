<template>
    <div class="outbox" :style="{height:(tableHeight-40)+'px'}">
        <div class="tableoutbox" :style="{height:(tableHeight-40-48)+'px'}">
              <el-table
            :data="info"
            border-top
            empty-text
            style="width: 100%" stripe :header-cell-style="headerStyle" :row-style="rowStyle" height="100%"
            element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(143, 188, 143, 0.8)"
             >
                <el-table-column class="red"
                prop="ElementId"
                label="模型编号"
               min-width="100">
                </el-table-column>
                <el-table-column
                prop="Addr"
                label="地址"
               min-width="100">
                </el-table-column>
                <el-table-column
                prop="Headloss"
                label="水头损失"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="Slop"
                label="水力坡度"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="Pressure"
                label="末端压力(m)"
                min-width="100">
                </el-table-column>
     </el-table>
        </div>
        <div class="fyoutbox">
            <div class="totalnum">共<span>{{count}}</span>条</div>
            <div class="fybutton">
                 <div >
        <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="count">
        </el-pagination>
    </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "fytable",
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    tableData: function() {
      this.info = this.tableData.slice(0, this.pageSize);
      this.count = this.tableData.length;
    }
  },
  data() {
    return {
      info: [],
      pageSize: 10, //每页的数目
      count: 0, //数据总数
      tableHeight: 0,
      headerStyle() {
        return {
          "background-color": "#f0f0f1",
          color: "#6e7b8b",
          "font-size": "12px",
          "font-family": "微软雅黑"
        };
      },
      rowStyle() {
        return {
          height: "40px",
          "line-height": "40px",
          color: "#6e7b8b"
        };
      },

      currentPage: 1, //默认显示第一页
      pageSize: 10 //默认每页显示10条
    };
  },
  /* created() {
    this.info = this.tableData.slice(0, this.pageSize);
  }, */
  methods: {
    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleCurrentChange: function(currentPage) {
      console.log(currentPage);
      this.currentPage = currentPage;
      this.info = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  mounted() {
    this.tableHeight = document.documentElement.clientHeight - 247 - 80 - 150;
    var that = this;
    window.onresize = function() {
      that.tableHeight = document.documentElement.clientHeight - 247 - 80 - 150;
    };
  }
};
</script>
<style>
.el-pager li {
  color: #6e7b8b;
}
.el-pager li.active {
  cursor: default;
}
</style>
<style lang="scss" scoped>
.outbox {
  width: 100%;
  /*  background-color: brown */
}
.tableoutbox {
  width: 100%;
  background-color: rgb(95, 42, 165);
}
.fyoutbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  width: 100%;
  /*  background-color: blueviolet */
}
.totalnum {
  color: #606266;
  font-size: 12px;
  font-family: "微软雅黑";
}
</style>


