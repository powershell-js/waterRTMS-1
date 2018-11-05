<template>
     <div class="list">
            <div class="list-item" v-for="(item,index) in sysData" :key='index'>
                <div class="li-name">{{item.name}}</div>
                <div class="li-name">{{item.unit}}</div>
                <div class="li-num" :class="'li-'+index">{{item.value}}</div>
                <div class="li-fac" v-if="item.factory">{{item.factory}}</div>
            </div>
        </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        props:['sysData']
    }
</script>
<style lang="less" scoped>
    //continue
     .list{
        padding:40px 20px 36px;
        // border-top:1px solid #d1d1da;
        display: flex;
        justify-content: center;
        .list-item{
            width: 16.66%;
            text-align: center;
            border-right: 1px solid #e4e4ec;
            &:last-child{
                border-right:none;
            }
            .li-name{
                font-size: 12px;
                color:#acb3ba;
                line-height: 1;
            }
            .li-num{
                font-size: 36px;
                line-height: 1;
                margin: 8px 0;
                &.li-0{
                    color:#70991f;
                }
                &.li-1{
                    color:#6e7b8b;
                }
                &.li-2{
                    color:#e9af3b;
                }
                &.li-3{
                    color:#d56459;
                }
                &.li-4{
                    color:#70991f;
                }
                &.li-5{
                    color:#6e7b8b;
                }
            }
            .li-fac{
                color:#6e7b8b;
                font-size: 12px;
                line-height: 1;
            }
        }
    }
</style>
