<template>
    <div class="horizontal-menu">
        <div class="menu-toggle-bar" @click="onToggle" :class="{'is-lite': isLite}">
            <i class="iconfont icon-liebiao"></i>
        </div>

        <div v-if="!isLite" class="menu-box">
            <div v-for="mu in menus" :key="mu.Id">
                <div class="menu-item" @click="onMenuClick(mu)" :class="{'is-active': isActive(mu)}">
                    <i class="menu-icon" :class="'iconfont icon-'+(mu.Icon || 'baobiaoguanli')"></i>
                    <span class="menu-text" :class="{'unfinished':IsDisable(mu.Name)}">{{menuName(mu.Name)}}</span>
                </div>
                <el-scrollbar v-if="mu.Children.length > 0" v-show="isActive(mu)" class="sub-menu">
                    <ul class="sub-menu-box">
                        <li class="sub-menu-item" v-for="smu in mu.Children" :key="smu.Id" @click="onMenuClick(smu)" :class="{'is-active': isActive(smu)}">
                            <span class="menu-icon" v-if="!smu.Icon">·</span>
                            <i class="menu-icon" v-else :class="'iconfont icon-'+smu.Icon"></i>
                            <span :class="{'unfinished':IsDisable(smu.Name)}">{{menuName(smu.Name)}}</span>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>

        <div v-else class="menu-box is-lite">
            <el-popover v-for="mu in menus" :key="mu.Id" trigger="hover" placement="right-start" popper-class="lcs-menu-pop" @show="onPopShow(mu)" @hide="onPopHide(mu)" :open-delay="0">
                <div class="menu-item" slot="reference" :id="'mu_'+mu.Id" @click="onMenuClick(mu)" :class="{'is-active': isActive(mu)}">
                    <i class="menu-icon" :class="'iconfont icon-'+(mu.Icon || 'baobiaoguanli')"></i>
                </div>
                <div class="pop-content">
                    <div class="sub-menu-title" @click="onMenuClick(mu)" :style="{'cursor': mu.Children.length == 0 && mu.Val ? 'pointer' : 'default'}">
                        <span :class="{'unfinished':unfinished(mu.Name)}">{{menuName(mu.Name)}}</span>
                    </div>
                    <el-scrollbar v-if="mu.Children.length > 0" class="sub-menu">
                        <ul class="sub-menu-box">
                            <li class="sub-menu-item" v-for="smu in mu.Children" :key="smu.Id" @click="onMenuClick(smu)" :class="{'is-active': isActive(smu)}">
                                <span :class="{'unfinished':unfinished(smu.Name)}">{{menuName(smu.Name)}}</span>
                            </li>
                        </ul>
                    </el-scrollbar>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script>
