<template>
    <div class="demo-chart">
        <h1>普通用法</h1>
        <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="9900">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        components: {},
        data(){
            return {
                current: 1,
            };
        },
        methods: {
            handleSizeChange(val){
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val){
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>
