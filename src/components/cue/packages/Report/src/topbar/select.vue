<script>
    export default {
        props: {
            field: { type: String, default: "" },
            pvalue: { type: String, default: "" },
            valueField: { type: String, default: "value" },
            labelField: { type: String, default: "name" },
            data: { type: Array,default:function(){return []}},
            option: {type:Object,default:function(){return {}}},
            event: {type:Object,default:function(){return {}}},
            domstyle: {type:Object,default:function(){return {}}},
        },
        data: function () {
            return { type: "select",value:this.pvalue };
        },
        render: function (createElement) {
            let self = this;
            return createElement("div", { style: self.domstyle }, [
                createElement("el-select", {
                    props: {...self.option, size: "mini", value: self.value},
                    on: {
                        input: function (value) {
                            self.value = value;
                        },
                        change: function(value){
                            typeof (self.event || {}).change == "function"
                            && self.event.change(self.value);
                        },
                        "visible-change": function(visable){
                            typeof (self.event || {})["visible-change"] == "function"
                            && self.event["visible-change"](visable);
                        }
                    }
                }, self.data.map(function(r){
                    if(r.children){
                        return createElement("el-option-group", {
                            props: {
                                key: r[self.labelField],
                                label: r[self.labelField]
                            }
                        }, r.children.map((c) =>{
                            return createElement("el-option", {
                                props: {
                                    key: c[self.valueField],
                                    value: c[self.valueField],
                                    label: c[self.labelField]
                                }
                            });
                        }));
                    }
                    else{
                        return createElement("el-option", {
                            props: {
                                key: r[self.valueField],
                                value: r[self.valueField],
                                label: r[self.labelField]
                            }
                        });
                    }
                }))
            ]);
        },
        watch:{
            pvalue:function(v){
                this.value=v;
            }
        }
    }

</script>