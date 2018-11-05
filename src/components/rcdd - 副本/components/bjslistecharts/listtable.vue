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
    setInterval(function() {
      var mindata = new Date().getHours() * 60 + new Date().getMinutes();
      if (mindata % 15 == 0) {
        that.request();
        console.log(mindata);
      }
    }, 60000);
    /*     setInterval(function() {
      that.request();
    },6000); */
  },

methods:{
    request() {
      var WaterNum = "21312323";
    var object = { WaterNum };
    var _this = this;
    axios
      .post(
        urlClass.axiosUrlRC + "GetWaterPump",
        JSON.stringify(object),
        {
                headers: { "Content-Type": "application/json;" }
              }
      )
      .then(res => {
        var _this = this;
        var bjslistshow=res.data
        var Pump1 = res.data.Pump1;
        var name = "1#";
        var t1 = Pump1[0].OpenCloseType;
        var t2 = Pump1[1].OpenCloseType;
        var t3 = Pump1[2].OpenCloseType;
        var t4 = Pump1[3].OpenCloseType;
        var t5 = Pump1[4].OpenCloseType;
        var t6 = Pump1[5].OpenCloseType;
        var t7 = Pump1[6].OpenCloseType;
        var t8 = Pump1[7].OpenCloseType;
        var t9 = Pump1[8].OpenCloseType;
        var t10 = Pump1[9].OpenCloseType;
        var t11 = Pump1[10].OpenCloseType;
        var t12 = Pump1[11].OpenCloseType;
        var t13 = Pump1[12].OpenCloseType;
        var t14 = Pump1[13].OpenCloseType;
        var t15 = Pump1[14].OpenCloseType;
        var t16 = Pump1[15].OpenCloseType;
        var t17 = Pump1[16].OpenCloseType;
        var t18 = Pump1[17].OpenCloseType;
        var t19 = Pump1[18].OpenCloseType;
        var t20 = Pump1[19].OpenCloseType;
        var t21 = Pump1[20].OpenCloseType;
        var t22 = Pump1[21].OpenCloseType;
        var t23 = Pump1[22].OpenCloseType;
        var t24 = Pump1[23].OpenCloseType;
        var r1 = Pump1[0].Speed;
        var r2 = Pump1[1].Speed;
        var r3 = Pump1[2].Speed;
        var r4 = Pump1[3].Speed;
        var r5 = Pump1[4].Speed;
        var r6 = Pump1[5].Speed;
        var r7 = Pump1[6].Speed;
        var r8 = Pump1[7].Speed;
        var r9 = Pump1[8].Speed;
        var r10 = Pump1[9].Speed;
        var r11 = Pump1[10].Speed;
        var r12 = Pump1[11].Speed;
        var r13 = Pump1[12].Speed;
        var r14 = Pump1[13].Speed;
        var r15 = Pump1[14].Speed;
        var r16 = Pump1[15].Speed;
        var r17 = Pump1[16].Speed;
        var r18 = Pump1[17].Speed;
        var r19 = Pump1[18].Speed;
        var r20 = Pump1[19].Speed;
        var r21 = Pump1[20].Speed;
        var r22 = Pump1[21].Speed;
        var r23 = Pump1[22].Speed;
        var r24 = Pump1[23].Speed;
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
        var Pump2 = res.data.Pump2;
        var name = "2#";
        var t1 = Pump2[0].OpenCloseType;
        var t2 = Pump2[1].OpenCloseType;
        var t3 = Pump2[2].OpenCloseType;
        var t4 = Pump2[3].OpenCloseType;
        var t5 = Pump2[4].OpenCloseType;
        var t6 = Pump2[5].OpenCloseType;
        var t7 = Pump2[6].OpenCloseType;
        var t8 = Pump2[7].OpenCloseType;
        var t9 = Pump2[8].OpenCloseType;
        var t10 = Pump2[9].OpenCloseType;
        var t11 = Pump2[10].OpenCloseType;
        var t12 = Pump2[11].OpenCloseType;
        var t13 = Pump2[12].OpenCloseType;
        var t14 = Pump2[13].OpenCloseType;
        var t15 = Pump2[14].OpenCloseType;
        var t16 = Pump2[15].OpenCloseType;
        var t17 = Pump2[16].OpenCloseType;
        var t18 = Pump2[17].OpenCloseType;
        var t19 = Pump2[18].OpenCloseType;
        var t20 = Pump2[19].OpenCloseType;
        var t21 = Pump2[20].OpenCloseType;
        var t22 = Pump2[21].OpenCloseType;
        var t23 = Pump2[22].OpenCloseType;
        var t24 = Pump2[23].OpenCloseType;
        var r1 = Pump2[0].Speed;
        var r2 = Pump2[1].Speed;
        var r3 = Pump2[2].Speed;
        var r4 = Pump2[3].Speed;
        var r5 = Pump2[4].Speed;
        var r6 = Pump2[5].Speed;
        var r7 = Pump2[6].Speed;
        var r8 = Pump2[7].Speed;
        var r9 = Pump2[8].Speed;
        var r10 = Pump2[9].Speed;
        var r11 = Pump2[10].Speed;
        var r12 = Pump2[11].Speed;
        var r13 = Pump2[12].Speed;
        var r14 = Pump2[13].Speed;
        var r15 = Pump2[14].Speed;
        var r16 = Pump2[15].Speed;
        var r17 = Pump2[16].Speed;
        var r18 = Pump2[17].Speed;
        var r19 = Pump2[18].Speed;
        var r20 = Pump2[19].Speed;
        var r21 = Pump2[20].Speed;
        var r22 = Pump2[21].Speed;
        var r23 = Pump2[22].Speed;
        var r24 = Pump2[23].Speed;
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

        var Pump3 = res.data.Pump3;
        var name = "3#";
        var t1 = Pump3[0].OpenCloseType;
        var t2 = Pump3[1].OpenCloseType;
        var t3 = Pump3[2].OpenCloseType;
        var t4 = Pump3[3].OpenCloseType;
        var t5 = Pump3[4].OpenCloseType;
        var t6 = Pump3[5].OpenCloseType;
        var t7 = Pump3[6].OpenCloseType;
        var t8 = Pump3[7].OpenCloseType;
        var t9 = Pump3[8].OpenCloseType;
        var t10 = Pump3[9].OpenCloseType;
        var t11 = Pump3[10].OpenCloseType;
        var t12 = Pump3[11].OpenCloseType;
        var t13 = Pump3[12].OpenCloseType;
        var t14 = Pump3[13].OpenCloseType;
        var t15 = Pump3[14].OpenCloseType;
        var t16 = Pump3[15].OpenCloseType;
        var t17 = Pump3[16].OpenCloseType;
        var t18 = Pump3[17].OpenCloseType;
        var t19 = Pump3[18].OpenCloseType;
        var t20 = Pump3[19].OpenCloseType;
        var t21 = Pump3[20].OpenCloseType;
        var t22 = Pump3[21].OpenCloseType;
        var t23 = Pump3[22].OpenCloseType;
        var t24 = Pump3[23].OpenCloseType;
        var r1 = Pump3[0].Speed;
        var r2 = Pump3[1].Speed;
        var r3 = Pump3[2].Speed;
        var r4 = Pump3[3].Speed;
        var r5 = Pump3[4].Speed;
        var r6 = Pump3[5].Speed;
        var r7 = Pump3[6].Speed;
        var r8 = Pump3[7].Speed;
        var r9 = Pump3[8].Speed;
        var r10 = Pump3[9].Speed;
        var r11 = Pump3[10].Speed;
        var r12 = Pump3[11].Speed;
        var r13 = Pump3[12].Speed;
        var r14 = Pump3[13].Speed;
        var r15 = Pump3[14].Speed;
        var r16 = Pump3[15].Speed;
        var r17 = Pump3[16].Speed;
        var r18 = Pump3[17].Speed;
        var r19 = Pump3[18].Speed;
        var r20 = Pump3[19].Speed;
        var r21 = Pump3[20].Speed;
        var r22 = Pump3[21].Speed;
        var r23 = Pump3[22].Speed;
        var r24 = Pump3[23].Speed;
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

        var Pump4 = res.data.Pump4;
        var name = "4#";
        var t1 = Pump4[0].OpenCloseType;
        var t2 = Pump4[1].OpenCloseType;
        var t3 = Pump4[2].OpenCloseType;
        var t4 = Pump4[3].OpenCloseType;
        var t5 = Pump4[4].OpenCloseType;
        var t6 = Pump4[5].OpenCloseType;
        var t7 = Pump4[6].OpenCloseType;
        var t8 = Pump4[7].OpenCloseType;
        var t9 = Pump4[8].OpenCloseType;
        var t10 = Pump4[9].OpenCloseType;
        var t11 = Pump4[10].OpenCloseType;
        var t12 = Pump4[11].OpenCloseType;
        var t13 = Pump4[12].OpenCloseType;
        var t14 = Pump4[13].OpenCloseType;
        var t15 = Pump4[14].OpenCloseType;
        var t16 = Pump4[15].OpenCloseType;
        var t17 = Pump4[16].OpenCloseType;
        var t18 = Pump4[17].OpenCloseType;
        var t19 = Pump4[18].OpenCloseType;
        var t20 = Pump4[19].OpenCloseType;
        var t21 = Pump4[20].OpenCloseType;
        var t22 = Pump4[21].OpenCloseType;
        var t23 = Pump4[22].OpenCloseType;
        var t24 = Pump4[23].OpenCloseType;
        var r1 = Pump4[0].Speed;
        var r2 = Pump4[1].Speed;
        var r3 = Pump4[2].Speed;
        var r4 = Pump4[3].Speed;
        var r5 = Pump4[4].Speed;
        var r6 = Pump4[5].Speed;
        var r7 = Pump4[6].Speed;
        var r8 = Pump4[7].Speed;
        var r9 = Pump4[8].Speed;
        var r10 = Pump4[9].Speed;
        var r11 = Pump4[10].Speed;
        var r12 = Pump4[11].Speed;
        var r13 = Pump4[12].Speed;
        var r14 = Pump4[13].Speed;
        var r15 = Pump4[14].Speed;
        var r16 = Pump4[15].Speed;
        var r17 = Pump4[16].Speed;
        var r18 = Pump4[17].Speed;
        var r19 = Pump4[18].Speed;
        var r20 = Pump4[19].Speed;
        var r21 = Pump4[20].Speed;
        var r22 = Pump4[21].Speed;
        var r23 = Pump4[22].Speed;
        var r24 = Pump4[23].Speed;
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

        var Pump5 = res.data.Pump5;
        var name = "5#";
        var t1 = Pump5[0].OpenCloseType;
        var t2 = Pump5[1].OpenCloseType;
        var t3 = Pump5[2].OpenCloseType;
        var t4 = Pump5[3].OpenCloseType;
        var t5 = Pump5[4].OpenCloseType;
        var t6 = Pump5[5].OpenCloseType;
        var t7 = Pump5[6].OpenCloseType;
        var t8 = Pump5[7].OpenCloseType;
        var t9 = Pump5[8].OpenCloseType;
        var t10 = Pump5[9].OpenCloseType;
        var t11 = Pump5[10].OpenCloseType;
        var t12 = Pump5[11].OpenCloseType;
        var t13 = Pump5[12].OpenCloseType;
        var t14 = Pump5[13].OpenCloseType;
        var t15 = Pump5[14].OpenCloseType;
        var t16 = Pump5[15].OpenCloseType;
        var t17 = Pump5[16].OpenCloseType;
        var t18 = Pump5[17].OpenCloseType;
        var t19 = Pump5[18].OpenCloseType;
        var t20 = Pump5[19].OpenCloseType;
        var t21 = Pump5[20].OpenCloseType;
        var t22 = Pump5[21].OpenCloseType;
        var t23 = Pump5[22].OpenCloseType;
        var t24 = Pump5[23].OpenCloseType;
        var r1 = Pump5[0].Speed;
        var r2 = Pump5[1].Speed;
        var r3 = Pump5[2].Speed;
        var r4 = Pump5[3].Speed;
        var r5 = Pump5[4].Speed;
        var r6 = Pump5[5].Speed;
        var r7 = Pump5[6].Speed;
        var r8 = Pump5[7].Speed;
        var r9 = Pump5[8].Speed;
        var r10 = Pump5[9].Speed;
        var r11 = Pump5[10].Speed;
        var r12 = Pump5[11].Speed;
        var r13 = Pump5[12].Speed;
        var r14 = Pump5[13].Speed;
        var r15 = Pump5[14].Speed;
        var r16 = Pump5[15].Speed;
        var r17 = Pump5[16].Speed;
        var r18 = Pump5[17].Speed;
        var r19 = Pump5[18].Speed;
        var r20 = Pump5[19].Speed;
        var r21 = Pump5[20].Speed;
        var r22 = Pump5[21].Speed;
        var r23 = Pump5[22].Speed;
        var r24 = Pump5[23].Speed;
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
        var Pump6 = res.data.Pump6;
        var name = "6#";
        var t1 = Pump6[0].OpenCloseType;
        var t2 = Pump6[1].OpenCloseType;
        var t3 = Pump6[2].OpenCloseType;
        var t4 = Pump6[3].OpenCloseType;
        var t5 = Pump6[4].OpenCloseType;
        var t6 = Pump6[5].OpenCloseType;
        var t7 = Pump6[6].OpenCloseType;
        var t8 = Pump6[7].OpenCloseType;
        var t9 = Pump6[8].OpenCloseType;
        var t10 = Pump6[9].OpenCloseType;
        var t11 = Pump6[10].OpenCloseType;
        var t12 = Pump6[11].OpenCloseType;
        var t13 = Pump6[12].OpenCloseType;
        var t14 = Pump6[13].OpenCloseType;
        var t15 = Pump6[14].OpenCloseType;
        var t16 = Pump6[15].OpenCloseType;
        var t17 = Pump6[16].OpenCloseType;
        var t18 = Pump6[17].OpenCloseType;
        var t19 = Pump6[18].OpenCloseType;
        var t20 = Pump6[19].OpenCloseType;
        var t21 = Pump6[20].OpenCloseType;
        var t22 = Pump6[21].OpenCloseType;
        var t23 = Pump6[22].OpenCloseType;
        var t24 = Pump6[23].OpenCloseType;
        var r1 = Pump6[0].Speed;
        var r2 = Pump6[1].Speed;
        var r3 = Pump6[2].Speed;
        var r4 = Pump6[3].Speed;
        var r5 = Pump6[4].Speed;
        var r6 = Pump6[5].Speed;
        var r7 = Pump6[6].Speed;
        var r8 = Pump6[7].Speed;
        var r9 = Pump6[8].Speed;
        var r10 = Pump6[9].Speed;
        var r11 = Pump6[10].Speed;
        var r12 = Pump6[11].Speed;
        var r13 = Pump6[12].Speed;
        var r14 = Pump6[13].Speed;
        var r15 = Pump6[14].Speed;
        var r16 = Pump6[15].Speed;
        var r17 = Pump6[16].Speed;
        var r18 = Pump6[17].Speed;
        var r19 = Pump6[18].Speed;
        var r20 = Pump6[19].Speed;
        var r21 = Pump6[20].Speed;
        var r22 = Pump6[21].Speed;
        var r23 = Pump6[22].Speed;
        var r24 = Pump6[23].Speed;
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

        var Pump7 = res.data.Pump7;
        var name = "7#";
        var t1 = Pump7[0].OpenCloseType;
        var t2 = Pump7[1].OpenCloseType;
        var t3 = Pump7[2].OpenCloseType;
        var t4 = Pump7[3].OpenCloseType;
        var t5 = Pump7[4].OpenCloseType;
        var t6 = Pump7[5].OpenCloseType;
        var t7 = Pump7[6].OpenCloseType;
        var t8 = Pump7[7].OpenCloseType;
        var t9 = Pump7[8].OpenCloseType;
        var t10 = Pump7[9].OpenCloseType;
        var t11 = Pump7[10].OpenCloseType;
        var t12 = Pump7[11].OpenCloseType;
        var t13 = Pump7[12].OpenCloseType;
        var t14 = Pump7[13].OpenCloseType;
        var t15 = Pump7[14].OpenCloseType;
        var t16 = Pump7[15].OpenCloseType;
        var t17 = Pump7[16].OpenCloseType;
        var t18 = Pump7[17].OpenCloseType;
        var t19 = Pump7[18].OpenCloseType;
        var t20 = Pump7[19].OpenCloseType;
        var t21 = Pump7[20].OpenCloseType;
        var t22 = Pump7[21].OpenCloseType;
        var t23 = Pump7[22].OpenCloseType;
        var t24 = Pump7[23].OpenCloseType;

        var r1 = Pump7[0].Speed;
        var r2 = Pump7[1].Speed;
        var r3 = Pump7[2].Speed;
        var r4 = Pump7[3].Speed;
        var r5 = Pump7[4].Speed;
        var r6 = Pump7[5].Speed;
        var r7 = Pump7[6].Speed;
        var r8 = Pump7[7].Speed;
        var r9 = Pump7[8].Speed;
        var r10 = Pump7[9].Speed;
        var r11 = Pump7[10].Speed;
        var r12 = Pump7[11].Speed;
        var r13 = Pump7[12].Speed;
        var r14 = Pump7[13].Speed;
        var r15 = Pump7[14].Speed;
        var r16 = Pump7[15].Speed;
        var r17 = Pump7[16].Speed;
        var r18 = Pump7[17].Speed;
        var r19 = Pump7[18].Speed;
        var r20 = Pump7[19].Speed;
        var r21 = Pump7[20].Speed;
        var r22 = Pump7[21].Speed;
        var r23 = Pump7[22].Speed;
        var r24 = Pump7[23].Speed;
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

        var Pump8 = res.data.Pump8;
        var name = "8#";
        var t1 = Pump8[0].OpenCloseType;
        var t2 = Pump8[1].OpenCloseType;
        var t3 = Pump8[2].OpenCloseType;
        var t4 = Pump8[3].OpenCloseType;
        var t5 = Pump8[4].OpenCloseType;
        var t6 = Pump8[5].OpenCloseType;
        var t7 = Pump8[6].OpenCloseType;
        var t8 = Pump8[7].OpenCloseType;
        var t9 = Pump8[8].OpenCloseType;
        var t10 = Pump8[9].OpenCloseType;
        var t11 = Pump8[10].OpenCloseType;
        var t12 = Pump8[11].OpenCloseType;
        var t13 = Pump8[12].OpenCloseType;
        var t14 = Pump8[13].OpenCloseType;
        var t15 = Pump8[14].OpenCloseType;
        var t16 = Pump8[15].OpenCloseType;
        var t17 = Pump8[16].OpenCloseType;
        var t18 = Pump8[17].OpenCloseType;
        var t19 = Pump8[18].OpenCloseType;
        var t20 = Pump8[19].OpenCloseType;
        var t21 = Pump8[20].OpenCloseType;
        var t22 = Pump8[21].OpenCloseType;
        var t23 = Pump8[22].OpenCloseType;
        var t24 = Pump8[23].OpenCloseType;
        var r1 = Pump8[0].Speed;
        var r2 = Pump8[1].Speed;
        var r3 = Pump8[2].Speed;
        var r4 = Pump8[3].Speed;
        var r5 = Pump8[4].Speed;
        var r6 = Pump8[5].Speed;
        var r7 = Pump8[6].Speed;
        var r8 = Pump8[7].Speed;
        var r9 = Pump8[8].Speed;
        var r10 = Pump8[9].Speed;
        var r11 = Pump8[10].Speed;
        var r12 = Pump8[11].Speed;
        var r13 = Pump8[12].Speed;
        var r14 = Pump8[13].Speed;
        var r15 = Pump8[14].Speed;
        var r16 = Pump8[15].Speed;
        var r17 = Pump8[16].Speed;
        var r18 = Pump8[17].Speed;
        var r19 = Pump8[18].Speed;
        var r20 = Pump8[19].Speed;
        var r21 = Pump8[20].Speed;
        var r22 = Pump8[21].Speed;
        var r23 = Pump8[22].Speed;
        var r24 = Pump8[23].Speed;
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
