<template>
    <layout id="app" :logo="logo" :name="name" :menus="menus" :type="type">
        <el-select slot="extend" v-model="type" placeholder="请选择" style="float: right;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </layout>
</template>
<script>
    import layout from './views/Layout/index.vue'

    export default {
    name: 'app',
    components: { layout },
    data() {
        return {
            options: [
                { label: '头部菜单（无TAB）', value: '1' },
                { label: '头部菜单（TAB）', value: '2' },
                { label: '左侧菜单（无TAB）', value: '3' },
                { label: '左侧菜单（TAB）', value: '4' },
                { label: '阿里云样式菜单（TAB）', value: '5' }
            ],
            type: '2',
            name: 'CUE',
            logo: '/static/images/hdlogo.png',
            menus: [
                {
                    Id: '59a654321ef3050a24e7978a',
                    Name: '组件',
                    MId: '150407275500012',
                    Icon: 'home',
                    target: '_blank',
                    Val: '',
                    extend: '',
                    Children: [
                        {
                            Id: '59a654321ef3050a24e797121',
                            Name: '图表组件',
                            MId: '1504072755004',
                            Icon: '1',
                            Val: '/chart',
                            target: '_self',
                            Children: []
                        },
                        {
                            Id: '59a654321ef3050a24e797122',
                            Name: 'egrid组件',
                            MId: '1504072755004',
                            Icon: 'baobiaoguanli',
                            Val: '/egrid',
                            target: '_self',
                            Children: []
                        },
                        {
                            Id: '59a654321ef3050a24e797123',
                            Name: 'hgrid组件',
                            MId: '1504072755004',
                            Icon: 'abaobiaoguanli',
                            Val: '/hgrid',
                            Children: []
                        },
                        {
                            Id: '59a654321ef3050a24e797124',
                            Name: 'Report',
                            MId: '1504072755004',
                            Icon: 'baobiaotongji',
                            Val: '/report',
                            Children: []
                        },
                        {
                            Id: '59a654321ef3050a24e797125',
                            Name: '容器',
                            MId: '1504072755004',
                            Icon: 'jichuxinxi',
                            Val: '/wrapper',
                            Children: []
                        },
                        {
                            Id: '59a654321ef3050a24e797126',
                            Name: 'scrolltable',
                            MId: '1504072755004',
                            Icon: 'liebiao',
                            Val: '/scrolltable',
                            Children: []
                        },
                        {
                            Id: '59a654321ef3050a24e797127',
                            Name: 'crud',
                            MId: '1504072755004',
                            Icon: 'agongju',
                            Val: '/crud',
                            Children: []
                        }
                    ]
                },
                {
                    Id: '59a654321ef3050a24e7978c1',
                    Name: '框架',
                    MId: '15040727d55000',
                    Icon: 'yonghupeizhi',
                    Val: '',
                    extend: 'Frame',
                    Children: [
                        {
                            Id: '21a654321ef3050a24e79723',
                            Name: '头部',
                            MId: '15040727550s01',
                            Icon: 'atuceng',
                            Val: '/header',
                            Children: []
                        },
                        {
                            Id: '22a654321ef3050a24e79707',
                            Name: 'Link',
                            MId: '1504072755008',
                            Icon: 'axunjian',
                            Val: '/p/https://cn.bing.com',
                            Children: []
                        }
                    ]
                },
                {
                    Id: '59a654321ef3050a24e7978c',
                    Name: '字体图标',
                    Icon: 'yonghupeizhi',
                    Val: '/static/fonts/demo_fontclass.html',
                    extend: 'Font',
                    Children: []
                },
                {
                    Id: '22a654321ef3050a24e797Y1',
                    Name: '一级菜单',
                    MId: '1504072755008',
                    Icon: '',
                    Val: '',
                    Children: [
                        {
                            Id: '22a654321ef3050a24e79729',
                            Name: '二级菜单',
                            MId: '1504072755008',
                            Icon: 'axunjian',
                            Val: '',
                            Children: [
                                {
                                    Id: '22a654321ef3050a24e797X1',
                                    Name: 'Link1',
                                    MId: '1504072755008',
                                    Icon: 'axunjian',
                                    Val: '/p/https://cn.bing.com?t=1',
                                    Children: []
                                },
                                {
                                    Id: '22a654321ef3050a24e797X2',
                                    Name: 'Link2',
                                    MId: '1504072755008',
                                    Icon: 'axunjian',
                                    Val: '/p/https://cn.bing.com?t=1',
                                    Children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    Id: "ELEMENT-UI", Name: "饿了么", MId:"ELEMENT-UI",
                    Icon: "", target: "_self", Val: "", extend: "", Children: [
                        {
                            Id: "ELEMENT-UI-BUTTON", Name: "按钮", Children: [],
                            MId: "ELEMENT-UI-BUTTON", Icon: "", target: "_self",
                            Val: "/element-ui/button"
                        },
                        {
                            Id: "ELEMENT-UI-RADIO", Name: "单选框", Children: [],
                            MId: "ELEMENT-UI-RADIO", Icon: "", target: "_self",
                            Val: "/element-ui/radio"
                        },
                        {
                            Id: "ELEMENT-UI-CHECKBOX", Name: "复选框", Children: [],
                            MId: "ELEMENT-UI-CHECKBOX", Icon: "", target: "_self",
                            Val: "/element-ui/checkbox"
                        },
                        {
                            Id: "ELEMENT-UI-INPUT", Name: "输入框", Children: [],
                            MId: "ELEMENT-UI-INPUT", Icon: "", target: "_self",
                            Val: "/element-ui/input"
                        },
                        {
                            Id: "ELEMENT-UI-SELECT", Name: "选择器", Children: [],
                            MId: "ELEMENT-UI-SELECT", Icon: "", target: "_self",
                            Val: "/element-ui/select"
                        },
                        {
                            Id: "ELEMENT-UI-SWITCH", Name: "开关", Children: [],
                            MId: "ELEMENT-UI-SWITCH", Icon: "", target: "_self",
                            Val: "/element-ui/switch"
                        },
                        {
                            Id: "ELEMENT-UI-SLIDER", Name: "滑块", Children: [],
                            MId: "ELEMENT-UI-SLIDER", Icon: "", target: "_self",
                            Val: "/element-ui/slider"
                        },
                        {
                            Id: "ELEMENT-UI-DATEPICKER", Name: "日期选择器", Children: [],
                            MId: "ELEMENT-UI-DATEPICKER", Icon: "", target: "_self",
                            Val: "/element-ui/datepicker"
                        },
                        {
                            Id: "ELEMENT-UI-PAGINATION", Name: "分页", Children: [],
                            MId: "ELEMENT-UI-PAGINATION", Icon: "", target: "_self",
                            Val: "/element-ui/pagination"
                        },
                        {
                            Id: "ELEMENT-UI-TABLE", Name: "表格", Children: [],
                            MId: "ELEMENT-UI-TABLE", Icon: "", target: "_self",
                            Val: "/element-ui/table"
                        },
                    ]
                }
            ]
        }
    }
}
</script>
<style lang="less">
#app {
    .demo-content {
        padding: 5px;
    }
    .demo-table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        color: #5e6d82;
        font-size: 14px;
        margin-bottom: 45px;
        th {
            text-align: left;
            border-top: 1px solid #eaeefb;
            background-color: #eff2f7;
            white-space: nowrap;
        }
        td,
        th {
            border-bottom: 1px solid #eaeefb;
            padding: 10px;
            max-width: 250px;
        }
    }
}
</style>
