<template>
    <div class="divParent">
        <div class="div1"></div>
        <div class="div2">
            <div >
                <td style="padding-right:10px;padding-left:5px">阀门编号：</td>
                <td >{{closeValveInfo.Id}}</td>
                <td style="padding-left:10px">口径：</td>
                <td >{{closeValveInfo.Diameter}}</td>
            </div>
            <div >
                <td style="padding-right:10px;padding-left:5px">地址：</td>
                <td >{{closeValveInfo.Addr}}</td>
            </div>
            <div >
                <td style="padding-right:10px;padding-left:5px">横坐标：</td>
                <td >{{closeValveInfo.X}}</td>
            </div>
            <div >
                <td style="padding-right:10px;padding-left:5px">纵坐标：</td>
                <td >{{closeValveInfo.Y}}</td>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    closeValveInfo: {
      type: Object,
      default: {
        index: 0,
        valveNum: 1,
        caliber: 50,
        address: "",
        x: 0,
        y: 0
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.divParent {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.div1 {
  width: 20px;
  height: 90px;
  background-color: green;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
}
.div2 {
  width: calc(100% - 20px);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  height: 90px;
  justify-content: space-between;
}
</style>
