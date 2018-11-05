import HdCrud from './src/index.vue';

HdCrud.install = function(Vue) {
  Vue.component(HdCrud.name, HdCrud);
};

export default HdCrud;