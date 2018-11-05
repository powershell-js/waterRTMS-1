<template>
    <div class="plan-dispatch-warp">
        <el-row type="flex" style="height:100%;border: 1px solid #D1D1DA;">
            <el-col :span="13">
                <div class="plan-tabs">
                    <div class="plan-tabs-item" v-for="item in tabList" :key="item.name" @click="curTab = item.key"
                    :class="{'active': curTab===item.key}">
                        <span>{{item.name}}</span>
                    </div>
                    <div class="plan-tabs-content">
                        <rushApplyWater v-if="curTab === 'gfgs'"></rushApplyWater>
                        <springApplyWater v-if="curTab === 'cjgs'"></springApplyWater>
                        <cut-water-plan v-if="curTab === 'jhts'"></cut-water-plan>
                        <halt-production v-if="curTab === 'sctcjc'"></halt-production>
                    </div>
                </div>
            </el-col>
            <el-col :span="11" style="overflow:hidden">
                <arcgis-tdt></arcgis-tdt>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import ArcgisTdt from '../mytdt/PlanDispatchMap.vue'
import rushApplyWater from './components/rushApplyWater/index.vue'
import springApplyWater from './components/springApplyWater/index.vue'
import cutWaterPlan from './components/cutWaterPlan/index.vue'
import HaltProduction from './components/haltProduction/index.vue';

export default {
    components: { ArcgisTdt, rushApplyWater, springApplyWater, cutWaterPlan, HaltProduction},
    data() {
        return {
            curTab: 'gfgs',
            tabList: [
                {name: '高峰供水', key: 'gfgs'},
                {name: '春节供水', key: 'cjgs'},
                {name: '计划停水', key: 'jhts'},
                {name: '水厂停产减产', key: 'sctcjc'}
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.plan-dispatch-warp{
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    .plan-tabs{
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        .plan-tabs-item{
            box-sizing: border-box;
            border-bottom: 1px solid #d1d1da;
            border-right: 1px solid #d1d1da;
            background-color:#f5f5f6;
            flex: 1;
            width: 25%;
            min-width: 25%;
            max-width: 25%;
            text-align: center;
            cursor: pointer;
            height: 40px;
            line-height: 40px;
            transition: background-color .1s;
            &.active{
                background-color: #70991F;
                color: white;
            }
            &:last-child{
                border-right:none;
            }
        }
        .plan-tabs-content{
            width: 100%;
            height: calc(~"100% - 40px");
            overflow-y: auto;
        }
    }
}
</style>
<style lang="less">

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #fff;
    }

    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        background-color: #dfe3e5;
    }
    .hd-icon{
        vertical-align: middle;
        display: inline-block;
        width: 15px;
        height: 15px;
        &.add{
            background: url("~@/assets/add.png") no-repeat;
        }
        &.delete{
            background: url("~@/assets/delete.png") no-repeat;
            height: 19px;
        }
        &.save{
            background: url("~@/assets/save.png") no-repeat;
        }
        &.pos{
            background: url("~@/assets/pos.png") no-repeat;
        }
    }
    
</style>

