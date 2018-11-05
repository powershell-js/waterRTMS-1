<template>
    <el-form ref="form" class="hd-form"
                :model="bform.data"
                :label-width="bform.labelWidth"
                label-position="left"
                :rules="bform.rules"
                :show-message="false">
        <table>
            <colgroup>
                <col v-for="i in bform.maxSpan" :key="i"
                        :style="{width: 100.0 / bform.maxSpan + '%'}" />
            </colgroup>
            <tr v-for="(row,i) in bform.inputs" :key="i">
                <td v-for="ip in row"  :colspan="ip.colSpan ||1" :key="ip.data" v-show="!ip.hide">
                    <template v-if="ip.showType=='text'">
                        <el-form-item :prop="ip.data"
                                        :class="{'hasUnit': ip.unit}">
                            <template slot="label">
                                <el-tooltip :disabled="!ip.help"
                                            placement="top-start">
                                    <div slot="content" v-html="ip.help"></div>
                                    <a>{{ip.title}}</a>
                                </el-tooltip>
                            </template>
                            <template v-if="ip.dataType=='Number'||ip.dataType=='Integer'">
                                <el-input :id="'vinput_'+ip.data"
                                            size="mini"
                                            @change="TriggerEvent($event,ip.change)"
                                            v-model.number="bform.data[ip.data]"
                                            :placeholder="ip.placeholder"
                                            :disabled="ip.disabled">
                                    <span slot="append"
                                            v-if="ip.unit">{{ip.unit}}</span>
                                    <el-button slot="append"
                                                :icon="ip.button===true?'el-icon-more':ip.button.icon||'el-icon-more'"
                                                @click="bform.buttonClick[ip.data](bform.data[ip.data], bform.data)"
                                                v-if="ip.button"></el-button>
                                </el-input>
                            </template>
                            <template v-else>
                                <el-input :id="'vinput_'+ip.data"
                                            size="mini"
                                            @change="TriggerEvent($event,ip.change)"
                                            v-model="bform.data[ip.data]"
                                            :placeholder="ip.placeholder"
                                            :disabled="ip.disabled">
                                    <span slot="append"
                                            v-if="ip.unit">{{ip.unit}}</span>
                                    <el-button slot="append"
                                                :icon="ip.button===true?'el-icon-more':ip.button.icon||'el-icon-more'"
                                                @click="bform.buttonClick[ip.data](bform.data[ip.data], bform.data)"
                                                v-if="ip.button"></el-button>
                                </el-input>
                            </template>
                        </el-form-item>
                    </template>
                    <template v-if="ip.showType=='textarea'">
                        <el-form-item :prop="ip.data">
                            <template slot="label">
                                <el-tooltip :disabled="!ip.help"
                                            placement="top-start">
                                    <div slot="content" v-html="ip.help"></div>
                                    <a>{{ip.title}}</a>
                                </el-tooltip>
                            </template>
                            <el-input :id="'vinput_'+ip.data"
                                        type="textarea"
                                        @change="TriggerEvent($event,ip.change)"
                                        v-model="bform.data[ip.data]"
                                        :placeholder="ip.placeholder"
                                        :disabled="ip.disabled"
                                        :rows="ip.disabled"
                                        ></el-input>
                        </el-form-item>
                    </template>
                    <template v-if="ip.showType=='number'">
                        <el-form-item :prop="ip.data"
                                        :class="{'hasUnit': ip.unit}">
                            <template slot="label">
                                <el-tooltip :disabled="!ip.help"
                                            placement="top-start">
                                    <div slot="content" v-html="ip.help"></div>
                                    <a>{{ip.title}}</a>
                                </el-tooltip>
                            </template>
                            <el-input :id="'vinput_'+ip.data"
                                        type="number"
                                        size="mini"
                                        @change="TriggerEvent($event,ip.change)"
                                        v-model.number="bform.data[ip.data]"
                                        :placeholder="ip.placeholder"
                                        :disabled="ip.disabled">
                                <span slot="append"
                                        v-if="ip.unit">{{ip.unit}}</span>
                            </el-input>
                        </el-form-item>
                    </template>
                    <template v-if="ip.showType=='combo'">
                        <el-form-item :prop="ip.data">
                            <template slot="label">
                                <el-tooltip :disabled="!ip.help"
                                            placement="top-start">
                                    <div slot="content" v-html="ip.help"></div>
                                    <a>{{ip.title}}</a>
                                </el-tooltip>
                            </template>
                            <template v-if="ip.group">
                                <el-select :id="'vinput_'+ip.data"
                                           size="mini"
                                           @change="TriggerEvent($event,ip.change)"
                                           v-model="bform.data[ip.data]"
                                           :placeholder="ip.placeholder"
                                           :clearable="!ip.required"
                                           filterable
                                           :filter-method="ip.fltmethod"
                                           style="width: 100%;">
                                    <el-option-group
                                        v-for="(group, key) in ip.bindings"
                                        :key="key"
                                        :label="group.label">
                                        <el-option v-for="item in group.options"
                                                   :key="item.value"
                                                   :label="item.label"
                                                   :value="item.value">
                                        </el-option>
                                    </el-option-group>
                                </el-select>
                            </template>
                            <template v-else>
                                <el-select :id="'vinput_'+ip.data"
                                           size="mini"
                                           @change="TriggerEvent($event,ip.change)"
                                           v-model="bform.data[ip.data]"
                                           :placeholder="ip.placeholder"
                                           :clearable="!ip.required"
                                           :disabled="ip.disabled"
                                           filterable
                                           :filter-method="ip.fltmethod"
                                           :multiple="!!ip.multiple"
                                           :collapse-tags="ip.collapseTags != false"
                                           style="width: 100%;">
                                    <el-option v-for="item in ip.bindings"
                                               :key="item.Value"
                                               :label="item.Name"
                                               :value="ip.dataType=='Number'||ip.dataType=='Integer'?Number(item.Value):item.Value"></el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </template>
                    <template v-if="ip.showType=='tree'">
                        <el-form-item :prop="ip.data">
                            <template slot="label">
                                <el-tooltip :disabled="!ip.help"
                                            placement="top-start">
                                    <div slot="content" v-html="ip.help"></div>
                                    <a>{{ip.title}}</a>
                                </el-tooltip>
                            </template>
                            <el-cascader :id="'vinput_'+ip.data" size="mini" :placeholder="ip.placeholder" :disabled="ip.disabled" v-model="bform.data[ip.data]" :clearable="!ip.required" style="width: 100%;" :props="treeprop" :options="bform.gtree[ip.format]"></el-cascader>
                        </el-form-item>
                    </template>
                    <template v-if="ip.showType=='checkbox'">
                        <el-form-item :prop="ip.data">
                            <template slot="label">
                                <el-tooltip :disabled="!ip.help"
                                            placement="top-start">
                                    <div slot="content" v-html="ip.help"></div>
                                    <a>{{ip.title}}</a>
                                </el-tooltip>
                            </template>
                            <template v-if="ip.dataType=='Number'||ip.dataType=='Integer'">
                                <el-checkbox :id="'vinput_'+ip.data"
                                                :true-label=1
                                                :false-label=0
                                                @change="TriggerEvent($event,ip.change)"
                                                v-model.number="bform.data[ip.data]"></el-checkbox>
                            </template>
                            <template v-else>
                                <el-checkbox :id="'vinput_'+ip.data"
                                                v-model="bform.data[ip.data]"></el-checkbox>
                            </template>
                        </el-form-item>
                    </template>
                    <template v-if="ip.showType=='switch'">
                        <el-form-item :prop="ip.data">
                            <template slot="label">
                                <el-tooltip :disabled="!ip.help"
                                            placement="top-start">
                                    <div slot="content" v-html="ip.help"></div>
                                    <a>{{ip.title}}</a>
                                </el-tooltip>
                            </template>
                            <template v-if="ip.dataType=='Number'||ip.dataType=='Integer'">
                                <el-switch :id="'vinput_'+ip.data"
                                    v-model.number="bform.data[ip.data]"
                                    @change="TriggerEvent($event,ip.change)"
                                    :active-value=1
                                    :inactive-value=0
                                    active-text=""
                                    inactive-text="">
                                    </el-switch>
                            </template>
                            <template v-else>
                                <el-switch :id="'vinput_'+ip.data"
                                    v-model.number="bform.data[ip.data]"
                                    @change="TriggerEvent($event,ip.change)"
                                    on-text=""
                                    off-text="">
                                    </el-switch>
                            </template>
                        </el-form-item>
                    </template>
                    <template v-if="ip.showType=='datetime'">
                        <el-form-item :prop="ip.data">
                            <template slot="label">
                                <el-tooltip :disabled="!ip.help"
                                            placement="top-start">
                                    <div slot="content" v-html="ip.help"></div>
                                    <a>{{ip.title}}</a>
                                </el-tooltip>
                            </template>
                            <el-date-picker :id="'vinput_'+ip.data"
                                            :type="ip.type"
                                            :format="ip.format"
                                            :placeholder="ip.placeholder"
                                            :disabled="ip.disabled"
                                            size="mini"
                                            @change="TriggerEvent($event,ip.change)"
                                            v-model="bform.data[ip.data]"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </template>
                    <template v-if="ip.showType=='color'">
                        <el-form-item :prop="ip.data">
                            <template slot="label">
                                <el-tooltip :disabled="!ip.help"
                                            placement="top-start">
                                    <div slot="content" v-html="ip.help"></div>
                                    <a>{{ip.title}}</a>
                                </el-tooltip>
                            </template>
                            <el-color-picker :id="'vinput_'+ip.data"
                                                size="mini"
                                                @change="TriggerEvent($event,ip.change)"
                                                v-model="bform.data[ip.data]"></el-color-picker>
                        </el-form-item>
                    </template>
                    <template v-if="ip.showType=='upload'">
                        <el-form-item :prop="ip.data">
                            <template slot="label">
                                <el-tooltip :disabled="!ip.help"
                                            placement="top-start">
                                    <div slot="content" v-html="ip.help"></div>
                                    <a>{{ip.title}}</a>
                                </el-tooltip>
                            </template>
                            <uploader :ip="ip" v-model="bform.data[ip.data]"></uploader>
                        </el-form-item>
                    </template>
                </td>
            </tr>
        </table>
        <slot name="form">
        </slot>
        <!--<slot name="errors">
            <div class="errors"
                    v-if="errors.length > 0">
                <div class="content-errors"
                        role="alert">
                    <p v-for="error in errors">{{error}}</p>
                </div>
            </div>
        </slot>-->
    </el-form>
