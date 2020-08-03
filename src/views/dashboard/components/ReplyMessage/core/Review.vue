<template>
  <div class="my-3 mx-2 Review-container">
    <!-- Button trigger modal -->
    <b-button v-b-modal.reviewReplyMsg>預覽訊息</b-button>
    <b-modal id="reviewReplyMsg" title="預覽訊息" ok-only>
      <div class="container-fluid px-0 py-0 mx-0 chatting-wrapper custom-scrollbar-css">
        <!-- 多個 template 訊息顯示區 -->
        <!-- 訊息1 -->
        <div class="row px-4 pt-3 pb-2">
          <div
            class="message-template-item col-8 col-lg-8 py-0 px-0 mr-auto mb-3 border-0 rounded rounded-lg bg-light centered"
          >
            <div class="button-template-image rounded-top rounded-lg">
              <!-- <img
                      src="https://picsum.photos/id/1005/300/200"
                      class="img-fluid mx-auto d-block rounded-top"
                      alt="image display"
              />-->
            </div>

            <h5 class="px-3 pt-3">服務選單-產前檢查</h5>
            <hr class="my-0" />
            <p class="template-btn-item text-primary text-center py-2 my-0">查詢健保給付項目</p>
            <p class="template-btn-item text-primary text-center py-2 my-0">查詢自費項目</p>
            <p class="template-btn-item text-primary text-center py-2 my-0">依週期數查詢產檢項目</p>
          </div>
        </div>
        <!-- 訊息2 -->
        <div class="row px-4 pt-3 pb-2">
          <div
            class="message-template-item col-8 col-lg-8 py-0 px-0 mr-auto mb-3 border-0 rounded rounded-lg bg-light centered"
          >
            <div class="button-template-image rounded-top rounded-lg">
              <img
                src="https://picsum.photos/id/106/300/200"
                class="img-fluid mx-auto d-block rounded-top message-teplate-item-image"
                alt="image display"
              />
            </div>

            <h5 class="px-3 pt-3">服務選單-產前檢查</h5>
            <hr class="my-0" />
            <p class="template-btn-item text-primary text-center py-2 my-0">查詢健保給付項目</p>
            <p class="template-btn-item text-primary text-center py-2 my-0">查詢自費項目</p>
            <p class="template-btn-item text-primary text-center py-2 my-0">依週期數查詢產檢項目</p>
          </div>
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
export default {
  props: {
    replyMessageItemReview: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>


<style  lang="scss" scoped>
.container-fluid .row {
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
// .message-teplate-item-image {
//   border-top-left-radius: 20px !important;
//   border-top-right-radius: 20px !important;
// }

/* template 中的 button */
.template-btn-item:hover {
  background-color: #ccc;

  /* template 中的 button:last child */
  &:last-child:hover {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
// /* template 中的 button:last child */
// .template-btn-item:last-child:hover {
//   border-bottom-left-radius: 20px;
//   border-bottom-right-radius: 20px;
// }
</style>
