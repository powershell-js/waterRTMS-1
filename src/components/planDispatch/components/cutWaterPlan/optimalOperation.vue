<template>
    <div class="optimal-operation">
        <panel-title :title="'管网优化调度'" :color-show="false">
            <el-button type="success" @click="handleClick">优化调度</el-button>
        </panel-title>
        <table-tab :tabs="tabs">
            <reduction-scheme v-if="curTab == 'falb'" 
            :checkable="true" :url="url+'GetPlanWaterworks'"
            :param="{
                WaterStopDate: boundaryData.WaterStopDate,
                CodeId: boundaryData.CodeId,
                CTPressure: boundaryData.CTPressure,
                TolPlanWaterVol: boundaryData.TolPlanWaterVol,
                PipeNo: boundaryData.PipeNo
            }"></reduction-scheme>

            <template v-if="curTab==='ylkzd'">
                <div class="inner-table">
                    <el-table :data="tableDate" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="300">
                        <el-table-column prop="Station" label="编号"></el-table-column>
                        <el-table-column prop="PressureName" label="压力点名称"></el-table-column>
                        <el-table-column prop="CtPressure" label="目标压力(MPa)"></el-table-column>
                        <el-table-column prop="RtPressure" label="结果压力"></el-table-column>
                        <el-table-column prop="PressureChange" label="压力变化"></el-table-column>
                    </el-table>
                </div>

                <div class="pagination-wrapper">
                    <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{total}}&nbsp;条</span>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="pageSize"
                        :current-page="currentPage"
                        @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </template>
            <el-button type="success" class="save-btn">保存方案</el-button>
        </table-tab>
    </div>    
</template>
<script>
import urlClass from '@/components/js/UrlClass'
import TableTab from './tableTab.vue'
import PanelTitle from './panelTitle.vue'
import ReductionScheme from '@/components/emergencyDispatch/components/ReductionScheme.vue'
export default {
    components: { TableTab, PanelTitle, ReductionScheme },
    data() {
        return{
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
            curTab: 'falb',
            tabs: [
                {name: '调度方案列表', key: 'falb', tabClick:this.tabClick},
                {name: '调度后压力控制点压力', key: 'ylkzd', tabClick:this.tabClick}
            ],
            PressureData: [],
            url:''
        }
    },
    mounted(){
        this.url = urlClass.axiosUrJH;
    },
    methods: {
        tabClick(key) {
            this.curTab = key
        },
        handleClick() {
            let self = this;
            this.$axios.post(urlClass.axiosUrJH+"GetPlanPressurePoint", {
                WaterStopDate: this.boundaryData.WaterStopDate,
                CodeId: this.boundaryData.CodeId,
                CTPressure: this.boundaryData.CTPressure,
                TolPlanWaterVol: this.boundaryData.TolPlanWaterVol,
                PipeNo: this.boundaryData.PipeNo
            }).then(function(R){
                self.PressureData = R.data.Data
            })
        },
        handleCurrentChange(val) {
            this.currentPage = val
        }
    },
    computed: {
        boundaryData() {
            return this.$store.state.planDispatch.schemeData.boundaryData
        },
        total() {
            return this.PressureData.length
        },
        tableDate() {
            let data = []
            for(let i = 0; i < this.pageSize; i++){
                data.push(this.PressureData[i + (this.currentPage - 1) * this.pageSize])
            }
            return data
        }
    }
}
</script>
<style lang="less" scoped>
.optimal-operation{
    .table-tab{
        padding: 10px;
        .reduction-scheme-warp{
            padding: 10px;
        }
        .save-btn{
            float: right;
        }
    }
}
</style>
