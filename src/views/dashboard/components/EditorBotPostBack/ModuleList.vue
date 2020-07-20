<template>
  <div class="mb-5 py-1 px-1 border border-secondary rounded">
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">模組列表</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(modulePostBack,index) in modulePostBacks" v-bind:key="modulePostBack.id">
          <td
            :data-module-post-back-uuid="modulePostBack.uuid"
            @click.stop.prevent="handleClickModule(index)"
            :class="{'module-select-color':moduleClickIndex === index}"
          >
            <div
              class="mb-2"
            >{{modulePostBack.name === null || modulePostBack.name === "" || modulePostBack.name === undefined ? "尚未命名" : modulePostBack.name}}</div>
            <button
              class="btn btn-danger btn-sm"
              @click.stop.prevent="handleDeleteBtnClick(index,modulePostBack.uuid)"
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
import postBackReplyAPI from "../../../../apis/postBackReply.js";
import { Toast, ToastDelete } from "../../../../utils/helpers";

export default {
  name: "ModuleList",
  props: {
    modulePostBacks: {
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
      const { statusText, data } = await postBackReplyAPI.createModulePostBack(
        apiData
      );

      if (statusText === "OK") {
        this.isProcessing = false;
        console.log("data:", data);

        //將新增的資料存進 modulePostBacks
        this.modulePostBacks.push(data.data.modulePostBack);

        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit("after-create-module-keyword", data.data.modulePostBack);

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

  }
};
</script>

<style  scoped>
.module-select-color {
  background-color: #d1dae3;
}
</style>