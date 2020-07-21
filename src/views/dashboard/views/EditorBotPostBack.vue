<template>
  <div class="my-2">
    <div class="container">
      <!-- 儲存模組區 -->
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
        <!-- 模組列表 -->
        <div class="col col-lg-2">
          <ModuleList
            :module-post-backs="modulePostBacks"
            :module-click="moduleClick"
            @after-delete-module-post-back="afterDeleteModulePostBack"
            @after-click-module="afterClickModule"
          />
        </div>
        <div class="col col-lg-10">
          <div class="row">
            <!-- 模組名稱編輯區 -->
            <ModuleEditor
              v-if="moduleClick.status"
              :module-post-back="modulePostBack"
              :module-click="moduleClick"
            />
          </div>
          <!-- Event 編輯區 & 回應訊息編輯區 -->
          <div class="row">
            <!-- Event 編輯區 -->
            <div class="col col-12 col-lg-6">
              <EventEditor :post-back-events="postBackEvents" :module-click="moduleClick" />
            </div>
            <!-- ↓ ↓ 回應訊息編輯區 ↓ ↓ -->
            <div class="col col-12 col-lg-6">
              <!-- 編輯回應訊息名稱 -->
              <div class="mb-4">
                <h5
                  class="mb-2 py-2 px-3 bg-secondary text-light border border-secondary rounded"
                  ref="editor"
                >
                  <small for="reply-message-name">回應訊息名稱：</small>

                  <input
                    type="text"
                    class="my-2"
                    id="reply-message-name"
                    v-model="replyMessage.name"
                  />
                </h5>
                <!-- 顯示總訊息數 -->
                <span class="text-muted">訊息數：{{replyMessage.messageTemplate.length}} / 5</span>
              </div>

              <!-- 回應訊息樣版編輯區 ，把 messageTemplate(array) 各元件傳到 component 中編輯-->

              <div
                v-for="(template, index) in replyMessage.messageTemplate"
                :key="index"
                class="mt-2"
              >
                <button
                  class="btn btn-danger btn-sm mb-0"
                  @click.stop.prevent="handleClickDeleteReplyMsgBtn(index)"
                  :disabled="isProcessing"
                >刪除</button>
                <ReplyMsgEditor :message-template-item="template" :template-index="index" />
              </div>

              <!-- 新增回應訊息按鈕 -->
              <!-- 下面為回應訊息類別選擇區 -->
              <div class="mb-5 mt-4">
                <button class="btn btn-info btn-sm mb-2" @click="handleClickAddReplyMsgBtn">新增回應訊息</button>
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
              <!-- ↑ ↑ 回應訊息編輯區 ↑ ↑ -->
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

// import helpers
import postBackReplyAPI from "../../../apis/postBackReply.js";
import { Toast } from "../../../utils/helpers";
import { msgGenerator } from "../../../utils/templateGenerator.js";

