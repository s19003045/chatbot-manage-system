<template>
  <div class="col border mt-1 mb-3 py-2 border-primary rounded">
    <h5 class="my-3">輪播範本訊息編輯區</h5>

    <!-- 編輯區: 編輯 carousel 的每一個 item -->
    <div
      v-for="(carouselItem, carouselItemIndex) in templateItem.template.columns"
      :key="carouselItemIndex"
      class="py-3 px-2 mb-3 border border-info"
    >
      <!-- 欄位編輯區 -->
      <h5>欄位 {{['一','二','三','四','五','六','七','八','九','十'][carouselItemIndex] }}</h5>
      <h5>標題：{{carouselItem.title}}</h5>
      <p class="text-muted">文字：{{carouselItem.text}}</p>

      <div v-if="!isEditing" class>
        <div class="d-flex justify-content-between">
          <button
            class="btn btn-outline-primary btn-sm mb-0"
            :disabled="isProcessing"
            @click="toggleDisplay"
          >編輯欄位</button>
        </div>
      </div>
      <!-- 顯示編輯內容 -->
      <div v-else class>
        <div class="d-flex justify-content-between mb-2">
          <button
            class="btn btn-outline-warning btn-sm mb-0"
            :disabled="isProcessing"
            @click="toggleDisplay "
          >隱藏欄位</button>
          <button
            class="btn btn-outline-danger btn-sm mb-0"
            @click.stop.prevent="handleClickDeleteColumnBtn(carouselItemIndex)"
            :disabled="isProcessing"
          >刪除欄位</button>
        </div>

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
          <input type="text" class="form-control" v-model="carouselItem.thumbnailImageUrl" />
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
            v-model="carouselItem.title"
          />
        </div>
        <!-- 標題顯示字數統計 -->
        <div class="mt-2 mb-3">
          <small
            class="text-muted text-left mx-5"
          >字數統計： {{carouselItem.title.length}} / {{limit.titleTextLength}}</small>
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
            v-model="carouselItem.text"
          />
          <!-- 沒有圖片時 -->
          <textarea
            v-if="withImage === 'false'"
            :maxlength="limit.textLengthWithoutImage"
            class="form-control"
            v-model="carouselItem.text"
          />
        </div>
        <!-- 文字顯示字數統計 -->
        <div class="mt-2 mb-3">
          <!-- 若有圖片 -->
          <small
            v-if="withImage === 'true'"
            class="text-muted text-left mx-5"
          >字數統計： {{carouselItem.text.length}} / {{limit.textLengthWithImage}}</small>
          <!-- 若無圖片 -->
          <small
            v-else
            class="text-muted text-left mx-5"
          >字數統計： {{carouselItem.text.length}} / {{limit.textLengthWithoutImage}}</small>
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
          <option
              v-for="(item, index) in templateBtnSelection"
              :value="item.value"
              :key="index"
            >{{item.display}}</option>
          </select>
        </div>
        <div class="my-2">
          <button
            v-if="!defaultActionDisplay"
            class="btn btn-primary btn-sm my-2 mr-5"
            @click="addDefaultAction(carouselItemIndex)"
          >建立預設動作</button>
          <button
            v-else
            class="btn btn-warning btn-sm my-2 mr-5"
            @click="deleteDefaultAction(carouselItemIndex)"
          >刪除預設動作</button>
        </div>
        </div>-->
        <!-- defaultAction 編輯區，載入 component -->
        <!-- <ActionObject
        v-if="defaultActionDisplay"
        :action-object="carouselItem.defaultAction"
        :reply-module-list="replyModuleList"
        />-->

        <!-- 按鍵編輯區 -->
        <!-- 顯示已建立的按鍵數/4 -->
        <hr />
        <h5 class="mt-2">按鍵編輯區</h5>
        <small class="my-3">按鍵數： {{carouselItem.actions.length}} / {{limit.templateBtnLimit}}</small>
        <div v-for="(item, btnIndex) in carouselItem.actions" :key="btnIndex" class="py-2">
          <ActionObject :action-object="item" :reply-module-list="replyModuleList" />
          <button
            class="btn btn-warning btn-sm my-2"
            @click.stop.prevent="handleTemplateDeleteBtnClick(carouselItemIndex,btnIndex)"
          >刪除按鍵</button>
        </div>
        <!-- 新增 button & 顯示按鍵數/4 -->
        <!-- templateBtnSelect -->
        <div v-if="carouselItem.actions.length < 4" class>
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
            @click.stop.prevent="handleTemplateAddBtnAddClick(carouselItemIndex)"
          >新增按鍵</button>
        </div>
        <small class="mx-1 my-3">按鍵數：{{carouselItem.actions.length}} / {{limit.templateBtnLimit}}</small>
      </div>
    </div>

    <!-- 新增欄位 -->
    <button class="btn btn-primary my-2 mr-3" @click.stop.prevent="handleAddColumnBtnClick">新增欄位</button>
    <small class="h6">欄位數：{{templateItem.template.columns.length}} / {{limit.columnsLimit}}</small>
  </div>
