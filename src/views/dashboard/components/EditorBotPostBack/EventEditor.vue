<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <h5
      class="mb-4 py-2 px-3 bg-secondary text-dark border border-secondary rounded"
    >觸發事件(Postback 事件)編輯</h5>
    <div v-if="moduleClick.status" class="custom-scrollbar-css my-3 border border-secondary">
      <div
        v-for="(postBackEvent, index) in postBackEvents"
        v-bind:key="index"
        class="border px-1 py-3 mb-4"
      >
        <!-- 觸發事件名稱 => 暫用不到-->
        <!-- <div class="input-group mb-2" :data-post-back-event-uuid="postBackEvent.uuid">
          <span class="input-group-text" id="basic-addon1">name</span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="postBackEvent.name"
          />
        </div>-->
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
          class="btn btn-outline-danger btn-sm mx-2 my-1"
          :data-post-back-event-uuid="postBackEvent.uuid"
          @click="handleClickDeleteBtn(index)"
          :disabled="isProcessing"
        >刪除</button>
      </div>
    </div>
    <button
      v-if="moduleClick.status"
      class="btn btn-primary my-3 ml-2 btn-sm"
      @click="handleClickAddBtn"
      :disabled="isProcessing"
    >新增觸發事件</button>
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
      type: Array,
    },
    moduleClick: {
      type: Object,
    },
  },
  data() {
    return {
      isProcessing: false,
    };
  },
  created() {},
  //資料變更時
  beforeUpdate() {},
  mounted() {},
  methods: {
    // 使用者點擊〈刪除按鈕〉
    handleClickDeleteBtn(index) {
      ToastDelete.fire().then((result) => {
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
      const postBackEventSchema = {
        name: "",
        eventType: "postBack",
        uuid: "",
        subject: "",
        data: "",
      };
      // 觸發父層事件
      this.$emit("create-post-back-event", [{ ...postBackEventSchema }]);
    },
  },
};
</script>

<style  scoped>
/* Custom Scrollbar using CSS */
.custom-scrollbar-css {
  max-height: 500px;
  overflow-y: scroll;
}

/* scrollbar width */
.custom-scrollbar-css::-webkit-scrollbar {
  width: 5px;
}

/* scrollbar track */
.custom-scrollbar-css::-webkit-scrollbar-track {
  background: #eee;
}

/* scrollbar handle */
.custom-scrollbar-css::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background-color: #8a8a8a;
  /* background-image: linear-gradient(to top, #00d2ff 0%, #3a7bd5 100%); */
}
</style>