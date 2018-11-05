<template>
    <div class="halt-production">
        <el-row>
            <el-col :span="6">
                <scheme-list :url="url+'GetWaterStopSchemeList'"></scheme-list>
            </el-col>
            <el-col :span="18">
                <boundary-conditions :url="url+'WaterStopSetting'"></boundary-conditions>
                <panel-title :title="'水厂停产减产调度方案'">
                    <el-button type="success" @click="handleClick">优化调度</el-button>
                </panel-title>
                <reduction-scheme v-if="waterworksShow"
                :checkable="true" :url="url+'GetStopWaterworks'"
                :param="{
                    WaterStopDate: boundaryData.WaterStopDate,
                    CodeId: boundaryData.CodeId,
                    CTPressure: boundaryData.CTPressure,
                    TolPlanWaterVol: boundaryData.TolPlanWaterVol,
                    PipeNo: boundaryData.PipeNo
                }"></reduction-scheme>
                <model-analysis :title-show="false" :url="url+'WaterStopSimulationCount'" ref="modelAnalysis"></model-analysis>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import urlClass from '@/components/js/UrlClass'
import SchemeList from '../cutWaterPlan/schemeList.vue'
import BoundaryConditions from '../cutWaterPlan/boundaryConditions.vue'
import PanelTitle from '../cutWaterPlan/panelTitle.vue'
import ReductionScheme from '@/components/emergencyDispatch/components/ReductionScheme.vue'
import ModelAnalysis from '../cutWaterPlan/modelAnalysis.vue'
export default {
    components: { SchemeList, BoundaryConditions, PanelTitle, ReductionScheme, ModelAnalysis },
    data() {
        return {
            dataList: [
                {
                    textTop: '管网最大压力变化(Mpa)',
                    value: -0.056,
                    textBottom: '变化节点',
                    posShow: true,
                    color: '#70991F'
                },{
                    textTop: '管道最大流速变化(m³/h)',
                    value: 762,
                    textBottom: '变化管道',
                    posShow: true,
                    color: '#E9AF3B'
                },{
                    textTop: '水厂流量最大变化(m³/h)',
                    value: -6532,
                    textBottom: '大涌北水厂',
                    posShow: false,
                    color: '#6E7B8B'
                },{
                    textTop: '水厂压力最大变化(Mpa)',
                    value: 0.031,
                    textBottom: '大涌南水厂',
                    posShow: false,
                    color: '#D56459'
                }
                
            ],
            waterworksShow: false,
            url:''
        }
    },
    mounted(){
        this.url = UrlClass.axiosUrJH;
    },
    methods: {
        handleClick() {
            this.waterworksShow = true;
            this.$refs.modelAnalysis.handleClick()
        }
    },
    computed: {
        boundaryData() {
            return this.$store.state.planDispatch.schemeData.boundaryData
        },
    },
    destroyed() {
        this.$store.dispatch('clear_scheme_data')
    }
}
</script>
<style lang="less" scoped>
.halt-production{
    .data-block-warp{
        text-align: center;
        padding: 30px 0;
    }
    .table-tab{
        padding: 10px;
    }
    .reduction-scheme-warp{
        padding: 10px;
    }
}
</style>