export default {
  name: "EditorBotPostBack",
  components: {
    ModuleList,
    ModuleEditor,
    EventEditor,
    ReplyMsgEditor
  },
  data() {
    return {
      //測試用假資料
      modulePostBacks: [
        {
          ChatbotId: "1",
          module: {
            name: "點餐機-海陸大餐",
            uuid: "75a0726b-41d1-41e3-ae6f-f5892a539516",
            status: "in-use"
          },
          postBackEvents: [
            {
              name: "點餐機",
              eventType: "postBack",
              subject: "點餐機",
              data: "海陸大餐"
            }
          ],
          replyMessage: {
            messageTemplate: {
              type: "template",
              altText: "this is a buttons template",
              template: {
                type: "buttons",
                actions: [
                  {
                    type: "postback",
                    label: "我要加價換套餐",
                    displayText: "我要加價換套餐",
                    data: "subject=海陸大餐&data=我要加價換套餐"
                  },
                  {
                    type: "postback",
                    label: "我不要加價換套餐",
                    displayText: "我不要加價換套餐",
                    data: "subject=海陸大餐&data=我不要加價換套餐"
                  }
                ],
                title: "海陸大餐",
                text: "是否要加價換套餐?"
              }
            },
            type: "text",
            name: "海陸大餐",
            status: "in-use"
          }
        },
        {
          ChatbotId: "1",
          module: {
            name: "點餐機-素食大餐",
            uuid: "ec36e1e9-fa4a-4017-b3c3-361ffa55e4e9",
            status: "in-use"
          },
          PostBackEvent: {
            name: "點餐機",
            eventType: "postBack",
            subject: "點餐機",
            data: "素食大餐"
          },
          replyMessage: {
            messageTemplate: {
              type: "template",
              altText: "this is a buttons template",
              template: {
                type: "buttons",
                actions: [
                  {
                    type: "postback",
                    label: "我要加價換套餐",
                    displayText: "我要加價換套餐",
                    data: "subject=素食大餐&data=我要加價換套餐"
                  },
                  {
                    type: "postback",
                    label: "我不要加價換套餐",
                    displayText: "我不要加價換套餐",
                    data: "subject=素食大餐&data=我不要加價換套餐"
                  }
                ],
                title: "素食大餐",
                text: "是否要加價換套餐?"
              }
            },
            type: "text",
            name: "素食大餐",
            status: "in-use"
          }
        }
      ],
      //假資料
      replyMessage: {
        messageTemplate: [
          {
            type: "text",
            text: "hello world"
          },
          {
            type: "text",
            text: "good job"
          }
        ],
        type: "text",
        name: "產前檢查",
        uuid: "fab40e7a-76ba-4e04-9369-675b4327e875",
        status: "in-use"
      },
      postBackEvents: [],
      modulePostBack: {},
      isProcessing: false,
      revealModuleName: false,
      moduleClick: {
        status: false,
        index: -1
      },

      //使用者選擇的回應訊息樣版
      componentSelect: ""
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
      const { statusText, data } = await postBackReplyAPI.getPostBackReply(
        apiData
      );

      if (statusText === "OK") {
        this.modulePostBacks = data.data.modulePostBacks;

        // 整理 replyMessage.messageTemplate 成 array 格式
        this.modulePostBacks.forEach(d => {
          //  若 messageTemplate 未定義或 為 {}
          if (!d.ReplyMessage) {
            d.ReplyMessage = {
              type: "",
              name: "",
              messageTemplate: []
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
              { ...d.ReplyMessage.messageTemplate }
            ];
          }
        });

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
              botId: 1 //之後會從 this.$store 或從 this.$route 取得
            },
            query: {},
            data: {
              ChatbotId: 1, //之後會從 this.$store 取得
              module: this.modulePostBacks[i],
              postBackEvents: this.modulePostBacks[i].postBackEvents,
              replyMessage: this.modulePostBacks[i].replyMessage
            }
          });
        }

        //製做 requests
        const requests = [];
        for (let i = 0; i < apiData.length; i++) {
          requests.push(await postBackReplyAPI.postPostBackReply(apiData[i]));
        }

        Promise.all(requests)
          .then(res => {
            this.isProcessing = false;
            console.log(res);
            return Toast.fire({
              icon: "success",
              title: "成功新增",
              text: ""
            });
          })
          .catch(err => {
            console.log(err);
          });
      } catch (err) {
        this.isProcessing = false;

        return Toast.fire({
          icon: "error",
          title: "系統異常，請稍後再試",
          text: `${err.message}`
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
            text: "已超出訊息限制 5 則!"
          });
          return;
        } else if (this.componentSelect === "") {
          Toast.fire({
            icon: "warning",
            text: "請選擇訊息類別!"
          });
        } else {
          // 若 length < 5，則replyMessage.messageTemplate.push(合適的樣版)
          //帶入參數產生新樣版
          const messageTemplateCreate = msgGenerator({
            type: this.componentSelect
          });
          //將新樣版整合至  messageTemplate
          this.replyMessage.messageTemplate.push(messageTemplateCreate);
          // 成功新增訊息
          Toast.fire({
            icon: "success",
            text: "訊息已新增"
          });
        }
      } catch (err) {
        Toast.fire({
          icon: "warning",
          text: "系統異常!"
        });
      }
    },

    // 刪除 messageTemplateItem
    handleClickDeleteReplyMsgBtn(index) {
      this.replyMessage.messageTemplate.splice(index, 1);
      //提示刪除成功
      Toast.fire("Deleted!", "Text has been deleted.", "success");
    }
  }
};
</script>