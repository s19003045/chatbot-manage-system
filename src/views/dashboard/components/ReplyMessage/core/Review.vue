<template>
  <div class="my-3 mx-2 Review-container">
    <!-- Button trigger modal -->
    <b-button v-b-modal.reviewReplyMsg>預覽訊息</b-button>
    <b-modal id="reviewReplyMsg" title="預覽訊息" ok-only>
      <div class="container-fluid px-0 py-4 mx-0 chatting-wrapper custom-scrollbar-css">
        <!-- 多個 template 訊息顯示區 -->
        <!-- v-for -->
        <div v-for="item in replyMessage" :key="item.id">
          <ReviewSwitcher :reply-msg-item="item" />
        </div>
      </div>

      <!-- 使用者輸入框 -->
      <div class="row py-1 bg-light">
        <div class="col-12 boder border-primary d-flex justify-content-around align-items-center">
          <font-awesome-icon class="px-1" :icon="['fas', 'list-ul']" pull="left" size="lg" />
          <font-awesome-icon class="px-1" :icon="['fas', 'plus']" pull="left" size="lg" />
          <font-awesome-icon class="px-1" :icon="['fas', 'camera']" pull="left" size="lg" />
          <font-awesome-icon class="px-1" :icon="['fas', 'image']" pull="left" size="lg" />
          <!-- 使用者文字輸入框 -->
          <input class="form-control rounded-pill w-50 mx-auto" value="Aa" />
          <font-awesome-icon class="px-1" :icon="['fas', 'microphone']" pull="right" size="lg" />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ReviewSwitcher from "./Review/ReviewSwitcher";

export default {
  props: {
    replyMessage: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    ReviewSwitcher,
  },
};
</script>


<style  lang="scss" scoped>
.container-fluid {
  background-color: #7ca2de;
}

.custom-scrollbar-css {
  scrollbar-width: thin;
  height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;

  /* scrollbar width */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* scrollbar track */
  &::-webkit-scrollbar-track {
    background: #eee;
  }

  /* scrollbar handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: #8a8a8a;
  }
}
</style>
