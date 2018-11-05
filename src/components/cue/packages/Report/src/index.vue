<template>
    <div class="hd-report">
        <div class="hd-report-header" v-show="header">
            <slot name="tree"></slot>
            <slot name="title">
                <div class="hd-report-title" v-if="title">
                    <span>{{title}}</span>
                </div>
            </slot>
            <div class="hd-report-conditions" v-for="rpt in proreports" :key="rpt.code">
                <hd-top-bar ref="topbar" :config="rpt.quicks" v-show="rpt.code == curcode"></hd-top-bar>
            </div>
            <div class="hd-report-command">
                <el-button type="success" size="mini" icon="el-icon-search" v-show="(proreports[index].quicks || []).length > 0" @click="Query">查询
                </el-button>
                <slot name="extend"></slot>
            </div>
            <div class="hd-report-checkbox " v-show="(proreports[index].quickothers || []).length > 0">
                <el-checkbox v-for="rpt in proreports[index].quickothers" :label="rpt.label" v-model="rpt.checked" @change="rpt.change(rpt)" :key="rpt.str"></el-checkbox>
            </div>
            <div class="hd-report-tools">
                <slot name="custom-tool"></slot>
                <template v-if="proreports[index].views.length > 1">
                    <el-button size="mini" circle title="列表" :type="proreports[index].view=='report'?'primary':''" @click="ChangeView('report')">
                        <i class="fa fa-table" aria-hidden="true"></i>
                    </el-button>
                    <el-button size="mini" circle title="图表" :type="proreports[index].view=='chart'?'primary':''" @click="ChangeView('chart')">
                        <i class="fa fa-line-chart" aria-hidden="true"></i>
                    </el-button>
                </template>
                <template v-if="contains(['report','chart'],proreports[index].view)">
                    <el-button size="mini" circle v-show="!proreports[index].buttons.export.hide" :disabled="proreports[index].buttons.export.disabled" :title="proreports[index].buttons.export.name||'导出'" v-if="!proreports[index].pager.enable" @click="ExportData(proreports[index].view=='report'?'page':'chart')">
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </el-button>
                    <el-dropdown v-else @command="ExportData">
                        <el-button circle size="mini" v-show="!proreports[index].buttons.export.hide" :disabled="proreports[index].buttons.export.disabled" :title="proreports[index].buttons.export.name||'导出'">
                            <i class="fa fa-download" aria-hidden="true"></i>
                        </el-button>
                        <el-dropdown-menu class="hd-report-dropdown-menu" slot="dropdown">
                            <el-dropdown-item command="page">当页
                            </el-dropdown-item>
                            <el-dropdown-item command="all">全部
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </div>
        </div>
        <div class="hd-report-body" :class="'hd-report-body--' + curcode" @contextmenu="onContextMenu($event)">
            <div class="hd-report-report" :style="{height: gridHeight+'px'}" v-show="proreports[index].view == 'report'">
                <slot name="report-view">
                    <hd-egrid ref="grid" :key="curcode" v-if="proreports[index].reportType && proreports[index].reportType == 'egrid'" :height="gridHeight" :data="proreports[index].grid.data" :columns="proreports[index].grid.columns" :checkable="proreports[index].grid.checkable" :rowno="proreports[index].grid.rowno" :index="proreports[index].pager.index" :size="proreports[index].pager.size" :fit="proreports[index].grid.fit" :row-class-name="proreports[index].grid['row-class-name']" :default-sort="proreports[index].sort" :row-style="proreports[index].grid['row-style']" :stripe="proreports[index].grid.stripe" :footer="proreports[index].grid.footer.data" :show-summary="proreports[index].grid.footer.enable" :sum-text="proreports[index].grid.footer.text" :summary-method="proreports[index].grid.footer.method" @select="onSelect" @select-all="onSelectAll" @row-click="onRowClick" @row-dblclick="onRowDblclick" @cell-click="onCellClick" @cell-dblclick="onCellDblclick" @header-click="onHeaderClick" @sort-change="onSortChange" @current-change="onCurrentChange" @selection-change="onSelectionChange" @expand-change="onExpandChange">
                    </hd-egrid>
                    <hd-grid ref="grid" :key="curcode" v-else :height="gridHeight" :data="proreports[index].grid.data" :columns="proreports[index].grid.columns" :checkable="proreports[index].grid.checkable" :rowno="proreports[index].grid.rowno" :index="proreports[index].pager.index" :size="proreports[index].pager.size" :fit="proreports[index].grid.fit" :row-class-name="proreports[index].grid['row-class-name']" :default-sort="proreports[index].sort" :row-style="proreports[index].grid['row-style']" :stripe="proreports[index].grid.stripe" :footer="proreports[index].grid.footer.data" :show-summary="proreports[index].grid.footer.enable" :sum-text="proreports[index].grid.footer.text" :summary-method="proreports[index].grid.footer.method" @select="onSelect" @select-all="onSelectAll" @row-click="onRowClick" @row-dblclick="onRowDblclick" @cell-click="onCellClick" @cell-dblclick="onCellDblclick" @header-click="onHeaderClick" @sort-change="onSortChange" @current-change="onCurrentChange" @selection-change="onSelectionChange" @expand-change="onExpandChange">
                    </hd-grid>
                </slot>
            </div>
            <div class="hd-report-chart" :style="{height: gridHeight+'px'}" v-show="proreports[index].view == 'chart'">
                <slot name="chart-view">
                    <hd-chart ref="hdchart" class="vue-chart" auto-resize :options="proreports[index].chart" :type="proreports[index].chartType"></hd-chart>
                </slot>
            </div>
            <div class="hd-report-custom" :style="{height: gridHeight+'px'}" v-show="proreports[index].view == 'custom'">
                <slot name="custom-view" v-if="proreports[index].view == 'custom'"></slot>
            </div>
        </div>
        <div class="hd-report-footer" v-show="showTab || proreports[index].pager.enable">
            <div class="hd-report-tabs" v-show="showTab">
                <el-button-group>
                    <el-button v-if="single" type="primary" size="mini">
                        {{proreports[index].name}}
                    </el-button>
                    <el-button v-else v-for="r in proreports" :key="r.code" :type="curcode == r.code ? 'primary' : ''" :disabled="!!r.disabled" size="mini" @click="SwitchReport(r.code)">
                        {{r.name}}
                    </el-button>
                </el-button-group>
            </div>
            <div class="hd-footer-message">
                <slot name="footer-message"></slot>
            </div>
            <div class="hd-report-pager" v-show="proreports[index].pager.enable">
                <el-pagination :page-sizes="[50, 100, 200, 500]" :layout="proreports[index].pager.layout" :page-size="proreports[index].pager.size" :current-page="proreports[index].pager.index" :total="proreports[index].pager.total" @size-change="pageSizeChange" @current-change="pageIndexChange">
                </el-pagination>
            </div>
        </div>
        <hd-col-menu v-if="colMenu.visible && colMenu.data.length > 0" :top="colMenu.top" :left="colMenu.left" :height="colMenu.height" :cols="colMenu.data" @colmenu-close="onColMenuClose">
        </hd-col-menu>
    </div>
