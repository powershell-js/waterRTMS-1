<script>
    export default {
        props: {
            field: {type: String, default: ""},
            pvalue: {type: String, default: ""},
            valueType: {type: String, defalut: "string"},
            max: {type: String, default: ""},
            min: {type: String, default: ""},
            option: {type:Object,default:function(){return {}}},
            event: {type:Object,default:function(){return {}}},
            domstyle: {type:Object,default:function(){return {}}},
        },
        data: function(){
            return {type: "date", format: "yyyy-MM-dd",value:this.pvalue};
        },
        render: function(createElement){
            let self = this;
            let format = self.option.format || "yyyy-MM-dd";
            self.format = format;
            let opt = {
                size: "mini", editable: false, "picker-options": {
                    disabledDate: function(d){
                        let min = !self.min ? true : d.FormatString(format) >= self.min;
                        let max = !self.max ? true : d.FormatString(format) <= self.max;
                        return !(min && max);
                    }
                }
            };
            if(!self.option.type){
                //重新计算type字段
                opt.type = "date";
                opt.format = format;
                if(format.indexOf("H") > -1 || format.indexOf("m") > -1 || format.indexOf("s") > -1){
                    opt.type = "datetime";
                } else if(format.indexOf("d") == -1 && format.indexOf("M") > -1){
                    opt.type = "month";
                } else if(format.indexOf("M") == -1){
                    opt.type = "year"
                }
            }
            self.option.clearable = !!self.option.clearable;
            self.value = self.TransValue(format);
            let cls = (self.option.format || 'yyyy-MM-dd')
                .replace(' ', '')
                .replace(':', '')
                .replace(':', '');
            return createElement("div", {style: self.domstyle}, [
                createElement("el-date-picker", {
                    "class": cls,
                    props: {...self.option, ...opt, value: self.value},
                    on: {
                        input: function(value){
                            self.value = value;
                        },
                        change: function(value){
                            typeof (self.event || {}).change == "function"
                            && self.event.change(
                            self.FormatValue(self.value, format));
                        }
                    }
                })
            ]);
        },
        methods: {
            TransValue: function(format){
                if(!this.value){
                    return null;
                }
                function _fmt(v){
                    switch(typeof v){
                        case "number":
                            return new Date(v * 1000);
                        case "string":
                            return ConvertToDate(v, format);
                        default:
                            return v;
                    }
                }

                return _fmt(this.value);
            },
            FormatValue: function(value, format){
                if(!value){
                    return null;
                }
                if(this.valueType.toLowerCase() == "number"){
                    return value.getTime() / 1000;
                } else{
                    return value.FormatString(format);
                }
            }
        }
    }

</script>
