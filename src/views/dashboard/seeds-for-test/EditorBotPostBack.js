module.exports = {
  //測試用假資料
  modulePostBacks: [
    {
      ChatbotId: "1",
      module: {
        name: "點餐機-海陸大餐",
        uuid: "75a0726b-41d1-41e3-ae6f-f5892a539516",
        status: "in-use"
      },
      postBackEvents: [
        {
          name: "點餐機",
          eventType: "postBack",
          subject: "點餐機",
          data: "海陸大餐"
        }
      ],
      replyMessage: {
        messageTemplate: {
          type: "template",
          altText: "this is a buttons template",
          template: {
            type: "buttons",
            actions: [
              {
                type: "postback",
                label: "我要加價換套餐",
                displayText: "我要加價換套餐",
                data: "subject=海陸大餐&data=我要加價換套餐"
              },
              {
                type: "postback",
                label: "我不要加價換套餐",
                displayText: "我不要加價換套餐",
                data: "subject=海陸大餐&data=我不要加價換套餐"
              }
            ],
            title: "海陸大餐",
            text: "是否要加價換套餐?"
          }
        },
        type: "text",
        name: "海陸大餐",
        status: "in-use"
      }
    },
    {
      ChatbotId: "1",
      module: {
        name: "點餐機-素食大餐",
        uuid: "ec36e1e9-fa4a-4017-b3c3-361ffa55e4e9",
        status: "in-use"
      },
      PostBackEvent: {
        name: "點餐機",
        eventType: "postBack",
        subject: "點餐機",
        data: "素食大餐"
      },
      replyMessage: {
        messageTemplate: {
          type: "template",
          altText: "this is a buttons template",
          template: {
            type: "buttons",
            actions: [
              {
                type: "postback",
                label: "我要加價換套餐",
                displayText: "我要加價換套餐",
                data: "subject=素食大餐&data=我要加價換套餐"
              },
              {
                type: "postback",
                label: "我不要加價換套餐",
                displayText: "我不要加價換套餐",
                data: "subject=素食大餐&data=我不要加價換套餐"
              }
            ],
            title: "素食大餐",
            text: "是否要加價換套餐?"
          }
        },
        type: "text",
        name: "素食大餐",
        status: "in-use"
      }
    }
  ],
  //測試用假資料
  replyMessage: {
    messageTemplate: [
      {
        type: "text",
        text: "hello world",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "message",
                text: "好棒",
                label: "好棒"
              }
            },
            {
              type: "action",
              action: {
                type: "postback",
                label: "Buy",
                data: "subject=衣服&data=M12",
                displayText: "Buy"
              }
            },
            {
              type: "action",
              action: {
                type: "location",
                label: "Location"
              }
            },
            {
              type: "action",
              action: {
                type: "camera",
                label: "Camera"
              }
            },
            {
              type: "action",
              action: {
                type: "cameraRoll",
                label: "Camera roll"
              }
            },
            {
              type: "action",
              action: {
                type: "datetimepicker",
                label: "Select date",
                data: "storeId=12345",
                mode: "datetime",
                initial: "2017-12-25t00:00",
                max: "2018-01-24t23:59",
                min: "2017-12-25t00:00"
              }
            }
          ]
        }
      },
      {
        type: "text",
        text: "good job",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "message",
                text: "好棒",
                label: "好棒"
              }
            },
            {
              type: "action",
              action: {
                type: "postback",
                label: "Buy",
                data: "subject=衣服&data=M12",
                displayText: "Buy"
              }
            },
            {
              type: "action",
              action: {
                type: "location",
                label: "Location"
              }
            },
            {
              type: "action",
              action: {
                type: "camera",
                label: "Camera"
              }
            },
            {
              type: "action",
              action: {
                type: "cameraRoll",
                label: "Camera roll"
              }
            },
            {
              type: "action",
              action: {
                type: "datetimepicker",
                label: "Select date",
                data: "storeId=12345",
                mode: "datetime",
                initial: "2017-12-25t00:00",
                max: "2018-01-24t23:59",
                min: "2017-12-25t00:00"
              }
            }
          ]
        }
      }
    ],
    type: "text",
    name: "產前檢查",
    uuid: "fab40e7a-76ba-4e04-9369-675b4327e875",
    status: "in-use"
  },
  //測試用假資料
  postBackEvents: [
    {
      "name": "服務選單",
      "eventType": "postBack",
      "uuid": "da28f189-8635-452e-951e-5d7b10c08829",
      "subject": "服務選單",
      "data": "產前檢查"
    },
    {
      "name": "服務選單",
      "eventType": "postBack",
      "uuid": "da28f189-8635-452e-951e-5d7b10c08829",
      "subject": "服務選單",
      "data": "產前檢查"
    }
  ]

}