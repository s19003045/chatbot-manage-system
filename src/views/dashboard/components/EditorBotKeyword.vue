<template>
  <div class="my-2">
    <!-- <h3>關鍵字回應</h3> -->
    <div class="container">
      <div class="row my-4">
        <div class="col col-2">
          <ModuleList :module-keywords="moduleKeywords" @after-click-module="afterClickModule" />
        </div>
        <div class="col col-5">
          <EventEditor :text-events="textEvents" />
        </div>
        <div class="col col-5">
          <ReplyMsgEditor :reply-message="replyMessage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import components
import ModuleList from "./components/EditorBotKeyword/ModuleList.vue";
import EventEditor from "./components/EditorBotKeyword/EventEditor.vue";
import ReplyMsgEditor from "./components/EditorBotKeyword/ReplyMsgEditor.vue";

// import helpers
import keywordReplyAPI from "../../../apis/keywordReply.js";
import { Toast } from "../../../utils/helpers";

export default {
  name: "EditorBotKeyword",
  components: {
    ModuleList,
    EventEditor,
    ReplyMsgEditor
  },
  data() {
    return {
      moduleKeywords: [],
      replyMessage: {},
      textEvents: []
    };
  },
  props: {},
  async created() {
    try {
      //faked data
      let apiData = {
        params: {
          botId: "bot-abakdss"
        },
        query: {
          ChatbotId: 1
        }
      };
      const { statusText, data } = await keywordReplyAPI.getKeywordReply(
        apiData
      );

      if (statusText === "OK") {
        this.moduleKeywords = data.data.moduleKeywords;

        return Toast.fire({
          icon: "success",
          title: "成功取得資料",
          text: ""
        });
      } else {
        return Toast.fire({
          icon: "error",
          title: "取得資料失敗，請稍後再試",
          text: ""
        });
      }
    } catch (err) {
      return Toast.fire({
        icon: "error",
        title: "取得資料失敗，請稍後再試",
        text: `${err.message}`
      });
    }
  },
  methods: {
    //子層點擊新增模組按鈕事件觸發父層 => 暫無用途
    afterCreateModuleKeyword(moduleKeyword) {
      this.moduleKeywords.push(moduleKeyword);
    },
    //子層點擊新增模組按鈕事件觸發父層 => 暫無用途
    // afterDeleteModuleKeyword(index,moduleKeyword) {

    // },

    //子層點擊〈模組區塊〉事件觸發父層
    afterClickModule([index]) {
      //該模組的 replyMessage 放至 ReplyMsgEditor component
      const replyMsgToComponent =
        this.moduleKeywords[index] && this.moduleKeywords[index].ReplyMessage
          ? this.moduleKeywords[index].ReplyMessage
          : {};
      this.replyMessage = replyMsgToComponent;

      //該模組的 textEvents 放至 EventEditor component
      this.textEvents =
        replyMsgToComponent && replyMsgToComponent.TextEvents
          ? replyMsgToComponent.TextEvents
          : [];
    }
    //
  }
};
</script>