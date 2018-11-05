<template>
    <div class="hello">
        <table cellspacing="0" width="100%">
            <thead>
                <tr>
                    <td width="45" style="text-align:center">电价</td>
                    <td colspan="6" style="background:#4a76a8"></td>
                    <td colspan="15" style="background:#da5abd"></td>
                    <td colspan="3" style="background:#4a76a8"></td>
                </tr>
            </thead>
        </table>

        <el-table
            :data="allBenData"
            :show-header="showHeader"
            border
            :row-style="rowStyle"
            style="width: 100%">
            <el-table-column
                width="45"
                prop="name"
                label="a">
            </el-table-column>
            <template v-for="n in 24">
                <el-table-column :key="n" width="45"
                label="n">
                <template slot-scope="scope">
                    <span v-if="n<10" :class="HandleClass(scope.row['0'+n+':00:00'] && scope.row['0'+n+':00:00'][1])" v-html="(scope.row['0'+n+':00:00'] && scope.row['0'+n+':00:00'][0]) || '&#12288;'"></span>
                    <span v-else-if="n==24" :class="HandleClass(scope.row['00:00:00'] && scope.row['00:00:00'][1])" v-html="(scope.row['00:00:00'] && scope.row['00:00:00'][0]) || '&#12288;'"></span>
                    <span v-else :class="HandleClass(scope.row[''+n+':00:00'] && scope.row[''+n+':00:00'][1])" v-html="(scope.row[''+n+':00:00'] && scope.row[''+n+':00:00'][0]) || '&#12288;'"></span>
                </template>
            </el-table-column>
            </template>
        </el-table>
    </div>
</template>
<script>
import qs from "qs";
import Bus from "@/bus.js";
import urlClass from '@/components/js/UrlClass'
export default {
  name: "ListTable",
  data() {
    return {
        allBenData:[],
        showHeader:false,
        rowStyle:{
            "height":"21px",
            "line-height":"21px",
            "text-align":"center",
            "background":"#f0f0f1"
        }
    };
  },
  methods:{
      ajaxBenData(){
        let self = this;
        this.$axios.post(urlClass.axiosUrJH+"GetWaterPump",{"WaterNum":"asdasd","CodeId":"asdasd","CTPressure":"12"})
        .then(res => {
            let dic={};
            let arr =[];
            for(var i=1;i<=8;i++){
                let obj = {}
                for(let j=1;j<=24;j++){

                    var key = (j+"").padStart(2,"0")+":00:00";
                    var value = 0;
                    if(j == 24){key = "00:00:00";}
                    obj[key] = value;
                }
                obj["name"] = i+"#"
                dic[i] = obj;
            }
            let d = res.data;
            if(!d.WaterPump){return;}
            d.WaterPump.forEach(e => {

                for(var k in dic){
                    if(e.PumpNo === parseInt(k)){
                        dic[k][e.Time] = [e.Speed,e.OpenCloseType];
                    }
                }
            });

            for(var key in dic){
                arr.push(dic[key]);
            }
            self.allBenData = arr;

        })
      .catch(error => {
        console.log(error);
      });
      },
      HandleClass(colum){
        switch(colum){
            case 1:
                return "open";
            case 0:
                return "close";
            case -1:
                return "yichang";
            case 2:
                return "dingsu"
        }
      }
  },
  mounted() {
      this.ajaxBenData();
  },
};
</script>
<style lang="less" scoped>
    .open{
        display: block;
        // background: url("~@/assets/img/斜纹_绿.png") no-repeat;
        background:#abe931;
        // background-size: 100% 21px;
    }
    .close{
        display: block;
        // background: url("~@/assets/img/斜纹_透明.png") no-repeat;
        background:#f0f0f1;
        //  background-size: 100% 21px;
    }
    .yichang{
        display: block;
        // background: url("~@/assets/img/斜纹_红.png") no-repeat;
        background:#f03939;
        // background-size: 100% 21px;
    }
    .dingsu{
        display: block;
        // background: url("~@/assets/img/斜纹_透明.png") no-repeat;
        background:#f0f0f1;
        // background-size: 100% 21px;
    }
</style>
<style lang="less">
    .hello{
        .el-table--border td{
            border-right: 1px solid #fff;
            border-bottom: 1px solid #fff;
        }
        .el-table__body tr:hover>td{
            background: initial !important;
        }
        .el-table .cell{
            width:100%;
            height: 100%;
            padding:0;
        }
        .el-table.el-table--mini td{
            padding:0;
        }

    }
</style>