</template>

<!--<style lang="less" rel="stylesheet/less">
    div.hd-report {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        background: #FFF;
        > div.hd-report-header {
            width: 100%;
            overflow: hidden;
            border-bottom: solid 3px #007bc1;
            line-height: 37px;
            > div.hd-report-title {
                height: 37px;
                float: left;
                > span {
                    border-left: 2px solid #88b7e0;
                    font-size: 16px;
                    line-height: 16px;
                    padding-left: 4px;
                }
            }
            > div.hd-report-conditions {
                float: left;
                padding-top: 5px;
            }
            > div.hd-report-command {
                float: left;
                height: 37px;
                margin-left: 10px;
            }
            > div.hd-report-checkbox {
                float: left;
                margin-left: 20px;
            }
            > div.hd-report-tools {
                float: right;
                height: 37px;
                margin-right: 5px;
                > * {
                    float: left;
                    margin-left: 8px;
                }
                button.active {
                    background: #0078e7;
                    border: 1px solid #0078e7;
                    color: #fff;
                }
            }
            /* 按钮样式 */
            button.el-button--mini {
                margin-top: 7px;
                &.el-button--iconly {
                    width: 26px;
                    line-height: 24px;
                    padding: 0;
                }
            }
        }
        > div.hd-report-body {
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
            div.el-table {
                border-top: 0;
                border-left: 1px solid #ddd;
                &:after {
                    width: 0;
                }
                &:before {
                    height: 0;
                }
            }
            div.hd-report-chart {
                .vue-chart {
                    height: 100%;
                    width: 100%;
                }
            }
            div.hd-report-custom {
                overflow: auto;
                box-sizing: border-box;
            }
        }
        > div.hd-report-footer {
            height: 40px;
            padding: 0 10px;
            background-color: #f5f5f5;
            border-left: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
            > div.hd-report-tabs {
                padding-top: 6px;
                float: left;
                .el-button-group .el-button:not(:last-child) {
                    margin-right: -1px;
                }
                button.el-button--tbbtn,
                button.el-button--tbbtn:hover,
                button.el-button--tbbtn:focus
                {
                    color: #333;
                    background: #FFF;
                    border-color: #ddd;
                    // padding: 0 8px;
                }
                button.el-button--ctbbtn,
                button.el-button--ctbbtn:hover,
                button.el-button--ctbbtn:focus{
                    color: #fff;
                    background: #2da2e9;
                }
            }
            > div.hd-footer-message {
                padding-top: 4px;
                float: right;
                height: 100%;
                line-height: 2.2;
                color: #666;
                font-size: 14px;
            }
            > div.hd-report-pager {
                padding-top: 4px;
                float: right;
                * {
                    border-color: #ddd;
                    color: #333;
                }
                .el-pagination__sizes {
                    width: 100px;
                    .el-input .el-input__inner {
                        font-size: 12px;
                        line-height: 26px;
                        border-radius: 2px;
                        padding: 0 25px 0 5px;
                    }
                }
                .el-pagination__total {
                    margin-left: 10px;
                    font-size: 12px;
                }
                ul.el-pager {
                    li,
                    li:hover,
                    li:focus {
                        background: #fff;
                        height: 28px;
                        line-height: 26px;
                        border: 1px solid #ddd;
                        box-sizing: border-box;
                        margin-right: -1px;
                        font-weight: normal;
                        padding: 0;
                    }
                    li.active,
                    li.active:hover,
                    li.active:focus {
                        color: #fff;
                        background: #2da2e9;
                    }
                }
                .el-pagination button {
                    background: #fff;
                    height: 28px;
                    line-height: 26px;
                    border: 1px solid #ddd;
                    box-sizing: border-box;
                    margin-right: -1px;
                    padding: 0;
                    border-radius: 2px;
                    > i {
                        color: #38a8e5;
                    }
                    &:disabled > i {
                        color: #ddd;
                    }
                }
                /*:not(.disabled) {*/
                    /*&:hover {*/
                        /*background: #d5f1ff;*/
                    /*}*/
                    /*&:focus {*/
                        /*background: #d5f1ff;*/
                    /*}*/
                /*}*/
            }
        }
    }
    ul.hd-report-dropdown-menu {
        min-width: 50px;
        > li {
            font-size: 14px;
            line-height: 26px;
        }
    }

    /* 按钮尺寸 */
    button.el-button--mini {
        padding: 0 8px;
        height: 26px;
        box-sizing: border-box;
        border-radius: 2px;
    }
    /* 按钮配色 */
    button.el-button,
    button.el-button:hover,
    button.el-button:focus {
        background: #f1f1f1;
        border-color: #cbd5dd;
        color: #060606;
    }
    button.el-button--query,
    button.el-button--query:hover,
    button.el-button--query:focus {
        background: #19cd85;
        border-color: #19cd85;
        color: #fff;
    }
    button.el-button--create,
    button.el-button--create:hover,
    button.el-button--create:focus {
        background: #337ab7;
        border-color: #337ab7;
        color: #fff;
    }
    button.el-button--update,
    button.el-button--update:hover,
    button.el-button--update:focus {
        background: #f0ad4e;
        border-color: #f0ad4e;
        color: #fff;
    }
    button.el-button--delete,
    button.el-button--delete:hover,
    button.el-button--delete:focus {
        background: #d9534f;
        border-color: #d9534f;
        color: #fff;
    }
    button.el-button--confirm,
    button.el-button--confirm:hover,
    button.el-button--confirm:focus {
        background: #19cd85;
        border-color: #19cd85;
        color: #fff;
    }
    button.el-button--cancel,
    button.el-button--cancel:hover,
    button.el-button--cancel:focus {
        background: #2da2e9;
        border-color: #2da2e9;
        color: #fff;
    }
    /* 对话框修改 */
    body .el-dialog {
        background: #FFF;
        border: 1px solid #DDD;
        margin-bottom: 0;
        .el-dialog__header {
            height: 40px;
            line-height: 40px;
            color: #FFF;
            padding: 0 20px;
            background-color: #535662;
            box-sizing: border-box;
            .el-dialog__title {
                font-size: 14px;
                font-weight: 500;
                color: #FFF;
            }
            .el-dialog__headerbtn {
                top: 10px;
                > i {
                    color: #DDD;
                }
                &:focus > i, &:hover > i {
                    color: #FFF;
                }
            }
        }
        .el-dialog__body {
            padding: 10px 20px;
            background: #FFF;
        }
        .el-dialog__footer {
            background: #FFF;
            padding: 10px 20px;
        }
        .el-dialog__body + .el-dialog__footer {
            padding-top: 0;
        }
    }
