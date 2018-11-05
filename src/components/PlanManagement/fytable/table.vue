<template>
    <div class="outbox" :style="{height:(listoutboxHeight-95-80-70-130)+'px'}">
        <div class="tableoutbox" :style="{height:(listoutboxHeight-95-110-100-70)+'px'}">
              <el-table
            :data="info"
            border-top
            empty-text
            style="width: 100%" stripe :header-cell-style="headerStyle" :row-style="rowStyle" height="100%"
            element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(143, 188, 143, 0.8)"
             >
                <el-table-column class="red"
                prop="bh"
                label="监测点编号"
               min-width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="监测点名称"
               min-width="100">
                </el-table-column>
                <el-table-column
                prop="mb"
                label="当前压力"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="sj"
                label="所需压力"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="yl"
                label="最低压力"
                min-width="100">
                </el-table-column>
     </el-table>
        </div>
        <div class="fyoutbox">
            <div class="totalnum">共<span>1000</span>条</div>
            <div class="fybutton">
                 <div class="block">
        <el-pagination
        @current-change="handleCurrentChange"
        :page-size="12"
        layout="prev, pager, next"
        :total="150">
        </el-pagination>
    </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
      name:"Table",
     data() {
    return {
      listoutboxHeight:0,
       info: [],
      headerStyle() {
        return {
          "background-color": "#f0f0f1",
          "color": "#6e7b8b",
          "font-size": "12px",
          "font-family": "微软雅黑"
        };
      },
      rowStyle() {
        return {
          "height": "40px",
          "line-height": "40px",
          "color": "#6e7b8b"
        };
      },

      tableData: [
        {
          bh: "SZKKLLKK0002",
          name: "红岭中学",
          mb: "32.019",
          sj: "30.0",
          yl:"25.0"
        },
        {
          bh: "SZKKLLKK0007",
          name: "滨河新洲路立交",
          mb: "39.769",
          sj: "30.0",
           yl:"25.0"
        },
        {
          bh: "SZKKLLKK00012",
          name: "东门晒布地铁站",
          mb: "40.993",
          sj: "30.0",
           yl:"25.0"
        },
        {
          bh: "SZKKLLKK00021",
          name: "蛇口水厂",
          mb: "34.772",
          sj: "30.0",
           yl:"25.0"
        },
        {
          bh: "SZKKLLKK00025",
          name: "月亮湾公交站",
          mb: "40.044",
          sj: "30.0",
           yl:"25.0"
        },
        {
          bh: "SZKKLLKK00027",
          name: "南山污水厂",
          mb: "38.902",
          sj: "30.0",
           yl:"25.0"
        },
        {
          bh: "SZKKLLKK00033",
          name: "7",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "8",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "9",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "10",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "11",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "12",
          mb: "0.64",
          sj: "0.54"
        },
               {
          bh: "SZKKLLKK00012",
          name: "13",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "14",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "15",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "16",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "17",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "18",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "19",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "20",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "21",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "22",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "23",
          mb: "0.64",
          sj: "0.54"
        },
        {
          bh: "SZKKLLKK00012",
          name: "24",
          mb: "0.64",
          sj: "0.54"
        }
      ],

      currentPage: 1, //默认显示第一页
      pageSize: 10 //默认每页显示10条
    };
  },
   created() {
    this.info = this.tableData.slice(0, 12);
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.info = this.tableData.slice(12* val - 12, 12* val);
    },
   
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
<style>
    .el-pager li {
        color:#6e7b8b
    }
    .el-pager li.active {
    color: #6e7b8b;
    cursor: default;
}
</style>
<style lang="scss" scoped>
.outbox{
    width: 100%;
    margin-top: 20px
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





