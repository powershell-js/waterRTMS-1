<template>
    <div style="height:100%">
        <sysInfo :sysData="mockData"></sysInfo>

        <div class="affectd_users">
            <div class="table-wrapper-out">
                 <h4>受停水影响用户列表</h4>
                <div class="table-wrapper">
                    <el-table :data="affectedDate.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="100%">
                       <el-table-column prop="No" label="编号"></el-table-column>
                        <el-table-column prop="UserName" label="用户名称"></el-table-column>
                        <el-table-column prop="WaterUserFlow" label="用水量（m³）"></el-table-column>
                        <el-table-column prop="PressureDrop" label="压力降（Mpa）"></el-table-column>
                        <el-table-column prop="Address" label="地址"></el-table-column>
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
import sysInfo from './sysInfo.vue';
import urlClass from '@/components/js/UrlClass'
export default {
  data() {

    return {
        mockData:[],
        page_total:0,
        currentPage:1,
        pageSize:12,
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
        affectedDate:[]
    };
  },
  methods:{
    ajaxMockData(){
        let self = this;
        axios.post(urlClass.axiosUrl2+"GetDetonatorData")
        .then(function(ret){
                let d = ret.data;
                let arr =  [{
                name:'爆管泄水量',
                unit:'(m3/h)',
                value:d.Escapage || 0,
                factory:null
            },{
                name:'管网最大压降',
                unit:'(MPa)',
                value:d.MaxPressureDrop || 0,
                factory:null
            },{
                name:'水厂最大压降',
                unit:'(MPa)',
                value:d.WaterMaxPressureDrop || 0,
                factory:'大涌北水厂'
            },{
                name:'水厂最大增加水量',
                unit:'(m3/h)',
                value:d.WaterMaxAddFlow || 0,
                factory:'大涌北水厂'
            },{
                name:'受影响用户数量',
                unit:'(户)',
                value:d.UsersAffectedNum || 0,
                factory:null
            },{
                name:'受影响范围',
                unit:'(km2)',
                value:d.AffectedArea || 0,
                factory:null
            }]
            self.mockData=arr;

            self.processAffectedUser(d.UsersAffectedList);
        })
    },
    processAffectedUser(tableTable){
        let arr = [];
        if(!tableTable) return;
        tableTable.forEach(function(ele,index){
            arr.push(ele);
        })
        this.affectedDate = arr;
        this.page_total = arr.length;
    },
    handleCurrentChange(val) { //点击分页数字触发
        this.currentPage =val;
    }
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
