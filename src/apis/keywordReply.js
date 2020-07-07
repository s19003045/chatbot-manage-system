import { apiHelper } from '../utils/helpers.js'

export default {
  // 新增 module keyword
  createModuleKeyword({
    params: botId,
    data: data
  }) {
    return apiHelper.post(`/bots/${botId}/module-keyword`, data)
  },
  // 取得關鍵字回應模組
  getKeywordReply(botId, ChatbotId) {
    return apiHelper.get(`/bots/${botId}/keyword-reply?ChatbotId=${ChatbotId}`, {
    })
  },
}
