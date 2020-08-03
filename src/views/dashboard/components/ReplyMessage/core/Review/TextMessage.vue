<template>
  <div>
    <div class="row px-4 py-0">
      <!-- avatar -->
      <div class="avatar">
        <img src="https://picsum.photos/id/157/50/50" alt />
      </div>
      <div class="message-template-item py-0 px-0 mr-auto mb-3 border-0 bg-white">
        <!-- 文字訊息 -->
        <p class="py-2 px-3 my-0">{{replyMsgItem.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    replyMsgItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  background-color: #7ca2de;

  .avatar {
    height: 30px;
    width: 30px;
    vertical-align: middle;
    margin: 0px 10px auto 0px;
    border-radius: 50%;
    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
  }
  .message-template-item {
    max-width: 80%;
    border-radius: 15px;

    p {
      border-radius: 15px;
      font-size: 0.9rem;
    }
  }
}
</style>