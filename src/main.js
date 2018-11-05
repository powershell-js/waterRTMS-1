// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import myWindowIndex from './components/js/myWindowIndex'
import Vuex from 'vuex'
//import ElementUI from 'element-ui'
import Cue from './components/cue/src/index.js'
import echarts from 'echarts'
import store from './store/store.js'
import Axios from 'axios';
import Vuebar from 'vuebar';
//import store from './store/index.js';
require("./components/cue/packages/theme/index.less")
Vue.use(Cue)
Vue.use(Vuebar);
require("../static/css/element-ui/index.css")
require("../static/css/element/date-picker.css")

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false
Vue.use(myWindowIndex);
Vue.use(Vuex)
// Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

