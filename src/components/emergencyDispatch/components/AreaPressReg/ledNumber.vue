<template>
    <div class="led-number-warp">
        <div class="segment" v-for="i in 7" :key="i" :class="{'active':digitSegments[num].indexOf(i)>=0}"></div>
    </div>
</template>
<script>
export default {
    props: {
        num: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            digitSegments: [
                [1,2,3,4,5,6],
                [2,3],
                [1,2,7,5,4],
                [1,2,7,3,4],
                [6,7,2,3],
                [1,6,7,3,4],
                [1,6,5,4,3,7],
                [1,2,3], 
                [1,2,3,4,5,6,7],
                [1,2,7,3,6]
            ]
        }
    }
}
</script>
<style lang="less" scoped>
@size: 4px;
.led-number-warp{
    position:relative;
    width:24px;
    height:40px;
    display: inline-block;
    margin: 0 3px;
    .segment{
        background:rgba(0,0,0,0);
        border-radius:5px;
        position:absolute;
        &.active{
            background:#00CCFF;
        }
        &:nth-child(1){
            top:0;
            left:5px;
            right:5px;
            height:@size;
        }
        &:nth-child(2) {
            top:4px;
            right:0;
            width:@size;
            height:calc(~"50% - 5px");
        }
        &:nth-child(3) {
            bottom:4px;
            right:0;
            width:@size;
            height:calc(~"50% - 5px");
        }
        &:nth-child(4) {
            bottom:0;
            right:5px;
            height:@size;
            left:5px;
        }
        &:nth-child(5) {
            bottom:4px;
            left:0;
            width:@size;
            height:calc(~"50% - 5px");
        }
        &:nth-child(6) {
            top:4px;
            left:0;
            width:@size;
            height:calc(~"50% - 5px");
        }
        &:nth-child(7) {
            bottom:95px;
            bottom:calc(~"50% - 2px");
            right:5px;
            left:5px;
            height:@size;
        }
    }
}
</style>
