<template>
<table class="itemClass">
    <el-row style="width:100%">
        <el-col :span="1.5">
            <div :style="{height:'10px',width:'10px',background:itemData.color,display:'inline-block'}"></div>
        </el-col>
        
        <el-col :span="1.5">
             <el-tooltip class="item" effect="dark" :content="itemData.labelDisplayContent">
            <!-- <td class="labelClass" id="labelDisplay">{{itemData.labelDisplayContent}}</td> -->
            <div class="labelClass" id="labelDisplay">{{itemData.labelDisplayContent}} </div>
        </el-tooltip>
        </el-col>
       
        <el-col :span="1.5">
              <td class="pipeLengthClass"  id="pipeLength">{{itemData.pipeLengthContent}}</td>
        </el-col>

        <el-col :span="1.5">
            <td class="ratioClass"  id="ratio">{{itemData.ratioContent}}</td>
        </el-col>

        <el-col :span="1.8" style="width:'45px'"  :align="'center'">
            <el-checkbox v-model="itemData.isDisplay" value="" id='message' v-on:change="isDisplayClick"></el-checkbox>
        </el-col>

        <el-col :span="2" style="width:'45px'" :align="'center'">
            <img src="../../static/assets/locate_12x12_over.png" alt="" style="cursor:pointer" title="定位"  v-on:click="checkClick">
        </el-col>

        <el-col :span="1.5" style="width:'45px'" :align="'center'">
            <img src="../../static/assets/user_12x12_over.png" alt="" style="cursor:pointer" title="用户"  v-on:click="customerClick">
        </el-col>
    </el-row>
    <img style="height:1px;width:100%" v-show="itemData.lineDisplay" src="../../static/assets/2x2black.jpg" alt="">
        
</table>
</template>
<script>
export default {
     props:{
        itemData:{
            type:Object,
            default:{
                color:"",
                labelDisplayContent:'',
                pipeLengthContent:'',
                ratioContent:'',
                isDisplayContent:'',
                isDisplay:true,
                index:0,
                labelId:''


            }
        }
        
    },
    data(){
        return{
        }
    },
    methods:{
            isDisplayClick(event)
            {
                //this.$emit('isDisplayClick', event)
               /*  var self = this;
                setTimeout(function(){
                   console.log(self.itemData.isDisplay)
                    var obj = new Object();
                    obj.index = self.itemData.index;
                    obj.isDisplay = self.itemData.isDisplay;
                    var myEventTemp = new CustomEvent('event_name',{
                    detail: { type: 'This is title!'},
                    });
                    myEventTemp.detail.type = "legendItemDisplay";
                    myEventTemp.detail.data = obj;
                    if(window.dispatchEvent){
                    window.dispatchEvent(myEventTemp);
                        }else{
                            window.fireEvent(myEventTemp);
                        }
                },0) */
               
            },
            checkClick(event)
            {
               /*  var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "legendLocation";
                myEventTemp.detail.data = this.itemData;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    } */
                //this.$emit('checkClick', this.itemData.index)
            },
            customerClick(event)
            {
                /* var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "legendUser";
                myEventTemp.detail.data = this.itemData;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    } */
                //this.$emit('customerClick', this.itemData.index)
            }
    }
}
</script>
<style>
.itemClass{
    /* display:'inline'; */
    width:100%;
    height: '40px';
}
.btnClass{
    font-size:0.1rem;
}
.labelClass{
width:80px;
text-align:left;
font-size:10px;
/* white-space:nowrap; 
text-overflow:ellipsis;
-o-text-overflow:ellipsis;
overflow:hidden; */

 white-space: nowrap; /*文本强制不换行； */
text-overflow:ellipsis; /*文本溢出显示省略号；*/
overflow:hidden;/* 溢出的部分隐藏；*/
} 
.pipeLengthClass{
width:85px;
text-align:left;
font-size:10px
}
.ratioClass{
width:40px;
text-align:left;
font-size:10px
}
</style>


