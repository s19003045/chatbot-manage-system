<template>
  <div class="mb-2">
    <b-container class="py-4 px-0">
      <h4>歡迎訊息設定</h4>
      <b-row class="py-1 justify-content-center">
        <!-- 編輯區 -->
        <b-col cols="12" md="10" lg="7">
          <b-row class="mt-5 mx-auto justify-content-center">
            <b-col sm="12" lg="12">
              <label for="welcome-msg" class="h5">歡迎訊息：</label>
              <b-form-textarea
                id="welcome-msg"
                size="lg"
                placeholder="輸入歡迎訊息"
                rows="8"
                max-rows="8"
                class="shadow border border-radius"
                v-model="welcomeMessage.text"
              ></b-form-textarea>
              <b-button variant="outline-primary" class="my-3" size block pill>儲存</b-button>
            </b-col>
          </b-row>
        </b-col>
        <!-- 顯示區 -->
        <b-col cols="12" md="10" lg="5">
          <h5 class="mt-5">預覽歡迎訊息：</h5>
        </b-col>
      </b-row>
    </b-container>
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