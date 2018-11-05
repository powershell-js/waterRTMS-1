<template>
    <div class="demo-chart" >
        <hd-crud ref="report" style="height:400px;" :current="'D'" :single="true" :reports="reports" :auto-query="false">
        </hd-crud>
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
    import AttrTable from "../components/AttrTable.vue";
    import EventTable from "../components/EventTable.vue";

    export default {
    data() {
        return {
            reports: [
                {
                    code: "D",
                    url: new Promise((resolve, reject) => {
                        setTimeout(function() {
                            var data = {
                                Report: {
                                    Data: [
                                        { code: "ss", name: "ewe" },
                                        { code: "ss3", name: "ewe2" }
                                    ]
                                },
                                Chart: {
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
                                            dataView: {
                                                show: true,
                                                readOnly: false
                                            },
                                            magicType: {
                                                show: true,
                                                type: ["line", "bar"]
                                            },
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
                                                    {
                                                        type: "max",
                                                        name: "最大值"
                                                    },
                                                    {
                                                        type: "min",
                                                        name: "最小值"
                                                    }
                                                ]
                                            },
                                            markLine: {
                                                data: [
                                                    {
                                                        type: "average",
                                                        name: "平均值"
                                                    }
                                                ]
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
                                                data: [
                                                    {
                                                        type: "average",
                                                        name: "平均值"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            };
                            resolve(data);
                        }, 100);
                    }),
                    views: ["report", "chart"],
                    view: "report",
                    chartType: "echart",
                    quicks: () => {
                        return [
                            {
                                type: "daterange",
                                field: "date",
                                option: { format: "yyyy-MM-dd" },
                                min: "",
                                max: new Date().FormatString("yyyy-MM-dd"),
                                begin: new Date()
                                    .AddDays(-7)
                                    .FormatString("yyyy-MM-dd"),
                                end: new Date().FormatString("yyyy-MM-dd"),
                                valueType: "number"
                            }
                        ];
                    },
                    pager: { enable: true },
                    grid: {
                        rowno: false,
                        columns: [
                            { title: "方案编码", data: "code", width: 100 },
                            { title: "方案名称", data: "name", width: 160 }
                        ]
                    },
                    beforeQuery: params => {
                        return params;
                    },
                    afterQuery: (data, rpt) => {
                        return data;
                    },
                    afterRender: data => {

                    },
                    form: {
                        bindings: {
                            "NOTIFICATION": [
                                {Value: "1", Name: "方案一"},
                                {Value: "2", Name: "方案二"},
                                {Value: "3", Name: "方案三"},
                                {Value: "4", Name: "方案四"}
                            ]
                        },
                    model: {
                        _id: '',
                        status:1,
                        etime:"24:00"
                    },
                    rules: {},
                    inputs: [
                        [
                        { title: '方案编码', data: 'code', required: false, dataType: 'Number', showType: 'text'},
                        { title: '方案名称', data: 'name', required: true, dataType: 'String', showType: 'text' }
                        ],
                        [
                        { title: '报警级别', data: 'level', required: false, dataType: 'Integer', showType: 'text',format:"H0030" , unit:"级" },
                        { title: '报警范围', data: 'grade', required: false, dataType: 'Number', showType: 'combo',format:"H0031"}
                        ],
                        [
                            {
                                title: '通知方案', data: 'notifications',
                                required: false, dataType: 'String',
                                showType: 'combo', format: "NOTIFICATION",
                                multiple: true,
                                filterMethod: ({v, bind}) =>{
                                    return bind.filter(({Value}) =>{
                                        return Value == v;
                                    });
                                }
                            },
                        { title: '分区范围', data: 'area', required: false, dataType: 'String', showType: 'text',button: {icon:'el-icon-search'} },
                        ],
                        [
                        { title: '生效时间', data: 'stime', required: false, dataType: 'String', showType: 'combo',format:"TIME" },
                        { title: '截止时间', data: 'etime', required: true, dataType: 'String', showType: 'combo',format:"ENDTIME" }
                        ],
                        [
                        { title: '规则关系', data: 'logic', required: false,help:"或（满足一个报警规则就触发)<br>与（满足所有报警规则才触发）", dataType: 'Number', showType: 'combo',format:"LOGIC" },
                        { title: '人工确认', data: 'confirm', required: false,help:"需人工确认,否则不自动恢复", dataType: 'Number', showType: 'switch' }
                        ],
                        [
                        { title: '排序', data: 'order', required: true, dataType: 'Number', showType: 'text' },
                        { title: '启用', data: 'status', required: true, dataType: 'Number', showType: 'switch' }
                        ],
                        [
                            { title: '日期', data: 'rq', required: true, dataType: 'Number', showType: 'datetime'},
                            { title: '文件', data: 'wj', required: false, dataType: 'String', showType: 'upload'}
                        ]
                    ],
                    beforeSave: (data, isnew) => {
                        data.target = this.target;
                        data.target_type = this.target_type;

                        let notifications=data.notifications.split(",");

                        if(this.currentRow){
                        const crud = new CRUD("alarm/plan_notification");
                        crud.post("save",{plan:this.currentRow.code,notifications:notifications}).done((ds)=>{})
                        }
                    }
                    }
                }
            ],
            attrs:[
                {field:'title',title:'报表标题',type:'String',def:'-'},
                {field:'name',title:'报表名称',type:'String',def:'-'},
                {field:'current',title:'当前报表',type:'String',def:'-'},
                {field:'tabs',title:'底部报表切换显示',type:'Boolean',def:'false'},
                {field:'single',title:'报表单独展示',type:'Boolean',def:'false'},
                {field:'autoQuery',title:'自动查询',type:'Boolean',def:'false'},
                {field:'reversed',title:'按time字段倒序排',type:'Boolean',def:'false'},
                {field:'reports',title:'报表',type:'Arrary',def:'',source:'其中grid为hgrid'},
                {field:'bottomtitle',title:'底部标题',type:'String',def:''}
            ],
            hook:[
                {event:'beforeQuery',title:'查询前',args:'{params, pager, { order: sort }},this'},
                {event:'beforeSend',title:'请求前',args:''},
                {event:'afterQuery',title:'请求后',args:'data, report'},
                {event:'afterRender',title:'渲染后',args:'data'}
            ],
            reportsAttr:[
                {field:'code',title:'报表标识符',type:'String',def:'-'},
                {field:'url',title:'接口路径',type:'String',def:'-'},
                {field:'views',title:'组件组成',type:'Arrary',def:'',source:'report/chart'},
                {field:'view',title:'组件优先',type:'String',def:'report'},
                {field:'chartType',title:'图表类型',type:'String',source:'echart/highchart/highstock',def:'echart'},
                {field:'quicks',title:'报表头部筛选条件',type:'Arrary',source:'type属性可选daterange,date,checkbox,select,multiselect,number,numberrange,cascader'}
            ]
        };
    },
    components:{
        AttrTable,EventTable
    }
};
</script>
