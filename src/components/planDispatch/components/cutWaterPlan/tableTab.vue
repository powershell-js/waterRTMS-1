<template>
    <div class="table-tab">
        <div class="tabs">
            <div class="tab-item" v-for="(tab, i) in tabs" 
                :class="{'active':index == i}" @click="handleClick(i,tab)"
                :key="tab.key">
                <span>{{tab.name}}</span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        tabs: {
            type: Array,
            default: function(){
                return [
                    {name: 'tab1'},
                    {name: 'tab2'}
                ]
            }
        }
    },
    data() {
        return {
            index: 0
        }
    },
    methods: {
        handleClick(index, tab){
            this.index = index
            tab.tabClick && tab.tabClick(tab.key)
        }
    }  
}
</script>
<style lang="less" scoped>
.table-tab{
    .tabs{
        height: 30px;
        .tab-item{
            display: inline-block;
            margin-right: 20px;
            cursor: pointer;
            padding-bottom: 11px;
            &.active{
                color: #70991F;
                border-bottom: 3px solid #70991F;
            }
        }
        border-bottom: 1px solid #D1D1DA;
    }
}
</style>
