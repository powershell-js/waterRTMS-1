<template>
    <div class="demo-chart">
        <h1>普通用法</h1>
        <div style="overflow: hidden;">
            <el-input style="width:150px; float: left;"
                      placeholder="请输入内容"></el-input>
            <el-input style="width:150px; float: left;" clearable
                      placeholder="请输入内容"></el-input>
        </div>
        <h1>带 icon 的输入框</h1>
        <div style="overflow: hidden;">
            <el-input placeholder="请输入内容" style="width:150px; float: left;">
                <i slot="prefix" class="fa fa-search" aria-hidden="true"></i>
            </el-input>
            <el-input placeholder="请输入内容" style="width:150px; float: left;"
                      suffix-icon="el-icon-search" clearable>
            </el-input>
            <el-input placeholder="请输入内容" style="width:150px; float: left;"
                      clearable>
                <i slot="suffix" class="fa fa-search" aria-hidden="true"></i>
            </el-input>
        </div>
        <h1>禁用状态</h1>
        <div>
            <el-input style="width:150px; float: left;" disabled
                      placeholder="请输入内容"></el-input>
            <el-input placeholder="请输入内容" style="width:150px; float: left;"
                      disabled>
                <i slot="suffix" class="fa fa-search" aria-hidden="true"></i>
            </el-input>
        </div>
    </div>
</template>

<script>
    export default {
        name: "input",
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
