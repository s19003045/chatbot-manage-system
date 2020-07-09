<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <h4 class="mb-4 py-2 px-3 bg-secondary text-light border border-secondary rounded">
      {{replyMessage.name}}
      <small>回應訊息</small>
    </h4>
    <!-- 編輯區一： json editor -->
    <h6>JSON 編輯區</h6>
    <v-jsoneditor v-model="replyMessageTexts" :options="options" :plus="false" @error="onError" />

    <!-- 編輯區二：使用選單 -->

    <!-- 當 replyMessage 為空時 -->
    <div
      v-if="replyMessage === null ? Object.entries({}).length === 0 : Object.entries(replyMessage).length === 0"
    >
      <button
        class="btn btn-primary btn-sm my-3"
        @click="handleClickAddBtn"
        :disabled="isProcessing"
      >新增回應訊息</button>
    </div>
    <!-- 當 replyMessage 不為空時 -->
    <div v-else>
      <h6 class="mt-4">回應訊息顯示區</h6>
      <ul class="list-group my-3 p-2 bg-secondary">
        <li
          class="list-group-item my-1 border border-secondary rounded-pill"
          v-for="(replyMessageText, index) in replyMessageTexts"
          v-bind:key="index"
        >{{replyMessageText.text}}</li>
      </ul>
      <div>
        <button
          class="btn btn-info btn-sm mx-2 my-2"
          :data-reply-message-uuid="replyMessage.uuid"
          @click="handleClickEditBtn(replyMessage.uuid)"
          :disabled="isProcessing"
        >編輯回應訊息</button>
        <button
          class="btn btn-warning btn-sm mx-2 my-2"
          :data-reply-message-uuid="replyMessage.uuid"
          @click="handleClickDeleteBtn(replyMessage.uuid)"
          :disabled="isProcessing"
        >刪除回應訊息</button>
      </div>
    </div>
  </div>
</template>

<script>
// import helpers
import keywordReplyAPI from "../../../../../apis/keywordReply.js";
import { Toast } from "../../../../../utils/helpers";

// //json editor
import VJsoneditor from "v-jsoneditor/src/index";

export default {
  name: "ReplyMsgEditor",
  components: {
    VJsoneditor
  },
  props: {
    replyMessage: {
      type: Object
    },
    moduleIndex: {
      type: Number
    }
  },
  data() {
    return {
      replyMessageTexts: [],
      isProcessing: false,
      options: {
        mode: "text",
        //json editor focus event
        onFocus({ type, target }) {
          console.log("type:", type);
          console.log("target:", target);
        }
      }
    };
  },
  created() {
    // this.replyMessageTexts = this.replyMessage.messageTemplate;
  },
  //資料變更時
  beforeUpdate() {
    //取得 messageTemplate(json) 資料
    this.replyMessageTexts =
      this.replyMessage && this.replyMessage.messageTemplate
        ? this.replyMessage.messageTemplate
        : [];

    console.log("this.replyMessageTexts  => ", this.replyMessageTexts);
  },
  methods: {
    async handleClickEditBtn(uuid) {
      try {
        console.log("uuid:", uuid);
        //faked data
        const apiData = {
          params: {},
          query: {},
          data: {}
        };

        const { statusText, data } = await keywordReplyAPI.editReplyMessage(
          apiData
        );

        if (statusText === "OK") {
          console.log("statusText:", statusText);
          console.log("data:", data);

          return Toast.fire({
            icon: "success",
            title: "成功刪除",
            text: ""
          });
        } else {
          return Toast.fire({
            icon: "error",
            title: "刪除失敗，請稍後再試",
            text: ""
          });
        }
      } catch (err) {
        console.log(err);
        return Toast.fire({
          icon: "error",
          title: "系統異常，請稍後再試",
          text: `${err.message}`
        });
      }
    },
    //點擊〈刪除回應訊息〉按鈕
    async handleClickDeleteBtn(uuid) {
      try {
        this.isProcessing = true;

        //faked data
        const apiData = {
          params: {
            botId: 1 //之後會從 this.$store 或從 this.$route 取得
          },
          query: {
            ChatbotId: 1, //之後會從 this.$store 取得
            replyMessageUuid: uuid
          },
          data: {}
        };

        const { statusText, data } = await keywordReplyAPI.deleteReplyMessage(
          apiData
        );

        if (statusText === "OK" && data.status === "success") {
          this.isProcessing = false;
          this.isEditing = false;

          //傳遞事件至父層
          this.$emit("after-delete-reply-message", [this.moduleIndex]);

          return Toast.fire({
            icon: "success",
            title: "成功刪除",
            text: ""
          });
        } else {
          this.isProcessing = false;

          return Toast.fire({
            icon: "error",
            title: "刪除失敗，請稍後再試",
            text: ""
          });
        }
      } catch (err) {
        this.isProcessing = false;

        return Toast.fire({
          icon: "error",
          title: "系統異常，請稍後再試",
          text: `${err.message}`
        });
      }
    },
    async handleClickAddBtn() {
      try {
        this.isProcessing = true;
        //faked data
        const apiData = {
          params: {
            botId: 1 //之後會從 this.$store 或從 this.$route 取得
          },
          query: {},
          data: {
            ChatbotId: 1 //之後會從 this.$store 取得
          }
        };

        const { statusText, data } = await keywordReplyAPI.createReplyMessage(
          apiData
        );

        if (statusText === "OK") {
          this.isProcessing = false;

          const replyMessageCreated = data.data.replyMessage;

          //傳遞事件至父層
          this.$emit("after-create-reply-message", [
            replyMessageCreated,
            this.moduleIndex
          ]);

          return Toast.fire({
            icon: "success",
            title: "成功新增",
            text: ""
          });
        } else {
          this.isProcessing = false;

          return Toast.fire({
            icon: "error",
            title: "新增失敗，請稍後再試",
            text: ""
          });
        }
      } catch (err) {
        this.isProcessing = false;

        return Toast.fire({
          icon: "error",
          title: "系統異常，請稍後再試",
          text: `${err.message}`
        });
      }
    },
    //json editor error event
    onError() {
      console.log("error");
    }
  }
};
</script>