<template>
    <div style="height:100%;">

        <!-- 头部菜单 无TAB -->
        <el-container v-if="type=='1'">
            <el-header height="50px" class="app-header">
                <hd-logo :sysname="name" :fontColor="color" :logo="logo"></hd-logo>
                <hd-menu :menus="menus"  @handler="open" style="margin-left: 50px;"></hd-menu>
                <userset :alarm="alarm" :user="user" :rid="rid"></userset>
                <slot name="extend"></slot>
            </el-header>
            <el-main class="app-page"  v-bar>
                <div>
                    <transition name="fade" mode="out-in">
                        <keep-alive :include="cachedViews">
                            <router-view :class="['mainview',$route.meta.mainviewclass]" name="default"></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </el-main>
        </el-container>

        <!-- 头部菜单 TAB -->
        <el-container v-if="type=='2'">
            <el-header v-show="!fullscreen" height="80px" class="app-header">
                <el-container>
                    <el-header height="50px">
                        <hd-logo :sysname="name" :fontColor="color" :logo="logo"></hd-logo>
                        <hd-menu :menus="menus" @handler="open" style="margin-left: 50px;"></hd-menu>
                        <userset :alarm="alarm" :user="user" :rid="rid"></userset>
                        <slot name="extend"></slot>
                    </el-header>
                    <el-main style="flex: none;">
                        <tags :menus="menus" @handler="open"></tags>
                    </el-main>
                </el-container>
            </el-header>
            <tags v-if="fullscreen" :menus="menus" @handler="open"></tags>
            <el-main class="app-page"  v-bar>
                <div>
                    <transition name="fade" mode="out-in">
                        <keep-alive :include="cachedViews">
                            <router-view :class="['mainview',$route.meta.mainviewclass]" name="default"></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </el-main>
        </el-container>

        <!-- 左侧菜单 TAB -->
        <el-container v-if="type=='3'">
            <el-header v-show="!fullscreen" height="50px" class="app-header">
                <hd-logo :sysname="name" :fontColor="color" :logo="logo"></hd-logo>
                <userset :alarm="alarm" :user="user" :rid="rid"></userset>
                <slot name="extend"></slot>
            </el-header>
            <el-container>
                <el-aside :width="lmenusize" v-show="!fullscreen">
                    <hd-h-menu :menus="menus" @handler="open" @lite-changed="liteChange"></hd-h-menu>
                </el-aside>
                <el-main class="app-page"  v-bar>
                    <div>
                        <transition name="fade" mode="out-in">
                            <keep-alive :include="cachedViews">
                                <router-view :class="['mainview',$route.meta.mainviewclass]" name="default"></router-view>
                            </keep-alive>
                        </transition>
                    </div>
                </el-main>
            </el-container>
        </el-container>

        <!-- 左侧菜单 TAB -->
        <el-container v-if="type=='4'">
            <el-header v-show="!fullscreen" height="50px" class="app-header">
                <hd-logo :sysname="name" :fontColor="color" :logo="logo"></hd-logo>
                <userset :alarm="alarm" :user="user" :rid="rid"></userset>
                <slot name="extend"></slot>
            </el-header>
            <el-container>
                <el-aside :width="lmenusize" v-show="!fullscreen">
                    <hd-h-menu :menus="menus" @handler="open" @lite-changed="liteChange"></hd-h-menu>
                </el-aside>
                <el-main>
                    <el-container>
                        <el-header height="30px">
                            <tags :menus="menus" @handler="open"></tags>
                        </el-header>
                        <el-main class="app-page"  v-bar>
                            <div>
                                <transition name="fade" mode="out-in">
                                    <keep-alive :include="cachedViews">
                                        <router-view :class="['mainview',$route.meta.mainviewclass]" name="default"></router-view>
                                    </keep-alive>
                                </transition>
                            </div>
                        </el-main>
                    </el-container>
                </el-main>
            </el-container>
        </el-container>

        <!-- 阿里云样式菜单 TAB -->
        <el-container v-if="type=='5'">
            <el-header v-show="!fullscreen" height="50px" class="app-header">
                <hd-logo :sysname="name" :fontColor="color" :logo="logo"></hd-logo>
                <userset :alarm="alarm" :user="user" :rid="rid"></userset>
                <slot name="extend"></slot>
            </el-header>
            <el-container>
               
                <el-main>
                    <el-container>
                        <el-header height="25px">
                            <el-aside :width="alimenusize" v-show="!fullscreen" style="height:100%;float:left;">
                                <hd-ali-menu :menus="menus" @handler="open" @lite-changed="liteChange"></hd-ali-menu>
                            </el-aside>
                            <tags :menus="menus" @handler="open"></tags>
                        </el-header>
                        <el-main class="app-page" id="app-el-main"  v-bar>
                            <div>
                                <transition name="fade" mode="out-in">
                                    <keep-alive :include="cachedViews">
                                        <router-view :class="['mainview',$route.meta.mainviewclass]" name="default"></router-view>
                                    </keep-alive>
                                </transition>
                            </div>
                        </el-main>
                    </el-container>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import Tags from './components/singleTags.vue'
import userset from './components/userset.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'app',
    components: { Tags, userset },
    props: {
        menus: {
            type: Array,
            default: () => {
                return []
            }
        },
        logo: {
            type: String,
            default: '/static/images/hdlogo.png'
        },
        name: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: '1'
        },
        alarm: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            color: '#6a737c',
            user: {
                name: '管理员',
                Roles: [
                    {
                        role: '1232sdf',
                        name: '和达管理员'
                    },
                    {
                        role: '1232ssdf',
                        name: '深水管理员'
                    }
                ]
            },
            rid: '1232sdf',
            lmenusize:"140px",
            alimenusize:'120px'
        }
    },
    methods: {
        open(m) {
            if (m.target == '_blank') {
                window.open(m.Val)
                return
            }
            this.$store.dispatch('addVisitedViews', m)
            this.$router.push(m.Val)
        },
        liteChange(islite){
            if(islite){
                this.lmenusize='40px';
            }else{
                this.lmenusize='140px';
            }

        }
    },
    computed: {
        ...mapGetters(['cachedViews', 'fullscreen'])
    }
}
</script>
<style lang="less">
.app-page > .vb-dragger {
    width: 5px;
}
.app-page > .vb-dragger > .vb-dragger-styler {
    width: 5px;
    border-radius: 15px;
}
</style>


