import { apiHelper } from '../utils/helpers.js'

export default {
  // 取得歡迎訊息模組
  getWelcomeMsg({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}`

    return apiHelper.get(`/bots/${botId}/welcome?${queryString}`, {
    })
  },
  // 儲存歡迎訊息

}
