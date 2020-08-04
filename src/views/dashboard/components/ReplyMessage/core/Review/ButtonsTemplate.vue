<template>
  <div class="container-fluid">
    <div class="row px-2 py-0 mb-2">
      <!-- avatar -->
      <div class="avatar">
        <img src="https://picsum.photos/id/157/50/50" alt />
      </div>
      <div
        class="message-template-item col-8 col-sm-6 col-md-8 col-lg-8 px-0 pb-0 mb-3 mr-auto border-0 rounded rounded-lg bg-white centered"
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
          class="template-btn-item text-primary text-center py-1 px-3 my-0"
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
  h5 {
    font-size: 0.7rem;
  }
  h6 {
    font-size: 0.6rem;
  }
  p {
    font-size: 0.6rem;
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
  background-color: #ddd;

  /* template 中的 button:last child */
  &:last-child:hover {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
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
    h5 {
      font-size: 0.8rem;
    }
    h6 {
      font-size: 0.7rem;
    }
    p {
      font-size: 0.7rem;
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
    h5 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.8rem;
    }
    p {
      font-size: 0.8rem;
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
    h5 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.8rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
}
</style>