<template>
    <div class="hd-crud hd-report">
        <div class="hd-report-header">
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
                <el-button type="success" size="mini" icon="el-icon-search"
                           v-show="(proreports[index].quicks).length > 0"
                           @click="Query">查询</el-button>
                <slot name="extend"></slot>
            </div>
            <div class="hd-report-tools">
                <slot name="extend-tools"></slot>
                <template v-if="!!proreports[index].form">
                    <el-button size="mini" circle
                               v-show="!proreports[index].buttons.insert.hide"
                               :disabled="proreports[index].buttons.insert.disabled"
                               :title="proreports[index].buttons.insert.name||'新增'"
                               @click="onAdd">
                        <i :class="proreports[index].buttons.insert.icon || 'fa fa-plus'"
                           aria-hidden="true"></i>
                    </el-button>
                    <el-button size="mini" circle
                               v-show="!proreports[index].buttons.update.hide"
                               :disabled="!proreports[index].currentRow||proreports[index].buttons.update.disabled"
                               :title="proreports[index].buttons.update.name||'修改'"
                               @click="onEdit(proreports[index].currentRow)">
                        <i :class="proreports[index].buttons.update.icon || 'fa fa-pencil'"
                           aria-hidden="true"></i>
                    </el-button>
                    <el-button size="mini" circle
                               v-show="!proreports[index].buttons.delete.hide"
                               :disabled="!proreports[index].currentRow||proreports[index].buttons.delete.disabled"
                               :title="proreports[index].buttons.delete.name||'删除'"
                               @click="onDel(proreports[index].currentRow)">
                        <i :class="proreports[index].buttons.delete.icon || 'fa fa-trash'"
                           aria-hidden="true"></i>
                    </el-button>
                </template>

                <template v-if="!proreports[index].buttons.export.hide">
                    <el-button size="mini" circle
                               v-if="!proreports[index].pager.enable"
                               @click="ExportData('page')">
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </el-button>

                    <el-dropdown v-else @command="ExportData">
                        <el-button circle size="mini">
                            <i class="fa fa-download" aria-hidden="true"></i>
                        </el-button>
                        <el-dropdown-menu class="hd-report-dropdown-menu"
                                          slot="dropdown">
                            <el-dropdown-item command="page">当页
                            </el-dropdown-item>
                            <el-dropdown-item command="all">全部
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </div>
        </div>
        <div class="hd-report-body" :class="'hd-report-body--' + curcode">
            <div class="hd-report-report" :style="{height: gridHeight+'px'}"
                v-show="proreports[index].view == 'report'">
                <slot name="report-view">
                  <hd-grid ref="grid" :height="(proreports[index].grid.gridHeight)*gridHeight||gridHeight"
                          :data="proreports[index].grid.data" :columns="proreports[index].grid.columns"
                          :checkable="proreports[index].grid.checkable" :rowno="proreports[index].grid.rowno"
                          :index="proreports[index].pager.index" :size="proreports[index].pager.size"
                          :row-class-name="proreports[index].grid['row-class-name']"
                          :default-sort="proreports[index].sort" :row-style="proreports[index].grid['row-style']"
                          :bindings="proreports[index].bindings"
                          @select="onSelect" @select-all="onSelectAll" @row-click="onRowClick" @row-dblclick="onDbClick"
                          @cell-click="onCellClick" @cell-dblclick="onCellDblclick" @sort-change="onSortChange"
                          @current-change="onCurrentChange" @selection-change="onSelectionChange">
                  </hd-grid>
                </slot>

                <!-- 表单底部信息 -->

                <div class="hd-report-bottom" v-show="proreports[index].grid.gridHeight||false" :style="{height: (1-proreports[index].grid.gridHeight)*gridHeight+'px'}">
                    <div class="hd-report-bottom-div1" :style="{'line-height': (1-proreports[index].grid.gridHeight)*gridHeight+'px'}">备注</div>
                    <slot name="bottomtitle">
                      <div class="hd-report-bottom-div2">
                        <div style="word-break: break-all;padding:10px;">{{bottomtitle}}</div>
                      </div>
                    </slot>
                </div>

            </div>
            <div class="hd-report-custom" :style="{height: gridHeight+'px'}"
                 v-show="proreports[index].view == 'custom'">
                <slot name="custom-view"></slot>
            </div>
            <!--弹出框-->
            <el-dialog
                       custom-class="hd-crud-dialog"
                       :title="proreports[index].name"
                       :visible.sync="formVisible"
                       :modal-append-to-body="false"
                       :close-on-click-modal="false"
                       :top="dialogTop"
                       :modal="proreports[index].dialogModal"
                       v-if="((proreports[index].form || {}).inputs || []).length > 0">
               <hd-form ref="hdform" :key="proreports[index].code" :form="proreports[index].form" @on-change="formchange"
                @before-disable="formBeforeDisable" @after-disable="formAfterDisable"
                @before-enable="formBeforeEnable" @after-enable="formAfterEnable"
                    @unique-validate="onUniqueValidate" >
                   <template slot="form">
                        <slot name="form">
                        </slot>
                   </template>
               </hd-form>
                <template slot="footer">
                    <el-button size="mini" type="primary" @click.native="formVisible = false">取 消</el-button>
                    <el-button size="mini" type="success" @click="onSave" :disabled="saveButtonDisable">确 定</el-button>
                </template>
            </el-dialog>
        </div>
        <div class="hd-report-footer" v-show="showTab || proreports[index].pager.enable">
            <div class="hd-report-tabs" v-show="showTab">
                <el-button-group>
                    <el-button v-if="single" type="primary" size="small">{{proreports[index].name}}</el-button>
                    <el-button v-else v-for="r in proreports" :key="r.code" :type="curcode == r.code ? 'primary' : ''"
                               size="small" @click="SwitchReport(r.code)">{{r.name}}
                    </el-button>
                </el-button-group>
            </div>
            <div class="hd-report-pager" v-show="proreports[index].pager.enable">
                <el-pagination :page-sizes="[50, 100, 200, 500]" layout="sizes, prev, pager, next, total"
                               :page-size="proreports[index].pager.size" :current-page="proreports[index].pager.index"
                               :total="proreports[index].pager.total" @size-change="pageSizeChange"
                               @current-change="pageIndexChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<!--<style lang="less" rel="stylesheet/less">
