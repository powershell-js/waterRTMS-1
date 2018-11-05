<template>
    <div class="hd-userset">
        <slot name="extend"></slot>
        <div class="alarm">
            <i class="iconfont icon-baojing2" title="报警信息"></i>
            <span class="tag alarm-count">{{alarm.length}}</span>
            <el-menu mode="horizontal" menu-trigger="hover" v-if="alarm && alarm.length>0">
                <el-submenu index="bjxx">
                    <el-menu-item v-for="(s,index) in alarm" :key="index" :index="s.id">{{s.alarmName}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class="userinfo">
            <i class='iconfont icon-dayonghu setrole'></i>
            <span class="username">{{user.name||""}}</span>
        </div>
        <!-- <el-select size="small" v-model="rid" v-if="user.Roles&&user.Roles.length>1">
            <el-option v-for="item in user.Roles" :key="item.role"
                        :label="item.name"
                        :value="item.role"></el-option>
        </el-select> -->
        <a title="退出系统" class="backsysem-btn" href='/logout.html'>
            <i class='iconfont icon-zhuxiao'></i>
        </a>
    </div>
</template>
<script>
export default {
    name: 'HdUser',
    props: {
        alarm: {
            type: Array
        },
        user: {
            type: Object
        },
        rid: {
            type: String,
            default: '1232sdf'
        }
    }
}
</script>
<style lang="less">
.hd-userset {
    height: 50px;
    line-height: 50px;
    color: #8a9199;
    position: relative;
    display: inline-block;
    float: right;
    img {
        vertical-align: text-top;
    }
    a,
    a:link,
    a:hover,
    a:focus {
        text-decoration: none;
    }
    a i {
        color: #8a9199;
        font-size: 16px;
        vertical-align: middle;
    }
    .userinfo {
        display: inline-block;
        position: relative;
        z-index: 55;
        .username {
            margin-left: 20px;
        }
        .setrole {
            cursor: pointer;
            position: absolute;
            top: 50%;
            margin-top: -23px;
            left: 0px;
            z-index: 999;
        }
    }
    .alarm {
        display: inline-block;
        position: relative;
        .icon-baojing2 {
            position: absolute;
            z-index: 998;
            left: 0;
            top: 50%;
            margin-top: -22px;
            font-size: 16px;
        }
        .alarm-count {
            margin-left: 25px;
        }
        .el-menu {
            float: right;
        }
    }
    .el-select {
        width: 120px;
        display: inline-block;
        .el-input__inner {
            background-color: rgb(43, 46, 54);
            border: none;
            color: aliceblue;
            color: #8a9199;
            font-size: 12px;
            padding-right: 20px;
        }
        .el-input__icon {
            color: #8a9199;
            margin-top: -1px;
        }
    }
    a {
        display: inline-block;
    }
    .backsysem-btn {
        display: block;
        float: right;
        position: relative;
        min-width: 30px;
        height: 100%;
        margin: 0 12px;
    }
    .el-menu {
        background: transparent;
        float: left;
        height: 30px;
        line-height: 30px;
        border: none !important;
        .el-menu-item {
            min-width: 0;
            margin-top: 0px !important;
            padding-right: 0px !important;
        }
        .el-menu--horizontal {
            border-bottom: none !important;
            border-right: none !important;
            > .el-menu-item {
                height: 30px;
                line-height: 30px;
            }
        }
        .el-submenu > .el-menu {
            top: 48px;
            border-radius: 0;
            background-color: #fff;
            padding: 0;
            li {
                font-size: 12px;
            }
        }
        .el-submenu.is-active .el-submenu__title,
        .el-submenu:hover .el-submenu__title {
            background-color: transparent;
            border-bottom: none;
        }
        .el-submenu__title,
        > .el-menu-item,
        .el-submenu > .el-submenu__title {
            line-height: 30px;
            height: 30px;
            color: #8a9199;
            border-bottom: none;
            padding: 0;
            padding-right: 20px;
            font-size: 12px;
            margin-top: 5px;
            .el-submenu__icon-arrow {
                color: #8a9199;
                font-size: 12px;
            }
            &.is-active {
                background-color: #d9d9d9;
                color: #fff;
            }
        }
        .el-submenu > .el-submenu__title img {
            margin-right: 5px;
        }
    }
}
</style>
