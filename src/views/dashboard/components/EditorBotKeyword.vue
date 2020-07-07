<template>
  <div class="my-2">
    <h3>關鍵字回應</h3>
    <div class="container">
      <div class="row my-4">
        <div class="col col-2">
          <ModuleList :module-keywords="moduleKeywords" />
        </div>
        <div class="col col-5">
          <EventEditor />
        </div>
        <div class="col col-5">
          <ReplyMsgEditor />
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
      moduleKeywords: []
    };
  },
  props: {},
  async created() {
    try {
      //faked data
      let botId = "bot-abakdss",
        ChatbotId = 1;

      const { statusText, data } = await keywordReplyAPI.getKeywordReply(
        botId,
        ChatbotId
      );

      if (statusText === "OK") {
        console.log("response:", data);
        this.moduleKeywords = data.data.moduleKeywords;

        Toast.fire({
          icon: "success",
          title: "成功取得資料",
          text: ""
        });
      }
    } catch (err) {
      console.log(err);
      Toast.fire({
        icon: "error",
        title: "取得資料失敗，請稍後再試",
        text: `${err.message}`
      });
    }
  },
  computed: {},
  methods: {}
};
</script>