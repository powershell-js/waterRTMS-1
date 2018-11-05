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
export default {
  name: "ListTable",
  data() {
    return {
      stu: [
        {
          name: "1#",
          t1: 0,
          t2: 1,
          t3: 0,
          t4: 1,
          t5: 0,
          t6: 2,
          t7: 3,
          t8: 3,
          t9: 4,
          t10: 4,
          t11: 4,
          t12: 4,
          t13: 4,
          t14: 4,
          t15: 4,
          t16: 4,
          t17: 4,
          t18: 4,
          t19: 4,
          t20: 5,
          t21: 5,
          t22: 3,
          t23: 3,
          t24: 3,
         /*  r1: 1234, */

          r2: 2133,

         /*  r3: 1446, */

          r4: 3332,

         /*  r5: 1234, */

          r6: 2133,

         /*  r7: 1446,

          r8: 3332, */

          r9: 2120,

          r10: 2188,

          r11: 4656,

          r12: 2133,

          r13: 1446,

          r14: 3332,

          r15: 1234,

          r16: 2133,

          r17: 1446,

          r18: 3332,

          r19: 2120,

          r20: 2188,

          r21: 4656,

          /* r22: 1234,

          r23: 4656,

          r24: 1234 */
        },

        {
          t1: 0,
          t2: 2,
          t3: 2,
          t4: 2,
          t5: 0,
          t6: 1,
          t7: 4,
          t8: 4,
          t9: 4,
          t10: 5,
          t11: 3,
          t12: 4,
          t13: 4,
          t14: 4,
          t15: 5,
          t16: 3,
          t17: 4,
          t18: 4,
          t19: 3,
          t20:3,
          t21: 3,
          t22: 3,
          t23: 3,
          t24: 3,
          name: "2#",

          /* r1: 1234, */

          r2: 2133,

          r3: 1446,

          r4: 3332,

        /*   r5: 1234, */

          r6: 2133,

          r7: 1446,

          r8: 3332,

          r9: 2120,

          r10: 2188,

        /*   r11: 4656, */

          r12: 2133,

          r13: 1446,

          r14: 3332,

          r15: 1234,

          /* r16: 2133, */

          r17: 1446,

           r18: 3332,

          /*r19: 2120,

          r20: 2188,

          r21: 4656,

          r22: 1234,

          r23: 4656,

          r24: 1234 */
        },

        {
          t1: 2,
          t2: 1,
          t3: 2,
          t4: 0,
          t5: 0,
          t6: 2,
          t7: 4,
          t8: 4,
          t9: 4,
          t10: 4,
          t11: 5,
          t12: 3,
          t13: 4,
          t14: 4,
          t15: 5,
          t16: 4,
          t17: 4,
          t18: 3,
          t19: 3,
          t20: 3,
          t21: 3,
          t22: 3,
          t23: 3,
          t24: 3,

          name: "3#",

          r1: 1234,

          r2: 2133,

          r3: 1446,

         /*  r4: 3332, */

          /* r5: 1234, */

          r6: 2133,

          r7: 1446,

          r8: 3332,

          r9: 2120,

          r10: 2188,

          r11: 4656,

          /* r12: 2133, */

          r13: 1446,

          r14: 3332,

          r15: 1234,

          r16: 2133,

          r17: 1446,

        /*   r18: 3332,

          r19: 2120,

          r20: 2188,

          r21: 4656,

          r22: 1234,

          r23: 4656,

          r24: 1234 */
        },

        {
          t1: 0,
          t2: 2,
          t3: 2,
          t4: 2,
          t5: 0,
          t6: 1,
          t7: 5,
          t8: 3,
          t9: 4,
          t10:4,
          t11:5,
          t12: 4,
          t13: 4,
          t14: 3,
          t15:3,
          t16: 4,
          t17: 4,
          t18: 4,
          t19: 4,
          /* t20: 2,
          t21: 0,
          t22: 3,
          t23: 2,
          t24: 1, */
          name: "4#",

         /*  r1: 1234, */

          r2: 2133,

          r3: 1446,

          r4: 3332,

          /* r5: 1234, */

          r6: 2133,

          r7: 1446,

         /*  r8: 3332, */

          r9: 2120,

          r10: 2188,

          r11: 4656,

          r12: 2133,

          r13: 1446,

         /*  r14: 3332,

          r15: 1234, */

          r16: 2133,

          r17: 1446,

          r18: 3332,

          r19: 2120,

          /* r20: 2188,

          r21: 4656,

          r22: 1234,

          r23: 4656,

          r24: 1234 */
        },

        {
          t1: 2,
          t2:0,
          t3: 2,
          t4: 0,
          t5: 1,
          t6: 2,
          t7: 2,
          t8: 4,
          t9: 4,
          t10:4,
          t11: 4,
          t12: 3,
          t13: 5,
          t14: 5,
          t15: 4,
          t16: 4,
          t17: 4,
          t18: 3,
          t19: 3,
          t20: 3,
          t21: 3,
          t22: 3,
          t23: 3,
          t24: 3,
          name: "5#",

          r1: 1234,

          /* r2: 2133, */

          r3: 1446,

         /*  r4: 3332, */

          r5: 1234,

          r6: 2133,

          r7: 1446,

          r8: 3332,

          r9: 2120,

          r10: 2188,

          r11: 4656,

          /* r12: 2133, */

          r13: 1446,

          r14: 3332,

          r15: 1234,

          r16: 2133,

          r17: 1446,

          /* r18: 3332,

          r19: 2120,

          r20: 2188,

          r21: 4656,

          r22: 1234,

          r23: 4656,

          r24: 1234 */
        },

        {
          t1: 0,
          t2: 0,
          t3: 2,
          t4: 1,
          t5: 2,
          t6: 2,
          t7: 5,
          t8:4,
          t9: 4,
          t10:4,
          t11: 3,
          t12: 3,
          t13: 4,
          t14: 4,
          t15: 5,
          t16: 4,
          t17: 3,
          t18: 3,
          t19: 4,
          t20: 4,
          t21: 4,
          t22: 4,
          t23: 4,
          t24: 3,
          name: "6#",

          /* r1: 1234,

          r2: 2133, */

          r3: 1446,

          r4: 3332,

          r5: 1234,

          r6: 2133,

          r7: 1446,

          r8: 3332,

          r9: 2120,

          r10: 2188,

          /* r11: 4656,

          r12: 2133, */

          r13: 1446,

          r14: 3332,

          r15: 1234,

          r16: 2133,

          /* r17: 1446,

          r18: 3332, */

          r19: 2120,

          r20: 2188,

          r21: 4656,

          r22: 1234,

          r23: 4656,

          /* r24: 1234 */
        },
         {
          t1: 2,
          t2:0,
          t3: 2,
          t4: 0,
          t5: 1,
          t6: 2,
          t7: 2,
          t8: 4,
          t9: 4,
          t10:4,
          t11: 4,
          t12: 3,
          t13: 5,
          t14: 5,
          t15: 4,
          t16: 4,
          t17: 4,
          t18: 3,
          t19: 3,
          t20: 3,
          t21: 3,
          t22: 3,
          t23: 3,
          t24: 3,
          name: "7#",

          r1: 1234,

          /* r2: 2133, */

          r3: 1446,

         /*  r4: 3332, */

          r5: 1234,

          r6: 2133,

          r7: 1446,

          r8: 3332,

          r9: 2120,

          r10: 2188,

          r11: 4656,

          /* r12: 2133, */

          r13: 1446,

          r14: 3332,

          r15: 1234,

          r16: 2133,

          r17: 1446,

          /* r18: 3332,

          r19: 2120,

          r20: 2188,

          r21: 4656,

          r22: 1234,

          r23: 4656,

          r24: 1234 */
        },

        {
          t1: 0,
          t2: 0,
          t3: 2,
          t4: 1,
          t5: 2,
          t6: 2,
          t7: 5,
          t8:4,
          t9: 4,
          t10:4,
          t11: 3,
          t12: 3,
          t13: 4,
          t14: 4,
          t15: 5,
          t16: 4,
          t17: 3,
          t18: 3,
          t19: 4,
          t20: 4,
          t21: 4,
          t22: 4,
          t23: 4,
          t24: 3,
          name: "8#",

          /* r1: 1234,

          r2: 2133, */

          r3: 1446,

          r4: 3332,

          r5: 1234,

          r6: 2133,

          r7: 1446,

          r8: 3332,

          r9: 2120,

          r10: 2188,

          /* r11: 4656,

          r12: 2133, */

          r13: 1446,

          r14: 3332,

          r15: 1234,

          r16: 2133,

          /* r17: 1446,

          r18: 3332, */

          r19: 2120,

          r20: 2188,

          r21: 4656,

          r22: 1234,

          r23: 4656,

          /* r24: 1234 */
        }
      ]
    };
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
  color:#6e7b8b;

}
table {
  /* min-height: 25px; */
  border-collapse: collapse;
  width:100%;
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
  width: 32px;
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
  /* background-color: rgb(113, 148, 148); */
  background-image: url("~@/assets/img/斜纹_透明.png");
    margin-top: 2px;
  margin-bottom: -2px;
}
.two {
  background-image: url('~@/assets/img/斜纹_红.png');
    margin-top: 2px;
  margin-bottom: -2px;
}
.three {
  background-image: url("~@/assets/img/斜纹_绿.png");
  margin-top: 2px;
  margin-bottom: -2px;
}
.four {
  background-color: #f0f0f1;
    margin-top: 2px;
  margin-bottom: -2px;
}
.five {
  background-color: #abe931;
    margin-top: 2px;
  margin-bottom: -2px;
}
.six {
  background-color: red;
    margin-top: 2px;
  margin-bottom: -2px;
}
</style>
