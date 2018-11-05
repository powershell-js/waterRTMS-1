<template>
<table v-show="isShow" id="myLegend"  class="legendClass" @mousedown="mousedown"><!--class="legendClass"-->
      <!--   <header class="headerClass">{{legendData.title}}
            <span style="width:80%"></span>
            <img src="../../static/assets/close.png" style="cursor:pointer;height:12px;width:12px;right:5px" title="关闭"  v-on:click="CloseClick">
        </header> -->
        <!-- <table class="headerClass">
            <td>{{legendData.title}}</td>
            <el-row style="padding-left:5px;text-align:right">
                <img src="../../static/assets/close.png" style="cursor:pointer;height:12px;width:12px" title="关闭"  v-on:click="CloseClick">
            </el-row>
        </table> -->
        <table class="headerClass">
            <td style="padding-left:20px;font-family: 'Microsoft YaHei';font-size: 16px;">{{legendData.title}}</td>
            <el-row style="padding-left:5px;text-align:right">
                 <img v-show="legendData.opType" src="../../static/assets/windowMin.png" style="cursor:pointer;height:29px;width:34px" title="最小化"  v-on:click="MinClick">
                <img src="../../static/assets/windowClose.png" style="cursor:pointer;height:29px;width:34px" title="关闭"  v-on:click="CloseClick">
            </el-row>
          </table>
        <el-row class="legendList" v-show="legendData.type!='baseMap'">
         <!--    <span style="width:10px;height:10px"></span>
            <table class="titleClass">
                <td class="nameClass">{{legendData.legendName}}</td>
                <td class="nameClass">管道长度(m)</td>
            
                <td class="nameClass">比例(%)</td>
                <span>
                <td class="nameClass">显示</td>
                <br>
                <el-checkbox v-model="legendData.allIsDisplay" value="" id='message' v-on:change="isDisplayClick"></el-checkbox>
                </span>
                    
                <td class="nameClass">定位</td>
                <td class="nameClass">用户</td>
            </table>
            <img style="height:2px;width:100%" src="../../static/assets/2x2black.jpg" alt=""> -->
            <table class="selection-list">
            <!-- <li style="list-Style:none;width:100%;" :key="item.index" v-for="item in legendData.listData" v-bind="legendData.listData">
                <legend-item-renderer style="height:'10px';width:100%" :itemData="item"></legend-item-renderer>
            </li> 
            <img style="height:2px;width:100%" src="../../static/assets/2x2black.jpg" alt="">-->
                <el-table ref="grid" :data="legendData.listData" style="width:400px;">
                <el-table-column :label="this.legendData.legendName" width="105" :align="'left'">
                    <template slot-scope="scope" >
                        <el-row style="width:100%">
                            <el-col :span="0.1">
                                <div class="colorClass" :style="{height:'10px',width:'10px',background:scope.row.color,display:'inline-block'}"></div>
                            </el-col>
                            <el-col :span="0.1">
                                <el-tooltip class="item" effect="dark" :content="scope.row.labelDisplayContent">
                                    <div class="labelClass">{{scope.row.labelDisplayContent}}</div>
                                </el-tooltip>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="pipeLengthContent" label="管道长度(m)" width="90" :align="'center'"> </el-table-column>
                <el-table-column prop="ratioContent" label="比例(%)" width="60" :align="'center'"></el-table-column>
                <el-table-column label="显示" width="45" :align="'center'">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="scope.row.isDisplay" v-on:change="isDisplayClick(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="定位" width="50" :align="'center'">
                    <template slot-scope="scope">
                        <img src="../../static/assets/locate_12x12_over.png" alt="" disabled="legendData.opType" style="cursor:pointer" title="定位" v-on:click="checkClick(scope.row)">
                    </template>
                </el-table-column>
                <el-table-column label="用户" width="50" :align="'center'">
                    <template slot-scope="scope">
                        <img src="../../static/assets/user_12x12_over.png" alt="" disabled="legendData.opType" style="cursor:pointer" title="用户" v-on:click="customerClick(scope.row)">
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="padding-left:20px;padding-top:5px">
                <table>
                     <td style="width:80px">总和</td>
                    <td>{{legendData.allPipeLength}}</td>
                </table>
            </el-row>
            </table>
      </el-row>
      <el-row class="selectionsClass" v-show="(legendData.type=='planCal')">
        <el-select v-model="value"  v-on:change="chooseSelection"><!--v-on:change="chooseSelection"-->
          <el-option
            v-for="item in selections"
            :key="item.label"
            :value="item.index"
            :label="item.label">
          </el-option>
        </el-select>
      </el-row>
      <!--模拟计算管道的图例(流量)-->
        <el-row class="legendList" v-show="(legendData.type=='planCal')&&(nowIndex==0)"><!---->
            <table class="selection-list">
                <el-table ref="grid" :data="legendData.listDataPipe" style="width:400px;">
                <el-table-column :label="this.legendData.legendNamePipe" width="100" :align="'left'">
                    <template slot-scope="scope" >
                        <el-row style="width:100%">
                            <el-col :span="0.1">
                                <div :style="{height:'10px',width:'10px',background:scope.row.color,display:'inline-block'}"></div>
                            </el-col>
                            <el-col :span="0.1">
                                <el-tooltip class="item" effect="dark" :content="scope.row.labelDisplayContent">
                                    <div class="labelClass">{{scope.row.labelDisplayContent}}</div>
                                </el-tooltip>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="pipeLengthContent" label="管道长度(m)" width="90" :align="'center'"> </el-table-column>
                <el-table-column prop="ratioContent" label="比例(%)" width="60" :align="'center'"></el-table-column>
                <el-table-column label="显示" width="45" :align="'center'">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.isDisplay" v-on:change="isDisplayClick(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="定位" width="50" :align="'center'">
                    <template slot-scope="scope">
                        <img disabled="legendData.opType" src="../../static/assets/locate_12x12_over.png" alt="" style="cursor:pointer" title="定位" v-on:click="checkClick(scope.row)">
                    </template>
                </el-table-column>
                <el-table-column label="用户" width="50" :align="'center'">
                    <template slot-scope="scope">
                        <img disabled="legendData.opType" src="../../static/assets/user_12x12_over.png" alt="" style="cursor:pointer" title="用户" v-on:click="customerClick(scope.row)">
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="padding-left:20px;padding-top:5px">
                <table>
                     <td style="width:80px">总和</td>
                    <td>{{legendData.allPipeLengthPipe}}</td>
                </table>
            </el-row>
            </table>
      </el-row>  
      <!--模拟计算管道的图例(流速)-->
      <el-row class="legendList" v-show="(legendData.type=='planCal')&&(nowIndex==1)"><!---->
            <table class="selection-list">
                <el-table ref="grid" :data="legendData.listDataPipeVelocity" style="width:400px;">
                <el-table-column :label="this.legendData.legendNameVelocity" width="100" :align="'left'">
                    <template slot-scope="scope" >
                        <el-row style="width:100%">
                            <el-col :span="0.1">
                                <div :style="{height:'10px',width:'10px',background:scope.row.color,display:'inline-block'}"></div>
                            </el-col>
                            <el-col :span="0.1">
                                <el-tooltip class="item" effect="dark" :content="scope.row.labelDisplayContent">
                                    <div class="labelClass">{{scope.row.labelDisplayContent}}</div>
                                </el-tooltip>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="pipeLengthContent" label="管道长度(m)" width="90" :align="'center'"> </el-table-column>
                <el-table-column prop="ratioContent" label="比例(%)" width="60" :align="'center'"></el-table-column>
                <el-table-column label="显示" width="45" :align="'center'">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.isDisplay" v-on:change="isDisplayClick(scope.row)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="定位" width="50" :align="'center'">
                    <template slot-scope="scope">
                        <img src="../../static/assets/locate_12x12_over.png" alt="" style="cursor:pointer" title="定位" v-on:click="checkClick(scope.row)">
                    </template>
                </el-table-column>
                <el-table-column label="用户" width="50" :align="'center'">
                    <template slot-scope="scope">
                        <img src="../../static/assets/user_12x12_over.png" alt="" style="cursor:pointer" title="用户" v-on:click="customerClick(scope.row)">
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="padding-left:20px;padding-top:5px">
                <table>
                     <td style="width:80px">总和</td>
                    <td>{{legendData.allPipeVelocityLengthPipe}}</td>
                </table>
            </el-row>
            </table>
      </el-row>     
      <el-row class="baseClass" v-show="legendData.type=='baseMap'">
           <table class="tableClass">
              <img class="imgClass" src="../../static/assets/pump_icon.png" alt="">
              <td class="tdClass">水泵机组</td>
              <span></span>
              <img class="imgClass" src="../../static/assets/tank_icon.png" alt="">
              <td class="textClass">水池水箱</td>
          </table>
          <br>
           <table  class="tableClass">
              <img class="imgClass" src="../../static/assets/hydrant_icon.png" alt="">
              <td class="tdClass1">消火栓</td>
              <span></span>
              <img class="imgClass" src="../../static/assets/valve_icon.png" alt="">
              <td class="textClass">阀门</td>
          </table>
          <br>
           <table class="tableClass">
              <img class="imgClass" src="../../static/assets/junction_icon.png" alt="">
              <td class="tdClass2">节点</td>
              <span></span>
              <img class="imgClass" src="../../static/assets/pipe_icon.png" alt="">
              <td class="textClass">供水管道</td>
          </table>
          <br>
           <table class="tableClass">
              <img class="imgClass" src="../../static/assets/fcv.png" alt="">
              <td class="tdClass3">流量阀</td>
              <span></span>
              <img class="imgClass" src="../../static/assets/prv.png" alt="">
              <td class="textClass">减压阀</td>
          </table>
          <br>
           <table class="tableClass1">
              <img class="imgClass" src="../../static/assets/cv.png" alt="">
              <td class="textClass">止回阀</td>
          </table>
    </el-row>
    <table class="headerClass" >
        <el-row style="padding-top:10px;padding-bottom: 10px;padding-left:10px;vertical-align:middle;padding-right: 10px;">
                <el-checkbox v-model="valveChecked" v-on:change="valveCheckClick">阀门状态</el-checkbox>
                <el-checkbox v-show="false" v-model="customerChecked" v-on:change="customerCheckClick">用户图层</el-checkbox>
        </el-row>
        <el-row v-show="legendData.maxCheckedIsDisplay||legendData.minCheckedIsDisplay" style="padding-bottom: 10px;padding-left:10px;vertical-align:middle;padding-right: 10px;">
            <el-col :span="6">
                <el-checkbox v-show="legendData.maxCheckedIsDisplay" v-model="legendData.maxChecked" v-on:change="maxCheckClick">最大值</el-checkbox>
            </el-col>
            <el-col :span="6">
                <td v-show="legendData.maxCheckedIsDisplay">{{legendData.maxValue}}</td>
             </el-col>
             <el-col :span="6">
                <el-checkbox v-show="legendData.minCheckedIsDisplay" v-model="legendData.minChecked" v-on:change="minCheckClick">最小值</el-checkbox>
             </el-col>
            <el-col :span="6">
                <td v-show="legendData.minCheckedIsDisplay">{{legendData.minValue}}</td>
            </el-col>
        </el-row>
        <el-row v-show="legendData.isCompareType=='ComparePipe'" style="width:100%;padding-bottom: 10px;padding-left:10px;vertical-align:middle;padding-right: 10px;">
            <el-col :span="6" style="width:50%">
                <table style="white-space: nowrap;">
                    <el-checkbox v-show="legendData.isCompareType=='ComparePipe'" v-model="legendData.compareUpCheck" v-on:change="UpCheckClick"></el-checkbox>
                    <div :style="{height:'10px',width:'20px',background:'#ff0000',display:'inline-block'}"></div>
                    <td>运行数据增加的管线</td>
                </table>
            </el-col>
            <el-col :span="6" style="width:50%">
                <table style="white-space: nowrap;">
                    <el-checkbox v-show="legendData.isCompareType=='ComparePipe'" v-model="legendData.compareDownCheck" v-on:change="DownCheckClick"></el-checkbox>
                    <div :style="{height:'5px',width:'20px',background:'#00ff00',display:'inline-block'}"></div>
                    <td>运行数据减小的管线</td>
                </table>
            </el-col>
        </el-row>
         <el-row v-show="legendData.isCompareType=='CompareNode'" style="width:100%;padding-bottom: 10px;padding-left:10px;vertical-align:middle;padding-right: 10px;">
            <el-col :span="6" style="width:50%">
                <table style="white-space: nowrap;">
                    <el-checkbox v-show="legendData.isCompareType=='CompareNode'" v-model="legendData.compareUpCheck" v-on:change="UpCheckClick"></el-checkbox>
                    <div :style="{height:'15px',width:'15px',background:'#ff0000',display:'inline-block'}"></div>
                    <td>运行数据增加的节点</td>
                </table>
            </el-col>
            <el-col :span="6" style="width:50%">
                <table style="white-space: nowrap;">
                    <el-checkbox v-show="legendData.isCompareType=='CompareNode'" v-model="legendData.compareDownCheck" v-on:change="DownCheckClick"></el-checkbox>
                    <div :style="{height:'8px',width:'8px',background:'#00ff00',display:'inline-block'}"></div>
                    <td>运行数据减小的节点</td>
                </table>
            </el-col>
        </el-row>
        <el-row v-show="legendData.isCompareType=='CompareSupplyArea'" style="padding-bottom: 10px;padding-left:10px;vertical-align:middle"><!---->
             <td>
                <img style="width:30px;height:14px" src="../../static/assets/CompareSupplyArea.png" alt="">
             </td>
            <td style="padding-left:10px;padding-bottom:4px">粗线为当前时间,细线为对比时间</td>
        </el-row>
    </table>
</table>

</template>
<script>
import LegendItemRenderer from '@/components/LegendItemRenderer'
//(legendData.maxCheckedIsDisplay||legendData.minCheckedIsDisplay)
export default {
    components:{
        LegendItemRenderer
    },
    props:{
        legendData:{
            type:Object,
            default:{
                title:"",
                legendName:"",
                legendNamePipe:"",
                legendNameVelocity:"",
                listData:[{
                    index:0,
                    color:"",
                    labelDisplayContent:'',
                    pipeLengthContent:'',
                    ratioContent:'',
                    isDisplayContent:'',
                    isDisplay:true,
                    }
                ],
                listDataPipe:[{
                     index:0,
                    color:"",
                    labelDisplayContent:'',
                    pipeLengthContent:'',
                    ratioContent:'',
                    isDisplayContent:'',
                    isDisplay:true,

                }],
                listDataPipeVelocity:[{
                     index:0,
                    color:"",
                    labelDisplayContent:'',
                    pipeLengthContent:'',
                    ratioContent:'',
                    isDisplayContent:'',
                    isDisplay:true,

                }],
                type:'baseMap',
                allIsDisplay:true,
                allPipeLength:0,
                allPipeLengthPipe:0,
                allPipeVelocityLengthPipe:0,
                maxCheckedIsDisplay:true,
                minCheckedIsDisplay:true,
                maxValue:'',
                minValue:'',
                maxChecked:false,
                minChecked:false,
                isCompareType:'',
                compareUpCheck:true,
                compareDownCheck:true,
                opType:false

            }
        },
        isShow:true,
        allIsDisplay:true,
        
    },
    data(){
        return{
            allIsDisplayTemp:true,
            customerChecked:false,
            valveChecked:false,
            maxChecked:false,
            minChecked:false,
            value:'流量变化',
            selections:[{label:"流量变化",index:0,value:0},
            {label:"流速变化",index:1,value:1}
            ],
            nowIndex:0,


        }
    },
    mounted(){
        this.allIsDisplayTemp = this.allIsDisplay;
    },
    methods:{
         chooseSelection (valueMy) {
             this.nowIndex = valueMy;
              var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "PlanCalPipelegendSelect";
                myEventTemp.detail.data = valueMy;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    }
    },
        CloseClick(){
            var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "legendClose";
                myEventTemp.detail.data = false;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    }
        },
        MinClick(){
            var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
            myEventTemp.detail.type = "legendMin";
            myEventTemp.detail.data = false;
            if(window.dispatchEvent){
            window.dispatchEvent(myEventTemp);
                }else{
                    window.fireEvent(myEventTemp);
                }
        },
        mousedown(event) {
         
          this.selectElement = document.getElementById("myLegend")
            var div1 = this.selectElement
            this.isDowm = true
            var distanceX = event.clientX - this.selectElement.offsetLeft
            var distanceY = event.clientY - this.selectElement.offsetTop
            document.onmousemove = function (ev) {
            var oevent = ev || event
            div1.style.left = oevent.clientX - distanceX + 'px'
            div1.style.top = oevent.clientY - distanceY + 'px'
            }
            document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
            }
      }
      ,
        isDisplayClickAll(event) {
            //this.$emit('isDisplayClick', event)
            var self = this;
            setTimeout(function(){
                console.log(self.legendData.allIsDisplay)
                var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "legendAllDisplay";
                myEventTemp.detail.data = self.legendData.allIsDisplay;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    }
            },0)
    },
    isDisplayClick(event)
            {
                //this.$emit('isDisplayClick', event)

                var self = this;
                setTimeout(function(){
                    var rowData = event;
                    var obj = new Object();
                    obj = Object.assign({},rowData)
                    obj.index = rowData.index;
                    obj.isDisplay = rowData.isDisplay;
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
                },0)
               
            },
            checkClick(event)
            {
                var rowData = event;
               var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "legendLocation";
                myEventTemp.detail.data = rowData;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    } 
            },
            customerClick(event)
            {
                var rowData = event;
                var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = "legendUser";
                myEventTemp.detail.data = rowData;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    }
            },
    customerCheckClick(event){

    },
    valveCheckClick(event){
        this.MyDispatchEvent("ValveAttribute",this.valveChecked);       
    },
    maxCheckClick(event){
        this.MyDispatchEvent("MaxShow",this.legendData.maxChecked)
    },
    minCheckClick(event){
        this.MyDispatchEvent("MinShow",this.legendData.minChecked)
    },
    UpCheckClick(event){
        this.MyDispatchEvent("UpCheckClick",this.legendData.compareUpCheck)
    },
    DownCheckClick(event){
        this.MyDispatchEvent("DownCheckClick",this.legendData.compareDownCheck)
    },
    MyDispatchEvent(typeTemp,dataTemp){
        var myEventTemp = new CustomEvent('event_name',{
                detail: { type: 'This is title!'},
                });
                myEventTemp.detail.type = typeTemp;
                myEventTemp.detail.data = dataTemp;
                if(window.dispatchEvent){
                window.dispatchEvent(myEventTemp);
                    }else{
                        window.fireEvent(myEventTemp);
                    }
    }

}
}
</script>
<style scoped>
.colorClass{
    margin-right: 5px;
}
.tableClass{
    vertical-align: middle;
}
.tableClass1{
    vertical-align: middle;
}

