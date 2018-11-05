<template>
  <el-radio-group v-model="value" :style="domstyle" @change="handleChange">
    <el-radio :label="item" :key="item" v-for="(item,index) in labels" >{{names[index]}}</el-radio>
  </el-radio-group>
</template>
<script>
    export default {
        props: {
            field: {
                type: String,
                default: ""
            },
            value: {
                type: String,
                default: ""
            },
            labels: {
                type: Array
            },
            names: {
                type:Array
            },
            option: {type:Object,default:function(){return {}}},
            event: {type:Object,default:function(){return {}}},
            domstyle: {type:Object,default:function(){return {}}},
        },
        data: function () {
            return { 
            type: "radio" };
        },
        methods:{
            handleChange(){
                typeof (this.event || {}).change == "function" &&
                                this.event.change();
            }
        }
    }

</script>
