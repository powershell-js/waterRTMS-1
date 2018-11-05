<script>
    export default {
        props: {
            field: {
                type: String,
                default: ""
            },
            value: {
                type: String,
                default: ""
            },
            option: {type:Object,default:function(){return {}}},
            event: {type:Object,default:function(){return {}}},
            domstyle: {type:Object,default:function(){return {}}},
        },
        data: function () {
            return { type: "input" };
        },
        render: function (createElement) {
            let self = this;
            return createElement("div", { style: self.domstyle }, [
                createElement("el-input", {
                    attrs: {placeholder: self.option.placeholder || ""},
                    props: {...self.option, size: "mini", value: self.value},
                    on: {
                        input: function(value){
                            self.value = value;
                        },
                        change: function(value){
                            typeof (self.event || {}).change == "function" &&
                            self.event.change(self.value);
                        },
                        blur: function(event){
                            typeof (self.event || {}).blur == "function" &&
                            self.event.blur(event);
                        },
                        focus: function(event){
                            typeof (self.event || {}).focus == "function"
                            && self.event.focus(event);
                        }
                    }
                })
            ]);
        }
    }

</script>
