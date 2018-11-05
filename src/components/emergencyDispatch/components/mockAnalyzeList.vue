<template>
    <div style="height:100%">
        <sysInfo :sysData="mockData"></sysInfo>

        <div class="affectd_users">
            <div class="table-wrapper-out">
                 <h4>受停水影响用户列表</h4>
                <div class="table-wrapper">
                    <el-table :data="effectUserInfo" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="100%">
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
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import sysInfo from './sysInfo.vue';
export default {
    props: {
        effectUserInfo:{ 
        type: Array,default: () => [{ ElemenId: 0, UserNum: "", UserName: "", Addr: "",Demand:0,PressureDown:0 }]
    },
    },
     mounted() {
    window.addEventListener("event_name", this.myEventListener);
  },
  methods:{
      myEventListener(){
           var typeTemp = event.detail.type;
        if(typeTemp == "PipeBurstDraw"){
         var DownHeadMax = event.detail.data.DownHeadMax;
        DownHeadMax = DownHeadMax/100;
        this.listItems[1].value = DownHeadMax;
        this.listItems[2].value = DownHeadMax-0.01;
        this.mockData[3].value = 300.23;
        this.mockData[4].value = event.detail.data.UserLength;
        this.mockData[5].value = 102;
      }
      }
  },
  data() {
    let affDate = ()=>{
        let arr = [];
        for(let i=0;i<100;i++){
            arr.push({
                rowNo:'SZJZK0554',
                userName:'李先生',
                waterFlow:'16524',
                pressDown:'0.32',
                address:'南园中路1330号16栋1402'
            })
        }
        return arr;
    }
    return {
        mockData:[{
            name:'爆管泄水量',
            unit:'(m3/h)',
            value:'--',
            factory:null
        },{
            name:'管网最大压降',
             unit:'(MPa)',
            value:'--',
            factory:null
        },{
            name:'水厂最大压降',
            unit:'(MPa)',
            value:'--',
            factory:'大涌北水厂'
        },{
            name:'水厂最大增加水量',
            unit:'(m3/h)',
            value:'--',
            factory:'大涌北水厂'
        },{
            name:'受影响用户数量',
            unit:'(户)',
            value:'--',
            factory:null
        },{
            name:'受影响范围',
            unit:'(km2)',
            value:'--',
            factory:null
        }],
        page_total:100,
        currentPage:1, //默认显示第一页
        pageSize:10,//默认每页显示10条
        headerStyle(){
            return {
                'height':'40px',
                'line-height':'40px',
                'background-color':'#f0f0f1',
                'color':'#778392'
            }
        },
        rowStyle(){
            return {
                'height':'40px',
                'line-height':'40px',
                'color':'#6e7b8b'
            }
        },
        affectedDate:affDate()
    };
  },

  components:{sysInfo}
};
</script>
<style lang="less" scoped>
    .affectd_users{
        height: calc(~"100% - 153px");
        .table-wrapper-out{
            padding:0 20px;
            box-sizing: border-box;
            height: calc(~"100% - 40px");
        }

        h4{
            margin:0;
            padding:0;
            font-size: 12px;
            color:#6e7b8b;
            line-height: 1;
            padding-bottom: 15px;
            border-bottom: 1px solid #d1d1da;
        }
        .table-wrapper{
            margin-top: 20px;
            height: calc(~"100% - 48px");

        }

    }
</style>
<style lang="less">
    .affectd_users{
        .pagination-wrapper{
             height: 40px;
             border-top:1px solid #d1d1da;
             box-sizing:border-box;
             padding:0 20px;
            .el-pagination{
                padding-top:6px;
                box-sizing:border-box;
                display: inline-block;
                float:right;
            }
        }

    }
</style>
