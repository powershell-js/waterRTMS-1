# CUE 和达 Vue 组件库

#### 2018年8月29日

>基于和达通用组件样式v1.1 完成样式调整。

>cue和element-ui组件引入方式调整：
引入cue时，自动引入element-ui；
样式引用 import "cue/packages/theme/index.less"，样式包含element-ui样式、cue样式、iconfont字体、awesome字体。

>样式文件结构说明：element-ui：用element-ui主题生成工具生成的样式文件，cue：cue组件的样式及部分element-ui样式工具无法覆盖的样式，font-awesome和fonts：字体图标

