<template>
    <div style="height:100%">
        <div class="list-wraper">
            <div class="addBorder clearfix">
                <span class="list-title" :class="{'active':cur=='closeList'}" @click="gbfmClick">关闭阀门列表</span><!--
                --><span class="list-title" :class="{'active':cur=='userList'}" @click="tsyhClick">停水用户列表</span>
            </div>

        </div>
        <div class="table-wrapper">
            <template v-if="cur==='closeList'">
                <div class="inner-table">
                    <el-table :data="gfssList.slice((currentPage1-1)*pageSize,currentPage1*pageSize)" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="100%">
                        <el-table-column prop="ValveNo" label="阀门编号"></el-table-column>
                        <el-table-column prop="Caliber" label="口径（mm）"></el-table-column>
                        <el-table-column prop="X" label="横坐标"></el-table-column>
                        <el-table-column prop="Y" label="纵坐标"></el-table-column>
                        <el-table-column prop="Address" label="地址"></el-table-column>
                    </el-table>
                </div>

                <div class="pagination-wrapper">
                    <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{page_total1}}&nbsp;条</span>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="page_total1"
                        :page-size="pageSize"
                        :current-page="currentPage1"
                        @current-change="handleCurrentChange1"
                    >
                    </el-pagination>
                </div>
            </template>
             <template v-if="cur==='userList'">
                <div class="inner-table">
                    <el-table :data="tsyhList.slice((currentPage2-1)*pageSize,currentPage2*pageSize)" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="100%">
                        <el-table-column prop="No" label="编号"></el-table-column>
                        <el-table-column prop="UserName" label="用户名称"></el-table-column>
                        <el-table-column prop="WaterUserFlow" label="用水量（m³）"></el-table-column>
                        <el-table-column prop="PressureDrop" label="压力降（Mpa）"></el-table-column>
                        <el-table-column prop="Address" label="地址"></el-table-column>
                    </el-table>
                </div>

                <div class="pagination-wrapper">
                    <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{page_total2}}&nbsp;条</span>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="page_total2"
                        :page-size="pageSize"
                        :current-page="currentPage2"
                        @current-change="handleCurrentChange2"
                    >
                    </el-pagination>
                </div>
            </template>

        </div>
    </div>
</template>
<script>
import urlClass from '@/components/js/UrlClass'
import axios from "axios"
    export default {
        data(){

            return {
                cur:'closeList',
                gfssList:[],
                tsyhList:[],
                currentPage1:1,
                currentPage2:1,
                pageSize:10,
                page_total1:0,
                page_total2:0,
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
            }
        },

        methods:{
            gbfmClick(){
                this.cur = 'closeList';
                let self = this;
                axios.post(urlClass.axiosUrJH+"GetPlanStopValveOffData", {
                    WaterStopDate: this.boundaryData.WaterStopDate,
                    CodeId: this.boundaryData.CodeId,
                    CTPressure: this.boundaryData.CTPressure,
                    TolPlanWaterVol: this.boundaryData.TolPlanWaterVol,
                    PipeNo: this.boundaryData.PipeNo
                }).then(function(ret){
                    let arr = [];
                    let d = ret.data;
                    if(!d) return;
                    d.ValveOffDataList.forEach(function(e,i){
                        arr.push(e);
                    })
                    self.gfssList = arr;
                    self.page_total1 = arr.length;
                })
            },
            tsyhClick(){
                this.cur = 'userList';
                let self = this;
                axios.post(urlClass.axiosUrJH+"GetPlanStopValveOffUserData", {
                    WaterStopDate: this.boundaryData.WaterStopDate,
                    CodeId: this.boundaryData.CodeId,
                    CTPressure: this.boundaryData.CTPressure,
                    TolPlanWaterVol: this.boundaryData.TolPlanWaterVol,
                    PipeNo: this.boundaryData.PipeNo
                }).then(function(ret){
                    let arr = [];
                    let d = ret.data;
                    let tsyh_data = d.UsersAffectedList;
                    if(!tsyh_data) return;

                    tsyh_data.forEach(function(ele,index){
                        arr.push(ele);
                    })
                    self.tsyhList = arr;
                    self.page_total2 = arr.length;
                })
            },
           handleCurrentChange1(val){
               this.currentPage1 = val;
           },
           handleCurrentChange2(val){
               this.currentPage2 = val;
           },
        },
        computed: {
            boundaryData() {
                return this.$store.state.planDispatch.schemeData.boundaryData
            }
        }
    }
</script>
<style lang="less" scoped>
    .list-wraper{
        box-sizing: border-box;
        padding: 15px 20px 0 20px;
        .addBorder{
            border-bottom: 1px solid #d1d1da;
            height: 30px;
        }
        .list-title{
            display: inline-block;
            cursor: pointer;
            float:left;
            color:#8b95a2;
            font-size: 12px;
            margin-right: 40px;
            padding-bottom:12px;
            &.active{
                color:#70991f;
                border-bottom:2px solid #70991f;
            }
        }
    }
    .table-wrapper{
        box-sizing: border-box;
        height: calc(~"100% - 46px");
        .inner-table{
            box-sizing: border-box;
            height: calc(~"100% - 40px");
            padding:20px 20px 0 20px;
        }
    }
</style>
<style lang="less">
    .table-wrapper{
        .pagination-wrapper{
            box-sizing:border-box;
            height: 40px;
            padding-left:20px;
            padding-right:20px;
            border-top: 1px solid #d1d1ef;
            .el-pagination{
                padding-top:6px;
                box-sizing:border-box;
                display: inline-block;
                float:right;
            }
        }

    }
</style>
