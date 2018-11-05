<template>

<table>
  <!-- <el-row style="width:100%;padding-left:10px;text-align:right">
    <img src="../../../static/assets/close.png" style="cursor:pointer;height:12px;width:12px" title="关闭"  v-on:click="CloseClick">
  </el-row> -->

  <el-row class="headClass">
    <el-col :span="4.7">
       <table>
        <td style="margin-right:50px">输入记录条数</td>
        <el-input style="width:100px;margin-left:10px" v-model="input"></el-input>
        <my-btn style="margin-right:10px;margin-left:10px"  v-on:clickMy="sure" :myBtnLabel="this.myBtnLabel"></my-btn>
        <td>{{tableData.labelType}}</td>
        <td>{{tableData.numberCount}}</td>
       </table>
    </el-col>
    <el-col :span="0.9">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,30,40,50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.listData.length"> 
      </el-pagination>
    </el-col>
    <el-col :span="7" class="col3Class">
      <el-button style="padding-right:10px" size="mini" type="success" v-on:click="ExportClick">导出</el-button>
      <el-button style="padding-right:10px" size="mini" type="primary" v-on:click="CloseClick">关闭</el-button>
    </el-col>
  </el-row>
  <!-- <el-row style="text-align:center;vertial-align:middle" >
    <table>
        <td style="margin-right:50px">输入记录条数</td>
        <el-input style="width:100px;margin-left:10px" v-model="input"></el-input>
        <my-btn style="margin-right:10px;margin-left:10px"  v-on:clickMy="sure" :myBtnLabel="this.myBtnLabel"></my-btn>
        <td>{{tableData.labelType}}</td>
        <td>{{tableData.numberCount}}</td>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,30,40,50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.listData.length"> 
      </el-pagination>
    </table>
  </el-row> -->
  <img style="height:2px;width:100%" src="../../../static/assets/2x2black.jpg" alt="">
  <el-table v-show="tableData.mainType=='Location'" class="tableLocationClass"
    :data="tableData.listData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%" height="200px"
    :default-sort = "{prop: 'date', order: 'descending'}"
    @row-click="SelectionChange"
    >
    <el-table-column style="height:22,font-size:16px"
      prop="ElementId"
      label="模型编号"
      align="center"
      sortable
      >
    </el-table-column>
    <el-table-column style="width:280px,height:22,font-size:16px"
      prop="Label" 
      label="GUID"
      align="center"
      sortable
      >
    </el-table-column>
     <el-table-column style="height:22,font-size:16px"
      prop="Addr"
      label="地址"
      align="center"
      sortable
      >
    </el-table-column>
    <el-table-column v-if="tableData.tableType=='pipe'" style="height:22,font-size:16px"
      prop="Diameter"
      label="管径(mm)"
      align="center"
      sortable
      >
    </el-table-column>
     <el-table-column style="height:22,font-size:16px"
      prop="Attribute"
      label="属性值"
      align="center"
      sortable
      >
    </el-table-column>
    <el-table-column v-if="tableData.isCompare=='compare'" style="height:22,font-size:16px" 
      prop="UpDown"
      label="趋势"
      align="center"
      sortable
      >
    </el-table-column>
  </el-table>
 <el-table v-show="tableData.mainType=='Customer'" class="CustomerTable"
    :data="tableData.listData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%" height="200px"
    :default-sort = "{prop: 'date', order: 'descending'}"
    @row-click="SelectionChange"
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
    <el-table-column style="height:22,font-size:16px" v-if="tableData.isCompare=='compare'"
      prop="UpDown"
      label="趋势"
      align="center"
      sortable
      >
    </el-table-column>
  </el-table>
</table>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import MyBtn from '@/components/Button/MyBtn'
  export default {
     components:{
       MyBtn
     },
      props:{
          attributeLabel:'',
          tableData:{
              type:Object,
              default:
              {
                  listData:[
                  {
                    ElementId: '2016-05-02',
                    Label: '王小虎',
                    Addr: '上海市普陀区金沙江路 1518 弄',
                    Diameter: '上海市普陀区金沙江路 1518 弄',
                    Attribute: '上海市普陀区金沙江路 1518 弄',
                    }],
                    tableType:'',
                    tableName:'',
                    labelType:'',
                    numberCount:0,
                    mainType:'',
                    isCompare:''
              }
          }

      },
    data() {
      return {
         currentPage:1, 
          pagesize:10,
          input:100,
          myBtnLabel:'确定' 
      }
    },
    created(){
     
    }
    ,
    methods: {
       CloseClick(){
            var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "MyTableClose";
                myEventTemp.detail.data = false;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    }
        },
        ExportClick(){
          if(this.tableData.mainType=='Customer')
            this.ExportExcel('.CustomerTable');
          else
            this.ExportExcel('.tableLocationClass');
        },
        ExportExcel (tableDome) {
         /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector(tableDome))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheet.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
     },
      formatter(row, column) {
          
        return row.address;
      },
       handleSizeChange: function (size) { 
         this.pagesize = size; 
         }, 
         handleCurrentChange: function(currentPage){ 
         this.currentPage = currentPage; 
         } ,
         sure:function(){
           if(Number(this.input)>Number(this.tableData.numberCount))
              this.myAlert("请输入小于"+String(this.tableData.labelType)+'的数','提示')
            else
            {
              this.dispatchEventMy(this.tableData.mainType,this.input);
            } 
         },
         myAlert:function(content,title) {
           this.$alert(content, title, {
          confirmButtonText: '确定',
        });
         },
        dispatchEventMy:function(typeTemp,dataTemp){
        var myEvent = new CustomEvent('event_name',{
                    detail: { type: 'This is title!'},
                    });
                myEvent.detail.type = typeTemp;
                myEvent.detail.data = dataTemp;
                   if(window.dispatchEvent){
            window.dispatchEvent(myEvent);
        }else{
            window.fireEvent(myEvent);
        }
    },
    SelectionChange:function(selection){
       var temp = (this.tableData.isCompare=='compare');
        console.log(this.tableData.isCompare);
        console.log(temp);
      var obj = new Object();
      obj = selection;
      obj.tableType = this.tableData.tableType;
      obj.mainType = this.tableData.mainType;
      console.log(obj)
      this.dispatchEventMy('tableItemClickLocation',obj)
    },
    }
  }
</script>
<style scoped>
.tableLocationClass{

}
.CustomerTable{

}
.headClass{
  height:50px;
  width:100%;
  padding-top: 15px;
  padding-left:10px;
  vertical-align:middle;
}
.col3Class{
  width: 30%;
  text-align: right;
}
</style>
