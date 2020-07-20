'use strict'

//載入 schema
const textMessageSchema = require('./messageSchema/textMessageSchema.json')
const confirmTemplateSchema = require('./messageSchema/confirmTemplateSchema.json')
const buttonsTemplateSchema = require('./messageSchema/buttonsTemplateSchema.json')
const carouselTemplateSchema = require('./messageSchema/carouselTemplateSchema.json')


function templateGenerator(config) {
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
    default:
      throw new Error("We don't have such type!!")
  }
}

module.exports = templateGenerator