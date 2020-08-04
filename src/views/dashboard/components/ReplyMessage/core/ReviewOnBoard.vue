<template>
  <div class="mb-5 mobile-view mx-auto">
    <div class="mobile-phone-top"></div>
    <!-- Button trigger modal -->
    <div id="reviewReplyMsg" class="px-0">
      <div class="container-fluid px-0 py-4 chatting-wrapper custom-scrollbar-css mx-auto">
        <!-- 多個 template 訊息顯示區 -->
        <!-- v-for -->
        <div v-for="(item,index) in replyMessage" :key="item.id">
          <ReviewSwitcher :reply-msg-item="item" :reply-msg-index="index" />
        </div>
      </div>

      <!-- 使用者輸入框 -->
      <div class="row py-1 bg-light user-input-area">
        <div class="col-12 d-flex justify-content-around align-items-center">
          <font-awesome-icon class="px-1" :icon="['fas', 'list-ul']" pull="left" size="lg" />
          <font-awesome-icon class="px-1" :icon="['fas', 'plus']" pull="left" size="lg" />
          <font-awesome-icon class="px-1" :icon="['fas', 'camera']" pull="left" size="lg" />
          <font-awesome-icon class="px-1" :icon="['fas', 'image']" pull="left" size="lg" />
          <!-- 使用者文字輸入框 -->
          <input class="form-control rounded-pill mx-3" value="Aa" />
          <font-awesome-icon class="px-1" :icon="['fas', 'microphone']" pull="right" size="lg" />
        </div>
      </div>
    </div>
    <!-- mobile bottom -->
    <div class="mobile-phone-bottom">
      <div class="inner"></div>
    </div>
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
.mobile-view {
  box-shadow: 0px 0px 10px grey;
  border-radius: 3.125rem;
  padding: 1.5rem 1rem 1rem 1rem;
  width: 85%;
  min-height: 25rem;
  max-height: 37.5rem;
  border: 1px solid #aaa;

  .mobile-phone-top {
    width: 20%;
    height: 7px;
    border-radius: 5px;
    background-color: #aaa;
    margin: 0rem auto 1rem;
  }

  .mobile-phone-bottom {
    width: 25%;
    height: 1.5rem;
    border-radius: 1.25rem;
    background-color: #fff;
    border: #8a8a5f 2px solid;
    margin: 0.875rem auto 1rem;
    // box-shadow: 0px 0px 2px #cfcf44;
    .inner {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      border: #e0e0ce 1px solid;
    }
  }
}

.container-fluid {
  background-color: #7ca2de;
}

.custom-scrollbar-css {
  scrollbar-width: thin;
  min-height: 350px;
  max-height: 420px;
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

// 使用者輸入區
.user-input-area {
  width: 100%;
  margin: 0px auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

/* small viewport */
@media only screen and (min-width: 450px) {
  .mobile-view {
    width: 80%;
    min-height: 30rem;
    max-height: 40rem;
  }
  .custom-scrollbar-css {
    min-height: 21.875rem;
    max-height: 26.25rem;
  }
}
/* small viewport */
@media only screen and (min-width: 576px) {
  .mobile-view {
    width: 75%;
    min-height: 40rem;
    max-height: 45rem;
  }
  .custom-scrollbar-css {
    min-height: 30rem;
    max-height: 35rem;
  }
}
</style>
