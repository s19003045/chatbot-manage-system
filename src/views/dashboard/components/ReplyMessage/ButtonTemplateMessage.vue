<template>
  <div class="col border mt-1 mb-3 py-2">
    <h6 class="my-3">按鍵範本訊息編輯區</h6>

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

        <!-- <textarea
          v-model="messageTemplateItem.text"
        
          class="form-control"
          :maxlength="textMaxLength"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />-->
      </div>
      <!-- 若 thumbnailImageUrl 不為空則顯示 input 欄位 -->
      <div v-if="withImage === 'true'" class="input-group mb-2">
        <div class="input-group-prepend">
          <label for class="input-group-text">圖片URL</label>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="messageTemplateItem.template.thumbnailImageUrl"
        />
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
          v-model="messageTemplateItem.template.title"
        />
      </div>
      <!-- 標題顯示字數統計 -->
      <div class="mt-2 mb-3">
        <small
          class="text-muted text-left mx-5"
        >字數統計： {{messageTemplateItem.template.title.length}} / {{limit.titleTextLength}}</small>
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
          v-model="messageTemplateItem.template.text"
        />
        <!-- 沒有圖片時 -->
        <textarea
          v-if="withImage === 'false'"
          :maxlength="limit.textLengthWithoutImage"
          class="form-control"
          v-model="messageTemplateItem.template.text"
        />
      </div>
      <!-- 文字顯示字數統計 -->
      <div class="mt-2 mb-3">
        <!-- 若有圖片 -->
        <small
          v-if="withImage === 'true'"
          class="text-muted text-left mx-5"
        >字數統計： {{messageTemplateItem.template.text.length}} / {{limit.textLengthWithImage}}</small>
        <!-- 若無圖片 -->
        <small
          v-else
          class="text-muted text-left mx-5"
        >字數統計： {{messageTemplateItem.template.text.length}} / {{limit.textLengthWithoutImage}}</small>
      </div>
      <!-- 樣版顯示區 => 暫不做 -->
    </div>

    </div>
  </div>
</template>

<script>

// import helpers
import { Toast, ToastDelete } from "../../../../utils/helpers";

export default {
  name: "ButtonTemplateMessage",
  props: {
    messageTemplateItem: {
      type: Object
    },
    templateIndex: {
      type: Number
    }
  },
  components: {
  },
  data() {
    return {

      // 是否使用圖片
      withImage: "false",
      // 限制
      limit: {
        titleTextLength: 40, //title 限制
        textLengthWithoutImage: 160, //沒有圖片時
        textLengthWithImage: 60, //有圖片時
        actionsLength: 4 //actions 最大數量
      },

      //每筆訊息長度限制
      textMaxLength: 5000,
      //是否正在編輯中
      isEditing: false,
      //是否正在處理中
      isProcessing: false,
      //建立快速回覆(預設 false)
      quickReplyDisplay: false
    };
  },
  created() {
    // 判斷載入的資料是否使用圖片
    if (!this.messageTemplateItem.template.thumbnailImageUrl) {
      this.withImage = "true";
    }

    //若載入的 messageTemplateItem.quickReply 不為空，則顯示 quickReply
    if (!this.messageTemplateItem.quickReply) {
      this.quickReplyDisplay = false;
    } else {
      this.quickReplyDisplay = true;
    }
  },

  beforeUpdate() {},
  computed: {},

  methods: {
  }
};
</script>