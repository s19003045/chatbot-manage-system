<template>
  <div class="mb-2 mt-4">
    <div class="container-fluid px-1">
      <h4>歡迎訊息設定</h4>
      <div class="row py-3">
        <div class="col-12 col-md-12 col-lg-10 mx-auto">
          <div class="row justify-content-between">
            <div v-if="moduleClick.status" class="col-12 col-md-3 order-md-last mb-3">
              <button
                class="btn btn-info rounded"
                @click.stop.prevent="handleClickSaveBtn('edited')"
                :disabled="isProcessing"
              >儲存所有模組</button>
            </div>
          </div>
          <div class="w-100"></div>
          <!-- 回應訊息編輯區 & 預覽區-->
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="row">
                <!-- ↓ ↓ 回應訊息編輯區 ↓ ↓ -->
                <div class="col-12">
                  <div class="mb-5 py-2 px-2 border border-secondary rounded shadow-lg">
                    <h5
                      class="mb-4 py-2 px-3 bg-secondary text-dark border border-secondary rounded"
                    >歡迎訊息編輯</h5>
                    <!-- 回應訊息編輯區，點擊模組後才可以編輯 -->
                    <div v-if="moduleClick.status" class="custom-scrollbar-css">
                      <!-- 編輯回應訊息名稱 -->

                      <!-- 回應訊息樣版編輯區 ，把 messageTemplate(array) 各元件傳到 component 中編輯-->
                      <div v-if="replyMessage" class>
                        <div
                          v-for="(templateItem, index) in replyMessage"
                          :key="index"
                          class="mt-3"
                        >
                          <ReplyMsgEditor
                            :template-item="templateItem"
                            :template-index="index"
                            :reply-module-list="replyModuleList"
                            @handle-delete-reply-msg="handleDeleteReplyMsg"
                          />
                        </div>
                      </div>

                      <!-- 新增回應訊息按鈕 -->
                      <!-- 下面為回應訊息類別選擇區 -->
                    </div>
                    <!-- ↑ ↑ 回應訊息編輯區 (scroll bar 邊界)↑ ↑ -->
                    <div v-if="moduleClick.status" class="mb-5 mt-4">
                      <button
                        class="btn btn-primary mb-2 mr-3"
                        @click="handleClickAddReplyMsgBtn"
                      >新增回應訊息</button>
                      <!-- 顯示總訊息數 -->
                      <span class="text-muted">
                        訊息數：{{ replyMessage ? replyMessage.length : 0 }} /
                        5
                      </span>
                      <!-- 若點擊〈新增回應訊息按鈕〉且訊息數未超過 5 個，則讓使用者選擇訊息樣版 -->
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <label class="input-group-text" for="messageTypeSelect">請選擇訊息樣版</label>
                        </div>
                        <select
                          class="custom-select"
                          id="messageTypeSelect"
                          v-model="componentSelect"
                        >
                          <option value="text" selected>文字訊息</option>
                          <!-- 暫停使用確認範本訊息 => 待確認範本訊息功能完整後再啟用 -->
                          <!-- <option value="confirmTemplate">確認範本訊息</option> -->
                          <option value="buttonsTemplate">按鍵範本訊息</option>
                          <option value="carouselTemplate" selected>輪播範本訊息</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 預覽區 -->
            <div class="col-12 col-lg-6">
              <!-- 預覽回應訊息 => 待編輯-->
              <ReviewOnBoard :reply-message="replyMessage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import components

// import helpers
import { mapState } from "vuex";

// faked data(from API)
const welcomeMessageFromAPI = {
  id: 1,
  text: `{Nickname}，您好(hello)！
      感謝您成為{channel.channelName}的好友！

      若不想接收提醒，可以點畫面右上方的選單圖示，然後關閉「提醒」喔。`,
};

export default {
  components: {},
  data() {
    return {
      welcomeMessage: {},
    };
  },
  computed: {
    ...mapState(["chatbot", "channel"]),
  },
  created() {
    // query API for welcome message

    // 先用假資料代替
    this.welcomeMessage = welcomeMessageFromAPI;
  },
  methods: {},
};
</script>