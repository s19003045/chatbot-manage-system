<template>
  <div class="my-3 mx-2">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#reviewReplyMsg"
    >預覽訊息</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="reviewReplyMsg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="reviewReplyMsgLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reviewReplyMsgLabel">預覽回應訊息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- chatbot 回應訊息顯示區 -->
          <div class="modal-body custom-scrollbar-css py-0">
            <div class="container-fluid px-0 py-0">
              <!-- 單一 template 訊息顯示區 -->
              <div class="row px-4 pt-3 pb-4">
                <div
                  class="buttons-template col col-lg-8 py-0 px-0 mr-auto border-0 rounded rounded-lg bg-light"
                >
                  <div class="button-template-image rounded-top rounded-lg">
                    <!-- <img
                      src="https://picsum.photos/id/1005/300/200"
                      class="img-fluid mx-auto d-block rounded-top"
                      alt="image display"
                    />-->
                  </div>

                  <h5 class="px-3 pt-3">服務選單-產前檢查</h5>
                  <hr />
                  <p class="text-primary text-center">查詢健保給付項目</p>
                  <p class="text-primary text-center">查詢自費項目</p>
                  <p class="text-primary text-center">依週期數查詢產檢項目</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 使用者輸入框 -->
          <div class="modal-footer py-0 px-2">
            <font-awesome-icon class="px-1" :icon="['fas', 'list-ul']" pull="left" size="lg" />
            <font-awesome-icon class="px-1" :icon="['fas', 'plus']" pull="left" size="lg" />
            <font-awesome-icon class="px-1" :icon="['fas', 'camera']" pull="left" size="lg" />
            <font-awesome-icon class="px-1" :icon="['fas', 'image']" pull="left" size="lg" />
            <!-- 使用者文字輸入框 -->
            <input class="form-control rounded-pill w-50 mx-auto" value="Aa" />
            <font-awesome-icon class="px-1" :icon="['fas', 'microphone']" pull="right" size="lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal-body {
  scrollbar-width: thin;
}

.button-template-image {
  width: 100%;
}

.custom-scrollbar-css {
  max-height: 500px;
  overflow-y: scroll;
}

/* Custom Scrollbar using CSS */
.custom-scrollbar-css {
  overflow-y: scroll;
}

/* scrollbar width */
.custom-scrollbar-css::-webkit-scrollbar {
  width: 5px;
}

/* scrollbar track */
.custom-scrollbar-css::-webkit-scrollbar-track {
  background: #eee;
}

/* scrollbar handle */
.custom-scrollbar-css::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background-color: #8a8a8a;
  /* background-image: linear-gradient(to top, #00d2ff 0%, #3a7bd5 100%); */
}

.modal-body .container-fluid .row {
  background-color: #7ca2de;
}

/* buttons template */
.buttons-template {
  border-radius: 20px !important;
}
.buttons-template-image {
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
}
</style>