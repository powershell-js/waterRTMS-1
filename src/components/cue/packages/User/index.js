import HdUser from './src/userset.vue';

/* istanbul ignore next */
HdUser.install = function(Vue) {
  Vue.component(HdUser.name, HdUser);
};
export default HdUser;
