<template>
    <div class="reduction-scheme-warp">
        <table>
            <tr class="head">
                <td v-for="h in head" :key="h" :width="checkable?'11%':'12%'">{{h}}</td>
                <td v-for="i in 8" :key="i" :width="checkable?'7%':'8%'">{{i}}#</td>
            </tr>
            <tr v-for="item in factoryData" :key="item.code">
                <td>{{item.WaterworksName}}</td>
                <td>{{item.OutPressure}}</td>
                <td>{{item.OutFlow}}</td>
                <td v-if="checkable"><el-checkbox v-model="item.isSlchooseable"></el-checkbox></td>
                <td v-for="p in item.PumpList" :key="p.PumpNo">
                    <div class="bz-data" v-html="p.Speed||'&#12288;'" :class="p.OpenCloseType == 1||0?'green':'red'"></div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    components: {},
    props: {
        checkable: {
            type: Boolean,
            default: false
        },
        url: String,
        param: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    data() {
        return {
            // head: ['水厂名称','出厂压力(MPa)','出厂流量(m³/h)'],
            factoryData: [],
            initData:[
                 {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 2,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 3,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 4,
                    Speed: ""
                }
            ],
            WaterworksName: "笔架山水厂"
        },
        {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 2,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 3,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 4,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 5,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 6,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 7,
                    Speed: ""
                }
            ],
            WaterworksName: "大涌北水厂"
        },
        {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 2,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 3,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 4,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 5,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 6,
                    Speed: ""
                }
            ],
            WaterworksName: "大涌南水厂"
        },
        {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 2,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 3,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 4,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 5,
                    Speed: ""
                },
                {
                    OpenCloseType: 0,
                    PumpNo: 6,
                    Speed: ""
                }
            ],
            WaterworksName: "东湖水厂"
        },
        {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                }
            ],
            WaterworksName: "梅林水厂"
        },
        {
            OutFlow: '--',
            OutPressure: '--',
            PumpList: [
                {
                    OpenCloseType: 0,
                    PumpNo: 1,
                    Speed: ""
                }
            ],
            WaterworksName: "南山水厂"
        }
                ],
        }
    },
    methods: {
        fetchDispatchCALC() {
            let self = this
            this.$axios.post(this.url, this.param).then(R=>{
                self.factoryData = R.data.Data
            })
        },
        myEventListener: function(event) {
        var typeTemp = event.detail.type;
        var dataTemp = event.detail.data;
        if(typeTemp=="SchedulePressureCal"){
            let self = this
            this.$axios.post(
              urlClass.axiosUrlYJ + "DispatchCALC",
              JSON.stringify(dataTemp),
              {
                headers: { "Content-Type": "application/json;" }
              }).then(R=>{
                self.factoryData = R.data.Data
            })
        }
        }
    },
    created() {
        this.factoryData = this.initData;
        //this.fetchDispatchCALC()
    },
    mounted() {
        window.addEventListener("event_name", this.myEventListener);
    },
    computed: {
        // factoryData() {
        //     return this.$store.state.emergencyDispatch.factoryData
        // },
        head() {
            let h = ['水厂名称','出厂压力(MPa)','出厂流量(m³/h)']
            if(this.checkable)
                h.push('水量是否可选')
            return h
        }
    },
}
</script>
<style lang="less" scoped>
.reduction-scheme-warp{
    // padding: 10px;
    box-sizing: border-box;
    table{
        width: 100%;
        .head{
            background-color: #F0F0F1;
            line-height: 24px;
        }
        td{
            // line-height: 24px;
            padding: 8px 2px;
            .bz-data{
                text-align: center;
                display: inline-block;
                width: 100%;
                margin-bottom: 2px;
                &.green{
                    background-color: #ABE931;
                }
                &.red{
                    background-color: #F03939;
                }
            }
        }
    }
}
</style>
