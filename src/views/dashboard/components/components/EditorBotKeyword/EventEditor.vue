<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <h5 class="mb-4 py-2 px-3 bg-secondary text-light border border-secondary rounded">
      <small>關鍵字編輯</small>
    </h5>

    <!-- 當 textEvents 陣列不為空時 -->
    <!-- <div v-if="textEvents.length > 0"> -->
    <div
      v-for="(textEvent, index) in textEvents"
      v-bind:key="index"
      class="input-group mb-3"
      :data-text-event-uuid="textEvent.uuid"
    >
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">{{index}}</span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
        v-model="textEvent.text"
      />
      <div class="input-group-append">
        <!-- 暫時用不到編輯按鈕 -->
        <!-- 點擊編輯按鈕時，取消 disabled -->
        <!-- <button
          class="btn btn-info btn-sm mx-2 my-2"
          :data-text-event-uuid="textEvent.uuid"
          @click="handleClickEditBtn(textEvent.uuid)"
        >編輯關鍵字</button>-->
        <!-- 正在編輯時，顯示儲存按鈕 -->

        <!-- 刪除該筆資料 -->
        <button
          class="btn btn-warning btn-sm mx-2 my-2"
          :data-text-event-uuid="textEvent.uuid"
          @click="handleClickDeleteBtn(textEvent.uuid)"
        >刪除</button>
      </div>
    </div>
    <!-- </div> -->

    <!-- 當 textEvents 陣列為空時，也可以新增關鍵字 -->
    <!-- <div v-else> -->
    <button class="btn btn-primary btn-sm" @click="handleClickAddBtn">新增關鍵字</button>
    <!-- </div> -->
  </div>
</template>

<script>
// import helpers
import keywordReplyAPI from "../../../../../apis/keywordReply.js";
import { Toast } from "../../../../../utils/helpers";

export default {
  name: "EventEditor",
  props: {
    textEvents: {
      type: Array
    }
  },
  data() {
    return {
      isProcessing: false
    };
  },
  created() {},
  //資料變更時
  beforeUpdate() {
    console.log("this.textEvents  =>  ", this.textEvents);
  },
  methods: {
    handleClickEditBtn(uuid) {
      console.log(uuid);
    },
    handleClickDeleteBtn(uuid) {
      console.log(uuid);
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

        const { statusText, data } = await keywordReplyAPI.createTextEvent(
          apiData
        );

        if (statusText === "OK") {
          this.isProcessing = false;

          console.log("statusText:", statusText);
          console.log("data:", data);

          //將取得的 textEvent 存進 textEvents
          this.textEvents.push(data.data.textEvent);

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