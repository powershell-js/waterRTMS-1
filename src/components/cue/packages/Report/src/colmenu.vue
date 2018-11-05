<template>
    <div class="hd-report-colmenu" @mouseleave="onClose"
         :style="menuStyle">
        <el-scrollbar wrap-class="hd-report-colmenu__wrap">
            <el-tree ref="tree" :data="data" highlight-current
                     :expand-on-click-node="false" show-checkbox
                     :default-checked-keys="checks" node-key="id"
                     :props="{label: 'title', children: 'children'}">
            </el-tree>
        </el-scrollbar>
    </div>
</template>

<style lang="less">
    div.hd-report-colmenu {
        border: 1px solid #ddd;
        box-sizing: border-box;
        position: fixed;
        z-index: 90;
        background: #FFF;
        .el-scrollbar {
            height: 100%;
            width: 100%;
        }
        .el-tree {
            border: 0;
            .el-tree-node__content {
                box-sizing: border-box;
                height: 26px;
                line-height: 26px;
                &:hover {
                    background: #eef1f6;
                }
                .el-tree-node__label {
                    font-size: 12px;
                }
            }
        }
    }
</style>

<script>
    import { uuid } from '../../../src/utils/util';
    export default {
        props: ["cols", "top", "left", "height"],
        data(){
            let dic = {}, data = [], checks = [];
            // 生成副本和字典添加选中
            let clone = (l, c) =>{
                let id = uuid();
                dic[id] = c;
                let cc = {...c, id: id};
                l.push(cc);
                if(!c.hide){
                    checks.push(id);
                }
                if(Array.isArray(c.children)){
                    cc.children = [];
                    c.children.forEach((ch) =>{
                        clone(cc.children, ch);
                    });
                }
            };
            if(Array.isArray(this.cols)){
                this.cols.forEach((c) =>{
                    clone(data, c);
                });
            }
            return {
                dic, data, checks, width: 180
            };
        },
        computed: {
            menuStyle(){
                return {
                    left: `${this.left || 0}px`, top: `${this.top || 0}px`,
                    width: `${this.width || 180}px`,
                    height: `${this.height || 262}px`
                }
            },
            wrapStyle(){
                return {
                    width: `${(this.width || 180) + 16}px`,
                    height: `${(this.height || 262) + 16}px`
                }
            }
        },
        methods: {
            onClose(){
                let checks = this.$refs.tree.getCheckedKeys();
                let result = [];
                let trans = (l, c) =>{
                    let cc = {hide: checks.findIndex(n => n == c.id) == -1};
                    result.push(cc);
                    if(Array.isArray(c.children)){
                        cc.children = [];
                        c.children.forEach((ch) =>{
                            trans(cc.children, ch);
                        });
                    }
                };
                this.data.forEach((c) =>{
                    trans(result, c);
                });
                this.$emit("colmenu-close", result);
            }
        },
        components: {},
        mounted(){
            this.$nextTick(() =>{
                $(this.$el).find(".hd-report-colmenu__wrap")
                    .css(this.wrapStyle);
            });
        }
    }
</script>