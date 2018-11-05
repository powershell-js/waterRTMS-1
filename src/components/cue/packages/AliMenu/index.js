import HdAliMenu from './src/menu.vue';

/* istanbul ignore next */
HdAliMenu.install = function(Vue) {
  Vue.component(HdAliMenu.name, HdAliMenu);
};

export {HdAliMenu};
