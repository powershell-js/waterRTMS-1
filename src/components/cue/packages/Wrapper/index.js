import HdWrapper from './src/wrapper.vue';

/* istanbul ignore next */
HdWrapper.install = function(Vue) {
  Vue.component(HdWrapper.name, HdWrapper);
};
export default HdWrapper;
