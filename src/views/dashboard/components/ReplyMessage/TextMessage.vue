<template>
  <div class="col border mt-4 mb-5 pb-5">
    <h5 class="my-4">文字訊息編輯區</h5>
    <!-- <span class="text-muted">訊息數：{{this.textCount}} / 5</span> -->
    <div class="py-3 px-2 mb-2 border">
      <!-- <div class>
        <button class="btn btn-primary btn-sm m-2" @click="addText">新增文字訊息</button>
      </div>-->

      <!-- 編輯 text 區 -->
      <!-- <div v-for="(item,index) in context" :key="index"> -->
      <!-- 若 message type 為 text -->
      <div class="input-group mb-2">
        <!-- <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{index + 1}}</span>
        </div>-->
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
      <div class="mt-2 mb-3">
        <button class="btn btn-danger btn-sm mx-2" @click="deleteText" :disabled="isProcessing">刪除</button>
        <small
          class="text-muted text-left mx-5"
        >字數統計： {{textMaxLength - messageTemplateItem.text.length}} / {{textMaxLength}}</small>
      </div>

      <!-- </div> -->
    </div>

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
      <!-- 編輯 quick reply -->
      <div v-if="quickReplyDisplay" class="py-3 px-2">
        <!-- 載入 QuickReply component-->
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
    //刪除文字訊息
    deleteText() {
      this.isEditing = true;
      //跳出警示訊息，詢問是否清空
      ToastDelete.fire().then(result => {
        if (!result.value) {
          this.isEditing = false;
          return;
        }
        //確定要刪除
        if (result.value) {
          // 傳遞事件至父層(ReplyMsgEditor)的父層(EditorBotPostBack) => 未完成

          // this.context.splice(index, 1);

          //提示刪除成功
          Toast.fire("Deleted!", "Text has been deleted.", "success");

          this.isEditing = false;
        }
      });
    },
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