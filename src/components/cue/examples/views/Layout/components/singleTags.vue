<template>
    <div class="tags-view-container" :class="{'is-fullscreen': fullscreen}">
        <div class="tools">
            <a :title="fullscreen ? '退出全屏' : '全屏'" v-if="fullable" @click="onScreenFull">
                <i class="iconfont icon-quanping"></i>
            </a>
            <a title="刷新">
                <i class="el-icon-refresh"></i>
            </a>
            <a title="关注">
                <i class="el-icon-star-off"></i>
            </a>
        </div>
        <div class="tabs">
            <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
                <a ref='tag' class="tags-view-item"
                   :class="isActive(tag)?'active':''"
                   v-for="tag in Array.from(visitedViews)"
                   @click="$emit('handler',tag)" :key="tag.Id">
                    <i class="iconfont icon-biaoqian2"></i>
                    <span>{{tag.Name}}</span>
                    <i class="el-icon-close"
                       v-show="visitedViews.length>1"
                       @click.prevent.stop="closeSelectedTag(tag)"></i>
                </a>
            </scroll-pane>
        </div>
    </div>
</template>

<script>
    import {assign} from '../../../../src/utils/util'
    import {mapGetters} from 'vuex'
    import screenfull from 'screenfull'

    export default {
    props: {
        menus: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            fullable: screenfull.enabled
        }
    },
    computed: {
        ...mapGetters(['visitedViews', 'menuIndex', 'fullscreen'])
    },
    watch: {
        $route() {
            // this.addViewTags()
            this.moveToCurrentTag()
        },
        menus: {
            deep: true,
            immediate: true,
            handler: function(v) {
                if (v.length > 0) {
                    this.createIndex()
                    this.moveToCurrentTag()
                    this.addViewTags()
                }
            }
        }
    },
    mounted() {
        this.addViewTags()
        this.fullable &&
            screenfull.on('change', () => {
                this.$store.dispatch(
                    'fullscreen-change',
                    screenfull.isFullscreen
                )
            })
    },
    methods: {
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
            this.$store.dispatch('setMenuIndex', idx)
        },
        isActive(route) {
            return route.Id === this.$store.state.Layout.currentView.Id
        },
        addViewTags() {
            $.each(this.menuIndex, (k, m) => {
                if (
                    m.Val == this.$route.fullPath ||
                    (m.Val !== '' &&
                        this.$route.fullPath
                            .replace(/\\/g, '/')
                            .indexOf(m.Val) >= 0)
                ) {
                    this.$store.dispatch('addVisitedViews', m)
                }
            })
        },
        moveToCurrentTag() {
            const tags = this.$refs.tag
            if(!tags) return
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag.$el)
                        break
                    }
                }
            })
        },
        closeSelectedTag(view) {
            this.$store.dispatch('delVisitedViews', view).then(views => {
                if (this.isActive(view)) {
                    const latestView = views.slice(-1)[0]
                    if (latestView) {
                        this.$emit('handler',latestView)
                    } else {
                        this.$router.push('/')
                    }
                }
            })
        },
        onScreenFull() {
            screenfull.toggle()
        }
    }
}
</script>
