<template>
  <div class="col border mt-1 mb-3 py-2 border-primary rounded">
    <h5 class="my-3">文字訊息編輯區</h5>

    <div class="py-3 px-2 mb-2 border">
      <!-- 顯示文字內容 -->
      <div class="input-group mb-2">
        <textarea
          v-model="templateItem.text"
          type="text"
          class="form-control"
          :maxlength="textMaxLength"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <!-- 顯示字數統計 -->
      <div class="mt-2 mb-3">
        <small
          class="text-muted text-left mx-5"
        >字數統計： {{textMaxLength - templateItem.text.length}} / {{textMaxLength}}</small>
      </div>
    </div>

    <!-- 若資料沒有 quick reply，則詢問是否要加入 quick reply，但須建議 quick reply 應加在最後一個訊息中 -->
    <div class="py-3 px-2 border">
      <h5>快速回覆編輯區</h5>
      <h6 class="mb-3 text-muted">
        說明：
        <br />1.建議將快速回覆功能放在該模組的最後一個訊息樣版。
        <br />機器人傳送訊息至 LINE 聊天室時，只會保留最後出現的快速回覆字串。
        <br />2.快速回覆訊息數最多13個
      </h6>
      <button
        v-if="!quickReplyDisplay"
        class="btn btn-primary btn-sm"
        @click="setUpQuickReply"
      >建立快速回覆</button>
      <button
        v-else
        class="btn btn-outline-danger btn-sm"
        @click="clearQuickReply"
        :disabled="isProcessing"
      >清空所有快速回覆訊息</button>
      <!-- 若資料已有 quick reply，則顯示之 -->
      <!-- 載入 QuickReply component-->
      <div v-if="quickReplyDisplay" class="py-3 px-2">
        <QuickReply :quick-reply="templateItem.quickReply" :reply-module-list="replyModuleList" />
      </div>
    </div>
  </div>
</template>

<script>
// import components
import QuickReply from "./core/QuickReply.vue";

// import helpers
import { Toast, ToastDelete } from "../../../../utils/helpers";
import { msgGenerator } from "../../../../utils/templateGenerator.js";

export default {
  name: "TextMessage",
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
  components: {
    QuickReply,
  },
  data() {
    return {
      //每筆訊息長度限制
      textMaxLength: 5000,
      //是否正在編輯中
      isEditing: false,
      //是否正在處理中
      isProcessing: false,
      //建立快速回覆(預設 false)
      quickReplyDisplay: false,
    };
  },
  created() {
    //若載入的 templateItem.quickReply 不為空，則顯 quickReply
    if (!this.templateItem.quickReply) {
      this.quickReplyDisplay = false;
    } else {
      this.quickReplyDisplay = true;
    }
  },

  beforeUpdate() {},
  computed: {},

  methods: {
    //建立快速回覆
    setUpQuickReply() {
      //複製 schema
      this.templateItem.quickReply = JSON.parse(
        JSON.stringify(msgGenerator({ type: "quickReply" }))
      );

      //顯示 quickReply 編輯 區
      this.quickReplyDisplay = true;
    },
    //清空快速回覆
    clearQuickReply() {
      this.isProcessing = true;
      //跳出警示訊息，詢問是否清空
      ToastDelete.fire().then((result) => {
        if (!result.value) {
          this.isProcessing = false;
          return;
        }
        //確定要刪除
        if (result.value) {
          //清空使用者建立的 quickReply
          this.templateItem.quickReply = undefined;
          //隱藏 quickReply 編輯區
          this.quickReplyDisplay = false;
          //提示刪除成功
          Toast.fire("Deleted!", "Quick reply has been deleted.", "success");

          this.isProcessing = false;
        }
      });
    },
  },
};
</script>