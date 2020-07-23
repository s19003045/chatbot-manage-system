<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <h5 class="mb-3 py-2 px-3 bg-secondary text-dark border border-secondary rounded">模組列表</h5>
    <div class="custom-scrollbar-css my-3 border border-secondary">
      <table class="table table-hover rounded">
        <tbody>
          <tr v-for="(moduleKeyword,index) in moduleKeywords" v-bind:key="moduleKeyword.id">
            <td
              :data-module-keyword-uuid="moduleKeyword.uuid"
              @click.stop.prevent="handleClickModule(index)"
              :class="{'module-select-color':moduleClickIndex===index}"
            >
              <div
                class="mb-2"
              >{{moduleKeyword.name === null || moduleKeyword.name === "" || moduleKeyword.name === undefined ? "尚未命名" : moduleKeyword.name}}</div>
              <button
                class="btn btn-outline-danger btn-sm"
                @click.stop.prevent="handleDeleteBtnClick(index,moduleKeyword.uuid)"
                :disabled="isProcessing"
              >刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button
      class="btn btn-primary mb-3 ml-2 btn-sm"
      @click.stop.prevent="handleAddBtnClick"
      :disabled="isProcessing"
    >新增模組</button>
  </div>
</template>

<script>
// import helpers
import keywordReplyAPI from "../../../../apis/keywordReply.js";
import { Toast, ToastDelete } from "../../../../utils/helpers";

export default {
  name: "ModuleList",
  props: {
    moduleKeywords: {
      type: Array,
    },
    moduleClick: {
      type: Object,
    },
  },
  data() {
    return {
      isProcessing: false,
      moduleClickIndex: -1,
    };
  },
  created() {},
  methods: {
    // 點擊〈新增模組按鍵〉
    async handleAddBtnClick() {
      this.isProcessing = true;
      //faked data
      const apiData = {
        params: 1,
        data: {
          ChatbotId: 1,
        },
      };
      const { statusText, data } = await keywordReplyAPI.createModuleKeyword(
        apiData
      );

      if (statusText === "OK") {
        this.isProcessing = false;
        console.log("data:", data);

        //將新增的資料存進 moduleKeywords
        this.moduleKeywords.push(data.data.moduleKeyword);

        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-create-module-keyword", data.data.moduleKeyword);

        return Toast.fire({
          icon: "success",
          title: "成功建立",
          text: "",
        });
      } else {
        this.isProcessing = false;
        return Toast.fire({
          icon: "error",
          title: "建立失敗，請稍後再試",
          text: "",
        });
      }
    },
    // 點擊〈刪除模組按鍵〉
    async handleDeleteBtnClick(index, moduleKeywordUuid) {
      try {
        this.isProcessing = true;
        //先詢問使用者是否確定要刪除
        ToastDelete.fire().then(async (result) => {
          //不要刪除
          if (!result.value) {
            this.isProcessing = false;
          }
          //確定要刪除
          if (result.value) {
            //faked data
            const apiData = {
              params: 1,
              data: {},
              query: {
                ChatbotId: 1,
                moduleKeywordUuid: moduleKeywordUuid,
              },
            };
            const { statusText } = await keywordReplyAPI.deleteModuleKeyword(
              apiData
            );

            if (statusText === "OK") {
              this.isProcessing = false;

              // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
              this.$emit("after-delete-module-keyword", [index]);

              return Toast.fire({
                icon: "success",
                title: "成功刪除",
                text: "",
              });
            } else {
              this.isProcessing = false;
              return Toast.fire({
                icon: "error",
                title: "刪除失敗，請稍後再試",
                text: "",
              });
            }
          }
        });
      } catch (err) {
        this.isProcessing = false;
        return Toast.fire({
          icon: "error",
          title: "刪除失敗，請稍後再試",
          text: err.message,
        });
      }
    },

    // 點擊〈模組區塊〉
    async handleClickModule(index) {
      this.moduleClickIndex = index;
      this.moduleClick.status = true;
      // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
      this.$emit("after-click-module", [index]);
    },
  },
};
</script>

<style  scoped>
.module-select-color {
  background-color: #cfcfcf;
}

/* Custom Scrollbar using CSS */
.custom-scrollbar-css {
  max-height: 500px;
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
</style>