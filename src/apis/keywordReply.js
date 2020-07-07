import { apiHelper } from '../utils/helpers.js'

export default {
  // 取得關鍵字回應模組
  getKeywordReply(botId, ChatbotId) {
    return apiHelper.get(`/bots/${botId}/keyword-reply?ChatbotId=${ChatbotId}`, {
    })
  },
}
