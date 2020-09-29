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
      id: 1,
      botId: 'bot-12345'
    },
    // channel 資料
    channel: {
      id: 1,
      channelName: '鱷魚醫生',
      botId: 'bot-12345'
    },
    count: 1,
    //是否已驗證
    isAuthenticated: true,
    token: '',
    isSaved: true,
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
  getters: {

  },
  mutations: {
    /**
     * 
     * @param {*} state 
     * @param {Object} payload
     * @param {boolean} payload.isEditing - is user editing? 
     */
    changeSavingStatus(state, payload) {
      // 若使用者正在編輯，則變更 isSaved 為 false
      // 若使用者已儲存編輯，則改更 isSaved 為 true
      state.isSaved = !payload.isEditing
    }
  },
  // synchronous method
  actions: {

  },
  // asynchronous method
  modules: {
  }
})