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
    // 使用者通知
    userNotification: [
      {
        title: '新功能公告',
        text: '系統增設模擬手機畫面功能'
      },
      {
        title: '系統維護公告',
        text: '系統將於 2020/8/15 05:00-06:00 暫停服務，造成不便請見諒'
      }
    ]
  },
  mutations: {

  },
  actions: {

  },
  modules: {
  }
})