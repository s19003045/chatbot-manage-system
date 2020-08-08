<template>
  <div class="module-list-component-wrapper border border-secondary shadow mb-2">
    <div class="module-list-component">
      <h5
        class="mb-3 py-2 px-3 bg-secondary text-white bg-info border border-secondary rounded"
      >模組列表</h5>

      <div class="w-100"></div>
      <div class="custom-scrollbar-css mx-1 my-1 border-top border-bottom" id="moduleListContent">
        <ul class="nav flex-md-column my-0">
          <li
            v-for="(replyModule,index) in replyModules"
            v-bind:key="replyModule.id"
            class="nav-item px-0 py-0 my-2 my-lg-1 mx-1 border-primary"
            :class="{'module-select-color': moduleClick.index === index, 'shadow':moduleClick.index === index}"
            :data-reply-module-uuid="replyModule.uuid"
            @click.stop.prevent="handleClickModule(index)"
          >
            <div class="card mx-auto">
              <div class="card-body pl-3 py-3">
                <h6
                  class="card-subtitle mb-2 text-muted"
                >{{replyModule.name === null || replyModule.name === "" || replyModule.name === undefined ? "尚未命名" : replyModule.name}}</h6>

                <button
                  class="btn btn-outline-danger btn-sm"
                  @click.stop.prevent="handleDeleteBtnClick(index,replyModule.uuid)"
                  :disabled="isProcessing"
                >刪除</button>
              </div>
            </div>

            <!-- <div
            class="mb-2"
          >{{replyModule.name === null || replyModule.name === "" || replyModule.name === undefined ? "尚未命名" : replyModule.name}}</div>

          <button
            class="btn btn-outline-danger btn-sm"
            @click.stop.prevent="handleDeleteBtnClick(index,replyModule.uuid)"
            :disabled="isProcessing"
            >刪除</button>-->
          </li>
        </ul>
      </div>

      <button
        class="btn btn-primary my-3 ml-2 btn-sm"
        @click.stop.prevent="handleAddBtnClick"
        :disabled="isProcessing"
      >新增模組</button>
    </div>
  </div>
</template>

<script>
// import store
import { mapState } from "vuex";

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
  computed: {
    ...mapState(["chatbot", "currentUser", "isSaved"]),
  },
  created() {},
  methods: {
    // 點擊〈新增模組按鍵〉
    async handleAddBtnClick() {
      this.isProcessing = true;

      //request data
      const apiData = {
        params: {
          botId: this.chatbot.botId,
        },
        data: {
          ChatbotId: this.chatbot.id,
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

<style  lang="scss" scoped>
#moduleListContent.custom-scrollbar-css {
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch; //for mobile touch scrolling
  /* scrollbar track =>scrollbar 整體樣式 */
  &::-webkit-scrollbar {
    width: 10px; /*高寬分別對應橫豎滾動條的尺寸*/
    height: 10px;
  }

  /* scrollbar handle =>滑塊*/
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: #8a8a8a;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    /* background-image: linear-gradient(to top, #00d2ff 0%, #3a7bd5 100%); */
  }

  /** scrollbar track => 軌道 */
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }

  ul {
    display: flex;
    flex-wrap: nowrap;

    /* moduleList item */
    li {
      &.module-select-color {
        border: solid 2px;
      }

      /* moduleList item :hover */
      &:hover {
        border: 2px solid #e1f2f8;
      }
    }

    /* moduleList item card */
    .card {
      width: 9rem;
      height: 100%;
    }
  }
}

/* medium */
@media only screen and (min-width: 768px) {
  /* Custom Scrollbar using CSS */
  #moduleListContent.custom-scrollbar-css {
    max-height: 60vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  //   /* scrollbar width */
  .custom-scrollbar-css::-webkit-scrollbar {
    // overflow-x: hidden;
    // overflow-y: scroll;
  }
  #moduleListContent ul {
    width: 100%;
  }
  #moduleListContent .card {
    width: 100%;
  }
}
</style>