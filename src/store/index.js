import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 引入actions, mutations, getters
import actions from "./actions.js"
import mutations from "./mutations.js"
import getters from "./getters.js"


const state = {
  object: {
    "DailyWaterSupply": 123123,
    "MinPressure": 0.23,
    "SchemeNO": "1"
  },
  apilist1data:"",
  apilist2data: "",
  apilist3data: ""
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})