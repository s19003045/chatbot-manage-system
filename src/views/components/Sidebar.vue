<template>
  <div class>
    <b-sidebar
      id="console-sidebar"
      bg-variant="white"
      text-variant="dark"
      width="13rem"
      shadow
      visible
      backdrop
      sidebar-class="left-sidebar"
      body-class="left-sidebar-body"
    >
      <b-nav vertical pills>
        <b-nav-item
          v-for="(item, index) in navLinks"
          :key="index"
          :to="{ name: item.routeName, params: { botId: chatbot.botId } }"
          >{{ item.displayName }}</b-nav-item
        >
      </b-nav>
    </b-sidebar>
  </div>
</template>

<script>
// import store
import { mapState } from "vuex";

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
        // {
        //   routeName: "editor-bot-keyword-reply",
        //   displayName: "關鍵字設定",
        // },
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
        // {
        //   routeName: "dialogFlow",
        //   displayName: "機器對話流程圖",
        // },
      ],
    };
  },
  computed: {
    ...mapState(["chatbot", "currentUser"]),
  },
};
</script>

<style lang="scss">
.left-sidebar {
  font-size: 1.1rem;
  padding-bottom: 30px;

  .left-sidebar-body {
    height: 100%;
    /* scrollbar track =>scrollbar 整體樣式 */
    &::-webkit-scrollbar {
      width: 10px;
    }

    /* scrollbar handle =>滑塊*/
    &::-webkit-scrollbar-thumb {
      border-radius: 1rem;
      background-color: #8a8a8a;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    }

    /** scrollbar track => 軌道 */
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }
  }
}
</style>
