<template>
  <!-- 單一回應訊息編輯區 -->
  <div class="col">
    <!-- 顯示 messageTemplateItem -->
    <div class="row">
      <div class="col">
        <ButtonTemplateMessage
          v-if="messageTemplateItem.type === 'template' && messageTemplateItem.template.type === 'buttons'"
          :message-template-item="messageTemplateItem"
          :template-index="templateIndex"
        />
        <CarouselTemplateMessage
          v-if="messageTemplateItem.type === 'template' && messageTemplateItem.template.type === 'carousel'"
          :message-template-item="messageTemplateItem"
          :template-index="templateIndex"
        />
        <ConfirmTemplateMessage
          v-if="messageTemplateItem.type === 'template' && messageTemplateItem.template.type === 'confirm'"
          :message-template-item="messageTemplateItem"
          :template-index="templateIndex"
        />
        <TextMessage
          v-if="messageTemplateItem.type === 'text'"
          :message-template-item="messageTemplateItem"
          :template-index="templateIndex"
        />

        <!-- <ImageMapMessage />
          <ImageMessage />
        <VideoMessage />-->
      </div>
    </div>
  </div>
</template>

<script>
import ButtonTemplateMessage from "../ReplyMessage/ButtonTemplateMessage";
import CarouselTemplateMessage from "../ReplyMessage/CarouselTemplateMessage";
import ConfirmTemplateMessage from "../ReplyMessage/ConfirmTemplateMessage";
import TextMessage from "../ReplyMessage/TextMessage";

// import ImageMapMessage from "../components/EditorBotPostBack/ImageMapMessage";
// import ImageMessage from "../components/EditorBotPostBack/ImageMessage";
// import VideoMessage from "../components/EditorBotPostBack/VideoMessage";

// import helpers
// import { Toast, ToastDelete } from "../../../../utils/helpers";

export default {
  props: {
    messageTemplateItem: {
      type: Object
    },
    templateIndex: {
      type: Number
    }
  },
  components: {
    ButtonTemplateMessage,
    CarouselTemplateMessage,
    ConfirmTemplateMessage,
    TextMessage

    // ImageMapMessage,
    // ImageMessage,
    // VideoMessage
  },
  methods: {}
};
</script>