'use strict'

//載入 LINE message object schema
const textMessageSchema = require('./messageSchema/textMessageSchema.json')
const confirmTemplateSchema = require('./messageSchema/confirmTemplateSchema.json')
const buttonsTemplateSchema = require('./messageSchema/buttonsTemplateSchema.json')
const carouselTemplateSchema = require('./messageSchema/carouselTemplateSchema.json')
const quickReplySchema = require('./messageSchema/quickReplySchema.json')

// 載入 LINE action object schema
const postbackSchema = require('./actionSchema/postbackSchema.json')
const messageSchema = require('./actionSchema/messageSchema.json')
const uriSchema = require('./actionSchema/uriSchema.json')
const cameraSchema = require('./actionSchema/cameraSchema.json')
const cameraRollSchema = require('./actionSchema/cameraRollSchema.json')
const locationSchema = require('./actionSchema/locationSchema.json')
const datetimePickerSchema = require('./actionSchema/datetimePickerSchema.json')

// 載入歡迎訊息樣版
const LINEwelcomeMsgSchema = require('./welcomeMsgSchema/LINEwelcomeMsgSchema.json')

module.exports = {
  msgGenerator: (config) => {
    if (config.type === undefined) {
      throw new Error("config.type undefined !!")
    }

    switch (config.type) {
      case 'text':
        return textMessageSchema
      case 'buttonsTemplate':
        return buttonsTemplateSchema
      case 'confirmTemplate':
        return confirmTemplateSchema
      case 'carouselTemplate':
        return carouselTemplateSchema
      case 'quickReply':
        return quickReplySchema

      default:
        throw new Error("We don't have such type!!")
    }
  },
  actionGenerator: (config) => {
    if (config.type === undefined) {
      throw new Error("config.type undefined !!")
    }

    switch (config.category) {
      case 'quickReply':
        switch (config.type) {
          case 'postback':
            return postbackSchema
          case 'message':
            return messageSchema
          case 'camera':
            return cameraSchema
          case 'cameraRoll':
            return cameraRollSchema
          case 'location':
            return locationSchema
          case 'datetimepicker':
            return datetimePickerSchema
          default:
            throw new Error("We don't have such type!!")
        }
      default:
        switch (config.type) {
          case 'postback':
            return postbackSchema.action
          case 'message':
            return messageSchema.action
          case 'uri':
            return uriSchema.action
          case 'camera':
            return cameraSchema.action
          case 'cameraRoll':
            return cameraRollSchema.action
          case 'location':
            return locationSchema.action
          case 'datetimepicker':
            return datetimePickerSchema.action
          default:
            throw new Error("We don't have such type!!")
        }
    }

  },
  welcomeMsgGenerator: (config) => {
    if (config.type === undefined) {
      throw new Error("config.type undefined !!")
    }
    switch (config.type) {
      case 'LINE':
        return JSON.parse(JSON.stringify(LINEwelcomeMsgSchema))
      default:
        return JSON.parse(JSON.stringify(LINEwelcomeMsgSchema))
    }
  }
}
