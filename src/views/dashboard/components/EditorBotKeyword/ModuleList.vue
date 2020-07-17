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
            :class="{'module-select-color':moduleClickIndex===index}"
          >
            <div
              class="mb-2"
            >{{moduleKeyword.name === null || moduleKeyword.name === "" || moduleKeyword.name === undefined ? "尚未命名" : moduleKeyword.name}}</div>
            <button
              class="btn btn-danger btn-sm"
              @click.stop.prevent="handleDeleteBtnClick(index,moduleKeyword.uuid)"
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
    },
    moduleClick: {
      type: Object
    }
  },
  data() {
    return {
      isProcessing: false,
      moduleClickIndex: -1
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
        this.isProcessing = false;
        console.log("data:", data);

        //將新增的資料存進 moduleKeywords
        this.moduleKeywords.push(data.data.moduleKeyword);

        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-create-module-keyword", data.data.moduleKeyword);

        return Toast.fire({
          icon: "success",
          title: "成功建立",
          text: ""
        });
      } else {
        this.isProcessing = false;
        return Toast.fire({
          icon: "error",
          title: "建立失敗，請稍後再試",
          text: ""
        });
      }
    },
    // 點擊〈刪除模組按鍵〉
    async handleDeleteBtnClick(index, moduleKeywordUuid) {
      this.isProcessing = true;
      //先詢問使用者是否確定要刪除

      //若不要刪除 =>

      //確定要刪除 =>

      //faked data
      const apiData = {
        params: 1,
        data: {},
        query: {
          ChatbotId: 1,
          moduleKeywordUuid: moduleKeywordUuid
        }
      };

      const { statusText } = await keywordReplyAPI.deleteModuleKeyword(apiData);

      if (statusText === "OK") {
        this.isProcessing = false;

        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-delete-module-keyword", [index]);

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
    },

    // 點擊〈模組區塊〉
    async handleClickModule(index) {
      this.moduleClickIndex = index;
      this.moduleClick.status = true;
      // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
      this.$emit("after-click-module", [index]);
    }
  }
};
</script>

<style  scoped>
.module-select-color {
  background-color: #d1dae3;
}
</style>