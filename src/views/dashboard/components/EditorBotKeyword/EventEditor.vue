<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <h5 class="mb-4 py-2 px-3 bg-secondary text-light border border-secondary rounded">
      <small>關鍵字編輯</small>
    </h5>
    <div v-if="moduleClick.status" class>
      <div v-for="(textEvent, index) in textEvents" v-bind:key="index" class="mb-3">
        <div class="input-group" :data-text-event-uuid="textEvent.uuid">
          <span class="input-group-text" id="basic-addon1">{{index+1}}</span>
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
              class="btn btn-warning btn-sm mx-2"
              :data-text-event-uuid="textEvent.uuid"
              @click="handleClickDeleteBtn(index)"
              :disabled="isProcessing"
            >刪除</button>
          </div>
        </div>
      </div>

      <button
        class="btn btn-primary btn-sm"
        @click="handleClickAddBtn"
        :disabled="isProcessing"
      >新增關鍵字</button>
    </div>
  </div>
</template>

<script>
// import helpers
// import keywordReplyAPI from "../../../../apis/keywordReply.js";
import { Toast, ToastDelete } from "../../../../utils/helpers";

export default {
  name: "EventEditor",
  props: {
    textEvents: {
      type: Array
    },
    moduleIndex: {
      type: Number
    },
    moduleClick: {
      type: Object
    }
  },
  data() {
    return {
      isProcessing: false
    };
  },
  created() {},
  //資料變更時
  beforeUpdate() {},
  mounted() {},
  methods: {
    // 使用者點擊〈刪除按鈕〉
    handleClickDeleteBtn(index) {
      ToastDelete.fire().then(result => {
        if (result.value) {
          //提示刪除成功
          Toast.fire("Deleted!", "Your file has been deleted.", "success");
          //刪除父層的該筆資料
          this.textEvents.splice(index, 1);
        }
      });
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