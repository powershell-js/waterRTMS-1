<template>
    <div class="demo-chart">
        <h1>HdEgrid 表格</h1>
        <hd-hgrid ref="grid" :columns="columns" :data="data" :height="250" @header-click="onHeaderClick" @row-click="onRowClick" @row-dblclick="onRowdblclick">
        </hd-hgrid>
        <h2>HdEgrid Attribute</h2>
        <attr-table :data="attrs"></attr-table>
        <event-table :data="events"></event-table>
    </div>
</template>
<script>
    import AttrTable from '../components/AttrTable.vue'
    import EventTable from '../components/EventTable.vue'

    export default {
    data() {
        var ds = []
        for (let i = 0; i < 100; i++) {
            ds.push({ code: 'code' + i,name: '名称' + i,stime: 'stime' + i })
        }
        return {
            columns: [
                {
                    title: '方案编码',
                    data: 'code',
                    width: 100, fixed:true,
                    format: (V, R) => {
                        return (
                            '<p style="color:red;">&nbsp;&nbsp;&nbsp;' +
                            V +
                            '</p>'
                        )
                    }
                },
                {
                    title: '复合表头',
                    children: [
                        { title: '方案名称', data: 'name', width: 160 },
                        { title: '通知方案', data: 'notifications', width: 90 },
                        {
                            title: '复合表头2',
                            children: [
                                { title: '开始时间', data: 'stime', width: 80 },
                                { title: '截止时间', data: 'etime', width: 80 }
                            ]
                        },
                        { title: '方案名称', data: 'name', width: 160 },
                        { title: '通知方案', data: 'notifications', width: 90 },
                        {
                            title: '复合表头2',
                            children: [
                                { title: '开始时间', data: 'stime', width: 80 },
                                { title: '截止时间', data: 'etime', width: 80 }
                            ]
                        }
                    ]
                },
                {
                    title: '报警范围',
                    data: 'grade',
                    width: 100,
                    format: 'H0031'
                }
            ],
            data: ds,
            attrs: [
                { field: 'data', title: '数据源', type: 'Arrary' },
                { field: 'columns', title: '列定义', type: 'Arrary' },
                {
                    field: 'rowno',
                    title: '是否显示行号',
                    type: 'Boolean',
                    def: 'false'
                },
                {
                    field: 'fit',
                    title: '列宽自适应',
                    type: 'Boolean',
                    def: 'true'
                },
                {
                    field: 'showHeader',
                    title: '表头',
                    type: 'Boolean',
                    def: 'true'
                },
                {
                    field: 'rowClassName',
                    title: '行的classname',
                    type: 'Object'
                },
                { field: 'bindings', title: '字典', type: 'Object' }
            ],
            events: [
                {
                    event: 'header-click',
                    title: '表头点击',
                    args: 'field, column, event'
                },
                {
                    event: 'cell-click',
                    title: '单元格单击',
                    args: 'field, value, currentRow, column, cell, event'
                },
                {
                    event: 'cell-dblclick',
                    title: '单元格双击',
                    args: 'field, value, row, column, cellProperties, event'
                },
                { event: 'row-click', title: '行单击', args: 'row, event' },
                { event: 'row-dblclick', title: '行双击', args: 'row, event' },
                {
                    event: 'current-change',
                    title: '当前行改变',
                    args: 'currentRow, oldCurrentRow'
                }
            ]
        }
    },
    methods: {
        onHeaderClick(field, column, event) {
            console.info("HeaderClick", field, column, event);
            // alert('HeaderClick')
        },
        onRowClick(row, event) {
            console.log('RowClick', row)
            // alert("RowClick");
        },
        onRowdblclick(row, event) {
            console.log('onRowdblclick', row)
        },
        resize() {
            this.$refs.grid.Render()
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.grid.SelectRow(2)
        })
    },
    components: {
        AttrTable,
        EventTable
    }
}
</script>