.tdClass{
    padding-right: 30px;
    font-family: "Microsoft YaHei";
    font-size: 16px;
}
.tdClass1{
    padding-right: 40px;
    font-family: "Microsoft YaHei";
    font-size: 16px;
}
.tdClass2{
    padding-right: 50px;
    font-family: "Microsoft YaHei";
    font-size: 16px;
}
.tdClass3{
    padding-right: 40px;
    font-family: "Microsoft YaHei";
    font-size: 16px;
}
.textClass{
    font-family: "Microsoft YaHei";
    font-size: 16px;
}
.imgClass{
    padding-right: 10px;
}
.labelClass{
width:80px;
text-align:left;
font-size:10px;
 white-space: nowrap; /*文本强制不换行； */
text-overflow:ellipsis; /*文本溢出显示省略号；*/
overflow:hidden;/* 溢出的部分隐藏；*/
} 
.legendClass{
   /*  height: 100%;
    width: 100%; */
    vertical-align:middle;  
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
.selection-list{
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    background: #ffffff
}
.headerClass{
    vertical-align: middle;
    height: 40px;
    width: 100%;
    font-size: 13px;
    background: #F5f8f8;
}

.nameClass{
    font-size: 12px
}
.space1Class{
    width: 1000px
}
.titleClass{
     width: 100%;
     padding-left: 10px;
    padding-right: 10px;
    background: #ffffff
}
.baseClass{
    width: 260px;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 10px;
    padding-right: 10px;
    background: #ffffff;

}
.legendList{
    width: '400px';
    background: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.selectionsClass{
    width: 100%;
    background: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
}
</style>




