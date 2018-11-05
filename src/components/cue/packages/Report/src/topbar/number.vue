<style lang="less">

</style>

<script>
    export default {
        props: {
            field: {
                type: String,
                default: ""
            },
            pvalue: {
                type: String,
                default: ""
            },
            option: {type:Object,default:function(){return {}}},
            event: {type:Object,default:function(){return {}}},
            domstyle: {type:Object,default:function(){return {}}},
        },
        data: function(){
            return {type: "number",value:this.pvalue};
        },
        render: function(createElement){
            let self = this;
            self.value = $.isNumeric(self.value) ? Number(self.value) : null;
            return createElement("div", {style: self.domstyle}, [
                createElement("el-input", {
                    style: {display: "block"},
                    props: {
                        ...self.option, size: "mini", type: "number",
                        value: self.value
                    },
                    on: {
                        input: function(value){
                            value = $.isNumeric(value) ? Number(value) : null;
                            self.value = value;
                        },
                        change: function(value){
                            typeof (self.event || {}).change == "function"
                            && self.event.change(self.value);
                        }
                    }
                })
            ]);
        }
    }

</script>