const Vue = require('vue/dist/vue.js');
window.Vue=Vue;
import { NumberFormat,DateFormat,ShortTime,TimeSpan,PercentFormat} from "../../src/utils/util";
//注册过滤器
//根据数据字典类型和Value获取Name值
// Vue.filter("CODE", Bind);
//数字格式化
Vue.filter("NUMBER", NumberFormat);
//时间格式化
Vue.filter("DATE", DateFormat);

Vue.filter("ShortTime", ShortTime);

Vue.filter("TimeSpan", TimeSpan);

Vue.filter("PercentFormat", PercentFormat);