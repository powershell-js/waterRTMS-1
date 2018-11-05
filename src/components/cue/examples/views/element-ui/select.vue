<template>
    <div class="demo-chart">
        <h1>普通用法</h1>
        <div style="overflow: hidden;">
            <el-select v-model="value1" placeholder="请选择" style="float:left;">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="请选择" clearable
                       style="float:left;">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <h1>禁用选项</h1>
        <div style="overflow: hidden;">
            <el-select v-model="value3" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label" :disabled="item.value == '选项2'"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <h1>禁用状态</h1>
        <div>
            <el-select v-model="value4" placeholder="请选择" disabled>
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "select",
        components: {},
        data(){
            return {
                value1: "", value2: "", value3: "", value4: "",
                options: [
                    {value: "选项1", label: "黄金糕"},
                    {value: "选项2", label: "双皮奶"},
                    {value: "选项3", label: "蚵仔煎"},
                    {value: "选项4", label: "龙须面"},
                    {value: "选项5", label: "北京烤鸭"}
                ]
            };
        },
        methods: {}
    }
</script>
