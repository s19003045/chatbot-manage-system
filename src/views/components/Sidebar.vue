<template>
  <div class>
    <b-sidebar
      id="console-sidebar"
      bg-variant="white"
      text-variant="dark"
      width="10rem"
      shadow
      visible
      backdrop
    >
      <b-nav vertical pills>
        <b-nav-item
          v-for="(item, index) in navLinks"
          :key="index"
          :to="{name:item.routeName}"
        >{{item.displayName}}</b-nav-item>
      </b-nav>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      navLinks: [
        {
          routeName: "overview",
          displayName: "總覽",
        },
        // {
        //   routeName: "message-center",
        //   displayName: "客服中心",
        // },
        {
          routeName: "editor-bot-welcome",
          displayName: "歡迎訊息",
        },
        {
          routeName: "editor-bot-keyword-reply",
          displayName: "關鍵字設定",
        },
        {
          routeName: "editor-bot-script",
          displayName: "機器人腳本",
        },
        // {
        //   routeName: "user-tag-management",
        //   displayName: "使用者標籤",
        // },
        // {
        //   routeName: "broadcast-create",
        //   displayName: "群發訊息",
        // },
        {
          routeName: "analytics-template",
          displayName: "訊息樣版分析",
        },
        // {
        //   routeName: "analytics-customer",
        //   displayName: "使用者分析",
        // },
        // {
        //   routeName: "analytics-message",
        //   displayName: "訊息分析",
        // },
        {
          routeName: "setting",
          displayName: "機器人設定",
        },
        {
          routeName: "konva",
          displayName: "Konva",
        },
      ],
    };
  },
};
</script>