<template>
  <div class>
    <!-- 顯示 quick reply 並依 quick reply type 顯示-->
    <div v-for="(item,index) in quickReply.items" :key="index" class="mb-3">
      <ActionObject :action-object="item.action" :reply-module-list="replyModuleList" />
    </div>
    <!-- ↑ ↑ 顯示 quick reply ↑ ↑-->
    <!-- 選擇 quick reply 的類別，quick reply 最多 13 個 -->
    <div class="input-group pt-3">
      <div class="input-group-prepend">
        <label for="actionSelect" class="input-group-text">選擇新增訊息類別</label>
      </div>
      <select class="custom-select" id="actionSelect" v-model="actionSelect">
        <option value="message">訊息動作</option>
        <option value="postback">回傳動作</option>
        <!-- 暫時關閉用不到的功能 -->
        <!-- <option value="datetimepicker">日期時間選擇器動作</option> -->
        <!-- <option value="camera">拍照</option> -->
        <!-- <option value="cameraRoll">上傳照片動作</option> -->
        <!-- <option value="location" selected>Location 動作</option> -->
      </select>
    </div>

    <button class="btn btn-primary btn-sm m-2" @click="addQuickReply">新增快速回覆</button>
    <span class>快速回覆訊息數：{{quickReply.items.length}} / 13</span>
  </div>
</template>

<script>
// import components
import ActionObject from "./ActionObject.vue";

// import helpers
import { Toast } from "../../../../../utils/helpers";
import { actionGenerator } from "../../../../../utils/templateGenerator.js";

export default {
  name: "QuickReply",
  props: {
    quickReply: {
      type: Object,
    },
    replyModuleList: {
      type: Array,
    },
  },
  components: {
    ActionObject,
  },
  data() {
    return {
      //使用者選取的動作
      actionSelect: "",
    };
  },
  created() {},
  methods: {
    //新增一個 quick reply
    addQuickReply() {
      //判斷使用者是否選取 quickReply 類別
      if (this.actionSelect === "") {
        Toast.fire({
          icon: "info",
          text: "尚未選取類別 !",
        });
        return;
      }
      //判斷是否超過 quick reply 限制(13)
      if (this.quickReply.items.length === 13) {
        Toast.fire({
          icon: "warning",
          text: "已達快速回覆訊息限制 13 個 !",
        });
        return;
      }
      //若已選擇
      //使用者選定的 action schema
      //深拷貝
      const actionSchemaSelect = JSON.parse(
        JSON.stringify(
          actionGenerator({
            category: "quickReply",
            type: this.actionSelect,
          })
        )
      );

      //在 this.quickReply.items 加入合適的 action schema
      this.quickReply.items.push({
        ...actionSchemaSelect,
      });
      //清空 this.actionSelect
      this.actionSelect = "";
    },
  },
};
</script>