import { assign, uuid } from '../../../src/utils/util'
export default {
    name: 'HdHMenu',
    props: {
        menus: {
            type: Array,
            default: () => {
                return []
            }
        },
        curID: String,
        lite: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isLite: this.lite,
            target: {},
            lopen: ''
        }
    },
    methods: {
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
            //展开一级菜单
            if (!mu.parent && mu.Children.length > 0) {
                this.target = mu
                return
            }
            //打开链接
            if (mu.Val) this.$emit('handler', mu)
        },
        onToggle() {
            this.isLite = !this.isLite
        },
        onPopShow(mu) {
            $('#mu_' + mu.Id).addClass('is-open')
        },
        onPopHide(mu) {
            $('#mu_' + mu.Id).removeClass('is-open')
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
        open(m) {
            this.$emit('handler', this.idx[m.Id])
        },
        isActive(m1) {
            let target = this.target
            return (
                target &&
                (m1.Id == target._Pid1 ||
                    m1.Id == target.Id ||
                    (target._Pid1 && m1.Id == target._Pid1) ||
                    (target._Pid2 && m1.Id == target._Pid2))
            )
        },
        IsDisable(m1) {
            return (
                (m1.Val == '' && m1.Children.length == 0) ||
                m1.Val == 'disabled'
            )
        }
    },
    mounted() {},
    watch: {
        menus: {
            deep: true,
            immediate: true,
            handler: function(v) {
                if (v.length > 0) {
                    this.createIndex()
                    let path = this.$route.fullPath
                    this.currentpath = path
                    let self = this
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
        },
        isLite:{
            deep: true,
            immediate: true,
            handler(v){
                this.$emit('lite-changed', this.isLite)
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
div.horizontal-menu {
    height: 100%;
    width: 100%;
    position: relative;

    div.menu-box {
        background: @menu-background;
        color: @color;
        .menu-item {
            width: 100%;
            height: 16px;
            line-height: 16px;
            cursor: pointer;
            padding: 10px 0;
            &:hover,
            &.is-active {
                background: @over-color;
            }
            > i.menu-icon {
                display: block;
                float: left;
                width: 16px;
                height: 16px;
                margin: 0 7px 0 15px;
            }
        }

        .sub-menu {
            background: @sub-menu-background;
            > .el-scrollbar__wrap {
                overflow-x: hidden;
                max-height: 201px;
                margin-bottom: 0 !important;
            }
        }

        .sub-menu-box {
            box-sizing: border-box;
            padding: 0 10px 0 5px;
            width: 100%;
        }

        .sub-menu-item {
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            margin: 3px 0;
            width: 100%;
            &:hover {
                border-radius: 12px;
                background: @menu-background;
                color: @over-color;
            }
            &.is-active {
                border-radius: 12px;
                color: @over-color;
            }
            > .menu-icon {
                display: block;
                float: left;
                margin: 0 7px 0 10px;
                width: 16px;
                text-align: center;
                font-size: 16px;
                padding-top: 2px;
            }
        }
    }

    div.menu-box.is-lite {
        .menu-item > i.menu-icon {
            display: block;
            float: left;
            width: 16px;
            height: 16px;
            margin-left: 11px;
        }
        .menu-item.is-open {
            background: @over-color;
        }
    }

    /*div.menu-toggle-bar {
        height: 25px;
        background: #4d4f5b;
        color: #9fa2a8;
        cursor: pointer;
        text-align: center;
        position: absolute;
        top: 0;
        width: 100%;
        border-top: solid #3a3d44 1px;
        &:hover {
            color: @color;
        }
        > i.loushun {
            display: inline-block;
            width: 25px;
            height: 25px;
            transition: transform 0.3s;
        }
        &.is-lite > i.loushun {
            margin-left: -3px;
            transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            -moz-transform: rotate(90deg);
            -webkit-transform: rotate(90deg);
            -o-transform: rotate(90deg);
        }
    }*/

    .unfinished {
        color: #687780;
    }
}
div.lcs-menu-pop.el-popover[x-placement^='right'] {
    margin-left: 0;
    padding: 0;
    border: 0;
    background: @sub-menu-background;
    border-radius: 0;
    color: @color;
    width: 130px;
    > div.pop-content {
        width: 100%;
    }
    > div.popper__arrow {
        border-right-color: @sub-menu-background;
        &::after {
            border-right-color: @sub-menu-background;
        }
    }
    div.sub-menu-title {
        height: 36px;
        line-height: 36px;
        padding-left: 20px;
        background: @menu-background;
    }
    .sub-menu {
        > .el-scrollbar__wrap {
            overflow-x: hidden;
            max-height: 333px;
            margin-bottom: 0 !important;
        }

        .sub-menu-box {
            box-sizing: border-box;
            padding: 0 10px;
            width: 100%;
        }

        .sub-menu-item {
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            margin: 3px 0;
            width: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            &:hover {
                border-radius: 12px;
                background: @menu-background;
                color: @over-color;
            }
            &.is-active {
                border-radius: 12px;
                color: @over-color;
            }
        }
    }
    .unfinished {
        color: #687780;
    }
}
</style>
