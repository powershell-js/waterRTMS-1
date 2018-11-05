<template>
    <div class="Ali-menu">

        <div class="menu-toggle-bar" 
        @mouseenter="toggleMenu($event,'over','bar')" @mouseleave="toggleMenu($event,'leave','bar')">
            <i class="iconfont icon-liebiao"></i>
            <span>全部导航</span>
        </div>

        <div class="menu-topbar-all-nav-dropdown"  @mouseleave="toggleMenu($event,'leave','nav')"  @mouseenter="toggleMenu($event,'over','nav')">
            <div class="menu-topbar-level1-nav" v-show="menuStatus.menu1" @mouseleave="toggleMenu($event,'leave','nav')"  @mouseenter="toggleMenu($event,'over','nav')">
                <ul>
                    <li v-for="mu in data.level1" :key="mu.Id"
                    :class="{isAct:mu.Id==currentLevel1}"
                    v-if="mu.Children.length==0"
                    @click="onMenuClick(mu)">
                        <i class="menu-icon" :class="'iconfont icon-'+(mu.Icon || 'baobiaoguanli')"></i>
                        <span class="menu-text" :class="{'unfinished':IsDisable(mu.Name)}">{{menuName(mu.Name)}}</span>
                        <span style="float:right" v-if="mu.Children.length>0">></span>

                    </li>
                     <li v-for="mu in data.level1" :key="mu.Id"
                    @mouseleave="toggleMenu($event,'leave','nav1',mu)" 
                    @mouseenter="toggleMenu($event,'over','nav1',mu)"
                    :class="{isAct:mu.Id==currentLevel1}"
                    v-if="mu.Children.length>0"
                    @click="onMenuClick(mu)">
                        <i class="menu-icon" :class="'iconfont icon-'+(mu.Icon || 'baobiaoguanli')"></i>
                        <span class="menu-text" :class="{'unfinished':IsDisable(mu.Name)}">{{menuName(mu.Name)}}</span>
                        <span style="float:right" v-if="mu.Children.length>0">></span>

                    </li>
                </ul>

                
            </div>

             <div class="menu-topbar-level2-nav" v-show="menuStatus.menu2" @mouseleave="toggleMenu($event,'leave','nav1')" @mouseenter="toggleMenu($event,'over','nav1')">
                 <ul >
                     <li v-for="smu in data.level2" :key="smu.Id" 
                     v-if="smu.parentId==currentLevel1 && smu.Children.length==0"
                     :class="{isAct:smu.Id==currentLevel2}"
                      @click="onMenuClick(smu)">
                          <i class="menu-icon" :class="'iconfont icon-'+smu.Icon"></i>
                          <span :class="{'unfinished':IsDisable(smu.Name)}">{{menuName(smu.Name)}}</span>
                          <span style="float:right" v-if="smu.Children.length>0">></span>
                         
                     </li>
                     <li v-for="smu in data.level2" :key="smu.Id" 
                     v-if="smu.parentId==currentLevel1 && smu.Children.length>0" @mouseleave="toggleMenu($event,'leave','nav2',smu)"  
                     @mouseenter="toggleMenu($event,'over','nav2',smu)"
                     :class="{isAct:smu.Id==currentLevel2}"
                      @click="onMenuClick(smu)">
                          <i class="menu-icon" :class="'iconfont icon-'+smu.Icon"></i>
                          <span :class="{'unfinished':IsDisable(smu.Name)}">{{menuName(smu.Name)}}</span>
                          <span style="float:right" v-if="smu.Children.length>0">></span>
                         
                     </li>
                 </ul>
                 
             </div>

            <div class="menu-topbar-level3-nav" v-show="menuStatus.menu3" @mouseleave="toggleMenu($event,'leave','nav2')" @mouseenter="toggleMenu($event,'over','nav2')">
                 <ul >
                     <li v-for="ssmu in data.level3" :key="ssmu.Id" 
                     v-if="ssmu.parentId==currentLevel2"
                     @click="onMenuClick(ssmu)" >
                          <i class="menu-icon" :class="'iconfont icon-'+ssmu.Icon"></i>
                          <span :class="{'unfinished':IsDisable(ssmu.Name)}">{{menuName(ssmu.Name)}}</span>
                     </li>
                 </ul>
                 
             </div>

        </div>
    </div>
</template>

