<template>
  <div class="hello">
    <table cellspacing="0">
    <thead>
      <tr>
        <td>水厂名称</td>
        <td>出厂压力</td>
        <td>出厂流量</td>
        <td>清水池水位</td>
        <td class="fonttext"> 1#</td>
        <td class="fonttext">2#</td>
        <td class="fonttext">3#</td>
        <td class="fonttext">4#</td>
        <td class="fonttext">5#</td>
        <td class="fonttext">6#</td>
        <td class="fonttext">7#</td>
        <td class="fonttext">8#</td>
      </tr>
    </thead>
    <tbody id="tby">
      <tr v-for="(item,index) in stu" :key="index.id">
        <td><span> {{item.name}}</span></td>
        <td><span>{{item.p}}</span></td>
        <td><span>{{item.w}}</span> </td>
        <td><span>{{item.q}}</span> </td>
        <td><span class="box" :class="item.t1==1? 'one' :(item.t1==2? 'two' :(item.t1==3? 'three' :(item.t1==4? 'four' :'')))" >{{item.r1}}</span></td>
        <td><span class="box" :class="item.t2==1? 'one' :(item.t2==2? 'two' :(item.t2==3? 'three' :(item.t2==4? 'four' :'')))">{{item.r2}}</span></td>
        <td><span class="box" :class="item.t3==1? 'one' :(item.t3==2? 'two' :(item.t3==3? 'three' :(item.t3==4? 'four' :'')))" >{{item.r3}}</span></td>
        <td><span class="box" :class="item.t4==1? 'one' :(item.t4==2? 'two' :(item.t4==3? 'three' :(item.t4==4? 'four' :'')))">{{item.r4}}</span></td>
        <td><span class="box" :class="item.t5==1? 'one' :(item.t5==2? 'two' :(item.t5==3? 'three' :(item.t5==4? 'four' :'')))">{{item.r5}}</span></td>
        <td><span class="box" :class="item.t6==1? 'one' :(item.t6==2? 'two' :(item.t6==3? 'three' :(item.t6==4? 'four' :'')))">{{item.r6}}</span></td>
        <td><span class="box" :class="item.t7==1? 'one' :(item.t7==2? 'two' :(item.t7==3? 'three' :(item.t7==4? 'four' :'')))">{{item.r7}}</span></td>
        <td><span class="box" :class="item.t8==1? 'one' :(item.t8==2? 'two' :(item.t8==3? 'three' :(item.t8==4? 'four' :'')))">{{item.r8}}</span></td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
