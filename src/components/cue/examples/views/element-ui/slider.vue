<template>
    <div class="demo-chart">
        <h1>普通用法</h1>
        <div>
            <el-slider style="width: 500px;" v-model="value1"></el-slider>
        </div>
        <h1>禁用状态</h1>
        <div>
            <el-slider style="width: 500px;" v-model="value2"
                       disabled></el-slider>
        </div>
    </div>
</template>

<script>
    export default {
        name: "slider",
        components: {},
        data(){
            return {
                value1: 50, value2: 50
            };
        },
        methods: {}
    }
</script>
