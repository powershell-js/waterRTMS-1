<template>
    <table class="demo-table">
        <thead>
            <tr>
                <th>事件名</th>
                <th>说明</th>
                <th>参数</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="d in data" :key="d.field">
                <td>{{d.event}}</td>
                <td>{{d.title}}</td>
                <td>{{d.args}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props: ["data"]
}
</script>
<style lang="less">
    .demo-content{
        padding: 5px;
    }
    .demo-table{
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        color: #5e6d82;
        font-size: 14px;
        margin-bottom: 45px;
        th{
            text-align: left;
            border-top: 1px solid #eaeefb;
            background-color: #eff2f7;
            white-space: nowrap;
        }
        td,th{
            border-bottom: 1px solid #eaeefb;
            padding: 10px;
            max-width: 250px;
        }
    }
</style>

