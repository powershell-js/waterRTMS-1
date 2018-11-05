<template>
    <div class="hd-userset">
        <slot name="extend"></slot>
        <div class="alarm">
            <i class="iconfont icon-baojing2" title="报警信息"></i><span class="tag alarm-count">{{alarm.length}}</span>
            <el-menu mode="horizontal" menu-trigger="hover" v-if="alarm && alarm.length>0">
                <el-submenu index="bjxx" >
                    <el-menu-item  v-for="(s,index) in alarm" :key="index" :index="s.id">{{s.alarmName}}</el-menu-item>
                </el-submenu> 
            </el-menu>
        </div>
        <div class="userinfo">
            <i class='iconfont icon-dayonghu setrole'></i>
            <span class="username">{{user.name||""}}</span>
        </div>
        <el-select size="small" v-model="rid" v-if="user.Roles&&user.Roles.length>1">
            <el-option v-for="item in user.Roles" :key="item.role"
                        :label="item.name"
                        :value="item.role"></el-option>
        </el-select>
        <a title="退出系统" class="backsysem-btn" href='/logout.html'>
          <i class='iconfont icon-zhuxiao'></i>
        </a>
    </div>
</template>
<script>
    export default {
        name:'HdUser',
        props:{
            alarm:{
                type:Array
            },
            user:{
                type:Object,
            },
            rid:{
                type:String,
                default:"1232sdf"
            }
        }
    }

</script>