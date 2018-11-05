<template>
    <div class="demo-chart">
        <h1>普通用法</h1>
        <div>
            <el-switch v-model="value1"></el-switch>
        </div>
        <h1>禁用状态</h1>
        <div>
            <el-switch v-model="value2" disabled></el-switch>
            <el-switch v-model="value3" disabled></el-switch>
        </div>
    </div>
</template>

<script>
    export default {
        name: "switch",
        components: {},
        data(){
            return {
                value1: false, value2: true, value3: false
            };
        },
        methods: {}
    }
</script>
