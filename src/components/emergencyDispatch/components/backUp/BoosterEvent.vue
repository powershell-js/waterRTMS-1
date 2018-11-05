<template>
    <div class="booster">
        <div class="set-wrapper clearfix">
            <div style="float:left;" class="boomSet-title fontEd">爆管参数设置</div>
            <div style="float:right">
                <div class="boomWater">
                    <span class="spanStyle">爆管泄水量</span><el-input class="water_input"></el-input><span>m³/h</span>
                </div>
                <div class="boomNum">
                    <el-input placeholder="输入爆管点编号"></el-input><button class="boom-btn">选择爆管点</button>
                </div>
            </div>
        </div>

        <div class="navList">
            <span class="bar spanStyle" :class="{'active': cur==='bgmn'}" @click="cur = 'bgmn'">01&nbsp;爆管工况模拟<div class="arrow"></div></span>
            <span class="bar spanStyle" :class="{'active': cur==='gbcz'}"  @click="cur = 'gbcz'">02&nbsp;关阀处置<div class="arrow"></div></span>
            <span class="spanStyle" :class="{'active': cur==='yjdd'}"  @click="cur = 'yjdd'">03&nbsp;应急调度</span>
        </div>
        <BoosterSimulation v-if="cur==='bgmn'"></BoosterSimulation>
        <HandleClose v-if="cur==='gbcz'"></HandleClose>
        <UrgentDispatcher v-if="cur==='yjdd'"></UrgentDispatcher>
    </div>
</template>
<script>
import BoosterSimulation from './BoosterSimulation.vue';
import HandleClose from './HandleClose.vue';
import UrgentDispatcher from './UrgentDispatcher.vue';
export default {
    data() {

        return {
            cur:'bgmn'
        }
    },
    components:{BoosterSimulation,HandleClose,UrgentDispatcher}
}
</script>
<style lang="less" scoped>
    .booster *{box-sizing: border-box;}
    .fontEd{
        font-size: 14px;
        font-weight: bold;
        color:#6e7b8b;
    }
    .spanStyle{
        display: inline-block;
        color:#737b80;
        font-size: 12px;
    }
    .booster{
        border:1px solid #d1d1da;
        height: 100%;
        box-sizing: border-box;
        .set-wrapper{

            border-bottom:none;
            background-color: #fff;
            height: 40px;
            line-height: 40px;
            padding-right: 20px;
            .boomSet-title{
                border-left:4px solid #70991f;
                height: 100%;
                padding-left: 15px;
                display: inline-block;
            }
            .boomWater{
                display: inline-block;
                padding-right:40px;
                .water_input{
                    margin: 0 10px;
                    width: 115px;
                    .el-input__inner{
                        background-color: #f0f0f1;
                    }
                }

            }
            .boomNum{
                display: inline-block;
                .el-input{
                    width: 235px;
                    .el-input__inner{
                        background-color: #f0f0f1;
                    }

                }
                .boom-btn{
                    width: 98px;
                    border:1px solid #d1d1da;
                    background: linear-gradient(#fff, #ededef);
                    height: 28px;
                    margin-left:10px;
                }
            }
        }
        .navList{
            border-top:1px solid #d1d1da;
            border-bottom:1px solid #d1d1da;
            height: 30px;
            display: flex;
            justify-content: center;
            span{
                display: block;
                height: 28px;
                line-height: 28px;
                text-align: center;
                width: 33.333%;
                background-color: #fff;
                cursor: pointer;
                &.active{
                    background-color: #c2e086;
                }
            }

        }

    }


</style>
<style lang="less">
    .clearfix:after{
        content:"";
        display:block;
        visibility:hidden;
        clear:both;
    }
    .clearfix{
            zoom:1;
    }

    .boomNum .el-input__inner,.water_input .el-input__inner{background-color: #f0f0f1;border:none;border-radius:0;}

    .booster{
        .navList{
            .bar{
                position: relative;
                .arrow{
                    position: absolute;
                    width: 16px;
                    height: 28px;
                    background: url("../../../assets/nav_off.png") right center no-repeat;
                    background-size:16px 28px;
                    right: -14px;
                    top:0;
                    z-index: 2;
                }

                &.active{
                    .arrow{
                        background: url("../../../assets/nav_on.png") right center no-repeat;
                        background-size:16px 28px;
                    }
                }
            }
        }
    }
</style>

