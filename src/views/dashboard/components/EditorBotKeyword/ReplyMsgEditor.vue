<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <h5 class="mb-4 py-2 px-3 bg-secondary text-dark border border-secondary rounded">回應訊息編輯</h5>

    <!-- 回應訊息編輯區，點擊模組後才可以編輯 -->
    <div v-if="moduleClick.status" class="custom-scrollbar-css border border-secondary">
      <h5
        class="mb-4 py-2 px-3 bg-secondary text-dark border border-secondary rounded"
        ref="editor"
      >
        <small for="reply-message-name">回應訊息名稱：</small>

        <input
          type="text"
          class="my-2"
          id="reply-message-name"
          v-if="moduleClick.status"
          v-model="replyModule.name"
        />
      </h5>

      <!-- 編輯區一： json editor -->
      <h6>JSON 編輯區</h6>
      <div class v-if="isEditing">
        <v-jsoneditor
          v-model="replyModule.replyMessage"
          :options="options"
          :plus="false"
          @error="onError"
        />
      </div>
      <div v-if="moduleClick.status">
        <button
          v-if="!isEditing"
          class="btn btn-info btn-sm mx-2 my-2"
          :data-reply-module-uuid="replyModule.uuid"
          @click="handleClickEditBtn()"
          :disabled="isEditing"
        >編輯回應訊息</button>
        <button
          v-else
          class="btn btn-info btn-sm mx-2 my-2"
          :data-reply-module-uuid="replyModule.uuid"
          @click="handleClicksSaveBtn()"
          :disabled="!isEditing"
        >完成JSON編輯</button>
        <button
          class="btn btn-warning btn-sm mx-2 my-2"
          :data-reply-module-uuid="replyModule.uuid"
          @click="handleClickClearBtn()"
        >清空回應訊息</button>
      </div>
      <!-- 編輯區二：使用回訊息模組功能 -->
      <div class></div>
    </div>
  </div>
</template>

<script>
// import helpers
import { Toast, ToastDelete } from "../../../../utils/helpers";

// //json editor
import VJsoneditor from "v-jsoneditor/src/index";

export default {
  name: "ReplyMsgEditor",
  components: {
    VJsoneditor,
  },
  props: {
    replyModule: {
      type: Object,
    },
    moduleClick: {
      type: Object,
    },
  },
  data() {
    return {
      options: {
        mode: "text",
      },
      isEditing: false,
    };
  },
  created() {},
  //資料變更時
  beforeUpdate() {},
  methods: {
    //點擊〈編輯JSON〉按鈕
    handleClickEditBtn() {
      this.isEditing = true;
    },
    //點擊〈完成JSON編輯〉按鈕
    handleClicksSaveBtn() {
      this.isEditing = false;
    },
    //點擊〈刪除回應訊息〉按鈕
    handleClickClearBtn() {
      //跳出警示訊息，詢問是否清空
      ToastDelete.fire().then((result) => {
        //確定要刪除
        if (result.value) {
          //提示刪除成功
          Toast.fire("Deleted!", "Your file has been deleted.", "success");
          //刪除父層的該筆資料
          this.replyModule.replyMessage = [];
          this.isEditing = false;
        }
      });
    },

    //json editor error event
    onError() {
      console.log("error");
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