<template>
      <transition name="msgbox" >
     <!--  <el-dialog class="dialogClass" v-on:open="dialogOpen" id="myDialog" custom-class="hd-crud-dialog" 
      :title="title" :visible.sync="show" v-on:close="dialogClose"
      :modal-append-to-body="false" 
      :append-to-body="true"
      :close-on-click-modal="false" :top="'0px'" :modal="false"> -->
      <div v-if="show" id="myWindow2" class="msgbox-container2" :class="className" @mousedown="mousedown">
         <table class="headerClass">
            <td style="padding-left:20px">{{title}}</td>
            <el-row style="padding-left:5px;text-align:right">
                <img src="../../static/assets/windowClose.png" style="cursor:pointer;height:29px;width:34px" title="关闭"  v-on:click="cancelBtn">
            </el-row>
          </table>
        <hd-form class="hdForm" ref="hdform" :form="cform"></hd-form>
       <!--  <template slot="footer"> -->
         <el-row class="footer">
            <el-button size="mini" type="primary" @click.native="cancelBtn">{{cancel}}</el-button>
            <el-button size="mini" type="success" @click="successBtn">{{confirm}}</el-button>
         </el-row>
          
         <!-- </template>  -->
      </div>
    <!-- </el-dialog> -->
  </transition>
