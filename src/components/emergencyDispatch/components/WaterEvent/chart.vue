<template>
    <div class="chart-warp">
        <h3 class="chart-title">管网{{title}}空间分布曲线</h3>
        <div ref="chart" class="chart-content">

        </div>
    </div>
</template>
<script>
const EChart = require("echarts")
export default {
    props: {
        title: String,
        chartData: Array,
    },
    data() {
        return {}
    },
    methods: {
        renderChart() {
            let myChart = EChart.init(this.$refs.chart)
            let option = {            
                tooltip: {
                        
                },  
                textStyle: {
                    fontSize: 14
                },
                grid: {
                    top: '0%',
                    left: '3%',
                    right: '17%',
                    bottom: '0%',
                    containLabel: true
                },        
                xAxis: {
                    type: 'value',
                    show: false,
                },
                yAxis: {
                    type: 'category',
                    data: this.chartData.map(c=>{ return c.PointName}),
                    axisLine:{
                        show: false
                    },
                    axisTick:{
                        show: false
                    },
                    splitLine: {
                        show:true,
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                },
                series: [
                    {
                        name: this.title,
                        type: 'bar',
                        barWidth: '13',
                        data: this.chartData.map(c=>{ return {name:c.PointName,value:c.Data.toFixed(2),color:c.ColorNo}}),
                        itemStyle: {                   
                            normal: {
                                color: function (params){
                                    return params.data.color
                                }
                            }
                        },
                    }              
                ]
            };
            myChart.setOption(option);
        }
    },
    watch: {
        chartData(val) {
            this.renderChart()
        }
    }
}
</script>
<style lang="less" scoped>
.chart-warp{
    height: 100%;
    padding: 10px;
    .chart-title{
        color: #6E7B8B;
        margin-bottom: 20px;
    }
    .chart-content{
        height: 400px;
    }
}
</style>
