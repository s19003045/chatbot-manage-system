  // 取得回傳動作(postback)回應模組
  getPostBackReply({
    params: {
      botId: botId
    },
    query: {
      ChatbotId: ChatbotId
    }
  }) {
    let queryString = `ChatbotId=${ChatbotId}`

    return apiHelper.get(`/bots/${botId}/postback-reply?${queryString}`, {
    })
  },