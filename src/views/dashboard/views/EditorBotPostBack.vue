<template>
  <div class="mb-2">
    <div class="container-fluid py-3 px-0">
      <div class="row py-1">
        <!-- 模組列表 -->
        <div class="col-12 col-lg-2">
          <ModuleList
            :module-post-backs="modulePostBacks"
            :module-click="moduleClick"
            @after-delete-module-post-back="afterDeleteModulePostBack"
            @after-click-module="afterClickModule"
          />
        </div>
        <div class="col-12 col-lg-10">
          <div class="row justify-content-between">
            <div v-if="moduleClick.status" class="col-12 col-md-3 order-md-last mb-3">
              <button
                class="btn btn-info rounded"
                @click.stop.prevent="handleClickSaveBtn"
                :disabled="isProcessing"
              >儲存所有模組</button>
            </div>
            <!-- 模組名稱編輯區 -->
            <div class="col-12 col-md-6 order-md-first">
              <ModuleEditor
                v-if="moduleClick.status"
                :module-post-back="modulePostBack"
                :module-click="moduleClick"
              />
            </div>
          </div>
          <!-- Event 編輯區 & 回應訊息編輯區 -->
          <div class="row">
            <!-- Event 編輯區 -->
            <div class="col-12 col-md-6">
              <EventEditor
                :post-back-events="postBackEvents"
                :module-click="moduleClick"
                @create-post-back-event="createPostBackEvent"
              />
            </div>
            <!-- ↓ ↓ 回應訊息編輯區 ↓ ↓ -->
            <div class="col-12 col-md-6">
              <div class="mb-5 py-1 px-1 border border-secondary rounded">
                <h5
                  class="mb-4 py-2 px-3 bg-secondary text-dark border border-secondary rounded"
                >回應訊息編輯</h5>
                <!-- 回應訊息編輯區，點擊模組後才可以編輯 -->
                <div v-if="moduleClick.status" class="custom-scrollbar-css border border-secondary">
                  <!-- 編輯回應訊息名稱 -->
                  <div class="mb-4">
                    <h5
                      v-if="replyMessage"
                      class="mb-2 py-2 px-3 bg-light border border-secondary rounded"
                      ref="editor"
                    >
                      <small for="reply-message-name">回應訊息名稱：</small>

                      <input
                        type="text"
                        class="form-control my-2"
                        id="reply-message-name"
                        v-model="replyMessage.name"
                        :disabled="!moduleClick.status"
                      />
                    </h5>
                    <!-- 預覽回應訊息 => 待編輯-->
                    <Review />

                    <!-- 顯示總訊息數 -->
                    <span
                      class="text-muted"
                    >訊息數：{{replyMessage && replyMessage.messageTemplate ? replyMessage.messageTemplate.length :0 }} / 5</span>
                  </div>

                  <!-- 回應訊息樣版編輯區 ，把 messageTemplate(array) 各元件傳到 component 中編輯-->
                  <div v-if="replyMessage && replyMessage.messageTemplate" class>
                    <div
                      v-for="(template, index) in replyMessage.messageTemplate"
                      :key="index"
                      class="mt-2"
                    >
                      <button
                        class="btn btn-outline-danger mb-0 ml-3"
                        @click.stop.prevent="handleClickDeleteReplyMsgBtn(index)"
                        :disabled="isProcessing"
                      >刪除</button>

                      <ReplyMsgEditor :message-template-item="template" :template-index="index" />
                    </div>
                  </div>

                  <!-- 新增回應訊息按鈕 -->
                  <!-- 下面為回應訊息類別選擇區 -->
                </div>
                <!-- ↑ ↑ 回應訊息編輯區 (scroll bar 邊界)↑ ↑ -->
                <div v-if="moduleClick.status" class="mb-5 mt-4">
                  <button
                    class="btn btn-info btn-sm mb-2 mr-3"
                    @click="handleClickAddReplyMsgBtn"
                  >新增回應訊息</button>
                  <!-- 顯示總訊息數 -->
                  <span
                    class="text-muted"
                  >訊息數：{{replyMessage && replyMessage.messageTemplate ? replyMessage.messageTemplate.length :0 }} / 5</span>
                  <!-- 若點擊〈新增回應訊息按鈕〉且訊息數未超過 5 個，則讓使用者選擇訊息樣版 -->
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="messageTypeSelect">請選擇訊息樣版</label>
                    </div>
                    <select class="custom-select" id="messageTypeSelect" v-model="componentSelect">
                      <option value="text" selected>文字訊息</option>
                      <option value="confirmTemplate">確認範本訊息</option>
                      <option value="buttonsTemplate">按鍵範本訊息</option>
                      <option value="carouselTemplate" selected>輪播範本訊息</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import components
import ModuleList from "../components/EditorBotPostBack/ModuleList.vue";
import ModuleEditor from "../components/EditorBotPostBack/ModuleEditor.vue";
import EventEditor from "../components/EditorBotPostBack/EventEditor.vue";
import ReplyMsgEditor from "../components/EditorBotPostBack/ReplyMsgEditor.vue";
import Review from "../components/ReplyMessage/core/Review.vue";

// import helpers
import postBackReplyAPI from "../../../apis/postBackReply.js";
import { Toast } from "../../../utils/helpers";
import { msgGenerator } from "../../../utils/templateGenerator.js";

