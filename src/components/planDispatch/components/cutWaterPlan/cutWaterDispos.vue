<template>
    <div class="cut-water-dispos">
        <panel-title :title="'管网计划停水处置'" :color-show="false">
            <el-radio-group v-model="radio" class="radioGroupClass" style="margin-right:30px">
                <el-radio class="radioClass" style="margin-right:20px" v-model="radio" :label="1" >停水范围最小</el-radio>
                <el-radio class="radioClass" v-model="radio" :label="2" >停水关阀最少</el-radio>
            </el-radio-group>
            &emsp;&emsp;&emsp;&emsp;
            <el-button type="success" @click="handleClick">关阀搜索</el-button>
        </panel-title>
        <close-search-list ref="closeSearch"></close-search-list>
    </div>
</template>
<script>
import PanelTitle from './panelTitle.vue'
import closeSearchList from './closeSearchList.vue'
export default {
    components: { PanelTitle, closeSearchList },
    data() {
        return {
            radio:1,
        }
    },
    methods: {
        handleClick() {
            this.$refs.closeSearch.gbfmClick()
        }
    }
}
</script>
<style lang="less" scoped>
.cut-water-dispos{
    height: 420px;
}
</style>
