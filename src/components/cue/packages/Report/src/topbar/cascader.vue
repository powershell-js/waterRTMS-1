<script>
    export default {
        props: {
            field: { type: String, default: "" },
            value: { type: String, default: "" },
            valueField: { type: String, default: "value" },
            labelField: { type: String, default: "name" },
            childrenField: { type: String, default: "children" },
            data: { type: Array, default: [] },
            option: {type:Object,default:function(){return {}}},
            event: {type:Object,default:function(){return {}}},
            domstyle: {type:Object,default:function(){return {}}},
        },
        data: function () {
            return { type: "cascader" };
        },
        render: function (createElement) {
            let self = this
            return createElement("div", { style: self.domstyle }, [
                createElement("el-cascader", {
                    props: $.extend(self.option, { size: "mini",options:self.data,props:{label:self.labelField,value:self.valueField,children:self.childrenField} }),
                    domProps: { value: self.value },
                    on: {
                        input: function (value) {
                            self.value=value;
                        },
                        change: function (value) {
                            typeof (self.event || {}).change == "function" && self.event.change(value);
                        },
                        "active-item-change": function (arr) {
                            typeof (self.event || {})["active-item-change"] == "function" && self.event["active-item-change"](arr);
                        }
                    }
                })
            ]);
        }
    }

</script>