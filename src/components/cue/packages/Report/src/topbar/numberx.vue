<style lang="less">

</style>

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
            return { type: "number" };
        },
        render: function (createElement) {
            let self = this;
            return createElement("div", {style: self.domstyle }, [
                createElement("el-input", {
                    style: { display: "block" },
                    props: {...self.option, size: "mini", value: self.value},
                    on: {
                        input: function (value) {
                            self.value = value;
                        },
                        change: function (value) {
                            typeof (self.event || {}).change == "function"
                            && self.event.change(self.value);
                        }
                    }
                })
            ]);
        }
    }

</script>