<script>
import { assign, uuid } from '../../../src/utils/util'
export default {
    name: 'HdAliMenu',
    props: {
        menus: {
            type: Array,
            default: () => {
                return []
            }
        },
        curID: String
    },
    data() {
        return {
            target: {
                Id:''
            },
            lopen: '',
            menuStatus:{
                menuAll:false,
                menu1:false,
                menu2:false,
                menu3:false
            },
            data:{
                level1:[],
                level2:[],
                level3:[]
            },
            currentLevel1:'',
            currentLevel2:''
        }
    },
    methods: {
        toggleMenu(event,action,type,mu){
            var self=this;
            window.event.cancelBubble=true;
            event.stopPropagation();
            switch(action){
                case 'over':
                if(type=='bar'){
                    self.menuStatus.menu1=true;
                    $('.menu-topbar-level1-nav').stop().animate({left:0},200);
                    $('.menu-topbar-level2-nav').stop().animate({left:0},200);
                    $('.menu-topbar-level3-nav').stop().animate({left:0},200);
                    $('.menu-toggle-bar').css('background','#38a9e5')
                }else if(type=='nav'){
                    self.menuStatus.menu1=true;
                    $('.menu-topbar-level1-nav').stop().animate({left:0},200);
                    $('.menu-topbar-level2-nav').stop().animate({left:0},200);
                    $('.menu-topbar-level3-nav').stop().animate({left:0},200);
                    $('.menu-toggle-bar').css('background','#38a9e5')
                   
                }else if(type=='nav1'){
                    self.menuStatus.menu2=true;
                    $('.menu-topbar-level2-nav').stop().animate({left:200},200);
                    $('.menu-topbar-level3-nav').stop().animate({left:0},200);
                    if(!!mu){
                        this.currentLevel1 = mu.Id;
                        this.currentLevel2 = "";
                    }
                    $('.menu-toggle-bar').css('background','#38a9e5')
                   
                }else if(type=='nav2'){
                    
                    self.menuStatus.menu3=true;
                    $('.menu-topbar-level2-nav').stop().animate({left:200},200);
                    $('.menu-topbar-level3-nav').stop().animate({left:400},200);
                    if(!!mu){
                        this.currentLevel2 = mu.Id;
                    }
                    $('.menu-toggle-bar').css('background','#38a9e5')
                    
                }
                break;
                case 'leave':
                
                if(type=='bar'){
                    
                    $('.menu-topbar-level3-nav').stop().animate({left:0},200,function(){
                         self.menuStatus.menu3=false;
                         $('.menu-topbar-level2-nav').stop().animate({left:0},200,function(){
                             self.menuStatus.menu2=false;
                              $('.menu-topbar-level1-nav').stop().animate({left:-200},200,function(){
                                   self.menuStatus.menu1=false;
                                   
                                  
                                   self.currentLevel1="";
                                   self.currentLevel2="";
                              });
                         });
                    })
                    $('.menu-toggle-bar').css('background','#262b31')
                }else if(type=='nav'){
                    
                     $('.menu-topbar-level3-nav').stop().animate({left:0},200,function(){
                        self.menuStatus.menu3=false;
                        $('.menu-topbar-level2-nav').stop().animate({left:0},200,function(){
                            self.menuStatus.menu2=false;
                             $('.menu-topbar-level1-nav').stop().animate({left:-200},200,function(){
                                  self.menuStatus.menu1=false;
                                  
                                  
                                  self.currentLevel1="";
                                  self.currentLevel2="";
                             });
                        });
                     })
                     $('.menu-toggle-bar').css('background','#262b31')
                }else if(type=='nav1'){
                     $('.menu-topbar-level2-nav').stop().animate({left:0},200,function(){
                          self.menuStatus.menu2=false;
                          self.currentLevel1="";
                          self.currentLevel2="";
                     })
                      
                }else if(type=='nav2'){
                    //  $('.menu-topbar-level3-nav').animate({left:0},200,function(){
                    //       self.menuStatus.menu3=false;
                          
                    //  })
                }
                break;    
            }
        },
        unfinished(name) {
            if (name.indexOf('*') == 0) {
                return true
            }
            return false
        },
        menuName(name) {
            if (name.indexOf('*') == 0) {
                return name.substring(1)
            }
            return name
        },
        onMenuClick(mu) {
            //打开链接
            if (mu.Val) this.$emit('handler', mu)
        },
       
        createIndex() {
            var self = this
            var idx = {}
            self.menus.forEach(m1 => {
                m1.Children = m1.Children || []
                m1.Children.forEach(m2 => {
                    if (m2.Children) {
                        m2.Children.forEach(m3 => {
                            idx[m3.Id] = assign({}, m3)
                            idx[m3.Id]._Pid1 = m1.Id
                            idx[m3.Id]._Pid2 = m2.Id
                            delete idx[m3.Id]['Children']
                        })
                        idx[m2.Id] = assign({}, m2)
                        idx[m2.Id]._Pid1 = m1.Id
                        delete idx[m2.Id]['Children']
                    }
                })
                idx[m1.Id] = assign({}, m1)
            })
            self.idx = idx
        },
        IsDisable(m1) {
            
            return (
                (m1.Val == '' && m1.Children.length == 0) ||
                m1.Val == 'disabled'
            )
        },
        resizeMenu(){
            var mainHeight = $('#app-el-main').height()
            $('.menu-topbar-all-nav-dropdown').height(mainHeight)
        },
        dealData(data,parentId,level){
            
            var self=this;
            if(!parentId){
                var level=1
            }else{
                var level=level+1
            }
            if(!!data){
                $.each(data,function(i,ele){
                    self.data['level'+level].push(ele)
                    if(parentId){
                        ele.parentId=parentId
                    }
                    if(!!ele.Children && ele.Children.length>0){
                        self.dealData(ele.Children,ele.Id,level)
                    }
                })
            }
        }
    },
    mounted() {
        let self = this;
        this.$nextTick(function() {
           self.resizeMenu();
           $(window).resize(function(){
              self.resizeMenu();
           })
        })
    },
    watch: {
        menus: {
            deep: true,
            immediate: true,
            handler: function(v) {
                if (v.length > 0) {
                    this.dealData(v)
                    console.log(v)
                    let path = this.$route.fullPath
                    this.currentpath = path
                   
                }
            }
        },
        $route: {
            deep: true,
            immediate: true,
            handler: function(v) {
                this.target = null
                let path = v.fullPath,
                    self = this
                $.each(this.idx, (i, r) => {
                    if (
                        r.Val == path ||
                        (r.Val !== '' &&
                            path.replace(/\\/g, '/').indexOf(r.Val) >= 0)
                    ) {
                        self.target = r
                        return false
                    }
                })
            }
        }
    }
}
</script>

