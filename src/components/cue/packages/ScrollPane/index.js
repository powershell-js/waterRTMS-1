import ScrollPane from './src/index.vue';

/* istanbul ignore next */
ScrollPane.install = function(Vue) {
  Vue.component(ScrollPane.name, ScrollPane);
};

export default ScrollPane;
