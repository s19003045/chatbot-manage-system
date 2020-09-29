import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import SignIn from './views/SignIn.vue'

import store from './store'

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active', //為當前選定的 router-link 增加 class，class 名稱自行定義
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/signin'
    },
    // 客戶登入主控台
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/console/bots/:botId',
      component: () => import('./views/dashboard/Main.vue'),
      children: [
        // 客戶可以設定歡迎訊息
        {
          path: 'overview',
          name: 'overview',
          component: () => import('./views/dashboard/views/Overview.vue')
        },
        // 客戶可以設定歡迎訊息
        {
          path: 'editor-bot/welcome',
          name: 'editor-bot-welcome',
          component: () => import('./views/dashboard/views/EditorBotWelcome.vue')
        },
        // 客戶可以編輯機器人的關鍵字，並設定動作
        {
          path: 'editor-bot/keyword-reply',
          name: 'editor-bot-keyword-reply',
          component: () => import('./views/dashboard/views/EditorBotKeyword.vue')
        },
        // 客戶可以編輯 機器人腳本
        {
          path: 'editor-bot/script',
          name: 'editor-bot-script',
          component: () => import('./views/dashboard/views/EditorBotScript.vue')
        },
        // 客戶可以設定自動回覆訊息(當使用者輸入的訊息，無適當回應方式時)
        {
          path: 'editor-bot/auto-reply',
          name: 'editor-bot-auto-reply',
          component: () => import('./views/dashboard/views/EditorBotAutoReply.vue')
        },
        // 客戶可以設定使用者標籤
        {
          path: 'user/tag-management',
          name: 'user-tag-management',
          component: () => import('./views/dashboard/views/UserTagManagement.vue')
        },
        // 客戶可以建立群發訊息
        {
          path: 'broadcast/create',
          name: 'broadcast-create',
          component: () => import('./views/dashboard/views/BroadcastCreate.vue')
        },
        // 客戶可以查看群發訊息
        {
          path: 'broadcast/overview',
          name: 'broadcast-overview',
          component: () => import('./views/dashboard/views/BroadcastOverview.vue')
        },
        // 客戶可以在平台與使用者對話
        {
          path: 'message-center',
          name: 'message-center',
          component: () => import('./views/dashboard/views/MessageCenter.vue')
        },
        // 客戶可以調整機器人的基本設定
        {
          path: 'setting',
          name: 'setting',
          component: () => import('./views/dashboard/views/Setting.vue')
        },
        // 客戶可以查看各訊息樣版的分析數據
        {
          path: 'analytics/template',
          name: 'analytics-template',
          component: () => import('./views/dashboard/views/AnalyticsTemplate.vue')
        },
        // 客戶可以查看使用者數、成長趨勢
        {
          path: 'analytics/customer',
          name: 'analytics-customer',
          component: () => import('./views/dashboard/views/AnalyticsCustomer.vue')
        },
        // 客戶以查看各類型的訊息量：reply-message、push-message
        {
          path: 'analytics/message',
          name: 'analytics-message',
          component: () => import('./views/dashboard/views/AnalyticsMessage.vue')
        },
      ]
    },
    //測試 konva =>尚在開發中
    {
      path: '/dialogFlow',
      name: 'dialogFlow',
      component: () => import('./views/dashboard/views/DialogFlow.vue')
    },
    // Not found page
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})


router.beforeEach((to, from, next) => {
  // 從 localStorage 取得 token

  // 若未取得 token

  // 若有 token


  // 使用者要註冊
  if (to.name === 'sign-up' && !store.state.isAuthenticated) {
    next()
  }
  // 使用者連結至非 signIn 之其他頁面 & 未經過驗證
  else if (to.name !== 'sign-in' && !store.state.isAuthenticated) {
    next({ name: 'sign-in' })
  }

  next()
})

export default router