</template>
<script>
    import uploader from "./uploader"
    import ValidTypes from "./valid-types";

    export default {
        name:"HdForm",
        components: { uploader },
        props: ["form"],
        data () {
            return {errors: [],inbform:null,bform:null,fields:{},treeprop:{label:'name'}}
        },
        methods: {
            __init(_bform){
                //copy form，防止destroyed后再创建时出现脏数据
                this.bform=_bform||$.extend(true,{},this.form);
                if (this.bform) {
                    this.inbform=$.extend(true,{},this.bform);//原始留存
                    this.$set(this.bform, "gtree", this.bform.gtree || window.GTree||{});
                    this.$set(this.bform, "rules", this.bform.rules || {});
                    let inputs = this.bform.inputs;
                    const inputsAll = inputs.reduce((x,y) => [...x, ...y]);
                    var model={};
                    const colSpans = inputs.map(x => {
                        let count = 0;
                        x.forEach(ip => {
                            this.$set(this.bform.rules, ip.data, this.bform.rules[ip.data] || []);
                            this.$set(ip, "colSpan", ip.colSpan || 1);
                            count += ip.colSpan;
                            this.$set(ip, "dataType", ip.dataType || "String");
                            // this.$set(this.bform.model, ip.data, this.bform.model[ip.data]||null);
                            model[ip.data]=null;
                            if (ip.showType == "datetime") {
                                this.$set(ip, "format", ip.format || "yyyy-MM-dd");
                                let type = "date";
                                if (ip.format == "yyyy-MM") type = "month";
                                if (ip.format == "yyyy") type = "year";
                                if (ip.format.includes("yyyy-MM-dd HH:mm")) {
                                    type = "datetime";
                                }
                                this.$set(ip, "type", type);
                                if(ip.dataType=="String"){
                                    // this.$set(this.bform.model, ip.data, this.bform.model[ip.data]||"");
                                    model[ip.data]="";
                                }
                            }
                            if (ip.showType == "combo") {
                                // 选项绑定
                                let bind = this.BindRecords(ip.format,this.bform.bindings);
                                this.$set(ip, "bindings", [...bind]);
                                // 设置本地过滤方法
                                if(typeof ip.filterMethod == "function"){
                                    this.$set(ip, "fltmethod", (v) =>{
                                        ip.bindings = ip.filterMethod(
                                            {v, bind: [...bind]});
                                    });
                                }
                                if(ip.required){
                                    // 选择器必填时赋默认值
                                    // const bind =this.BindRecords(ip.format,this.bform.bindings);
                                    if (bind && bind.length) {
                                        var v=null;
                                        if (ip.group) {
                                            v=bind[0].options[0].value;
                                        } else {
                                            v=bind[0].Value;
                                        }
                                        if(ip.dataType=="Number"||ip.dataType=='Integer'){
                                            v=Number(v);
                                        }
                                        if(!!ip.multiple) v=[v];
                                        model[ip.data]=v;
                                    }
                                }else{
                                    if(ip.dataType=="Number"||ip.dataType=='Integer'){
                                        model[ip.data]=(!!ip.multiple) ? [] : null;
                                    }else{
                                        model[ip.data]=(!!ip.multiple) ? [] : "";
                                    }
                                }
                            }
                            if (ip.showType == "checkbox"||ip.showType == "switch") {
                                if(ip.required){
                                    if(ip.dataType=="Number"||ip.dataType=='Integer'){
                                        model[ip.data]=0;
                                    }else{
                                        model[ip.data]="";
                                    }
                                }
                            }
                            if (ip.showType == "tree") {
                                model[ip.data]=[];
                            }
                            // 校验规则
                            if (ip.required) {
                                let rule = { required: true, message: ip.title+`：必填`, trigger: 'blur' };
                                if (ip.showType == "datetime") {
                                    rule.type = "date";
                                    rule.trigger = "blur, change";
                                } else if (ip.dataType == "Number") {
                                    rule.type = "number";
                                }
                                if(ip.showType=="tree"){
                                    rule.type="array";
                                }
                                // 有自定义校验时，required需要放在前面才能显示红*
                                this.bform.rules[ip.data].splice(0, 0, rule);
                            }
                            if (ip.showType == "text" && ip.dataType == "Number") {
                                // this.bform.rules[ip.data].push({ type: 'number', message: ip.title+`：必须为数值`, trigger: 'blur' });
                                this.bform.rules[ip.data].push({
                                    validator: ValidTypes.Number,
                                    message: ip.title+`：必须为数值`,
                                    trigger: "blur"
                                });
                            }
                            if (ip.showType == "text" && ip.dataType == "Integer") {
                                // this.bform.rules[ip.data].push({ type: 'integer', message: ip.title+`：必须为整数`, trigger: 'blur' });
                                this.bform.rules[ip.data].push({
                                    validator: ValidTypes.Integer,
                                    message: ip.title+`：必须为整数`,
                                    trigger: "blur"
                                });
                            }
                            if (ip.showType == "text" && ip.dataType == "Email") {
                                this.bform.rules[ip.data].push({ type: 'email', message: ip.title+`：必须为邮箱地址`, trigger: 'blur' });
                            }
                            // 唯一性检验
                            if (ip.unique) {
                                let unique = { union: [] };
                                if (typeof(ip.unique) !== "boolean") {
                                    unique = { ...unique, ...ip.unique };
                                }
                                const unionInputs = inputsAll.filter(x => unique.union.includes(x.data));
                                const unionFields = unionInputs.map(x => x.data);
                                // const label = [ip, ...unionInputs].map(x => x.title).join('_');
                                // unique.message = unique.message || `${label}: 不能重复`;
                                unique.message = ip.title+`：不能重复`;
                                const rule = {
                                    trigger: 'confirm', //目前rule可选的trigger只有blur和change两种，其余只在保存时触发
                                    validator: (rule, value, callback) => {
                                        let vals = unique.union.map(x => {
                                            return { field: x, value: this.getValue(x) };// 使用非表单中的字段判断唯一性时，需事先set进表单
                                        });
                                        vals.push({field: ip.data, value: value});
                                        this.uniqueValidate(vals, (state, msg) => {
                                            if (state === true || state === undefined) {
                                                callback();
                                            } else {
                                                this.$refs.form.fields.forEach(x => {
                                                    if (unionFields.includes(x.prop)) {
                                                        x.validateState = "error";
                                                    }
                                                });
                                                callback(new Error(msg || unique.message));
                                            }
                                        });
                                    }
                                };
                                this.bform.rules[ip.data].push(rule);
                            }
                            this.$set(this.fields, ip.data, ip);
                        });
                        return count;
                    });
                    const maxSpan = Math.max(...colSpans);
                    this.$set(this.bform, "maxSpan", maxSpan);
                    this.$set(this.bform, "width", this.bform.width || `${maxSpan * 25}%`);
                    // $(this.$el).parent().parent().width($(this.$el).width())
                    // this.$set(this.bform, "data", this.bform.model);
                    this.$set(this.bform, "data", model);
                    this.$set(this.bform, "labelWidth", (this.bform.labelWidth ||90)+ "px");
                    if(this.bform.model){
                        this.Set(this.bform.model);
                    }
                }
            },
            Get(){
                var dtd = $.Deferred();
                var self = this;
                self.$refs.form.validate((valid) => {
                    if(valid){
                        var record=self.get();
                        dtd.resolve(record);
                    } else {
                        let errors = [];
                        self.$refs.form.fields.forEach(x => {
                            if (x.validateState == "error") {
                                var error=`${x.validateMessage}`;
                                // self.$notify.error({
                                //     title: x.label,
                                //     message: x.validateMessage
                                // });
                                errors.push(error);
                            }
                        });
                        self.errors = errors;
                        self.$message.error(errors[0]);
                        dtd.reject(errors);
                    }
                });
                return dtd.promise();
            },
            Set(row) {
                var self = this;
                if (typeof self.bform.beforeSet == "function") {
                    self.bform.beforeSet(self.bform.data,self);
                }
                if(row){
                    row = $.extend(true, {}, row);
                    $.each(row, function (k, v) {
                        if (self.fields[k]) {
                            var ip=self.fields[k];
                            switch (ip.showType) {
                                case "datetime":
                                    if(v){
                                        if (ip.dataType == "Number") {
                                            v = new Date(v * 1000);
                                        } else {
                                            v = ConvertToDate(v, ip.format);
                                        }
                                    }else{
                                        v=null;
                                    }
                                    break;
                                case "tree":
                                        const tree =$.extend(true,{},{data:self.bform.gtree[ip.format]}).data;
                                        $.each(tree,function(i,c){
                                            if(v==c.value){
                                                v=[v];
                                            }
                                            if(c.children){
                                                $.each(c.children,function(j,c2){
                                                    if(v==c2.value){
                                                        v=[c.value,v];
                                                    }
                                                    if(c2.children){
                                                        $.each(c2.children,function(x,c3){
                                                            if(v==c3.value){
                                                                v=[c.value,c2.value,v];
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    break;

                                case "combo":
                                    if(ip.dataType == "String" &&
                                        typeof v == "string" && !!ip.multiple){
                                        v = v ? v.split(",") : [];
                                    }
                                    break;
                            }
                        }
                        if(typeof v=="number"){
                            v=Math.round(v*1000)/1000;
                        }
                        self.$set(self.bform.data, k, v);
                    });
                }
                if (typeof self.bform.afterSet == "function") {
                    self.bform.afterSet(self.bform.data,self);
                }
                this.$nextTick(()=>{
                    this.$refs.form.clearValidate();
                });
            },
            Clear(row){
                //row:默认值
                var self = this;
                self.bform=this.inbform;
                self.__init();
                if (typeof self.bform.beforeClear == "function") {
                    self.bform.beforeClear(self.bform.data,self);
                }
                self.Set(row);
                if (typeof self.bform.afterClear == "function") {
                    self.bform.afterClear(self.bform.data,self);
                }
                this.$nextTick(()=>{
                    this.$refs.form.clearValidate();
                });
            },
            Disable(Fields){
                if(!Fields)  this.$emit("before-disable",this);
                this.setDisable(Fields,true);
                if(!Fields)  this.$emit("after-disable",this);
            },
            Enable(Fields){
                if(!Fields)  this.$emit("before-enable",this);
                this.setDisable(Fields,false);
                if(!Fields)  this.$emit("after-enable",this);
            },
            Hide(Fields){
                this.setHide(Fields,true);
            },
            Show(Fields){
                this.setHide(Fields,false);
            },
            SyncGet(){
                var self = this;
                var rst=false;
                self.$refs.form.validate((valid) => {
                    if(valid){
                        var record=self.get();
                        rst=record;
                    } else {
                        let errors = [];
                        self.$refs.form.fields.forEach(x => {
                            if (x.validateState == "error") {
                                var error=`${x.validateMessage}`;
                                errors.push(error);
                            }
                        });
                        self.errors = errors;
                        self.$message.error(errors[0]);
                    }
                });
                return rst;
            },
            //用于重绘
            Render(form){
                this.__init(form);
            },
            get() {
                var self=this;
                var record = {};
                $.each(self.bform.data, function (k, val) {
                    self.setVal(record,k,val);
                    // record[k] = val;
                    if (self.fields[k]) {
                        var ip=self.fields[k];
                        switch (ip.showType) {
                            case "datetime":
                                if(val){
                                    if (ip.dataType == "Number") {
                                        // record[ip.data] = Number.parseInt(val.getTime() / 1000);
                                        self.setVal(record,ip.data,Number.parseInt(val.getTime() / 1000));
                                    } else {
                                        // record[ip.data] = val.FormatString(ip.format);
                                        self.setVal(record,ip.data,val.FormatString(ip.format));
                                    }
                                }
                                break;
                            case "combo":
                                if(!!ip.multiple){
                                    let _v = val && !Array.isArray(val)
                                             ? [val] : (val || []);
                                    if(ip.dataType == "String"){
                                        self.setVal(record, ip.data,
                                            _v.join(","));
                                    }
                                    // else if(ip.dataType == "Number"){
                                    //     let _ = _v.map((v) => {
                                    //         return v && !isNaN(v) ||
                                    //                typeof v == "number"
                                    //                ? Number(v) : v;
                                    //     });
                                    //     self.setVal(record, ip.data, _);
                                    // }
                                    else{
                                        self.setVal(record, ip.data, _v);
                                    }
                                }
                                else if(val || typeof val == "number"){
                                    // 选择器直接取字典值，不能用v-model.number来处理
                                    if(ip.dataType == "Number"){
                                        // record[ip.data] = Number.parseInt(val);
                                        self.setVal(record, ip.data,
                                            Number.parseInt(val));
                                    }
                                    else{
                                        // record[ip.data] = String(val);
                                        self.setVal(record, ip.data,
                                            String(val));
                                    }
                                }
                                break;
                            case "tree":
                                if(val&&$.isArray(val)&&val.length>0){
                                    // record[ip.data] = val[val.length-1];
                                    self.setVal(record,ip.data,val[val.length-1]);
                                }
                                break;
                        }

                        if (!val && typeof val != "number" && ip.dataType == "Number") {
                            // showType=number可能会出现val=""!
                            // record[ip.data] = null;
                            self.setVal(record,ip.data,null);
                        }
                    }
                });
                return record;
            },
            setVal(row,field,value){
                if(field){
                    var fs=field.split(".");
                    var len=fs.length;
                    if(len==1){
                        row[field]=value;
                    }else if(len==2){
                        row[fs[0]]=row[fs[0]]||{};
                        row[fs[0]][fs[1]]=value;
                    }else if(len==3){
                        row[fs[0]]=row[fs[0]]||{};
                        row[fs[0]][fs[1]]=row[fs[0]][fs[1]]||{};
                        row[fs[0]][fs[1]][2]=value;
                    }else{
                        var ev="row";
                        $.each(fs,function(i,f){
                                ev+="['"+f+"']";
                        });
                        if(typeof value=="number"){
                            ev+="="+value;
                        }else{
                            ev+="='"+value+"'";
                        }
                        try {
                            return eval(ev);
                        } catch (e) { }
                    }
                }
            },
            setDisable(Fields,isDis){
                let self=this;
                if(Fields){
                    if(typeof Fields=='string'){
                        Fields=Fields.split(",");
                    }
                    $.each(Fields,function(i,f){
                        if(self.fields[f]){
                            self.fields[f].disabled=isDis;
                        }
                    });
                }else{
                    $.each(self.fields,function(f,v){
                        if(self.fields[f]){
                            self.fields[f].disabled=isDis;
                        }
                    });
                }
            },
            setHide(Fields,ishide){
                let self=this;
                if(Fields){
                    if(typeof Fields=='string'){
                        Fields=Fields.split(",");
                    }
                    $.each(Fields,function(i,f){
                        if(self.fields[f]){
                            self.fields[f].hide=ishide;
                        }
                    });
                }else{
                    $.each(self.fields,function(f,v){
                        if(self.fields[f]){
                            self.fields[f].hide=ishide;
                        }
                    });
                }
            },
            uniqueValidate(vals, callback) {
                this.$emit("unique-validate", this.bform.data, vals, callback);
            },
            TriggerEvent(e,cb){
                if(cb) cb(e);
            }
        },
        created () {
            this.__init();
        },
        destroyed(){
        },
        watch: {
            "bform.data":{
                handler:function(n,o){
                    var self=this;
                    self.$nextTick(function () {
                        self.$emit("on-change",n,o);
                    })
                },
                deep:true
            }
        },
        mounted(){
            if($(this.$el).parent().parent().hasClass("el-dialog")){
                if(this.bform.width){
                     $(this.$el).parent().parent().width(this.bform.width);
                }
                else{
                $(this.$el).parent().parent().width($(this.$el).width());
                }
            }
        }
    }
</script>