</style>-->

<script>
    import hdTopBar from './topbar'
    import hdColMenu from './colmenu'
    import hdGrid from '../../Hgrid/src/hgrid.vue'
    import hdChart from '../../Chart/src/chart'
    import {
        addResizeListener,
        removeResizeListener
    } from "element-ui/lib/utils/resize-event";

    export default {
    name: 'HdReport',
    props: {
        title: { type: String, default: '' },
        name: { type: String, default: '' },
        current: { type: String, default: '' },
        tabs: { type: Boolean, default: false }, //强制显示底部报表切换
        single: { type: Boolean, default: false },
        autoQuery: { type: Boolean, default: false },
        reversed: { type: Boolean, default: false },
        reports: { type: Array, default: [] },
        bottomtitle: { type: String, default: '' },
        header: { type: Boolean, default: true } //控制报表头部是否显示
    },
    data: function() {
        return {
            inreports: null,
            proreports: null,
            index: 0,
            gridHeight: 0,
            loadHandler: null,
            curcode: '',
            colMenu: { visible: false, top: 0, left: 0, height: 0, data: [] }
        }
    },
    watch: {
        curcode(v, ov) {
            if (v != ov) {
                this.$emit('update:current', v)
                let index = this.GetReportIndexByCode(v)
                if (index >= 0) {
                    this.index = index
                    this.$nextTick(() => {
                        this.FitBody()
                        this.onSwitchReport(v)
                        if (ov) {
                            this.Query()
                        }
                    })
                }
            }
        }
    },
    components: {
        hdTopBar,
        hdGrid,
        hdColMenu,
        hdChart
    },
    computed: {
        showTab: function() {
            return this.tabs || (!this.single && this.proreports.length > 1)
        }
    },
    methods: {
        __init(_proreports) {
            //copy proreports，防止destroyed后再创建时出现脏数据
            this.proreports =
                _proreports || $.extend(true, {}, { rpts: this.reports }).rpts
            if (this.proreports) {
                // this.inreports=$.extend(true,{},this.proreports);//原始留存
                var that = this
                for (let i = 0; i < this.proreports.length; i++) {
                    let report = this.proreports[i]
                    report.params = {}
                    report.quicks = report.quicks || []

                    report.quickothers = report.quickothers || []

                    if (typeof report.quicks == 'function') {
                        report.quicks = report.quicks() || []
                    }

                    if (typeof report.quickothers == 'function') {
                        report.quickothers = report.quickothers() || []
                    }
                    $.each(report.quicks, function(i, q) {
                        q.data = q.data || []
                        if (q.format) {
                            $.each(
                                that.BindRecords(q.format, report.bindings),
                                function(j, b) {
                                    q.data.push({
                                        name: b.Name,
                                        value: b.Value
                                    })
                                }
                            )
                        }
                    })

                    $.each(report.quickothers, function(i, q) {
                        q.data = q.data || []
                        if (q.format) {
                            $.each(
                                that.BindRecords(q.format, report.bindings),
                                function(j, b) {
                                    q.data.push({
                                        name: b.Name,
                                        value: b.Value
                                    })
                                }
                            )
                        }
                    })

                    this.$set(report, 'quicks', report.quicks)
                    this.$set(report, 'data', []) //查询结果
                    this.$set(report, 'views', report.views || ['report'])
                    this.$set(report, 'view', report.view || report.views[0])
                    this.$set(report, 'grid', report.grid || {})
                    this.$set(report.grid, 'data', report.grid.data || [])
                    this.$set(report.grid, 'rowno', report.grid.rowno != false)
                    // 备份列
                    this.$set(report, '_cols', report.grid.columns || [])
                    // 覆盖列定义
                    this.$set(report.grid, 'columns', this.initCols(report))
                    this.$set(report, 'pager', report.pager || {})
                    this.$set(
                        report.pager,
                        'enable',
                        report.pager.enable != false
                    )
                    this.$set(report.pager, 'size', report.pager.size || 50)
                    this.$set(report.pager, 'index', report.pager.index || 1)
                    this.$set(report.pager, 'total', report.pager.total || 0)
                    this.$set(
                        report.pager,
                        'layout',
                        report.pager.layout || 'sizes, prev, pager, next, total'
                    )
                    this.$set(report, 'sort', { prop: null, order: null }) //排序
                    this.$set(report, 'footer') //查询结果
                    //合计行
                    this.$set(report.grid, 'footer', report.grid.footer || {})
                    this.$set(
                        report.grid.footer,
                        'enable',
                        !!report.grid.footer.enable
                    )
                    this.$set(report.grid.footer, 'data', null)
                    let text = report.grid.footer.text || '合计'
                    this.$set(report.grid.footer, 'text', text)
                    let method =
                        !typeof report.grid.footer.method == 'function'
                            ? null
                            : report.grid.footer.method
                    if (report.grid.footer.method == 'remote') {
                        method = ({ footer }) => {
                            return footer
                        }
                    }
                    this.$set(report.grid.footer, 'method', method)
                    const buttons = report.buttons || {}
                    this.$set(report, 'buttons', {
                        ...{ insert: {}, update: {}, delete: {}, export: {} },
                        ...buttons
                    })
                    this.$set(report, 'chart', report.chart || {})
                }
                var curcode = this.current
                let index = this.GetReportIndexByCode(curcode)
                if (index < 0) {
                    curcode = this.proreports[0].code
                    this.$emit('update:current', curcode)
                    index = 0
                }
                this.$set(this, 'curcode', curcode)
                this.$set(this, 'index', index)
            }
        },
        //调整grid
        FitBody: function() {
            let $self = $(this.$el)
            let $footer = $self.children('div.hd-report-footer')
            this.gridHeight =
                $self.height() -
                (this.header
                    ? $self.children('div.hd-report-header').outerHeight(true)
                    : 0) -
                ($footer.is(':hidden') ? 0 : $footer.outerHeight(true)) -
                1
        },
        //通过code找寻报表配置
        GetReportByCode: function(code) {
            return this.proreports.find(function(rpt) {
                return rpt.code == code
            })
        },
        //获得当前报表信息
        GetCurrentReport: function() {
            return this.proreports[this.index]
        },
        //通过code找到报表索引
        GetReportIndexByCode: function(code) {
            for (let i = 0; i < this.proreports.length; i++) {
                if (this.proreports[i].code == code) {
                    return i
                }
            }
            return -1
        },
        //切换报表
        SwitchReport: function(code) {
            if (this.curcode === code) {
                return
            }
            this.proreports.forEach(r => {
                r.grid.data = []
                r.pager.index = 1
                r.pager.total = 0
            })
            this.curcode = code
        },
        //切换显示
        ChangeView(v) {
            let report = this.proreports[this.index]
            report.view = v
            var el=this.$el;
            $(el).find(".hd-grid").height($(el).find(".hd-grid").parent().height());
            this.$emit('change-view', report)
            this.$nextTick(() => {
                if(v=="report") this.$refs.grid.Rerender();
            })
        },
        //报表查询
        Query: function() {
            let report = this.GetCurrentReport()
            report.pager.index = 1
            report.sort.prop = null
            report.sort.order = null
            this.loadData(report)
        },
        //报表刷新
        Refresh() {
            let report = this.GetCurrentReport()
            this.loadData(report, true)
        },
        //清空报表
        Clear() {
            let report = this.GetCurrentReport()
            let json = report.data
            if (json.Pager) {
                report.pager.total = 0
                json.Pager.Total = 0
            }
            if (json.Report) {
                report.grid.data = []
                report.grid.footer.data = null
                report.grid.columns = []
                json.Report.Data = []
                json.Report.Footer = null
                this.$nextTick(() => {
                    report.view == 'report' && this.$refs.grid
                    && this.$refs.grid.Rerender();
                });
            }else{
                report.grid.data = []
                report.grid.footer.data = null
                report.grid.columns = []
                this.$nextTick(() => {
                    report.view == 'report' && this.$refs.grid
                    && this.$refs.grid.Rerender();
                });
            }
            if (json.Chart) {
                json.Chart = null
                this.$set(report, 'chart', null)
            }
        },
        //通过索引获得行数据
        GetRow(index) {
            let report = this.GetCurrentReport()
            let len = report.grid.data.length
            if (index < 0 || index >= len) {
                return null
            }
            return report.grid.data[index]
        },
        //通过索引更新行数据
        UpdateRow(index, row) {
            let report = this.GetCurrentReport()
            let len = report.grid.data.length
            if (index < 0 || index >= len) {
                return
            }
            this.$set(report.grid.data, index, row)
            this.$set(report.data.Report.Data, index, row)
            // 图表点、合计行计算会不同步
        },
        GetCurrentRow: function() {
            return this.$refs.grid.currentRow
        },
        GetSelection: function() {
            return this.$refs.grid.selection
        },
        ExportData: function(cmd) {
            if (cmd == 'chart') {
                this.$nextTick(() => {
                    this.$refs.hdchart.exports()
                })
            } else {
                let self = this
                let report = self.GetCurrentReport()
                let fn = [self.name || '', '', report.name || '', '']
                if (fn[0] && fn[2]) {
                    fn[1] = '('
                    fn[3] = ')'
                }
                fn = fn.join('')
                let params = report.params
                switch (true) {
                    case 'page' == cmd && typeof report.export != 'function':
                        this.$refs.grid.Export(fn)
                        return
                    case 'page' == cmd &&
                        typeof report.export == 'function' &&
                        !$.isEmptyObject(params):
                        report.export(params, fn, report)
                        return
                    case 'all' == cmd && typeof report.export != 'function':
                        self.loadData(
                            report,
                            true,
                            {
                                index: 1,
                                size: 60000
                            },
                            data => {
                                let temp = data.Report.Data || []
                                let footer = data.Report.Footer || null
                                self.$refs.grid.Export(fn, temp, footer)
                            }
                        )
                        return
                    case 'all' == cmd &&
                        typeof report.export == 'function' &&
                        !$.isEmptyObject(params):
                        report.export(
                            { ...params, index: null, size: null },
                            fn,
                            report
                        )
                        return
                }
            }
        },
        //公开event
        onSwitchReport: function(code) {
            this.$emit('switch-report', this.GetCurrentReport(), code)
        },
        onSelect: function(selection, row) {
            this.$emit('row-select', this.GetCurrentReport(), selection, row)
        },
        onSelectAll: function(selection) {
            this.$emit('select-all', this.GetCurrentReport(), selection)
        },
        onRowClick: function(row, event) {
            this.$emit('row-click', this.GetCurrentReport(), row, event)
        },
        onRowDblclick: function(row, event) {
            this.$emit('row-dblclick', this.GetCurrentReport(), row, event)
        },
        onCellClick: function(field, value, row, column, cell, event) {
            this.$emit(
                'cell-click',
                this.GetCurrentReport(),
                field,
                value,
                row,
                column,
                cell,
                event
            )
        },
        onHeaderClick: function(field, column, event) {
            this.$emit(
                'header-click',
                this.GetCurrentReport(),
                field,
                column,
                event
            )
        },
        onCellDblclick: function(field, value, row, column, cell, event) {
            this.$emit(
                'cell-dblclick',
                this.GetCurrentReport(),
                field,
                value,
                row,
                column,
                cell,
                event
            )
        },
        onCurrentChange: function(currentRow, oldCurrentRow) {
            this.$emit(
                'current-change',
                this.GetCurrentReport(),
                currentRow,
                oldCurrentRow
            )
        },
        onSelectionChange: function(selection) {
            this.$emit('selection-change', this.GetCurrentReport(), selection)
        },
        onExpandChange: function(row, expandedRows) {
            this.$emit(
                'expand-change',
                this.GetCurrentReport(),
                row,
                expandedRows
            )
        },
        onContextMenu(event) {
            let $t = $(event.target)
            // 表头右键
            if ($t.parents('table.el-table__header').length > 0) {
                let rpt = this.GetCurrentReport()
                let cfg = {}
                this.colMenu.data = cfg.cols || []
                if (rpt.edition) {
                    this.colMenu.visible = false
                    this.$nextTick(() => {
                        this.showColMenu(event)
                    })
                }
                event.preventDefault()
                return
            }
        },
        onColMenuClose(cols) {
            this.colMenu.visible = false
            let rpt = this.GetCurrentReport()
            this.$store.dispatch('save-user-cols', { cols, code: rpt.code })
            this.$nextTick(() => {
                rpt.grid.columns = this.initCols(rpt)
                this.$nextTick(function() {
                    this.$refs.grid.Rerender()
                })
            })
        },
        //私有方法
        //显示列定义右键菜单
        showColMenu(event) {
            let x = event.pageX,
                y = event.pageY,
                w = $(window).width(),
                h = $(window).height()
            let height = 26 * Math.min(this.colMenu.data.length, 10) + 2
            if (x + 180 > w) {
                x = w - 180
            }
            if (y + height > h) {
                y = h - height
            }
            this.colMenu.top = y
            this.colMenu.left = x
            this.colMenu.height = height
            this.colMenu.visible = true
        },
        pageSizeChange: function(size) {
            let currpt = this.GetCurrentReport()
            currpt.pager.index = 1
            currpt.pager.size = size
            this.loadData(currpt, true)
        },
        pageIndexChange: function(index) {
            let currpt = this.GetCurrentReport()
            currpt.pager.index = index
            this.loadData(currpt, true)
        },
        onSortChange: function(order) {
            let currpt = this.GetCurrentReport()
            currpt.sort.prop = order.prop
            currpt.sort.order = order.order
            currpt.pager.index = 1
            this.loadData(currpt, true)
        },
        //数据查询
        loadData: function(report, refresh, pager, callback) {
            let self = this
            report = report || self.proreports[self.index]
            let temp = report.pager.enable
                ? {
                      index: report.pager.index || 1,
                      size: report.pager.size
                  }
                : null
            pager = { ...temp, ...pager }
            let sort = {
                field: report.sort.prop,
                type: report.sort.order
                    ? report.sort.order == 'descending'
                    : null
            }
            let params
            if (refresh) {
                params = report.params
                $.extend(params, pager, { order: sort })
            } else {
                params = self.$refs.topbar[self.index].GetValues()
                let p = $.extend(true, {}, params, pager, { order: sort })
                if (typeof report.beforeQuery == 'function') {
                    p = report.beforeQuery(p, this)
                    if (p == false) {
                        return
                    }
                }
                params = p
            }
            report.params = params

            self.loading()
            let complete = null
            let beforeSend = null
            if (!callback) {
                complete = () => {
                    typeof report.complete == 'function' && report.complete()
                    self.loaded()
                }
                beforeSend = () => {
                    typeof report.beforeSend == 'function' &&
                        report.beforeSend()
                }
            }
            let success = json => {
                if (typeof report.afterQuery == 'function') {
                    json = report.afterQuery(json, report)
                    if (json == false) {
                        return
                    }
                }
                if (typeof callback == 'function') {
                    self.loaded()
                    callback(json)
                    return
                }
                json = json || {}
                if (json.Pager) {
                    report.pager.total = json.Pager.Total
                }
                if ($.isArray(json)) {
                    json = { Report: { Data: json, Footer: null } }
                }
                if (json.Report) {
                    let columns = json.Report.Columns
                    columns && (report._cols = columns)
                    if (json.Report.Data && this.reversed) {
                        json.Report.Data.sort(this.compare('time'))
                    }
                    report.grid.data = json.Report.Data || []
                    report.grid.footer.data = json.Report.Footer || null
                }
                if (json.Chart) {
                    this.$set(report, 'chart', json.Chart)
                }
                report.grid.columns = self.initCols(report)
                report.data = json
                self.$nextTick(function() {
                    if (report.view == 'report' && self.$refs.grid) {
                        self.$refs.grid.Rerender(() => {
                            if (report.afterRender) {
                                report.afterRender(json)
                            }
                        })
                    }
                    self.loaded()
                })
            }

            self.$nextTick(() => {
                setTimeout(() => {
                    self.post({
                        url: report.url,
                        params: report.params,
                        success,
                        complete,
                        beforeSend
                    })
                }, 50)
            })
        },
        GetData() {
            let self = this
            var report = self.proreports[self.index]
            return report.grid.data
        },
        SetData(json) {
            let self = this
            var report = self.proreports[self.index]
            json = json || {}
            if (json.Pager) {
                report.pager.total = json.Pager.Total
            }
            if ($.isArray(json)) {
                json = { Report: { Data: json, Footer: null } }
            }

            if (json.Report) {
                let columns = json.Report.Columns
                columns && (report._cols = columns)
                if (json.Report.Data && this.reversed) {
                    json.Report.Data.sort(this.compare('time'))
                }
                self.$set(report.grid, 'data', json.Report.Data || [])
            }
            if (json.Chart) {
                self.$set(report, 'chart', json.Chart)
            }
            report.grid.columns = self.initCols(report)
            report.data = json
        },
        post({ url, params, success, beforeSend, complete }) {
            let _alert = msg => {
                try {
                    this.$message({
                        message: msg,
                        type: 'error',
                        showClose: true
                    })
                } catch (e) {
                    alert(msg)
                }
            }
            if (url && url.then) {
                url.then(R => {
                    success(R)
                })
            } else {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(params),
                    url: url,
                    beforeSend: () => {
                        typeof beforeSend == 'function' && beforeSend()
                    },
                    success: json => {
                        if (json.Code == 0) {
                            typeof success == 'function' &&
                                success(json.Response)
                        } else {
                            _alert(json.Message)
                        }
                    },
                    error: ex => {
                        _alert('请求发生异常(异常代码：' + ex.status + ')')
                    },
                    complete: () => {
                        typeof complete == 'function' && complete()
                    }
                })
            }
        },
        loading: function() {
            this.loadHandler = this.$loading({
                fullscreen: true,
                lock: true,
                text: '加载中...'
            })
        },
        loaded: function() {
            this.loadHandler && this.loadHandler.close()
            this.loadHandler = null
        },
        initCols({ _cols, code }) {
            let cols = [..._cols]
            // if(!this.$store.state.enable){
            //     return cols;
            // }
            // let cfg = this.$store.state.config[code] || {};
            let cfg = {}
            cfg = cfg.cols || []
            if (cfg.length == 0) {
                return cols
            }
            // 添加默认顺序
            let addIndex = (c, i) => {
                c.index = c.index || i + 1
                if ((c.children || []).length > 0) {
                    c.children.forEach((cc, i) => addIndex(cc, i))
                }
            }
            cols.forEach((c, i) => addIndex(c, i))
            // 覆盖配置
            $.extend(true, cols, cfg)
            // 排序方法
            let srt = (c, n) => (c.index || 0) - (n.index || 0)
            // 深度排序
            let deepSort = c => {
                if ((c.children || []).length <= 1) {
                    return
                }
                c.children.sort(srt)
                c.children.forEach(cc => deepSort(cc))
            }
            cols.sort(srt)
            cols.forEach(c => deepSort(c))
            return cols
        },
        //判断元素是否在数组中
        contains(arr, obj) {
            var i = arr.length
            while (i--) {
                if (arr[i] === obj) {
                    return true
                }
            }
            return false
        },
        //数组根据某项倒序排
        compare(property) {
            return function(a, b) {
                var value1 = a[property]
                var value2 = b[property]
                return value2 - value1
            }
        },
        SelectRow(index,untrigger){
            this.$refs.grid.SelectRow(index,untrigger)
        }
    },
    created() {
        this.__init()
    },
    mounted: function() {
        addResizeListener(this.$el, this.FitBody);
        this.$nextTick(() => {
            if (this.autoQuery) {
                this.Query()
            }
        });
    },
    beforeDestroy() {
        removeResizeListener(this.$el, this.FitBody);
    }//,
    // activated(){
    //     addResizeListener(this.$el, this.FitBody);
    // },
    // deactivated(){
    //     removeResizeListener(this.$el, this.FitBody);
    // }
}
</script>
