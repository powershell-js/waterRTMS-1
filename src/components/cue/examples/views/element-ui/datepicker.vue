<template>
    <div class="demo-chart">
        <h1>天</h1>
        <div>
            <el-date-picker v-model="d1" type="date" placeholder="选择日期"
                            style="width:110px;">
            </el-date-picker>
        </div>
        <h1>周</h1>
        <div>
            <el-date-picker v-model="d2" type="week" placeholder="选择周"
                            format="yyyy 第 WW 周" style="width:130px;">
            </el-date-picker>
        </div>
        <h1>月</h1>
        <div>
            <el-date-picker v-model="d3" type="month" placeholder="选择月"
                            style="width:90px;">
            </el-date-picker>
        </div>
        <h1>年</h1>
        <div>
            <el-date-picker v-model="d4" type="year" placeholder=""
                            style="width:70px;">
            </el-date-picker>
        </div>
        <h1>范围</h1>
        <div>
            <el-date-picker v-model="d5" type="daterange" placeholder=""
                            style="width: 210px;" :clearable="true">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
    export default {
        name: "datepicker",
        components: {},
        data(){
            return {
                d1: "", d2: "", d3: "", d4: "", d5: ""
            };
        },
        methods: {}
    }
</script>
