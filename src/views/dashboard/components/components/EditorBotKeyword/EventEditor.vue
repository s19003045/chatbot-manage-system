<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <h4 class="mb-4 py-2 px-3 bg-secondary text-light border border-secondary rounded">關鍵字編輯</h4>

    <!-- 當 textEvents 陣列不為空時 -->
    <div v-if="textEvents.length > 0">
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
          <!-- 點擊編輯按鈕時，取消 disabled -->
          <button
            class="btn btn-info btn-sm mx-2 my-2"
            :data-text-event-uuid="textEvent.uuid"
            @click="handleClickEditBtn(textEvent.uuid)"
          >編輯關鍵字</button>
          <!-- 正在編輯時，顯示儲存按鈕 -->

          <!-- 刪除該筆資料 -->
          <button
            class="btn btn-warning btn-sm mx-2 my-2"
            :data-text-event-uuid="textEvent.uuid"
            @click="handleClickDeleteBtn(textEvent.uuid)"
          >刪除關鍵字</button>
        </div>
      </div>
    </div>

    <!-- 當 textEvents 陣列為空時 -->
    <div v-else>
      <button class="btn btn-primary btn-sm" @click="handleClickAddBtn">新增關鍵字</button>
    </div>
  </div>
</template>

<script>
// import helpers
// import keywordReplyAPI from "../../../../../apis/keywordReply.js";
// import { Toast } from "../../../../../utils/helpers";

export default {
  name: "EventEditor",
  props: {
    textEvents: {
      type: Array
    }
  },
  data() {
    return {};
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
    handleClickAddBtn() {}
  }
};
</script>