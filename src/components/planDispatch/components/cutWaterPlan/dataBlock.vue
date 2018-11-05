<template>
    <div class="data-block">
        <div class="data-block-text-top">
            {{data.textTop}}
        </div>
        <div class="data-block-value" :style="{'color':data.color||'#333'}" :class="data.value>0?'green':'red'">
            {{Math.abs(data.value)}}
        </div>
        <div class="data-block-text-bottom">
            {{data.textBottom}}
            <i class="hd-icon pos" v-if="data.posShow"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: Object,
    },
    data() {
        return{}
    }    
}
</script>
<style lang="less" scoped>
.data-block{
    display: inline-block;
    text-align: left;
    .data-block-text-top{
        color: #ACB3BA;
    }
    .data-block-value{
        font-size: 36px;
        position: relative;
        &:before{
            content: '';
            display:block;
            width:0;
            height:0;
            border-width:0 6px 6px;
            border-style:solid;
            border-color:transparent transparent #D5DADE;
            position:absolute;
            top:16px;
            right:5px;
        }
        &:after{
            content: '';
            display:block;
            width:0;
            height:0;
            border-width:6px 6px 0;
            border-style:solid;
            border-color: #D5DADE transparent transparent ;
            position:absolute;
            top:29px;
            right:5px;
        }
        &.red{
            &:after{
                border-color: #F03939 transparent transparent ;
            }
        }
        &.green{
            &::before{
                border-color: transparent transparent #729A18;
            }
        }
    }
    .data-block-text-bottom{
        .hd-icon{
            margin-left: 10px;
        }
        .data-block-text-top
    }
}
</style>
