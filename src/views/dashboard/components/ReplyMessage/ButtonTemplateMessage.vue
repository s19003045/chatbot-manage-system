<template>
  <div class="col border mt-1 mb-3 py-2 border-primary rounded">
    <h5 class="my-3">按鍵範本訊息編輯區</h5>

    <!-- 編輯區 -->
    <div class="py-3 px-2 mb-2 border">
      <!-- 顯示文字內容 -->
      <div class="input-group mb-2">
        <!-- 是否需要圖片 -->
        <div class="input-group-prepend">
          <label for="withImage" class="input-group-text">是否需要圖片</label>
        </div>
        <select name="withImage" id="withImage" class="custom-select" v-model="withImage">
          <option value="true">使用圖片</option>
          <option value="false">不使用圖片</option>
        </select>
      </div>
      <!-- 若 thumbnailImageUrl 不為空則顯示 input 欄位 -->
      <div v-if="withImage === 'true'" class="input-group mb-2">
        <div class="input-group-prepend">
          <label for class="input-group-text">圖片URL</label>
        </div>
        <input type="text" class="form-control" v-model="templateItem.template.thumbnailImageUrl" />
      </div>
      <!-- 上傳圖片 => 之後再來規劃 -->
      <!-- 說明文字：點擊 icon 後再跳出來 -->
      <!-- <small class="text-muted">
        Image URL (Max character limit: 1,000)
        <br />HTTPS over TLS 1.2 or later
        <br />JPEG or PNG
        <br />Max width: 1024px
        <br />Max file size: 1 MB
      </small>-->
      <!-- imageAspectRatio =>暫不做-->

      <!-- imageSize =>暫不做 -->

      <!-- imageBackgroundColor =>暫不做 -->

      <!-- 標題 -->
      <div class="input-group">
        <div class="input-group-prepend">
          <label for class="input-group-text">標題</label>
        </div>
        <textarea
          class="form-control"
          :maxlength="limit.titleTextLength"
          v-model="templateItem.template.title"
        />
      </div>
      <!-- 標題顯示字數統計 -->
      <div class="mt-2 mb-3">
        <small
          class="text-muted text-left mx-5"
        >字數統計： {{templateItem.template.title.length}} / {{limit.titleTextLength}}</small>
      </div>
      <!-- 文字 -->
      <div class="input-group">
        <div class="input-group-prepend">
          <label for class="input-group-text">文字</label>
        </div>
        <!-- 有圖片時 -->
        <textarea
          v-if="withImage === 'true'"
          :maxlength="limit.textLengthWithImage"
          class="form-control"
          v-model="templateItem.template.text"
        />
        <!-- 沒有圖片時 -->
        <textarea
          v-if="withImage === 'false'"
          :maxlength="limit.textLengthWithoutImage"
          class="form-control"
          v-model="templateItem.template.text"
        />
      </div>
      <!-- 文字顯示字數統計 -->
      <div class="mt-2 mb-3">
        <!-- 若有圖片 -->
        <small
          v-if="withImage === 'true'"
          class="text-muted text-left mx-5"
        >字數統計： {{templateItem.template.text.length}} / {{limit.textLengthWithImage}}</small>
        <!-- 若無圖片 -->
        <small
          v-else
          class="text-muted text-left mx-5"
        >字數統計： {{templateItem.template.text.length}} / {{limit.textLengthWithoutImage}}</small>
      </div>
      <!-- defaultAction 設定 =>暫不做 -->
      <!-- <div class="input-group mb-2">
        <div class="input-group-prepend">
          <label for="withDefaultAction" class="input-group-text">是否需要預設動作</label>
        </div>
        <select
          name="defaultActionDisplay"
          id="withDefaultAction"
          class="custom-select"
          v-model="withDefaultAction"
        >
          <option value="true">使用</option>
          <option value="false">不使用</option>
        </select>
      </div>
      <small class="d-block mb-2">說明：當點擊圖片、標題、文字時，會觸發預設動作</small>-->

      <!-- 選擇預設動作類別 -->
      <!-- <div v-if="withDefaultAction === 'true'" class="mb-2">
        <small>選擇預設動作類別</small>
        <div class="input-group">
          <div class="input-group-prepend">
            <label for="default-action-select" class="input-group-text">動作類別</label>
          </div>
          <select
            name="default-action"
            id="default-action-select"
            class="custom-select"
            v-model="defaultActionTypeSelect"
          >
            <option value="message">訊息動作</option>
            <option value="postback">回傳動作</option>
            <option value="uri">連結網址</option>

            <option value="datetimepicker">日期時間選擇器動作</option>
            <option value="camera">拍照</option>
            <option value="cameraRoll">上傳照片動作</option>
            <option value="location" selected>Location 動作</option>
          </select>
        </div>
        <div class="my-2">
          <button
            v-if="!defaultActionDisplay"
            class="btn btn-primary btn-sm my-2 mr-5"
            @click="addDefaultAction"
          >建立預設動作</button>
          <button
            v-else
            class="btn btn-warning btn-sm my-2 mr-5"
            @click="deleteDefaultAction"
          >刪除預設動作</button>
        </div>
      </div>-->
      <!-- defaultAction 編輯區，載入 component -->
      <!-- <ActionObject
        v-if="defaultActionDisplay"
        :action-object="templateItem.template.defaultAction"
        :reply-module-list="replyModuleList"
      />-->

      <!-- 按鍵編輯區 -->
      <!-- 顯示已建立的按鍵數/4 -->
      <hr />
      <h5 class="mt-2">按鍵編輯區</h5>
      <small class="my-3">按鍵數： {{templateItem.template.actions.length}} / {{limit.templateBtnLimit}}</small>
      <div v-for="(item, index) in templateItem.template.actions" :key="index" class="py-2">
        <ActionObject :action-object="item" :reply-module-list="replyModuleList" />
        <button
          class="btn btn-warning btn-sm my-2"
          @click.stop.prevent="handleTemplateDeleteBtnClick(index)"
        >刪除按鍵</button>
      </div>
      <!-- 新增 button & 顯示按鍵數/4 -->
      <!-- templateBtnSelect -->
      <div v-if="templateItem.template.actions.length < 4" class>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <label for="templateBtnType" class="input-group-text">選擇按鍵類型</label>
          </div>
          <select
            name="templateBtnType"
            id="templateBtnType"
            class="custom-select"
            v-model="templateBtnSelect"
          >
            <option
              v-for="(item, index) in templateBtnSelection"
              :value="item.value"
              :key="index"
            >{{item.display}}</option>
          </select>
        </div>
        <button
          class="btn btn-primary btn-sm my-3"
          @click.stop.prevent="handleTemplateAddBtnAddClick"
        >新增按鍵</button>
      </div>
      <small
        class="mx-1 my-3"
      >按鍵數：{{templateItem.template.actions.length}} / {{limit.templateBtnLimit}}</small>
    </div>
  </div>
