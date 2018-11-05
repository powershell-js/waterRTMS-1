import HdChart from './src/chart';

HdChart.install = function(Vue) {
  Vue.component(HdChart.name, HdChart);
};

export default HdChart;
