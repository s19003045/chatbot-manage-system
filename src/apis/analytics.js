import { apiHelper } from '../utils/helpers.js'

export default {
  //**********分析模組*********//
  // 分析模組-取得關鍵字模組使用數據
  getModuleKeywordAnalysis({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}`

    return apiHelper.get(`/bots/${botId}/module-keyword-analysis?${queryString}`, {
    })
  },
  // 分析模組-取得postback模組使用數據
  getModulePostBackAnalysis({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}`

    return apiHelper.get(`/bots/${botId}/module-postback-analysis?${queryString}`, {
    })
  },
  // 分析模組-取得關鍵字模組使用數據
  getReplyMessageAnalysis({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}`

    return apiHelper.get(`/bots/${botId}/reply-message-analysis?${queryString}`, {
    })
  },
  // 分析模組-取得回應模組(replyModule)使用數據
  getReplyModuleAnalysis({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}`

    return apiHelper.get(`/bots/${botId}/reply-module-analysis?${queryString}`, {
    })
  },

}
