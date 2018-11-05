<template>
    <div class="demo-chart">
        <hd-wrapper title="滚动表格" :height="300" :width="300">
            <scroll-table style="height:calc(100% - 40px)" :data="data" :columns="col" :item-height="18" @row-click="wellClick" :speed="100"></scroll-table>
        </hd-wrapper>
        <h2>scrolltable Attribute</h2>
        <attr-table :data="attrs"></attr-table>
        <h2>scrolltable Events</h2>
        <event-table :data="events"></event-table>
    </div>
</template>
<script>
import AttrTable from "../components/AttrTable.vue";
import EventTable from "../components/EventTable.vue";
export default {
    data() {
        let data = [];
        for(let i=0;i<1000;i++){
            data.push({xh:i,time:1520218696,nm:'zzz',mz:'汉',jg:'浙江嘉兴'});
        }
        return {
            data:data,
            col:[
                {
                    title:'序号',width:'10%',field:'xh'
                },
                {
                    title:'时间',width:'20%',field:'time',type:'date',format:'HH:mm:ss'
                },
                {
                    title:'姓名',width:'20%',field:'nm'
                },
                {
                    title:'民族',width:'35%',field:'mz'
                },
                {
                    title:'籍贯',width:'35%',field:'jg'
                },
            ],
            attrs:[
                {field:'scrolling',title:'自动播放',type:'Boolean',def:'true'},
                {field:'speed',title:'播放速度',type:'Number',def:'50'},
                {field:'columns',title:'列定义',type:'Arrary',source:"title,width,field,format,align"},
                {field:'data',title:'数据源',type:'Arrary'},
                {field:'itemHeight',title:'行高',type:'Number',def:'30'},
                {field:'activeClass',title:'选中行类名',type:'String',def:''},
                {field:'bindings',title:'字典'},
            ],
            events:[
                {event:'row-click',title:'行单击',args:'row'},
                {event:'db-row-click',title:'行双击',args:'row'}
            ]
        }
    },
    methods:{
        wellClick(row){
            console.log(row); 
        }
    },
    components: {
        AttrTable,EventTable
    }
};
</script>
