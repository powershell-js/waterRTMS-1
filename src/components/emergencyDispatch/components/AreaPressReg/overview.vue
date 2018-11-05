<template>
    <div class="overview-warp">
        <el-row type="flex" :gutter="15">
            <el-col :span="5">
                <div class="water-value">
                    <div class="water-value-head">
                        <el-row>
                            <el-col :span="12">
                                <span class="unit">当前供水量(万m³)</span>
                            </el-col>
                            <el-col :span="12" style="text-align:right;">
                                <span class="hb">10%</span>
                            </el-col>
                        </el-row>
                    </div>
                    <template v-for="i in '25631'">
                        <led-number :key="i" :num="parseInt(i)"></led-number>
                    </template>
                </div>
            </el-col>
            <el-col :span="19">
                <toptable></toptable>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import LedNumber from './LedNumber.vue';
import toptable from './toptable.vue'
export default {
    components: { LedNumber, toptable },
    data() {
        return {

        }
    }
}    
</script>
<style lang="less" scoped>
.overview-warp{
    padding: 15px;
    background: url("~@/assets/深水_日常调度_背景_17.png") 100% 100%;
    .water-value{
        padding: 15px;
        background-color: rgba(16, 25, 39, 0.6);
        height: 100%;
        box-sizing: border-box;
        .water-value-head{
            margin-bottom: 30px;
            .unit{
                color: white;
            }
            .hb{
                color: #00CCFF;
                position: relative;
                padding: 0 15px;
                &:before{
                    content: '';
                    display:block;
                    width:0;
                    height:0;
                    border-width:0 8px 8px;
                    border-style:solid;
                    border-color:transparent transparent #00CCFF;
                    position:absolute;
                    top:5px;
                    left:-5px;
                }
            }
        }
    }
}
</style>
