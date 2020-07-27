<template>
  <div class="mb-5 py-1 px-1 border border-secondary">
    <h5 class="mb-3 py-2 px-3 bg-secondary text-dark border border-secondary rounded">模組列表</h5>

    <div class="w-100"></div>
    <div class="custom-scrollbar-css my-3 border border-secondary" id="moduleListContent">
      <ul class="nav flex-column">
        <li
          v-for="(replyModule,index) in replyModules"
          v-bind:key="replyModule.id"
          class="nav-item border border-secondary px-2 py-2"
          :class="{'module-select-color': moduleClick.index === index}"
          :data-reply-module-uuid="replyModule.uuid"
          @click.stop.prevent="handleClickModule(index)"
        >
          <div
            class="mb-2"
          >{{replyModule.name === null || replyModule.name === "" || replyModule.name === undefined ? "尚未命名" : replyModule.name}}</div>

          <button
            class="btn btn-outline-danger btn-sm"
            @click.stop.prevent="handleDeleteBtnClick(index,replyModule.uuid)"
            :disabled="isProcessing"
          >刪除</button>
        </li>
      </ul>
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
import botScriptAPI from "../../../../apis/botScript.js";
import { Toast, ToastDelete } from "../../../../utils/helpers";

export default {
  name: "ModuleList",
  props: {
    replyModules: {
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
      const { statusText, data } = await botScriptAPI.createReplyModule(
        apiData
      );

      if (statusText === "OK") {
        this.isProcessing = false;

        // 重新組裝
        const replyModuleCreate = {
          ...data.data.replyModule,
        };

        //將新增的資料存進 replyModules
        this.replyModules.push(replyModuleCreate);

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
    async handleDeleteBtnClick(index, ReplyModuleUuid) {
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
                ReplyModuleUuid: ReplyModuleUuid,
              },
            };
            console.log(apiData);
            const { statusText, data } = await botScriptAPI.deleteReplyModule(
              apiData
            );

            if (statusText === "OK" && data.status === "success") {
              this.isProcessing = false;

              // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
              this.$emit("after-delete-reply-module", [index]);

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