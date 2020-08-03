<template>
  <div>
    <div class="row px-4 py-0">
      <!-- avatar -->
      <div class="avatar">
        <img src="https://picsum.photos/id/157/50/50" alt />
      </div>
      <div
        class="message-template-item col-8 col-lg-8 py-0 px-0 mr-auto mb-3 border-0 rounded rounded-lg bg-white centered"
      >
        <!-- 顯示圖片 -->
        <div
          v-if="replyMsgItem.template.thumbnailImageUrl !== '' || replyMsgItem.template.thumbnailImageUrl !== undefined"
          class="button-template-image rounded-top rounded-lg"
        >
          <img
            :src="replyMsgItem.template.thumbnailImageUrl"
            class="img-fluid mx-auto d-block rounded-top message-teplate-item-image"
            alt
          />
        </div>
        <!-- 標題 & 副標題 -->
        <h5 class="px-3 pt-3">{{replyMsgItem.template.title}}</h5>
        <h6 class="px-3 text-muted">{{replyMsgItem.template.text}}</h6>
        <hr class="my-0" />

        <!-- 按鍵區 -->
        <p
          v-for="item in replyMsgItem.template.actions"
          :key="item.id"
          class="template-btn-item text-primary text-center py-2 my-0"
        >{{item.label}}</p>
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
}

/* buttons template */
.message-template-item {
  border-radius: 20px !important;

  .message-teplate-item-image {
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    background-size: cover;
    background-position: center center;
  }
}

/* template 中的 button */
.template-btn-item:hover {
  background-color: #ccc;

  /* template 中的 button:last child */
  &:last-child:hover {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
</style>