<template>
    <div class="boundary-conditions-warp">
        <panel-title :title="'边界条件设置'"></panel-title>
        <div class="boundary-conditions-content">
            <div class="basic-info">
                <span class="info-item text-bold item-border">方案基本信息</span>
                <span class="info-item">
                    <span class="text-gray">建立时间:</span>
                    <span class="text-bold">{{boundaryData.SettingTime}}</span>
                </span>
                <span class="info-item">
                    <span class="text-gray">负责人:</span>
                    <span class="text-bold">{{boundaryData.ResponPerson}}</span>
                </span>
                <el-row class="info-border">
                    <el-col :span="6">
                        <span class="info-item">
                            <span class="text-gray">停水日期:</span>
                            <span class="text-bold">{{boundaryData.WaterStopDate}}</span>
                        </span>
                    </el-col>
                    <el-col :span="6">
                        <span class="info-item">
                            <span class="text-gray">开始时间:</span>
                            <span class="text-bold">{{boundaryData.StartTime}}</span>
                        </span>
                    </el-col>
                    <el-col :span="6">
                        <span class="info-item">
                            <span class="text-gray">结束时间:</span>
                            <span class="text-bold">{{boundaryData.EndTime}}</span>
                        </span>
                    </el-col>
                    <el-col :span="6">
                        <span class="info-item">
                            <span class="text-gray">方案总水量</span>
                            <span class="text-bold">{{boundaryData.TolPlanWaterVol}}</span>
                            <span class="text-gray">m³/h</span>
                        </span>
                    </el-col>
                </el-row>
            </div>
            <panel-title :title="'压力控制点压力'" :color-show="false" :line-height="34" :font-size="12" :border-show="false">
                <span class="opt-btn"><i class="hd-icon add"></i>添加</span>&emsp;
                <span class="opt-btn"><i class="hd-icon save"></i>保存</span>
            </panel-title>
            <div class="boundary-conditions-table">
                <el-table
                    :data="boundaryData.PressurePointData"
                    stripe
                    style="width: 100%"
                    height="250">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="Station"
                    label="编号">
                    </el-table-column>
                    <el-table-column
                    prop="PressureName"
                    label="压力点名称">
                    </el-table-column>
                    <el-table-column
                    label="目标压力(MPa)">
                        <template slot-scope="scope">
                            <input v-model="scope.row.CtPressure">
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import PanelTitle from './panelTitle.vue'
export default {
    components: { PanelTitle },
    props: {
        url: String
    },
    data() {
        return {
            boundaryData: {
                PressurePointData: []
            }
        }
    },
    methods: {
        fetchStopWaterSetting() {
            let self = this
            this.$axios.post(this.url, {SchemeNo: this.schemeNo}).then(R=>{
                self.boundaryData = R.data
                self.$store.dispatch('set_boundaryData', R.data)
            })
        }
    },
    computed: {
        schemeNo() {
            return this.$store.state.planDispatch.schemeData.schemeNo
        }
    },
    watch: {
        schemeNo(val) {
            this.fetchStopWaterSetting()
        }
    }
}
</script>
<style lang="less" scoped>
.boundary-conditions-warp{
    .boundary-conditions-content{
        .basic-info{
            .info-item{
                padding: 5px 20px;
                display: inline-block;
                &.item-border{
                    border-right: 1px solid #D1D1DA;
                }
            }
            .text-bold{
                font-weight: bold;
                color: #6E7B8B;
            }
            .text-gray{
                color: #ACB3BA;
            }
            .info-border{
                border-top: 1px solid #D1D1DA;
                border-bottom: 1px solid #D1D1DA;
            }
        }
        .opt-btn{
            cursor: pointer;
            color: #ACB3BA;
        }
        .boundary-conditions-table{
            padding: 0 10px 10px 10px;
            border-bottom: 1px solid #D1D1DA;
        }
    }
}
</style>
