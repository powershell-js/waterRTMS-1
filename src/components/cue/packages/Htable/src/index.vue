<template>
    <div :id="this.root"></div>
</template>

<script>
    import {
        hotDestroy,
        hotInit,
        hotRender,
        propFactory,
        propWatchFactory,
        updateBulkHotSettings,
        updateHotSettings,
        renderCurrentRow
    } from './helpers';

    import {
        addResizeListener,
        removeResizeListener
    } from "element-ui/lib/utils/resize-event";

    require("handsontable-pro/dist/handsontable.full.css");
    export default {
        name: 'HdHtable',
        props: propFactory(),
        watch: propWatchFactory(updateHotSettings, updateBulkHotSettings),
        mounted: function(){
            hotInit(this);
            addResizeListener(this.$el, this.render);
        },
        methods: {
            render(){
                hotRender(this);
            },
            setCurrentRow(v){
                if(!this.table || v < 0){
                    return;
                }
                let max = this.table.countRows();
                if(v >= max){
                    return;
                }
                this.table._options.currentRow = v;
                let index = v - this.table.rowOffset();
                renderCurrentRow(this.table, index);
            }
        },
        beforeDestroy: function(){
            removeResizeListener(this.$el, this.render);
            return hotDestroy(this);
        }
    };
</script>

<!--<style lang="less">
    div.handsontable table.htCore > tbody > tr:first-child > td {
        border-top: 0;
    }
    div.handsontable.ht_clone_top_left_corner table.htCore {
        border-left: 1px solid #ddd;
        > thead > tr > th {
            border-left: 0;
        }
    }
    div.handsontable.ht_clone_left table.htCore {
        border-left: 1px solid #ddd;
        > thead > tr > th {
            border-left: 0;
        }
        > tbody > tr > td {
            border-left: 0;
        }
    }
    div.handsontable table.htCore > thead > tr {
        th {
            &.rowspan {
                border-bottom-color: #f1f1f1;
            }
            &.hiddenHeaderRow {
                border-bottom-color: #f1f1f1;
                > * {
                    display: none;
                }
            }
        }
        &:last-child > th.hiddenHeaderRow{
            border-bottom-color: #ddd;
        }
    }
</style>-->

