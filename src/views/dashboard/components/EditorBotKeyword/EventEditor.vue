<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <h5 class="mb-4 py-2 px-3 bg-secondary text-light border border-secondary rounded">
      <small>關鍵字編輯</small>
    </h5>

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
        <!-- 刪除該筆資料 -->
        <button
          class="btn btn-warning btn-sm mx-2 my-2"
          :data-text-event-uuid="textEvent.uuid"
          @click="handleClickDeleteBtn(index)"
          :disabled="isProcessing"
        >刪除</button>
      </div>
    </div>

    <button class="btn btn-primary btn-sm" @click="handleClickAddBtn" :disabled="isProcessing">新增關鍵字</button>
  </div>
</template>

<script>
// import helpers
// import keywordReplyAPI from "../../../../apis/keywordReply.js";
// import { Toast } from "../../../../utils/helpers";

export default {
  name: "EventEditor",
  props: {
    textEvents: {
      type: Array
    },
    moduleIndex: {
      type: Number
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
    // 使用者點擊〈刪除按鈕〉
    handleClickDeleteBtn(index) {
      this.textEvents.splice(index, 1);
    },
    // 使用者點擊〈新增按鈕〉
    handleClickAddBtn() {
      this.textEvents.push({
        type: "text",
        text: "",
        uuid: ""
      });
    }
  }
};
</script>