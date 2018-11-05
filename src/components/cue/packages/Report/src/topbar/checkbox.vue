<script>
    export default {
        props: {
            field: {
                type: String,
                default: ""
            },
            value: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: ""
            },
            option: {type:Object,default:function(){return {}}},
            event: {type:Object,default:function(){return {}}},
            domstyle: {type:Object,default:function(){return {}}},
        },
        data: function () {
            return { type: "checkbox" };
        },
        render: function (createElement) {
            let self = this;
            return createElement("div", { style: self.domstyle }, [
                createElement("el-checkbox", {
                    props: {...self.option, value: self.value},
                    on: {
                        input: function(value){
                            self.value = value;
                        },
                        change: function(event){
                            typeof (self.event || {}).change == "function" &&
                            self.event.change(event);
                        }
                    }

                },self.label)
            ]);
        }
    }

</script>