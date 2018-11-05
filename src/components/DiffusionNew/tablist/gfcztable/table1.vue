<template>
    <div class="outbox" :style="{height:(listoutboxHeight-95-80-40)+'px'}">
        <div class="tableoutbox" :style="{height:(listoutboxHeight-95-80-100)+'px'}">
              <el-table
            :data="info"
            border-top
            empty-text
            style="width: 100%" stripe :header-cell-style="headerStyle" :row-style="rowStyle" height="100%"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(143, 188, 143, 0.8)"
             >
                <el-table-column class="red"
                prop="Id"
                label="阀门编号"
               min-width="100">
                </el-table-column>
                <el-table-column
                prop="Diameter"
                label="口径（mm）"
               min-width="100">
                </el-table-column>
                <el-table-column
                prop="X"
                label="横坐标"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="Y"
                label="纵坐标"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="Addr"
                label="地址"
                min-width="100">
                </el-table-column>
     </el-table>
        </div>
        <div class="fyoutbox">
            <div class="totalnum">共<span>{{count}}</span>条</div>
            <div class="fybutton">
                 <div class="block">
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
      name:"GfczTable1",
      props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  watch:{
    tableData:function(){
      this.info = this.tableData.slice(0, this.pageSize);
      this.count = this.tableData.length;
      console.log(this.info)
    }
  },
     data() {
    return {
      count: 0, //数据总数
      listoutboxHeight:0,
       info: [],
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
   created() {
    this.info = this.tableData.slice(0, 12);
  },
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
    this.listoutboxHeight = document.documentElement.clientHeight - 344;
    var that = this;
    window.onresize = function() {
      that.listoutboxHeight = document.documentElement.clientHeight - 344;
    
    };
  }
}
</script>
<style lang="scss" scoped>
.outbox{
    width: 100%;
   /*  background-color: brown */
}
.tableoutbox{
   width: -moz-calc(100% - 25px);
  width: -webkit-calc(100% - 25px);
  width: calc(100% - 25px);
  margin-left: 20px
}
.fyoutbox{
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
.totalnum{
    color: #606266;
    font-size: 12px;
    font-family: "微软雅黑";
    margin-left: 20px
}
</style>





