<template>
    <div class="model-analysis">
        <panel-title :title="'管网模拟分析'" :color-show="false" v-if="titleShow">
            <el-button type="success" @click="handleClick">模拟分析</el-button>
        </panel-title>
        <el-row class="data-block-warp">
            <el-col :span="6" :key="data.textTop" v-for="data in dataList">
                <data-block :data="data"></data-block>
            </el-col>
        </el-row>
        <table-tab :tabs="tabs">
            <template>
                <div class="inner-table">
                    <el-table v-if="curTab == 'UsersAffectedList'" :data="usersAffectedTableDate" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="300">
                        <el-table-column prop="No" label="编号"></el-table-column>
                        <el-table-column prop="UserName" label="用户名称"></el-table-column>
                        <el-table-column prop="WaterUserFlow" label="水量"></el-table-column>
                        <el-table-column prop="PressureValue" label="压力"></el-table-column>
                        <el-table-column prop="PressureDrop" label="压力变化"></el-table-column>
                        <el-table-column prop="Address" label="地址"></el-table-column>
                    </el-table>


                    <el-table v-if="curTab == 'PressureData'" :data="pressureTableDate" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="300">
                        <el-table-column prop="Station" label="编号"></el-table-column>
                        <el-table-column prop="PressureName" label="压力点名称"></el-table-column>
                        <el-table-column prop="CtPressure" label="目标压力(MPa)"></el-table-column>
                        <el-table-column prop="RtPressure" label="结果压力"></el-table-column>
                        <el-table-column prop="PressureChange" label="压力变化"></el-table-column>
                    </el-table>
                </div>

                <div class="pagination-wrapper">
                    <template v-if="curTab == 'UsersAffectedList'">
                        <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{usersAffectedListTotal}}&nbsp;条</span>
                        <el-pagination
                            layout="prev, pager, next"
                            :total="usersAffectedListTotal"
                            :page-size="pageSize"
                            :current-page="currentPage1"
                            @current-change="handleCurrentChange1">
                        </el-pagination>
                    </template>
                    <template v-if="curTab == 'PressureData'">
                        <span style="float:left;line-height: 1;padding-top: 14px;">共&nbsp;{{pressureDataTotal}}&nbsp;条</span>
                        <el-pagination
                            layout="prev, pager, next"
                            :total="pressureDataTotal"
                            :page-size="pageSize"
                            :current-page="currentPage2"
                            @current-change="handleCurrentChange2">
                        </el-pagination>
                    </template>
                </div>
            </template>
        </table-tab>
    </div>
</template>
<script>
import PanelTitle from './panelTitle.vue'
import DataBlock from './dataBlock.vue'
import TableTab from './tableTab.vue'
export default {
    components: { PanelTitle, DataBlock, TableTab },
    props: {
        titleShow: {
            type: Boolean,
            default: true
        },
        url: String,
        param: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    data() {
        return {
            currentPage1:1, //默认显示第一页
            currentPage2:1, //默认显示第一页
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
            dataList: [
                {
                    textTop: '管网最大压力变化(Mpa)',
                    value: 0,
                    textBottom: '变化节点',
                    posShow: true,
                    color: '#70991F'
                },{
                    textTop: '管道最大流速变化(m³/h)',
                    value: 0,
                    textBottom: '变化管道',
                    posShow: true,
                    color: '#E9AF3B'
                },{
                    textTop: '水厂流量最大变化(m³/h)',
                    value: 0,
                    textBottom: '—',
                    posShow: false,
                    color: '#6E7B8B'
                },{
                    textTop: '水厂压力最大变化(Mpa)',
                    value: 0,
                    textBottom: '—',
                    posShow: false,
                    color: '#D56459'
                }
            ],
            PressureData: [],
            UsersAffectedList: [],
            curTab: 'UsersAffectedList',
            tabs: [
                {name: '受停水影响用户列表', key: 'UsersAffectedList', tabClick:this.tabClick},
                {name: '压力控制点压力', key: 'PressureData', tabClick:this.tabClick}
            ]
        }
    },
    methods: {
        handleClick() {
            let self = this;
            this.$axios.post(this.url, {
                WaterStopDate: this.boundaryData.WaterStopDate,
                CodeId: this.boundaryData.CodeId,
                CTPressure: this.boundaryData.CTPressure,
                TolPlanWaterVol: this.boundaryData.TolPlanWaterVol,
                PipeNo: this.boundaryData.PipeNo
            }).then(function(R){
                self.dataList[0].value = R.data.PipeMaxPressure * R.data.PipeMaxPressureType
                self.dataList[1].value = R.data.PipeMaxFlowSpeed * R.data.PipeMaxFlowSpeedType
                self.dataList[2].value = R.data.WaterworksMaxFlowChg.Data * R.data.WaterworksMaxFlowChg.Type
                self.dataList[2].textBottom = R.data.WaterworksMaxFlowChg.WaterworksName
                self.dataList[3].value = R.data.WaterworksMaxPressureChg.Data * R.data.WaterworksMaxPressureChg.Type
                self.dataList[3].textBottom = R.data.WaterworksMaxPressureChg.WaterworksName

                self.PressureData = R.data.PressureData
                self.UsersAffectedList = R.data.UsersAffectedList
            })
        },
        tabClick(key) {
            this.curTab = key
        },
        handleCurrentChange1(val) {
            this.currentPage1 = val
        },
        handleCurrentChange2(val) {
            this.currentPage2 = val
        }
    },
    computed: {
        boundaryData() {
            return this.$store.state.planDispatch.schemeData.boundaryData
        },
        pressureDataTotal() {
            return this.PressureData.length
        },
        usersAffectedListTotal() {
            return this.UsersAffectedList.length
        },
        pressureTableDate() {
            let data = []
            for(let i = 0; i < this.pageSize; i++){
                data.push(this.PressureData[i + (this.currentPage2 - 1) * this.pageSize])
            }
            return data
        },
        usersAffectedTableDate() {
            let data = []
            for(let i = 0; i < this.pageSize; i++){
                data.push(this.UsersAffectedList[i + (this.currentPage1 - 1) * this.pageSize])
            }
            return data
        }
    } 
}
</script>
<style lang="less" scoped>
.model-analysis{
    height: 420px;
    .data-block-warp{
        text-align: center;
        padding: 30px 0;
    }
    .table-tab{
        padding: 10px;
        .inner-table{
            padding: 10px;
        }
    }
}
</style>
