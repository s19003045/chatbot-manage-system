<template>
  <div class="mb-5 py-1 px-1 border border-secondary">
    <h5 class="mb-3 py-2 px-3 bg-secondary text-dark border border-secondary rounded">模組列表</h5>
    <div class="custom-scrollbar-css my-3">
      <table class="table table-hover rounded">
        <tbody>
          <tr v-for="(modulePostBack,index) in modulePostBacks" v-bind:key="modulePostBack.id">
            <td
              :data-module-post-back-uuid="modulePostBack.uuid"
              @click.stop.prevent="handleClickModule(index)"
              :class="{'module-select-color':moduleClick.index === index}"
            >
              <div
                class="mb-2"
              >{{modulePostBack.name === null || modulePostBack.name === "" || modulePostBack.name === undefined ? "尚未命名" : modulePostBack.name}}</div>
              <button
                class="btn btn-outline-danger btn-sm"
                @click.stop.prevent="handleDeleteBtnClick(index,modulePostBack.uuid)"
                :disabled="isProcessing"
              >刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button
      class="btn btn-primary my-3 ml-2 btn-sm"
      @click.stop.prevent="handleAddBtnClick"
      :disabled="isProcessing"
    >新增模組</button>
  </div>
</template>

<script>
// import helpers
import postBackReplyAPI from "../../../../apis/postBackReply.js";
import { Toast, ToastDelete } from "../../../../utils/helpers";

export default {
  name: "ModuleList",
  props: {
    modulePostBacks: {
      type: Array,
    },
    moduleClick: {
      type: Object,
    },
  },
  data() {
    return {
      isProcessing: false,
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
      const { statusText, data } = await postBackReplyAPI.createModulePostBack(
        apiData
      );

      if (statusText === "OK") {
        this.isProcessing = false;

        //將新增的資料存進 modulePostBacks
        this.modulePostBacks.push(data.data.modulePostBack);

        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-create-module-keyword", data.data.modulePostBack);

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
    async handleDeleteBtnClick(index, modulePostBackUuid) {
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
                modulePostBackUuid: modulePostBackUuid,
              },
            };
            const { statusText } = await postBackReplyAPI.deleteModulePostBack(
              apiData
            );

            if (statusText === "OK") {
              this.isProcessing = false;

              // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
              this.$emit("after-delete-module-post-back", [index]);

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
      this.moduleClick.index = index;
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