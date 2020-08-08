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
      <!-- <b-nav vertical pills> -->
      <div class="list-group">
        <!-- <li
          v-for="(item, index) in navLinks"
          :key="index"
          class="list-group-item h5 mb-2 border-bottom-0"
        >-->
        <li
          v-for="(item, index) in navLinks"
          :key="index"
          @click.prevent.stop="handleSidebarItemClick(item)"
        >
          <router-link
            :to="{name:item.routeName,params:{botId:chatbot.botId}}"
            :event="disabled ? '' : 'click'"
            class="list-group-item list-group-item-action h5 border-bottom-0"
          >{{item.displayName}}</router-link>
        </li>

        <!-- </li> -->
        <!-- <li
          v-for="(item, index) in navLinks"
          :key="index"
          class="list-group-item h5 mb-2 border-bottom-0"
          @click.prevent.stop="handleSidebarItemClick(item)"
        >{{item.displayName}}</li>-->
      </div>

      <!-- <router-link
          v-for="(item, index) in navLinks"
          :key="index"
          :to="{ name: item.routeName, params: { botId: chatbot.botId } }"
          @click.native.prevent="handleOpenModal"
      >{{ item.displayName }}</router-link>-->

      <!-- <b-nav-item
          v-for="(item, index) in navLinks"
          :key="index"
          :to="{ name: item.routeName, params: { botId: chatbot.botId } }"
          @click.native.prevent="handleOpenModal"
      >{{ item.displayName }}</b-nav-item>-->

      <!-- </b-nav> -->
    </b-sidebar>
  </div>
</template>

<script>
// import store
import { mapState } from "vuex";
import { ToastLeave } from "../../utils/helpers";

export default {
  props: {},
  data() {
    return {
      disabled: false,
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
    ...mapState(["chatbot", "currentUser", "editStatus", "isSaved"]),
  },
  watch: {
    isSaved(val) {
      this.disabled = !val;
    },
  },
  beforeUpdate() {},
  methods: {
    handleSidebarItemClick(item) {
      // 使用者未儲存編輯結果
      if (!this.isSaved) {
        ToastLeave.fire().then((result) => {
          if (result.value) {
            // 留在當前頁面
            return;
          } else {
            // 離開此頁面
            this.$router.push({
              name: item.routeName,
              params: { botId: this.chatbot.botId },
            });
          }
        });
      } else {
        // 使用者已儲存或未編輯，則可以離開此頁面
        this.$router.push({
          name: item.routeName,
          params: { botId: this.chatbot.botId },
        });
      }
      //
    },
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

    .list-group {
      .list-group-item {
        &:hover {
          background-color: #008cba;
          color: #fff;
        }
      }
    }
  }
}
</style>
