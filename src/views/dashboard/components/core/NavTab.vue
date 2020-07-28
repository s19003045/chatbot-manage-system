<template>
  <ul class="nav nav-pills justify-content-center mt-3" id="consoleFunction" role="tablist">
    <!-- <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'overview'}"
        id="overview-tab"
        data-toggle="pill"
        :to="{name:'overview',params:{botId:'bot-abcde'}}"
        role="tab"
        aria-controls="overview"
        aria-selected="true"
      >總覽</router-link>
    </li>-->
    <!-- <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'message-center'}"
        id="message-center-tab"
        data-toggle="pill"
        :to="{name:'message-center'}"
        role="tab"
        aria-controls="message-center"
        aria-selected="false"
      >客服中心</router-link>
    </li>-->
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'editor-bot-welcome'}"
        id="editor-bot-welcome-tab"
        data-toggle="pill"
        :to="{name:'editor-bot-welcome'}"
        role="tab"
        aria-controls="editor-bot-welcome"
        aria-selected="false"
      >歡迎訊息</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'editor-bot-keyword-reply'}"
        id="editor-bot-keyword-reply-tab"
        data-toggle="pill"
        :to="{name:'editor-bot-keyword-reply'}"
        role="tab"
        aria-controls="editor-bot-keyword-reply"
        aria-selected="false"
      >關鍵字設定</router-link>
    </li>
    <!-- <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'ditor-bot-post-back'}"
        id="editor-bot-post-back-tab"
        data-toggle="pill"
        :to="{name:'editor-bot-post-back'}"
        role="tab"
        aria-controls="editor-bot-post-back"
        aria-selected="false"
      >回傳動作模組</router-link>
    </li>-->
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'editor-bot-script'}"
        id="editor-bot-script-tab"
        data-toggle="pill"
        :to="{name:'editor-bot-script'}"
        role="tab"
        aria-controls="editor-bot-script"
        aria-selected="false"
      >機器人腳本</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'editor-bot-auto-reply'}"
        id="editor-bot-auto-reply-tab"
        data-toggle="pill"
        :to="{name:'editor-bot-auto-reply'}"
        role="tab"
        aria-controls="editor-bot-auto-reply"
        aria-selected="false"
      >自動回覆</router-link>
    </li>
    <!-- <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'broadcast-overview'}"
        id="broadcast-overview-tab"
        data-toggle="pill"
        :to="{name:'broadcast-overview'}"
        role="tab"
        aria-controls="broadcast-overview"
        aria-selected="false"
      >群發訊息</router-link>
    </li>-->
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'analytics-template'}"
        id="analytics-template-tab"
        data-toggle="pill"
        :to="{name:'analytics-template'}"
        role="tab"
        aria-controls="analytics-template"
        aria-selected="false"
      >訊息樣版分析</router-link>
    </li>
    <!-- <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'analytics-customer'}"
        id="analytics-customer-tab"
        data-toggle="pill"
        :to="{name:'analytics-customer'}"
        role="tab"
        aria-controls="analytics-customer"
        aria-selected="false"
      >使用者分析</router-link>
    </li>-->
    <!-- <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'analytics-message'}"
        id="analytics-message-tab"
        data-toggle="pill"
        :to="{name:'analytics-message'}"
        role="tab"
        aria-controls="analytics-message"
        aria-selected="false"
      >訊息分析</router-link>
    </li>-->
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'setting'}"
        id="setting-tab"
        data-toggle="pill"
        :to="{name:'setting'}"
        role="tab"
        aria-controls="setting"
        aria-selected="false"
      >機器人設定</router-link>
    </li>
    <li class="nav-item" role="presentation">
      <router-link
        class="nav-link"
        :class="{active:navTabSelect === 'konva'}"
        id="konva-tab"
        data-toggle="pill"
        :to="{name:'konva'}"
        role="tab"
        aria-controls="konva"
        aria-selected="false"
      >Konva</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    navTabSelect: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {},
  beforeUpdate() {},
};
</script>