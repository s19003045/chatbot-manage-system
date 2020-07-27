import { apiHelper } from '../utils/helpers.js'

export default {
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