<style lang="less">
@menu-background: #545663;
@sub-menu-background: #41444d;
@color: #fff;
@over-color: #38a9e5;
@menu-background-level:#363d46;
div.Ali-menu {
    position: absolute;
      /*滚动条样式*/
    ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
    }



    div.menu-toggle-bar {
        height: 25px;
        background: #262b31;
        color: #fff;
        cursor: pointer;
        text-align: center;
        position: absolute;
        top: 0;
        width: 120px;
        line-height: 26px;
        overflow: hidden;
        border-top: none;
        i {
            top: 1.4px;
            position: relative;
        }
        &:hover {
            background: @over-color;
        }
        > i.loushun {
            display: inline-block;
            width: 25px;
            height: 25px;
            transition: transform 0.3s;
        }
    }
    .menu-topbar-all-nav-dropdown {
        position: relative;
        top: 25px;
       
      
        z-index: 999;
        
        display: inline-block;
        .menu-topbar-level1-nav{
            background: @menu-background-level;
            height: 100%;
            left: -200px;
            width: 200px;
            position: absolute;
            border-right: 1px solid #676c71;
            box-sizing: border-box;
            padding: 20px 0;
            z-index: 1003;
            overflow: auto;
        }

        .menu-topbar-level2-nav{
                background: @menu-background-level;
                height: 100%;
                left: 0px;
                width: 200px;
                position: absolute;
                top: 0;
                border-right: 1px solid #676c71;
                box-sizing: border-box;
                z-index: 1002;
                padding: 20px 0;
                overflow: auto;
                
            }

         .menu-topbar-level3-nav{
                    background: @menu-background-level;
                    height: 100%;
                    left: 0px;
                    width: 200px;
                    position: absolute;
                    top: 0;
                    border-right: 1px solid #676c71;
                    box-sizing: border-box;
                    z-index: 1001;
                    padding: 20px 0;
                 }    

        .menu-topbar-level1-nav,.menu-topbar-level2-nav,.menu-topbar-level3-nav{
           
            ul{
                width: 100%;
                height: 100%;
                 li:first-child{
                     padding-top:0;
                 }
                 li{
                     display: block;
                     height: 24px;
                     line-height: 24px;
                     font-size: 14px;
                     padding: 6px 20px;
                     cursor: pointer;
                     color: #fff
                 }
                 li:hover{
                     color:@over-color;
                 }
                 .isAct{
                     color:@over-color;
                 }
            }
           
        }
    }

    .unfinished {
        color: #687780;
    }
}
</style>
