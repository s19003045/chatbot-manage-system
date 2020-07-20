<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <h5 class="mb-4 py-2 px-3 bg-secondary text-light border border-secondary rounded">
      <small>觸發事件(Postback 事件)編輯</small>
    </h5>
    <div v-if="moduleClick.status" class>
      <div
        v-for="(postBackEvent, index) in postBackEvents"
        v-bind:key="index"
        class="border px-1 py-3 mb-4"
      >
        <!-- 觸發事件名稱 -->
        <div class="input-group mb-2" :data-post-back-event-uuid="postBackEvent.uuid">
          <span class="input-group-text" id="basic-addon1">name</span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="postBackEvent.name"
          />
        </div>
        <!-- 觸發事件 subject -->
        <div class="input-group mb-2" :data-post-back-event-uuid="postBackEvent.uuid">
          <span class="input-group-text" id="basic-addon1">subject</span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="postBackEvent.subject"
          />
        </div>
        <div class="input-group mb-2" :data-post-back-event-uuid="postBackEvent.uuid">
          <span class="input-group-text" id="basic-addon1">data</span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="postBackEvent.data"
          />
        </div>
        <!-- 刪除該筆資料 -->
        <button
          class="btn btn-warning btn-sm mx-2 my-1"
          :data-post-back-event-uuid="postBackEvent.uuid"
          @click="handleClickDeleteBtn(index)"
          :disabled="isProcessing"
        >刪除</button>
      </div>

      <button
        class="btn btn-primary btn-sm"
        @click="handleClickAddBtn"
        :disabled="isProcessing"
      >新增觸發事件</button>
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
    postBackEvents: {
      type: Array
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
          this.postBackEvents.splice(index, 1);
        }
      });
    },
    // 使用者點擊〈新增按鈕〉
    handleClickAddBtn() {
      this.postBackEvents.push({
        name: "",
        eventType: "postBack",
        uuid: "",
        subject: "",
        data: ""
      });
    }
  }
};
</script>