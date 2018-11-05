<template>
    <div class="step-warp">
        <div v-for="(step, i) in steps" :key="step.key" class="step-item" :style="{'width':100/steps.length+'%','z-index':100-i}"
            :class="{'active': i==index}"
            @click="stetClick(i,step)">
            <span>{{'0'+(1+i)}}&nbsp;{{step.name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        steps: {
            type: Array,
            default: function(){
                return [{name:'第一步'},{name:'第二步'},{name:'第三步'}]
            }
        }
    },
    data() {
        return {
            index: 0
        }
    },
    methods: {
        stetClick(index,step) {
            this.index = index
            step.onClick && step.onClick(step.key)
        }
    }
}
</script>
<style lang="less" scoped>
.step-warp{
    // width: 100%;
    .step-item{
        display: inline-block;
        border: 1px solid #D1D1DA;
        border-width: 1px 1px 1px 0; 
        box-sizing: border-box;
        line-height: 28px;
        cursor: pointer;
        text-align: center;
        position: relative;
        &:after{
            position: absolute;
            content: '';
            width: 20px;
            height: 20px;
            top: 3px;
            left: calc(~"100% - 9px");
            display: inline-block;
            border-top: 1px solid #D1D1DA;
            border-right: 1px solid #D1D1DA;
            background-color: #fff;
            transform: rotate(45deg)
        }
        &.active{
            background-color: #C2E086;
            &:after{
                background-color: #C2E086;
            }
        }
        &:last-of-type{
            &:after{
                display: none;
            }
        }
    }
}
</style>
