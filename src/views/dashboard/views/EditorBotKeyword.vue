<template>
  <div class="my-2">
    <div class="container">
      <div class="row">
        <div class="col d-flex justify-content-end">
          <button
            class="btn btn-info rounded"
            @click.stop.prevent="handleClickSaveBtn"
            :disabled="isProcessing"
          >儲存所有模組</button>
        </div>
      </div>
      <div class="row my-4">
        <div class="col col-2">
          <ModuleList :module-keywords="moduleKeywords" @after-click-module="afterClickModule" />
        </div>
        <div class="col col-10">
          <div class="row">
            <div class="col col-12">
              <ModuleEditor :module-keyword="moduleKeyword" />
            </div>
          </div>
          <div class="row">
            <div class="col col-6">
              <EventEditor
                :text-events="textEvents"
                :module-index="moduleIndex"
                :after-create-text-event="afterCreateTextEvent"
                :after-delete-text-event="afterDeleteTextEvent"
              />
            </div>
            <div class="col col-6">
              <ReplyMsgEditor
                :reply-message="replyMessage"
                :module-index="moduleIndex"
                @after-create-reply-message="afterCreateReplyMessage"
                @after-delete-reply-message="afterDeleteReplyMessage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import components
import ModuleList from "../components/EditorBotKeyword/ModuleList.vue";
import EventEditor from "../components/EditorBotKeyword/EventEditor.vue";
import ReplyMsgEditor from "../components/EditorBotKeyword/ReplyMsgEditor.vue";
import ModuleEditor from "../components/EditorBotKeyword/ModuleEditor.vue";

// import helpers
import keywordReplyAPI from "../../../apis/keywordReply.js";
import { Toast } from "../../../utils/helpers";

export default {
  name: "EditorBotKeyword",
  components: {
    ModuleList,
    EventEditor,
    ReplyMsgEditor,
    ModuleEditor
  },
  data() {
    return {
      moduleKeywords: [],
      replyMessage: {},
      textEvents: [],
      moduleKeyword: {},
      moduleIndex: -1,
      isProcessing: false
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
    //點擊〈儲存所有模組〉
    async handleClickSaveBtn() {
      try {
        this.isProcessing = true;

        //faked data => 尚待商確資料格式(要儲存所有模組 or 單一模組)??
        const apiData = {
          params: {
            botId: 1 //之後會從 this.$store 或從 this.$route 取得
          },
          query: {},
          data: {
            ChatbotId: 1, //之後會從 this.$store 取得
            module: this.moduleKeywords,
            textEvents: this.moduleKeywords,
            replyMessage: {}
          }
        };

        const { statusText, data } = await keywordReplyAPI.postKeywordReply(
          apiData
        );

        if (statusText === "OK" && data.status === "success") {
          this.isProcessing = false;

          this.replyMessage = data.data.replyMessage;

          return Toast.fire({
            icon: "success",
            title: "成功新增",
            text: ""
          });
        } else {
          this.isProcessing = false;

          return Toast.fire({
            icon: "error",
            title: "新增失敗，請稍後再試",
            text: ""
          });
        }
      } catch (err) {
        this.isProcessing = false;

        return Toast.fire({
          icon: "error",
          title: "系統異常，請稍後再試",
          text: `${err.message}`
        });
      }
    },

    //子層點擊新增模組按鈕事件觸發父層 => 暫無用途
    afterCreateModuleKeyword(moduleKeyword) {
      this.moduleKeywords.push(moduleKeyword);
    },
    //子層點擊刪除模組按鈕事件觸發父層 => 暫無用途
    // afterDeleteModuleKeyword(index,moduleKeyword) {
    // },

    //子層點擊〈模組區塊〉事件觸發父層
    afterClickModule([index]) {
      //該模組的資料放至 moduleEditor component
      this.moduleKeyword = Array.isArray(this.moduleKeywords) && [
        this.moduleKeywords[index]
      ]
        ? this.moduleKeywords[index]
        : {};

      //該模組的 replyMessage 放至 ReplyMsgEditor component
      const replyMsgToComponent =
        Array.isArray(this.moduleKeywords) &&
        this.moduleKeywords[index] &&
        this.moduleKeywords[index].ReplyMessage
          ? this.moduleKeywords[index].ReplyMessage
          : {};

      this.replyMessage = replyMsgToComponent;
      this.moduleIndex = index;

      //該模組的 textEvents 放至 EventEditor component
      this.textEvents =
        this.moduleKeywords[index] && this.moduleKeywords[index].TextEvents
          ? this.moduleKeywords[index].TextEvents
          : [];
    },
    //子層點擊〈新增回應訊息按鈕〉事件觸發父層
    afterCreateReplyMessage([replyMessageCreated, moduleIndex]) {
      // 異動父層的資料
      this.moduleKeywords[moduleIndex].ReplyMessage = replyMessageCreated;
      // 異動要傳遞至子層的資料
      this.replyMessage = replyMessageCreated;
    },

    //子層點擊〈刪除回應訊息按鈕〉事件觸發父層
    afterDeleteReplyMessage([moduleIndex]) {
      //異動父層的資料
      this.moduleKeywords[moduleIndex].ReplyMessage = {};
      //異動要傳遞至子層的資料
      this.replyMessage = {};
    },
    //子層點擊〈新增回應訊息按鈕〉事件觸發父層
    afterCreateTextEvent([moduleIndex, textEventCreated]) {
      console.log("moduleIndex:(父層)", moduleIndex);
      // 異動父層資料
      this.moduleKeywords[moduleIndex].textEvents.push(textEventCreated);
      // 異動父層傳遞給子層的資料
      this.textEvents = this.moduleKeywords[moduleIndex]
        ? this.moduleKeywords[moduleIndex].textEvents
        : [];
    },
    //子層點擊〈刪除回應訊息按鈕〉事件觸發父層
    afterDeleteTextEvent([moduleIndex, textEventCreated]) {
      console.log(moduleIndex);
      console.log(textEventCreated);
    }
  }
};
</script>