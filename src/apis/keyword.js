import { apiHelper } from '../utils/helpers.js'

export default {
  // 取得關鍵字
  getKeywords({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}`

    return apiHelper.get(`/bots/${botId}/keywords?${queryString}`, {
    })
  },
}
