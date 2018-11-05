<template>
    <div class="hgrid hd-hgrid">
        <htable ref="tb" :class="classObj" :settings="hSettings"></htable>
    </div>
</template>
<script>
    import Htable from "../../Htable/src";
    import {uuid} from '../../../src/utils/util';
    import Vue from 'vue'

    export default {
    name:"HdHgrid",
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        height: Number,
        columns: {
            type: Array,
            default() {
                return [];
            }
            /*详见getColDef
                {data: "列属性", title: "列名", width: "宽度", halign: "标题对齐", aligh: "数据对齐",
                fixed: "是否固定", sortable: "排序可用", hide: "隐藏", format: "", children: [子列]}
                */
        },
        rowno: {
            //是否显示行号
            type: Boolean,
            default: false
        },
        checkable: {
            type: [Boolean, Function],
            default: false
        },
        stripe: {
            //是否为斑马纹 table
            type: Boolean,
            default: true
        },
        border: {
            //是否带有纵向边框
            type: Boolean,
            default: true
        },
        fit: {
            //列的宽度是否自撑开
            type: Boolean,
            default: false
        },
        showHeader: {
            //是否显示表头
            type: Boolean,
            default: true
        },
        currentRowKey: {
            //当前行的 key，只写属性
            type: String,
            default: "_id"
        },
        rowClassName: Object, //行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
        rowStyle: Object, //行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
        rowKey: {
            //row-key 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的
            type: String,
            default: "_id"
        },
        // defaultSort: {default: function(){
        //     return {prop: null, order: null}
        // }},//排序
        // index: {//页码(仅用作行号计算)
        //     type:Number,default:1
        // },
        // size: {//每页行数(仅用作行号计算)
        //     type:Number,default:50
        // },
        // showSummary: {type: Boolean, default: false}, //是否在表尾显示合计行
        // sumText: {type: String, default: "合计"}, //合计行第一列的文本
        // summaryMethod: Object, //自定义的合计计算方法, 参数{columns,data}
        // footer: Object, //后台计算的合计行
        bindings: Object
    },
    data() {
        return {
            currentRow: null,
            hcolumns: [],
            nestedHeaders: [],
            colHeaders: [],
            freezecol: 0,
            coldef: [],
            columnSorting: false //排序
        };
    },
    watch: {
        columns: {
            immediate: true,
            deep:true,
            handler: function(n, o) {
                //columns==>nestedHeaders,columns
                //  {data: "列属性", title: "列名", width: "宽度", halign: "标题对齐", aligh: "数据对齐",
                // fixed: "是否固定", sortable: "排序可用", hide: "隐藏", format: "", children: [子列]}
                let self = this;
                var fcols = []; //锁定列
                var cols = []; //非锁定列
                this.headers = n;
                $.each(this.columns, (k1, c1) => {
                    if (!!c1.fixed) {
                        fcols.push(c1);
                    } else {
                        cols.push(c1);
                    }
                });
                cols = fcols.concat(cols);
                var All = [];
                var All_Index={};
                var CreateIndex = function(All, Nodes) {
                    for (let i = 0; i < Nodes.length; i++) {
                        const Node = Nodes[i];
                        Node._k = Node._k || uuid();
                        Node._Pks = Node._Pks
                            ? Node._Pks.concat([Node._k])
                            : [Node._k];
                        Node.fixd = !!Node.fixed;
                        All.push(Node);
                        All_Index[Node._k]=Node;
                        if (Node && Node.children && Node.children.length > 0) {
                            for (
                                var j = 0,
                                    Arr = Node.children,
                                    len = Arr.length;
                                j < len;
                                j++
                            ) {
                                Arr[j]._Pks = Node._Pks;
                                Arr[j].fixd = Node.fixd;
                                CreateIndex(All, [Arr[j]]);
                            }
                        }
                    }
                };
                CreateIndex(All, cols);
                var fixnum = 0;
                var columns = [];
                var colHeaders = [];
                var maxlv = 0;
                for (let i = 0; i < All.length; i++) {
                    var col = All[i];
                    if (col.fixd) fixnum++;
                    if (col.data) {
                        var node = { data: col.data };
                        if (col.format!=undefined&&col.format!=null) {
                            // 创建renderer方法。
                            node.type = null;
                            node.renderer = self.createRenderer(col);
                        }
                        if (!!col.sortable) {
                            node.sortIndicator = true; // 排序标志
                            this.columnSorting = true; // 列排序
                        }
                        colHeaders.push(col.title);
                        columns.push(node);
                    }
                    if (col._Pks.length > maxlv) maxlv = col._Pks.length;
                }
                var CreatNest = function(All, nests, l) {
                    var nest = [];
                    var pnest = [];
                    if (l > 1) pnest = nests[l - 2];
                    nests = nests || [];
                    if (pnest.length > 0) {
                        $.each(pnest, (x, pn) => {
                            var pin = false;
                            for (let i = 0; i < All.length; i++) {
                                var col = All[i];
                                if (
                                    col._Pks.length == l &&
                                    $.inArray(pn._k, col._Pks) > -1
                                ) {
                                    pin = true;
                                    var n = {
                                        _k: col._k,
                                        label: col.title,
                                        colspan: 1,
                                        width: col.width
                                    };
                                    if(col.children&&col.children.length>0){
                                        n.rowspan=1;
                                        n.colspan=0;
                                    }else{
                                        n.rowspan=maxlv-l+1;
                                        for (let i = 0; i < nests.length; i++) {
                                            const _nest = nests[i];
                                            $.each(_nest,function(i,_n){
                                                if ($.inArray(_n._k,col._Pks) > -1) {
                                                    _n.colspan++;
                                                }
                                            })
                                        }
                                    }
                                    nest.push(n);
                                }
                            }
                            var nn=$.extend(true,{},pn);
                            nn.rowspan=0;
                            if (!pin) nest.push(nn);
                        });
                    } else {
                        for (let i = 0; i < All.length; i++) {
                            var col = All[i];
                            if (col._Pks.length == l) {
                                var n = {
                                    _k: col._k,
                                    label: col.title,
                                    colspan: 1,
                                    width: col.width
                                };
                                if(col.children&&col.children.length>0){
                                    n.rowspan=1;
                                    n.colspan=0;
                                }else{
                                    n.rowspan=maxlv;
                                }
                                nest.push(n);
                            }
                        }
                    }
                    var nest_length=nest.length;
                    var pnest_length=pnest.length;
                    if (
                        nest_length != pnest_length ||
                        (nest_length >= 2 && nest_length == pnest_length)
                    ) {
                        nests.push(nest);
                        var hasnext = false;
                        for (let n = 0; n < nest.length; n++) {
                            const ne = All_Index[nest[n]._k];
                            if (ne.children && ne.children.length > 0) {
                                hasnext = true;
                                break;
                            }
                        }
                        if (hasnext) CreatNest(All, nests, l + 1);
                    }
                    return nests;
                };

                this.nestedHeaders = maxlv > 1 ? CreatNest(All, [], 1) : [];
                this.colHeaders = colHeaders;
                this.nestExt = true;
                this.colwidth = this.CalcWidth(All);
                this.hcolumns = columns;
                this.freezecol = fixnum;
            }
        }
    },
    computed: {
        hSettings() {
            let self = this;
            this.coldef = this.getColDef();
            var setting = {
                readOnly: true,
                className: "htCenter",
                height: self.height || "100%",
                fillHandle: false,
                currentRowClassName: "current-row",
                multiSelect: false
            };
            setting.colHeaders = !!this.showHeader;
            setting.rowHeaders = !!this.rowno;
            setting.autoColumnSizs = !!this.fit;
            setting.data = this.data || [];
            if (this.nestedHeaders.length > 0) {
                setting.nestedHeaders = this.nestedHeaders;
            } else {
                if (!!this.showHeader) {
                    setting.colHeaders = this.colHeaders;
                }
            }
            setting.columns = this.hcolumns;
            setting.fixedColumnsLeft = this.freezecol;
            if (!this.fit) {
                setting.colWidths = this.colwidth;
            }
            setting.columnSorting = this.columnSorting; // 列排序
            setting.Headers = this.headers;
            setting.afterOnCellMouseDown = this.afterOnCellMouseDown;
            setting.beforeColumnSort = this.beforeColumnSort;
            setting.afterColumnSort = this.afterColumnSort;
            setting.onCellDbClick = this.onCellDbClick;
            setting.cellDbClick=true;
            return setting;
        },
        classObj(){
            var cls="htable";
            if(this.stripe) cls+=" stripe";
            return cls
        }
    },
    methods: {
        Rerender(CB){
            this.Render(CB);
        },
        Render(CB){
            this.$refs.tb.render();
            this.$nextTick(()=>{
                if(CB) CB();
            });
        },
        createRenderer(col) {
            let self = this;
            const factory = {
                function: function(
                    instance,
                    td,
                    r,
                    c,
                    field,
                    value,
                    cellProperties
                ) {
                    var row = instance.getSourceDataAtRow(r);
                    value = self.getValue(row, field);
                    value = col.format(value, row, col);
                    value = value == null ? "" : value;
                    td.innerHTML = value;
                },
                number: function(
                    instance,
                    td,
                    r,
                    c,
                    field,
                    value,
                    cellProperties
                ) {
                    var row = instance.getSourceDataAtRow(r);
                    value = self.getValue(row, col.data);
                    if(Vue.filter("NUMBER")) value = Vue.filter("NUMBER")(value, col.format);
                    td.innerHTML = value;
                },
                string: function(
                    instance,
                    td,
                    r,
                    c,
                    field,
                    value,
                    cellProperties
                ) {
                    var row = instance.getSourceDataAtRow(r);
                    value = self.getValue(row, col.data);
                    if (col.type == "date") {
                        if(Vue.filter("DATE")) value = Vue.filter("DATE")(value, col.format);
                    } else if (col.type == "number") {
                        if(Vue.filter("NUMBER")) value = Vue.filter("NUMBER")(value, col.format);
                    } else {
                        if(Vue.filter("CODE")) value = Vue.filter("CODE")(
                            value,
                            col.format,
                            null,
                            self.bindings || {}
                        );
                    }
                    td.innerHTML = value;
                }
            };
            return factory[typeof col.format] || null;
        },
        // 根据获得单元格的值
        getValue(row, field) {
            if(row[field]===0) return 0;
            try {
                return eval("row['" + field.replace(/\./g, "']['") + "']");
            } catch (e) {
                return null;
            }
        },
        // 计算列宽
        CalcWidth(params) {
            let arrary = [];
            if (this.nestedHeaders && this.nestedHeaders.length) {
                let headers = this.nestedHeaders[this.nestedHeaders.length - 1];
                $.each(headers, (i, r) => {
                    arrary.push(r.width);
                });
            } else {
                if (params) {
                    $.each(params, (i, r) => {
                        arrary.push(r.width);
                    });
                }
            }
            return arrary;
        },
        afterOnCellMouseDown(event, coords, td) {
            // 左键
            if (event.button == 0) {
                var column=this.hcolumns[coords.col];
                var field=column['data']||"";
                // 表头
                if (coords.row < 0) {
                    this.$emit(
                        "header-click",
                        field,
                        column,
                        event
                    );
                } else {
                    // 行
                    var oldCurrentRow = this.currentRow;
                    var currentRow = this.$refs.tb.table.getSourceDataAtRow(
                        coords.row
                    );
                    let value = this.getValue(currentRow, field);
                    this.$emit("cell-click", field, value, currentRow, column, event.target, event);
                    this.$emit("row-click", currentRow, event);
                    this.$set(this, "currentRow", currentRow);
                    this.$emit("current-change", currentRow, oldCurrentRow);
                }
            }
        },
        onCellDbClick(field,v,r,c,cellProperties,TD,event,hot){
            var row = this.$refs.tb.table.getSourceDataAtRow(r);
            let value = this.getValue(row, field);
            this.$emit("cell-dblclick", field, value, row, this.columns[c], cellProperties, event);
            this.$emit("row-dblclick", row, event);
        },
        beforeColumnSort(column, order) {
            return false; //禁用前端排序
        },
        afterColumnSort(column, order) {
            if (!!this.columns[column].sortable) {
                this.$emit("sort-change", {
                    column: this.columns[column],
                    prop: this.hcolumns[column].data,
                    order: order ? "ascending" : "descending" //Handsontable :true for ascending, false for descending
                });
            }
        },
        exportFormat(col, r, c, field, value) {
            let self = this;
            if (typeof col.format == "function") {
                var row = self.$refs.tb.table.getSourceDataAtRow(r);
                value = self.getValue(row, field);
                value = col.format(value, row, col);
                value = value == null ? "" : value;
                return value;
            } else if (typeof col.format == "number") {
                var row = self.$refs.tb.table.getSourceDataAtRow(r);
                value = self.getValue(row, col.data);
                if(Vue.filter("NUMBER")) value = Vue.filter("NUMBER")(value, col.format);
                return value;
            } else if (typeof col.format == "string") {
                var row = self.$refs.tb.table.getSourceDataAtRow(r);
                if (col.type == "date") {
                    if(Vue.filter("DATE")) value = Vue.filter("DATE")(value, col.format);
                } else if (col.type == "number") {
                    if(Vue.filter("NUMBER")) value = Vue.filter("NUMBER")(value, col.format);
                } else {
                    if(Vue.filter("CODE")) value = Vue.filter("CODE")(
                        value,
                        col.format,
                        null,
                        self.bindings || {}
                    );
                }
                return value;
            }
        },
        getColDef() {
            let self = this;
            let cols = [];
            let headerRows = 1; //表头行数
            let dataCols = [];
            function _create(list, col, level, isFixed, digit) {
                if (col.hide) {
                    return;
                }
                let c = {
                    source: { ...col }, //列原始定义
                    props: {
                        label: col.title,
                        resizable: true,
                        "show-overflow-tooltip": true,
                        "header-align": col.halign || "center",
                        "render-header"(h) {
                            return h("span", {
                                class: "hd-grid-title",
                                domProps: { innerHTML: col.title }
                            });
                        }
                    },
                    children: [],
                    attr: { level: level }
                };
                if (col.children && col.children.length > 0) {
                    for (let i = 0; i < col.children.length; i++) {
                        _create(
                            c.children,
                            col.children[i],
                            level + 1,
                            isFixed,
                            digit + i
                        );
                    }
                    let colspan = 0,
                        width = 0;
                    for (let i = 0; i < c.children.length; i++) {
                        colspan += c.children[i].attr.colspan;
                        width += c.children[i].props.width;
                    }
                    if (colspan > 0) {
                        c.attr.colspan = colspan;
                        c.props.width = width;
                        c.props["header-align"] = "center";
                        list.push(c);
                    }
                    if (isFixed && level == 0 && col.fixed == "left") {
                        c.props.fixed = "left";
                    }
                    return;
                }
                list.push(c);
                if (level + 1 > headerRows) {
                    headerRows = level + 1;
                }
                c.attr.colspan = 1;
                c.props.prop = col.data;
                c.props.width = col.width || col.minWidth || 100;
                if (isFixed) {
                    c.props.resizable = false; // 固定列不能调整宽度
                    col.fixed == "left" && (c.props.fixed = "left"); // 左固定
                } else {
                    c.props.resizable = true;
                    col.minWidth && (c.props["min-width"] = col.minWidth);
                }
                if (col.sortable) {
                    // 设置排序方法
                    if (typeof col.sortable == "function") {
                        c.props.sortable = true;
                        c.props["sort-method"] = col.sortable;
                    } else {
                        c.props.sortable = "custom";
                        c.props["sort-method"] = null;
                    }
                }
                // 对齐方式
                c.props.align = col.align || "center";
                dataCols.push({
                    ...col,
                    width: c.props.width,
                    align: c.props.align
                });
            }
            for (let i = 0; i < this.columns.length; i++) {
                _create(cols, this.columns[i], 0, !!this.columns[i].fixed, i);
            }
            self.headerRows = headerRows;
            self.dataCols = dataCols;
            return cols;
        },
        Export(title, rs, f) {
            let trs = [],
                self = this;
            let rows = [...(rs || self.data)];
            let cols = [...self.coldef];
            for (let i = 0; i < self.nestedHeaders.length; i++) {
                trs.push("");
            }
            function _createHeaderCell(prop, attr) {
                let html = `
                <td colspan="${attr.colspan || 1}" rowspan="${attr.rowspan ||
                    1}"
                    style="border:solid 0.5pt #000000;font-size: 16px;
                    vnd.ms-excel.numberformat:@;
                    text-align:${prop["header-align"] || prop.algin || "left"};
                    width: ${prop.width || prop["min-width"] || 100}pt;">${
                    prop.label
                }</td>
                                    `;

                trs[attr.level] += html;
            }
            function _createTableHeader(col) {
                let attr = col.attr;
                let prop = col.props;
                if ((col.children || []).length == 0) {
                    attr.rowspan = self.headerRows - col.attr.level;
                } else {
                    for (let i = 0; i < col.children.length; i++) {
                        _createTableHeader(col.children[i]);
                    }
                }
                _createHeaderCell(prop, attr);
            }
            for (let i = 0; i < cols.length; i++) {
                _createTableHeader(cols[i]);
            }
            function _createCell(row, col, x, y) {
                let val = "";
                if (col.format) {
                    val = self.exportFormat(col, x, y, col.data, row[col.data]);
                } else {
                    val = self.getValue(row, col.data);
                }
                val = val == null ? "" : val;
                let td = '<td style="border:solid 0.5pt #000000;text-align:';
                td += col.align || "center";
                if (col.type == "number") {
                    let fmt = "";
                    if ($.isNumeric(val)) {
                        fmt = String(val).split(".");
                        fmt = fmt.length == 2 ? fmt[1].length : 0;
                        fmt =
                            fmt == 0
                                ? ""
                                : `vnd.ms-excel.numberformat:#,${"#".repeat(
                                      fmt
                                  )}0.${"0".repeat(fmt)}`;
                    }
                    td += ";" + fmt;
                    td += '" x:num ';
                } else {
                    td += ';vnd.ms-excel.numberformat:@"';
                }
                td += ">";
                td += val;
                td += "</td>";
                return td;
            }
            for (let i = 0; i < rows.length; i++) {
                let tr = $.map(self.dataCols, function(col, x) {
                    return _createCell(rows[i], col, i, x);
                });
                trs.push(tr.join(""));
            }
            let content = "<table style=\"font-family: 宋体;font-size:16px;\"><tr>"
                + trs.join("</tr><tr>") + "</tr></table>";
            let $form = $("<form action=\"/export\" method=\"post\" style=\"display: none;\"></form>");
             $("<input type=\"hidden\" id=\"FileName\" name=\"FileName\" />")
            .appendTo($form).val((title || "导出文件") + ".xls");
            $("<input type=\"hidden\" id=\"exportContent\" name=\"exportContent\" />")
            .appendTo($form).val(content);
            $form.appendTo("body").trigger("submit");
            $form.remove();
        },
        SelectRow(index,untrigger){
            if(typeof index === 'number' && index%1 === 0&&index<this.data.length){
                var row=this.data[index]
                this.$refs.tb.setCurrentRow(index);
                if(!untrigger){
                    var oldCurrentRow = this.currentRow;
                    this.$emit("row-click", row, null);
                    this.$set(this, "currentRow", row);
                    this.$emit("current-change", row, oldCurrentRow);
                }
            }
        },
    },
    components: {
        Htable
    },
    mounted() {

    }
};
</script>

<!--<style lang="less">
    @border-color: #ddd;
    @background: #fff;
    @color: #333;
    @font-size: 12px;
    @h-background: #f1f1f1;
    @h-color: #000;
    div.hd-hgrid {
        table.htCore {
            th {
                font-size: @font-size;
                font-weight: bold;
                color: @h-color;
                background-color: @h-background;
                border-color: @border-color;
                > div.relative{
                    padding: 2px 0;
                }
            }
            td {
                font-size: @font-size;
                color: @color;
                background-color: @background;
                border-color: @border-color;
            }
        }
    }
</style>-->
