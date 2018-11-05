<template>
    <!-- <transition name="msgbox" style="width:'300px'">
      <el-dialog class="dialogClass1" v-on:open="dialogOpen" id="myDialog1" 
      custom-class="hd-crud-dialog" :title="title" 
      :visible.sync="show" v-on:close="dialogClose" 
      :modal-append-to-body="false" 
      :append-to-body="true"
      :close-on-click-modal="false" :top="'0px'" :modal="false"> -->
        <!--  <div class="content-body">
             <table style="width:100%">
                 <table >
                     <td>最大值</td>
                    <td>{{this.max}}</td>
                 </table>
                  <table >
                     <td>最小值</td>
                    <el-input type="text"  v-model="min"></el-input>
                 </table>
                 <table >
                    <td>等级划分</td>
                    <el-select v-on:change="selectChange" v-model="value">
                      <el-option :key="item.label"  
                                  v-for="item in levelData"
                                  :value="item.index"
                                  :label="item.label">
                      </el-option>
                    </el-select>
                 </table>
            </table>
        </div> -->
        <transition name="msgbox" style="width:'300px'">
        <div v-if="show" id="myWindow3" class="msgbox-container3" :class="className" @mousedown="mousedown">
         <table class="headerClass">
            <td style="padding-left:20px">{{title}}</td>
            <el-row style="padding-left:5px;text-align:right">
                <img src="../../static/assets/windowClose.png" style="cursor:pointer;height:29px;width:34px" title="关闭"  v-on:click="cancelBtn">
            </el-row>
          </table>
        <hd-form class="hdForm" ref="hdform" :form="cform"></hd-form>
        <!-- <template slot="footer"> -->
          <el-row class="footer">
            <el-button size="mini" type="primary" @click.native="cancelBtn">{{cancel}}</el-button>
            <el-button size="mini" type="success" @click="successBtn">{{confirm}}</el-button>
          </el-row>
        <!-- </template>  -->
     
      <!-- </el-dialog> -->
        </div>
    </transition>
</template>
<script>
import myAlert from '@/components/js/myAlert'
import { min, max } from '../../static/moment/moment';
export default {
   components:{
   },
  data () {
     var TM = [];
    for (let i = 5; i >0 ; i--) {
      TM.push({ Value: i, Name: i });
    }
    var bind = { TM: TM };
    return {
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
      max:0,
      maxInit:0,
      min:'',
      time1:0,
      time2:0,
      levelMy:5,
      levelData:[
          {label:"5",index:0},
          {label:"4",index:1},
          {label:"3",index:2},
          {label:"2",index:3},
          {label:"1",index:4},
      ],
      value:'5',
       cform: {
        model: {
          _id: "",
          levelMy:5
        },
        rules: {},
        bindings: bind,
        inputs: [
            [
            { title: '最大值', data: 'maxInit', required: false, dataType: 'Number', showType: 'text'}
          ],
           [
            { title: '最小值', data: 'min', required: true, dataType: 'Number', showType: 'text'}
          ],
          [
            {
              title: "分级",
              data: "levelMy",
              required: false,
              dataType: "Number",
              showType: "combo",
              format: "TM"
            }
          ],
        /* 
          [
            { title: '报警范围', data: 'grade', required: false, dataType: 'Number', showType: 'combo',format:"H0031"}
          ],
          [
            { title: '排序', data: 'order', required: true, dataType: 'Number', showType: 'text' }
          ],
          [
            { title: '启用', data: 'status', required: true, dataType: 'Number', showType: 'switch' }
          ] */
        ]
      },
     
    }
  },
  created(){
      this.time1Value =  this.time2Value =  this.initTime;
      console.log(this.time1Value+"  "+this.time2Value)
  },
  watch:{
    
    show (val) {
      if (val) {
         var self = this;
          setTimeout(function(){
              self.$refs.hdform.Set({'maxInit':self.max})//设置初始值
              console.log("最大值")
              console.log(self.max)
          })
        if(!this.hasClass(document.body,"pop-mask")){
          this.addClass(document.body,"pop-mask");
        }
      }else{
        this.removeClass(document.body,"pop-mask");
      }
    }
  },
  beforeMount () {
    //如果已经存在，则阻止出现第二次
    let node = document.querySelector('.msgbox-container3')
    if (node && node.parentNode) {
      node.parentNode.removeChild(node)
       var self = this;
          setTimeout(function(){
              self.$refs.hdform.Set({'maxInit':self.max})//设置初始值
              console.log(self.max)
          })
    }
  },
  methods: {
    dialogClose(){
    },
    dialogOpen(){
      var dialogTemp = document.getElementsByClassName('el-dialog hd-crud-dialog')[0]
      dialogTemp.addEventListener("mousedown",this.mousedown)
      
    },
      selectChange(indexTemp){
      this.levelMy = indexTemp;
    },
     closeDialog(e) {
          this.dialogVisible = false
        },
        mousedown(event) {
          var bool = (event.target== "input");
         console.log(bool)
          this.selectElement = document.getElementById('myWindow3')//document.getElementsByClassName('el-dialog hd-crud-dialog')[0]
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
       this.$refs.hdform.Get().done(R => {
        if (R.maxInit < R.min) {
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
          var myEvent = new CustomEvent('event_name',{
          detail: { type: 'This is title!'},
          });
          myEvent.detail.type = "TimeCompareDraw";
          myEvent.detail.min = R.min;
          myEvent.detail.max = R.maxInit;
          myEvent.detail.level = R.levelMy;
          myEvent.detail.time1 = this.time1;
          myEvent.detail.time2 = this.time2;
          if(window.dispatchEvent){
          window.dispatchEvent(myEvent);
            }else{
                window.fireEvent(myEvent);
            }
            this.show = false;
        }
       })
    },
    cancelBtn () {
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
   InputChange(event){
       this.min = event.target.value;
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
.dialogClass1{
  width: 100%;/*保证dialog在拖拽的时候宽高不发生变化*/
  height: 100%;/**/
}
.msgbox-container3{
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