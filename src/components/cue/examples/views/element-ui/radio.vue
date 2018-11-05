<template>
    <div class="demo-chart">
        <h1>普通用法</h1>
        <div>
            <el-radio v-model="radio1" label="1">备选项1</el-radio>
            <el-radio v-model="radio1" label="2">备选项2</el-radio>
        </div>
        <h1>禁用状态</h1>
        <div>
            <el-radio v-model="radio2" label="1" disabled>备选项1</el-radio>
            <el-radio v-model="radio2" label="2" disabled>备选项2</el-radio>
        </div>
        <h1>按钮样式</h1>
        <div>
            <el-radio-group v-model="radio6" size="mini">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="北京"></el-radio-button>
                <el-radio-button label="广州" disabled></el-radio-button>
                <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: "radio",
        components: {},
        data(){
            return {
                radio1: "1",
                radio2: "1",
                radio6: "上海"
            };
        },
        methods: {}
    }
</script>
