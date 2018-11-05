<template>
    <div class="demo-chart">
        <hd-wrapper title="生产监测" :height="200" :width="300">
            <div>内容区域</div>
        </hd-wrapper>
        <h2>Wrapper Attribute</h2>
        <attr-table :data="attrs"></attr-table>
    </div>
</template>
<script>
import AttrTable from "../components/AttrTable.vue";
export default {
    data() {
        return {
            attrs:[
                {field:'title',title:'标题',type:'String',def:''},
                {field:'height',title:'高度',type:'String/Number',def:'100%'},
                {field:'width',title:'宽度',type:'String/Number',def:'100%'},
                {field:'background',title:'背景色',type:'String',def:'transparent'},
                {field:'angle',title:'边角',type:'Boolean',def:'true'}
            ]
        }
    },
     components: {
        AttrTable
    }
};
</script>
