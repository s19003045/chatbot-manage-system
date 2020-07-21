<template>
  <div class>
    <!-- 選擇 quick reply 的類別，quick reply 最多 13 個 -->
    <select class="custom-select" id="actionSelect" v-model="actionSelect">
      <option selected>請選擇快速回覆訊息類別...</option>
      <option value="message">訊息動作</option>
      <option value="postback">回傳動作</option>
      <option value="datetimepicker">日期時間選擇器動作</option>
      <option value="camera">拍照</option>
      <option value="cameraRoll">上傳照片動作</option>
      <option value="location" selected>Location 動作</option>
    </select>
    <button class="btn btn-primary btn-sm m-2" @click="addQuickReply">新增快速回覆</button>

    <!-- 顯示 quick reply 並依 quick reply type 顯示-->
    <div v-for="(item,index) in quickReply.items" :key="index" class="input-group mb-3">
      <ActionObject :action-object="item" />
    </div>
    <!-- ↑ ↑ 顯示 quick reply ↑ ↑-->
  </div>
</template>

<script>
// import components
import ActionObject from "./ActionObject.vue";

// import helpers
// import { Toast, ToastDelete } from "../../../../utils/helpers";
import { actionGenerator } from "../../../../../utils/templateGenerator.js";

export default {
  name: "QuickReply",
  props: {
    quickReply: {
      type: Object
    }
  },
  components: {
    ActionObject
  },
  data() {
    return {
      //使用者選取的動作
      actionSelect: ""
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
      const actionSchemaSelect = actionGenerator({
        category: "action",
        type: this.actionSelect
      });

      //在 this.quickReply.items 加入合適的 action schema
      this.quickReply.items.push(actionSchemaSelect);
      //清空 this.actionSelect
      this.actionSelect = "";
    }
  }
};
</script>