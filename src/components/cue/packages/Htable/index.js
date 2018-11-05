import HdHtable from './src/index.vue';

HdHtable.install = function(Vue) {
  Vue.component(HdHtable.name, HdHtable);
};

export default HdHtable;