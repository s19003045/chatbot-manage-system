<template>
  <div class="mb-2 mt-4">
    <div class="container-fluid px-1">
      <h4>歡迎訊息設定</h4>
      <div class="row py-3">
        <div class="col-12 col-md-12 col-lg-10 mx-auto">
          <div class="row justify-content-between">
            <div v-if="moduleClick.status" class="col-12 col-md-3 order-md-last mb-3">
              <button
                class="btn btn-outline-primary rounded rounded"
                @click.stop.prevent="handleClickSaveBtn('edited')"
                :disabled="isProcessing"
              >儲存歡迎訊息</button>
            </div>
          </div>
          <div class="w-100"></div>
          <!-- 回應訊息編輯區 & 預覽區-->
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="row">
                <!-- ↓ ↓ 回應訊息編輯區 ↓ ↓ -->
                <div class="col-12">
                  <div class="mb-5 py-2 px-2 border border-secondary rounded shadow-lg">
                    <h5
                      class="mb-4 py-2 px-3 bg-secondary text-dark border border-secondary rounded"
                    >歡迎訊息編輯</h5>
                    <!-- 回應訊息編輯區，點擊模組後才可以編輯 -->
                    <div v-if="moduleClick.status" class="custom-scrollbar-css">
                      <!-- 是否啟用自訂的歡迎訊息 -->
                      <!-- 切換鈕 -->
                      <div class="input-group mb-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">是否啟用自訂歡迎訊息</div>
                        </div>
                        <select
                          name="welcome-msg-is-active"
                          id
                          class="custom-select"
                          v-model="replyModule.status"
                        >
                          <option value="edited" :selected="replyModule.status === 'edited'">不啟用</option>
                          <option value="in-use" :selected="replyModule.status === 'in-use'">啟用</option>
                        </select>
                      </div>
                      <!-- 說明文字 -->
                      <p>說明：當使用者不啟用自訂歡迎訊息時，則會啟用 LINE 官方預設歡迎訊息</p>
                      <!-- 使用者不啟用 -->

                      <!-- 使用者啟用 -->

                      <!-- 回應訊息樣版編輯區 ，把 messageTemplate(array) 各元件傳到 component 中編輯-->
                      <div v-if="replyMessage" class>
                        <div
                          v-for="(templateItem, index) in replyMessage"
                          :key="index"
                          class="mt-3"
                        >
                          <ReplyMsgEditor
                            :template-item="templateItem"
                            :template-index="index"
                            :reply-module-list="replyModuleList"
                            @handle-delete-reply-msg="handleDeleteReplyMsg"
                          />
                        </div>
                      </div>

                      <!-- 新增回應訊息按鈕 -->
                      <!-- 下面為回應訊息類別選擇區 -->
                    </div>
                    <!-- ↑ ↑ 回應訊息編輯區 (scroll bar 邊界)↑ ↑ -->
                    <div v-if="moduleClick.status" class="mb-5 mt-4">
                      <button
                        class="btn btn-primary mb-2 mr-3"
                        @click="handleClickAddReplyMsgBtn"
                      >新增回應訊息</button>
                      <!-- 顯示總訊息數 -->
                      <span class="text-muted">
                        訊息數：{{ replyMessage ? replyMessage.length : 0 }} /
                        5
                      </span>
                      <!-- 若點擊〈新增回應訊息按鈕〉且訊息數未超過 5 個，則讓使用者選擇訊息樣版 -->
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <label class="input-group-text" for="messageTypeSelect">請選擇訊息樣版</label>
                        </div>
                        <select
                          class="custom-select"
                          id="messageTypeSelect"
                          v-model="componentSelect"
                        >
                          <option value="text" selected>文字訊息</option>
                          <!-- 暫停使用確認範本訊息 => 待確認範本訊息功能完整後再啟用 -->
                          <!-- <option value="confirmTemplate">確認範本訊息</option> -->
                          <option value="buttonsTemplate">按鍵範本訊息</option>
                          <option value="carouselTemplate" selected>輪播範本訊息</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 預覽區 -->
            <div class="col-12 col-lg-6">
              <!-- 預覽回應訊息 => 待編輯-->
              <ReviewOnBoard :reply-message="replyMessage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import components
