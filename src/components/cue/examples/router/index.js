import Vue from 'vue'
import Router from 'vue-router'
import Chart from '../views/Chart'
import Egrid from '../views/Egrid'
import Hgrid from '../views/Hgrid'
import Report from '../views/Report'
import Crud from '../views/Crud'
import Headers from '../views/Header'
import Wrapper from '../views/Wrapper'
import Scrolltable from '../views/Scrolltable'

Vue.use(Router)

const router = new Router({
    routes: [
        {path: '/', redirect: '/egrid'},
        {path: '/chart', name: 'chart', component: Chart},
        {path: '/egrid', name: 'egrid', component: Egrid},
        {path: '/hgrid', name: 'hgrid', component: Hgrid},
        {path: '/report', name: 'report', component: Report},
        {path: '/crud', name: 'crud', component: Crud},
        {path: '/header', name: 'header', component: Headers},
        {path: '/wrapper', name: 'wrapper', component: Wrapper},
        {path: '/scrolltable', name: 'scrolltable', component: Scrolltable},
        {path: '/p/:url', component: require('../views/frame.vue')},

        {
            path: '/element-ui/button',
            component: require('../views/element-ui/button.vue')
        },
        {
            path: '/element-ui/radio',
            component: require('../views/element-ui/radio.vue')
        },
        {
            path: '/element-ui/checkbox',
            component: require('../views/element-ui/checkbox.vue')
        },
        {
            path: '/element-ui/input',
            component: require('../views/element-ui/input.vue')
        },
        {
            path: '/element-ui/select',
            component: require('../views/element-ui/select.vue')
        },
        {
            path: '/element-ui/switch',
            component: require('../views/element-ui/switch.vue')
        },
        {
            path: '/element-ui/slider',
            component: require('../views/element-ui/slider.vue')
        },
        {
            path: '/element-ui/datepicker',
            component: require('../views/element-ui/datepicker.vue')
        },
        {
            path: '/element-ui/pagination',
            component: require('../views/element-ui/pagination.vue')
        },
        {
            path: '/element-ui/table',
            component: require('../views/element-ui/table.vue')
        }
    ]
});
router.beforeEach((to, from, next) => {
  var path=to.fullPath;
  let reg = new RegExp("^/p/");
  if(reg.test(to.fullPath) && !to.params.url) {
    let url = to.fullPath.substring(3).replace(/\//g, "\\");
    next({path: '/p/' + url});
  }else{
    if(to.matched.length==0&&!reg.test(path)&&path!="/"){
      let url = to.fullPath.replace(/\//g, "\\");
      url='/p/' + url;
      next({path: url});
    }else{
      next();
    }
  }
})
export default router
