<template>
  <div class="row mt-5">
    <div class="col col-12 col-md-8 col-lg-6">
      <h5 class="mb-4">回傳訊息設定</h5>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="messageTypeSelect">請選擇訊息樣版</label>
        </div>
        <select class="custom-select" id="messageTypeSelect" v-model="componentSelect">
          <option value="TextMessage">文字訊息</option>
          <option value="QuickReplyMessage">快速回覆訊息</option>
          <option value="ConfirmTemplateMessage">快速回覆訊息</option>
          <option value="ButtonTemplateMessage">按鍵範本訊息</option>
          <option value="CarouselTemplateMessage" selected>輪播範本訊息</option>
        </select>
      </div>

      <div class="row">
        <div class="col">
          <ButtonTemplateMessage v-if="componentSelect === 'ButtonTemplateMessage'" />
          <CarouselTemplateMessage v-if="componentSelect === 'CarouselTemplateMessage'" />
          <ConfirmTemplateMessage v-if="componentSelect === 'ConfirmTemplateMessage'" />
          <QuickReplyMessage v-if="componentSelect === 'QuickReplyMessage'" />
          <TextMessage v-if="componentSelect === 'TextMessage'" />

          <!-- <ImageMapMessage />
          <ImageMessage />
          <VideoMessage />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonTemplateMessage from "../components/EditorBotPostBack/ButtonTemplateMessage";
import CarouselTemplateMessage from "../components/EditorBotPostBack/CarouselTemplateMessage";
import ConfirmTemplateMessage from "../components/EditorBotPostBack/ConfirmTemplateMessage";
import QuickReplyMessage from "../components/EditorBotPostBack/QuickReplyMessage";
import TextMessage from "../components/EditorBotPostBack/TextMessage";

// import ImageMapMessage from "../components/EditorBotPostBack/ImageMapMessage";
// import ImageMessage from "../components/EditorBotPostBack/ImageMessage";
// import VideoMessage from "../components/EditorBotPostBack/VideoMessage";

// import helpers
import postBackReplyAPI from "../../../apis/postBackReply.js";
import { Toast } from "../../../utils/helpers";
export default {
  name: "EditorBotPostBack",
  components: {
    ButtonTemplateMessage,
    CarouselTemplateMessage,
    ConfirmTemplateMessage,
    QuickReplyMessage,
    TextMessage

    // ImageMapMessage,
    // ImageMessage,
    // VideoMessage
  },
  data() {
    return {
      modulePostBacks: [],
      replyMessage: {},
      postBackEvents: [],
      modulePostBack: {},
      moduleIndex: -1,
      isProcessing: false,
      revealModuleName: false,
      moduleClick: { status: false },

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
  methods: {}
};
</script>