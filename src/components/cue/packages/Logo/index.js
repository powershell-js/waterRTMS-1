import HdLogo from './src/logo.vue';

/* istanbul ignore next */
HdLogo.install = function(Vue) {
  Vue.component(HdLogo.name, HdIcon);
};

export default HdLogo;
