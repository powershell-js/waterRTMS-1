<template>
    <div @mouseleave="hideMenuChildren" :class="{'ShowSon':isShowSon}" class="hd-menu" v-if="menus.length>0">
        <ul class="menu-list">
           <template v-for="(m1,index) in menus"> 
            <li :key="m1.Id" @mouseover="showMenuChildren($event,m1,index)" :class="{'nogolink':IsDisable(m1),'active':IsActive(m1)}" >
                <a v-if="IsDisable(m1)" class="nogolink">
                   {{m1.Name}}
                    <br>
                    <span class="en">{{m1.extend}}</span>
                </a>
                <a v-else @click="open(m1)">
                    {{m1.Name}}
                    <br>
                    <span class="en" >{{m1.extend}}</span>
                 </a>
            </li>
           </template>
        </ul>
        <div id="scada7menu" class="prover trans-fadeout image-fadeout"  v-if="sedSubMenu&&sedSubMenu.Children&&sedSubMenu.Children.length>0">
           <ul class="vertical-list listmenu-u" v-if="sedSubMenu.Children[0].Children&&sedSubMenu.Children[0].Children.length>0">
               <template v-for="(m2,index) in sedSubMenu.Children">
                   <li class="item menufirst" :key="m2.Id"
                       :class="{active:target&&((m2.Id == target.Id)||(target._Pid1&&(m2.Id == target._Pid1))||(target._Pid2&&(m2.Id ==target._Pid2)))}">
                       <span class="level2-name" v-if="m2.Children.length>0">{{m2.Name}}</span>
                       <span class="level2-name" @click="goClickLink2($event)"
                             v-else>
                           <a v-if="IsDisable(m2)" class="nogolink">{{m2.Name}}</a>
                           <a v-else @click="open(m2)">{{m2.Name}}</a>
                       </span>
                       <ul v-if="m2.Children.length>0" class="level3">
                           <template v-for="(m3,k) in m2.Children">
                               <li @click="goClickLink2($event)" :key="m3.Id"
                                   :class="{'nogolink':IsDisable(m3),active:IsActive(m3)}">
                                   <a v-if="IsDisable(m3)" class="nogolink">{{m3.Name}}</a>
                                   <a v-else @click="open(m3)">{{m3.Name}}</a>
                               </li>
                           </template>
                       </ul>
                   </li>
                   <li class="vertical-solid" :key="index"
                       v-if="index!=sedSubMenu.Children.length-1"></li>
               </template>
           </ul>
           <ul class="list listmenu-u" v-else>
               <template v-for="(m2,index) in sedSubMenu.Children">
                   <li class="menufirst" :key="m2.Id"
                       :class="{'nogolink':IsDisable(m2),active:IsActive(m2)}">
                       <a v-if="m2.Val && m2.Val!='disabled' && m2.Val!=''"
                          @click="open(m2)">
                           <span class="level2-icon" @click="goClickLink()"><i
                               :class="'menu-icon iconfont icon-' + m2.Icon"></i></span>
                           <span class="level2-menu" @click="goClickLink()">{{m2.Name}}</span>
                       </a>

                       <a v-else
                          :class="{'nogolink':m2.Val=='disabled' || (m2.Val=='' && m2.Children.length==0)}">
                           <template
                               v-if="m2.Val=='disabled' || (m2.Val=='' && m2.Children.length==0)">
                               <span class="level2-icon"><i
                                   :class="'menu-icon iconfont icon-' + m2.Icon"></i></span>
                               <span class="level2-menu">{{m2.Name}}</span>
                           </template>
                           <template v-else>
                               <span class="level2-icon" @click="goClickLink()"><i
                                   :class="'menu-icon iconfont icon-' + m2.Icon"></i></span>
                               <span class="level2-menu" @click="goClickLink()">{{m2.Name}}</span>
                           </template>

                       </a>


                   </li>
                   <li class="hiz-solid" :key="index"
                       v-if="index!=sedSubMenu.Children.length-1"></li>
               </template>
           </ul>
        </div>
    </div>
