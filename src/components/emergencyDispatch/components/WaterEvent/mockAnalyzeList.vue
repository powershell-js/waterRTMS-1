<template>
    <div style="height:100%;box-sizing:border-box;">
        <div class="affectd_users">
            <div class="table-wrapper-out">
                 <h4>受停水影响用户列表</h4>
                <div class="table-wrapper">
                    <el-table :data="tableData" style="width: 100%" stripe :header-row-style="headerStyle" :row-style="rowStyle" height="100%">
                        <el-table-column prop="UserNum" label="编号"></el-table-column>
                        <el-table-column prop="UserName" label="用户名称"></el-table-column>
                        <el-table-column prop="Demand" label="用水量（m³）"></el-table-column>
                        <el-table-column prop="Pressure" label="压力降（m）"></el-table-column>
                        <el-table-column prop="Addr" label="地址"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="pagination-wrapper">
                <el-pagination
                    layout="total, prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '@/components/js/bus'
export default {
    props: {
        /* diffusionData: Array, */
    },
    data() {
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
            diffusionData: Array,
            tableData:[]
        };
    },
    methods: {
        handleCurrentChange(val){
           this.currentPage = val
       },
       pageCal(){
            this.tableData = [];
            for(let i = 0; i < this.pageSize; i++){
                this.tableData.push(this.diffusionData[i + (this.currentPage - 1) * this.pageSize])
            }
       }
    },
    computed: {
        total() {
            return this.diffusionData.length
        },
        tableDate() {
            this.pageCal();
        }
    },
    mounted(){
        let self = this;
            bus.$on("mockDataChange", e => {
            this.diffusionData = e; 
            self.pageCal()
            })
    }
};
</script>
<style lang="less" scoped>
    .affectd_users{
        height: 100%;
        .table-wrapper-out{
            padding:0 20px;
            box-sizing: border-box;
            height: calc(~"100% - 40px");
        }

        h4{
            font-size: 12px;
            color:#6e7b8b;
            line-height: 28px;
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
