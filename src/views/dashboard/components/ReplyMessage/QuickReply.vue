<template>
  <div class>
    <!-- 選擇 quick reply 的類別，quick reply 最多 13 個 -->
    <select class="custom-select" id="actionSelect" v-model="actionSelect">
      <option selected>請選擇快速回覆訊息類別...</option>
      <option value="message">訊息動作</option>
      <option value="postback">回傳動作</option>
      <option value="datetimepicker">日期時間選擇器動作</option>
      <option value="cameraRoll">上傳照片動作</option>
      <option value="location" selected>Location 動作</option>
    </select>
    <button class="btn btn-primary btn-sm m-2" @click="addQuickReply">新增快速回覆</button>

    <!-- 顯示 quick reply -->
    <div v-for="(item,index) in quickReply.quickReply.items" :key="index" class="input-group mb-3">
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
    <!-- ↑ ↑ 顯示 quick reply ↑ ↑-->
  </div>
</template>

<script>
export default {
  name: "QuickReply",
  props: {
    quickReply: {
      type: Object
    }
  },
  data() {
    return {
      //使用者選取的動作
      actionSelect: "",
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
        camera: {
          type: "camera",
          label: "camera"
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
      }
    };
  },
  created() {},
  methods: {
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