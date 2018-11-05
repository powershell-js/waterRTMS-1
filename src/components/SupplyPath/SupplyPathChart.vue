<template>
    <div class="divClass">
         <div  class="labelClass">
           <table class="tableClassMyAll"> 
               <table class="tableClass">
                    <td style="padding-top:10px;font-size:14px">供水路径统计表</td>
               </table>
                <div class="testClass">
                <span class="spanClass">线路总长度</span>
                <span class="span1Class">{{labelData.AllLength}}</span>
                <span class="span2Class">米</span>
              </div>
              <div class="testClass1">
                <span class="spanClass">总水头损失</span>
                <span class="span1Class">{{labelData.HeadLoss}}</span>
                <span class="span2Class">米</span>
              </div>
              <div class="testClass1">
                <span class="spanClass">供水水源</span>
                <span class="span1Class">{{labelData.SourceName}}</span>
              </div>
              <div class="testClass1">
                <span class="spanClass">起端水压标高</span>
                <span class="span1Class">{{labelData.StartHead}}</span>
                <span class="span2Class">米</span>
              </div>
              <div class="testClass1">
                <span class="spanClass">末端水压标高</span>
                <span class="span1Class">{{labelData.EndHead}}</span>
                <span class="span2Class">米</span>
              </div>
           </table>
        </div>
         <div style="width:80%">
            <my-chart  ></my-chart>
        </div> 
    </div>
</template>
<script>
import myChart from '@/components/SupplyPath/MyChart'
export default {
    components:{
        myChart
    },
     props: {
        labelData: {
        type: Object,
        default: {
            AllLength: 0,
            HeadLoss: 0,
            SourceName:'',
            StartHead:0,
            EndHead:0,
            chartData:{
                listX:[1,2,3,4,5,6,7,8,8],
                listY1:[1,2,3,4,5,6,7,8,8],
                listY2:[2,2,3,20,5,6,7,8,8]
            }
      }
    }
  },
   data(){
        return{
            chartData:{
                listX:[1,2,3,4,5,6,7,8,8],
                listY1:[1,2,3,4,5,6,7,8,8],
                listY2:[2,2,3,20,5,6,7,8,8]
            }
                
                
        };
    }
}
</script>
<style scoped>
.divClass{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
}
.chartClass{
       /*  position: absolute; */
}
.colLine{
    height: 90%;
    width: 1px;
    background: black;
}
.spanClass{
    width: 50px;
    text-align: end;
    margin-right: 20px;
}
.span1Class{
    width: 50px;
    text-align: end;
    margin-right: 20px;
}
.span2Class{
    width: 50px;
    text-align: end;
    margin-right: 20px;
}
.testClass{
    margin-left: 20px;
    height: 20px;
    width: 90%;
    line-height: 20px;
    border-top: 1px black solid;
    border-bottom: 1px black solid;
}
.testClass1{
    margin-left: 20px;
    height: 20px;
    width: 90%;
    text-align: center;
    line-height: 20px;
    border-bottom: 1px black solid;
}
.labelClass{
    width: 20%;
    margin-top: 1%;
}
.itemClass{
    width: 100%;
    text-align: center;
    height: 5px;
    padding-top: 0px
}
.tableClass{
    width: 100%;
    text-align: center;
}
.tableClassMyAll{
    width: 100%;
    text-align: center;
    height: 150px;
}


</style>


