<template>
    <div class="reduction-scheme-warp">
        <table>
            <tr class="head">
                <td v-for="h in head" :key="h" :width="checkable?'11%':'12%'">{{h}}</td>
                <td v-for="i in 8" :key="i" :width="checkable?'7%':'8%'">{{i}}#</td>
            </tr>
            <tr v-for="item in factoryData" :key="item.code">
                <td>{{item.name}}</td>
                <td>{{item.yl}}</td>
                <td>{{item.ll}}</td>
                <td v-if="checkable"><el-checkbox v-model="item.isSlchooseable"></el-checkbox></td>
                <td v-for="i in 8" :key="i">
                    <template v-if="item.bzData[i-1]&&item.bzData[i-1].length>1">
                        <div v-for="b in item.bzData[i-1]" class="bz-data green" :key="b">{{b}}</div>
                    </template>
                    <template v-else>
                        <div v-if="item.bzData[i-1]===null"></div>
                        <div v-else class="bz-data green">{{item.bzData[i-1]}}</div>
                    </template>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    components: {},
    props: {
        checkable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // head: ['水厂名称','出厂压力(MPa)','出厂流量(m³/h)'],
        }
    },
    computed: {
        factoryData() {
            return this.$store.state.emergencyDispatch.factoryData
        },
        head() {
            let h = ['水厂名称','出厂压力(MPa)','出厂流量(m³/h)']
            if(this.checkable)
                h.push('水量是否可选')
            return h
        }
    },
}
</script>
<style lang="less" scoped>
.reduction-scheme-warp{
    padding: 10px;
    // box-sizing: border-box;
    table{
        width: 100%;
        .head{
            background-color: #F0F0F1;
            line-height: 24px;
        }
        td{
            // line-height: 24px;
            padding: 8px 2px;
            .bz-data{
                text-align: center;
                display: inline-block;
                width: 100%;
                margin-bottom: 2px;
                &.green{
                    background-color: #ABE931;
                }
                &.red{
                    background-color: #F03939;
                }
            }
        }
    }
}
</style>
