<template>
  <div class="carousel-wrapper">
    <!-- avatar -->
    <div class="avatar mb-2">
      <img src="https://picsum.photos/id/157/50/50" alt />
    </div>
    <div class="carousel-btn-wrapper">
      <!-- 向左按鍵 -->
      <b-icon class="carousel-btn carousel-left" icon="chevron-left" @click="scroll_left"></b-icon>
      <!-- 向右按鍵 -->
      <b-icon class="carousel-btn carousel-right" icon="chevron-right" @click="scroll_right"></b-icon>
    </div>
    <div class="px-4 py-3 carousel" :class="msgContainerClass" ref="carousel">
      <!-- v-for 帶出每個 column -->
      <div v-for="column in replyMsgItem.template.columns" :key="column.id" class="column-message">
        <div class="message-template-item py-0 mb-3 border-0 rounded rounded-lg bg-white centered">
          <!-- 顯示圖片 -->
          <div
            v-if="column.thumbnailImageUrl !== '' || column.thumbnailImageUrl !== undefined"
            class="button-template-image rounded-top rounded-lg"
          >
            <img
              :src="column.thumbnailImageUrl"
              class="img-fluid mx-auto d-block rounded-top message-teplate-item-image"
              alt
            />
          </div>
          <!-- 標題 & 副標題 -->
          <h5 class="px-3 pt-3">{{column.title}}</h5>
          <h6 class="px-3 text-muted">{{column.text}}</h6>
          <hr class="my-0" />

          <!-- 按鍵區 -->
          <p
            v-for="item in column.actions"
            :key="item.id"
            class="template-btn-item text-primary text-center py-2 my-0"
          >{{item.label}}</p>
        </div>
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
    replyMsgIndex: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    msgContainerClass() {
      console.log(`carousel-${this.replyMsgIndex}`);
      return `carousel-${this.replyMsgIndex}`;
    },
  },
  methods: {
    scroll_left() {
      console.log(`carousel-${this.replyMsgIndex}`);
      let content = document.querySelector(`.${this.msgContainerClass}`);
      content.scrollLeft -= 100;
    },
    scroll_right() {
      console.log(`carousel-${this.replyMsgIndex}`);
      let content = document.querySelector(`.${this.msgContainerClass}`);
      content.scrollLeft += 100;
    },
  },
};
</script>

<style lang="scss" scoped>
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

.carousel {
  background-color: #7ca2de;
  overflow-x: scroll;
  display: flex;
  overflow-x: hidden;

  // carousel template 中的每一個 column
  .column-message {
    min-width: 70%;
    margin-right: 15px;
  }
  .column-message:last-child {
    margin-right: 50px;
  }
}

// 向右及向左按鍵
.carousel-btn-wrapper {
  position: relative;
  .carousel-btn {
    min-width: 40px;
    min-height: 40px;
    font-size: 15px;
    font-weight: bold;
    line-height: 15px;
    border-radius: 50%;
    color: #333;
    background-color: #fff;
    text-align: center;
    opacity: 0.5;
    padding: 5px;
    z-index: 900;
  }
  // carousel 向左 icon
  .carousel-left {
    position: absolute;
    top: 60px;
    left: calc(50% - 230px);

    &:hover {
      background-color: #ccc;
      color: #111;
    }
  }
  // carousel 向右 icon
  .carousel-right {
    position: absolute;
    top: 60px;
    right: calc(50% - 230px);

    &:hover {
      background-color: #ccc;
      color: #111;
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
  background-color: #ddd;

  /* template 中的 button:last child */
  &:last-child:hover {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
</style>