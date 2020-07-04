import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import SignIn from './views/SignIn.vue'

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
      component: () => import('./views/dashboard/Index.vue'),
      children: [
        // 客戶可以設定歡迎訊息
        {
          path: 'overview',
          name: 'overview',
          component: () => import('./views/dashboard/components/Overview.vue')
        },
        // 客戶可以設定歡迎訊息
        {
          path: 'editor-bot/welcome',
          name: 'editor-bot-welcome',
          component: () => import('./views/dashboard/components/EditorBotWelcome.vue')
        },
        // 客戶可以編輯機器人的關鍵字，並設定動作
        {
          path: 'editor-bot/keyword-reply',
          name: 'editor-bot-keyword-reply',
          component: () => import('./views/dashboard/components/EditorBotKeyword.vue')
        },
        // 客戶可以設定自動回覆訊息(當使用者輸入的訊息，無適當回應方式時)
        {
          path: 'editor-bot/auto-reply',
          name: 'editor-bot-auto-reply',
          component: () => import('./views/dashboard/components/EditorBotAutoReply.vue')
        },
        // 客戶可以設定使用者標籤
        {
          path: 'user/tag-management',
          name: 'user-tag-management',
          component: () => import('./views/dashboard/components/UserTagManagement.vue')
        },
        // 客戶可以建立群發訊息
        {
          path: 'broadcast/create',
          name: 'broadcast-create',
          component: () => import('./views/dashboard/components/BroadcastCreate.vue')
        },
        // 客戶可以查看群發訊息
        {
          path: 'broadcast/overview',
          name: 'broadcast-overview',
          component: () => import('./views/dashboard/components/BroadcastOverview.vue')
        },
        // 客戶可以在平台與使用者對話
        {
          path: 'message-center',
          name: 'message-center',
          component: () => import('./views/dashboard/components/MessageCenter.vue')
        },
        // 客戶可以調整機器人的基本設定
        {
          path: 'setting',
          name: 'setting',
          component: () => import('./views/dashboard/components/Setting.vue')
        },
        // 客戶可以查看各訊息樣版的分析數據
        {
          path: 'analytics/template',
          name: 'analytics-template',
          component: () => import('./views/dashboard/components/AnalyticsTemplate.vue')
        },
        // 客戶可以查看使用者數、成長趨勢
        {
          path: 'analytics/customer',
          name: 'analytics-customer',
          component: () => import('./views/dashboard/components/AnalyticsCustomer.vue')
        },
        // 客戶以查看各類型的訊息量：reply-message、push-message
        {
          path: 'analytics/message',
          name: 'analytics-message',
          component: () => import('./views/dashboard/components/AnalyticsMessage.vue')
        },
      ]
    },
    // // 客戶可以設定歡迎訊息
    // {
    //   path: '/console/bots/:botId/overview',
    //   name: 'overview',
    //   component: () => import('./views/Overview.vue')
    // },
    // // 客戶可以設定歡迎訊息
    // {
    //   path: '/console/bots/:botId/editor-bot/welcome',
    //   name: 'editor-bot-welcome',
    //   component: () => import('./views/EditorBotWelcome.vue')
    // },
    // // 客戶可以編輯機器人的關鍵字，並設定動作
    // {
    //   path: '/console/bots/:botId/editor-bot/keyword-reply',
    //   name: 'editor-bot-keyword-reply',
    //   component: () => import('./views/EditorBotKeyword.vue')
    // },
    // // 客戶可以設定自動回覆訊息(當使用者輸入的訊息，無適當回應方式時)
    // {
    //   path: '/console/bots/:botId/editor-bot/auto-reply',
    //   name: 'editor-bot-auto-reply',
    //   component: () => import('./views/EditorBotAutoReply.vue')
    // },
    // // 客戶可以設定使用者標籤
    // {
    //   path: '/console/bots/:botId/user/tag-management',
    //   name: 'user-tag-management',
    //   component: () => import('./views/UserTagManagement.vue')
    // },
    // // 客戶可以建立群發訊息
    // {
    //   path: '/console/bots/:botId/broadcast/create',
    //   name: 'broadcast-create',
    //   component: () => import('./views/BroadcastCreate.vue')
    // },
    // // 客戶可以查看群發訊息
    // {
    //   path: '/console/bots/:botId/broadcast/overview',
    //   name: 'broadcast-overview',
    //   component: () => import('./views/BroadcastOverview.vue')
    // },
    // // 客戶可以在平台與使用者對話
    // {
    //   path: '/console/bots/:botId/message-center',
    //   name: 'message-center',
    //   component: () => import('./views/MessageCenter.vue')
    // },
    // // 客戶可以調整機器人的基本設定
    // {
    //   path: '/console/bots/:botId/setting',
    //   name: 'setting',
    //   component: () => import('./views/Setting.vue')
    // },
    // // 客戶可以查看各訊息樣版的分析數據
    // {
    //   path: '/console/bots/:botId/analytics/template',
    //   name: 'analytics-template',
    //   component: () => import('./views/AnalyticsTemplate.vue')
    // },
    // // 客戶可以查看使用者數、成長趨勢
    // {
    //   path: '/console/bots/:botId/analytics/customer',
    //   name: 'analytics-customer',
    //   component: () => import('./views/AnalyticsCustomer.vue')
    // },
    // // 客戶以查看各類型的訊息量：reply-message、push-message
    // {
    //   path: '/console/bots/:botId/analytics/message',
    //   name: 'analytics-message',
    //   component: () => import('./views/AnalyticsMessage.vue')
    // },
    // Not found page
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})


export default router