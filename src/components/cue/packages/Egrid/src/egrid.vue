<!-- elementui table 封装 -->
<!--<style lang="less">
    @border-color: #ddd;
    @background: #fff;
    @color: #333;
    @font-size: 12px;
    @h-background: #f1f1f1;
    @h-color: #000;
    .hd-egrid.el-table {
        color: @color;
        border-color: @border-color;
        font-size: @font-size;
        .el-table__header-wrapper th.gutter {
            display: none !important;
        }
        &:after,
        &:before {
            background-color: @border-color;
        }
        div.el-table__header-wrapper {
            background: @h-background;
        }
        table.el-table__header {
            th {
                background: @h-background;
                border-color: @border-color;
                color: @h-color;
                font-size: @font-size;
                height: 32px;
                padding: 0;
                > div.cell {
                    font-size: 12px;
                    padding: 0 5px;
                    height: 100%;
                    line-height: 32px;
                }
            }
        }
        td {
            height: 30px;
            color: @color;
            font-size: @font-size;
            background: @background;
            border-color: @border-color;
            padding: 0;
            > div.cell {
                font-size: 12px;
                padding: 0 5px;
                height: 100%;
                line-height: 30px;
            }
        }
        tr.el-table__row--striped > td {
            background: #f9fafc;
        }
        tr.current-row > td,
        tr.hover-row > td,
        tr.el-table__row--striped.current-row > td,
        tr.el-table__row--striped.hover-row > td {
            background: #ffe7bc;
        }

        /*锁定区域*/
        .el-table__fixed:after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: @border-color;
            z-index: 4;
        }
        .el-table__fixed-right:after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: @border-color;
            z-index: 4;
        }
        /* 复选框 */
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background: #2da2e9;
            border-color: #007bc1;
        }
    }