</template>

<script>
// import components
// import QuickReply from "./core/QuickReply.vue";
import ActionObject from "./core/ActionObject.vue";

// import store
import { mapState, mapMutations } from "vuex";

// import helpers
import { Toast } from "../../../../utils/helpers";
import { actionGenerator } from "../../../../utils/templateGenerator.js";

export default {
  name: "ButtonTemplateMessage",
  props: {
    templateItem: {
      type: Object,
    },
    templateIndex: {
      type: Number,
    },
    replyModuleList: {
      type: Array,
    },
  },
  components: {
    // QuickReply,
    ActionObject,
  },
  data() {
    return {
      // 是否使用圖片
      withImage: "false", //儲存模組前必須依此值來決定 imageURL 是否要送出
      // 是否使用預設動作
      withDefaultAction: "false", //儲存前必須依此值來決定 imageURL 是否要送出

      // 使用者選擇的 defaultActionType
      defaultActionTypeSelect: "",
      // 是否顯示 defaultAction
      defaultActionDisplay: false,
      // 使用者選擇的範本按鍵類型
      templateBtnSelect: "",
      //按鍵訊息種類
      templateBtnSelection: [
        {
          value: "message",
          display: "訊息動作",
        },
        {
          value: "postback",
          display: "回傳動作",
        },
        // {
        //   value: "datetimepicker",
        //   display: "日期時間選擇器動作",
        // },
        // {
        //   value: "camera",
        //   display: "拍照",
        // },
        // {
        //   value: "cameraRoll",
        //   display: "上傳照片動作",
        // },
        // {
        //   value: "location",
        //   display: "Location 動作",
        // },
      ],
      // 限制
      limit: {
        titleTextLength: 40, //title 限制
        textLengthWithoutImage: 160, //沒有圖片時
        textLengthWithImage: 60, //有圖片時
        actionsLength: 4, //actions 最大數量
        templateBtnLimit: 4, //範本按鍵數限制
      },

      //是否正在編輯中
      isEditing: false,
      //是否正在處理中
      isProcessing: false,
      //建立快速回覆(預設 false)
      quickReplyDisplay: false,
    };
  },
  computed: {
    ...mapState(["chatbot", "currentUser", "isSaved"]),
    templateThumbnailImageUrl() {
      return this.templateItem.template.thumbnailImageUrl;
    },
    templateTitle() {
      return this.templateItem.template.title;
    },
    templateText() {
      return this.template.text;
    },
  },
  watch: {
    withImage() {
      // 改變 store.state.isSaved
      this.changeSavingStatus({ isEditing: true });
    },
    templateThumbnailImageUrl() {
      // 改變 store.state.isSaved
      this.changeSavingStatus({ isEditing: true });
    },
    templateTitle() {
      // 改變 store.state.isSaved
      this.changeSavingStatus({ isEditing: true });
    },
    templateText() {
      // 改變 store.state.isSaved
      this.changeSavingStatus({ isEditing: true });
    },
    templateBtnSelect() {
      // 改變 store.state.isSaved
      this.changeSavingStatus({ isEditing: true });
    },
  },
  created() {
    // 判斷載入的資料是否使用圖片
    if (!this.templateItem.template.thumbnailImageUrl) {
      this.withImage = "true";
    }

    // 若載入的資料有 defaultAction 屬性，則withDefaultAction = true，並對 defaultAction 賦值
    if (this.templateItem.template.defaultAction) {
      this.withDefaultAction = "true";
      if (this.templateItem.template.defaultAction.type) {
        this.defaultActionTypeSelect = this.templateItem.template.defaultAction.type;
      }
    }

    //若載入的 templateItem.quickReply 不為空，則顯示 quickReply
    if (!this.templateItem.quickReply) {
      this.quickReplyDisplay = false;
    } else {
      this.quickReplyDisplay = true;
    }
  },

  beforeUpdate() {
    // 若使用圖片而不設定 URL 時，則將 thumbnailImageUrl 賦值 null
    if (
      this.withImage === "true" &&
      this.templateItem.template.thumbnailImageUrl === ""
    ) {
      this.templateItem.template.thumbnailImageUrl = null;
    }
  },
  methods: {
    ...mapMutations(["changeSavingStatus"]),

    // 建立預設動作
    addDefaultAction() {
      // 載入合適的 actionSchema
      this.templateItem.template.defaultAction = JSON.parse(
        JSON.stringify(
          actionGenerator({
            category: "",
            type: this.defaultActionTypeSelect,
          })
        )
      );

      // 顯示 defaultAction
      this.defaultActionDisplay = true;
    },
    // 取消預設動作
    deleteDefaultAction() {
      // 載入合適的 actionSchema
      this.templateItem.template.defaultAction = {};
      // 顯示 defaultAction
      this.defaultActionDisplay = false;
    },
    // 新增按鍵
    handleTemplateAddBtnAddClick() {
      //確認使用者是否已選取按鍵類別
      if (this.templateBtnSelect === "") {
        return Toast.fire({
          icon: "info",
          text: "尚未選取按鍵類別!",
        });
      }

      // 判斷按鍵數量是否超過
      if (this.templateItem.template.actions.length === 4) {
        Toast.fire({
          icon: "warning",
          text: "已達範本按鍵數限制囉!",
        });
      } else {
        this.templateItem.template.actions.push(
          JSON.parse(
            JSON.stringify(
              actionGenerator({
                category: "",
                type: this.templateBtnSelect,
              })
            )
          )
        );
      }
    },
    // 刪除按鍵
    handleTemplateDeleteBtnClick(index) {
      // 刪除該按鍵
      this.templateItem.template.actions.splice(index, 1);
    },
  },
};
</script>