// import seeds for test => deploy 時要刪掉
// import seedsForTest from "../seeds-for-test/EditorBotPostBack";

export default {
  name: "EditorBotPostBack",
  components: {
    ModuleList,
    ModuleEditor,
    EventEditor,
    ReplyMsgEditor,
    Review, //預覽
  },
  data() {
    return {
      modulePostBacks: [],
      replyMessage: {},
      postBackEvents: [],
      modulePostBack: {},
      isProcessing: false,
      revealModuleName: false,
      moduleClick: {
        status: false,
        index: -1,
      },

      //使用者選擇的回應訊息樣版
      componentSelect: "",
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
      const { statusText, data } = await postBackReplyAPI.getPostBackReply(
        apiData
      );

      if (statusText === "OK") {
        this.modulePostBacks = [...data.data.modulePostBacks];

        // 整理 replyMessage.messageTemplate 成 array 格式
        this.modulePostBacks.forEach((d) => {
          //  若 messageTemplate 未定義或 為 {}
          if (!d.ReplyMessage) {
            d.ReplyMessage = {
              type: "",
              name: "",
              messageTemplate: [],
            };
          } else if (
            !d.ReplyMessage.messageTemplate ||
            Object.keys(d.ReplyMessage.messageTemplate).length === 0
          ) {
            d.ReplyMessage.messageTemplate = [];
          } else if (
            !Array.isArray(d.ReplyMessage.messageTemplate) &&
            typeof d.ReplyMessage.messageTemplate === "object"
          ) {
            // 當 messageTemplate 為 {} 格式時，轉成 array，方便傳遞至 component
            d.ReplyMessage.messageTemplate = [
              { ...d.ReplyMessage.messageTemplate },
            ];
          }
        });

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
  beforeUpdate() {},
  mounted() {},
  computed: {},
  methods: {
    //儲存所有模組
    async handleClickSaveBtn() {
      try {
        this.isProcessing = true;

        //製做 apiData (array)
        const apiData = [];
        for (let i = 0; i < this.modulePostBacks.length; i++) {
          apiData.push({
            params: {
              botId: 1, //之後會從 this.$store 或從 this.$route 取得
            },
            query: {},
            data: {
              ChatbotId: 1, //之後會從 this.$store 取得
              module: this.modulePostBacks[i],
              postBackEvents: this.modulePostBacks[i].postBackEvents,
              replyMessage: this.modulePostBacks[i].replyMessage,
            },
          });
        }

        //製做 requests
        const requests = [];
        for (let i = 0; i < apiData.length; i++) {
          requests.push(await postBackReplyAPI.postPostBackReply(apiData[i]));
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

    //子層點擊刪除模組按鈕事件觸發父層
    afterDeleteModulePostBack([index]) {
      this.modulePostBacks.splice(index, 1);
    },
    //子層點擊模組事件觸發父層
    afterClickModule([index]) {
      //傳遞資料至 ModuleEditor component
      this.modulePostBack = this.modulePostBacks[index];
      //傳遞資料至 replyMsgEditor component
      this.replyMessage = this.modulePostBacks[index].ReplyMessage;
      //傳遞資料至 PostBackEventEditor component
      this.postBackEvents = this.modulePostBacks[index].PostBackEvents;
    },
    //新增回應訊息
    async handleClickAddReplyMsgBtn() {
      try {
        // 先判斷 replyMessage.messageTemplate.length
        // 若 length === 5，則跳出訊息"已超過訊息數限制"
        if (this.replyMessage.messageTemplate.length === 5) {
          Toast.fire({
            icon: "warning",
            text: "已超出訊息限制 5 則!",
          });
          return;
        } else if (this.componentSelect === "") {
          Toast.fire({
            icon: "warning",
            text: "請選擇訊息類別!",
          });
        } else {
          // 若 length < 5，則replyMessage.messageTemplate.push(合適的樣版)
          //帶入參數產生新樣版
          const messageTemplateCreate = msgGenerator({
            type: this.componentSelect,
          });
          //將新樣版整合至  messageTemplate
          this.replyMessage.messageTemplate.push(messageTemplateCreate);
          // 成功新增訊息
          Toast.fire({
            icon: "success",
            text: "訊息已新增",
          });
        }
      } catch (err) {
        Toast.fire({
          icon: "warning",
          text: "系統異常!",
        });
      }
    },

    // 刪除 messageTemplateItem
    handleClickDeleteReplyMsgBtn(index) {
      this.replyMessage.messageTemplate.splice(index, 1);
      //提示刪除成功
      Toast.fire("Deleted!", "Text has been deleted.", "success");
    },

    // 新增 postback event
    createPostBackEvent([postBackEventSchema]) {
      if (!this.postBackEvents) {
        this.postBackEvents = [];
      }
      this.postBackEvents.push(postBackEventSchema);
    },
  },
};
</script>


<style  scoped>
.module-select-color {
  background-color: #cfcfcf;
}

/* Custom Scrollbar using CSS */
.custom-scrollbar-css {
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: scroll;
}

/* scrollbar width */
.custom-scrollbar-css::-webkit-scrollbar {
  width: 5px;
}

/* scrollbar track */
.custom-scrollbar-css::-webkit-scrollbar-track {
  background: #eee;
}

/* scrollbar handle */
.custom-scrollbar-css::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background-color: #8a8a8a;
  /* background-image: linear-gradient(to top, #00d2ff 0%, #3a7bd5 100%); */
}
</style>