<template>
  <div class>
    <h1>EditorBotKeyword</h1>
    <ModuleList />
    <EventEditor />
    <ReplyMsgEditor />
  </div>
</template>

<script>
// import components
import ModuleList from "./components/EditorBotKeyword/ModuleList.vue";
import EventEditor from "./components/EditorBotKeyword/EventEditor.vue";
import ReplyMsgEditor from "./components/EditorBotKeyword/ReplyMsgEditor.vue";

// import helpers
import keywordReplyAPI from "../../../apis/keywordReply.js";

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
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {},
  methods: {}
};
</script>