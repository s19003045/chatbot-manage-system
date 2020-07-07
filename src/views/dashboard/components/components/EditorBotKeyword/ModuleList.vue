<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">模組名稱</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="moduleKeyword in moduleKeywords" v-bind:key="moduleKeyword.id">
          <td :data-module-keyword-uuid="moduleKeyword.uuid">
            <div class="mb-2">{{moduleKeyword.name === null ? "尚未命名模組" : moduleKeyword.name}}</div>
            <button
              class="btn btn-danger btn-sm"
              @click="handleDeleteBtnClick(moduleKeyword.uuid)"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary mb-3 ml-2 btn-sm" @click.stop.prevent="handleAddBtnClick">新增模組</button>
  </div>
</template>

<script>
// import helpers
import keywordReplyAPI from "../../../../../apis/keywordReply.js";
import { Toast } from "../../../../../utils/helpers";

export default {
  name: "ModuleList",
  props: {
    moduleKeywords: {
      type: Array
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    async handleAddBtnClick() {
      //faked data
      const fakedDataCreateModule = {
        params: 1,
        data: {
          ChatbotId: 1
        }
      };
      const { statusText, data } = await keywordReplyAPI.createModuleKeyword(
        fakedDataCreateModule
      );

      if (statusText === "OK") {
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
        return Toast.fire({
          icon: "error",
          title: "建立失敗，請稍後再試",
          text: ""
        });
      }
    },
    async handleDeleteBtnClick(uuid) {
      try {
        console.log("uuid:", uuid);
        //faked data
        const fakedDataDeleteModule = {
          params: {
            botId: 1
          },
          data: {
            ChatbotId: 1,
            moduleKeyword: {
              uuid: uuid
            }
          }
        };

        const { statusText, data } = await keywordReplyAPI.deleteModuleKeyword(
          fakedDataDeleteModule
        );

        if (statusText === "OK") {
          console.log("data:", data);

          // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
          // this.$emit("after-create-module-keyword", data.data.moduleKeyword);

          return Toast.fire({
            icon: "success",
            title: "成功刪除",
            text: ""
          });
        } else {
          return Toast.fire({
            icon: "error",
            title: "刪除失敗，請稍後再試",
            text: ""
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>