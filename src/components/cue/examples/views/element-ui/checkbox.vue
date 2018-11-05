<template>
    <div class="demo-chart">
        <h1>基础用法</h1>
        <div>
            <el-checkbox v-model="checked1">备选项1</el-checkbox>
            <el-checkbox v-model="checked2">备选项2</el-checkbox>
        </div>
        <h1>禁用状态</h1>
        <div>
            <el-checkbox v-model="checked3" disabled>备选项3</el-checkbox>
            <el-checkbox v-model="checked4" disabled>备选项4</el-checkbox>
        </div>
    </div>
</template>

<script>
    export default {
        name: "checkbox",
        components: {},
        data(){
            return {
                checked1: true,
                checked2: false,
                checked3: false,
                checked4: true
            };
        },
        methods: {}
    }
</script>
