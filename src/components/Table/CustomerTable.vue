<template>
<table>
 <el-row style="width:100%;padding-left:98%">
    <img src="../../../static/assets/close.png" style="cursor:pointer;height:12px;width:12px" title="关闭"  v-on:click="CloseClick">
  </el-row>
<el-table
    :data="tableData.listData"
    style="width: 100%" height="248px"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column style="height:22,font-size:16px"
      prop="UserName"
      label="用户名"
      sortable
      >
    </el-table-column>
    <el-table-column style="height:22,font-size:16px"
      prop="Addr"
      label="地址"
      sortable
      >
    </el-table-column>
     <el-table-column style="height:22,font-size:16px"
      prop="Id"
      label="编号"
      sortable
      >
    </el-table-column>
    <el-table-column style="height:22,font-size:16px"
      prop="Type"
      label="用水性质"
      sortable
      >
    </el-table-column>
     <el-table-column style="height:22,font-size:16px"
      prop="Demand"
      label="水量(m³/h)"
      sortable
      >
    </el-table-column>
     <el-table-column style="height:22,font-size:16px"
      prop="Area"
      label="分公司"
      sortable
      >
    </el-table-column>
     <el-table-column style="height:22,font-size:16px"
      prop="Attribute"
      label="属性值"
      sortable
      >
    </el-table-column>
  </el-table>
</table>

</template>
<script>
  export default {
      props:{
          attributeLabel:'',
          tableData:{
              type:Object,
              default:
              {
                  listData:[
                  {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }],
                    tableType:'',
              }
          }

      },
    data() {
      return {
        
      }
    },
    methods: {
        CloseClick(){
            var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "CustomerTableClose";
                myEventTemp.detail.data = false;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    }
        },
      formatter(row, column) {
          
        return row.address;
      }
    }
  }
</script>