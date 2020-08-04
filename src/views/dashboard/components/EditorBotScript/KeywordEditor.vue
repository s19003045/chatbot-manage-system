<template>
  <div>
    <!-- 關鍵字設定 -->
    <div class="mb-5 py-2 px-2 border border-secondary rounded shadow-lg">
      <h5
        class="mb-4 py-2 px-3 bg-secondary text-dark border border-secondary rounded"
      >
        關鍵字編輯
      </h5>
      <!-- 關鍵字編輯區，點擊模組後才可以編輯 -->
      <div v-if="moduleClick.status" class="">
        <div v-if="keywords" class>
          <div v-for="(keyword, index) in keywords" :key="index" class="mb-3">
            <div class="row mb-2">
              <!-- 是否使用此關鍵字 -->
              <div class="input-group col-8 col-sm-8">
                <label for="keyword-status" class="input-group-text"
                  >是否啟用</label
                >
                <select
                  name=""
                  id="keyword-status"
                  class="custom-select"
                  v-modal="keyword.status"
                  @change="handleKeywordStatusSelect(index)"
                >
                  <option value="edited" :selected="keyword.status === 'edited'"
                    >edited</option
                  >
                  <option value="in-use" :selected="keyword.status === 'in-use'"
                    >in-use</option
                  >
                </select>
              </div>
              <!-- 刪除按鍵 -->
              <div class="col-4 col-sm-4 ml-auto d-flex justify-content-end">
                <button
                  class="btn btn-outline-danger"
                  @click.prevent.stop="handleDeleteKeywordBtnClick(keyword.id)"
                >
                  刪除
                </button>
              </div>
            </div>

            <!-- 顯示關鍵字名稱 -->
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <label for="keywordName" class="input-group-text"
                  >關鍵字名稱：</label
                >
              </div>
              <input
                type="text"
                class="form-control"
                id="keywordName"
                name="name"
                v-model="keyword.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="moduleClick.status" class="mb-5 mt-4">
        <button
          class="btn btn-primary mb-2 mr-3"
          @click="handleAddKeywordBtnClick"
        >
          新增關鍵字
        </button>
        <!-- 顯示關鍵字數 -->
        <span class="text-muted"
          >關鍵字數(啟用/全部) ：{{ activatedKeywordCount }}/{{
            keywords.length
          }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keywords: {
      type: Array,
      default() {
        return [];
      },
    },
    moduleClick: {
      type: Object,
      default() {
        return [];
      },
    },
    replyModuleList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isProcessing: false,
      keywordState: "",
    };
  },
  computed: {
    // 啟用的關鍵字數量
    activatedKeywordCount() {
      return this.keywords.filter((d) => d.status === "in-use").length;
    },
  },
  methods: {
    // keyword status 選單被選取
    handleKeywordStatusSelect(index) {
      alert(`${index} => ${this.keywords[index].status}`);
    },
    //點擊新增關鍵字
    handleAddKeywordBtnClick() {},
    //點擊刪除關鍵字
    handleDeleteKeywordBtnClick(keywordId) {
      console.log(keywordId);
      // 檢查請求需要的資料
      // 發送請求
      // 判斷 response
    },
  },
};
</script>

<style lang="sass" scoped></style>
