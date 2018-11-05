<template>
    <div class="demo-chart">
        <h1>HdEgrid 表格</h1>
        <div style="height:300px;">
            <hd-egrid ref="grid" :columns="columns" :data="data" :height="250" @row-click="onRowClick" checkable></hd-egrid>
        </div>
        <h2>HdEgrid Attribute</h2>
        <attr-table :data="attrs"></attr-table>
        <h2>HdEgrid Events</h2>
        <event-table :data="events"></event-table>
        <h2>HdEgrid Methods</h2>
        <event-table :data="methods"></event-table>
    </div>
</template>
<script>
    import AttrTable from "../components/AttrTable.vue";
    import EventTable from "../components/EventTable.vue";

    export default {
    data() {
        var ds=[];
        var t=(+new Date())/1000 - 1000*60*60;
        for (let i = 0; i < 100; i++) {
            ds.push({code:"   code"+i,stime:t+i*1000});
        }
        return {
            data:ds,
            columns: [
                { title: "方案编码", data: "code", width: 100, fixed:"left" },
                { title: "方案名称", data: "name", width: 160 },
                { title: "通知方案", data: "notifications", width: 90 },
                {
                    title: "时间", children: [
                        {title: "开始时间", data: "stime", width: 80},
                        {title: "截止时间", data: "etime", width: 80}
                    ]
                },
                {
                    title: "报警范围",
                    data: "grade",
                    width: 100,
                    format: "H0031"
                }
            ],
            attrs: [
                {field:'data',title:'数据源',type:'Arrary'},
                {field:'columns',title:'列定义',type:'Arrary'},
                {field:'rowno',title:'是否显示行号',type:'Boolean',def:'false'},
                {field:'checkable',title:'选中框',type:'Boolean',def:'false'},
                {field:'stripe',title:'斑马纹',type:'Boolean',def:'false'},
                {field:'border',title:'纵向边框',type:'Boolean',def:'true'},
                {field:'fit',title:'列宽自适应',type:'Boolean',def:'true'},
                {field:'showHeader',title:'表头',type:'Boolean',def:'true'},
                {field:'currentRowKey',title:'当前行的 key',type:'String',def:'_id'},
                {field:'rowClassName',title:'行的classname',type:'Object'},
                {field:'rowStyle',title:'行的style',type:'String'},
                {field:'rowKey',title:'row-key 行数据的 Key',type:'String'},
                {field:'index',title:'页码',type:'Number',def:'1'},
            ],
            events:[
                {event:'select',title:'选中',args:'selection, row'},
                {event:'select-all',title:'全部选中',args:'selection'},
                {event:'cell-click',title:'单元格点击',args:'field, value, row, column, cell, event'},
                {event:'header-click',title:'表头点击',args:'field, value, row, column, cell, event'},
                {event:'cell-dblclick',title:'单元格双击',args:'field, value, row, column, cell, event'},
                {event:'row-click',title:'行单击',args:'row, event'},
                {event:'row-dblclick',title:'行双击',args:'row, event'},
                {event:'sort-change',title:'改变排序',args:'order'},
                {event:'current-change',title:'当前行改变',args:'currentRow,oldCurrentRow'},
                {event:'selection-change',title:'选中改变',args:'selection'},
                {event:'selection-change',title:'选中改变',args:'selection'},
            ],
            methods:[
                {event:'onToggleRowSelection',title:'用于多选表格，切换某一行的选中状态',args:'row, selected'},
            ]
        };
    },
    methods: {
        onRowClick(r){
            console.log(r);
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this.$refs.grid.SelectRow(2);
        })
    },
    components: {
        AttrTable,
        EventTable
    }
};
</script>
