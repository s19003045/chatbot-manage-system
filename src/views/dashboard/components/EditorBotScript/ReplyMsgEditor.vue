<template>
  <!-- 單一回應訊息編輯區 -->
  <div class="col">
    <!-- 顯示 templateItem -->
    <div class="row">
      <div class="col">
        <ButtonTemplateMessage
          v-if="templateItem.type === 'template' && templateItem.template.type === 'buttons'"
          :template-item="templateItem"
          :template-index="templateIndex"
        />
        <CarouselTemplateMessage
          v-if="templateItem.type === 'template' && templateItem.template.type === 'carousel'"
          :template-item="templateItem"
          :template-index="templateIndex"
        />
        <ConfirmTemplateMessage
          v-if="templateItem.type === 'template' && templateItem.template.type === 'confirm'"
          :template-item="templateItem"
          :template-index="templateIndex"
        />
        <TextMessage
          v-if="templateItem.type === 'text'"
          :template-item="templateItem"
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
    templateItem: {
      type: Object,
    },
    templateIndex: {
      type: Number,
    },
  },
  components: {
    ButtonTemplateMessage,
    CarouselTemplateMessage,
    ConfirmTemplateMessage,
    TextMessage,

    // ImageMapMessage,
    // ImageMessage,
    // VideoMessage
  },
  methods: {},
};
</script>