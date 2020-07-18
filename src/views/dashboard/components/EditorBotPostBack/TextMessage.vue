<template>
  <div class="col border mt-4 mb-5 pb-5">
    <h5 class="my-4">文字訊息編輯區</h5>
    <div class="py-3 px-2 mb-2 border">
      <div class="d-flex">
        <button class="btn btn-primary btn-sm m-2" @click="addText">新增一個文字訊息</button>
      </div>
      <!-- 編輯 text 區 -->
      <div v-for="(item,index) in context" :key="index" class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">{{index + 1}}</span>
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

    <div class="py-3 px-2 border">
      <button
        v-if="!quickReplyDisplay"
        class="btn btn-primary btn-sm"
        @click="setUpQuickReply"
      >建立快速回覆</button>
      <button v-else class="btn btn-warning btn-sm" @click="clearQuickReply">清空快速回覆</button>
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
export default {
  name: "TextMessage",
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

      //使用者編輯的內容
      context: [],
      //使用者編輯的 quickReply 於儲存時，再存進 context[context.length - 1]
      quickReply: {},
      //建立快速回覆(預設 false)
      quickReplyDisplay: false,
      //使用者選取的動作
      actionSelect: ""
    };
  },
  created() {
    this.context.push({ ...this.textSchema });
  },
  mounted() {},
  beforeUpdate() {},
  methods: {
    //新增一個文字訊息
    addText() {
      this.context.push({ ...this.textSchema });
    },
    //建立快速回覆
    setUpQuickReply() {
      this.quickReply = {
        ...this.quickReplySchema
      };
      this.quickReplyDisplay = true;
    },
    //清空快速回覆
    clearQuickReply() {
      //清空使用者建立的 quickReply
      this.quickReply = {};
      //隱藏 quickReply 編輯區
      this.quickReplyDisplay = false;
    },
    //新增一個 quick reply
    addQuickReply() {
      //判斷使用者是否選取 quickReply 類別
      if (this.actionSelect === "") {
        return;
      }
      //若已選擇，則在 this.quickReply 加入合適的 action schema
      this.quickReply.quickReply.items.push(
        this.actionSchemaForQuick[this.actionSelect]
      );
      //清空 this.actionSelect
      this.actionSelect = "";
    }
  }
};
</script>