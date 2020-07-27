import { apiHelper } from '../utils/helpers.js'

export default {
  // 新增 replyModule
  createReplyModule({
    params: {
      botId: botId
    },
    data: data
  }) {
    return apiHelper.post(`/bots/${botId}/reply-module`, data)
  },
  // 取得 replyModules
  getReplyModules({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}`

    return apiHelper.get(`/bots/${botId}/reply-module?${queryString}`, {
    })
  },
}