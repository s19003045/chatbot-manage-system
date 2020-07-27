<template>
  <div class="mb-2">
    <div class="container-fluid py-3 px-0">
      <div class="row py-1">
        <!-- 模組列表 -->
        <div class="col-12 col-lg-2">
          <ModuleList
            :keywords="keywords"
            :module-click="moduleClick"
            @after-delete-keyword="afterDeleteKeyword"
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

            <!-- 模組名稱編輯區 -->
            <div class="col-12 col-md-6 order-md-first">
              <ModuleEditor
                v-if="moduleClick.status"
                :keyword="keyword"
                :module-click="moduleClick"
              />
            </div>
          </div>
          <!-- 回應訊息編輯區 & 預覽區 -->
          <div class="row">
            <div class="col-12 col-lg-6">
              <ReplyMsgEditor :reply-message="replyMessage" :module-click="moduleClick" />
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
// import components
import ModuleList from "../components/EditorBotKeyword/ModuleList.vue";
import ReplyMsgEditor from "../components/EditorBotKeyword/ReplyMsgEditor.vue";
import ModuleEditor from "../components/EditorBotKeyword/ModuleEditor.vue";
import Review from "../components/ReplyMessage/core/Review.vue";

// import helpers
import keywordAPI from "../../../apis/keyword.js";
import { Toast } from "../../../utils/helpers";

export default {
  name: "EditorBotKeyword",
  components: {
    ModuleList,
    ReplyMsgEditor,
    ModuleEditor,
    Review,
  },
  data() {
    return {
      keywords: [],
      replyMessage: {},
      keyword: {},
      isProcessing: false,
      moduleClick: {
        status: false,
        index: -1,
      },
    };
  },
  props: {},
  async created() {
    try {
      //faked data
      let apiData = {
        params: {
          botId: "bot-x11111",
        },
        query: {
          ChatbotId: 1,
        },
      };
      const { statusText, data } = await keywordAPI.getKeywords(apiData);

      if (statusText === "OK") {
        this.keywords = data.data.keywords;

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
            keywords: this.keywords,
          },
        };

        const { statusText, data } = await keywordAPI.putKeyword(apiData);

        if (statusText === "OK" && data.status === "success") {
          this.isProcessing = false;

          return Toast.fire({
            icon: "success",
            title: "成功新增",
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

    //子層點擊新增模組按鈕事件觸發父層 => 暫無用途
    afterCreateKeyword(keyword) {
      this.keywords.push(keyword);
    },
    //子層點擊刪除模組按鈕事件觸發父層 => 暫無用途
    afterDeleteKeyword([index]) {
      this.keywords.splice(index, 1);
    },

    //子層點擊〈模組區塊〉事件觸發父層
    afterClickModule([index]) {
      //顯示模組名稱
      //該模組的資料放至 moduleEditor component
      this.keyword =
        Array.isArray(this.keywords) && this.keywords[index]
          ? this.keywords[index]
          : {};

      //該模組的 replyMessage 放至 ReplyMsgEditor component
      const replyMsgToComponent =
        Array.isArray(this.keywords) &&
        this.keywords[index] &&
        this.keywords[index].ReplyModule
          ? this.keywords[index].ReplyModule
          : {};

      this.replyMessage = replyMsgToComponent;
    },
  },
};
</script>