div.hd-crud {
    width: 100%;
    box-sizing: border-box;
    background: #FFF;
    overflow: hidden;
    > div.hd-report-body {
        div.hd-report-bottom {
            position: relative;
            padding: 0 10px;
            background-color: #f5f5f5;
            // border: 1px solid red;
            // border-left: 1px solid #ddd;
            width: 100%;
            .hd-report-bottom-div1 {
                font-size: 18px;
                width: 10%;
                border-right: 1px solid #ddd;
                height: 100%;
                text-align: center;
                float: left;
            }
            .hd-report-bottom-div2 {
                width: 80%;
                float: left;
                // padding:15px;
                overflow: auto;
                height: 100%;
            }
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
</style>-->

<script>
    import hdReport from "../../Report/src/index.vue";
    import {CRUD} from "../../../src/utils/util.js";
    import hdForm from "../../Form/src/form.vue";
    import hdGrid from "../../Egrid/src/egrid.vue";

    export default {
        name: "HdCrud",
        props: {
            dialogTop: {type: String, default: "90px"},
            autoQuery: {type: Boolean, default: true},
            local: {type: Boolean, default: true},    //本地模式  新增/修改/删除后直接页面更新，不再从后台查询
        },
        data: function(){
            return {
                inreports: null,
                proreports: null,
                index: 0,
                curcode: "",
                gridHeight: 0,
                loadHandler: null,
                idField: "_id",
                formVisible: false,
                dialogModal: true,
                saveButtonDisable: false
            };
        },
        components: {hdForm, hdGrid},
        mixins: [hdReport], //混合hdReport
        computed: {},
        methods: {
            __init(_proreports){
                //copy proreports，防止destroyed后再创建时出现脏数据
                this.proreports =
                    _proreports ||
                    $.extend(true, {}, {rpts: this.reports}).rpts;
                this.bottomtitle = $.extend(
                    true,
                    {},
                    {rpts: this.bottomtitle}
                ).rpts;
                if(this.proreports){
                    // this.inreports=($.extend(true,{},{rpts:this.proreports})).rpts;//原始留存
                    var gridHeight = 0;
                    var that = this;
                    for(let i = 0; i < this.proreports.length; i++){
                        let report = this.proreports[i];
                        report.params = {};
                        report.quicks = report.quicks || [];
                        if(typeof report.quicks == "function"){
                            report.quicks = report.quicks() || [];
                        }
                        $.each(report.quicks, function(i, q){
                            q.data = q.data || [];
                            if(q.format){
                                $.each(
                                    that.BindRecords(q.format, report.bindings),
                                    function(j, b){
                                        q.data.push({
                                            name: b.Name,
                                            value: b.Value
                                        });
                                    }
                                );
                            }
                        });
                        this.$set(report, "quicks", report.quicks || []);
                        this.$set(report, "grid", report.grid || {});
                        this.$set(report.grid, "data", []);
                        this.$set(report.grid, "rowno",
                            report.grid.rowno != false);
                        this.$set(report, "pager", report.pager || {});
                        this.$set(
                            report.pager,
                            "enable",
                            report.pager.enable != false
                        );
                        this.$set(report.pager, "size",
                            report.pager.size || 50);
                        this.$set(report.pager, "index",
                            report.pager.index || 1);
                        this.$set(report.pager, "total",
                            report.pager.total || 0);
                        this.$set(report, "sort", {prop: null, order: null}); //排序
                        this.$set(report, "view", report.view || "report"); //默认显示模式
                        const crud = new CRUD(report.service, report.prefix);
                        if(report.url){
                            crud.url = report.url;
                        }
                        this.$set(report, "crud", crud);
                        this.$set(report, "currentRow", null);
                        const buttons = report.buttons || {};
                        this.$set(report, "buttons", {
                            ...{insert: {}, update: {}, delete: {}, export: {}},
                            ...buttons
                        });
                        this.$set(report, "bindings", report.bindings || {});
                        if(report.form){
                            this.$set(
                                report.form,
                                "bindings",
                                $.extend(
                                    {},
                                    report.bindings || {},
                                    report.form.bindings || {}
                                )
                            );
                        }
                    }
                    var curcode = this.current;
                    let index = this.GetReportIndexByCode(curcode);
                    if(index < 0){
                        curcode = this.proreports[0].code;
                        this.$emit("update:current", curcode);
                        index = 0;
                    }
                    this.curcode = curcode;
                    this.index = index;

                    // this.gridHeight=gridHeight;
                }
            },
            //CRUD增加ReBinds方法
            ReBinds(keys, exflag){
                let report = this.GetCurrentReport();
                if(exflag == undefined){
                    exflag = false;
                }

                var abinds = report.bindings || {};
                for(var i = 0; i < keys.length; i++){

                    var tbind = this.BindRecords(keys[i]);
                    abinds[keys[i]] = tbind;
                }

                this.$set(report, "bindings", abinds);
                if(report.form){
                    this.$set(
                        report.form,
                        "bindings",
                        $.extend(
                            exflag,
                            {},
                            report.form.bindings || {},
                            abinds
                        )
                    );
                }

            },
            //清空报表
            Clear: function(){
                let report = this.GetCurrentReport();
                report.pager.index = 1;
                report.pager.total = 0;
                report.grid.data = [];
            },
            ExportData: function(cmd){
                let self = this;
                let report = self.GetCurrentReport();
                let fn = [self.name || "", "", report.name || "", ""];
                if(fn[0] && fn[2]){
                    fn[1] = "(";
                    fn[3] = ")";
                }
                fn = fn.join("");
                switch(cmd){
                    case "page":
                        this.$refs.grid.Export(fn);
                        return;
                    case "all":
                        self.loadData(
                            report,
                            true,
                            {
                                index: 1,
                                size: 60000
                            },
                            function(data){
                                self.$refs.grid.Export(fn, data.rows || []);
                            }
                        );
                        return;
                }
            },
            //按钮
            DisableButton: function(...btns){
                let report = this.GetCurrentReport();
                for(let i = 0; i < btns.length; i++){
                    report.buttons[btns[i]].disabled = true;
                }
            },
            EnableButton: function(...btns){
                let report = this.GetCurrentReport();
                for(let i = 0; i < btns.length; i++){
                    report.buttons[btns[i]].disabled = false;
                }
            },
            formchange: function(...args){
                this.$emit("form-change", ...args);
            },
            formBeforeDisable: function(...args){
                this.$emit("form-before-disable", ...args);
            },
            formAfterDisable: function(...args){
                this.$emit("form-after-disable", ...args);
            },
            formBeforeEnable: function(...args){
                this.$emit("form-before-enable", ...args);
            },
            formAfterEnable: function(...args){
                this.$emit("form-after-enable", ...args);
            },
            //切换当前行
            onCurrentChange: function(currentRow, oldCurrentRow){
                let current = this.GetCurrentReport();
                current.currentRow = this.GetCurrentRow();
                this.$emit("current-change", this, currentRow, oldCurrentRow);
            },
            //数据查询
            loadData: function(report, refresh, pager, callback){
                let self = this;
                report = report || self.proreports[self.index];
                pager = {
                    index: (pager || {}).index || report.pager.index || 1,
                    size: (pager || {}).size || report.pager.size
                };
                let sort = report.sort.prop
                           ? {
                        field: report.sort.prop,
                        type: report.sort.order
                              ? report.sort.order == "descending"
                              : null
                    }
                           : {};
                var _sort = [];
                $.each(sort, function(i, s){
                    var o = {};
                    o[s.field] = s.type ? 1 : 0;
                    _sort.push(o);
                });
                let params;
                if(refresh){
                    params = report.params;
                    $.extend(params, pager, {order: _sort});
                }
                else{
                    params = self.$refs.topbar[self.index].GetValues();
                    params = $.extend(true, {}, params, pager, {order: _sort});
                }
                let conditions = [];
                for(
                    let i = 0, quicks = report.quicks;
                    i < report.quicks.length;
                    i++
                ){
                    if(quicks[i].type === "input"){
                        const value = params[quicks[i].field];
                        if(!self.isEmpty(value)){
                            conditions.push({
                                Field: quicks[i].field,
                                Value: value,
                                Operate: "like",
                                Relation: "and"
                            });
                        }
                    }
                    else if(quicks[i].type === "daterange"){
                        const begin = params[quicks[i].field + "Begin"];
                        let end = params[quicks[i].field + "End"];
                        if(begin){
                            conditions.push({
                                Field: quicks[i].field,
                                Value: begin,
                                Operate: ">=",
                                Relation: "and"
                            });
                        }
                        if(end){
                            if(
                                quicks[i].valueType === "number" &&
                                quicks[i].option.format === "yyyy-MM-dd"
                            ){
                                end = end + 86400 - 1; // 日期型时间范围的结束时间戳延后至23:59:59
                            }
                            conditions.push({
                                Field: quicks[i].field,
                                Value: end,
                                Operate: "<=",
                                Relation: "and"
                            });
                        }
                    }
                    else if(quicks[i].type === "numberrange"){
                        const min = params[quicks[i].field + "Min"];
                        const max = params[quicks[i].field + "Max"];
                        if(!self.isEmpty(min)){
                            conditions.push({
                                Field: quicks[i].field,
                                Value: min,
                                Operate: ">=",
                                Relation: "and"
                            });
                        }
                        if(!self.isEmpty(max)){
                            conditions.push({
                                Field: quicks[i].field,
                                Value: max,
                                Operate: "<=",
                                Relation: "and"
                            });
                        }
                    }
                    else{
                        const value = params[quicks[i].field];
                        if(!self.isEmpty(value)){
                            conditions.push({
                                Field: quicks[i].field,
                                Value: value,
                                Operate: "=",
                                Relation: "and"
                            });
                        }
                    }
                }
                params.conditions = conditions;
                if(typeof report.beforeQuery == "function"){
                    params = report.beforeQuery(params, this);
                    if(params == false){
                        return;
                    }
                }
                report.params = params;
                self.loading();

                function _load(){
                    report.crud
                        .query(params)
                        .then(json => {
                            if(typeof report.afterQuery == "function"){
                                json = report.afterQuery(json, report);
                                if(json == false){
                                    self.loaded();
                                    return;
                                }
                            }
                            if(typeof callback == "function"){
                                self.loaded();
                                callback(json);
                                return;
                            }
                            json = json || {};
                            report.grid.data = json.rows || [];
                            report.pager.total = json.total || 0;
                            self.$nextTick(function(){
                                self.$refs.grid.Rerender(() => {
                                    if(report.afterRender){
                                        report.afterRender(json);
                                    }
                                });
                                report.currentRow = null;
                                self.loaded();
                            });
                        })
                        .fail(msg => {
                            self.$message({
                                message: msg,
                                type: "error"
                            });
                            self.loaded();
                        });
                }

                self.$nextTick(function(){
                    setTimeout(_load, 50);
                });
            },
            loading: function(text = "加载中..."){
                this.loadHandler = this.$loading({
                    fullscreen: true,
                    lock: true,
                    text: text
                });
            },
            onAdd(){
                var self = this;
                let current = self.GetCurrentReport();
                if(!current.buttons.insert.onclick){
                    self.formVisible = true;
                    self.$nextTick(function(){
                        self.$refs.hdform.Clear();
                    });
                }
                else{
                    current.buttons.insert.onclick(current, this);
                }
            },
            onDbClick(row){
                let current = this.GetCurrentReport();
                this.onEdit(row);
                this.$emit("row-dblclick", current, row);
            },
            onEdit(row){
                var self = this;
                let current = this.GetCurrentReport();
                if(current.buttons.update.hide == true){
                    return;
                }
                if(!current.buttons.update.onclick){
                    if(!current.form || current.buttons.update.disabled){
                        return;
                    }
                    self.formVisible = true;
                    self.$nextTick(function(){
                        if(current.buttons.update.beforeSet){
                            current.buttons.update.beforeSet(row, current,
                                this);
                        }
                        self.$refs.hdform.Set(row);
                        if(current.buttons.update.afterSet){
                            current.buttons.update.afterSet(row, current, this);
                        }
                    });
                }
                else{
                    current.buttons.update.onclick(row, current, this);
                }
            },
            onSave(){
                var self = this;
                let current = self.GetCurrentReport();
                self.saveButtonDisable = true;
                self.$refs.hdform.Get().done(function(record){
                    if(typeof current.form.beforeSave == "function"){
                        var state = current.form.beforeSave(
                            record,
                            !!record[current.crud.key]
                        );
                        if(state == false){
                            self.saveButtonDisable = false;
                            return;
                        }
                    }
                    self.loading("提交中...");
                    var f = record[current.crud.key]
                            ? current.crud.update
                            : current.crud.insert;
                    var msg = record[current.crud.key] ? "更新成功!" : "新增成功!";
                    f(record)
                        .then(rep => {
                            self.loaded();
                            self.saveButtonDisable = false;
                            self.formVisible = false;
                            self.$message({
                                message: msg,
                                type: "success"
                            });
                            if(current.buttons.update.afterSave){
                                let state = current.buttons.update.afterSave(
                                    rep);
                                if(state === false){
                                    return
                                }
                            }
                            if(self.local){
                                var ds = self.GetData()
                                if(record[current.crud.key]){
                                    $.each(ds, (i, d) => {
                                        if(d[current.crud.key] ==
                                            rep[current.crud.key]){
                                            self.$set(ds, i, rep)
                                        }
                                    })
                                }
                                else{
                                    ds.unshift(rep);
                                    current.pager.total += 1;
                                }
                                self.SetData(ds)
                            }
                            else{
                                self.Query();
                            }
                        })
                        .fail(e => {
                            self.loaded();
                            self.saveButtonDisable = false;
                        });
                }).fail(() => {
                    self.saveButtonDisable = false;
                });
            },
            onUniqueValidate(data, vals, callback){
                let current = this.GetCurrentReport();
                let conditions = vals.map(x => {
                    return {
                        Field: x.field,
                        Value: x.value,
                        Operate: "=",
                        Relation: "and"
                    };
                });
                if(data[current.crud.key]){
                    conditions.push({
                        Field: current.crud.key,
                        Value: data[current.crud.key],
                        Operate: "!=",
                        Relation: "and"
                    });
                }
                else{
                    conditions.push({
                        Field: current.crud.key,
                        Value: "nil",
                        Operate: "!=",
                        Relation: "and"
                    });
                }
                current.crud
                    .query({conditions, size: 1, index: 1})
                    .then(json => {
                        if(json.rows.length){
                            callback(false);
                        }
                        else{
                            callback(true);
                        }
                    })
                    .fail(msg => {
                        callback(false, msg);
                    });
            },
            onDel(row){
                let current = this.GetCurrentReport();
                let state = true;
                let self = this;
                var ds = this.GetData() || [];
                const success = () => {
                    this.$confirm("确定要删除选中的记录吗?", "提示", {
                        type: "warning",
                        showClose: false,
                        callback: (action, instance) => {
                            //使用callback, ie不支持then
                            if(action === "confirm"){
                                this.loading("删除中");
                                current.crud
                                    .delete(row)
                                    .then(rep => {
                                        self.$message({
                                            message: "删除成功!",
                                            type: "success"
                                        });
                                        self.loaded();
                                        if(self.local){
                                            var k = -1;
                                            $.each(ds, (i, d) => {
                                                if(d[current.crud.key] ==
                                                    row[current.crud.key]){
                                                    k = i;
                                                }
                                            })
                                            if(k >= 0){
                                                ds.splice(k, 1);
                                                current.pager.total -= 1;
                                                self.$nextTick(() => {
                                                    self.SetData(ds)
                                                });
                                            }
                                        }
                                        else{
                                            self.Query();
                                        }

                                        if(current.buttons.delete.afterDelete){
                                            current.buttons.delete.afterDelete(
                                                row,
                                                current,
                                                self
                                            );
                                        }
                                    })
                                    .fail(msg => {
                                        this.loaded();
                                    });
                            }
                        }
                    });
                };
                if(typeof current.form.beforeDelete == "function"){
                    state = current.form.beforeDelete(row, function(result){
                        if(result){
                            success();
                        }
                    });
                }
                if(state){
                    success();
                }
            },
            isEmpty(val){
                return !val && val !== 0;
            }
        },
        created(){
            this.__init();
        }
    };
</script>
