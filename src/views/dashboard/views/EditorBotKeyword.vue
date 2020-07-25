<template>
  <div class="mb-2">
    <div class="container-fluid py-3 px-0">
      <div class="row py-1">
        <!-- 模組列表 -->
        <div class="col-12 col-lg-2">
          <ModuleList
            :module-keywords="moduleKeywords"
            :module-click="moduleClick"
            @after-delete-module-keyword="afterDeleteModuleKeyword"
            @after-click-module="afterClickModule"
          />
        </div>
        <div class="col-12 col-lg-10">
          <div class="row justify-content-between">
            <!-- 儲存模組區 -->
            <div v-if="moduleClick.status" class="col-12 col-md-3 order-md-last mb-3">
              <button
                class="btn btn-info rounded"
                @click.stop.prevent="handleClickSaveBtn"
                :disabled="isProcessing"
              >儲存所有模組</button>
            </div>
            <!-- <div class="row py-1">
              <div class="col d-flex justify-content-end">
                <button
                  class="btn btn-info rounded"
                  @click.stop.prevent="handleClickSaveBtn"
                  :disabled="isProcessing"
                >儲存所有模組</button>
              </div>
            </div>-->

            <!-- 模組名稱編輯區 -->
            <div class="col-12 col-md-6 order-md-first"></div>

            <div class="col">
              <ModuleEditor
                v-if="moduleClick.status"
                :module-keyword="moduleKeyword"
                :module-click="moduleClick"
              />
            </div>
          </div>
          <!-- Event 編輯區 & 回應訊息編輯區 -->
          <div class="row">
            <div class="col-12 col-lg-6">
              <EventEditor
                :text-events="textEvents"
                :module-index="moduleIndex"
                :after-create-text-event="afterCreateTextEvent"
                :after-delete-text-event="afterDeleteTextEvent"
                :module-click="moduleClick"
              />
            </div>
            <div class="col-12 col-lg-6">
              <ReplyMsgEditor
                :reply-message="replyMessage"
                :module-click="moduleClick"
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
    ModuleEditor,
  },
  data() {
    return {
      moduleKeywords: [],
      replyMessage: {},
      textEvents: [],
      moduleKeyword: {},
      moduleIndex: -1,
      isProcessing: false,
      revealModuleName: false,
      moduleClick: { status: false },
    };
  },
  props: {},
  async created() {
    try {
      //faked data
      let apiData = {
        params: {
          botId: "bot-abakdss",
        },
        query: {
          ChatbotId: 1,
        },
      };
      const { statusText, data } = await keywordReplyAPI.getKeywordReply(
        apiData
      );

      if (statusText === "OK") {
        this.moduleKeywords = data.data.moduleKeywords;

        return Toast.fire({
          icon: "success",
          title: "成功取得資料",
          text: "",
        });
      } else {
        return Toast.fire({
          icon: "error",
          title: "取得資料失敗，請稍後再試",
          text: "",
        });
      }
    } catch (err) {
      return Toast.fire({
        icon: "error",
        title: "取得資料失敗，請稍後再試",
        text: `${err.message}`,
      });
    }
  },
  methods: {
    //點擊〈儲存所有模組〉
    async handleClickSaveBtn() {
      try {
        this.isProcessing = true;

        //製做 apiData (array)
        const apiData = [];
        for (let i = 0; i < this.moduleKeywords.length; i++) {
          apiData.push({
            params: {
              botId: 1, //之後會從 this.$store 或從 this.$route 取得
            },
            query: {},
            data: {
              ChatbotId: 1, //之後會從 this.$store 取得
              module: this.moduleKeywords[i],
              textEvents: this.moduleKeywords[i].TextEvents,
              replyMessage: this.moduleKeywords[i].ReplyMessage,
            },
          });
        }

        //製做 requests
        const requests = [];
        for (let i = 0; i < apiData.length; i++) {
          requests.push(await keywordReplyAPI.postKeywordReply(apiData[i]));
        }

        Promise.all(requests)
          .then((res) => {
            this.isProcessing = false;
            console.log(res);
            return Toast.fire({
              icon: "success",
              title: "成功新增",
              text: "",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        this.isProcessing = false;

        return Toast.fire({
          icon: "error",
          title: "系統異常，請稍後再試",
          text: `${err.message}`,
        });
      }
    },

    //子層點擊新增模組按鈕事件觸發父層 => 暫無用途
    afterCreateModuleKeyword(moduleKeyword) {
      this.moduleKeywords.push(moduleKeyword);
    },
    //子層點擊刪除模組按鈕事件觸發父層 => 暫無用途
    afterDeleteModuleKeyword([index]) {
      console.log("(父層)index=>", index);
      this.moduleKeywords.splice(index, 1);
    },

    //子層點擊〈模組區塊〉事件觸發父層
    afterClickModule([index]) {
      //顯示模組名稱
      this.revealModuleName = true;

      //該模組的資料放至 moduleEditor component
      this.moduleKeyword = Array.isArray(this.moduleKeywords) && [
        this.moduleKeywords[index],
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
    },
  },
};
</script>