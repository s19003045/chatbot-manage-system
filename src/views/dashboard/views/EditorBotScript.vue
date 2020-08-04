<template>
  <div class="mb-2 mt-4">
    <div class="container-fluid px-1">
      <h4>機器人腳本</h4>
      <div class="row py-3">
        <!-- 模組列表 -->
        <div class="col-12 col-md-3 col-lg-2">
          <ModuleList
            id="moduleList"
            class
            :reply-modules="replyModules"
            :module-click="moduleClick"
            @after-delete-reply-module="afterDeleteReplyModule"
            @after-click-module="afterClickModule"
          />
        </div>
        <div class="col-12 col-md-9 col-lg-10">
          <div class="row justify-content-between">
            <div
              v-if="moduleClick.status"
              class="col-12 col-md-3 order-md-last mb-3"
            >
              <button
                class="btn btn-info rounded"
                @click.stop.prevent="handleClickSaveBtn('edited')"
                :disabled="isProcessing"
              >
                儲存所有模組
              </button>
            </div>
            <!-- 模組名稱編輯區 -->
            <div class="col-12 col-md-6 order-md-first">
              <ModuleEditor
                v-if="moduleClick.status"
                :reply-module="replyModule"
                :module-click="moduleClick"
              />
            </div>
          </div>
          <div class="w-100"></div>
          <!-- 回應訊息編輯區 & 預覽區-->
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="row">
                <!-- 關鍵字編輯區 -->
                <div class="col-12">
                  <KeywordEditor
                    :keywords="keywords"
                    :module-click="moduleClick"
                    :reply-module-list="replyModuleList"
                  />
                </div>
                <!-- ↓ ↓ 回應訊息編輯區 ↓ ↓ -->
                <div class="col-12">
                  <div
                    class="mb-5 py-2 px-2 border border-secondary rounded shadow-lg"
                  >
                    <h5
                      class="mb-4 py-2 px-3 bg-secondary text-dark border border-secondary rounded"
                    >
                      回應訊息編輯
                    </h5>
                    <!-- 回應訊息編輯區，點擊模組後才可以編輯 -->
                    <div v-if="moduleClick.status" class="custom-scrollbar-css">
                      <!-- 編輯回應訊息名稱 -->

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
                      >
                        新增回應訊息
                      </button>
                      <!-- 顯示總訊息數 -->
                      <span class="text-muted"
                        >訊息數：{{ replyMessage ? replyMessage.length : 0 }} /
                        5</span
                      >
                      <!-- 若點擊〈新增回應訊息按鈕〉且訊息數未超過 5 個，則讓使用者選擇訊息樣版 -->
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <label
                            class="input-group-text"
                            for="messageTypeSelect"
                            >請選擇訊息樣版</label
                          >
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
                          <option value="carouselTemplate" selected
                            >輪播範本訊息</option
                          >
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
//import components
import ModuleList from "../components/EditorBotScript/ModuleList.vue";
import ModuleEditor from "../components/EditorBotScript/ModuleEditor.vue";
import ReplyMsgEditor from "../components/EditorBotScript/ReplyMsgEditor.vue";
import KeywordEditor from "../components/EditorBotScript/KeywordEditor.vue";
import ReviewOnBoard from "../components/ReplyMessage/core/ReviewOnBoard.vue";

// import helpers
import botScriptAPI from "../../../apis/botScript.js";
import { Toast } from "../../../utils/helpers";
import { msgGenerator } from "../../../utils/templateGenerator.js";

export default {
  name: "EditorBotPostBack",
  components: {
    ModuleList,
    ModuleEditor,
    ReplyMsgEditor,
    ReviewOnBoard, //預覽
    KeywordEditor,
  },
  data() {
    return {
      replyModules: [], // API 取得的資料
      replyMessage: {}, // 點擊模組列表的模組時，置換此值，用於回應訊息編輯
      replyModule: {}, // 點擊模組列表的模組時，置換此值，用於模組名稱編輯
      keywords: [], // 點擊模組列表的模組時，置換此值，用於關鍵字編輯
      isProcessing: false,
      moduleClick: {
        status: false,
        index: -1,
      }, // 點擊模組列表的模組時，置換此值，代表被點擊模組的狀態
      replyModuleList: [], // API 取得的資料replyModules，取部分值成模組清單，用於各 components 之模組清單

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
          botId: "bot-x12345",
        },
        query: {
          ChatbotId: 1,
        },
      };
      const { statusText, data } = await botScriptAPI.getReplyModules(apiData);

      if (statusText === "OK") {
        this.replyModules = [...data.data.replyModules];
        //replyMessage 轉成 array
        this.replyModules.forEach((d) => {
          if (!Array.isArray(d.replyMessage)) {
            d.replyMessage = [{ ...d.replyMessage }];
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
  mounted() {},
  computed: {},
  methods: {
    //儲存所有模組
    async handleClickSaveBtn(action) {
      try {
        this.isProcessing = true;

        const apiData = {
          params: {
            botId: 1, //之後會從 this.$store 或從 this.$route 取得
          },
          query: {},
          data: {
            ChatbotId: 1, //之後會從 this.$store 取得
            action: action,
            replyModules: this.replyModules,
          },
        };

        const { statusText, data } = await botScriptAPI.putReplyModule(apiData);

        if (statusText === "OK" && data.status === "success") {
          this.isProcessing = false;
          return Toast.fire({
            icon: "success",
            title: "存取成功",
            text: "",
          });
        } else {
          this.isProcessing = false;
          return Toast.fire({
            icon: "error",
            title: "存取失敗，請稍後再試",
            text: "",
          });
        }
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
    afterDeleteReplyModule([index]) {
      this.replyModules.splice(index, 1);
    },

    //子層點擊模組事件觸發父層
    afterClickModule([index]) {
      //傳遞資料至 ModuleEditor component
      this.replyModule = this.replyModules[index];
      //傳遞資料至 replyMsgEditor component
      this.replyMessage = this.replyModules[index].replyMessage;
      //傳遞資料至 KeywordEditor component
      this.keywords = this.replyModules[index].Keywords;
    },

    //新增回應訊息
    async handleClickAddReplyMsgBtn() {
      try {
        // 先判斷 replyMessage.messageTemplate.length
        // 若 length === 5，則跳出訊息"已超過訊息數限制"
        if (this.replyMessage.length === 5) {
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
          this.replyModules[this.moduleClick.index].replyMessage.push(
            messageTemplateCreate
          );

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

<style scoped>
#moduleList {
  position: sticky;
  top: 70px;
}
</style>