<script>
import urlClass from '@/components/js/UrlClass';
import axios from "axios";
import Bus from "@/bus.js";
export default {
  name: "TopTable",
  data() {
    return {
      stu: []
    };
  },
  mounted() {
    var _this = this;
    _this.restotable();
    this.setin = setInterval(function() {
      _this.restotable();
    }, 60000);
  },
  methods: {
    restotable() {
      var _this = this;
      _this.$axios
        .post(urlClass.axiosUrlRC +"GetWaterworks")
        .then(res => {
          var resdata = res.data.Data;
          console.log(res);
          var tabledata = [];
          var t1 = resdata[0].PumpList[0].OpenCloseType;
          var t2 = resdata[0].PumpList[1].OpenCloseType;
          var t3 = resdata[0].PumpList[2].OpenCloseType;
          var t4 = resdata[0].PumpList[3].OpenCloseType;
          var t5 = resdata[0].PumpList[4].OpenCloseType;
          var name = resdata[0].WaterworksName;
          var p = resdata[0].OutPressure;
          var w = resdata[0].OutFlow;
          var q = resdata[0].ClearWaterLevel;
          var r1 = resdata[0].PumpList[0].Speed;
          var r2 = resdata[0].PumpList[1].Speed;
          var r3 = resdata[0].PumpList[2].Speed;
          var r4 = resdata[0].PumpList[3].Speed;
          var r5 = resdata[0].PumpList[4].Speed;
          var ojbdata0 = {
            t1,
            t2,
            t3,
            t4,
            t5,
            name,
            p,
            w,
            q,
            r1,
            r2,
            r3,
            r4,
            r5
          };
          tabledata.push(ojbdata0);
          var t1 = resdata[1].PumpList[0].OpenCloseType;
          var t2 = resdata[1].PumpList[1].OpenCloseType;
          var t3 = resdata[1].PumpList[2].OpenCloseType;
          var t4 = resdata[1].PumpList[3].OpenCloseType;
          var t5 = resdata[1].PumpList[4].OpenCloseType;
          var name = resdata[1].WaterworksName;
          var p = resdata[1].OutPressure;
          var w = resdata[1].OutFlow;
          var q = resdata[1].ClearWaterLevel;
          var r1 = resdata[1].PumpList[0].Speed;
          var r2 = resdata[1].PumpList[1].Speed;
          var r3 = resdata[1].PumpList[2].Speed;
          var r4 = resdata[1].PumpList[3].Speed;
          var r5 = resdata[1].PumpList[4].Speed;
          var ojbdata1 = {
            t1,
            t2,
            t3,
            t4,
            t5,
            name,
            p,
            w,
            q,
            r1,
            r2,
            r3,
            r4,
            r5
          };
          tabledata.push(ojbdata1);
          var t1 = resdata[2].PumpList[0].OpenCloseType;
          var t2 = resdata[2].PumpList[1].OpenCloseType;
          var t3 = resdata[2].PumpList[2].OpenCloseType;
          var t4 = resdata[2].PumpList[3].OpenCloseType;
          var t5 = resdata[2].PumpList[4].OpenCloseType;
          var t6 = resdata[2].PumpList[5].OpenCloseType;
          var t7 = resdata[2].PumpList[6].OpenCloseType;
          var t8 = resdata[2].PumpList[7].OpenCloseType;
          var name = resdata[2].WaterworksName;
          var p = resdata[2].OutPressure;
          var w = resdata[2].OutFlow;
          var q = resdata[2].ClearWaterLevel;
          var r1 = resdata[2].PumpList[0].Speed;
          var r2 = resdata[2].PumpList[1].Speed;
          var r3 = resdata[2].PumpList[2].Speed;
          var r4 = resdata[2].PumpList[3].Speed;
          var r5 = resdata[2].PumpList[4].Speed;
          var r6 = resdata[2].PumpList[5].Speed;
          var r7 = resdata[2].PumpList[6].Speed;
          var r8 = resdata[2].PumpList[7].Speed;
          var ojbdata2 = {
            t1,
            t2,
            t3,
            t4,
            t5,
            t6,
            t7,
            t8,
            name,
            p,
            w,
            q,
            r1,
            r2,
            r3,
            r4,
            r5,
            r6,
            r7,
            r8
          };
          tabledata.push(ojbdata2);
          var t1 = resdata[3].PumpList[0].OpenCloseType;
          var t2 = resdata[3].PumpList[1].OpenCloseType;
          var t3 = resdata[3].PumpList[2].OpenCloseType;
          var t4 = resdata[3].PumpList[3].OpenCloseType;
          var t5 = resdata[3].PumpList[4].OpenCloseType;
          var t6 = resdata[3].PumpList[5].OpenCloseType;
          var t7 = resdata[3].PumpList[6].OpenCloseType;
          var t8 = resdata[3].PumpList[7].OpenCloseType;
          var name = resdata[3].WaterworksName;
          var p = resdata[3].OutPressure;
          var w = resdata[3].OutFlow;
          var q = resdata[3].ClearWaterLevel;
          var r1 = resdata[3].PumpList[0].Speed;
          var r2 = resdata[3].PumpList[1].Speed;
          var r3 = resdata[3].PumpList[2].Speed;
          var r4 = resdata[3].PumpList[3].Speed;
          var r5 = resdata[3].PumpList[4].Speed;
          var r6 = resdata[3].PumpList[5].Speed;
          var r7 = resdata[3].PumpList[6].Speed;
          var r8 = resdata[3].PumpList[7].Speed;
          var ojbdata3 = {
            t1,
            t2,
            t3,
            t4,
            t5,
            t6,
            t7,
            t8,
            name,
            p,
            w,
            q,
            r1,
            r2,
            r3,
            r4,
            r5,
            r6,
            r7,
            r8
          };
          tabledata.push(ojbdata3);
          var t1 = resdata[4].PumpList[0].OpenCloseType;
          var t2 = resdata[4].PumpList[1].OpenCloseType;
          var t3 = resdata[4].PumpList[2].OpenCloseType;
          var t4 = resdata[4].PumpList[3].OpenCloseType;
          var t5 = resdata[4].PumpList[4].OpenCloseType;
          var t6 = resdata[4].PumpList[5].OpenCloseType;
          var t7 = resdata[4].PumpList[6].OpenCloseType;
          var t8 = resdata[4].PumpList[7].OpenCloseType;
          var name = resdata[4].WaterworksName;
          var p = resdata[4].OutPressure;
          var w = resdata[4].OutFlow;
          var q = resdata[4].ClearWaterLevel;
          var r1 = resdata[4].PumpList[0].Speed;
          var r2 = resdata[4].PumpList[1].Speed;
          var r3 = resdata[4].PumpList[2].Speed;
          var r4 = resdata[4].PumpList[3].Speed;
          var r5 = resdata[4].PumpList[4].Speed;
          var r6 = resdata[4].PumpList[5].Speed;
          var r7 = resdata[4].PumpList[6].Speed;
          var r8 = resdata[4].PumpList[7].Speed;
          var ojbdata4 = {
            t1,
            t2,
            t3,
            t4,
            t5,
            t6,
            t7,
            t8,
            name,
            p,
            w,
            q,
            r1,
            r2,
            r3,
            r4,
            r5,
            r6,
            r7,
            r8
          };
          tabledata.push(ojbdata4);
          var t1 = resdata[5].PumpList[0].OpenCloseType;
          var t2 = resdata[5].PumpList[1].OpenCloseType;
          var t3 = resdata[5].PumpList[2].OpenCloseType;
          var t4 = resdata[5].PumpList[3].OpenCloseType;
          var t5 = resdata[5].PumpList[4].OpenCloseType;
          var t6 = resdata[5].PumpList[5].OpenCloseType;
          var name = resdata[5].WaterworksName;
          var p = resdata[5].OutPressure;
          var w = resdata[5].OutFlow;
          var q = resdata[5].ClearWaterLevel;
          var r1 = resdata[5].PumpList[0].Speed;
          var r2 = resdata[5].PumpList[1].Speed;
          var r3 = resdata[5].PumpList[2].Speed;
          var r4 = resdata[5].PumpList[3].Speed;
          var r5 = resdata[5].PumpList[4].Speed;
          var r6 = resdata[5].PumpList[5].Speed;
          var ojbdata5 = {
            t1,
            t2,
            t3,
            t4,
            t5,
            t6,
            name,
            p,
            w,
            q,
            r1,
            r2,
            r3,
            r4,
            r5,
            r6
          };
          tabledata.push(ojbdata5);
          _this.stu = tabledata;
             var outflow=parseFloat(resdata[0].OutFlow+resdata[1].OutFlow+resdata[2].OutFlow+resdata[3].OutFlow+resdata[4].OutFlow+resdata[5].OutFlow).toFixed(2);
           Bus.$emit("toptabledjs", res.data);
           Bus.$emit("outFlow",outflow);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  },
  beforeDestroy: function() {
    if (this.setin) {
      clearInterval(this.setin); //在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.hello {
  min-width: 380px;
  height: 166px;
  /*  margin-left: 10px; */
  width: 100%;
}
table,
tr,
td,
th {
  padding: 0;
  margin: 0;
}
table {
  width: 100%;
  height: 100%;
  background: #56667d;
}

table th,
table td {
  font-size: 10px;
  text-align: start;
  padding-left: 10px;
  color: #fff;
}
tbody tr:nth-child(odd) {
  background: #101927;
}
.box {
  display: inline-block;
  width: 42px;
  height: 16px;
  line-height: 14px;
  text-align: center;
}

.fonttext {
  text-align: center;
  padding-right: 6px;
}
.one {
  padding: 0px 6px;
  margin-top: 0px;
  margin-bottom: -3px;
  text-align: center;
  border: 1px #1a212b solid;
  border-radius: 5px;
  color: #000;
  background-image: url("~@/assets/img/水泵图标_03.png");
  background-position: 4px -1px;
}
.two {
  padding: 0px 6px;
  margin-top: 0px;
  margin-bottom: -3px;
  border: 1px #1a212b solid;
  border-radius: 5px;
  background-image: url("~@/assets/img/水泵图标_02.png");
  background-position: 4px -1px;
  color: #000;
}
.three {
  background-color: #abe931;
  padding: 0px 6px;
  margin-top: 0px;
  margin-bottom: -3px;
  border: 1px #1a212b solid;
  border-radius: 5px;
  color: #000;
}
.four {
  background-image: url("~@/assets/img/水泵图标_01.png");
  padding: 0px 6px;
  margin-top: 0px;
  margin-bottom: -3px;
  border: 1px #1a212b solid;
  border-radius: 5px;
  background-position: 4px -1px;
  color: #000;
}
</style>
