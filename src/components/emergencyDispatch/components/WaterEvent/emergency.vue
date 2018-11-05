<template>
    <div class="emergency-warp">
        <h3 class="emergency-title">调度方案列表</h3>
        <reduction-scheme :url="url"></reduction-scheme>
        <h3 class="emergency-title">关闭阀门列表</h3>
        <div class="table-wrapper">
            <div class="inner-table">
                <el-table :data="tableDate" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="250">
                    <el-table-column prop="No" label="编号"></el-table-column>
                    <el-table-column prop="ValveNo" label="阀门编号"></el-table-column>
                    <el-table-column prop="Address" label="地址"></el-table-column>
                    <el-table-column prop="ValveCaliber" label="阀门口径(mm)"></el-table-column>
                    <el-table-column label="阀门操作">
                        <template slot-scope="scope">
                            {{{1:'开',2:'关'}[scope.row.ValveOperation]}}阀
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination-wrapper">
                <el-pagination
                    layout="total, prev, pager, next"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    :total="total"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import ReductionScheme from '../ReductionScheme.vue'
import urlClass from '@/components/js/UrlClass'
export default {
    components: { ReductionScheme },
    data(){
        return {
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
            tableTotalDate: [],
            url:''
        }
    },
    methods:{
       handleCurrentChange(val){
           this.currentPage = val
       },
       FetchButtonValveOffData() {
            let self = this
            this.$axios.post(urlClass.axiosUrl2+'GetButtonValveOffData').then(R=>{
                self.tableTotalDate = R.data.ButtonValveOffList
            })
       }
    },
    computed: {
        total() {
            return this.tableTotalDate.length
        },
        tableDate() {
            return this.tableTotalDate.slice((this.currentPage - 1) * this.pageSize, this.pageSize * this.currentPage)
        }
    },
    mounted() {
        this.FetchButtonValveOffData();
    },
    created(){
        this.url = urlClass.axiosUrl2+"GetEmergencyDispatchData";
    }
}
</script>
<style lang="less" scoped>
.emergency-warp{
    .emergency-title{
        color: #6E7B8B;
        line-height: 40px;
        border-bottom: 1px solid #D1D1DA;
        margin-left: 10px;
    }
    .reduction-scheme-warp{
        padding: 10px;
    }
}
</style>
