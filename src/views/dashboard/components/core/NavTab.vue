<template>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        id="overview-tab"
        data-toggle="tab"
        :to="{name:'overview',params:{botId:'bot-abcde'}}"
        role="tab"
        aria-controls="overview"
        aria-selected="true"
      >總覽</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        id="message-center-tab"
        data-toggle="tab"
        :to="{name:'message-center'}"
        role="tab"
        aria-controls="message-center"
        aria-selected="false"
      >客服中心</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        id="editor-bot-welcome-tab"
        data-toggle="tab"
        :to="{name:'editor-bot-welcome'}"
        role="tab"
        aria-controls="editor-bot-welcome"
        aria-selected="false"
      >歡迎訊息</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        id="editor-bot-keyword-reply-tab"
        data-toggle="tab"
        :to="{name:'editor-bot-keyword-reply'}"
        role="tab"
        aria-controls="editor-bot-keyword-reply"
        aria-selected="false"
      >關鍵字設定</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        id="editor-bot-auto-reply-tab"
        data-toggle="tab"
        :to="{name:'editor-bot-auto-reply'}"
        role="tab"
        aria-controls="editor-bot-auto-reply"
        aria-selected="false"
      >自動回覆</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        id="broadcast-overview-tab"
        data-toggle="tab"
        :to="{name:'broadcast-overview'}"
        role="tab"
        aria-controls="broadcast-overview"
        aria-selected="false"
      >群發訊息</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        id="analytics-template-tab"
        data-toggle="tab"
        :to="{name:'analytics-template'}"
        role="tab"
        aria-controls="analytics-template"
        aria-selected="false"
      >訊息樣版分析</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        id="analytics-customer-tab"
        data-toggle="tab"
        :to="{name:'analytics-customer'}"
        role="tab"
        aria-controls="analytics-customer"
        aria-selected="false"
      >使用者分析</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        id="analytics-message-tab"
        data-toggle="tab"
        :to="{name:'analytics-message'}"
        role="tab"
        aria-controls="analytics-message"
        aria-selected="false"
      >訊息分析</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        id="setting-tab"
        data-toggle="tab"
        :to="{name:'setting'}"
        role="tab"
        aria-controls="setting"
        aria-selected="false"
      >機器人設定</router-link>
    </li>
  </ul>
</template>

<script>
export default {};
</script>