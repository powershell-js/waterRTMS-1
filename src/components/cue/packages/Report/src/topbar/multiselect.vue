<script>
    export default {
        props: {
            field: { type: String, default: "" },
            value: { type: Array, default: [] },
            valueField: { type: String, default: "value" },
            labelField: { type: String, default: "name" },
            data: { type: Array, default: [] },
            option: {type:Object,default:function(){return {}}},
            event: {type:Object,default:function(){return {}}},
            domstyle: {type:Object,default:function(){return {}}},
        },
        data: function () {
            return { type: "multiselect", text: "请选择" };
        },
        render: function (createElement) {
            let self = this;
            return createElement("div", { style: self.domstyle }, [
                createElement("el-select", {
                    ref: "select",
                    props: {size: "mini", ...self.option, multiple: true, value: self.value},
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
                            self.$refs.select.selectedLabel = self.text;
                        }
                    }
                }, self.data.map(function(r){
                    return createElement("el-option", {
                        props: {
                            value: r[self.valueField], label: r[self.labelField]
                        }
//                        nativeOn: {
//                            click: function(event){
//                                self.text = self.getText();
//                                self.$refs.select.selectedLabel = self.text;
//                            }
//                        }
                    });
                }))
            ]);
        },
        methods: {
            getText() {
                let text;
                switch(this.value.length) {
                    case 0:
                        text = "请选择";
                        break;
                    case 1:
                        let selected = this.data.filter(x => x.value === this.value[0]);
                        text = selected[0].name;
                        break;
                    case this.data.length:
                        text = `全部(${this.data.length})`;
                        break;
                    default:
                        text = `${this.value.length}个已选中`;
                }
                return text;
            }
        },
        watch: {
            value() {
                this.$refs.select.selectedLabel = this.text = this.getText();
            }
        },
        mounted: function(){
            // 没找到修改输入框text的方法，直接给selectedLabel赋了值
            this.$refs.select.selectedLabel = this.text = this.getText();
        }
    }

</script>