</template>
<script>
    import {assign} from '../../../src/utils/util';

    export default {
    name:"HdMenu",
    props:{
        menus:{
            type:Array,
            default:()=>{
                return [];
            }
        },
        curID:String
    },
    data() {
        var v=this.curID;
        if(!v){

        }
        return {
            active:null,
            currentValue:v,
            sedSubMenu:null,
            idx:null,
            target:null,
            isShowSon:false,

        }
    },
    created(){

    },
    methods:{
        goClickLink(){
           let self=this;
             $("body").find("#scada7menu").fadeOut(200);
             self.isShowSon=false;
        },
        goClickLink2($event){
          let self=this;
          if($($event.currentTarget).find('.nogolink').length>0){
              return false
          }
          else{
              $("body").find("#scada7menu").fadeOut(200);
             self.isShowSon=false;
          }
        },
        hideMenuChildren(){
           let self=this;
           self.sedSubMenu=null,
           self.isShowSon=false;
           $("body.menu-list").removeClass("highLight");
        },
        showMenuChildren($event,m,index){
           let self=this;
           self.sedSubMenu=m;
           self.isShowSon=true
           $($event.currentTarget).siblings().removeClass("highLight");
           $($event.currentTarget).addClass("highLight");
            self.$nextTick(function(){
               let all_w=$('body').width();//body宽度
               let left_x=$("body").find(".menu-list li").eq(index).offset().left//X距左距离
               let right_x=all_w-left_x//右边还剩下多少宽度
               //下拉列表个数
               let len=$("body").find(".listmenu-u li.menufirst").length>parseInt(all_w/140)?parseInt(all_w/140):$("body").find(".listmenu-u li.menufirst").length//下拉列表个数
               let self_x=$("body").find(".menu-list li").eq(index).width()//当前菜单本身宽度
               let show_w=left_x+self_x/2-(len/2)*140;
               let right_w=len*140;
               let max_showwidth=(len/2)*140+70
               //var show(len/2)*140
               if(left_x<100){
                    $("body").find("#scada7menu .listmenu-u").css({
                        'margin-left':left_x,
                        'text-align':'left',
                        'margin-right':'auto',
                    })
                }
                else if(show_w<=0){
                    $("body").find("#scada7menu .listmenu-u").css({
                        'margin-left':left_x-140+self_x/2,
                        'text-align':'left',
                        'margin-right':'auto',
                    })
                }
                else if(right_x<Math.floor(max_showwidth)){
                    $("body").find("#scada7menu .listmenu-u").css({
                        'margin-left':'auto',
                        'text-align':'right',
                        'margin-right':all_w-left_x-self_x,
                    })
                }
                else{
                $("body").find("#scada7menu .listmenu-u").css({
                        'margin-left':show_w,
                        'text-align':'left',
                        'margin-right':'auto',
                    })
                }

           })
        },
        createIndex(){
            var self=this;
            var idx={};
            self.menus.forEach((m1)=>{
                m1.Children=m1.Children||[]
                m1.Children.forEach((m2)=>{
                    if(m2.Children){
                        m2.Children.forEach((m3)=>{
                            idx[m3.Id]=assign({},m3);
                            idx[m3.Id]._Pid1=m1.Id;
                            idx[m3.Id]._Pid2=m2.Id;
                            delete idx[m3.Id]['Children'];
                        });
                        idx[m2.Id]=assign({},m2);
                        idx[m2.Id]._Pid1=m1.Id;
                        delete idx[m2.Id]['Children'];
                    }
                });
                idx[m1.Id]=assign({},m1);
            });
            self.idx=idx;
        },
        open(m){
            this.$emit("handler",this.idx[m.Id])
        },
        IsActive(m1){
            let target=this.target;
            return target&&((m1.Id == target._Pid1) || (m1.Id == target.Id)||(target._Pid1&&(m1.Id == target._Pid1))||(target._Pid2&&(m1.Id ==target._Pid2)))
        },
        IsDisable(m1){
            return (m1.Val=='' && m1.Children.length==0) || m1.Val=='disabled'
        }
    },
    watch:{
        sedSubMenu:{
            deep:true,
            handler:function(){
                this.$nextTick(()=>{
                    $(".vertical-solid").height($(".prover").height()-80);
                    // $(".hiz-solid").height($(".prover").height()-35);
                    // $(".level2-name").height('auto')
                })
            }
        },
        'menus':{
            deep:true,
            immediate: true,
            handler:function(v){
                if(v.length > 0){
                    this.createIndex();
                    let path = this.$route.fullPath;
                    this.currentpath = path;
                    let right = Object.values(this.idx).find((r) => {
                        return r.Val == path || (r.Val !== "" &&
                            path.replace(/\\/g, '/').indexOf(r.Val) >= 0);
                    });
                    if(right){
                        this.target = right;
                    }
                }
            }
        },
        "$route":{
            deep:true,
            immediate: true,
            handler:function(v){
                this.target = null;
                let path = v.fullPath,self=this;
                $.each(this.idx,(i,r)=>{
                     if(r.Val == path || (r.Val!=="" && path.replace(/\\/g,'/').indexOf(r.Val)>=0)){
                            self.target = r;
                            return false
                     }
                })
            }
        }
    }
}
</script>

