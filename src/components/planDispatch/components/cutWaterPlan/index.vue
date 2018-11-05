<template>
    <div class="cut-water-plan">
        <el-row>
            <el-col :span="6">
                <scheme-list :url="url+'GetSchemeList'"></scheme-list>
            </el-col>
            <el-col :span="18">
                <boundary-conditions :url="url+'PlanStopWaterSetting'"></boundary-conditions>
                <panel-title :title="'停水分析'" :border-show="false">
                    <el-input placeholder="请输入内容" class="el-input--suffix"></el-input>
                    <el-button>图上选择停水管道</el-button>
                </panel-title>
                <step :steps="steps"></step>
                <cut-water-dispos v-if="curStep == 'tscz'"></cut-water-dispos>
                <model-analysis v-if="curStep == 'mnjs'" :url="url+'SimulationCount'"></model-analysis>
                <optimal-operation v-if="curStep == 'yhdd'"></optimal-operation>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import urlClass from '@/components/js/UrlClass'
import SchemeList from './schemeList.vue'
import BoundaryConditions from './boundaryConditions.vue'
import PanelTitle from './panelTitle.vue'
import step from '../../../step.vue'
import CutWaterDispos from './cutWaterDispos.vue'
import ModelAnalysis from './modelAnalysis.vue'
import OptimalOperation from './optimalOperation.vue'
export default {
    components: { SchemeList, BoundaryConditions, PanelTitle, step, CutWaterDispos, OptimalOperation, ModelAnalysis },
    data() {
        return {
            steps: [
                {name: '停水处置',onClick:this.stepClick,key:'tscz'},
                {name: '模拟计算',onClick:this.stepClick,key:'mnjs'},
                {name: '优化调度',onClick:this.stepClick,key:'yhdd'},
            ],
            curStep: 'tscz',
            url:''
        }
    },
    mounted(){
        this.url = this.urlClass.axiosUrJH;
    },
    methods: {
        stepClick(key) {
            this.curStep = key
        }
    },
    destroyed() {
        this.$store.dispatch('clear_scheme_data')
    }
}
</script>
<style lang="less" scoped>
.cut-water-plan{
    .el-input--suffix{
        width: 200px;
    }
}
</style>