</template>
<script>
import myAlert from '@/components/js/myAlert'
import BaseSelect from '@/components/BaseSelect/BaseSelect'
export default {
   components:{
     BaseSelect
   },
  data () {
     var TM = [];
    for (let i = 0; i < 24; i++) {
      TM.push({ Value: i, Name: i + "点" });
    }
    var bind = { TM: TM };
    return {
      timeDisplay:true,
      show: false,
      title: '提示',
      content: '',
      confirm: '确定',
      cancel:'',
      className:'',
      listData:[],
      selectElement: '',
      dialogVisible:false,
      initTime:0,
      initTimeLabel:'0',
      tim1Label:'0',
      time2Label:'0',
      time1Value:0,
      time2Value:0,
      showObjectTime1:{label:'',value:0},
      showObjectTime2:{label:'',value:0},
       cform: {
        model: {
          _id: ""
        },
        rules: {},
        bindings: bind,
        inputs: [
          [
            {
              title: "时间1",
              data: "time1Value",
              required: false,
              dataType: "Number",
              showType: "combo",
              format: "TM"
            }
          ],
          [
            {
              title: "时间2",
              data: "time2Value",
              required: false,
              dataType: "Number",
              showType: "combo",
              format: "TM"
            }
          ],
        /*   [
            { title: '方案编码', data: 'code', required: false, dataType: 'Number', showType: 'text'}
          ],
          [
            { title: '报警范围', data: 'grade', required: false, dataType: 'Number', showType: 'combo',format:"H0031"}
          ],
          [
            { title: '排序', data: 'order', required: true, dataType: 'Number', showType: 'text' }
          ],
          [
            { title: '启用', data: 'status', required: true, dataType: 'Number', showType: 'switch'}
          ] */
        ]
      },
      listTime:[
          {label:"0点",value:0},
          {label:"1点",value:1},
          {label:"2点",value:2},
          {label:"3点",value:3},
          {label:"4点",value:4},
          {label:"5点",value:5},
          {label:"6点",value:6},
          {label:"7点",value:7},
          {label:"8点",value:8},
          {label:"9点",value:9},
          {label:"10点",value:10},
          {label:"11点",value:11},
          {label:"12点",value:12},
          {label:"13点",value:13},
          {label:"14点",value:14},
          {label:"15点",value:15},
          {label:"16点",value:16},
          {label:"17点",value:17},
          {label:"18点",value:18},
          {label:"19点",value:19},
          {label:"20点",value:20},
          {label:"21点",value:21},
          {label:"22点",value:22},
          {label:"23点",value:23}
        ],
    }
  },
  created(){
      this.time1Value =  this.time2Value =  this.initTime;
      this.time1Label = this.time2Label = this.initTimeLabel;
  },
  mounted(){
    window.addEventListener("event_name", this.myEventListener);
  },
  watch:{
    show (val) {
      if (val) {
        if(!this.hasClass(document.body,"pop-mask")){
          this.addClass(document.body,"pop-mask");
           var self = this;
            setTimeout(function(){//渲染完成之前需要加setTimeOut,否则会找不到组件的方法
              self.$refs.hdform.Set({'time1Value':self.initTime})//设置初始值
              self.$refs.hdform.Set({'time2Value':self.initTime})
            })
        }
      }else{
        this.removeClass(document.body,"pop-mask");
      }
    }
  },
  beforeMount () {
    //如果已经存在，则阻止出现第二次
    let node = document.querySelector('.msgbox-container2')
    if (node && node.parentNode) {
       var self = this;
      setTimeout(function(){//渲染完成之前需要加setTimeOut,否则会找不到组件的方法
        self.$refs.hdform.Set({'time1Value':self.initTime})//设置初始值
        self.$refs.hdform.Set({'time2Value':self.initTime})
      })
      node.parentNode.removeChild(node)
    }
  },
  methods: {
     myEventListener(event) {
      var type = event.detail.type;
      var data = event.detail.data;
      if (type == "MyClose") {
        this.show = false;
      }
    },
    dialogClose(){
      var myEvent = new CustomEvent('event_name',{
      detail: { type: 'This is title!'},
      });
      myEvent.detail.type = "CompareWindowClose";
      if(window.dispatchEvent){
       window.dispatchEvent(myEvent);
        }else{
            window.fireEvent(myEvent);
        }
    },
    dialogOpen(){
      //var dialogTemp = document.getElementById("myDialog");
       var node = document.getElementsByClassName('el-dialog hd-crud-dialog')[0]
        node.addEventListener("mousedown",this.mousedown)
    },
     closeDialog(e) {
          this.dialogVisible = false
        },
        mousedown(event) {
         
          this.selectElement = document.getElementById("myWindow2")//document.getElementsByClassName('el-dialog hd-crud-dialog')[0]//
          {
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
      },
    successBtn () {
     /*    if(this.time1Value==this.time2Value)
        {
             myAlert.alert("请选择不同的时间进行对比");
        }
      var myEvent = new CustomEvent('event_name',{
      detail: { type: 'This is title!'},
      });
      myEvent.detail.type = "TimeCompare";
      myEvent.detail.time1 = this.time1Value;
      myEvent.detail.time2 = this.time2Value;
      myEvent.detail.data = "";
      if(window.dispatchEvent){
       window.dispatchEvent(myEvent);
        }else{
            window.fireEvent(myEvent);
        } */
        this.$refs.hdform.Get().done(R => {
        if (R.time1Value == R.time2Value) {
          this.$alert('请输入正确的最小值', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
        }
        else
        {
          var myEvent = new CustomEvent("event_name", {
            detail: { type: "This is title!" }
          });
          myEvent.detail.type = "TimeCompare";
          myEvent.detail.time1 = R.time1Value;
          myEvent.detail.time2 = R.time2Value;
          myEvent.detail.data = "";
          if (window.dispatchEvent) {
            window.dispatchEvent(myEvent);
          } else {
            window.fireEvent(myEvent);
          }
        }
       
      });
    },
    cancelBtn () {
      
       var myEvent = new CustomEvent('event_name',{
      detail: { type: 'This is title!'},
      });
      myEvent.detail.type = "CompareWindowClose";
      if(window.dispatchEvent){
       window.dispatchEvent(myEvent);
        }else{
            window.fireEvent(myEvent);
        }
        this.show = false;
    },
    addClass(obj, cls){
      var obj_class = obj.className,
          blank = (obj_class != '') ? ' ' : '';
      var added = obj_class + blank + cls;
      obj.className = added;
    },
    removeClass(obj, cls){
      var obj_class = ' '+obj.className+' ';
      obj_class = obj_class.replace(/(\s+)/gi, ' ');
      var removed = obj_class.replace(' '+cls+' ', ' ');
      removed = removed.replace(/(^\s+)|(\s+$)/g, '');
      obj.className = removed;//替换原来的 class.
    },
    hasClass(obj, cls){
      var obj_class = obj.className,
          obj_class_lst = obj_class.split(/\s+/);
      var x = 0;
      for(x in obj_class_lst) {
        if(obj_class_lst[x] == cls) {
            return true;
        }
      }
      return false;
    },
    selectItem(myItem){
      alert(myItem.ElementId);
    },
     selectChange(event){
      if(event.target.id=="time1")
        this.time1Value = event.target.value;
      else if(event.target.id=="time2")
        this.time2Value = event.target.value;
    }
  }
}
</script>
<style lang="scss" scoped>
.hdForm{
  padding-top: 10px;
}
.headerClass{
    vertical-align: middle;
    height: 40px;
    width: 100%;
    font-size: 13px;
    background: #F5f8f8;
}
.dialogClass{
  width: 100%;/*保证dialog在拖拽的时候宽高不发生变化*/
  height: 100%;/**/
}
.msgbox-container2{
  position: absolute;
  top:50%;
  left:50%;
  width: 20%;
  background: #fff;
  color: #000;
  transform:translate(-50%,-50%) scale(1, 1);
}
.footer {
    width: 100%;
    height: 64px;
    text-align:right;
    vertical-align: middle;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
  }
.msgbox-enter,.msgbox-leave-to{
  -webkit-transform:  translate(-50%,-50%) scale(0,0);
}
.msgbox-enter-active,.msgbox-leave-active{
  -webkit-transition: all .3s;
  transition: all .3s;
}
.msgbox-enter-to,.msgbox-leave{
    -webkit-transform:  translate(-50%,-50%) scale(1,1);
}
</style>