</template>

<script>
// import components
// import QuickReply from "./core/QuickReply.vue";
import ActionObject from "./core/ActionObject.vue";

// import helpers
import { Toast, ToastDelete } from "../../../../utils/helpers";
import {
  actionGenerator,
  msgGenerator,
} from "../../../../utils/templateGenerator.js";

export default {
  name: "CarouselTemplateMessage",
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
      // 是否使用圖片 => carousel 的圖片統一(要使用或不使用)
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
        textLengthWithoutImage: 120, //沒有圖片時
        textLengthWithImage: 60, //有圖片時
        actionsLength: 4, //actions 最大數量
        templateBtnLimit: 3, //範本按鍵數限制
        columnsLimit: 10,
      },
      //該欄位是否正在編輯中(Boolean)
      isEditing: false,
      //是否正在處理中
      isProcessing: false,
      //建立快速回覆(預設 false)
      quickReplyDisplay: false,
    };
  },
  computed: {},
  created() {
    // 判斷載入的資料是否使用圖片
    if (!this.templateItem.template.columns[0].thumbnailImageUrl) {
      this.withImage = "true";
    }

    // 若載入的資料有 defaultAction 屬性，則withDefaultAction = true，並對 defaultAction 賦值
    if (this.templateItem.template.columns[0].defaultAction) {
      this.withDefaultAction = "true";
      if (this.templateItem.template.columns[0].defaultAction.type) {
        this.defaultActionTypeSelect = this.templateItem.template.columns[0].defaultAction.type;
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
      this.templateItem.template.columns[0].thumbnailImageUrl === ""
    ) {
      this.templateItem.template.columns[0].thumbnailImageUrl = null;
    }
  },
  mounted() {},
  methods: {
    // 建立預設動作
    addDefaultAction(carouselItemIndex) {
      // 載入合適的 actionSchema
      this.templateItem.template.columns[
        carouselItemIndex
      ].defaultAction = JSON.parse(
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
    deleteDefaultAction(carouselItemIndex) {
      // 載入合適的 actionSchema
      this.templateItem.template.columns[carouselItemIndex].defaultAction = {};
      // 顯示 defaultAction
      this.defaultActionDisplay = false;
    },
    // 新增按鍵
    handleTemplateAddBtnAddClick(carouselItemIndex) {
      // 判斷按鍵數量是否超過
      if (
        this.templateItem.template.columns[carouselItemIndex].actions.length ===
        this.limit.templateBtnLimit
      ) {
        Toast.fire({
          icon: "warning",
          text: "已達範本按鍵數限制囉!",
        });
      } else {
        this.templateItem.template.columns[carouselItemIndex].actions.push(
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
    // 刪除訊息按鍵
    handleTemplateDeleteBtnClick(carouselItemIndex, btnIndex) {
      // 刪除該按鍵
      this.templateItem.template.columns[carouselItemIndex].actions.splice(
        btnIndex,
        1
      );
    },
    // 點擊編輯按鈕
    toggleDisplay() {
      this.isEditing = this.isEditing === true ? false : true;
    },
    // 新增欄位
    handleAddColumnBtnClick() {
      if (
        this.templateItem.template.columns.length === this.limit.columnsLimit
      ) {
        Toast.fire({
          icon: "warning",
          text: "已達欄位上限囉~",
        });
      } else {
        const carouselTemplateSchema = JSON.parse(
          JSON.stringify(msgGenerator({ type: "carouselTemplate" }))
        );
        const columnSchema = carouselTemplateSchema.template.columns[0];
        this.templateItem.template.columns.push(columnSchema);
        this.isEditing = !this.isEditing;
      }
    },
    // 點擊刪除欄位按鍵
    handleClickDeleteColumnBtn(carouselItemIndex) {
      this.isProcessing = true;
      //跳出警示訊息，詢問是否清空
      ToastDelete.fire().then((result) => {
        if (!result.value) {
          this.isProcessing = false;
          return;
        }
        //確定要刪除
        if (result.value) {
          // 刪除該欄位
          this.templateItem.template.columns.splice(carouselItemIndex, 1);
        }
      });
    },
  },
};
</script>

