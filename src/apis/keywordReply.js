import { apiHelper } from '../utils/helpers.js'

export default {
  // 新增 module keyword
  createModuleKeyword({
    params: {
      botId: botId
    },
    data: data
  }) {
    return apiHelper.post(`/bots/${botId}/module-keyword`, data)
  },
  // 刪除 module keyword
  deleteModuleKeyword({
    params: {
      botId: botId
    },
    data: data
  }) {
    console.log('data:', data)
    //
    return apiHelper.post(`/bots/${botId}/module-keyword`, data)
  },

  // 取得關鍵字回應模組
  getKeywordReply(botId, ChatbotId) {
    return apiHelper.get(`/bots/${botId}/keyword-reply?ChatbotId=${ChatbotId}`, {
    })
  },
}
