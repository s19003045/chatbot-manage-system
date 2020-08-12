'use strict'

import { apiHelper } from '../utils/helpers.js'
const getToken = () => localStorage.getItem('token')

export default {
  /**
   * 使用者登入
   * @param {Object} data
   * @param {String} data.email
   * @param {String} data.password
   */
  signIn({
    data: data
  }) {
    return apiHelper.post(`/sign-in`, data)
  },

  /**
   * 使用者登出
   * @param {Object} data
   * @param {String} data.userId 
   */
  logout({
    data: data
  }) {
    return apiHelper.post(`/logout`, data)
  },

  /**
   * 使用者註冊
   * @param {Object} data
   * @param {String} data.email
   * @param {String} data.password
   * @param {String} data.passwordCheck 
   */
  signUp({
    data: data
  }) {
    return apiHelper.post(`/signup`, data)
  },

  /**
   * 取得使用者資料
   */
  getCurrentUser() {
    return apiHelper.post(`/get_current_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
