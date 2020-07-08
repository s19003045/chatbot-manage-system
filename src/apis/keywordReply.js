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
    query: {
      ChatbotId: ChatbotId,
      moduleKeywordUuid: moduleKeywordUuid
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}&moduleKeywordUuid=${moduleKeywordUuid}`

    return apiHelper.delete(`/bots/${botId}/module-keyword?${queryString}`)
  },
  // 新增 reply message

  // 刪除 reply message

  // 新增 text event

  // 刪除 text event

  // 儲存關鍵字回應模組



  // 取得關鍵字回應模組
  getKeywordReply({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}`

    return apiHelper.get(`/bots/${botId}/keyword-reply?${queryString}`, {
    })
  },
  // 修改關鍵字回應模組

  // 刪除關鍵字回應模組

}
