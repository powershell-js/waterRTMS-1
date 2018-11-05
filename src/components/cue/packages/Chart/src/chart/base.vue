<template>
    <div class="hd-chart-box">
        <div class="hd-chart">
        </div>
    </div>
</template>
<script>
    import {
        addResizeListener,
        removeResizeListener
    } from "element-ui/lib/utils/resize-event";

    export default {
        name: 'HdIcon',
        props: {
            options: Object,
            theme: [String, Object],
            group: String,
            autoResize: Boolean
        },
        data(){
            return {
                chart: null
            };
        },
        methods: {
            resize(){
            },
            init(){
            }
        },
        mounted(){
            // 添加resize监视
            if(this.autoResize){
                addResizeListener(this.$el, this.resize);
            }
            this.init();
        },
        beforeDestroy(){
            // 移除resize监视
            if(this.autoResize){
                removeResizeListener(this.$el, this.resize);
            }
        }
    };
</script>
