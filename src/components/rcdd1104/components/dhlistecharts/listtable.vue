<template>
    <div class="hello">
        <table cellspacing="0">
            <thead>
                <tr>
                    <td>电价</td>
                    <td colspan="6" style="background:#4a76a8"></td>
                    <td colspan="15" style="background:#da5abd"></td>
                    <td colspan="3" style="background:#4a76a8"></td>
                </tr>
            </thead>
            <tbody id="tby">
                <tr v-for="(item,index) in stu" :key="index.id">
                    <td class="tdbox"><span class="box">{{item.name}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t1==1? 'one' :(item.t1==2? 'two' :(item.t1==3? 'three' :(item.t1==4? 'four' :(item.t1==5? 'five' :(item.t1==6? 'six' :(item.t1==7? 'seven' :(item.t1==8? 'eight' :'')))))))" >{{item.r1}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t2==1? 'one' :(item.t2==2? 'two' :(item.t2==3? 'three' :(item.t2==4? 'four' :(item.t2==5? 'five' :(item.t2==6? 'six' :(item.t2==7? 'seven' :(item.t2==8? 'eight' :'')))))))">{{item.r2}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t3==1? 'one' :(item.t3==2? 'two' :(item.t3==3? 'three' :(item.t3==4? 'four' :(item.t3==5? 'five' :(item.t3==6? 'six' :(item.t3==7? 'seven' :(item.t3==8? 'eight' :'')))))))">{{item.r3}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t4==1? 'one' :(item.t4==2? 'two' :(item.t4==3? 'three' :(item.t4==4? 'four' :(item.t4==5? 'five' :(item.t4==6? 'six' :(item.t4==7? 'seven' :(item.t4==8? 'eight' :'')))))))">{{item.r4}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t5==1? 'one' :(item.t5==2? 'two' :(item.t5==3? 'three' :(item.t5==4? 'four' :(item.t5==5? 'five' :(item.t5==6? 'six' :(item.t5==7? 'seven' :(item.t5==8? 'eight' :'')))))))">{{item.r5}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t6==1? 'one' :(item.t6==2? 'two' :(item.t6==3? 'three' :(item.t6==4? 'four' :(item.t6==5? 'five' :(item.t6==6? 'six' :(item.t6==7? 'seven' :(item.t6==8? 'eight' :'')))))))">{{item.r6}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t7==1? 'one' :(item.t7==2? 'two' :(item.t7==3? 'three' :(item.t7==4? 'four' :(item.t7==5? 'five' :(item.t7==6? 'six' :(item.t7==7? 'seven' :(item.t7==8? 'eight' :'')))))))">{{item.r7}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t8==1? 'one' :(item.t8==2? 'two' :(item.t8==3? 'three' :(item.t8==4? 'four' :(item.t8==5? 'five' :(item.t8==6? 'six' :(item.t8==7? 'seven' :(item.t8==8? 'eight' :'')))))))">{{item.r8}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t9==1? 'one' :(item.t9==2? 'two' :(item.t9==3? 'three' :(item.t9==4? 'four' :(item.t9==5? 'five' :(item.t9==6? 'six' :(item.t9==7? 'seven' :(item.t9==8? 'eight' :'')))))))">{{item.r9}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t10==1? 'one' :(item.t10==2? 'two' :(item.t10==3? 'three' :(item.t10==4? 'four' :(item.t10==5? 'five' :(item.t10==6? 'six' :(item.t10==7? 'seven' :(item.t10==8? 'eight' :'')))))))">{{item.r10}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t11==1? 'one' :(item.t11==2? 'two' :(item.t11==3? 'three' :(item.t11==4? 'four' :(item.t11==5? 'five' :(item.t11==6? 'six' :(item.t11==7? 'seven' :(item.t11==8? 'eight' :'')))))))">{{item.r11}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t12==1? 'one' :(item.t12==2? 'two' :(item.t12==3? 'three' :(item.t12==4? 'four' :(item.t12==5? 'five' :(item.t12==6? 'six' :(item.t12==7? 'seven' :(item.t12==8? 'eight' :'')))))))">{{item.r12}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t13==1? 'one' :(item.t13==2? 'two' :(item.t13==3? 'three' :(item.t13==4? 'four' :(item.t13==5? 'five' :(item.t13==6? 'six' :(item.t13==7? 'seven' :(item.t13==8? 'eight' :'')))))))">{{item.r13}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t14==1? 'one' :(item.t14==2? 'two' :(item.t14==3? 'three' :(item.t14==4? 'four' :(item.t14==5? 'five' :(item.t14==6? 'six' :(item.t14==7? 'seven' :(item.t14==8? 'eight' :'')))))))">{{item.r14}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t15==1? 'one' :(item.t15==2? 'two' :(item.t15==3? 'three' :(item.t15==4? 'four' :(item.t15==5? 'five' :(item.t15==6? 'six' :(item.t15==7? 'seven' :(item.t15==8? 'eight' :'')))))))">{{item.r15}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t16==1? 'one' :(item.t16==2? 'two' :(item.t16==3? 'three' :(item.t16==4? 'four' :(item.t16==5? 'five' :(item.t16==6? 'six' :(item.t16==7? 'seven' :(item.t16==8? 'eight' :'')))))))">{{item.r16}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t17==1? 'one' :(item.t17==2? 'two' :(item.t17==3? 'three' :(item.t17==4? 'four' :(item.t17==5? 'five' :(item.t17==6? 'six' :(item.t17==7? 'seven' :(item.t17==8? 'eight' :'')))))))">{{item.r17}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t18==1? 'one' :(item.t18==2? 'two' :(item.t18==3? 'three' :(item.t18==4? 'four' :(item.t18==5? 'five' :(item.t18==6? 'six' :(item.t18==7? 'seven' :(item.t18==8? 'eight' :'')))))))">{{item.r18}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t19==1? 'one' :(item.t19==2? 'two' :(item.t19==3? 'three' :(item.t19==4? 'four' :(item.t19==5? 'five' :(item.t19==6? 'six' :(item.t19==7? 'seven' :(item.t19==8? 'eight' :'')))))))">{{item.r19}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t20==1? 'one' :(item.t20==2? 'two' :(item.t20==3? 'three' :(item.t20==4? 'four' :(item.t20==5? 'five' :(item.t20==6? 'six' :(item.t20==7? 'seven' :(item.t20==8? 'eight' :'')))))))">{{item.r20}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t21==1? 'one' :(item.t21==2? 'two' :(item.t21==3? 'three' :(item.t21==4? 'four' :(item.t21==5? 'five' :(item.t21==6? 'six' :(item.t21==7? 'seven' :(item.t21==8? 'eight' :'')))))))">{{item.r21}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t22==1? 'one' :(item.t22==2? 'two' :(item.t22==3? 'three' :(item.t22==4? 'four' :(item.t22==5? 'five' :(item.t22==6? 'six' :(item.t22==7? 'seven' :(item.t22==8? 'eight' :'')))))))">{{item.r22}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t23==1? 'one' :(item.t23==2? 'two' :(item.t23==3? 'three' :(item.t23==4? 'four' :(item.t23==5? 'five' :(item.t23==6? 'six' :(item.t23==7? 'seven' :(item.t23==8? 'eight' :'')))))))">{{item.r23}}</span></td>
                    <td class="tdbox"><span class="box" :class="item.t24==1? 'one' :(item.t24==2? 'two' :(item.t24==3? 'three' :(item.t24==4? 'four' :(item.t24==5? 'five' :(item.t24==6? 'six' :(item.t24==7? 'seven' :(item.t24==8? 'eight' :'')))))))">{{item.r24}}</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import qs from "qs";
import Bus from "@/bus.js";
import axios from "axios";
import urlClass from '@/components/js/UrlClass';
export default {
  name: "ListTable",
  data() {
    return {
      stu: [],
    };
  },
  mounted() {
    let that = this;
    that.request();
    /* setInterval(function() {
      var mindata = new Date().getHours() * 60 + new Date().getMinutes();
      if (mindata % 15 == 0) {
        that.request();
        console.log(mindata);
      }
    }, 60000); */
        setInterval(function() {
      that.request();
    },60000);
  },

methods:{
    request() {
      var WaterNum = "东湖水厂";
    var object = { WaterNum };
    var _this = this;
    axios
      .post(
        urlClass.axiosUrlRC + "GetWaterPump",
        JSON.stringify(object),
         {headers: {'Content-Type':'application/json;'}}
      )
      .then(res => {
        var _this = this;
        var bjslistshow=res.data
        var PumpData = res.data.PumpData;
        var name = "1#";
        var t1 = PumpData[0].PumpList[0].OpenCloseType;
        var t2 = PumpData[0].PumpList[1].OpenCloseType;
        var t3 = PumpData[0].PumpList[2].OpenCloseType;
        var t4 = PumpData[0].PumpList[3].OpenCloseType;
        var t5 = PumpData[0].PumpList[4].OpenCloseType;
        var t6 = PumpData[0].PumpList[5].OpenCloseType;
        var t7 =PumpData[0].PumpList[6].OpenCloseType;
        var t8 = PumpData[0].PumpList[7].OpenCloseType;
        var t9 = PumpData[0].PumpList[8].OpenCloseType;
        var t10 = PumpData[0].PumpList[9].OpenCloseType;
        var t11 = PumpData[0].PumpList[10].OpenCloseType;
        var t12 = PumpData[0].PumpList[11].OpenCloseType;
        var t13 = PumpData[0].PumpList[12].OpenCloseType;
        var t14 =PumpData[0].PumpList[13].OpenCloseType;
        var t15 = PumpData[0].PumpList[14].OpenCloseType;
        var t16 = PumpData[0].PumpList[15].OpenCloseType;
        var t17 = PumpData[0].PumpList[16].OpenCloseType;
        var t18 = PumpData[0].PumpList[17].OpenCloseType;
        var t19 = PumpData[0].PumpList[18].OpenCloseType;
        var t20 = PumpData[0].PumpList[19].OpenCloseType;
        var t21 = PumpData[0].PumpList[20].OpenCloseType;
        var t22 = PumpData[0].PumpList[21].OpenCloseType;
        var t23 = PumpData[0].PumpList[22].OpenCloseType;
        var t24 = PumpData[0].PumpList[23].OpenCloseType;
        var r1 = PumpData[0].PumpList[0].Speed;
        var r2 = PumpData[0].PumpList[1].Speed;
        var r3 = PumpData[0].PumpList[2].Speed;
        var r4 = PumpData[0].PumpList[3].Speed;
        var r5 =PumpData[0].PumpList[4].Speed;
        var r6 =PumpData[0].PumpList[5].Speed;
        var r7 =PumpData[0].PumpList[6].Speed;
        var r8 = PumpData[0].PumpList[7].Speed;
        var r9 = PumpData[0].PumpList[8].Speed;
        var r10 = PumpData[0].PumpList[9].Speed;
        var r11 = PumpData[0].PumpList[10].Speed;
        var r12 = PumpData[0].PumpList[11].Speed;
        var r13 = PumpData[0].PumpList[12].Speed;
        var r14 = PumpData[0].PumpList[13].Speed;
        var r15 = PumpData[0].PumpList[14].Speed;
        var r16 = PumpData[0].PumpList[15].Speed;
        var r17 = PumpData[0].PumpList[16].Speed;
        var r18 = PumpData[0].PumpList[17].Speed;
        var r19 = PumpData[0].PumpList[18].Speed;
        var r20 = PumpData[0].PumpList[19].Speed;
        var r21 = PumpData[0].PumpList[20].Speed;
        var r22 = PumpData[0].PumpList[21].Speed;
        var r23 = PumpData[0].PumpList[22].Speed;
        var r24 = PumpData[0].PumpList[23].Speed;
        var Pump1obj = {
          name,
          t1,
          t2,
          t3,
          t4,
          t5,
          t6,
          t7,
          t8,
          t9,
          t10,
          t11,
          t12,
          t13,
          t14,
          t15,
          t16,
          t17,
          t18,
          t19,
          t20,
          t21,
          t22,
          t23,
          t24,
          r1,
          r2,
          r3,
          r4,
          r5,
          r6,
          r7,
          r8,
          r9,
          r10,
          r11,
          r12,
          r13,
          r14,
          r15,
          r16,
          r17,
          r18,
          r19,
          r20,
          r21,
          r22,
          r23,
          r24
        };
        
        var name = "2#";
        var t1 = PumpData[1].PumpList[0].OpenCloseType;
        var t2 = PumpData[1].PumpList[1].OpenCloseType;
        var t3 =PumpData[1].PumpList[2].OpenCloseType;
        var t4 = PumpData[1].PumpList[3].OpenCloseType;
        var t5 = PumpData[1].PumpList[4].OpenCloseType;
        var t6 =PumpData[1].PumpList[5].OpenCloseType;
        var t7 =PumpData[1].PumpList[6].OpenCloseType;
        var t8 = PumpData[1].PumpList[7].OpenCloseType;
        var t9 = PumpData[1].PumpList[8].OpenCloseType;
        var t10 = PumpData[1].PumpList[9].OpenCloseType;
        var t11 = PumpData[1].PumpList[10].OpenCloseType;
        var t12 = PumpData[1].PumpList[11].OpenCloseType;
        var t13 = PumpData[1].PumpList[12].OpenCloseType;
        var t14 =PumpData[1].PumpList[13].OpenCloseType;
        var t15 = PumpData[1].PumpList[14].OpenCloseType;
        var t16 = PumpData[1].PumpList[15].OpenCloseType;
        var t17 = PumpData[1].PumpList[16].OpenCloseType;
        var t18 = PumpData[1].PumpList[17].OpenCloseType;
        var t19 = PumpData[1].PumpList[18].OpenCloseType;
        var t20 = PumpData[1].PumpList[19].OpenCloseType;
        var t21 =PumpData[1].PumpList[20].OpenCloseType;
        var t22 = PumpData[1].PumpList[21].OpenCloseType;
        var t23 =PumpData[1].PumpList[22].OpenCloseType;
        var t24 = PumpData[1].PumpList[23].OpenCloseType;
        var r1 = PumpData[1].PumpList[0].Speed;
        var r2 =PumpData[1].PumpList[1].Speed;
        var r3 = PumpData[1].PumpList[2].Speed;
        var r4 =PumpData[1].PumpList[3].Speed;
        var r5 = PumpData[1].PumpList[4].Speed;
        var r6 =PumpData[1].PumpList[5].Speed;
        var r7 =PumpData[1].PumpList[6].Speed;
        var r8 =PumpData[1].PumpList[7].Speed;
        var r9 =PumpData[1].PumpList[8].Speed;
        var r10 =PumpData[1].PumpList[9].Speed;
        var r11 =PumpData[1].PumpList[10].Speed;
        var r12 = PumpData[1].PumpList[11].Speed;
        var r13 = PumpData[1].PumpList[12].Speed;
        var r14 = PumpData[1].PumpList[13].Speed;
        var r15 =PumpData[1].PumpList[14].Speed;
        var r16 = PumpData[1].PumpList[15].Speed;
        var r17 = PumpData[1].PumpList[16].Speed;
        var r18 =PumpData[1].PumpList[17].Speed;
        var r19 =PumpData[1].PumpList[18].Speed;
        var r20 = PumpData[1].PumpList[19].Speed;
        var r21 =PumpData[1].PumpList[20].Speed;
        var r22 =PumpData[1].PumpList[21].Speed;
        var r23 =PumpData[1].PumpList[22].Speed;
        var r24 =PumpData[1].PumpList[23].Speed;
        var Pump2obj = {
          name,
          t1,
          t2,
          t3,
          t4,
          t5,
          t6,
          t7,
          t8,
          t9,
          t10,
          t11,
          t12,
          t13,
          t14,
          t15,
          t16,
          t17,
          t18,
          t19,
          t20,
          t21,
          t22,
          t23,
          t24,
          r1,
          r2,
          r3,
          r4,
          r5,
          r6,
          r7,
          r8,
          r9,
          r10,
          r11,
          r12,
          r13,
          r14,
          r15,
          r16,
          r17,
          r18,
          r19,
          r20,
          r21,
          r22,
          r23,
          r24
        };

        
        var name = "3#";
        var t1 =PumpData[2].PumpList[0].OpenCloseType;
        var t2 =PumpData[2].PumpList[1].OpenCloseType;
        var t3 =PumpData[2].PumpList[2].OpenCloseType;
        var t4 = PumpData[2].PumpList[3].OpenCloseType;
        var t5 =PumpData[2].PumpList[4].OpenCloseType;
        var t6 =PumpData[2].PumpList[5].OpenCloseType;
        var t7 = PumpData[2].PumpList[6].OpenCloseType;
        var t8 =PumpData[2].PumpList[7].OpenCloseType;
        var t9 =PumpData[2].PumpList[8].OpenCloseType;
        var t10 =PumpData[2].PumpList[9].OpenCloseType;
        var t11 =PumpData[2].PumpList[10].OpenCloseType;
        var t12 =PumpData[2].PumpList[11].OpenCloseType;
        var t13 =PumpData[2].PumpList[12].OpenCloseType;
        var t14 =PumpData[2].PumpList[13].OpenCloseType;
        var t15 =PumpData[2].PumpList[14].OpenCloseType;
        var t16 =PumpData[2].PumpList[15].OpenCloseType;
        var t17 =PumpData[2].PumpList[16].OpenCloseType;
        var t18 =PumpData[2].PumpList[17].OpenCloseType;
        var t19 =PumpData[2].PumpList[18].OpenCloseType;
        var t20 =PumpData[2].PumpList[19].OpenCloseType;
        var t21 =PumpData[2].PumpList[20].OpenCloseType;
        var t22 =PumpData[2].PumpList[21].OpenCloseType;
        var t23 =PumpData[2].PumpList[22].OpenCloseType;
        var t24 = PumpData[2].PumpList[23].OpenCloseType;
        var r1 =PumpData[2].PumpList[0].Speed;
        var r2 =PumpData[2].PumpList[1].Speed;
        var r3 =PumpData[2].PumpList[2].Speed;
        var r4 =PumpData[2].PumpList[3].Speed;
        var r5 =PumpData[2].PumpList[4].Speed;
        var r6 =PumpData[2].PumpList[5].Speed;
        var r7 =PumpData[2].PumpList[6].Speed;
        var r8 =PumpData[2].PumpList[7].Speed;
        var r9 =PumpData[2].PumpList[8].Speed;
        var r10 =PumpData[2].PumpList[9].Speed;
        var r11 =PumpData[2].PumpList[10].Speed;
        var r12 =PumpData[2].PumpList[11].Speed;
        var r13 =PumpData[2].PumpList[12].Speed;
        var r14 = PumpData[2].PumpList[13].Speed;
        var r15 =PumpData[2].PumpList[14].Speed;
        var r16 =PumpData[2].PumpList[15].Speed;
        var r17 =PumpData[2].PumpList[16].Speed;
        var r18 =PumpData[2].PumpList[17].Speed;
        var r19 =PumpData[2].PumpList[18].Speed;
        var r20 =PumpData[2].PumpList[19].Speed;
        var r21 =PumpData[2].PumpList[20].Speed;
        var r22 =PumpData[2].PumpList[21].Speed;
        var r23 = PumpData[2].PumpList[22].Speed;
        var r24 = PumpData[2].PumpList[23].Speed;
        var Pump3obj = {
          name,
          t1,
          t2,
          t3,
          t4,
          t5,
          t6,
          t7,
          t8,
          t9,
          t10,
          t11,
          t12,
          t13,
          t14,
          t15,
          t16,
          t17,
          t18,
          t19,
          t20,
          t21,
          t22,
          t23,
          t24,
          r1,
          r2,
          r3,
          r4,
          r5,
          r6,
          r7,
          r8,
          r9,
          r10,
          r11,
          r12,
          r13,
          r14,
          r15,
          r16,
          r17,
          r18,
          r19,
          r20,
          r21,
          r22,
          r23,
          r24
        };

       
        var name = "4#";
        var t1 =PumpData[3].PumpList[0].OpenCloseType;
        var t2 = PumpData[3].PumpList[1].OpenCloseType;
        var t3 =PumpData[3].PumpList[2].OpenCloseType;
        var t4 = PumpData[3].PumpList[3].OpenCloseType;
        var t5 =PumpData[3].PumpList[4].OpenCloseType;
        var t6 =PumpData[3].PumpList[5].OpenCloseType;
        var t7 =PumpData[3].PumpList[6].OpenCloseType;
        var t8 =PumpData[3].PumpList[7].OpenCloseType;
        var t9 =PumpData[3].PumpList[8].OpenCloseType;
        var t10 =PumpData[3].PumpList[9].OpenCloseType;
        var t11 = PumpData[3].PumpList[10].OpenCloseType;
        var t12 =PumpData[3].PumpList[11].OpenCloseType;
        var t13 =PumpData[3].PumpList[12].OpenCloseType;
        var t14 =PumpData[3].PumpList[13].OpenCloseType;
        var t15 =PumpData[3].PumpList[14].OpenCloseType;
        var t16 = PumpData[3].PumpList[15].OpenCloseType;
        var t17 =PumpData[3].PumpList[16].OpenCloseType;
        var t18 =PumpData[3].PumpList[17].OpenCloseType;
        var t19 =PumpData[3].PumpList[18].OpenCloseType;
        var t20 =PumpData[3].PumpList[19].OpenCloseType;
        var t21 =PumpData[3].PumpList[20].OpenCloseType;
        var t22 =PumpData[3].PumpList[21].OpenCloseType;
        var t23 =PumpData[3].PumpList[22].OpenCloseType;
        var t24 =PumpData[3].PumpList[23].OpenCloseType;
        var r1 =PumpData[3].PumpList[0].Speed;
        var r2 =PumpData[3].PumpList[1].Speed;
        var r3 =PumpData[3].PumpList[2].Speed;
        var r4 =PumpData[3].PumpList[3].Speed;
        var r5 =PumpData[3].PumpList[4].Speed;
        var r6 =PumpData[3].PumpList[5].Speed;
        var r7 =PumpData[3].PumpList[6].Speed;
        var r8 =PumpData[3].PumpList[7].Speed;
        var r9 =PumpData[3].PumpList[8].Speed;
        var r10 =PumpData[3].PumpList[9].Speed;
        var r11 =PumpData[3].PumpList[10].Speed;
        var r12 =PumpData[3].PumpList[11].Speed;
        var r13 =PumpData[3].PumpList[12].Speed;
        var r14 =PumpData[3].PumpList[13].Speed;
        var r15 =PumpData[3].PumpList[14].Speed;
        var r16 =PumpData[3].PumpList[15].Speed;
        var r17 =PumpData[3].PumpList[16].Speed;
        var r18 =PumpData[3].PumpList[17].Speed;
        var r19 = PumpData[3].PumpList[18].Speed;
        var r20 = PumpData[3].PumpList[19].Speed;
        var r21 =PumpData[3].PumpList[20].Speed;
        var r22 = PumpData[3].PumpList[21].Speed;
        var r23 = PumpData[3].PumpList[22].Speed;
        var r24 = PumpData[3].PumpList[23].Speed;
        var Pump4obj = {
          name,
          t1,
          t2,
          t3,
          t4,
          t5,
          t6,
          t7,
          t8,
          t9,
          t10,
          t11,
          t12,
          t13,
          t14,
          t15,
          t16,
          t17,
          t18,
          t19,
          t20,
          t21,
          t22,
          t23,
          t24,
          r1,
          r2,
          r3,
          r4,
          r5,
          r6,
          r7,
          r8,
          r9,
          r10,
          r11,
          r12,
          r13,
          r14,
          r15,
          r16,
          r17,
          r18,
          r19,
          r20,
          r21,
          r22,
          r23,
          r24
        };

    
        var name = "5#";
        var t1 =PumpData[4].PumpList[0].OpenCloseType;
        var t2 = PumpData[4].PumpList[1].OpenCloseType;
        var t3 = PumpData[4].PumpList[2].OpenCloseType;
        var t4 = PumpData[4].PumpList[3].OpenCloseType;
        var t5 = PumpData[4].PumpList[4].OpenCloseType;
        var t6 = PumpData[4].PumpList[5].OpenCloseType;
        var t7 = PumpData[4].PumpList[6].OpenCloseType;
        var t8 =PumpData[4].PumpList[7].OpenCloseType;
        var t9 =PumpData[4].PumpList[8].OpenCloseType;
        var t10 =PumpData[4].PumpList[9].OpenCloseType;
        var t11 =PumpData[4].PumpList[10].OpenCloseType;
        var t12 =PumpData[4].PumpList[11].OpenCloseType;
        var t13 =PumpData[4].PumpList[12].OpenCloseType;
        var t14 =PumpData[4].PumpList[13].OpenCloseType;
        var t15 =PumpData[4].PumpList[14].OpenCloseType;
        var t16 =PumpData[4].PumpList[15].OpenCloseType;
        var t17 =PumpData[4].PumpList[16].OpenCloseType;
        var t18 = PumpData[4].PumpList[17].OpenCloseType;
        var t19 =PumpData[4].PumpList[18].OpenCloseType;
        var t20 = PumpData[4].PumpList[19].OpenCloseType;
        var t21 = PumpData[4].PumpList[20].OpenCloseType;
        var t22 = PumpData[4].PumpList[21].OpenCloseType;
        var t23 = PumpData[4].PumpList[22].OpenCloseType;
        var t24 = PumpData[4].PumpList[23].OpenCloseType;
        var r1 = PumpData[4].PumpList[0].Speed;
        var r2 = PumpData[4].PumpList[1].Speed;
        var r3 = PumpData[4].PumpList[2].Speed;
        var r4 = PumpData[4].PumpList[3].Speed;
        var r5 = PumpData[4].PumpList[4].Speed;
        var r6 = PumpData[4].PumpList[5].Speed;
        var r7 =PumpData[4].PumpList[6].Speed;
        var r8 =PumpData[4].PumpList[7].Speed;
        var r9 =PumpData[4].PumpList[8].Speed;
        var r10 =PumpData[4].PumpList[9].Speed;
        var r11 =PumpData[4].PumpList[10].Speed;
        var r12 = PumpData[4].PumpList[11].Speed;
        var r13 = PumpData[4].PumpList[12].Speed;
        var r14 =PumpData[4].PumpList[13].Speed;
        var r15 =PumpData[4].PumpList[14].Speed;
        var r16 =PumpData[4].PumpList[15].Speed;
        var r17 =PumpData[4].PumpList[16].Speed;
        var r18 = PumpData[4].PumpList[17].Speed;
        var r19 =PumpData[4].PumpList[18].Speed;
        var r20 = PumpData[4].PumpList[19].Speed;
        var r21 =PumpData[4].PumpList[20].Speed;
        var r22 = PumpData[4].PumpList[21].Speed;
        var r23 = PumpData[4].PumpList[22].Speed;
        var r24 =PumpData[4].PumpList[23].Speed;
        var Pump5obj = {
          name,
          t1,
          t2,
          t3,
          t4,
          t5,
          t6,
          t7,
          t8,
          t9,
          t10,
          t11,
          t12,
          t13,
          t14,
          t15,
          t16,
          t17,
          t18,
          t19,
          t20,
          t21,
          t22,
          t23,
          t24,
          r1,
          r2,
          r3,
          r4,
          r5,
          r6,
          r7,
          r8,
          r9,
          r10,
          r11,
          r12,
          r13,
          r14,
          r15,
          r16,
          r17,
          r18,
          r19,
          r20,
          r21,
          r22,
          r23,
          r24
        };
      
        var name = "6#";
        var t1 = PumpData[5].PumpList[0].OpenCloseType;
        var t2 =PumpData[5].PumpList[1].OpenCloseType;
        var t3 =PumpData[5].PumpList[2].OpenCloseType;
        var t4 = PumpData[5].PumpList[3].OpenCloseType;
        var t5 =PumpData[5].PumpList[4].OpenCloseType;
        var t6 =PumpData[5].PumpList[5].OpenCloseType;
        var t7 = PumpData[5].PumpList[6].OpenCloseType;
        var t8 =PumpData[5].PumpList[7].OpenCloseType;
        var t9 =PumpData[5].PumpList[8].OpenCloseType;
        var t10 = PumpData[5].PumpList[9].OpenCloseType;
        var t11 =PumpData[5].PumpList[10].OpenCloseType;
        var t12 =PumpData[5].PumpList[11].OpenCloseType;
        var t13 =PumpData[5].PumpList[12].OpenCloseType;
        var t14 =PumpData[5].PumpList[13].OpenCloseType;
        var t15 =PumpData[5].PumpList[14].OpenCloseType;
        var t16 =PumpData[5].PumpList[15].OpenCloseType;
        var t17 = PumpData[5].PumpList[16].OpenCloseType;
        var t18 =PumpData[5].PumpList[17].OpenCloseType;
        var t19 = PumpData[5].PumpList[18].OpenCloseType;
        var t20 =PumpData[5].PumpList[19].OpenCloseType;
        var t21 =PumpData[5].PumpList[20].OpenCloseType;
        var t22 = PumpData[5].PumpList[21].OpenCloseType;
        var t23 = PumpData[5].PumpList[22].OpenCloseType;
        var t24 =PumpData[5].PumpList[23].OpenCloseType;
        var r1 =PumpData[5].PumpList[0].Speed;
        var r2 =PumpData[5].PumpList[1].Speed;
        var r3 =PumpData[5].PumpList[2].Speed;
        var r4 =PumpData[5].PumpList[3].Speed;
        var r5 =PumpData[5].PumpList[4].Speed;
        var r6 =PumpData[5].PumpList[5].Speed;
        var r7 =PumpData[5].PumpList[6].Speed;
        var r8 =PumpData[5].PumpList[7].Speed;
        var r9 =PumpData[5].PumpList[8].Speed;
        var r10 =PumpData[5].PumpList[9].Speed;
        var r11 =PumpData[5].PumpList[10].Speed;
        var r12 = PumpData[5].PumpList[11].Speed;
        var r13 =PumpData[5].PumpList[12].Speed;
        var r14 =PumpData[5].PumpList[13].Speed;
        var r15 =PumpData[5].PumpList[14].Speed;
        var r16 =PumpData[5].PumpList[15].Speed;
        var r17 = PumpData[5].PumpList[16].Speed;
        var r18 = PumpData[5].PumpList[17].Speed;
        var r19 = PumpData[5].PumpList[18].Speed;
        var r20 = PumpData[5].PumpList[19].Speed;
        var r21 =PumpData[5].PumpList[20].Speed;
        var r22 = PumpData[5].PumpList[21].Speed;
        var r23 =PumpData[5].PumpList[22].Speed;
        var r24 =PumpData[5].PumpList[23].Speed;
        var Pump6obj = {
          name,
          t1,
          t2,
          t3,
          t4,
          t5,
          t6,
          t7,
          t8,
          t9,
          t10,
          t11,
          t12,
          t13,
          t14,
          t15,
          t16,
          t17,
          t18,
          t19,
          t20,
          t21,
          t22,
          t23,
          t24,
          r1,
          r2,
          r3,
          r4,
          r5,
          r6,
          r7,
          r8,
          r9,
          r10,
          r11,
          r12,
          r13,
          r14,
          r15,
          r16,
          r17,
          r18,
          r19,
          r20,
          r21,
          r22,
          r23,
          r24
        };

        
        var name = "7#";
        var t1 = PumpData[6].PumpList[0].OpenCloseType;
        var t2 = PumpData[6].PumpList[1].OpenCloseType;
        var t3 = PumpData[6].PumpList[2].OpenCloseType;
        var t4 = PumpData[6].PumpList[3].OpenCloseType;
        var t5 = PumpData[6].PumpList[4].OpenCloseType;
        var t6 =PumpData[6].PumpList[5].OpenCloseType;
        var t7 = PumpData[6].PumpList[6].OpenCloseType;
        var t8 = PumpData[6].PumpList[7].OpenCloseType;
        var t9 =PumpData[6].PumpList[8].OpenCloseType;
        var t10 = PumpData[6].PumpList[9].OpenCloseType;
        var t11 =PumpData[6].PumpList[10].OpenCloseType;
        var t12 =PumpData[6].PumpList[11].OpenCloseType;
        var t13 =PumpData[6].PumpList[12].OpenCloseType;
        var t14 = PumpData[6].PumpList[13].OpenCloseType;
        var t15 = PumpData[6].PumpList[14].OpenCloseType;
        var t16 =PumpData[6].PumpList[15].OpenCloseType;
        var t17 =PumpData[6].PumpList[16].OpenCloseType;
        var t18 =PumpData[6].PumpList[17].OpenCloseType;
        var t19 =PumpData[6].PumpList[18].OpenCloseType;
        var t20 =PumpData[6].PumpList[19].OpenCloseType;
        var t21 =PumpData[6].PumpList[20].OpenCloseType;
        var t22 =PumpData[6].PumpList[21].OpenCloseType;
        var t23 =PumpData[6].PumpList[22].OpenCloseType;
        var t24 =PumpData[6].PumpList[23].OpenCloseType;

        var r1 =PumpData[6].PumpList[0].Speed;
        var r2 =PumpData[6].PumpList[1].Speed;
        var r3 =PumpData[6].PumpList[2].Speed;
        var r4 = PumpData[6].PumpList[3].Speed;
        var r5 =PumpData[6].PumpList[4].Speed;
        var r6 =PumpData[6].PumpList[5].Speed;
        var r7 =PumpData[6].PumpList[6].Speed;
        var r8 =PumpData[6].PumpList[7].Speed;
        var r9 =PumpData[6].PumpList[8].Speed;
        var r10 =PumpData[6].PumpList[9].Speed;
        var r11 =PumpData[6].PumpList[10].Speed;
        var r12 =PumpData[6].PumpList[11].Speed;
        var r13 = PumpData[6].PumpList[12].Speed;
        var r14 =PumpData[6].PumpList[13].Speed;
        var r15 = PumpData[6].PumpList[14].Speed;
        var r16 = PumpData[6].PumpList[15].Speed;
        var r17 =PumpData[6].PumpList[16].Speed;
        var r18 =PumpData[6].PumpList[17].Speed;
        var r19 =PumpData[6].PumpList[18].Speed;
        var r20 = PumpData[6].PumpList[19].Speed;
        var r21 = PumpData[6].PumpList[20].Speed;
        var r22 =PumpData[6].PumpList[21].Speed;
        var r23 =PumpData[6].PumpList[22].Speed;
        var r24 =PumpData[6].PumpList[23].Speed;
        var Pump7obj = {
          name,
          t1,
          t2,
          t3,
          t4,
          t5,
          t6,
          t7,
          t8,
          t9,
          t10,
          t11,
          t12,
          t13,
          t14,
          t15,
          t16,
          t17,
          t18,
          t19,
          t20,
          t21,
          t22,
          t23,
          t24,
          r1,
          r2,
          r3,
          r4,
          r5,
          r6,
          r7,
          r8,
          r9,
          r10,
          r11,
          r12,
          r13,
          r14,
          r15,
          r16,
          r17,
          r18,
          r19,
          r20,
          r21,
          r22,
          r23,
          r24
        };

     
        var name = "8#";
        var t1 =PumpData[7].PumpList[0].OpenCloseType;
        var t2 = PumpData[7].PumpList[1].OpenCloseType;
        var t3 = PumpData[7].PumpList[2].OpenCloseType;
        var t4 = PumpData[7].PumpList[3].OpenCloseType;
        var t5 = PumpData[7].PumpList[4].OpenCloseType;
        var t6 = PumpData[7].PumpList[5].OpenCloseType;
        var t7 = PumpData[7].PumpList[6].OpenCloseType;
        var t8 =PumpData[7].PumpList[7].OpenCloseType;
        var t9 = PumpData[7].PumpList[8].OpenCloseType;
        var t10 = PumpData[7].PumpList[9].OpenCloseType;
        var t11 =PumpData[7].PumpList[10].OpenCloseType;
        var t12 = PumpData[7].PumpList[11].OpenCloseType;
        var t13 =PumpData[7].PumpList[12].OpenCloseType;
        var t14 = PumpData[7].PumpList[13].OpenCloseType;
        var t15 =PumpData[7].PumpList[14].OpenCloseType;
        var t16 =PumpData[7].PumpList[15].OpenCloseType;
        var t17 =PumpData[7].PumpList[16].OpenCloseType;
        var t18 = PumpData[7].PumpList[17].OpenCloseType;
        var t19 =PumpData[7].PumpList[18].OpenCloseType;
        var t20 =PumpData[7].PumpList[19].OpenCloseType;
        var t21 =PumpData[7].PumpList[20].OpenCloseType;
        var t22 =PumpData[7].PumpList[21].OpenCloseType;
        var t23 =PumpData[7].PumpList[22].OpenCloseType;
        var t24 =PumpData[7].PumpList[23].OpenCloseType;
        var r1 =PumpData[7].PumpList[0].Speed;
        var r2 =PumpData[7].PumpList[1].Speed;
        var r3 = PumpData[7].PumpList[2].Speed;
        var r4 =PumpData[7].PumpList[3].Speed;
        var r5 =PumpData[7].PumpList[4].Speed;
        var r6 =PumpData[7].PumpList[5].Speed;
        var r7 =PumpData[7].PumpList[6].Speed;
        var r8 =PumpData[7].PumpList[7].Speed;
        var r9 =PumpData[7].PumpList[8].Speed;
        var r10 =PumpData[7].PumpList[9].Speed;
        var r11 =PumpData[7].PumpList[10].Speed;
        var r12 = PumpData[7].PumpList[11].Speed;
        var r13 =PumpData[7].PumpList[12].Speed;
        var r14 =PumpData[7].PumpList[13].Speed;
        var r15 =PumpData[7].PumpList[14].Speed;
        var r16 =PumpData[7].PumpList[15].Speed;
        var r17 =PumpData[7].PumpList[16].Speed;
        var r18 =PumpData[7].PumpList[17].Speed;
        var r19 = PumpData[7].PumpList[18].Speed;
        var r20 = PumpData[7].PumpList[19].Speed;
        var r21 =PumpData[7].PumpList[20].Speed;
        var r22 =PumpData[7].PumpList[21].Speed;
        var r23 =PumpData[7].PumpList[22].Speed;
        var r24 = PumpData[7].PumpList[23].Speed;
        var Pump8obj = {
          name,
          t1,
          t2,
          t3,
          t4,
          t5,
          t6,
          t7,
          t8,
          t9,
          t10,
          t11,
          t12,
          t13,
          t14,
          t15,
          t16,
          t17,
          t18,
          t19,
          t20,
          t21,
          t22,
          t23,
          t24,
          r1,
          r2,
          r3,
          r4,
          r5,
          r6,
          r7,
          r8,
          r9,
          r10,
          r11,
          r12,
          r13,
          r14,
          r15,
          r16,
          r17,
          r18,
          r19,
          r20,
          r21,
          r22,
          r23,
          r24
        };
        var arrtabledata = [
          Pump1obj,
          Pump2obj,
          Pump3obj,
          Pump4obj,
          Pump5obj,
          Pump6obj,
          Pump7obj,
          Pump8obj
        ];
        _this.stu = arrtabledata;
         Bus.$emit('msg', bjslistshow)
        /* console.log(res.data);
        console.log("泵2" + arrtabledata); */
      })
      .catch(error => {
        console.log(error);
      });
    },
}
};
</script>
<style scoped>
table,
tr,
td,
th {
  padding: 0;
  margin: 0;
}
table,
table tr th,
table tr td {
  border: 1px solid #fff;
  font-size: 10px;
  font-family: "微软雅黑";
  color: #6e7b8b;
}
table {
  /* min-height: 25px; */
  border-collapse: collapse;
  width: 100%;
  background: #ededef;
}
table th,
table td {
  width: 20px;
  text-align: center;
  font-size: 10px;
}
.box {
  display: inline-block;
  text-align: center;
  width: 34px;
  height: 20px;
  line-height: 20px;
  /*  padding: 3px 8px; */
}

.tdbox {
  /* background-color: aqua; */
  height: 25px;
  width: 34px;
}
.one {
background-image: url("~@/assets/img/斜纹_红.png");
  margin-top: 2px;
  margin-bottom: -2px;
}
.two {
   background-image: url("~@/assets/img/斜纹_透明.png");
    background-color: #f0f0f1;
  margin-top: 2px;
  margin-bottom: -2px;
}
.three {
  background-image: url("~@/assets/img/斜纹_绿.png");
  margin-top: 2px;
  margin-bottom: -2px;
}
.four {
   background-image: url("~@/assets/img/斜纹_绿.png");
  margin-top: 2px;
  margin-bottom: -2px;
}
.five {
    background-color: red;
  margin-top: 2px;
  margin-bottom: -2px;
}
.six {
  background-color: #f0f0f1;
  margin-top: 2px;
  margin-bottom: -2px;
}
.seven {
  background-color: #abe931;
  margin-top: 2px;
  margin-bottom: -2px;
}
.eight {
  background-color: #abe931;
  margin-top: 2px;
  margin-bottom: -2px;
}
</style>
