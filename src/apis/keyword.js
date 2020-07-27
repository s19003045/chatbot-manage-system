import { apiHelper } from '../utils/helpers.js'

export default {
  // 新增關鍵字
  createKeyword({
    params: {
      botId: botId
    },
    data: data
  }) {
    return apiHelper.post(`/bots/${botId}/keyword`, data)
  },
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
  // 刪除關鍵字
  deleteKeyword({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId,
      keywordUuid: keywordUuid
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}&keywordUuid=${keywordUuid}`

    return apiHelper.delete(`/bots/${botId}/keyword?${queryString}`)
  },
  // 儲存關鍵字
  putKeyword({
    params: {
      botId: botId
    },
    data: data
  }) {
    return apiHelper.put(`/bots/${botId}/keyword`, data)
  },

}
