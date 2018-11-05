<style lang="less">

</style>

<script>
    export default {
        props: {
            field: {
                type: String,
                default: ""
            },
            separator: {
                type: String,
                default: "-"
            },
            min: {
                type: String,
                default: ""
            },
            max: {
                type: String,
                default: ""
            },
            option: {type:Object,default:function(){return {}}},
            event: {type:Object,default:function(){return {}}},
            domstyle: {type:Object,default:function(){return {}}},
        },
        data: function(){
            return {type: "numberrange"};
        },
        render: function(createElement){
            let self = this;
            self.min = $.isNumeric(self.min) ? Number(self.min) : null;
            self.max = $.isNumeric(self.max) ? Number(self.max) : null;
            return createElement("div", {style: self.domstyle}, [
                createElement("el-input", {
                    style: {width: "auto", display: "inline-block"},
                    props: {
                        ...self.option, size: "mini", type: "number",
                        value: self.min
                    },
                    on: {
                        input: function(value){
                            value = $.isNumeric(value) ? Number(value) : null;
                            self.min = value;
                        }
                    }
                }),
                createElement("span", {
                    style: {padding: "0 3px", "white-space": "nowrap"},
                    domProps: {innerHTML: self.separator}
                }),
                createElement("el-input", {
                    style: {width: "auto", display: "inline-block"},
                    props: {
                        ...self.option, size: "mini", type: "number",
                        value: self.max
                    },
                    on: {
                        input: function(value){
                            value = $.isNumeric(value) ? Number(value) : null;
                            self.max = value;
                        }
                    }
                })
            ]);
        },
        mounted: function(){
            let $cnt = $(this.$el);
            let width = $cnt.width() / 2;
            $cnt.children("div.el-input").width(width);
            $cnt.css("width", "auto");
        }
    }

</script>