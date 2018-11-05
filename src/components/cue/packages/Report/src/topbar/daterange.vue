<script>
    export default {
        props: {
            field: {type: String, default: ""},
            valueType: {type: String, default: "string"},
            pbegin: {type: String, default: ""},
            pend: {type: String, default: ""},
            max: {type: String, default: ""},
            min: {type: String, default: ""},
            option: {type:Object,default:function(){return {}}},
            event: {type:Object,default:function(){return {}}},
            domstyle: {type:Object,default:function(){return {}}},
        },
        data: function(){
            return {type: "daterange", format: "yyyy-MM-dd",begin:this.pbegin,end:this.pend};
        },
        render: function(createElement){
            let self = this;
            let format = self.option.format || "yyyy-MM-dd";
            self.format = format;
            let separator = self.option["range-separator"] || " - ";
            if(format.indexOf(separator) > -1){
                separator = " " + separator + " ";
            }
            let opt = {
                size: "mini", editable: false, "picker-options": {
                    disabledDate: function(d){
                        let min = !self.min ? true : d.FormatString(format) >= self.min;
                        let max = !self.max ? true : d.FormatString(format) <= self.max;
                        return !(min && max);
                    }
                }
            };
            let temp = self.TransValue(format);
            self.begin = temp[0];
            self.end = temp[1];
            if(!self.option.type){
                //重新计算type字段
                opt.type = "daterange";
                opt.format = format;
                if(format.indexOf("H") > -1 || format.indexOf("m") > -1 || format.indexOf("s") > -1){
                    opt.type = "datetimerange";
                }
            }
            self.option.clearable = !!self.option.clearable;
            let cls = (self.option.format || 'yyyy-MM-dd')
                .replace(' ', '')
                .replace(':', '')
                .replace(':', '');
            return createElement("div", {style: self.domstyle}, [
                createElement("el-date-picker", {
                    "class": cls,
                    props: {
                        ...self.option, ...opt, value: [self.begin, self.end]
                    },
                    on: {
                        input: function(value){
                            self.begin =value? value[0]:null;
                            self.end = value? value[1]:null;
                        },
                        change: function(value){
                            typeof (self.event || {}).change == "function"
                            && self.event.change(
                            self.FormatValue([self.begin, self.end], format));
                        }
                    }
                })
            ]);
        },
        methods: {
            TransValue: function(format){
                format=format||this.format;
                if(!this.begin || !this.end){
                    return [null, null];
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

                return [_fmt(this.begin), _fmt(this.end)];
            },
            FormatValue: function(value, format){
                if(!value){
                    return [null, null];
                }
                if(!value[0]&!value[1]) return [null, null];
                if(this.valueType == "number"){
                    return [value[0].getTime() / 1000, value[1].getTime() / 1000];
                } else{
                    return [value[0].FormatString(format), value[1].FormatString(format)];
                }
            }
        }
    }

</script>
