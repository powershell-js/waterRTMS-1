import HdReport from './src/index.vue';

/* istanbul ignore next */
HdReport.install = function(Vue) {
  Vue.component(HdReport.name, HdReport);
};

export default HdReport;
