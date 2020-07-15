<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">模組列表</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(moduleKeyword,index) in moduleKeywords" v-bind:key="moduleKeyword.id">
          <td
            :data-module-keyword-uuid="moduleKeyword.uuid"
            @click.stop.prevent="handleClickModule(index)"
          >
            <div class="mb-2">{{moduleKeyword.name === null ? "尚未命名模組" : moduleKeyword.name}}</div>
            <button
              class="btn btn-danger btn-sm"
              @click.stop.prevent="handleDeleteBtnClick(index, moduleKeyword.uuid)"
              :disabled="isProcessing"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
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
import { Toast } from "../../../../utils/helpers";

export default {
  name: "ModuleList",
  props: {
    moduleKeywords: {
      type: Array
    }
  },
  data() {
    return {
      isProcessing: false
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
          ChatbotId: 1
        }
      };
      const { statusText, data } = await keywordReplyAPI.createModuleKeyword(
        apiData
      );

      if (statusText === "OK") {
        console.log("data:", data);

        //將新增的資料存進 moduleKeywords
        this.moduleKeywords.push(data.data.moduleKeyword);

        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-create-module-keyword", data.data.moduleKeyword);

        this.isProcessing = false;

        return Toast.fire({
          icon: "success",
          title: "成功建立",
          text: ""
        });
      } else {
        return Toast.fire({
          icon: "error",
          title: "建立失敗，請稍後再試",
          text: ""
        });
      }
    },
    // 點擊〈刪除模組按鍵〉
    async handleDeleteBtnClick(index, uuid) {
      try {
        this.isProcessing = true;
        //faked data
        const apiData = {
          params: {
            botId: 1
          },
          query: {
            ChatbotId: 1,
            moduleKeywordUuid: uuid
          }
        };

        const { statusText, data } = await keywordReplyAPI.deleteModuleKeyword(
          apiData
        );

        if (statusText === "OK") {
          console.log("data:", data);
          console.log("before:", this.moduleKeywords);
          // 刪除該筆數據
          this.moduleKeywords.splice(index, 1);
          console.log("after:", this.moduleKeywords);
          this.isProcessing = false;
          return Toast.fire({
            icon: "success",
            title: "成功刪除",
            text: ""
          });
        } else {
          this.isProcessing = false;

          return Toast.fire({
            icon: "error",
            title: "刪除失敗，請稍後再試",
            text: ""
          });
        }
      } catch (err) {
        this.isProcessing = false;

        console.log(err);
      }
    },
    // 點擊〈編輯模組按鍵〉

    // 點擊〈模組區塊〉
    async handleClickModule(index) {
      // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
      this.$emit("after-click-module", [index]);
    }
  }
};
</script>