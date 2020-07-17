import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //user 資料
    currentUser: {
    },
    //是否已驗證
    isAuthenticated: false,
    token: '',
  },
  mutations: {

  },
  actions: {

  },
  modules: {
  }
})