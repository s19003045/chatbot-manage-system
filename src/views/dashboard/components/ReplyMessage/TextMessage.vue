<template>
  <div class="col border mt-1 mb-3">
    <h6 class="my-4">文字訊息編輯區</h6>

    <div class="py-3 px-2 mb-2 border">
      <!-- 顯示文字內容 -->
      <div class="input-group mb-2">
        <textarea
          v-model="messageTemplateItem.text"
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
        >字數統計： {{textMaxLength - messageTemplateItem.text.length}} / {{textMaxLength}}</small>
      </div>
    </div>

    <!-- 是否建立 quick reply -->
    <div class="py-3 px-2 border">
      <button
        v-if="!quickReplyDisplay"
        class="btn btn-primary btn-sm"
        @click="setUpQuickReply"
      >建立快速回覆</button>
      <button
        v-else
        class="btn btn-warning btn-sm"
        @click="clearQuickReply"
        :disabled="isProcessing"
      >清空快速回覆</button>
      <!-- 載入 QuickReply component-->
      <div v-if="quickReplyDisplay" class="py-3 px-2">
        <QuickReply :quick-reply="messageTemplateItem.quickReply" />
      </div>
    </div>
  </div>
</template>

<script>
// import components
import QuickReply from "../ReplyMessage/QuickReply.vue";

// import helpers
import { Toast, ToastDelete } from "../../../../utils/helpers";

export default {
  name: "TextMessage",
  props: {
    messageTemplateItem: {
      type: Object
    },
    templateIndex: {
      type: Number
    }
  },
  components: {
    QuickReply
  },
  data() {
    return {
      // textSchema: {
      //   type: "text",
      //   text: ""
      // },
      quickReplySchema: {
        items: []
      },

      //每筆訊息長度限制
      textMaxLength: 5000,
      //是否正在編輯中
      isEditing: false,
      //是否正在處理中
      isProcessing: false,
      //使用者編輯的內容
      // context: [],
      //使用者編輯的 quickReply 於儲存時，再存進 context[context.length - 1]
      // quickReply: {},
      //建立快速回覆(預設 false)
      quickReplyDisplay: false
      //使用者選取的動作
      // actionSelect: "",
      //整合 context及 quickReply
      // contextMix: []
    };
  },
  created() {
    // this.context.push({ ...this.textSchema });
    // //當點擊 模組列表區 之模組時，將各 type 回應訊息資料傳遞至合適的編輯區
    // //若 replyMessage 為空時
    // if (this.replyMessage === null || this.replyMessage === undefined) {
    //   return;
    // }
    // //若 replyMessage 為 array
    // if (Array.isArray(this.replyMessage.messageTemplate)) {
    //   this.context = [...this.replyMessage.messageTemplate];
    // } else {
    //   //若 replyMessage 不為 array
    //   this.context = [{ ...this.replyMessage.messageTemplate }];
    // }
  },

  beforeUpdate() {
    // this.contextMix = [...this.context];
  },
  computed: {
    // textCount() {
    //   //若 quickReply 為空，總長度為 context.length
    //   if (
    //     Object.keys(this.quickReply).length === 0 &&
    //     this.quickReply.constructor === Object
    //   ) {
    //     return this.context.length;
    //   } else {
    //     //若 quickReply 不為空，總長度為 context.length
    //     return this.context.length + 1;
    //   }
    // }
  },

  methods: {
    //新增一個文字訊息
    // addText() {
    //   //文字訊息一次最多五筆
    //   if (this.textCount === 5) {
    //     return;
    //   }

    //   this.context.push({ ...this.textSchema });
    // },

    //建立快速回覆
    setUpQuickReply() {
      //複製 schema
      this.messageTemplateItem.quickReply = {
        ...this.quickReplySchema
      };
      //顯示 quickReply 編輯 區
      this.quickReplyDisplay = true;
    },
    //清空快速回覆
    clearQuickReply() {
      this.isProcessing = true;
      //跳出警示訊息，詢問是否清空
      ToastDelete.fire().then(result => {
        if (!result.value) {
          this.isProcessing = false;
          return;
        }
        //確定要刪除
        if (result.value) {
          //清空使用者建立的 quickReply
          this.messageTemplateItem.quickReply = undefined;
          //隱藏 quickReply 編輯區
          this.quickReplyDisplay = false;
          //提示刪除成功
          Toast.fire("Deleted!", "Quick reply has been deleted.", "success");

          this.isProcessing = false;
        }
      });
    }
  }
};
</script>