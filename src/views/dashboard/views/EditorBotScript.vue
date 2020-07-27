<template>
  <div class="mb-2">
    <div class="container-fluid py-3 px-0">
      <div class="row py-1">
        <!-- 模組列表 -->
        <div class="col-12 col-lg-2">
          <ModuleList
            :reply-modules="replyModules"
            :module-click="moduleClick"
            @after-delete-reply-module="afterDeleteReplyModule"
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
                :reply-module="replyModule"
                :module-click="moduleClick"
              />
            </div>
          </div>
          <!-- 回應訊息編輯區 & 預覽區-->
          <div class="row">
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
                    <!-- 顯示總訊息數 -->
                    <span class="text-muted">訊息數：{{replyMessage ? replyMessage.length : 0 }} / 5</span>
                  </div>

                  <!-- 回應訊息樣版編輯區 ，把 messageTemplate(array) 各元件傳到 component 中編輯-->
                  <div v-if="replyMessage" class>
                    <div v-for="(template, index) in replyMessage" :key="index" class="mt-2">
                      <button
                        class="btn btn-outline-danger mb-0 ml-3"
                        @click.stop.prevent="handleClickDeleteReplyMsgBtn(index)"
                        :disabled="isProcessing"
                      >刪除</button>

                      <ReplyMsgEditor
                        :template-item="template"
                        :template-index="index"
                        :reply-module-list="replyModuleList"
                      />
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
                  <span class="text-muted">訊息數：{{replyMessage ? replyMessage.length :0 }} / 5</span>
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
            <!-- 預覽區 -->
            <div class="col-12 col-md-6">
              <!-- 預覽回應訊息 => 待編輯-->
              <Review />
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
import Review from "../components/ReplyMessage/core/Review.vue";

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
    Review, //預覽
  },
  data() {
    return {
      replyModules: [],
      replyMessage: {},
      replyModule: {},
      isProcessing: false,
      moduleClick: {
        status: false,
        index: -1,
      },
      replyModuleList: [],

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
          d.replyMessage = [{ ...d.replyMessage }];

          this.replyModuleList.push({
            id: d.id,
            name: d.name,
            uuid: d.uuid,
            status: d.status,
          });
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
        for (let i = 0; i < this.replyModules.length; i++) {
          apiData.push({
            params: {
              botId: 1, //之後會從 this.$store 或從 this.$route 取得
            },
            query: {},
            data: {
              ChatbotId: 1, //之後會從 this.$store 取得
              module: this.replyModules[i],
              postBackEvents: this.replyModules[i].PostBackEvents,
              replyMessage: this.replyModules[i].ReplyMessage,
            },
          });
        }

        //製做 requests
        const requests = [];
        for (let i = 0; i < apiData.length; i++) {
          requests.push(await botScriptAPI.postPostBackReply(apiData[i]));
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
    afterDeleteReplyModule([index]) {
      this.replyModules.splice(index, 1);
    },
    //子層點擊模組事件觸發父層
    afterClickModule([index]) {
      //傳遞資料至 ModuleEditor component
      this.replyModule = this.replyModules[index];
      //傳遞資料至 replyMsgEditor component
      this.replyMessage = this.replyModules[index].replyMessage;
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
          const messageTemplateCreate = msgGenerator({
            type: this.componentSelect,
          });
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

    // 刪除 messageTemplateItem
    handleClickDeleteReplyMsgBtn(index) {
      this.replyMessage.splice(index, 1);
      //提示刪除成功
      Toast.fire("Deleted!", "Text has been deleted.", "success");
    },
  },
};
</script>


<style  scoped>