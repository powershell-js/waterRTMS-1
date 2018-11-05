<template>
    <div class="emergency-setting-warp">
        <el-row style="height:100%">
            <el-col :span="2" style="height:100%">
                <div class="setting-tab" v-for="tab in tabList" :key="tab.key"
                :class="{'active':curTab == tab.key}" @click="curTab = tab.key">
                    <span>{{tab.name}}</span>
                </div>
            </el-col>
            <el-col :span="22" style="height:100%">
                <close-search-list v-show="curTab=='gfss'"  ></close-search-list><!-- ref="closeSearch" -->
                <mock-analyze-list v-show="curTab=='mnfx'"></mock-analyze-list>
                <emergency v-show="curTab=='yjdd'"></emergency>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import closeSearchList from './closeSearchList.vue';
import mockAnalyzeList from './mockAnalyzeList.vue';
import emergency from './emergency.vue'
export default {
    components: { closeSearchList, mockAnalyzeList, emergency },
    props: {
        diffusionData: Array,
        selectedTab: {
            type: String,
            default: 'gfss'
        },
        closeSearchListData:
            { 
                type: Object,
             default:{
                closeValveInfo:[],
                effectUserInfo:[]
                }
            }
        ,
       

    },
    mounted(){
        console.log("内部数据");
        console.log(this.closeSearchListData)
    },
    data() {
        return {
            curTab: 'gfss',
            tabList: [{name:'关阀搜索',key:'gfss'},{name:'模拟分析',key:'mnfx'},{name:'应急调度',key:'yjdd'}],
             closeValveInfo:[],
             effectUserInfo:[],
        }
    },
    methods: {
        closeSearch() {
            this.$refs.closeSearch.gbfmClick()
        },
        changeCloseListData(){
            this.closeValveInfo = this.closeSearchListData.closeValveInfo
            this.effectUserInfo = this.closeSearchListData.effectUserInfo
        }
    },
    watch: {
        selectedTab(val) {
            this.curTab = val
        },
       /*  closeSearchListData(){
            console.log("watch")
            console.log(this.closeSearchListData)
            this.changeCloseListData();
        } */
    }
}
</script>
<style lang="less" scoped>
.emergency-setting-warp{
    height: 100%;
    .el-col-2{
        border-right: 1px solid #D1D1DA;
    }
    .setting-tab{
        border-bottom: 1px solid #D1D1DA;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        &.active{
            background-color: #C2E086;
        }
    }
}
</style>
