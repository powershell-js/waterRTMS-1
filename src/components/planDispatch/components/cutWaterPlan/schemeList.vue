<template>
    <div class="scheme-list-warp">
        <panel-title :title="'方案列表'">
            <span class="opt-btn"><i class="hd-icon add"></i>添加</span>&emsp;
            <span class="opt-btn"><i class="hd-icon delete"></i>删除</span>
        </panel-title>
        <div class="scheme-list-content">
            <template v-for="(scheme,i) in schemeList">
                <div :key="i" class="scheme-list-content-item" :class="{'active': index == i}"
                    @click="itemClick(i, scheme.SchemeNo)">
                    <table  class="scheme-table">
                        <tr>
                            <td>
                                <span class="name">{{scheme.SchemeName}}</span>
                            </td>
                            <td>
                                <span class="text-gray">负责人:</span>
                                <span class="principal">{{scheme.ResponPerson}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="text-gray">停水时间</span>
                            </td>
                            <td>
                                <span class="time">{{scheme.WaterStopTime}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span class="text-gray">建立时间</span>
                            </td>
                            <td>
                                <span class="time">{{scheme.SettingTime}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import PanelTitle from './panelTitle.vue'
export default {
    components: { PanelTitle },
    props: {
        url: String
    },
    data() {
        return {
            schemeList: [],
            index: -1
        }
    },
    methods: {
        itemClick(index,SchemeNo) {
            this.index = index
            this.$store.dispatch('set_schemeNo', SchemeNo)
        },
        fetchSchemeList() {
            let self = this
            this.$axios.post(this.url).then(R=>{
                self.schemeList = R.data.SchemeList
            })
        }
    },
    created() {
        this.fetchSchemeList()
    }
}
</script>
<style lang="less" scoped>
.scheme-list-warp{
    border-right: 1px solid #D1D1DA;
    .opt-btn{
        cursor: pointer;
        color: #ACB3BA;
    }
    .scheme-list-content{
        height: 850px;
        overflow-y: auto;
        .scheme-list-content-item{
            padding: 10px;
            border-bottom: 1px solid #D1D1DA;
            cursor: pointer;
            transition: background-color .3s;
            &:hover{
                background-color: #F0F0F1;
            }
            &.active{
                background-color: #F0F0F1;
            }
            .scheme-table{
                width: 100%;
                tr{
                    td{
                        line-height: 28px;
                        .name{
                            font-weight: bold;
                            color: #6E7B8B;
                        }
                        .time{
                            .name
                        }
                        .principal{
                            .name
                        }
                        .text-gray{
                            color: #ACB3BA;
                        }
                        &:last-of-type{
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
}
</style>
