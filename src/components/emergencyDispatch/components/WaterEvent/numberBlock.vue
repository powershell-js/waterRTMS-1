<template>
    <div class="number-block-warp">
        <div class="number-block-name">
            {{data.name}}
        </div>
        <div class="number-block-value" :style="{'color':data.color}">
           {{data.value&&data.value.toFixed(2)}}
        </div>
        <div class="number-block-unit">
            <span>正常值</span>
            <span class="blue">{{data.unit}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: Object,
    },
    data() {
        return {}
    }
}
</script>
<style lang="less" scoped>
.number-block-warp{
    display: inline-block;
    .number-block-name{
        color: #ACB3BA;
    }
    .number-block-value{
        font-size: 36px;
        line-height: 40px;
    }
    .number-block-unit{
        span{
            color: #6E7B8B;
            &.blue{
                padding-left: 5px;
                color: #5189DE;
            }
        }
    }
}
</style>
