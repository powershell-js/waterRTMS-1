<template>
    <div class="demo-chart">
        <h1>HdHeader 头部</h1>
        <hd-header headerHeight="50px" headerBackground="red">
            <div slot="right">
                右插槽
            </div>
        </hd-header>
        <h2>HdHeader Attribute</h2>
        <attr-table :data="attrs"></attr-table>
    </div>
</template>
<script>
import AttrTable from "../components/AttrTable.vue";
import EventTable from "../components/EventTable.vue";
export default {
    data() {
        return {
            
            attrs: [
                {
                    field: "options",
                    title: "图表配置",
                    type: "Object",
                    def: "-"
                },
                {
                    field: "type",
                    title: "图表类型",
                    type: "String",
                    source: "echart,highchart,highstock",
                    def: "echart"
                }
            ]
        };
    },
    methods: {},
    mounted() {},
    components: {
        AttrTable,
        EventTable
    }
};
</script>
