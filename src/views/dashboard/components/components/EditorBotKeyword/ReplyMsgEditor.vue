<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <h4 class="mb-5 py-1 px-1 bg-secondary text-light border border-secondary rounded">
      {{replyMessage.name}}
      <small>回應訊息</small>
    </h4>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">編輯區(JSON)</span>
      </div>
      <textarea
        class="form-control"
        aria-label="With textarea"
        v-model="replyMessage.messageTemplate"
        disabled
      ></textarea>
    </div>
    <div v-if="Object.entries(replyMessage).length === 0"></div>
    <div v-else>
      <ul class="list-group my-3 p-2 bg-secondary">
        <li
          class="list-group-item my-1 border border-secondary rounded-pill"
          v-for="(replyMessageText, index) in replyMessageTexts"
          v-bind:key="index"
        >{{replyMessageText.text}}</li>
      </ul>
      <div v-if="replyMessage !== null">
        <button
          class="btn btn-info btn-sm mx-2 my-2"
          :data-reply-message-uuid="replyMessage.uuid"
          @click="handleClickEditBtn(replyMessage.uuid)"
        >編輯回應訊息</button>
        <button
          class="btn btn-warning btn-sm mx-2 my-2"
          :data-reply-message-uuid="replyMessage.uuid"
          @click="handleClickDeleteBtn(replyMessage.uuid)"
        >刪除回應訊息</button>
      </div>
      <div v-else>
        <button class="btn btn-primary btn-sm" @click="handleClickAddBtn">新增回應訊息</button>
      </div>
    </div>
  </div>
</template>

<script>
// import helpers
import keywordReplyAPI from "../../../../../apis/keywordReply.js";
import { Toast } from "../../../../../utils/helpers";

export default {
  name: "ReplyMsgEditor",
  props: {
    replyMessage: {
      type: Object
    }
  },
  data() {
    return {
      replyMessageTexts: []
    };
  },
  created() {
    // this.replyMessageTexts = this.replyMessage.messageTemplate;
  },
  //資料變更時
  beforeUpdate() {
    this.replyMessageTexts = this.replyMessage.messageTemplate;

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
    async handleClickDeleteBtn(uuid) {
      try {
        console.log("uuid:", uuid);
        //faked data
        const apiData = {
          params: {},
          query: {},
          data: {}
        };

        const { statusText, data } = await keywordReplyAPI.deleteReplyMessage(
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
    async handleClickAddBtn() {
      try {
        //faked data
        const apiData = {
          params: {},
          query: {},
          data: {}
        };

        const { statusText, data } = await keywordReplyAPI.createReplyMessage(
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
    }
  }
};
</script>