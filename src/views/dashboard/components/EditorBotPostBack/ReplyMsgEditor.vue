<template>
  <!-- 單一回應訊息編輯區 -->
  <div class="col">
    <!-- 顯示 messageTemplate -->
    <div class="row">
      <div class="col">
        <ButtonTemplateMessage
          v-if="messageTemplate.type === 'template' && messageTemplate.template.type === 'buttons'"
        />
        <CarouselTemplateMessage
          v-if="messageTemplate.type === 'template' && messageTemplate.template.type === 'carousel'"
        />
        <ConfirmTemplateMessage
          v-if="messageTemplate.type === 'template' && messageTemplate.template.type === 'confirm'"
        />
        <TextMessage v-if="messageTemplate.type === 'text'" />

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

export default {
  props: {
    messageTemplate: {
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
  }
};
</script>