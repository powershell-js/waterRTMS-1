<template>
    <transition name="msgbox">
      <div v-if="show" id="myWindow" class="msgbox-container" :class="className" @mousedown="mousedown" >
         <table class="headerClass">
            <td style="padding-left:20px">{{title}}</td>
            <td style="color:#6d6d6d">模拟时间{{title2}}</td>
            <el-row style="padding-left:5px;text-align:right">
                <img src="../../static/assets/windowClose.png" style="cursor:pointer;height:29px;width:34px" title="关闭"  v-on:click="cancelBtn">
            </el-row>
          </table>
        <!-- <header>{{title}}</header> -->
       <!--  <div class="content-body">
          <li :key="item.label" v-for="item in listData">
            <ElementChangeItemRenderer :item="item" v-on:selectItem="selectItem"></ElementChangeItemRenderer>
          </li>
        </div> -->
        <el-table @row-click="itemClick" :show-header='false' class="tableClass" border :data="listData">
          <el-table-column width="110px" label=""  :align="'center'"> 
            <template slot-scope="scope" >
              <el-row style="width:100%">
                            <el-col :span="0.1">
                              <label>{{scope.row.type}}</label>
                            </el-col>
                            <el-col :span="0.1">
                              <label>ID</label>
                            </el-col>
                            <el-col :span="0.1">
                              <label>{{scope.row.ElementId}}</label>
                            </el-col>
                </el-row>
            </template>
          </el-table-column>
          <el-table-column label=""  :align="'center'"> 
            <template slot-scope="scope" >
                        <el-row style="width:100%">
                            <el-col :span="0.1">
                                  <span v-for="itemTemp in scope.row.ChangeData" :key="itemTemp.label">
                                    <label>{{itemTemp.label}}</label>
                                    <label>{{itemTemp.originalData}}</label>
                                    <label>变为</label>
                                    <label>{{itemTemp.changeData}}</label>
                                  </span>
                            </el-col>
                        </el-row>
            </template>
          </el-table-column>
          <el-table-column width="50px" label=""  :align="'center'"> 
          <template slot-scope="scope" style="width:100%">
              <el-row style="width:100%">
                <img src="../../static/assets/delete_16x16.png" style="cursor:pointer;" title="删除" alt="" v-on:click="DeleteClick(scope.row)">
              </el-row>
          </template>
      </el-table-column>
        </el-table>
        <!-- <footer> -->
          <el-row class="footer">
         <!--  <a v-if="cancel" href="javascript:;" @click="cancelBtn" class="button">{{cancel}}</a>
          <a href="javascript:;" @click="successBtn" class="button">{{confirm}}</a> -->
            <el-button size="mini" type="primary" @click.native="cancelBtn">{{cancel}}</el-button>
            <el-button size="mini" type="success" @click="successBtn">{{confirm}}</el-button>
          </el-row>
        <!-- </footer> -->
      
      </div>
    </transition>
</template>
<script>
import ElementChangeItemRenderer from '@/components/ElementChangeItemRenderer'
export default {
   components:{
     ElementChangeItemRenderer
   },
  data () {
    return {
      show: false,
      title: '提示',
      title2:'',
      content: '',
      confirm: '确定',
      cancel:'',
      className:'',
      listData:[],
      selectElement: '',
      dialogVisible:false
    }
  },
 /*  computed: {
        dialogVisible:{
          get: function () {
            return this.$store.state.dialogVisible
          },
          set: function (newValue) {
            this.$store.state.dialogVisible = newValue
          }
        }
      }, */
  watch:{
    show (val) {
      if (val) {
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
    let node = document.querySelector('.msgbox-container')
    if (node && node.parentNode) {
      node.parentNode.removeChild(node)
    }
  },
  methods: {
    itemClick(itemData){
        var myEvent = new CustomEvent('event_name',{
        detail: { type: 'This is title!'},
        });
        myEvent.detail.type = "ElementItemClick";
        myEvent.detail.data = itemData;
        if(window.dispatchEvent){
        window.dispatchEvent(myEvent);
          }else{
              window.fireEvent(myEvent);
          }
    },
    DeleteClick(itemData){
      var deleteId = itemData.ElementId;
      for(var i=0;i<this.listData.length;i++)
      {
        var item = this.listData[i];
        if(item.ElementId==deleteId)
        {
          this.listData.splice(i,1);
          break;
        }
        
      }
       var myEvent = new CustomEvent('event_name',{
      detail: { type: 'This is title!'},
      });
      myEvent.detail.type = "ElementChangeListDelete";
      myEvent.detail.data = itemData;
      if(window.dispatchEvent){
       window.dispatchEvent(myEvent);
        }else{
            window.fireEvent(myEvent);
        }
    },
     closeDialog(e) {
          this.dialogVisible = false
        },
        mousedown(event) {
         
          this.selectElement = document.getElementById("myWindow")
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
      if(this.listData.length!=0)
      {
        var myEvent = new CustomEvent('event_name',{
              detail: { type: 'This is title!'},
              });
              myEvent.detail.type = "ElementChangeList";
              myEvent.detail.data = this.listData;
              if(window.dispatchEvent){
              window.dispatchEvent(myEvent);
                }else{
                    window.fireEvent(myEvent);
                }
      }
      else
      {
          this.myAlert('请先添加修改内容','提示');
      }
    },
     myAlert:function(content,title) {
           this.$alert(content, title, {
          confirmButtonText: '确定',
        });
         },
    cancelBtn () {
      this.show = false;
       var myEvent = new CustomEvent('event_name',{
      detail: { type: 'This is title!'},
      });
      myEvent.detail.type = "PlanTempWindowClose";
      if(window.dispatchEvent){
       window.dispatchEvent(myEvent);
        }else{
            window.fireEvent(myEvent);
        }
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
/* .content-body {
    font-size: 1rem;
    margin: 2rem 1rem;
    line-height: 2;
    max-height: 20rem;
    overflow-y: auto;
    color: #666;
    text-align: center;
    width: 100% div {
      padding: 0 1rem;
      text-align: justify;
      word-break: break-all;
    }
  } */
  .colClass{
    width: 18px;
  }
  .tableClass{
    /* width: 540px; */
    width: 100%;
  }
.headerClass{
    vertical-align: middle;
    height: 40px;
    width: 100%;
    font-size: 13px;
    background: #F5f8f8;
}
.msgbox-container{
  max-height: 380px;
  position: absolute;
  top:50%;
  left:50%;
  width: 40%;
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