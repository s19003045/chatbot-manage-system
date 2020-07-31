import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //user 資料
    currentUser: {
    },
    // bot 資料
    chatbot: {
      botId: 'bot-1111'
    },
    // channel 資料
    channel: {
      id: 1,
      channelName: '鱷魚醫生',
      botId: 'bot-1111'
    },
    count: 1,
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