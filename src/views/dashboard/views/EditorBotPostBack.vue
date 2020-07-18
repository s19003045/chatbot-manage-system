<template>
  <div class="row mt-5">
    <div class="col col-6">
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
      componentSelect: ""
    };
  },
  created() {},
  beforeUpdate() {},
  mounted() {},
  methods: {}
};
</script>