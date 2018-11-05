<template>
    <component ref="hdchart" v-bind:is="type" :options="options" :theme="theme" :group="group" :autoResize="autoResize">
    </component>
</template>
<script>
// const echart=() => import('./echart')
// const highchart=() => import('./highchart')
// const highstock=() => import('./highstock')
import echart from "./echart"
import highchart from "./highchart"
import highstock from "./highstock"
export default {
    name: 'HdChart',
    props: {
        options: Object,
        theme: [String, Object],
        group: String,
        autoResize: Boolean,
        type:{
            type:String,
            default:function(){
                return "echart"
            }
        }
    },
    components: {
        echart,highchart,highstock
    },
    methods:{
        exports(){
            this.$refs.hdchart.exports();
        }
    }
};
</script>
