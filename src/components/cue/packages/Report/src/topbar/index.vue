<!--<style lang="less" rel="stylesheet/less">
    div.hd-topbar {
        overflow: hidden;
        line-height: 30px;
        font-size: 12px;
        box-sizing: border-box;
        > div.hd-topbar-item {
            height: 100%;
            float: left;
            display: block;
            margin-left: 4px;
            white-space: nowrap;
            > label.hd-topbar-label {
                display: inline-block;
                padding-right: 5px;
            }
            > div.hd-topbar-box {
                display: inline-block;
                height: 26px;
                line-height: 26px;
                input.el-input__inner {
                    height: 26px;
                    line-height: 24px;
                    border-radius: 2px;
                    padding: 0 5px;
                    color: #000;
                    border-color: #CBD5DD;
                    &::-webkit-input-placeholder {
                        color: #999;
                    }
                    &::-moz-placeholder { /* Mozilla Firefox 19+ */
                        color: #999;
                    }
                    &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                        color: #999;
                    }
                    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                        color: #999;
                    }
                }
                /* 后图标 */
                .el-input.el-input--suffix {
                    .el-input__inner {
                        padding-right: 25px;
                    }
                    .el-input__suffix {
                        right: 0;
                    }
                }
                /* 前图标 */
                .el-input.el-input--prefix {
                    .el-input__inner {
                        padding-left: 25px;
                    }
                    .el-input__prefix {
                        left: 0;
                    }
                }
                /* 复选框 */
                label.el-checkbox {
                    > span.el-checkbox__input {
                        margin: 0 5px;
                    }
                    > span.el-checkbox__label {
                        font-size: 12px;
                        margin: 0;
                        padding: 0;
                    }
                    .el-checkbox__input.is-checked + .el-checkbox__label {
                        color: inherit;
                    }
                }
                .el-date-editor.el-input {
                    width: 100%;
                }
                /* 日期时间范围 */
                div.el-range-editor.el-input__inner {
                    height: 26px;
                    line-height: 26px;
                    border-radius: 2px;
                    padding: 0 5px;
                    color: #000;
                    border-color: #CBD5DD;
                    width: 100%;
                    position: relative;
                    > i.el-input__icon {
                        position: absolute;
                        line-height: 24px;
                        font-size: 12px;
                        width: 0;
                        margin: 0;
                    }
                    /* 图标 */
                    &.el-input--prefix {
                        padding-left: 25px;
                        > i.el-input__icon.el-range__icon {
                            width: 25px;
                            left: 0;
                        }
                    }
                    /* 清空按钮 */
                    &.el-input--suffix {
                        padding-right: 25px;
                        > i.el-input__icon.el-range__close-icon {
                            width: 25px;
                            right: 0;
                        }
                    }
                    > input.el-range-input {
                        color: #000;
                    }
                }
                /* 日期时间 */
                div.el-date-editor.el-input {
                    > .el-input__inner {
                        padding-right: 5px;
                    }
                    &.date-clearable {
                        > .el-input__inner {
                            padding-right: 25px;
                        }
                    }
                }
                /* 日期输入框大小 */
                &.yyyy-MM-dd {
                    input.el-range-input {
                        width: 70px;
                    }
                    input.el-input__inner {
                        box-sizing: content-box;
                        width: 70px;
                        height: 24px;
                    }
                }
                /* 日期时间输入框大小 */
                &.yyyy-MM-ddHHmmss {
                    input.el-range-input {
                        width: 123px;
                    }
                    input.el-input__inner {
                        box-sizing: content-box;
                        width: 123px;
                        height: 24px;
                    }
                }
            }
        }
    }
    div.hd-topbar-select-dropdown {
        margin: 5px 0 !important;
        ul.el-select-group__wrap {
            li.el-select-group__title {
                height: 24px;
                line-height: 24px;
                padding: 0 5px;
                font-size: 12px;
            }
            li.el-select-dropdown__item {
                padding-left: 15px;
            }
        }
        li.el-select-dropdown__item {
            height: 24px;
            line-height: 24px;
            padding: 0 5px;
            font-size: 12px;
        }
    }
</style>-->

