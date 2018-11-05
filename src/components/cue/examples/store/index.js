import Vue from 'vue'
import Vuex from 'vuex'
import Layout from './modules/Layout'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Layout
  },
  getters
})

export default store
