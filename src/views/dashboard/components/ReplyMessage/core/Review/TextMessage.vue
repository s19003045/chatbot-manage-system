<template>
  <div class="container-fluid">
    <div class="row px-2 py-0 mb-2">
      <!-- avatar -->
      <div class="avatar">
        <img src="https://picsum.photos/id/157/50/50" alt />
      </div>
      <div class="message-template-item py-0 px-0 mr-auto mb-2 mt-1 border-0 bg-white">
        <!-- 文字訊息 -->
        <p class="py-1 px-2 my-0 py-sm-2 px-sm-3" v-html="replyMsgItem.text"></p>
      </div>
    </div>

    <div
      v-if="replyMsgItem.quickReply && replyMsgItem.quickReply.items"
      class="mb-3 quick-reply-wrapper"
      id="quick-reply-btn-container"
    >
      <ul class="quick-reply-btn-list mx-0 px-0 mb-2">
        <li v-for="(item,index) in replyMsgItem.quickReply.items" :key="index">
          <button
            class="btn btn-secondary border-0 mx-1 mt-2 px-2 py-1 text-white quick-reply-btn"
          >{{item.action.label}}</button>
        </li>
      </ul>
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
    height: 20px;
    width: 20px;
    vertical-align: middle;
    margin: 0px 10px auto 0px;
    border-radius: 50%;
    img {
      height: 20px;
      width: 20px;
      border-radius: 50%;
    }
  }
  .message-template-item {
    max-width: 80%;
    border-radius: 20px;

    p {
      border-radius: 20px;
      font-size: 0.6rem;
      line-height: 0.6rem;
    }
  }
}

/** quick reply */
.quick-reply-wrapper {
  width: 100%;
  overflow-x: scroll;
  position: relative;
  padding: 0px 0px;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #8a8a8a;
  }
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: #ededed;
  }

  .quick-reply-btn-list {
    display: flex;
    list-style: none;

    .quick-reply-btn {
      min-width: 50px;
      min-height: 1.6rem;
      white-space: nowrap;
      font-size: 0.7rem;
      background-color: #315885;
      opacity: 0.8;
      border-radius: 30px;
    }
  }
}

/* x-small viewport */
@media only screen and (min-width: 450px) {
  .row {
    .avatar {
      height: 25px;
      width: 25px;
      margin: 0px 10px auto 0px;
      img {
        height: 25px;
        width: 25px;
      }
    }
    .message-template-item {
      p {
        border-radius: 20px;
        font-size: 0.7rem;
        line-height: 0.7rem;
      }
    }
  }
}

/* x-small viewport */
@media only screen and (min-width: 576px) {
  .row {
    .avatar {
      height: 30px;
      width: 30px;
      margin: 0px 10px auto 0px;
      img {
        height: 30px;
        width: 30px;
      }
    }
    .message-template-item {
      p {
        border-radius: 20px;
        font-size: 0.7rem;
        line-height: 0.7rem;
      }
    }
  }
}

/* medium */
@media only screen and (min-width: 768px) {
  .row {
    .avatar {
      height: 30px;
      width: 30px;
      margin: 0px 10px auto 0px;
      img {
        height: 30px;
        width: 30px;
      }
    }
    .message-template-item {
      p {
        border-radius: 20px;
        font-size: 0.8rem;
        line-height: 0.8rem;
      }
    }
  }
}
</style>