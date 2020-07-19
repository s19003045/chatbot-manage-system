import { apiHelper } from '../utils/helpers.js'

export default {
  // 新增 postback module
  createModulePostBack({
    params: {
      botId: botId
    },
    data: data
  }) {
    return apiHelper.post(`/bots/${botId}/module-postback`, data)
  },
  // 取得回傳動作(postback)回應模組
  getPostBackReply({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}`

    return apiHelper.get(`/bots/${botId}/postback-reply?${queryString}`, {
    })
  },

}