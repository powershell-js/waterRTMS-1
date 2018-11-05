<template>
    <div class="demo-chart">
        <h1>HdChart 图表</h1>
        <el-row class="tac">
            <el-col :span="16" style="background-color: antiquewhite;">
                <p>Echart <el-button @click="exportEchart" type="primary"  size="mini">导出为jpg</el-button></p>
                <hd-chart style="height:500px;width:500px;" ref="echart" :options="option" auto-resize></hd-chart>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16" style="background-color: aliceblue;">
                <p>highchart <el-button @click="exportHchart" type="primary" size="mini">导出为jpg</el-button></p>
                <hd-chart style="height:500px;width:500px;" :options="option" ref="hchart" type="highchart" auto-resize></hd-chart>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16" style="background-color: aliceblue;">
                <p>highstock <el-button @click="exportStock" type="primary" size="mini">导出为jpg</el-button></p>
                <hd-chart style="height:500px;width:500px;" ref="stock" :options="stock" type="highstock" auto-resize></hd-chart>
            </el-col>
        </el-row>
        <h2>HdChart Attribute</h2>
        <attr-table :data="attrs"></attr-table>
        <h2>HdChart Methods</h2>
        <event-table :data="events"></event-table>
    </div>
</template>
<script>
import AttrTable from "../components/AttrTable.vue";
import EventTable from "../components/EventTable.vue";
export default {
    data() {
        return {
            option: {
                title: {
                    text: "未来一周气温变化",
                    subtext: "纯属虚构"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["最高气温", "最低气温"]
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ["line", "bar"] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        data: [
                            "周一",
                            "周二",
                            "周三",
                            "周四",
                            "周五",
                            "周六",
                            "周日"
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        axisLabel: {
                            formatter: "{value} °C"
                        }
                    }
                ],
                series: [
                    {
                        name: "最高气温",
                        type: "line",
                        data: [11, 11, 15, 13, 12, 13, 10],
                        markPoint: {
                            data: [
                                { type: "max", name: "最大值" },
                                { type: "min", name: "最小值" }
                            ]
                        },
                        markLine: {
                            data: [{ type: "average", name: "平均值" }]
                        }
                    },
                    {
                        name: "最低气温",
                        type: "line",
                        data: [1, -2, 2, 5, 3, 2, 0],
                        markPoint: {
                            data: [
                                {
                                    name: "周最低",
                                    value: -2,
                                    xAxis: 1,
                                    yAxis: -1.5
                                }
                            ]
                        },
                        markLine: {
                            data: [{ type: "average", name: "平均值" }]
                        }
                    }
                ]
            },
            stock: {
                chart: {
                    events: {
                        load: function() {
                            var ser = this.series[0];
                            var self = this;
                            setInterval(function() {
                                var x = new Date().getTime(),
                                    y = Math.round(Math.random() * 100);
                                ser.addPoint([x, y], true, true);
                            }, 1000);
                        }
                    }
                },
                rangeSelector: {
                    buttons: [
                        {
                            count: 1,
                            type: "minute",
                            text: "1M"
                        },
                        {
                            count: 5,
                            type: "minute",
                            text: "5M"
                        },
                        {
                            type: "all",
                            text: "All"
                        }
                    ],
                    inputEnabled: false,
                    selected: 0
                },
                title: {
                    text: "Live random data"
                },
                tooltip: {
                    split: false
                },
                series: [
                    {
                        name: "随机数据",
                        data: (function() {
                            // generate an array of random data
                            var data = [],
                                time = new Date().getTime(),
                                i;
                            for (i = -999; i <= 0; i += 1) {
                                data.push([
                                    time + i * 1000,
                                    Math.round(Math.random() * 100)
                                ]);
                            }
                            return data;
                        })()
                    }
                ]
            },
            attrs:[
                {field:'type',title:'图表类型',type:'String',source:'echart,highchart,highstock',def:'echart'},
                {field:'options',title:'图表配置',type:'Object',def:'-',links:[
                    {url:'http://echarts.baiducom/option.html',name:'echarts'},
                    {url:'https://api.hcharts.cn/highcharts',name:'highchart'},
                    {url:'https://api.hcharts.cn/highstock',name:'highstock'}
                ]}
            ],
            events:[
                {event:'export',title:'导出jpg'}
            ]
        };
    },
    methods: {
        exportStock(){
            this.$refs.stock.exports();
        },
        exportEchart(){
            this.$refs.echart.exports();
        },
        exportHchart(){
            this.$refs.hchart.exports();
        }
    },
    mounted() {},
    components: {
        AttrTable,
        EventTable
    }
};
</script>
