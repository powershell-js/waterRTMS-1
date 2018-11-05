<template>
    <div class="demo-chart">
        <hd-e-report ref="report" style="height:400px;" :current="'D'" :reports="reports" :auto-query="true">
        </hd-e-report>
        <h2>Report Attribute</h2>
        <attr-table :data="attrs">
        </attr-table>
        <h2>Report Hook</h2>
        <event-table :data="hook">
        </event-table>
        <h2>reports Attribute</h2>
        <attr-table :data="reportsAttr">
        </attr-table>
    </div>
</template>
<script>
import AttrTable from '../components/AttrTable.vue'
import EventTable from '../components/EventTable.vue'
export default {
    data() {
        return {
            reports: [
                {
                    code: 'D',
                    name: '日报',
                    url: new Promise((resolve, reject) => {
                        setTimeout(function() {
                            var ds = []
                            for (let i = 0; i <= 100; i++) {
                                ds.push({
                                    code: 'Code' + i,
                                    name: '   Name DAILY' + i
                                })
                            }
                            var data = {
                                Report: {
                                    Data: ds
                                },
                                Chart: {
                                    title: {
                                        text: '未来一周气温变化',
                                        subtext: '纯属虚构'
                                    },
                                    tooltip: {
                                        trigger: 'axis'
                                    },
                                    legend: {
                                        data: ['最高气温', '最低气温']
                                    },
                                    toolbox: {
                                        show: true,
                                        feature: {
                                            mark: { show: true },
                                            dataView: {
                                                show: true,
                                                readOnly: false
                                            },
                                            magicType: {
                                                show: true,
                                                type: ['line', 'bar']
                                            },
                                            restore: { show: true },
                                            saveAsImage: { show: true }
                                        }
                                    },
                                    calculable: true,
                                    xAxis: [
                                        {
                                            type: 'category',
                                            boundaryGap: false,
                                            data: [
                                                '周一',
                                                '周二',
                                                '周三',
                                                '周四',
                                                '周五',
                                                '周六',
                                                '周日'
                                            ]
                                        }
                                    ],
                                    yAxis: [
                                        {
                                            type: 'value',
                                            axisLabel: {
                                                formatter: '{value} °C'
                                            }
                                        }
                                    ],
                                    series: [
                                        {
                                            name: '最高气温',
                                            type: 'line',
                                            data: [11, 11, 15, 13, 12, 13, 10],
                                            markPoint: {
                                                data: [
                                                    {
                                                        type: 'max',
                                                        name: '最大值'
                                                    },
                                                    {
                                                        type: 'min',
                                                        name: '最小值'
                                                    }
                                                ]
                                            },
                                            markLine: {
                                                data: [
                                                    {
                                                        type: 'average',
                                                        name: '平均值'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            name: '最低气温',
                                            type: 'line',
                                            data: [1, -2, 2, 5, 3, 2, 0],
                                            markPoint: {
                                                data: [
                                                    {
                                                        name: '周最低',
                                                        value: -2,
                                                        xAxis: 1,
                                                        yAxis: -1.5
                                                    }
                                                ]
                                            },
                                            markLine: {
                                                data: [
                                                    {
                                                        type: 'average',
                                                        name: '平均值'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                Pager: {
                                    Total: ds.length
                                }
                            }
                            resolve(data)
                        }, 100)
                    }),
                    views: ['report', 'chart'],
                    view: 'report',
                    chartType: 'echart',
                    quicks: () => {
                        return [
                            {
                                type: 'daterange',
                                field: 'date',
                                option: {
                                    format: 'yyyy-MM-dd HH:mm:ss',
                                    clearable: false
                                },
                                min: '',
                                max: new Date().FormatString(
                                    'yyyy-MM-dd HH:mm:ss'
                                ),
                                begin: new Date()
                                    .AddDays(-7)
                                    .FormatString('yyyy-MM-dd HH:mm:ss'),
                                end: new Date().FormatString(
                                    'yyyy-MM-dd HH:mm:ss'
                                ),
                                valueType: 'number'
                            },
                            {
                                type: 'date',
                                field: 'date',
                                option: {
                                    format: 'yyyy-MM-dd HH:mm:ss',
                                    clearable: true
                                },
                                min: '',
                                max: new Date().FormatString(
                                    'yyyy-MM-dd HH:mm:ss'
                                ),
                                valueType: 'number'
                            }
                        ]
                    },
                    pager: { enable: true },
                    grid: {
                        rowno: false,
                        columns: [
                            { title: '方案编码', data: 'code', width: 100 },
                            { title: '方案名称', data: 'name', width: 160 }
                        ]
                    },
                    beforeQuery: params => {
                        return params
                    },
                    afterQuery: (data, rpt) => {
                        return data
                    },
                    afterRender(data) {}
                },
                {
                    code: 'M',
                    name: '月报',
                    url: new Promise((resolve, reject) => {
                        setTimeout(function() {
                            var ds = []
                            for (let i = 0; i <= 100; i++) {
                                ds.push({
                                    code: 'Code' + i,
                                    name: 'Name MONTH' + i
                                })
                            }
                            var data = {
                                Report: {
                                    Data: ds
                                },
                                Chart: {
                                    title: {
                                        text: '未来一周气温变化',
                                        subtext: '纯属虚构'
                                    },
                                    tooltip: {
                                        trigger: 'axis'
                                    },
                                    legend: {
                                        data: ['最高气温', '最低气温']
                                    },
                                    toolbox: {
                                        show: true,
                                        feature: {
                                            mark: { show: true },
                                            dataView: {
                                                show: true,
                                                readOnly: false
                                            },
                                            magicType: {
                                                show: true,
                                                type: ['line', 'bar']
                                            },
                                            restore: { show: true },
                                            saveAsImage: { show: true }
                                        }
                                    },
                                    calculable: true,
                                    xAxis: [
                                        {
                                            type: 'category',
                                            boundaryGap: false,
                                            data: [
                                                '周一',
                                                '周二',
                                                '周三',
                                                '周四',
                                                '周五',
                                                '周六',
                                                '周日'
                                            ]
                                        }
                                    ],
                                    yAxis: [
                                        {
                                            type: 'value',
                                            axisLabel: {
                                                formatter: '{value} °C'
                                            }
                                        }
                                    ],
                                    series: [
                                        {
                                            name: '最高气温',
                                            type: 'line',
                                            data: [11, 11, 15, 13, 12, 13, 10],
                                            markPoint: {
                                                data: [
                                                    {
                                                        type: 'max',
                                                        name: '最大值'
                                                    },
                                                    {
                                                        type: 'min',
                                                        name: '最小值'
                                                    }
                                                ]
                                            },
                                            markLine: {
                                                data: [
                                                    {
                                                        type: 'average',
                                                        name: '平均值'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            name: '最低气温',
                                            type: 'line',
                                            data: [1, -2, 2, 5, 3, 2, 0],
                                            markPoint: {
                                                data: [
                                                    {
                                                        name: '周最低',
                                                        value: -2,
                                                        xAxis: 1,
                                                        yAxis: -1.5
                                                    }
                                                ]
                                            },
                                            markLine: {
                                                data: [
                                                    {
                                                        type: 'average',
                                                        name: '平均值'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                Pager: {
                                    Total: ds.length
                                }
                            }
                            resolve(data)
                        }, 100)
                    }),
                    views: ['report', 'chart'],
                    view: 'chart',
                    chartType: 'echart',
                    quicks: () => {
                        return [
                            {
                                type: 'daterange',
                                field: 'date',
                                option: {
                                    format: 'yyyy-MM-dd HH:mm:ss',
                                    clearable: false
                                },
                                min: '',
                                max: new Date().FormatString(
                                    'yyyy-MM-dd HH:mm:ss'
                                ),
                                begin: new Date()
                                    .AddDays(-7)
                                    .FormatString('yyyy-MM-dd HH:mm:ss'),
                                end: new Date().FormatString(
                                    'yyyy-MM-dd HH:mm:ss'
                                ),
                                valueType: 'number'
                            }
                        ]
                    },
                    pager: { enable: true },
                    grid: {
                        rowno: false,
                        columns: [
                            { title: '方案编码2', data: 'code', width: 100 },
                            { title: '方案名称2', data: 'name', width: 160 }
                        ]
                    },
                    beforeQuery: params => {
                        return params
                    },
                    afterQuery: (data, rpt) => {
                        return data
                    },
                    afterRender: data => {}
                }
            ],
            attrs: [
                { field: 'title', title: '报表标题', type: 'String', def: '-' },
                { field: 'name', title: '报表名称', type: 'String', def: '-' },
                {
                    field: 'current',
                    title: '当前报表',
                    type: 'String',
                    def: '-'
                },
                {
                    field: 'tabs',
                    title: '底部报表切换显示',
                    type: 'Boolean',
                    def: 'false'
                },
                {
                    field: 'single',
                    title: '报表单独展示',
                    type: 'Boolean',
                    def: 'false'
                },
                {
                    field: 'autoQuery',
                    title: '自动查询',
                    type: 'Boolean',
                    def: 'false'
                },
                {
                    field: 'reversed',
                    title: '按time字段倒序排',
                    type: 'Boolean',
                    def: 'false'
                },
                {
                    field: 'reports',
                    title: '报表',
                    type: 'Arrary',
                    def: '',
                    source: '其中grid为hgrid'
                },
                {
                    field: 'bottomtitle',
                    title: '底部标题',
                    type: 'String',
                    def: ''
                }
            ],
            hook: [
                {
                    event: 'beforeQuery',
                    title: '查询前',
                    args: '{params, pager, { order: sort }},this'
                },
                { event: 'beforeSend', title: '请求前', args: '' },
                { event: 'afterQuery', title: '请求后', args: 'data, report' },
                { event: 'afterRender', title: '渲染后', args: 'data' }
            ],
            reportsAttr: [
                {
                    field: 'code',
                    title: '报表标识符',
                    type: 'String',
                    def: '-'
                },
                { field: 'url', title: '接口路径', type: 'String', def: '-' },
                {
                    field: 'views',
                    title: '组件组成',
                    type: 'Arrary',
                    def: '',
                    source: 'report/chart'
                },
                {
                    field: 'view',
                    title: '组件优先',
                    type: 'String',
                    def: 'report'
                },
                {
                    field: 'chartType',
                    title: '图表类型',
                    type: 'String',
                    source: 'echart/highchart/highstock',
                    def: 'echart'
                },
                {
                    field: 'quicks',
                    title: '报表头部筛选条件',
                    type: 'Arrary',
                    source:
                        'type属性可选daterange,date,checkbox,select,multiselect,number,numberrange,cascader'
                }
            ]
        }
    },
    mounted() {
        let self = this
        setTimeout(() => {
            self.$refs.report.SelectRow(2)
        }, 1000)
    },
    components: {
        AttrTable,
        EventTable
    }
}
</script>
