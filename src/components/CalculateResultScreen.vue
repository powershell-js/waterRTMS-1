<template>
    <transition name="msgbox">
      <div v-if="show"  class="msgbox-container1" :class="className" id="myWindow1" @mousedown="mousedown">
        <!-- <header >{{title}}</header> -->
         <table class="headerClass">
            <td style="padding-left:20px">{{title}}</td>
            <el-row style="padding-left:5px;text-align:right">
                <img src="../../static/assets/windowClose.png" style="cursor:pointer;height:29px;width:34px" title="关闭"  v-on:click="cancelBtn">
            </el-row>
          </table>
       <!--  <div class="content-body">
          <div>
            <span>
            <label>压力变化最大值</label>
            <input v-model="resultIntervalData.MaxPressure" id="myMaxPressure">
           </span>
            <span>
               <label>压力变化最小值</label>
               <input v-model="resultIntervalData.MinPressure" id="myMinPressure">
           </span>
          </div>
          <div>
              <span>
               <label>流量变化最大值</label>
               <input v-model="resultIntervalData.MaxFlow" id="myMaxFlow">
           </span>
            <span>
               <label>流量变化最小值</label>
               <input v-model="resultIntervalData.MinFlow" id="myMinFlow">
           </span>
          </div>
            <div>
              <span>
               <label>流速变化最大值</label>
               <input v-model="resultIntervalData.MaxStrength" id="myMaxStrength">
           </span>
            <span>
               <label>流速变化最小值</label>
               <input v-model="resultIntervalData.MinStrength" id="myMinStrength">
           </span>
            </div>
            <div>
              <span>
                <label>等级划分</label>
                <select v-on:change="selectChange">
                  <option :key="item.label"  v-for="item in levelData">{{item.label}}</option>
                </select>
              </span>
            </div>
        </div> -->

        <hd-form class="hdForm" ref="hdform" :form="cform"></hd-form>
        <!-- <footer>
          <a v-if="cancel" href="javascript:;" @click="cancelBtn" class="button">{{cancel}}</a>
          <a href="javascript:;" @click="successBtn" class="button">{{confirm}}</a>
        </footer> -->
        <el-row class="footer">
            <el-button size="mini" type="primary" @click.native="cancelBtn">{{cancel}}</el-button>
            <el-button size="mini" type="success" @click="successBtn">{{confirm}}</el-button>
         </el-row>
      
      </div>
    </transition>
