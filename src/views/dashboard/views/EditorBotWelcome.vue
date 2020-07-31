<template>
  <b-row class="mt-5 mx-auto justify-content-center">
    <b-col sm="2" lg="2">
      <label for="welcome-msg" class="h5">歡迎訊息</label>
    </b-col>
    <b-col sm="10" lg="6">
      <b-form-textarea
        id="welcome-msg"
        size="lg"
        placeholder="輸入歡迎訊息"
        rows="5"
        max-rows="8"
        v-model="welcomeMessage.text"
      ></b-form-textarea>
    </b-col>
  </b-row>
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