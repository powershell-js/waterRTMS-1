<template>
    <div class="panel-title-warp" 
        :style="{'line-height': lineHeight+'px',
                 'border-left':`${colorShow?3:0}px solid ${color}`,
                 'padding-left':`${colorShow?10:13}px`,
                 'padding-right':'10px',
                 'border-bottom':`${borderShow?1:0}px solid #D1D1DA`}">
        <el-row>
            <el-col :span="12">
                <h3 :style="{'font-size':fontSize+'px'}">{{title}}</h3>
            </el-col>
            <el-col :span="12">
                <div class="panel-title-opt">
                    <slot></slot>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '标题'
        },
        lineHeight: {
            type: Number,
            default: 40
        },
        color: {
            type: String,
            default: '#70991F'
        },
        colorShow: {
            type: Boolean,
            default: true
        },
        fontSize: {
            type: Number,
            default: 14
        },
        borderShow: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>
.panel-title-warp{
    h3{
        color: #6E7B8B;
    }
    .panel-title-opt{
        text-align: right;
    }
}
</style>