</style>-->
<script>
    import Vue from 'vue'

    export default {
        name: 'HdEgrid',
        props: {
            data: {
                type: Array, default(){
                    return []
                }
            },
            height: [String, Number],
            columns: {
                type: Array, default(){
                    return []
                }
                /*详见getColDef
                 {data: "列属性", title: "列名", width: "宽度", halign: "标题对齐", aligh: "数据对齐",
                 fixed: "是否固定", sortable: "排序可用", hide: "隐藏", format: "", children: [子列]}
                 */
            },
            rowno: {//是否显示行号
                type: Boolean, default: false
            },
            checkable: {
                type: [Boolean,Function], default: false
            },
            stripe: {//是否为斑马纹 table
                type: Boolean, default: true
            },
            border: {//是否带有纵向边框
                type: Boolean, default: true
            },
            fit: {//列的宽度是否自撑开
                type: Boolean, default: true
            },
            showHeader: {//是否显示表头
                type: Boolean, default: true
            },
            currentRowKey: {//当前行的 key，只写属性
                type: String, default: "_id"
            },
            rowClassName: Object,//行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
            rowStyle: Object,//行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
            rowKey: {//row-key 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的
                type: String, default: "_id"
            },
            defaultSort: {default: function(){
                return {prop: null, order: null}
            }},//排序
            index: {//页码(仅用作行号计算)
                type:Number,default:1
            },
            size: {//每页行数(仅用作行号计算)
                type:Number,default:50
            },
            showSummary: {type: Boolean, default: false}, //是否在表尾显示合计行
            sumText: {type: String, default: "合计"}, //合计行第一列的文本
            summaryMethod: Object, //自定义的合计计算方法, 参数{columns,data}
            footer: Object, //后台计算的合计行
            bindings:Object
        },
        data: function(){
            return {
                renderFlag: false,
                checked: [], //选中行
                coldef: [], //列定义
                dataCols: [], //数据列定义 导出合计计算使用
                headerRows: 1,//表头行数
                updatedTimer: null, //重新调整界面计时器
                currentRow: null,
                selection: []
            };
        },
        beforeMount: function(){
            this.renderFlag = true;
            this.coldef = this.getColDef();
        },
        render: function(createElement){
            //创建列
            let scopedCol = this.$scopedSlots;

            let _createColumn = (col) =>{
                // 非合并列
                if((col.children || []).length == 0){
                    let set = {
                        props: col.props, scopedSlots: col.scopedSlots || null
                    };
                    // formatter方法转换成作用域插槽，支持html代码。
                    let scopedSlots = null;
                    if(col.formatter){
                        scopedSlots = (scope) =>{
                            return createElement("div", {
                                "class": `fmtcell--${col.props.prop}`,
                                domProps: {innerHTML: col.formatter(scope.row)}
                            });
                        };
                    }
                    // 作用域插槽设置，直接调用gird组件可以使用template和插槽名的方式; 否则必须使用createElement方式。
                    if(col.scoped){
                        col.formatter = () => ""; //作用于插槽，取消formatter。
                        if(typeof col.scoped == "function"){
                            scopedSlots = (scope) =>{
                                return createElement("div",
                                {"class": `scpcell--${col.props.prop}`},
                                [col.scoped(createElement, scope)]);
                            };
                        }
                        //模板插槽名方式渲染作用于插槽
                        else if(scopedCol && scopedCol[col.scoped]){
                            scopedSlots = (scope) =>{
                                return createElement("div",
                                {"class": `scpcell--${col.props.prop}`},
                                [scopedCol[col.scoped](scope)]);
                            };
                        }
                    }
                    if(this.showSummary && col.source){
                        let tempScoped = scopedSlots;
                        //开启合计，改写scopedSlots
                        if(col.source.data == this.dataCols[0].data){
                            // 首列
                            scopedSlots = (scope) =>{
                                if(scope.row.__summary){
                                    return this.sumText;
                                }
                                else if(typeof tempScoped == "function") {
                                    return tempScoped(scope);
                                }
                                else{
                                    return this.getValue(scope.row, col.source.data)
                                }
                            };
                        }
                        else if(col.source.type != "number"){
                            // 非数字列
                            scopedSlots = (scope) =>{
                                if(scope.row.__summary){
                                    return this.getValue(scope.row, col.source.data);
                                }
                                else if(typeof tempScoped == "function") {
                                    return tempScoped(scope);
                                }
                                else{
                                    return this.getValue(scope.row, col.source.data);
                                }
                            };
                        }
                    }
                    if(scopedSlots){
                        set.scopedSlots = {default: scopedSlots};
                    }

                    return createElement("el-table-column", set);
                }
                // 合并列
                return createElement("el-table-column", {props: col.props},
                col.children.map(_createColumn)
                );
            };

            if(!this.renderFlag){
                return createElement("div", {
                    style: {
                        height: this.height + "px"
                    }
                });
            }
            // 增加合计行
            let _data=this.data||[];
            let data = [..._data];
            if(this.showSummary){
                let summary = this.summary({
                    data: _data, footer: this.footer
                });
                summary && data.push(summary);
            }
            let grid = createElement("el-table",
                {
                    ref: "table", "class": "hd-egrid",
                    props: {
                        data: data, border: this.border, height: this.height,
                        stripe: this.stripe, fit: this.fit,
                        "show-header": this.showHeader,
                        "highlight-current-row": true,
                        "default-sort": this.defaultSort,
                        "current-row-key": this.currentRowKey,
                        "row-class-name": this.rowClassName,
                        "row-style": this.rowStyle, "row-key": this.rowKey,
                        "empty-text": "暂无数据",
                        "show-summary": false, // 因为table组件，合计行与固定列存在BUG，故将固定列直接插入data最后。
                        "sum-text": this.sumText,
                        "summary-method": this.summary
                    },
                    on: {
                        "select": this.onSelect,
                        "select-all": this.onSelectAll,
                        "cell-click": this.onCellClick,
                        "header-click": this.onHeaderClick,
                        "cell-dblclick": this.onCellDblclick,
                        "row-click": this.onRowClick,
                        "row-dblclick": this.onRowDblclick,
                        "sort-change": this.onSortChange,
                        "current-change": this.onCurrentChange,
                        "selection-change": this.onSelectionChange,
                        "toggleRowSelection": this.onToggleRowSelection,
                        "expand-change":this.onExpandChange

                    }
                },
                this.coldef.map(_createColumn)
            );
            return createElement("div", {
                style: {
                    height: typeof this.height == "number"
                            ? `${this.height}px` : this.height
                }
            }, [grid]);
        },
        methods: {
            //grid重新渲染
            Rerender: function(CB){
                let self = this;
                self.renderFlag = false;
                self.coldef = self.getColDef();
                self.currentRow = null;
                self.selection = [];
                self.$nextTick(function(){
                    self.renderFlag = true;
                    if(CB) CB();
                });
            },
            Export: function(title, rs, f){
                let self = this;
                let rows = [...(rs || self.data)];
                let footer = {...(f || self.footer)};
                if(this.showSummary){
                    let summary = this.summary({data: rows, footer});
                    summary && rows.push(summary);
                }
                let trs = [];
                for(let i = 0; i < self.headerRows; i++){
                    trs.push("");
                }
                let cols = [...self.coldef];
                self.rowno && cols.shift();
                self.checkable && cols.shift();

                function _createHeaderCell(prop, attr){
                    let html = `<td colspan="${attr.colspan || 1}" rowspan="${attr.rowspan || 1}"
                        style="border:solid 0.5pt #000000;font-size: 16px;
                        vnd.ms-excel.numberformat:@;
                        text-align:${prop["header-align"] || prop.algin || "left"};
                        vertical-align: middle;
                        width: ${prop.width || prop["min-width"] || ""}pt;">${prop.label}</td>
                    `;
                    trs[attr.level] += html;
                }

                function _createTableHeader(col){
                    let attr = col.attr;
                    let prop = col.props;
                    if((col.children || []).length == 0){
                        attr.rowspan = self.headerRows - col.attr.level;
                    } else{
                        for(let i = 0; i < col.children.length; i++){
                            _createTableHeader(col.children[i]);
                        }
                    }
                    _createHeaderCell(prop, attr);
                }

                for(let i = 0; i < cols.length; i++){
                    _createTableHeader(cols[i]);
                }

                function _createCell(row, col){
                    let val = "";
                    if(self.showSummary && row.__summary){
                        //合计行
                        if(col.data == self.dataCols[0].data){
                            val = self.sumText;
                        }
                        //数字列显示合计值
                        else if(col.type == "number"){
                            val = col.formatter
                            ? $(`<div>${col.formatter(row)}</div>`).text()
                            : self.getValue(row, col.data);
                        }
                        else{
                            val = self.getValue(row, col.data);
                        }
                    }
                    else{
                        if(col.exporter||col.formatter){
                            if(col.exporter){
                                val = $(`<div>${col.exporter(row)}</div>`).text();
                            }else{
                                val = $(`<div>${col.formatter(row)}</div>`).text();
                            }
                        } else{
                            val = self.getValue(row, col.data);
                        }
                    }
                    val = val == null ? "" : val;
                    let td = "<td style=\"border:solid 0.5pt #000000; vertical-align: middle; text-align:";
                    td += col.align || "center";
                    if(col.type == "number"){
                        let fmt = "";
                        if($.isNumeric(val)){
                            fmt = String(val).split(".");
                            fmt = fmt.length == 2 ? fmt[1].length : 0;
                            fmt = fmt == 0 ? "" :
                                  `vnd.ms-excel.numberformat:#,${"#".repeat(fmt)}0.${"0".repeat(fmt)}`;
                        }
                        td += ";" + fmt;
                        td += "\" x:num ";
                    }
                    else{
                        td += ";vnd.ms-excel.numberformat:@\"";
                    }
                    td += ">";
                    td += val;
                    td += "</td>";
                    return td;
                }

                for(let i = 0; i < rows.length; i++){
                    let tr = $.map(self.dataCols, function(col){
                        return _createCell(rows[i], col);
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
            //公开event
            onSelect: function(selection, row){
                if(this.showSummary && row.__summary){
                    return;
                }
                this.$emit("select", selection, row);
            },
            onSelectAll: function(selection){
                this.$emit("select-all", selection);
            },
            onCellClick: function(row, column, cell, event){
                if(this.showSummary && row.__summary){
                    return;
                }
                let field = column.property;
                let value = this.getValue(row, field);
                this.$emit("cell-click", field, value, row, column, cell, event);
            },
            onHeaderClick: function(column, event){
                let field = column.property;
                // 行号列重置排序
                if(field == "__row__no"){
                    if(this.defaultSort.prop){
                        this.onSortChange({prop: null, order: null});
                    }
                    return;
                }
                this.$emit("header-click", field, column, event);
            },
            onCellDblclick: function(row, column, cell, event){
                if(this.showSummary && row.__summary){
                    return;
                }
                let field = column.property;
                let value = this.getValue(row, field);
                this.$emit("cell-dblclick", field, value, row, column, cell, event);
            },
            onRowClick: function(row, event){
                if(this.showSummary && row.__summary){
                    return;
                }
                this.$emit("row-click", row, event);
            },
            onRowDblclick: function(row, event){
                if(this.showSummary && row.__summary){
                    return;
                }
                this.$emit("row-dblclick", row, event);
            },
            onSortChange: function(order){
                if(order.prop != this.defaultSort.prop ||
                order.order != this.defaultSort.order){
                    this.$emit("sort-change", order);
                }
            },
            onCurrentChange: function(currentRow, oldCurrentRow){
                if(this.showSummary && (currentRow || {}).__summary){
                    this.$refs.table.setCurrentRow(oldCurrentRow);
                    return;
                }
                if(this.showSummary && (oldCurrentRow || {}).__summary){
                    return;
                }
                this.currentRow = currentRow;
                this.$emit("current-change", currentRow, oldCurrentRow);
            },
            onSelectionChange: function(selection){
                this.selection = selection;
                this.$emit("selection-change", selection);
            },
            onToggleRowSelection: function(rows){
                if (rows) {
                  rows.forEach(row => {
                    this.$refs.table.toggleRowSelection(row);
                  });
                }
            },
            onExpandChange:function(row, expandedRows){
                this.$emit("expand-change", row, expandedRows);
            },
            //私有方法
            // 合计行计算
            summary({data, footer}){
                // 未开启合计计算或无数据的情况
                if(!this.showSummary || data.length == 0){
                    return null;
                }
                let smry;
                if(typeof this.summaryMethod == "function"){
                    smry = this.summaryMethod({
                        columns: this.dataCols, data, footer
                    }) || {};
                    if($.isEmptyObject(smry)){
                        return null;
                    }
                    smry.__summary = true; // 合计行标志
                    return smry;
                }
                smry = {};
                data.forEach((row) =>{
                    for(let i = 0; i < this.dataCols.length; i++){
                        let col = this.dataCols[i];
                        if(col.type != "number"){
                            continue
                        }
                        let v = this.getValue(row, col.data);
                        if($.isNumeric(v)){
                            v = Number(v);
                            smry[col.data] = (smry[col.data] || 0) + v;
                        }
                    }
                });
                if($.isEmptyObject(smry)){
                    return null;
                }
                smry.__summary = true; // 合计行标志
                return smry;
            },
            // 列定义转化
            getColDef(){
                let self = this;
                let cols = [];
                let headerRows = 1; //表头行数
                //添加选中列
                if(this.checkable){
                    let checkcol = {
                        type: "selection", align: "center", width: 35,
                        fixed: "left"
                    };
                    if(this.showSummary){
                        // 合计行不显示复选框
                        checkcol.selectable = (row, index) =>{
                            return !row.__summary
                            && (typeof this.checkable == "function"
                            ? this.checkable(row, index) : true);
                        };
                    }
                    else if(typeof this.checkable == "function"){
                        checkcol.selectable = this.checkable;
                    }
                    cols.push({props: checkcol});
                }
                //添加序号列
                if(this.rowno){
                    cols.push({
                        props: {
                            title: "#", width: 45, fixed: "left",
                            prop: "__row__no",
                            align: "left", "render-header"(h){
                                return h("span", {
                                    "class": "hd-grid-title",
                                    domProps: {innerHTML: "#"}
                                });
                            }
                        },
                        scopedSlots: {
                            default: self.showSummary
                            ? function(scope){
                                // 合计行不显示行号
                                if(scope.row.__summary){
                                    return ""
                                }
                                return scope["$index"] +
                                (self.index - 1) * self.size + 1;
                            }
                            : function(scope){
                                return scope["$index"] +
                                (self.index - 1) * self.size + 1;
                            }
                        }
                    });
                }

                let dataCols = [];

                function _create(list, col, level, isFixed){
                    if(col.hide){
                        return;
                    }
                    let c = {
                        source: {...col}, //列原始定义
                        props: {
                            label: col.title, resizable: true,
                            "show-overflow-tooltip":true,
                            "header-align": col.halign || "center",
                            "render-header"(h){
                                return h("span", {
                                    "class": "hd-grid-title",
                                    domProps: {innerHTML: col.title}
                                });
                            }
                        },
                        children: [],
                        attr: {level: level}
                    };
                    if(col.children && col.children.length > 0){
                        for(let i = 0; i < col.children.length; i++){
                            _create(c.children, col.children[i],
                            level + 1, isFixed);
                        }
                        let colspan = 0, width = 0;
                        for(let i = 0; i < c.children.length; i++){
                            colspan += c.children[i].attr.colspan;
                            width += c.children[i].props.width;
                        }
                        if(colspan > 0){
                            c.attr.colspan = colspan;
                            c.props.width = width;
                            c.props["header-align"] = "center";
                            list.push(c);
                        }
                        if(isFixed && level == 0 && col.fixed == "left"){
                            c.props.fixed = "left";
                        }
                        return;
                    }
                    list.push(c);
                    if(level + 1 > headerRows){
                        headerRows = level + 1;
                    }
                    c.attr.colspan = 1;
                    c.props.prop = col.data;
                    c.props.width = col.width || col.minWidth || "";
                    c.props.type=c.source.type||"";

                    if(isFixed){
                        c.props.resizable = false; // 固定列不能调整宽度
                        col.fixed == "left" && (c.props.fixed = "left"); // 左固定
                    }
                    else{
                        c.props.resizable = true;
                        col.minWidth && (c.props["min-width"] = col.minWidth);
                    }
                    if(col.sortable){
                        // 设置排序方法
                        if(typeof col.sortable == "function"){
                            c.props.sortable = true;
                            c.props["sort-method"] = col.sortable;
                        }
                        else{
                            c.props.sortable = "custom";
                            c.props["sort-method"] = null;
                        }
                    }
                    //c.props["show-overflow-tooltip"] = true;
                    // 对齐方式
                    c.props.align = col.align || "center";
                    if(col.format!=undefined&&col.format!=null){
                        // 创建formatter方法。
                        c.formatter = self.createFormatter(col,'format');
                    }
                    if(col.export!=undefined&&col.export!=null){
                        // 创建exporter方法。
                        c.exporter = self.createFormatter(col,'export');
                    }
                    if(col.scoped){
                        // 设置作用域插槽
                        c.scoped = col.scoped;
                    }
                    dataCols.push({
                        ...col, width: c.props.width, align: c.props.align,
                        formatter: c.formatter || null,exporter:c.exporter||null
                    });
                }

                for(let i = 0; i < this.columns.length; i++){
                    _create(cols, this.columns[i], 0, !!this.columns[i].fixed);
                }
                self.headerRows = headerRows;
                self.dataCols = dataCols;
                //检查是否超过宽度，激活右锁定
                if(self.$el){
                    let width = $(self.$el).width() - 17;
                    let cwidth = 0;
                    let rights = []; //右固定列
                    // 计算列总宽度
                    cols.forEach((c, i) =>{
                        cwidth += c.props.width;
                        (c.source || {}).fixed == "right" && rights.push(i);
                    });
                    // 列总宽度大于表格宽度且存在右固定列，激活有固定选项。
                    if(cwidth > width && rights.length > 0){
                        rights.forEach((i) =>{
                            cols[i].props.fixed = "right";
                        });
                    }
                }
                return cols;
            },
            // 创建formatter方法
            createFormatter(col,format){
                let self = this;
                format=format||"format"
                const factory = {
                    "function": function(row){
                        let value = self.getValue(row, col.data);
                        value = col[format](value, row, col);
                        return value == null ? "" : value;
                    },
                    "number": function(row){
                        let value = self.getValue(row, col.data);
                        if(Vue.filter("NUMBER")) return Vue.filter("NUMBER")(value, col[format]);
                        return value;
                    },
                    "string": function(row){
                        let value = self.getValue(row, col.data);
                        if(col.type == "date"){
                            if(Vue.filter("DATE")) return Vue.filter("DATE")(value, col[format]);
                        } else if(col.type == "number"){
                            if(Vue.filter("NUMBER")) return Vue.filter("NUMBER")(value, col[format]);
                        } else{
                            if(Vue.filter("CODE")) return Vue.filter("CODE")(value, col[format],null,self.bindings||{});
                        }
                        return value;
                    }
                };
                return factory[typeof col[format]] || null;
            },
            // 根据获得单元格的值
            getValue(row, field){
                if(row[field]===0) return 0;
                try {
                    return eval("row['" + field.replace(/\./g, "']['") + "']");
                } catch (e) {
                    return null;
                }
            },
            SelectRow(index,untrigger){
                if(typeof index === 'number' && index%1 === 0&&index<this.data.length){
                    var row=this.data[index]
                    this.$refs.table.setCurrentRow(row);
                    if(!untrigger){
                        this.onRowClick(row,null);
                        var oldCurrentRow = this.currentRow;
                        this.$set(this, "currentRow", row);
                        this.$emit("current-change", row, oldCurrentRow);
                    }
                }
            }
        },
        updated: function(){
            //饿了么table BUG 修复后移除
            let self = this;
            let $grid = $(self.$el);
            // var h=$grid.find(".el-table__body-wrapper").height();
            // $grid.find(".el-table__body-wrapper").css("overflow-x","auto").slimScroll({height:h,start: 'top' });
            // $grid.find(".el-table__body-wrapper").niceScroll({cursorcolor:'#CCCCCC',horizrailenabled:true})
            clearTimeout(self.updatedTimer);
            self.updatedTimer = setTimeout(function(){
                let leftCols = 0, rightCols = 0, total = 0,
                rindex = self.coldef.length;
                for(let i = 0; i < self.coldef.length; i++){
                    let c = self.coldef[i];
                    let colspan = (c.attr || {}).colspan || 1;
                    total += colspan;
                    if(c.props.fixed == "left"){
                        leftCols += colspan;
                    }
                    else if(c.props.fixed == "right"){
                        i < rindex && (rindex = i);
                        rightCols += colspan;
                    }
                }
                let $grid = $(self.$el);
                let $right = $grid.children("div.el-table__fixed-right");
                //修改右锁定标题
                $right.find("table.el-table__header>thead>tr:first>th:gt(" +
                (rindex - 1) + ")").removeClass("is-hidden");
                //修改右锁定内容
                $right.find("table.el-table__body>tbody>tr").each(function(){
                    $(this).children("td:gt(" + (total - rightCols - 1) + ")")
                    .removeClass("is-hidden");
                });
                //修改左锁定内容
                $grid.children("div.el-table__fixed")
                .find("table.el-table__body>tbody>tr").each(function(){
                    $(this).children("td:lt(" + leftCols + ")")
                    .removeClass("is-hidden");
                });
                // var h=$grid.find(".el-table__body-wrapper").height();
                // $grid.find(".el-table__body-wrapper").css("overflow-x","auto").slimScroll({height:h,start: 'top' });
            }, 300);
        }
    }
</script>
