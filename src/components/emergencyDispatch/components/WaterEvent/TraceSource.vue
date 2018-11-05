<template>
    <div class="trace-source-warp">
        <div class="trace-source-info">
            <h3 class="title">溯源信息</h3>
            <div class="trace-source-info-content">
                <div>
                    <h3 class="info-title">梅林水厂水质指标</h3>
                    <table>
                        <tr v-for="data in WaterCol" :key="data.title">
                            <td class="name">{{data.title}}</td>
                            <td class="value">{{ SourceData.WaterQualityTarget[data.field]&&SourceData.WaterQualityTarget[data.field].toFixed(2) }}</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <h3 class="info-title">污水点水质指标</h3>
                    <table>
                        <tr v-for="data in SewageCol" :key="data.title">
                            <td class="name">{{data.title}}</td>
                            <td class="value">{{ SourceData.WaterQualityTarget[data.field]&&SourceData.SewageQualityTarget[data.field].toFixed(2) }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="trace-source-chart">
            <chart :title="'余氯'" :chart-data="SourceData.ChlorineSpatialCurveData"></chart>
        </div>
        <div class="trace-source-chart">
            <chart :title="'浊度'" :chart-data="SourceData.TurbiditySpatialCurveData"></chart>
        </div>
        <div class="trace-source-chart">
            <chart :title="'PH值'" :chart-data="SourceData.PHSpatialCurveData"></chart>
        </div>
    </div>
</template>
<script>
import chart from './chart.vue';
export default {
    components: { chart },
    props: {
        SourceData: Object
    },
    data() {
        return {
            WaterCol: [{title: '出厂余氯(ppm)', field: 'Chlorine'},{title: '出厂浊度(NTU)', field: 'Turbidity'},{title: 'PH', field: 'PH'}],
            SewageCol: [{title: '余氯(ppm)', field: 'Chlorine'},{title: '浊度(NTU)', field: 'Turbidity'},{title: 'PH', field: 'PH'}]
        }
    },
}
</script>
<style lang="less" scoped>
.trace-source-warp{
    display: flex;
    flex-wrap: wrap;
    .trace-source-info{
        flex: 25;
        padding: 10px;
        border-right: 1px solid #E4E4EC;
        .title{
            border: 1px solid #E4E4EC;
            padding-left: 10px;
            line-height: 28px;
            background: linear-gradient(#ffffff, #EDEDEF);
        }
        .trace-source-info-content {
            .info-title{
                margin-top: 20px;
                margin-bottom: 10px;
            }
            table{
                width: 100%;
                td{
                    line-height: 24px;
                }
                .name{
                    color:#ACB3BA;
                }
                .value{
                    text-align: right;
                    font-weight: bold;
                }
            }
        }
    }
    .trace-source-chart{
        border-right: 1px solid #E4E4EC;
        flex: 35
    }
}
</style>