import ReplyMsgEditor from "../components/EditorBotScript/ReplyMsgEditor.vue";
import ReviewOnBoard from "../components/ReplyMessage/core/ReviewOnBoard.vue";

// import helpers
import welcomeMsgAPI from "../../../apis/welcomeMsg.js";
import botScriptAPI from "../../../apis/botScript.js";
import { mapState } from "vuex";
import { Toast } from "../../../utils/helpers";
import { msgGenerator } from "../../../utils/templateGenerator.js";

export default {
  name: "EditorBotWelcome",
  components: {
    ReplyMsgEditor,
    ReviewOnBoard,
  },
  data() {
    return {
      replyModules: [], // API 取得的資料
      replyModule: {}, // API 取得的資料，用於回應訊息編輯
      replyMessage: [],
      isProcessing: false,
      moduleClick: {
        status: true,
        index: -1,
      },
      replyModuleList: [], // API 取得的資料replyModules，取部分值成模組清單，用於各 components 之模組清單

      componentSelect: "", //使用者選擇的回應訊息樣版
      limit: {
        replyMessagePerSend: 5,
      },
    };
  },
  computed: {
    ...mapState(["chatbot", "channel"]),
  },
  async created() {
    try {
      // 檢查請求資料
      let apiDataWelcome = {
        params: {
          botId: this.chatbot.botId,
        },
        query: {
          ChatbotId: this.chatbot.id,
        },
      };

      let apiDataReplyModule = {
        params: {
          botId: this.chatbot.botId,
        },
        query: {
          ChatbotId: this.chatbot.id,
        },
      };
      // query API for welcome message
      const res1 = await welcomeMsgAPI.getWelcomeMsg(apiDataWelcome);

      // query API for reply Module
      const res2 = await botScriptAPI.getReplyModules(apiDataReplyModule);

      console.log("res1=>>>", res1);
      // 判斷 query 成功否
      if (
        res1.statusText === "OK" &&
        res1.data.status === "success" &&
        res2.statusText === "OK" &&
        res2.data.status === "success"
      ) {
        // 整理取得的 welcomeMsg
        if (!Array.isArray(res1.data.data.welcomeMsg.replyMessage)) {
          //welcomeMsg 轉成 array
          this.replyMessage = [{ ...res1.data.data.welcomeMsg.replyMessage }];
        } else {
          this.replyMessage = [...res1.data.data.welcomeMsg.replyMessage];
        }

        this.replyModule = res1.data.data.welcomeMsg;

        // 整理取得的 replyModules
        this.replyModules = [...res2.data.data.replyModules];

        return Toast.fire({
          icon: "success",
          title: "成功取得資料",
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
  beforeUpdate() {
    //清空 replyModuleList
    this.replyModuleList = [];
    //再把 replyModules 的資料放進去
    this.replyModules.forEach((d) => {
      this.replyModuleList.push({
        id: d.id,
        name: d.name,
        uuid: d.uuid,
        status: d.status,
      });
    });
  },
  methods: {
    //儲存所有模組
    async handleClickSaveBtn() {},
    //新增回應訊息
    async handleClickAddReplyMsgBtn() {
      try {
        // 先判斷 replyMessage.messageTemplate.length
        // 若 length === 5，則跳出訊息"已超過訊息數限制"
        if (this.replyMessage.length === this.limit.replyMessagePerSend) {
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
          const messageTemplateCreate = JSON.parse(
            JSON.stringify(
              msgGenerator({
                type: this.componentSelect,
              })
            )
          );
          //將新樣版整合至  messageTemplate
          this.replyMessage.push(messageTemplateCreate);

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
    //刪除 replyMsg(子層傳遞上來的事件)
    handleDeleteReplyMsg([index]) {
      this.replyMessage.splice(index, 1);

      Toast.fire("Deleted!", "Quick reply has been deleted.", "success");
    },
  },
};
</script>