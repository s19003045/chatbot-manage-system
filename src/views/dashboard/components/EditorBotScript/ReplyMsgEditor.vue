<template>
  <!-- 單一回應訊息編輯區 -->
  <div class="col">
    <!-- 顯示 templateItem -->
    <div class="row">
      <div class="col">
        <!-- 隱藏編輯內容 -->
        <h5>
          {{templateIndex + 1}}.
          {{messageType}}
        </h5>
        <div v-if="!isEditing" class>
          <div class="d-flex justify-content-between">
            <button
              v-if="!isEditing"
              class="btn btn-outline-primary mb-0"
              :disabled="isProcessing"
              @click="toggleDisplay"
            >編輯訊息</button>
          </div>
        </div>
        <!-- 顯示編輯內容 -->
        <div v-else class>
          <div class="d-flex justify-content-between">
            <button
              v-if="isEditing"
              class="btn btn-outline-warning mb-0"
              :disabled="isProcessing"
              @click="toggleDisplay"
            >隱藏訊息</button>
            <button
              v-if="isEditing"
              class="btn btn-outline-danger mb-0"
              @click.stop.prevent="handleClickDeleteReplyMsgBtn"
              :disabled="isProcessing"
            >刪除下面訊息</button>
          </div>

          <div class>
            <ButtonTemplateMessage
              v-if="templateItem.type === 'template' && templateItem.template.type === 'buttons'"
              :template-item="templateItem"
              :template-index="templateIndex"
              :reply-module-list="replyModuleList"
            />
            <CarouselTemplateMessage
              v-if="templateItem.type === 'template' && templateItem.template.type === 'carousel'"
              :template-item="templateItem"
              :template-index="templateIndex"
              :reply-module-list="replyModuleList"
            />
            <ConfirmTemplateMessage
              v-if="templateItem.type === 'template' && templateItem.template.type === 'confirm'"
              :template-item="templateItem"
              :template-index="templateIndex"
              :reply-module-list="replyModuleList"
            />
            <TextMessage
              v-if="templateItem.type === 'text'"
              :template-item="templateItem"
              :template-index="templateIndex"
              :reply-module-list="replyModuleList"
            />
            <!-- <ImageMapMessage />
          <ImageMessage />
            <VideoMessage />-->
          </div>
        </div>
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
import { ToastDelete } from "../../../../utils/helpers";

export default {
  props: {
    templateItem: {
      type: Object,
    },
    templateIndex: {
      type: Number,
    },
    replyModuleList: {
      type: Array,
    },
  },
  data() {
    return {
      isEditing: false,
      isProcessing: false,
    };
  },
  computed: {
    messageType() {
      switch (this.templateItem.type) {
        case "text":
          return "文字訊息";
        case "template":
          switch (this.templateItem.template.type) {
            case "buttons":
              return "按鍵範本訊息";
            case "carousel":
              return "輪播範本訊息";
            case "confirm":
              return "確認範本訊息";
            default:
              return "其他類別訊息";
          }
        case "video":
          return "影片訊息";
        case "audio":
          return "音訊";
        case "imagemap":
          return "圖片地圖";
        case "location":
          return "地點訊息";
        case "sticker":
          return "貼圖";
        case "flex":
          return "flex";
        default:
          return "其他類別訊息";
      }
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
  methods: {
    // 點擊編輯按鈕
    toggleDisplay() {
      this.isEditing = this.isEditing === true ? false : true;
    },
    // 點擊刪除按鈕
    handleClickDeleteReplyMsgBtn() {
      this.isProcessing = true;
      //跳出警示訊息，詢問是否清空
      ToastDelete.fire().then((result) => {
        if (!result.value) {
          this.isProcessing = false;
          return;
        }
        //確定要刪除
        if (result.value) {
          this.$emit("handle-delete-reply-msg", [this.templateIndex]);

          this.isProcessing = false;
        }
      });
    },
  },
};
</script>