<template>
    <div class="keduoutbox">
       <div class="koutbox2"><img id="slidingImg2" src="~@/assets/img/时间刻度_10.png" alt=""></div> 
    </div>
</template>
<script>
export default {
   name:"Rulerbottom",
      mounted() {
    let that = this;
    that.LopTime();
    setInterval(function() {
      var mindata = new Date().getHours() * 60 + new Date().getMinutes();
      if (mindata % 15 == 0) {
        that.LopTime();
        console.log(mindata);
      }
    }, 60000); //在生命周期中调用LopTime（）方法
  },
  methods: {
    LopTime() {
      let timer = new Date();
      let hours = timer.getHours();
      let min = timer.getMinutes();
      let total = hours * 60 + min;
      let localnum = parseInt(total / 15);
      let Insetlinelocation =326 + localnum * parseFloat(760 / 96);
        console.log(localnum);
      document.getElementById("slidingImg2").style.left = Insetlinelocation + "px";
     
    },
    
  }
}
</script>
<style lang="scss" scoped>
.keduoutbox {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-end;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 28px;
      width: 1110px;
}

   .koutbox2 {
  width: 1110px;
  height: 28px;
/*   border-bottom: 1px red solid; */
  background-image: url("~@/assets/img/刻度02_03.png");
  background-repeat: no-repeat;
  background-position: 0px 3px;
  position: relative;
}
#slidingImg2 {
  position: relative;
 left: 326px;
}
</style>
