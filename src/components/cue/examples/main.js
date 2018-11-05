import Vue from 'vue'
import App from './App'
import router from './router'

// 加载cue样式
import "../packages/theme/index.less";
// import 'element-ui/lib/theme-chalk/index.css';
import Vuebar from 'vuebar';
Vue.use(Vuebar);
import Cue from '../src/index.js'
Vue.use(Cue)
import "./plugins";

import store from './store'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<app/>',
  components: {
    App
  }
})
