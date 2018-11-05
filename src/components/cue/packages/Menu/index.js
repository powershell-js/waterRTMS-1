import HdMenu from './src/menu.vue';

/* istanbul ignore next */
HdMenu.install = function(Vue) {
  Vue.component(HdMenu.name, HdMenu);
};

import HdHMenu from './src/horizontal.vue';

/* istanbul ignore next */
HdHMenu.install = function(Vue) {
  Vue.component(HdHMenu.name, HdHMenu);
};

export {HdMenu,HdHMenu};
