<template>
    <div class="demo-chart">
        <h1>展开行</h1>
        <div>
            <el-table border :data="tableData5" style="width: 100%"
                      :height="260">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline
                                 class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="所属店铺">
                                <span>{{ props.row.shop }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.shopId }}</span>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="商品 ID"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="商品名称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="描述"
                    prop="desc">
                </el-table-column>
            </el-table>
        </div>
        <h1>合计行</h1>
        <div>
            <el-table
                :data="tableData6"
                border
                show-summary
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="amount1"
                    sortable
                    label="数值 1">
                </el-table-column>
                <el-table-column
                    prop="amount2"
                    sortable
                    label="数值 2">
                </el-table-column>
                <el-table-column
                    prop="amount3"
                    sortable
                    label="数值 3">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style lang="less">
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: calc(~"(100% - 20px) / 3");
        .el-form-item__label {
            color: #7a8b99;
        }
    }
</style>
<script>
    export default {
        components: {},
        data(){
            return {
                tableData5: [
                    {
                        id: '12987122',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }, {
                        id: '12987123',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }, {
                        id: '12987125',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }, {
                        id: '12987126',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }
                ],
                tableData6: [
                    {
                        id: '12987122',
                        name: '王小虎',
                        amount1: '234',
                        amount2: '3.2',
                        amount3: 10
                    }, {
                        id: '12987123',
                        name: '王小虎',
                        amount1: '165',
                        amount2: '4.43',
                        amount3: 12
                    }, {
                        id: '12987124',
                        name: '王小虎',
                        amount1: '324',
                        amount2: '1.9',
                        amount3: 9
                    }, {
                        id: '12987125',
                        name: '王小虎',
                        amount1: '621',
                        amount2: '2.2',
                        amount3: 17
                    }, {
                        id: '12987126',
                        name: '王小虎',
                        amount1: '539',
                        amount2: '4.1',
                        amount3: 15
                    }]
            };
        },
        methods: {
            getSummaries(param){
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if(index === 0){
                        sums[index] = '总价';
                        return;
                    }
                    const values = data.map(
                        item => Number(item[column.property]));
                    if(!values.every(value => isNaN(value))){
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if(!isNaN(value)){
                                return prev + curr;
                            }
                            else{
                                return prev;
                            }
                        }, 0);
                        sums[index] += ' 元';
                    }
                    else{
                        sums[index] = 'N/A';
                    }
                });

                return sums;
            }
        }
    }
</script>
