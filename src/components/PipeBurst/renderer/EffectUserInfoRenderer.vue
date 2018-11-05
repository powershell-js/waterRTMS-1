<template>
    <div >
        <div class="divParent">
            <div class="div1"></div>
            <div class="div2">
            <div >
                <td style="padding-right:10px;padding-left:5px">用户号：</td>
                <td >{{effectUserInfo.UserNum}}</td>
            </div>
            <div >
                <td style="padding-right:10px;padding-left:5px">用户名：</td>
                <td >{{effectUserInfo.UserName}}</td>
            </div>
            <div >
                <td style="padding-right:10px;padding-left:5px">地址：</td>
                <td >{{effectUserInfo.Addr}}</td>
            </div>
        </div>
        </div>
        <div style="background:white;width:100%;height:1px"></div>
    </div>
</template>
<script>
export default {
  props: {
    effectUserInfo: {
      type: Object,
      default: {
        index: 0,
        userNum: "123",
        userName: "你好",
        address: ""
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
  height: 70px;
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
  height: 70px;
  justify-content: space-between;
}
</style>