</template>
<script>
export default {
     props: {
         
     },
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
      levelData:[
          {label:"5"},
          {label:"4"},
          {label:"3"},
          {label:"2"},
          {label:"1"},
      ],
      MinPressure:0,
      MaxPressure:0,
      MinFlow:0,
      MaxFlow:0,
      MinStrength:0,
      MaxStrength:0,
      levelMy:5,
      resultIntervalData:{
                 MinPressure:0,
                 MaxPressure:0,
                 MinFlow:0,
                 MaxFlow:0,
                 MinStrength:0,
                 MaxStrength:0,
                 levelMy:5
             },
             selectElement: '',
        cform: {
        model: {
          _id: "",
          levelMy:5
        },
        rules: {},
        bindings: bind,
        inputs: [
          [
              { title: '压力最大值', data: 'MaxPressure', required: false, dataType: 'Number', showType: 'text',disabled:true}
          ],
          [
              { title: '压力最小值', data: 'MinPressure', required: false, dataType: 'Number', showType: 'text'}
          ],
          [
              { title: '流量最大值', data: 'MaxFlow', required: false, dataType: 'Number', showType: 'text',disabled:true}
          ],
          [
              { title: '流量最小值', data: 'MinFlow', required: false, dataType: 'Number', showType: 'text'}
          ],
          [
              { title: '流速最大值', data: 'MaxStrength', required: false, dataType: 'Number', showType: 'text',disabled:true}
          ],
          [
              { title: '流速最小值', data: 'MinStrength', required: false, dataType: 'Number', showType: 'text'}
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
          ]
        ]
        }
    }
  },
  watch:{
    show (val) {
       
      if (val) {

        var self = this;
        setTimeout(function(){
            self.$refs.hdform.Set({'MaxPressure':self.resultIntervalData.MaxPressure})//设置初始值
            self.$refs.hdform.Set({'MinPressure':self.resultIntervalData.MinPressure})//设置初始值
            self.$refs.hdform.Set({'MaxFlow':self.resultIntervalData.MaxFlow})//设置初始值
            self.$refs.hdform.Set({'MinFlow':self.resultIntervalData.MinFlow})//设置初始值
            self.$refs.hdform.Set({'MaxStrength':self.resultIntervalData.MaxStrength})//设置初始值
            self.$refs.hdform.Set({'MinStrength':self.resultIntervalData.MinStrength})//设置初始值
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
    let node = document.querySelector('.msgbox-container1')
    if (node && node.parentNode) {
      node.parentNode.removeChild(node)
    }
  },
  methods: {
        mousedown(event) {
          if(event.target.id!='myMaxPressure'&&event.target.id!='myMinPressure'&&event.target.id!='myMaxFlow'&&event.target.id!='myMinFlow'&&event.target.id!='myMaxStrengtrh'&&event.target.id!='myMinStrength')
          {
            this.selectElement = document.getElementById("myWindow1")
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
        if (!((Number(R.MinPressure) < Number(R.MaxPressure))&&(Number(R.MinFlow) < Number(R.MaxFlow))
        &&(Number(R.MinStrength) < Number(R.MaxStrength)))) 
        {
          this.myAlert("请输入正确的区间值",'提示')
        }
        else
        {
            var myEvent = new CustomEvent('event_name',{
            detail: { type: 'This is title!'},
            });
            myEvent.detail.type = "GetCalculateResult";
            var obj = new Object();
            obj.MinPressure = R.MinPressure;
            obj.MaxPressure = R.MaxPressure;
            obj.MinFlow = R.MinFlow;
            obj.MaxFlow = R.MaxFlow;
            obj.MinStrength = R.MinStrength;
            obj.MaxStrength = R.MaxStrength;
            obj.levelMy = R.levelMy;
            myEvent.detail.data = obj;
            if(window.dispatchEvent){
            window.dispatchEvent(myEvent);
              }else{
                  window.fireEvent(myEvent);
              }
              this.show = false;
              }
      })

    },
    myAlert(content,title){
       this.$alert(content, title, {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
    },
    selectChange(event){
      this.resultIntervalData.levelMy = event.target.value;
      console.log(event.target.value+"123");
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
    selectItem(myItem){
      alert(myItem.ElementId);
    }
  }
}
</script>
<style lang="scss" scoped>
.headerClass{
    vertical-align: middle;
    height: 40px;
    width: 100%;
    font-size: 13px;
    background: #F5f8f8;
}
/* .msgbox-container1{
  position: absolute;
  top:50%;
  left:50%;
  width: 50%;
  background: #fff;
  color: #555;
  border-radius: 0.8rem;
  transform:translate(-50%,-50%) scale(1, 1);
  header{
    margin: 0;
    padding: 1.2rem 0;
    text-align: center;
    color: #333;
    height: 1.3rem;
    line-height: 2rem;
    font-size: 1.5rem;
    border-radius: 0.8rem 0.8rem 0 0;
    background: #fff;
    border-width: 0;
    border-bottom: 1px solid #ccc;
  }
  .content-body{
    font-size: 1.0rem;
    margin: 2rem 1rem;
    line-height: 2;
    max-height: 20rem;
    overflow-y: auto;
    color: #666;
    div{
      padding: 0 1rem;
      text-align: justify;
      word-break: break-all;
    }
  }
  footer {
    width: 100%;
    text-align: center;
    display: block !important;
    border-width: 0;
    border-top: 1px solid #ccc;
    overflow: hidden;
    background: transparent;
    border-radius: 0 0 0.8rem 0.8rem;
    .button{
      float: left;
      padding: 1rem 0;
      width: 50%;
      color: #999;
      box-sizing: border-box;
      line-height: 2rem;
      font-size: 1.5rem;
      background: #f7f7f7;
      border-right: 1px solid #D5D7D6;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
    }
    .button:first-child:nth-last-child(1) {
        width: 100%;
    }
    .button:first-child:nth-last-child(2) ~ .button {
        width: 50%;
    }
  }
} */
.msgbox-container1{
position: absolute;
  top:50%;
  left:50%;
  width: 30%;
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