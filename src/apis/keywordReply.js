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
  createReplyMessage({
    params: {
      botId: botId
    },
    data: data
  }) {
    return apiHelper.post(`/bots/${botId}/reply-message`, data)
  },
  // 刪除 reply message
  deleteReplyMessage({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId,
      replyMessageUuid: replyMessageUuid
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}&replyMessageUuid=${replyMessageUuid}`

    return apiHelper.delete(`/bots/${botId}/reply-message?${queryString}`)
  },

  // 新增 text event
  createTextEvent({
    params: {
      botId: botId
    },
    data: data
  }) {
    return apiHelper.post(`/bots/${botId}/text-event`, data)
  },
  // 刪除 text event
  deleteTextEvent({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId,
      uuid: textEventUuid
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}&textEventUuid=${textEventUuid}`

    return apiHelper.delete(`/bots/${botId}/text-event?${queryString}`)
  },


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
  postKeywordReply({
    params: {
      botId: botId
    },
    data: data
  }) {
    return apiHelper.post(`/bots/${botId}/keyword-reply`, data)
  },



}
