<template>
  <div class="col border mt-4 mb-5 pb-5">
    <h5 class="my-4">文字訊息編輯區</h5>
    <span class="text-muted">訊息數：{{this.textCount}} / 5</span>
    <div class="py-3 px-2 mb-2 border">
      <div class>
        <button class="btn btn-primary btn-sm m-2" @click="addText">新增文字訊息</button>
      </div>
      <!-- 編輯 text 區 -->
      <div v-for="(item,index) in context" :key="index">
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{index + 1}}</span>
          </div>
          <textarea
            v-model="item.text"
            type="text"
            class="form-control"
            :maxlength="textMaxLength"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div class="mt-2 mb-3">
          <button
            class="btn btn-danger btn-sm mx-2"
            @click="deleteText(index)"
            :disabled="isProcessing"
          >刪除</button>
          <small
            class="text-muted text-left mx-5"
          >字數統計： {{textMaxLength - item.text.length}} / {{textMaxLength}}</small>
        </div>
      </div>
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
        <select class="custom-select" id="actionSelect" v-model="actionSelect">
          <option selected>請選擇快速回覆訊息類別...</option>
          <option value="message">訊息動作</option>
          <option value="postback">回傳動作</option>
          <option value="datetimepicker">日期時間選擇器動作</option>
          <option value="cameraRoll">上傳照片動作</option>
          <option value="location" selected>Location 動作</option>
        </select>
        <button class="btn btn-primary btn-sm m-2" @click="addQuickReply">新增快速回覆</button>
        <div
          v-for="(item,index) in quickReply.quickReply.items"
          :key="index"
          class="input-group mb-3"
        >
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">標籤</span>
          </div>
          <input
            v-model="item.label"
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">文字</span>
          </div>
          <input
            v-model="item.text"
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import helpers
import { Toast, ToastDelete } from "../../../../utils/helpers";

export default {
  name: "TextMessage",
  props: {
    replyMessage: {
      type: Object
    }
  },
  data() {
    return {
      textSchema: {
        type: "text",
        text: ""
      },
      quickReplySchema: {
        type: "text",
        text: "",
        quickReply: {
          items: []
        }
      },
      actionSchemaForQuick: {
        postback: {
          type: "postback",
          label: "",
          data: "subject=&data=",
          text: ""
        },
        message: {
          type: "message",
          label: "",
          text: ""
        },
        cameraRoll: {
          type: "cameraRoll",
          label: "Send photo"
        },
        location: {
          type: "location",
          label: "Location"
        },
        datetimepicker: {
          type: "datetimepicker",
          label: "Select date",
          data: "storeId=12345",
          mode: "datetime",
          initial: "2017-12-25t00:00",
          max: "2018-01-24t23:59",
          min: "2017-12-25t00:00"
        }
      },
      actionSchema: {
        postback: {
          type: "postback",
          label: "",
          data: "subject=&data=",
          text: ""
        },
        message: {
          type: "message",
          label: "",
          text: ""
        },
        uri: {
          type: "uri",
          label: "",
          uri: "",
          altUri: {
            desktop: ""
          }
        },
        cameraRoll: {
          type: "cameraRoll",
          label: "Send photo"
        },
        location: {
          type: "location",
          label: "Location"
        },
        datetimepicker: {
          type: "datetimepicker",
          label: "Select date",
          data: "storeId=12345",
          mode: "datetime",
          initial: "2017-12-25t00:00",
          max: "2018-01-24t23:59",
          min: "2017-12-25t00:00"
        }
      },
      //每筆訊息長度限制
      textMaxLength: 5000,
      //是否正在編輯中
      isEditing: false,
      //是否正在處理中
      isProcessing: false,
      //使用者編輯的內容
      context: [],
      //使用者編輯的 quickReply 於儲存時，再存進 context[context.length - 1]
      quickReply: {},
      //建立快速回覆(預設 false)
      quickReplyDisplay: false,
      //使用者選取的動作
      actionSelect: "",
      //整合 context及 quickReply
      contextMix: []
    };
  },
  created() {
    this.context.push({ ...this.textSchema });
    //當點擊 模組列表區 之模組時，將各 type 回應訊息資料傳遞至合適的編輯區

    //若 replyMessage 為空時
    if (this.replyMessage === null || this.replyMessage === undefined) {
      return;
    }
    //若 replyMessage 為 array
    if (Array.isArray(this.replyMessage.messageTemplate)) {
      this.context = [...this.replyMessage.messageTemplate];
    } else {
      //若 replyMessage 不為 array
      this.context = [{ ...this.replyMessage.messageTemplate }];
    }
  },

  beforeUpdate() {
    this.contextMix = [...this.context];
  },
  computed: {
    textCount() {
      //若 quickReply 為空，總長度為 context.length
      if (
        Object.keys(this.quickReply).length === 0 &&
        this.quickReply.constructor === Object
      ) {
        return this.context.length;
      } else {
        //若 quickReply 不為空，總長度為 context.length
        return this.context.length + 1;
      }
    }
  },

  methods: {
    //新增一個文字訊息
    addText() {
      //文字訊息一次最多五筆
      if (this.textCount === 5) {
        return;
      }

      this.context.push({ ...this.textSchema });
    },
    //刪除文字訊息
    deleteText(index) {
      this.isEditing = true;
      //跳出警示訊息，詢問是否清空
      ToastDelete.fire().then(result => {
        if (!result.value) {
          this.isEditing = false;
          return;
        }
        //確定要刪除
        if (result.value) {
          this.context.splice(index, 1);
          //提示刪除成功
          Toast.fire("Deleted!", "Text has been deleted.", "success");

          this.isEditing = false;
        }
      });
    },
    //建立快速回覆
    setUpQuickReply() {
      //複製 schema
      this.quickReply = {
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
          this.quickReply = {};
          //隱藏 quickReply 編輯區
          this.quickReplyDisplay = false;
          //提示刪除成功
          Toast.fire("Deleted!", "Quick reply has been deleted.", "success");

          this.isProcessing = false;
        }
      });
    },
    //新增一個 quick reply
    addQuickReply() {
      //判斷使用者是否選取 quickReply 類別
      if (this.actionSelect === "") {
        return;
      }
      //若已選擇
      //使用者選定的 action schema
      const actionSchemaSelect = {
        ...this.actionSchemaForQuick[this.actionSelect]
      };
      //在 this.quickReply 加入合適的 action schema
      this.quickReply.quickReply.items.push(actionSchemaSelect);
      //清空 this.actionSelect
      this.actionSelect = "";
    }
  }
};
</script>