<script>
    import hdInput from './input'
    import hdNumber from './number'
    import hdNumberRange from './numberrange'
    import hdNumberx from './numberx'
    import hdSelect from './select'
    import hdMultiSelect from './multiselect'
    import hdDate from './date'
    import hdDateRange from './daterange'
    import hdCheckbox from './checkbox'
    import hdRadio from './radio'

    export default {
        props: {
            config: {
                type: Array,
                default: []
            }
        },
        data: function(){
            return {}
        },
        render: function(createElement){
            let self = this

            function createLabel(opts){
                if(!opts.label){
                    return null
                }
                return createElement('label', {
                    class: 'hd-topbar-label',
                    domProps: {innerHTML: opts.label}
                })
            }

            const ItemFactory = {
                /*
                     type: "input", value: "默认值", label: "标签", field: "属性名",
                     option: {element input 组件属性},
                     event: {change, blur, focus}, style: {样式}
                     */
                input: function(opts){
                    return createElement(
                        'div',
                        {class: 'hd-topbar-item', attrs: {name: opts.field}},
                        [
                            createLabel(opts),
                            createElement('hd-input', {
                                class: 'hd-topbar-box',
                                props: {
                                    field: opts.field,
                                    value: opts.value,
                                    domstyle: opts.style,
                                    option: opts.option,
                                    event: opts.event || {}
                                }
                            })
                        ]
                    )
                },
                /*
                     type: "number", value: "默认值", label: "标签", field: "属性名",
                     option: {element input 组件属性},
                     event: {change, blur, focus}, style: {样式}
                     */
                number: function(opts){
                    return createElement(
                        'div',
                        {class: 'hd-topbar-item', attrs: {name: opts.field}},
                        [
                            createLabel(opts),
                            createElement('hd-number', {
                                class: 'hd-topbar-box',
                                props: {
                                    field: opts.field,
                                    pvalue: opts.value,
                                    domstyle: opts.style,
                                    option: opts.option,
                                    event: opts.event || {}
                                }
                            })
                        ]
                    )
                },
                /*
                     type: "numberrange", min: "最小默认值",max: "最大默认值" label: "标签", field: "属性名",
                     separator: "分隔",
                     option: {element input 组件属性},
                     style: {样式}
                     */
                numberrange: function(opts){
                    return createElement(
                        'div',
                        {class: 'hd-topbar-item', attrs: {name: opts.field}},
                        [
                            createLabel(opts),
                            createElement('hd-numberrange', {
                                class: 'hd-topbar-box',
                                props: {
                                    field: opts.field,
                                    value: opts.value,
                                    separator: opts.separator || '-',
                                    domstyle: opts.style,
                                    option: opts.option,
                                    min: opts.min,
                                    max: opts.max,
                                    event: opts.event || {}
                                }
                            })
                        ]
                    )
                },
                /*
                     type: "numberx", value: "默认值", label: "标签", field: "属性名",
                     option: {element inputNumber 组件属性},
                     event: {change}, style: {样式}
                     */
                numberx: function(opts){
                    return createElement(
                        'div',
                        {class: 'hd-topbar-item', attrs: {name: opts.field}},
                        [
                            createLabel(opts),
                            createElement('hd-numberx', {
                                class: 'hd-topbar-box',
                                props: {
                                    field: opts.field,
                                    value: opts.value,
                                    domstyle: opts.style,
                                    option: opts.option,
                                    event: opts.event || {}
                                }
                            })
                        ]
                    )
                },
                /*
                     type: "select", value: "默认值", label: "标签", field: "属性名",
                     data: "[选项]", valueField: "值属性", labelField: "文本属性",
                     option: {element inputNumber 组件属性},
                     event: {change}, style: {样式}
                     */
                select: function(opts){
                    return createElement(
                        'div',
                        {class: 'hd-topbar-item', attrs: {name: opts.field}},
                        [
                            createLabel(opts),
                            createElement('hd-select', {
                                class: 'hd-topbar-box',
                                props: {
                                    field: opts.field,
                                    pvalue: opts.value,
                                    domstyle: opts.style,
                                    data: opts.data,
                                    valueField: opts.valueField || 'value',
                                    labelField: opts.labelField || 'name',
                                    option: $.extend(opts.option, {
                                        'popper-class': 'hd-topbar-select-dropdown'
                                    }),
                                    event: opts.event || {}
                                }
                            })
                        ]
                    )
                },
                /*
                     type: "multiselect", value: "默认值", label: "标签", field: "属性名",
                     data: "[选项]", valueField: "值属性", labelField: "文本属性",
                     option: {element inputNumber 组件属性},
                     event: {change}, style: {样式}
                     */
                multiselect: function(opts){
                    return createElement(
                        'div',
                        {class: 'hd-topbar-item', attrs: {name: opts.field}},
                        [
                            createLabel(opts),
                            createElement('hd-multiselect', {
                                class: 'hd-topbar-box',
                                props: {
                                    field: opts.field,
                                    value: opts.value,
                                    domstyle: opts.style,
                                    data: opts.data,
                                    valueField: opts.valueField || 'value',
                                    labelField: opts.labelField || 'name',
                                    option: $.extend(opts.option, {
                                        'popper-class': 'hd-topbar-select-dropdown'
                                    }),
                                    event: opts.event || {}
                                }
                            })
                        ]
                    )
                },
                /*
                     type: "date", value: "默认值", label: "标签", field: "属性名",
                     valueType: "数据类型string,number", min: "最小时间", min: "最大日期",
                     option: {element inputNumber 组件属性},
                     event: {change}, style: {样式}
                     */
                date: function(opts){
                    return createElement(
                        'div',
                        {class: 'hd-topbar-item', attrs: {name: opts.field}},
                        [
                            createLabel(opts),
                            createElement('hd-date', {
                                class: 'hd-topbar-box',
                                props: {
                                    field: opts.field,
                                    pvalue: opts.value,
                                    min: opts.min,
                                    max: opts.max,
                                    valueType: opts.valueType || 'string',
                                    domstyle: opts.style,
                                    option: $.extend(opts.option, {
                                        'popper-class': 'hd-topbar-select-dropdown'
                                    }),
                                    event: opts.event || {}
                                }
                            })
                        ]
                    )
                },
                /*
                     type: "daterange", begin: "默认起始", end: "默认截止", label: "标签", field: "属性名",
                     valueType: "数据类型string,number", min: "最小时间", min: "最大日期",
                     option: {element inputNumber 组件属性},
                     event: {change}, style: {样式}
                     */
                daterange: function(opts){
                    return createElement(
                        'div',
                        {class: 'hd-topbar-item', attrs: {name: opts.field}},
                        [
                            createLabel(opts),
                            createElement('hd-daterange', {
                                class: 'hd-topbar-box',
                                props: {
                                    field: opts.field,
                                    pbegin: opts.begin,
                                    pend: opts.end,
                                    min: opts.min,
                                    max: opts.max,
                                    valueType: opts.valueType || 'string',
                                    domstyle: opts.style,
                                    option: $.extend(opts.option, {
                                        'popper-class': 'hd-topbar-select-dropdown'
                                    }),
                                    event: opts.event || {}
                                }
                            })
                        ]
                    )
                },
                /*
                     type: "checkbox", value: "默认状态", field: "属性名",label: "标签",
                     option: {element inputNumber 组件属性},
                     event: {change}, style: {样式}
                     */
                checkbox: function(opts){
                    return createElement(
                        'div',
                        {class: 'hd-topbar-item', attrs: {name: opts.field}},
                        [
                            createElement('hd-checkbox', {
                                class: 'hd-topbar-box',
                                props: {
                                    field: opts.field,
                                    value: opts.value,
                                    label: opts.label,
                                    domstyle: opts.style,
                                    option: opts.option,
                                    event: opts.event || {}
                                }
                            })
                        ]
                    )
                },
                /*
                     type: "radio", value: "默认值", field: "属性名","labels:"标签值"，"names":名称
                     event: {change}, style: {样式}
                     */
                radio: function(opts){
                    return createElement(
                        'div',
                        {class: 'hd-topbar-item', attrs: {name: opts.field}},
                        [
                            createElement('hd-radio', {
                                class: 'hd-topbar-box',
                                props: {
                                    field: opts.field,
                                    value: opts.value,
                                    labels: opts.labels,
                                    names: opts.names,
                                    domstyle: opts.style,
                                    event: opts.event || {}
                                }
                            })
                        ]
                    )
                }
            }
            return createElement(
                'div',
                {class: 'hd-topbar'},
                this.config.map(function(c){
                    return c.type in ItemFactory ? ItemFactory[c.type](c) : null
                })
            )
        },
        components: {
            'hd-input': hdInput,
            'hd-number': hdNumber,
            'hd-numberrange': hdNumberRange,
            'hd-numberx': hdNumberx,
            'hd-select': hdSelect,
            'hd-multiselect': hdMultiSelect,
            'hd-date': hdDate,
            'hd-daterange': hdDateRange,
            'hd-checkbox': hdCheckbox,
            'hd-radio': hdRadio
        },
        methods: {
            GetValues: function(){
                let result = {}
                for(let i = 0; i < this.$children.length; i++){
                    let c = this.$children[i]
                    var r = this.GetValue(c.field, c)
                    if(typeof r == 'object'){
                        if($.isArray(r)){
                            result[c.field] = r
                        }
                        else{
                            $.each(r, function(k, v){
                                result[k] = v
                            })
                        }
                    }
                    else{
                        result[c.field] = r
                    }
                }
                return result
            },
            GetValue: function(field, c){
                if(!c){
                    for(let i = 0; i < this.$children.length; i++){
                        if(this.$children[i].field == field){
                            c = this.$children[i]
                            break
                        }
                    }
                }
                var result = null
                if(!c.field || !c.type){
                    return result
                }
                result = {}
                if(c.type == 'date'){
                    result[c.field] = c.FormatValue(c.value, c.format)
                }
                else if(c.type == 'daterange'){
                    let temp = c.FormatValue([c.begin, c.end], c.format)
                    result[c.field + 'Begin'] = temp[0]
                    result[c.field + 'End'] = temp[1]
                }
                else if(c.type == 'numberrange'){
                    result[c.field + 'Min'] = c.min
                    result[c.field + 'Max'] = c.max
                }
                else{
                    result = c.value
                }
                return result
            },
            SetValue: function(data){
                for(let i = 0; i < this.$children.length; i++){
                    let c = this.$children[i]
                    if(!c.field || !c.type){
                        continue
                    }
                    if(c.field in data){
                        // c.$children[0].value=data[c.field];
                        if(c.type == 'daterange'){
                            c.begin = data[c.field].begin
                            c.end = data[c.field].end
                        }
                        else if(c.type == 'numberrange'){
                            c.min = data[c.field].min
                            c.max = data[c.field].max
                        }
                        else{
                            c.value = data[c.field]
                        }
                    }
                }
            }
        }
    }
</script>
