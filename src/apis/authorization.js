'use strict'

import { apiHelper } from '../utils/helpers.js'


export default {
  signIn({
    data: data
  }) {
    return apiHelper.post(`/sign-in`, data)
  },
}
